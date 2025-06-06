export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  category: string
}

export const questions: Question[] = [
  {
    id: 1,
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    options: ["36", "42", "48", "54"],
    correctAnswer: 1, // 42
    explanation:
      "This is a sequence where the difference between consecutive terms increases by 2. The differences are 4, 6, 8, 10, so the next difference is 12. 30 + 12 = 42.",
    category: "number-sequence",
  },
  {
    id: 2,
    question: "Book is to Reading as Fork is to:",
    options: ["Eating", "Kitchen", "Spoon", "Food"],
    correctAnswer: 0, // Eating
    explanation: "A book is used for reading, and a fork is used for eating. This is a functional relationship.",
    category: "logical-analogy",
  },
  {
    id: 3,
    question: "Complete the pattern: AZ, BY, CX, DW, ?",
    options: ["EV", "FU", "EU", "FV"],
    correctAnswer: 0, // EV
    explanation: "The pattern follows first letter forward (A→B→C→D→E) and second letter backward (Z→Y→X→W→V).",
    category: "pattern-completion",
  },
  {
    id: 4,
    question: "If all Bloops are Razzles and some Razzles are Lazzles, which statement must be true?",
    options: ["All Lazzles are Bloops", "Some Bloops are Lazzles", "No Lazzles are Bloops", "All Bloops are Lazzles"],
    correctAnswer: 1, // Some Bloops are Lazzles
    explanation: "If all Bloops are Razzles and some Razzles are Lazzles, then some Bloops must also be Lazzles.",
    category: "logical-deduction",
  },
  {
    id: 5,
    question: "If you rearrange the letters 'CIFAIPC', you would have the name of a:",
    options: ["City", "Animal", "Ocean", "Planet"],
    correctAnswer: 2, // Ocean
    explanation: "The letters 'CIFAIPC' rearranged spell 'PACIFIC', which is an ocean (the Pacific Ocean).",
    category: "word-relationship",
  },
  {
    id: 6,
    question: "What number should come next in this series: 1, 4, 9, 16, 25, ?",
    options: ["30", "36", "49", "64"],
    correctAnswer: 1, // 36
    explanation:
      "This is a sequence of perfect squares: 1² = 1, 2² = 4, 3² = 9, 4² = 16, 5² = 25, so the next number is 6² = 36.",
    category: "mathematical-logic",
  },
  {
    id: 7,
    question: "In a race, John finished before Mary but after Sam. Lisa finished before Sam. Who finished last?",
    options: ["John", "Mary", "Sam", "Lisa"],
    correctAnswer: 1, // Mary
    explanation: "The order is: Lisa, Sam, John, Mary. Therefore, Mary finished last.",
    category: "logical-deduction",
  },
  {
    id: 8,
    question: "Which word does NOT belong with the others?",
    options: ["Parrot", "Eagle", "Ostrich", "Penguin"],
    correctAnswer: 0, // Parrot
    explanation: "Parrot is the only bird that can mimic human speech. The others are all flightless birds.",
    category: "word-relationship",
  },
  {
    id: 9,
    question: "If you count from 1 to 100, how many 7's will you pass on the way?",
    options: ["10", "19", "20", "21"],
    correctAnswer: 2, // 20
    explanation:
      "There are 10 numbers with 7 in the ones place (7, 17, 27, ..., 97) and 10 numbers with 7 in the tens place (70, 71, 72, ..., 79), for a total of 20.",
    category: "mathematical-logic",
  },
  {
    id: 10,
    question: "Complete the analogy: Triangle is to 3 as Pentagon is to:",
    options: ["5", "6", "8", "10"],
    correctAnswer: 0, // 5
    explanation: "A triangle has 3 sides, and a pentagon has 5 sides.",
    category: "logical-analogy",
  },
]

export const calculateIQScore = (correctAnswers: number): number => {
  // Simple conversion formula for demonstration purposes
  // In reality, IQ scores are normalized based on population statistics
  const baseIQ = 100
  const pointsPerQuestion = 10

  return baseIQ + (correctAnswers - 5) * pointsPerQuestion
}

export const getPercentileRanking = (iqScore: number): number => {
  // Simplified percentile calculation
  // In reality, this would be based on a normal distribution
  if (iqScore <= 70) return 2
  if (iqScore <= 85) return 16
  if (iqScore <= 100) return 50
  if (iqScore <= 115) return 84
  if (iqScore <= 130) return 98
  if (iqScore <= 145) return 99.6
  return 99.9
}

export const getIQCategory = (iqScore: number): string => {
  if (iqScore < 70) return "Below Average"
  if (iqScore < 90) return "Low Average"
  if (iqScore < 110) return "Average"
  if (iqScore < 120) return "High Average"
  if (iqScore < 130) return "Superior"
  if (iqScore < 145) return "Very Superior"
  return "Genius"
}

export const getCategoryPerformance = (userAnswers: number[]): Record<string, { correct: number; total: number }> => {
  const categories: Record<string, { correct: number; total: number }> = {}

  questions.forEach((question, index) => {
    if (!categories[question.category]) {
      categories[question.category] = { correct: 0, total: 0 }
    }

    categories[question.category].total += 1
    if (userAnswers[index] === question.correctAnswer) {
      categories[question.category].correct += 1
    }
  })

  return categories
}

export const getCategoryName = (category: string): string => {
  const names: Record<string, string> = {
    "number-sequence": "Number Sequences",
    "logical-analogy": "Logical Analogies",
    "pattern-completion": "Pattern Completion",
    "logical-deduction": "Logical Deduction",
    "word-relationship": "Word Relationships",
    "mathematical-logic": "Mathematical Logic",
  }

  return names[category] || category
}
