"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/lib/questions"
import { AlertCircle, Clock } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Quiz() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(-1))
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [showWarning, setShowWarning] = useState(false)

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleQuizCompletion = useCallback(() => {
    // Store answers in localStorage for results page
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers))
    localStorage.setItem("timeSpent", JSON.stringify(15 * 60 - timeLeft))
    router.push("/results")
  }, [userAnswers, timeLeft, router])

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleQuizCompletion()
          return 0
        }

        // Show warning when 2 minutes left
        if (prev === 120) {
          setShowWarning(true)
          setTimeout(() => setShowWarning(false), 5000)
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [handleQuizCompletion])

  const handleNextQuestion = () => {
    // Save the current answer
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = selectedAnswer !== null ? selectedAnswer : -1
    setUserAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      // Quiz completed
      handleQuizCompletion()
    }
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {showWarning && (
          <Alert variant="destructive" className="mb-4 animate-pulse">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Only 2 minutes remaining! Please finish your quiz.</AlertDescription>
          </Alert>
        )}

        <Card className="w-full shadow-lg">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Progress value={(currentQuestion + 1) * 10} className="w-24" />
              </div>
              <div className={`flex items-center gap-2 ${timeLeft <= 180 ? "text-red-500" : ""}`}>
                <Clock className="h-4 w-4" />
                <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
              </div>
            </div>
            <CardTitle className="text-xl mt-2">{currentQuestionData.question}</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}
            >
              {currentQuestionData.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${
                    selectedAnswer === index ? "border-primary bg-primary/5" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedAnswer(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between pt-2">
            <div className="text-sm text-gray-500">
              {selectedAnswer === null ? "Select an answer to continue" : "Click Next to continue"}
            </div>
            <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
              {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
