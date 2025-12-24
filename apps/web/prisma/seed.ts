import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // Create demo organization
  const org = await prisma.organization.create({
    data: {
      name: "Acme Inc.",
      plan: "PRO",
    },
  })

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 12)
  const user = await prisma.user.create({
    data: {
      email: "demo@leadpulse.ai",
      password: hashedPassword,
      name: "Demo User",
      role: "ADMIN",
      organizationId: org.id,
    },
  })

  console.log("Created user:", user.email)

  // Create demo leads
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

  for (const lead of leads) {
    await prisma.lead.create({ data: lead })
  }

  console.log(`Created ${leads.length} demo leads`)

  // Create demo campaign
  const campaign = await prisma.campaign.create({
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

  console.log("Created campaign:", campaign.name)

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

