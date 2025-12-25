"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Bot,
  ChevronRight,
  Lightbulb,
  LineChart,
  Mail,
  MessageSquare,
  MousePointerClick,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  Play,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Local images stored in public/images folder
const stockImages = {
  hero: "/images/hero.jpg", // Business team celebrating
  showcase: "/images/showcase.jpg", // Team collaboration
  features: [
    "/images/feature-1.jpg", // Team working on laptops
    "/images/feature-2.jpg", // AI robot assistant
    "/images/feature-3.jpg", // Data analytics screen
    "/images/feature-4.jpg", // Charts and graphs
    "/images/feature-5.jpg", // Person typing email
    "/images/feature-6.jpg", // Team collaboration
  ],
  howItWorks: [
    "/images/step-1.jpg", // Professional woman working
    "/images/step-2.jpg", // Team analyzing data  
    "/images/step-3.jpg", // Business meeting handshake
  ],
  cta: "/images/cta.jpg", // Happy team celebrating
}

// Optimized Image component using Next.js Image
function HeroImage({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  return (
    <div className={`${className} group relative overflow-hidden rounded-2xl bg-slate-800`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="object-cover transition-all duration-700 group-hover:scale-105"
        priority={priority}
      />
    </div>
  )
}

// Optimized Feature card image component
function FeatureImage({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`${className} relative overflow-hidden bg-slate-800`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        className="object-cover"
      />
    </div>
  )
}

const features = [
  {
    icon: Target,
    title: "AI Lead Scoring",
    description:
      "Automatically score and prioritize leads using advanced machine learning algorithms that analyze engagement patterns and buying signals.",
    gradient: "from-orange-500 to-red-600",
  },
  {
    icon: Bot,
    title: "Sales AI Assistant",
    description:
      "Get instant answers, generate personalized outreach, and receive AI-powered recommendations tailored to each prospect.",
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description:
      "Uncover hidden opportunities with AI-generated insights about companies, decision-makers, and optimal engagement timing.",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    icon: LineChart,
    title: "Pipeline Analytics",
    description:
      "Track your entire sales pipeline with real-time visualizations, conversion metrics, and AI-powered forecasting.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: Mail,
    title: "Automated Outreach",
    description:
      "Generate personalized email sequences and LinkedIn messages that resonate with each prospect's unique profile.",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Seamlessly collaborate with your sales team, share insights, and coordinate outreach efforts in real-time.",
    gradient: "from-indigo-500 to-violet-600",
  },
]

const testimonials = [
  {
    quote:
      "LeadPulse AI transformed our sales process. We've seen a 40% increase in qualified leads and our team saves 15 hours per week on research.",
    author: "Sarah Chen",
    title: "VP of Sales, TechFlow Inc.",
    avatar: "SC",
    color: "from-blue-500 to-cyan-500",
  },
  {
    quote:
      "The AI-powered insights are incredible. It's like having a team of research analysts working around the clock for us.",
    author: "Marcus Rodriguez",
    title: "Sales Director, CloudScale",
    avatar: "MR",
    color: "from-purple-500 to-pink-500",
  },
  {
    quote:
      "We closed 3 enterprise deals in our first month using LeadPulse. The ROI speaks for itself.",
    author: "Emily Watson",
    title: "CEO, DataBridge Solutions",
    avatar: "EW",
    color: "from-orange-500 to-red-500",
  },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals getting started with AI-powered sales",
    features: [
      "Up to 100 leads",
      "Basic AI scoring",
      "5 AI insights per day",
      "Email support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing teams that need advanced features",
    features: [
      "Unlimited leads",
      "Advanced AI scoring",
      "Unlimited AI insights",
      "AI Sales Assistant",
      "Pipeline analytics",
      "Priority support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom requirements",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated account manager",
      "SSO & SAML",
      "Custom AI training",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

const stats = [
  { value: "40%", label: "More Qualified Leads", icon: Target },
  { value: "3x", label: "Faster Research", icon: Zap },
  { value: "15hrs", label: "Saved Per Week", icon: TrendingUp },
  { value: "94%", label: "Customer Satisfaction", icon: Sparkles },
]

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <Zap className="h-5 w-5 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50 blur" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              LeadPulse AI
            </span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-white/60 hover:text-white transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-lg shadow-indigo-500/25">
                Get Started
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30">
                <Sparkles className="mr-1.5 h-3 w-3" />
                Powered by GPT-4 & Nano Banana Pro
              </Badge>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
                Turn Cold Leads into
                <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Hot Deals
                </span>
                <span className="block mt-2">with AI</span>
              </h1>
              
              <p className="mt-6 text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
                LeadPulse AI automatically researches prospects, scores leads, and generates 
                personalized outreach — helping your sales team close more deals, faster.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 shadow-xl shadow-indigo-500/25 text-base px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 bg-white/5 hover:bg-white/10 text-white text-base px-8">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/40">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>

            {/* Hero Image - AI Generated */}
            <div className="relative lg:pl-8">
              <div className="relative">
                <HeroImage
                  src={stockImages.hero}
                  alt="AI-Powered Sales Dashboard"
                  className="aspect-[4/3] w-full shadow-2xl shadow-indigo-500/20"
                  priority
                />
                {/* Floating elements */}
                <div className="absolute -left-4 top-1/4 rounded-xl bg-slate-900/90 backdrop-blur-md p-4 shadow-xl border border-white/10 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">Conversion Rate</div>
                      <div className="text-lg font-bold text-green-400">+42%</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-4 bottom-1/4 rounded-xl bg-slate-900/90 backdrop-blur-md p-4 shadow-xl border border-white/10 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-white/50">AI Insights</div>
                      <div className="text-lg font-bold text-purple-400">1,247</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div 
                key={stat.label} 
                className="relative text-center group"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-6">
                  <stat.icon className="h-6 w-6 mx-auto mb-3 text-indigo-400" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-white/50">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section with AI Image */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/30 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Bot className="mr-1.5 h-3 w-3" />
              AI-Powered Platform
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              See the magic in action
            </h2>
            <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
              Watch how AI transforms your sales workflow with intelligent automation
            </p>
          </div>
          
          <HeroImage
            src={stockImages.showcase}
            alt="LeadPulse AI in Action"
            className="aspect-[21/9] w-full shadow-2xl shadow-purple-500/20"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Everything you need to
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                close more deals
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Powerful AI-driven tools designed to supercharge your sales process
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="group relative bg-slate-900/50 border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/10"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Feature Image */}
                <div className="relative h-40 overflow-hidden">
                  <FeatureImage
                    src={stockImages.features[index]}
                    alt={feature.title}
                    className="h-40 w-full"
                  />
                </div>

                <CardHeader className="relative pb-2">
                  <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base text-white/60">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-indigo-950/20 to-slate-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              From prospect to customer
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                in 3 simple steps
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Import Your Leads",
                description: "Upload a CSV, connect your CRM, or let our AI find prospects matching your ideal customer profile.",
                icon: Users,
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "AI Research & Scoring",
                description: "Our AI analyzes each lead, researches company data, and assigns intelligent scores based on buying signals.",
                icon: BarChart3,
                gradient: "from-purple-500 to-pink-500",
              },
              {
                step: "03",
                title: "Personalized Outreach",
                description: "Generate tailored emails and messages for each prospect, then track engagement and optimize your approach.",
                icon: Mail,
                gradient: "from-orange-500 to-red-500",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                {/* Step connector */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/3 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
                
                <div className="relative overflow-hidden rounded-2xl bg-slate-900/50 border border-white/10 p-6 transition-all duration-500 hover:border-white/20">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-white/5">{item.step}</div>
                  
                  {/* Step Image */}
                  <FeatureImage
                    src={stockImages.howItWorks[index]}
                    alt={item.title}
                    className="aspect-video w-full mb-6 rounded-xl"
                  />
                  
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-pink-500/20 text-pink-300 border-pink-500/30">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Loved by sales teams
              <span className="block bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                everywhere
              </span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={testimonial.author} 
                className="relative bg-slate-900/50 border-white/10 overflow-hidden group hover:border-white/20 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <CardContent className="relative pt-8">
                  <div className="mb-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-8 text-white/70 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-sm font-bold text-white shadow-lg`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-white/50">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <Badge className="mb-4 bg-violet-500/20 text-violet-300 border-violet-500/30">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Simple, transparent
              <span className="block bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                pricing
              </span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 items-start">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative bg-slate-900/50 border-white/10 overflow-hidden transition-all duration-500 hover:border-white/20 ${
                  plan.popular ? "md:-mt-4 md:mb-4 border-indigo-500/50 shadow-xl shadow-indigo-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                )}
                <CardHeader className="text-center pb-2">
                  {plan.popular && (
                    <Badge className="mb-2 mx-auto bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="text-xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && (
                      <span className="text-white/50">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2 text-white/50">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20">
                          <ChevronRight className="h-3 w-3 text-indigo-400" />
                        </div>
                        <span className="text-sm text-white/70">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0"
                        : "bg-white/10 hover:bg-white/20 border-white/20"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with AI Image */}
      <section className="relative py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={stockImages.cta}
                alt="Success"
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 via-purple-900/50 to-indigo-900/60" />
            </div>
            
            <div className="relative p-12 md:p-20">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
                  Ready to transform your sales?
                </h2>
                <p className="mt-4 text-lg text-white/70">
                  Join thousands of sales teams using LeadPulse AI to close more deals.
                  Start your free trial today.
                </p>
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 shadow-xl px-8">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20 px-8"
                    >
                      Talk to Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">LeadPulse AI</span>
              </div>
              <p className="mt-4 text-sm text-white/50 leading-relaxed">
                AI-powered B2B sales intelligence platform that helps teams close more deals.
              </p>
              <div className="mt-6 flex gap-4">
                {["twitter", "linkedin", "github"].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Product</h3>
              <ul className="space-y-3 text-sm">
                {["Features", "Pricing", "Integrations", "API"].map((item) => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Company</h3>
              <ul className="space-y-3 text-sm">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-white">Legal</h3>
              <ul className="space-y-3 text-sm">
                {["Privacy", "Terms", "Security"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/40">
            <p>&copy; {new Date().getFullYear()} LeadPulse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
