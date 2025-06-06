"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { questions, getCategoryPerformance, getCategoryName } from "@/lib/questions"
import { CheckCircle, XCircle, BarChart3, ListChecks, Home } from "lucide-react"

export default function Analysis() {
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Retrieve answers from localStorage
    const savedAnswers = localStorage.getItem("userAnswers")

    if (savedAnswers) {
      setUserAnswers(JSON.parse(savedAnswers))
    }

    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading your analysis...</p>
        </div>
      </div>
    )
  }

  const categoryPerformance = getCategoryPerformance(userAnswers)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="w-full shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-bold">Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="questions">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="questions" className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4" />
                  Question Review
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Category Performance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="questions" className="space-y-6">
                {questions.map((question, index) => {
                  const isCorrect = userAnswers[index] === question.correctAnswer
                  const userSelection = userAnswers[index]

                  return (
                    <div
                      key={index}
                      className={`border rounded-lg p-4 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                    >
                      <div className="flex items-start gap-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="space-y-3 w-full">
                          <div>
                            <h3 className="font-medium">
                              Question {index + 1}: {question.question}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">Category: {getCategoryName(question.category)}</p>
                          </div>

                          <div className="grid gap-2">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`text-sm p-2 rounded ${
                                  optIndex === question.correctAnswer
                                    ? "bg-green-100 border border-green-300"
                                    : optIndex === userSelection && userSelection !== question.correctAnswer
                                      ? "bg-red-100 border border-red-300"
                                      : "bg-gray-50 border border-gray-200"
                                }`}
                              >
                                {option}
                                {optIndex === question.correctAnswer && (
                                  <span className="ml-2 text-green-600 font-medium">(Correct Answer)</span>
                                )}
                                {optIndex === userSelection && userSelection !== question.correctAnswer && (
                                  <span className="ml-2 text-red-600 font-medium">(Your Answer)</span>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="text-sm bg-white p-3 rounded border">
                            <span className="font-medium">Explanation:</span> {question.explanation}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>

              <TabsContent value="categories">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                    <h3 className="font-medium text-blue-800 mb-1">Performance by Category</h3>
                    <p className="text-blue-700 text-sm">
                      This chart shows your performance across different types of questions. Identifying your strengths
                      and weaknesses can help you improve.
                    </p>
                  </div>

                  {Object.entries(categoryPerformance).map(([category, data]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">{getCategoryName(category)}</h3>
                        <span className="text-sm font-medium">
                          {data.correct} / {data.total} correct
                        </span>
                      </div>
                      <Progress value={(data.correct / data.total) * 100} className="h-3" />
                      <p className="text-sm text-gray-600">
                        {data.correct === data.total
                          ? "Excellent! You mastered this category."
                          : data.correct > 0
                            ? `You got ${data.correct} out of ${data.total} questions correct in this category.`
                            : "This category needs improvement. Review the explanations to learn more."}
                      </p>
                    </div>
                  ))}

                  <div className="bg-gray-50 p-4 rounded-lg border mt-8">
                    <h3 className="font-medium mb-2">Improvement Tips</h3>
                    <ul className="text-sm space-y-2">
                      <li>• Practice logical puzzles and brain teasers regularly</li>
                      <li>• Read books on critical thinking and problem-solving</li>
                      <li>• Try different types of logic puzzles to improve weak areas</li>
                      <li>• Take your time when solving complex problems</li>
                      <li>• Review explanations carefully to understand solution patterns</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
