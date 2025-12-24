import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create or update demo organization
  const org = await prisma.organization.upsert({
    where: { name: "Acme Inc." },
    update: {},
    create: {
      name: "Acme Inc.",
      plan: "PRO",
    },
  })

  console.log("Organization ready:", org.name)

  // Create or update demo user
  const hashedPassword = await bcrypt.hash("demo123", 12)
  const user = await prisma.user.upsert({
    where: { email: "demo@leadpulse.ai" },
    update: {
      password: hashedPassword,
      name: "Demo User",
      role: "ADMIN",
    },
    create: {
      email: "demo@leadpulse.ai",
      password: hashedPassword,
      name: "Demo User",
      role: "ADMIN",
      organizationId: org.id,
    },
  })

  console.log("User ready:", user.email)

  // Create demo leads (skip if they already exist)
  const leads = [
    {
      companyName: "TechCorp Industries",
      contactName: "Sarah Chen",
      email: "sarah@techcorp.com",
      phone: "+1 555-0123",
      website: "https://techcorp.com",
      industry: "Technology",
      employeeCount: 250,
      revenue: "$50M - $100M",
      location: "San Francisco, CA",
      score: 92,
      stage: "QUALIFIED",
      source: "LinkedIn",
      organizationId: org.id,
    },
    {
      companyName: "DataFlow Systems",
      contactName: "John Smith",
      email: "john@dataflow.io",
      phone: "+1 555-0124",
      website: "https://dataflow.io",
      industry: "Software",
      employeeCount: 120,
      revenue: "$10M - $50M",
      location: "Austin, TX",
      score: 78,
      stage: "CONTACTED",
      source: "Website",
      organizationId: org.id,
    },
    {
      companyName: "CloudScale Inc",
      contactName: "Emily Watson",
      email: "emily@cloudscale.co",
      phone: "+1 555-0125",
      website: "https://cloudscale.co",
      industry: "Cloud Services",
      employeeCount: 500,
      revenue: "$100M+",
      location: "Seattle, WA",
      score: 95,
      stage: "PROPOSAL",
      source: "Referral",
      organizationId: org.id,
    },
    {
      companyName: "FinanceHub Global",
      contactName: "Michael Brown",
      email: "michael@financehub.com",
      phone: "+1 555-0126",
      website: "https://financehub.com",
      industry: "Finance",
      employeeCount: 1000,
      revenue: "$100M+",
      location: "New York, NY",
      score: 65,
      stage: "NEW",
      source: "Conference",
      organizationId: org.id,
    },
    {
      companyName: "HealthTech Solutions",
      contactName: "Jessica Lee",
      email: "jessica@healthtech.io",
      phone: "+1 555-0127",
      website: "https://healthtech.io",
      industry: "Healthcare",
      employeeCount: 75,
      revenue: "$5M - $10M",
      location: "Boston, MA",
      score: 82,
      stage: "CONTACTED",
      source: "LinkedIn",
      organizationId: org.id,
    },
  ]

  let createdLeads = 0
  for (const lead of leads) {
    // Check if lead already exists
    const existing = await prisma.lead.findFirst({
      where: {
        companyName: lead.companyName,
        organizationId: org.id,
      },
    })

    if (!existing) {
      await prisma.lead.create({ data: lead })
      createdLeads++
    }
  }

  console.log(`Leads ready: ${createdLeads} new, ${leads.length - createdLeads} existing`)

  // Create or update demo campaign
  const existingCampaign = await prisma.campaign.findFirst({
    where: {
      name: "Q4 Enterprise Outreach",
      organizationId: org.id,
    },
  })

  if (!existingCampaign) {
    await prisma.campaign.create({
      data: {
        name: "Q4 Enterprise Outreach",
        description: "Targeting enterprise companies for Q4 push",
        status: "ACTIVE",
        organizationId: org.id,
        metrics: JSON.stringify({
          sent: 450,
          opened: 198,
          replied: 45,
          converted: 12,
        }),
      },
    })
    console.log("Created campaign: Q4 Enterprise Outreach")
  } else {
    console.log("Campaign already exists: Q4 Enterprise Outreach")
  }

  console.log("Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
