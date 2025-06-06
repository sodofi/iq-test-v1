import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Clock, Target } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">IQ Quiz</CardTitle>
            <p className="text-gray-600 text-sm">Test your intelligence in 15 minutes</p>
          </CardHeader>

          <CardContent className="space-y-4 px-6">
            <div className="flex items-center gap-3 text-sm">
              <Target className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span>10 challenging questions</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span>15 minute time limit</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Brain className="h-5 w-5 text-purple-600 flex-shrink-0" />
              <span>Get your IQ score & analysis</span>
            </div>
          </CardContent>

          <CardFooter className="px-6 pb-6">
            <Link href="/instructions" className="w-full">
              <Button size="lg" className="w-full text-lg py-6">
                Start Quiz
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <p className="mt-4 text-center text-xs text-gray-500 px-4">
          This is a simplified assessment. Professional testing should be done by qualified psychologists.
        </p>
      </div>
    </div>
  )
}
