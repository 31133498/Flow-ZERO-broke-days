"use client"

import { useDummyAuth } from "@/hooks/use-dummy-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Clock, CheckCircle } from "lucide-react"

export function LandingPage() {
  const { login } = useDummyAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              ⚡
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">FLOW</span>
              <p className="text-xs text-accent font-semibold">Zero Broke Days</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button className="text-muted-foreground hover:text-foreground transition font-medium">For Students</button>
            <button className="text-muted-foreground hover:text-foreground transition font-medium">For Orgs</button>
            <button className="text-muted-foreground hover:text-foreground transition font-medium">How It Works</button>
            <Button size="sm" variant="outline" onClick={() => login("worker")}>
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/30 rounded-full mb-4">
                <span className="text-accent font-semibold text-sm">Instant Pay • Every Task</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight mb-4">
                Never Go{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-accent/60">
                  Broke
                </span>
              </h1>
              <p className="text-2xl text-accent font-semibold">Zero Broke Days Starts Now</p>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed">
              Get paid within 60 seconds of task completion. No applications. No waiting. No fees. Just instant money
              when you need it most.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-accent">60s</p>
                <p className="text-sm text-muted-foreground">Instant Payment</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">¥4,200</p>
                <p className="text-sm text-muted-foreground">Max per Task</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">0%</p>
                <p className="text-sm text-muted-foreground">Zero Fees</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground text-lg h-14 px-8 font-semibold shadow-lg hover:shadow-xl transition"
                onClick={() => login("worker")}
              >
                Start Earning Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary/60 text-lg h-14 px-8 bg-transparent font-semibold"
                onClick={() => login("client")}
              >
                Post Tasks for Teams
              </Button>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/10 rounded-3xl blur-3xl" />
            <Card className="relative bg-gradient-to-br from-card to-card border-accent/20 p-8 space-y-6">
              {/* Task Claim */}
              <div className="flex items-start gap-4 p-5 bg-muted/60 rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Task Claimed</p>
                  <p className="text-xs text-muted-foreground">Digital Marketing Survey</p>
                </div>
              </div>

              {/* Completion Arrow */}
              <div className="flex items-center justify-center py-2">
                <div className="h-8 w-0.5 bg-gradient-to-b from-accent to-accent/30" />
              </div>

              {/* Task Complete */}
              <div className="flex items-start gap-4 p-5 bg-muted/60 rounded-xl border border-border/50">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Task Completed</p>
                  <p className="text-xs text-muted-foreground">Submitted for verification</p>
                </div>
              </div>

              {/* Payment Arrow */}
              <div className="flex items-center justify-center py-2">
                <div className="h-8 w-0.5 bg-gradient-to-b from-primary to-accent" />
              </div>

              {/* Instant Pay */}
              <div className="flex items-start gap-4 p-5 bg-gradient-to-r from-accent/20 to-accent/10 rounded-xl border-2 border-accent/50">
                <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse-accent">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Instant Payment</p>
                  <p className="text-xs text-muted-foreground">¥750 in your account</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Students Trust Flow</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built specifically for students who need to earn on their own terms.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Instant Payment */}
          <Card className="bg-card border-accent/20 p-8 hover:border-accent/50 transition group">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/30 transition">
              <Zap className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">60-Second Payouts</h3>
            <p className="text-muted-foreground leading-relaxed">
              Money hits your bank or wallet instantly after verification. No waiting 2 weeks for payment.
            </p>
          </Card>

          {/* Card 2: Zero Fees */}
          <Card className="bg-card border-primary/20 p-8 hover:border-primary/50 transition group">
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/30 transition">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Zero Fees, No Crypto</h3>
            <p className="text-muted-foreground leading-relaxed">
              Keep 100% of your earnings. Direct bank transfers only. No hidden charges or cryptocurrency nonsense.
            </p>
          </Card>

          {/* Card 3: Verified Opportunities */}
          <Card className="bg-card border-accent/20 p-8 hover:border-accent/50 transition group">
            <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent/30 transition">
              <CheckCircle className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">100% Scam-Free</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every employer verified. Every opportunity audited. Every payment guaranteed. Your safety is everything.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-20">Simple. Fast. Instant.</h2>

        <div className="grid md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -top-6 left-0 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
              1
            </div>
            <Card className="bg-card border-border p-6 mt-8">
              <h4 className="font-bold text-foreground mb-3">Choose a Task</h4>
              <p className="text-sm text-muted-foreground">Browse verified tasks from ¥450 to ¥4,200.</p>
            </Card>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-end mb-12 justify-center">
            <ArrowRight className="w-6 h-6 text-border" />
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -top-6 left-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
              2
            </div>
            <Card className="bg-card border-border p-6 mt-8">
              <h4 className="font-bold text-foreground mb-3">Complete Work</h4>
              <p className="text-sm text-muted-foreground">5-30 min tasks. Simple, straightforward work.</p>
            </Card>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-end mb-12 justify-center">
            <ArrowRight className="w-6 h-6 text-border" />
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -top-6 left-0 w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold text-lg">
              3
            </div>
            <Card className="bg-card border-border p-6 mt-8">
              <h4 className="font-bold text-foreground mb-3">Get Verified</h4>
              <p className="text-sm text-muted-foreground">Smart review system approves in seconds.</p>
            </Card>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-end mb-12 justify-center">
            <ArrowRight className="w-6 h-6 text-border" />
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="absolute -top-6 left-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">
              4
            </div>
            <Card className="bg-card border-border p-6 mt-8">
              <h4 className="font-bold text-foreground mb-3">Get Paid</h4>
              <p className="text-sm text-muted-foreground">Money in bank within 60 seconds.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="bg-gradient-to-r from-accent/15 to-primary/15 border-accent/30 p-12 md:p-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">No More Broke Days</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 10,000+ students earning instant money. Start right now—first task paid in 60 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground h-14 px-10 text-lg font-semibold shadow-lg"
                onClick={() => login("worker")}
              >
                Start Earning Now
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-foreground">FLOW</span>
              <span className="text-xs text-accent font-semibold">Zero Broke Days</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 Flow. Instant Pay. No Fees. No Broke Days.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
