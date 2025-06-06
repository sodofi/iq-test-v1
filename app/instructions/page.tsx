import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle, AlertTriangle } from "lucide-react"

export default function Instructions() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold">Quick Instructions</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 px-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Answer 10 questions</p>
                <p className="text-gray-600">Multiple choice format</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">15 minutes total</p>
                <p className="text-gray-600">Timer shown at top</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Answer in order</p>
                <p className="text-gray-600">Can't go back to previous questions</p>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-amber-800 text-sm">
                  <strong>Tip:</strong> If unsure, make your best guess and continue.
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-6 pb-6">
            <Link href="/quiz" className="w-full">
              <Button size="lg" className="w-full text-lg py-6">
                Begin Quiz
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
