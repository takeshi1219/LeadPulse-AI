"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Lightbulb,
  LineChart,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Play,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Local images
const images = {
  hero: "/images/hero.jpg",
  showcase: "/images/showcase.jpg",
  features: [
    "/images/feature-1.jpg",
    "/images/feature-2.jpg",
    "/images/feature-3.jpg",
    "/images/feature-4.jpg",
    "/images/feature-5.jpg",
    "/images/feature-6.jpg",
  ],
  steps: [
    "/images/step-1.jpg",
    "/images/step-2.jpg",
    "/images/step-3.jpg",
  ],
  cta: "/images/cta.jpg",
}

const features = [
  {
    icon: Target,
    title: "AI Lead Scoring",
    description: "Automatically score and prioritize leads using advanced ML algorithms.",
    color: "bg-orange-500",
  },
  {
    icon: Bot,
    title: "Sales AI Assistant",
    description: "Get instant answers and AI-powered recommendations for each prospect.",
    color: "bg-blue-500",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description: "Uncover hidden opportunities with AI-generated insights.",
    color: "bg-yellow-500",
  },
  {
    icon: LineChart,
    title: "Pipeline Analytics",
    description: "Track your pipeline with real-time visualizations and forecasting.",
    color: "bg-emerald-500",
  },
  {
    icon: Mail,
    title: "Automated Outreach",
    description: "Generate personalized email sequences that resonate with prospects.",
    color: "bg-purple-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Collaborate with your team and coordinate outreach in real-time.",
    color: "bg-pink-500",
  },
]

const testimonials = [
  {
    quote: "LeadPulse AI transformed our sales process. We've seen a 40% increase in qualified leads.",
    author: "Sarah Chen",
    role: "VP of Sales, TechFlow Inc.",
    avatar: "SC",
  },
  {
    quote: "The AI-powered insights are incredible. It's like having research analysts working 24/7.",
    author: "Marcus Rodriguez",
    role: "Sales Director, CloudScale",
    avatar: "MR",
  },
  {
    quote: "We closed 3 enterprise deals in our first month. The ROI speaks for itself.",
    author: "Emily Watson",
    role: "CEO, DataBridge Solutions",
    avatar: "EW",
  },
]

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started",
    features: ["Up to 100 leads", "Basic AI scoring", "5 AI insights/day", "Email support"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For growing teams",
    features: ["Unlimited leads", "Advanced AI scoring", "Unlimited insights", "AI Assistant", "Pipeline analytics", "Priority support"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: ["Everything in Pro", "Custom integrations", "Dedicated manager", "SSO & SAML", "Custom AI training"],
    cta: "Contact Sales",
    highlighted: false,
  },
]

const stats = [
  { value: "40%", label: "More Leads" },
  { value: "3x", label: "Faster Research" },
  { value: "15hrs", label: "Saved Weekly" },
  { value: "94%", label: "Satisfaction" },
]

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleTheme = () => setIsDark(!isDark)

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${isDark ? 'border-white/10 bg-slate-950/90' : 'border-slate-200 bg-white/90'} backdrop-blur-xl`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">LeadPulse AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-6 text-sm ${isDark ? 'text-white/70' : 'text-slate-600'}`}>
            <Link href="#features" className="hover:text-violet-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-violet-600 transition-colors">Pricing</Link>
            <Link href="#testimonials" className="hover:text-violet-600 transition-colors">Testimonials</Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link href="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0">
                Get Started
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${isDark ? 'border-white/10 bg-slate-950' : 'border-slate-200 bg-white'} p-4`}>
            <div className="flex flex-col gap-4">
              <Link href="#features" className="py-2" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <Link href="#pricing" className="py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              <Link href="#testimonials" className="py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</Link>
              <Link href="/login" className="py-2">Sign In</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-6 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
                <Sparkles className="h-4 w-4" />
                AI-Powered Sales Intelligence
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
                Turn Cold Leads into{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Hot Deals
                </span>
              </h1>
              
              <p className={`mt-6 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                LeadPulse AI automatically researches prospects, scores leads, and generates personalized outreach — helping your team close more deals, faster.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0 px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" className={`w-full sm:w-auto px-8 border ${isDark ? 'border-white/20 bg-transparent hover:bg-white/10 text-white' : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50'}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Button>
                </Link>
              </div>

              <p className={`mt-4 text-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                No credit card required • 14-day free trial
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'shadow-violet-500/20' : 'shadow-slate-300'}`}>
                <Image
                  src={images.hero}
                  alt="LeadPulse AI Dashboard"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Floating Card */}
              <div className={`absolute -left-4 -bottom-4 p-4 rounded-xl shadow-lg ${isDark ? 'bg-slate-900 border border-white/10' : 'bg-white border border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-white/50' : 'text-slate-500'}`}>Conversion Rate</div>
                    <div className="text-lg font-bold text-green-500">+42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className={`mt-1 text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="demo" className={`py-16 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">See LeadPulse AI in Action</h2>
            <p className={`mt-3 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Watch how AI transforms your sales workflow
            </p>
          </div>
          <div className={`relative aspect-video rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'shadow-violet-500/10' : ''}`}>
            <Image
              src={images.showcase}
              alt="LeadPulse AI Demo"
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything You Need to Close More Deals</h2>
            <p className={`mt-4 max-w-2xl mx-auto ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Powerful AI-driven tools designed to supercharge your sales process
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={feature.title}
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-slate-900/50 border-white/10 hover:border-white/20' : 'bg-white border-slate-200 hover:border-violet-300'}`}
              >
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={images.features[i]}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="400px"
                  />
                </div>
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${isDark ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">From Prospect to Customer in 3 Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Import Your Leads", description: "Upload a CSV, connect your CRM, or let AI find prospects.", icon: Users },
              { step: "02", title: "AI Research & Scoring", description: "AI analyzes leads and assigns intelligent scores.", icon: BarChart3 },
              { step: "03", title: "Personalized Outreach", description: "Generate tailored emails and track engagement.", icon: Mail },
            ].map((item, i) => (
              <div key={item.step} className={`relative p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'}`}>
                <span className={`absolute top-4 right-4 text-5xl font-bold ${isDark ? 'text-white/5' : 'text-slate-100'}`}>{item.step}</span>
                <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={images.steps[i]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className={`text-sm ${isDark ? 'text-white/60' : 'text-slate-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${isDark ? 'bg-pink-500/20 text-pink-300' : 'bg-pink-100 text-pink-700'}`}>
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Loved by Sales Teams Everywhere</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.author}
                className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/50 border-white/10' : 'bg-white border-slate-200'}`}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className={`mb-6 ${isDark ? 'text-white/70' : 'text-slate-600'}`}>"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-medium">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-medium">{t.author}</div>
                    <div className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className={`py-20 ${isDark ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4 ${isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'}`}>
              Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className={`mt-4 ${isDark ? 'text-white/60' : 'text-slate-600'}`}>Start free and scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 rounded-2xl border transition-all ${plan.highlighted
                  ? 'border-violet-500 shadow-xl shadow-violet-500/20'
                  : isDark ? 'border-white/10 bg-slate-900/50' : 'border-slate-200 bg-white'
                } ${plan.highlighted && !isDark ? 'bg-white' : ''}`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className={isDark ? 'text-white/50' : 'text-slate-500'}>{plan.period}</span>}
                  </div>
                  <p className={`mt-2 text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-violet-600" />
                      <span className={isDark ? 'text-white/70' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.highlighted
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white border-0'
                    : isDark 
                      ? 'bg-white/10 hover:bg-white/20 border border-white/20 text-white' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white border-0'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={images.cta}
                alt="Get Started"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-indigo-900/80 to-violet-900/90" />
            </div>
            <div className="relative py-16 px-6 md:py-24 md:px-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Sales?</h2>
              <p className="text-white/70 mb-8 max-w-xl mx-auto">
                Join thousands of sales teams using LeadPulse AI to close more deals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-violet-900 hover:bg-white/90 px-8">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold">LeadPulse AI</span>
              </Link>
              <p className={`text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                AI-powered B2B sales intelligence platform.
              </p>
            </div>
            {[
              { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold mb-3">{col.title}</h4>
                <ul className={`space-y-2 text-sm ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link href={`/${link.toLowerCase()}`} className="hover:text-violet-600 transition-colors">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={`pt-8 border-t text-center text-sm ${isDark ? 'border-white/10 text-white/40' : 'border-slate-200 text-slate-500'}`}>
            © {new Date().getFullYear()} LeadPulse AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
