"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { questions, calculateIQScore, getPercentileRanking, getIQCategory } from "@/lib/questions"
import { Brain, Award, Clock, ChevronRight } from "lucide-react"
import { PaymentGate } from "@/components/PaymentGate"

export default function Results() {
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [timeSpent, setTimeSpent] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Retrieve answers from localStorage
    const savedAnswers = localStorage.getItem("userAnswers")
    const savedTime = localStorage.getItem("timeSpent")

    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers))
    }

    if (savedTime) {
      setTimeSpent(JSON.parse(savedTime))
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your results...</p>
        </div>
      </div>
    )
  }

  // Calculate score
  const correctAnswers = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length
  const iqScore = calculateIQScore(correctAnswers)
  const percentile = getPercentileRanking(iqScore)
  const category = getIQCategory(iqScore)

  // Format time spent
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins} min ${secs} sec`
  }

  const ResultsContent = () => (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative">
          <div className="w-36 h-36 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-5xl font-bold text-primary">{iqScore}</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {category}
          </div>
        </div>

        <h3 className="text-xl font-medium mt-4">
          {iqScore >= 130 ? "Exceptional Result!" : iqScore >= 110 ? "Great Job!" : "Good Effort!"}
        </h3>

        <p className="text-gray-600 text-center mt-2 max-w-md">
          {iqScore >= 130
            ? "Your score is in the superior range, achieved by only a small percentage of test-takers."
            : iqScore >= 110
              ? "Your score is above average, showing strong logical reasoning abilities."
              : "You've completed the IQ assessment. With practice, you can improve your logical reasoning skills."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border flex flex-col items-center text-center">
          <Award className="h-8 w-8 text-yellow-500 mb-2" />
          <div className="text-lg font-medium">{correctAnswers} / 10</div>
          <div className="text-sm text-gray-500">Correct Answers</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border flex flex-col items-center text-center">
          <Brain className="h-8 w-8 text-blue-500 mb-2" />
          <div className="text-lg font-medium">Top {100 - percentile}%</div>
          <div className="text-sm text-gray-500">Percentile Ranking</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border flex flex-col items-center text-center">
          <Clock className="h-8 w-8 text-green-500 mb-2" />
          <div className="text-lg font-medium">{formatTime(timeSpent)}</div>
          <div className="text-sm text-gray-500">Time Spent</div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">What does your IQ score mean?</h3>
        <p className="text-blue-700 text-sm">
          IQ scores are designed to follow a normal distribution with an average of 100. About 68% of people score
          between 85 and 115. Scores above 130 are considered very high, while scores below 70 may indicate
          cognitive challenges.
        </p>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="text-center border-b pb-6">
            <CardTitle className="text-3xl font-bold">Your IQ Score Results</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <PaymentGate onSuccess={() => setShowResults(true)}>
              <ResultsContent />
            </PaymentGate>
          </CardContent>
          {showResults && (
            <CardFooter className="flex justify-center pb-6">
              <Link href="/analysis">
                <Button className="gap-2">
                  See Detailed Analysis
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  )
}
