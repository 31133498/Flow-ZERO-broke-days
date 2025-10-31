"use client"

import { useDummyAuth } from "@/hooks/use-dummy-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Shield, Clock, CheckCircle, TrendingUp, Gauge, Users, BarChart3 } from "lucide-react"
import { useState } from "react"

export function LandingPage() {
  const { login } = useDummyAuth()
  const [activeTab, setActiveTab] = useState<"students" | "orgs">("students")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-accent/70 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              ⚡
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">FLOW</span>
              <p className="text-xs text-accent font-semibold">Productivity Redefined</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => setActiveTab("students")}
              className={`font-medium transition ${activeTab === "students" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
            >
              For Students
            </button>
            <button
              onClick={() => setActiveTab("orgs")}
              className={`font-medium transition ${activeTab === "orgs" ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
            >
              For Organizations
            </button>
            <Button size="sm" variant="outline" onClick={() => login("worker")}>
              Sign In
            </Button>
          </nav>
        </div>
      </header>

      {/* Organization Hero */}
      {activeTab === "orgs" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <div className="inline-block px-4 py-1 bg-accent/10 border border-accent/30 rounded-full mb-4">
                  <span className="text-accent font-semibold text-sm">Enterprise Productivity</span>
                </div>
                <h1 className="text-6xl md:text-7xl font-bold text-foreground leading-tight mb-4">
                  Eliminate Backlog.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent/80 to-accent/60">
                    Scale Instantly.
                  </span>
                </h1>
                <p className="text-2xl text-accent font-semibold">Turn Projects Into Verified Results</p>
              </div>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Large projects stalling? Teams overstretched? FLOW atomizes your complex work into precise, trackable
                tasks completed by verified students in minutes, not months.
              </p>

              {/* Org Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-3xl font-bold text-accent">10x</p>
                  <p className="text-sm text-muted-foreground">Faster Turnaround</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Verified Results</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-accent">0</p>
                  <p className="text-sm text-muted-foreground">Overhead</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground text-lg h-14 px-8 font-semibold shadow-lg"
                  onClick={() => login("client")}
                >
                  Post Your First Project <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/30 hover:border-primary/60 text-lg h-14 px-8 bg-transparent"
                  onClick={() => login("worker")}
                >
                  See Sample Tasks
                </Button>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/10 rounded-3xl blur-3xl" />
              <Card className="relative bg-gradient-to-br from-card to-card border-accent/20 p-8 space-y-6">
                {/* Problem Cards */}
                <div className="space-y-4">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm font-semibold text-foreground">❌ Your Challenge</p>
                    <p className="text-xs text-muted-foreground mt-1">Months of backlog. Teams stretched thin.</p>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRight className="w-6 h-6 text-border rotate-90" />
                  </div>

                  <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                    <p className="text-sm font-semibold text-foreground">✓ FLOW Solution</p>
                    <p className="text-xs text-muted-foreground mt-1">Atomize → Delegate → Verify → Complete</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Student Hero */}
      {activeTab === "students" && (
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
                  className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground text-lg h-14 px-8 font-semibold shadow-lg"
                  onClick={() => login("worker")}
                >
                  Start Earning Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/30 hover:border-primary/60 text-lg h-14 px-8 bg-transparent"
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
                  <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center flex-shrink-0 animate-pulse">
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
      )}

      {/* Problem/Solution Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">FLOW Solves It All</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're drowning in backlog or desperate for income, FLOW is the bridge between work that needs to be
            done and people ready to do it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Organizations */}
          <Card className="bg-card border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <Gauge className="w-6 h-6 text-accent" />
              For Organizations
            </h3>
            <div className="space-y-5">
              <div className="border-l-4 border-red-500/50 pl-4">
                <p className="text-sm font-semibold text-red-500 mb-1">Problem</p>
                <p className="text-sm text-muted-foreground">Months of backlog, slow turnaround, fragmented gig work</p>
              </div>
              <div className="border-l-4 border-accent/50 pl-4">
                <p className="text-sm font-semibold text-accent mb-1">FLOW Solution</p>
                <p className="text-sm text-muted-foreground">
                  Atomize work into precise tasks, completed in minutes with quality assurance
                </p>
              </div>
              <div className="border-l-4 border-primary/50 pl-4">
                <p className="text-sm font-semibold text-primary mb-1">Results</p>
                <p className="text-sm text-muted-foreground">
                  10x faster turnaround, zero overhead, 100% verified results
                </p>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mt-8 bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30"
              onClick={() => login("client")}
            >
              Post Your First Project
            </Button>
          </Card>

          {/* Students */}
          <Card className="bg-card border-border p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              For Students & Earners
            </h3>
            <div className="space-y-5">
              <div className="border-l-4 border-red-500/50 pl-4">
                <p className="text-sm font-semibold text-red-500 mb-1">Problem</p>
                <p className="text-sm text-muted-foreground">Waiting weeks for payment, unreliable gigs, scam risks</p>
              </div>
              <div className="border-l-4 border-accent/50 pl-4">
                <p className="text-sm font-semibold text-accent mb-1">FLOW Solution</p>
                <p className="text-sm text-muted-foreground">
                  Instant 60-second payouts, verified opportunities only, zero fees
                </p>
              </div>
              <div className="border-l-4 border-primary/50 pl-4">
                <p className="text-sm font-semibold text-primary mb-1">Results</p>
                <p className="text-sm text-muted-foreground">Never broke, total safety, unlimited earning potential</p>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mt-8 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
              onClick={() => login("worker")}
            >
              Start Earning Now
            </Button>
          </Card>
        </div>
      </section>

      {/* Why Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Built on Trust & Speed</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Both sides trust FLOW because every transaction is secure, transparent, and instantaneous.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-card border-accent/20 p-6 hover:border-accent/50 transition">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-bold text-foreground mb-2">60-Second Payouts</h4>
            <p className="text-sm text-muted-foreground">Money hits your account instantly upon verification</p>
          </Card>

          <Card className="bg-card border-primary/20 p-6 hover:border-primary/50 transition">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-foreground mb-2">100% Verified Work</h4>
            <p className="text-sm text-muted-foreground">Every task audited, every result guaranteed</p>
          </Card>

          <Card className="bg-card border-accent/20 p-6 hover:border-accent/50 transition">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-bold text-foreground mb-2">Full Transparency</h4>
            <p className="text-sm text-muted-foreground">Track every task, every review, every payment in real-time</p>
          </Card>

          <Card className="bg-card border-primary/20 p-6 hover:border-primary/50 transition">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-bold text-foreground mb-2">Quality at Scale</h4>
            <p className="text-sm text-muted-foreground">Verified network of thousands of dedicated workers</p>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Card className="bg-gradient-to-r from-accent/15 to-primary/15 border-accent/30 p-12 md:p-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Ready to Transform Your Workflow?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of organizations and students using FLOW to work smarter, faster, and with complete
              confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground h-14 px-10 text-lg font-semibold shadow-lg"
                onClick={() => login("worker")}
              >
                I'm a Student - Let's Earn
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-accent/30 hover:border-accent/60 h-14 px-10 text-lg font-semibold bg-transparent"
                onClick={() => login("client")}
              >
                I'm an Organization - Let's Scale
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
              <span className="text-xs text-accent font-semibold">Productivity Redefined</span>
            </div>
            <p className="text-muted-foreground text-sm">© 2025 Flow. Speed. Trust. Results.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
