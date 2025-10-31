"use client"

import { useDummyAuth } from "@/hooks/use-dummy-auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, Users, TrendingUp, Clock } from "lucide-react"

export function LandingPage() {
  const { login } = useDummyAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-lg">
              ⚡
            </div>
            <span className="text-2xl font-bold text-foreground">Flow</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <button className="text-muted-foreground hover:text-foreground transition">Tasks</button>
            <button className="text-muted-foreground hover:text-foreground transition">Earn</button>
            <button className="text-muted-foreground hover:text-foreground transition">Clients</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Earn Money in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">60 Seconds</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Join Flow and start earning instantly. Complete quick tasks, get verified, and receive payments
              immediately. No applications, no delays.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white text-lg h-12 px-8"
                onClick={() => login("worker")}
              >
                Start as Worker <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/30 hover:border-primary/60 text-lg h-12 px-8 bg-transparent"
                onClick={() => login("client")}
              >
                Post Tasks
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <Card className="relative bg-card border-primary/20 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Zap className="w-5 h-5 text-accent animate-pulse-accent" />
                  <div>
                    <p className="font-semibold text-foreground">Instant Payment</p>
                    <p className="text-sm text-muted-foreground">Get paid in 60 seconds</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-semibold text-foreground">Quick Tasks</p>
                    <p className="text-sm text-muted-foreground">5-30 minutes per task</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-semibold text-foreground">Earn More</p>
                    <p className="text-sm text-muted-foreground">¥450 - ¥4,200 per task</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-border">
        <h2 className="text-4xl font-bold text-center mb-16 text-foreground">Why Choose Flow?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border-border p-8 hover:border-primary/50 transition">
            <Zap className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Lightning Fast</h3>
            <p className="text-muted-foreground">
              From task selection to payment in under 60 seconds. No waiting, no delays. Speed is everything.
            </p>
          </Card>

          <Card className="bg-card border-border p-8 hover:border-primary/50 transition">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Trusted Community</h3>
            <p className="text-muted-foreground">
              Join thousands of users earning real money. Transparent ratings, fair verification, and honest payments.
            </p>
          </Card>

          <Card className="bg-card border-border p-8 hover:border-primary/50 transition">
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-3">Earn More</h3>
            <p className="text-muted-foreground">
              Competitive rewards from ¥450 to ¥4,200 per task. More tasks completed = More money earned.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 p-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Start Earning?</h2>
          <p className="text-xl text-muted-foreground mb-8">Choose your role and start completing tasks immediately.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white h-12 px-8"
              onClick={() => login("worker")}
            >
              I Want to Earn
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary/30 hover:border-primary/60 h-12 px-8 bg-transparent"
              onClick={() => login("client")}
            >
              I Want to Post Tasks
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; 2025 Flow. Earn fast. Live better.</p>
        </div>
      </footer>
    </div>
  )
}
