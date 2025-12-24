import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const createLeadSchema = z.object({
  companyName: z.string().min(1),
  contactName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  industry: z.string().optional(),
  employeeCount: z.number().optional(),
  revenue: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  linkedIn: z.string().optional(),
  source: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search") || ""
    const stage = searchParams.get("stage")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

    const where = {
      organizationId: session.user.organizationId,
      ...(search && {
        OR: [
          { companyName: { contains: search } },
          { contactName: { contains: search } },
          { email: { contains: search } },
        ],
      }),
      ...(stage && { stage }),
    }

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          aiInsights: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
          interactions: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      }),
      prisma.lead.count({ where }),
    ])

    return NextResponse.json({
      data: leads,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error("Error fetching leads:", error)
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const result = createLeadSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const data = result.data
    const lead = await prisma.lead.create({
      data: {
        ...data,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        organizationId: session.user.organizationId,
        score: Math.floor(Math.random() * 40) + 50, // Random initial score for demo
      },
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 })
  }
}

