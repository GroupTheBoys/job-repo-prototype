'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Bell, Briefcase, CheckCircle } from 'lucide-react'

export default function Dashboard() {
  const [etScore, setEtScore] = useState(75)
  const [recentJobs, setRecentJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TechCorp", match: 85 },
    { id: 2, title: "UI/UX Designer", company: "DesignHub", match: 78 },
    { id: 3, title: "Full Stack Engineer", company: "WebSolutions", match: 92 },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back, John!</h1>
        <p className="text-xl text-gray-600">Let's find your perfect job match.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your ET Score</CardTitle>
            <CardDescription>Overall compatibility score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200 stroke-current"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                  ></circle>
                  <circle
                    className="text-blue-600  progress-ring stroke-current"
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - etScore / 100)}`}
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">{etScore}</span>
                </div>
              </div>
            </div>
            <p className="text-center mt-4 text-sm text-gray-600">Great job! Your ET Score is above average.</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Job Matches</CardTitle>
            <CardDescription>Based on your ET Score and skills</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentJobs.map(job => (
                <li key={job.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium text-blue-600">{job.match}% Match</span>
                    <Button variant="outline">View</Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Verification</CardTitle>
            <CardDescription>Boost your ET Score</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>JavaScript</span>
                <Button size="sm">Take Test</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>React</span>
                <Button size="sm">Take Test</Button>
              </li>
              <li className="flex items-center justify-between">
                <span>UI/UX Design</span>
                <Button size="sm">Take Test</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-600" />
                <span>New job match: Senior Frontend Developer</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                <span>Your application was viewed by TechCorp</span>
              </li>
              <li className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-purple-600" />
                <span>Interview invitation from DesignHub</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}