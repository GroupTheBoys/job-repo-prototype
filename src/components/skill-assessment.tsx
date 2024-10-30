'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react'

export default function SkillAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds
  const [testCompleted, setTestCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const questions = [
    {
      question: "What is the primary purpose of React's useEffect hook?",
      options: [
        "To handle state updates",
        "To perform side effects in function components",
        "To create custom hooks",
        "To optimize rendering performance"
      ],
      correctAnswer: "To perform side effects in function components",
      explanation: "The useEffect hook in React is used to perform side effects in function components. Side effects could include data fetching, subscriptions, or manually changing the DOM. It runs after every render by default, but can be optimized to run only when certain values change."
    },
    {
      question: "Which of the following is NOT a valid way to create a React component?",
      options: [
        "Function declaration",
        "Arrow function",
        "Class extending React.Component",
        "Object literal"
      ],
      correctAnswer: "Object literal",
      explanation: "React components can be created using function declarations, arrow functions, or classes that extend React.Component. Object literals are not a valid way to create React components. Components must be functions or classes that return JSX."
    },
    {
      question: "What is the purpose of the key prop in React lists?",
      options: [
        "To style list items",
        "To filter list items",
        "To help React identify which items have changed, been added, or been removed",
        "To sort list items"
      ],
      correctAnswer: "To help React identify which items have changed, been added, or been removed",
      explanation: "The key prop is used to give each element in a list a stable identity. React uses the key prop to identify which items have changed, been added, or been removed. This helps React optimize rendering of dynamic lists and improves performance."
    },
    {
      question: "What is the correct way to pass a prop called 'name' to a child component?",
      options: [
        "<ChildComponent name={name} />",
        "<ChildComponent name='name' />",
        "<ChildComponent {name} />",
        "<ChildComponent props={name} />"
      ],
      correctAnswer: "<ChildComponent name={name} />",
      explanation: "To pass a prop to a child component, you use the attribute name followed by the value in curly braces. In this case, <ChildComponent name={name} /> correctly passes a prop called 'name' with the value of the 'name' variable."
    },
    {
      question: "Which hook would you use to access the context in a functional component?",
      options: [
        "useContext",
        "useReducer",
        "useState",
        "useEffect"
      ],
      correctAnswer: "useContext",
      explanation: "The useContext hook is used to access the value of a React context in a functional component. It allows components to consume context without wrapping them in a Context.Consumer component."
    }
  ]

  useEffect(() => {
    if (timeLeft > 0 && !testCompleted) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timerId)
    } else if (timeLeft === 0 && !testCompleted) {
      handleTestCompletion()
    }
  }, [timeLeft, testCompleted])

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }
    setSelectedAnswer('')
    setShowExplanation(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleTestCompletion()
    }
  }

  const handleTestCompletion = () => {
    setTestCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  if (testCompleted) {
    const percentage = (score / questions.length) * 100
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">React Skill Assessment Completed</CardTitle>
            <CardDescription>Here's how you performed on the React skill verification test</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <p className="text-4xl font-bold mb-2">{percentage.toFixed(0)}%</p>
              <p className="text-xl">You scored {score} out of {questions.length}</p>
            </div>
            <Progress value={percentage} className="w-full h-3 mb-4" />
            {percentage >= 80 ? (
              <Alert className="mb-4">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Excellent work!</AlertTitle>
                <AlertDescription>
                  You've demonstrated a strong understanding of React. This will positively impact your ET score for React-related positions.
                </AlertDescription>
              </Alert>
            ) : percentage >= 60 ? (
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Good effort!</AlertTitle>
                <AlertDescription>
                  You've shown a good grasp of React, but there's room for improvement. Consider reviewing the topics you struggled with and retake the test to boost your ET score.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Keep practicing!</AlertTitle>
                <AlertDescription>
                  You might want to spend more time studying React concepts. Don't worry, you can retake the test after some practice to improve your ET score.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Review Answers</Button>
            <Button>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">React Skill Assessment</CardTitle>
          <CardDescription>Question {currentQuestion + 1} of {questions.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={(currentQuestion / questions.length) * 100} className="w-full h-3" />
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium">Progress: {currentQuestion + 1}/{questions.length}</span>
            <Badge variant="secondary" className="text-sm font-medium flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              Time left: {formatTime(timeLeft)}
            </Badge>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
            <RadioGroup onValueChange={handleAnswerSelection} value={selectedAnswer}>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {showExplanation && (
            <Alert className="mb-4">
              <AlertTitle>Explanation</AlertTitle>
              <AlertDescription>
                {questions[currentQuestion].explanation}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setShowExplanation(!showExplanation)}>
            {showExplanation ? 'Hide' : 'Show'} Explanation
          </Button>
          <Button 
            onClick={handleNextQuestion} 
            disabled={!selectedAnswer}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}