import Link from "next/link"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Target,
    title: "AI Lead Scoring",
    description:
      "Automatically score and prioritize leads using advanced machine learning algorithms that analyze engagement patterns and buying signals.",
  },
  {
    icon: Bot,
    title: "Sales AI Assistant",
    description:
      "Get instant answers, generate personalized outreach, and receive AI-powered recommendations tailored to each prospect.",
  },
  {
    icon: Lightbulb,
    title: "Smart Insights",
    description:
      "Uncover hidden opportunities with AI-generated insights about companies, decision-makers, and optimal engagement timing.",
  },
  {
    icon: LineChart,
    title: "Pipeline Analytics",
    description:
      "Track your entire sales pipeline with real-time visualizations, conversion metrics, and AI-powered forecasting.",
  },
  {
    icon: Mail,
    title: "Automated Outreach",
    description:
      "Generate personalized email sequences and LinkedIn messages that resonate with each prospect's unique profile.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Seamlessly collaborate with your sales team, share insights, and coordinate outreach efforts in real-time.",
  },
]

const testimonials = [
  {
    quote:
      "LeadPulse AI transformed our sales process. We've seen a 40% increase in qualified leads and our team saves 15 hours per week on research.",
    author: "Sarah Chen",
    title: "VP of Sales, TechFlow Inc.",
    avatar: "SC",
  },
  {
    quote:
      "The AI-powered insights are incredible. It's like having a team of research analysts working around the clock for us.",
    author: "Marcus Rodriguez",
    title: "Sales Director, CloudScale",
    avatar: "MR",
  },
  {
    quote:
      "We closed 3 enterprise deals in our first month using LeadPulse. The ROI speaks for itself.",
    author: "Emily Watson",
    title: "CEO, DataBridge Solutions",
    avatar: "EW",
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
  { value: "40%", label: "More Qualified Leads" },
  { value: "3x", label: "Faster Research" },
  { value: "15hrs", label: "Saved Per Week" },
  { value: "94%", label: "Customer Satisfaction" },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">LeadPulse AI</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="gradient-mesh absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f10_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f10_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Sparkles className="mr-1 h-3 w-3" />
              Powered by GPT-4
            </Badge>
            
            <h1 className="animate-fade-in text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Cold Leads into
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {" "}Hot Deals{" "}
              </span>
              with AI
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              LeadPulse AI automatically researches prospects, scores leads, and generates 
              personalized outreach — helping your sales team close more deals, faster.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <MousePointerClick className="mr-2 h-4 w-4" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-xl border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-muted-foreground">LeadPulse AI Dashboard</span>
            </div>
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted p-8">
              <div className="grid h-full grid-cols-3 gap-4">
                <div className="col-span-2 space-y-4">
                  <div className="h-24 rounded-lg bg-background/50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-32 animate-shimmer rounded bg-muted" />
                        <div className="h-8 w-24 animate-shimmer rounded bg-muted" />
                      </div>
                      <TrendingUp className="h-12 w-12 text-green-500 opacity-50" />
                    </div>
                  </div>
                  <div className="h-64 rounded-lg bg-background/50 p-4">
                    <div className="mb-4 h-4 w-28 animate-shimmer rounded bg-muted" />
                    <div className="flex h-[calc(100%-2rem)] items-end gap-2">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-primary/60"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 rounded-lg bg-background/50 p-4">
                    <div className="mb-2 h-4 w-24 animate-shimmer rounded bg-muted" />
                    <div className="space-y-2">
                      {[85, 72, 64, 58].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-muted">
                            <div className="h-2 rounded-full bg-primary" style={{ width: `${w}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{w}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-32 rounded-lg bg-background/50 p-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-full bg-primary/20 p-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-full animate-shimmer rounded bg-muted" />
                        <div className="h-3 w-3/4 animate-shimmer rounded bg-muted" />
                        <div className="h-3 w-1/2 animate-shimmer rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg bg-background/50 p-4">
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-muted" />
                          <div className="flex-1">
                            <div className="h-3 w-full animate-shimmer rounded bg-muted" />
                          </div>
                          <Badge variant="secondary" className="h-5 w-12" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to close more deals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Powerful AI-driven tools designed to supercharge your sales process
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="border-y bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              From prospect to customer in 3 steps
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Import Your Leads",
                description: "Upload a CSV, connect your CRM, or let our AI find prospects matching your ideal customer profile.",
                icon: Users,
              },
              {
                step: "02",
                title: "AI Research & Scoring",
                description: "Our AI analyzes each lead, researches company data, and assigns intelligent scores based on buying signals.",
                icon: BarChart3,
              },
              {
                step: "03",
                title: "Personalized Outreach",
                description: "Generate tailored emails and messages for each prospect, then track engagement and optimize your approach.",
                icon: Mail,
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="mb-4 text-6xl font-bold text-primary/10">{item.step}</div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by sales teams everywhere
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.author} className="relative">
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
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
                  <p className="mb-6 text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-y bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "border-primary shadow-lg" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-muted-foreground">{plan.period}</span>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ChevronRight className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="mt-6 w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-purple-600 p-8 md:p-16">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your sales?
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Join thousands of sales teams using LeadPulse AI to close more deals.
                Start your free trial today.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                  >
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">LeadPulse AI</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                AI-powered B2B sales intelligence platform that helps teams close more deals.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-foreground">Integrations</Link></li>
                <li><Link href="/api" className="hover:text-foreground">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-foreground">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground">Terms</Link></li>
                <li><Link href="/security" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LeadPulse AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
