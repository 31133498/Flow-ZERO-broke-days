import { Mail } from "lucide-react"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-accent p-4 rounded-full">
            <Mail className="w-8 h-8 text-accent-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
        <p className="text-muted-foreground mb-6">
          We've sent a confirmation link to your email. Click it to activate your account and start earning.
        </p>
        <Link href="/auth/login" className="text-primary underline underline-offset-4 hover:text-primary/80">
          Back to login
        </Link>
      </div>
    </div>
  )
}
