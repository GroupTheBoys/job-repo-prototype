'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Plus, Briefcase, Users, BarChart } from 'lucide-react'

export default function RecruiterDashboard() {
  const [activeJobs, setActiveJobs] = useState([
    { id: 1, title: "Senior Frontend Developer", applicants: 45, newApplicants: 5, avgETScore: 82 },
    { id: 2, title: "UX Designer", applicants: 38, newApplicants: 3, avgETScore: 79 },
    { id: 3, title: "Full Stack Engineer", applicants: 62, newApplicants: 8, avgETScore: 85 },
  ])

  const [topCandidates, setTopCandidates] = useState([
    { id: 1, name: "Alice Johnson", role: "Senior Frontend Developer", etScore: 95, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Bob Smith", role: "UX Designer", etScore: 92, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Charlie Brown", role: "Full Stack Engineer", etScore: 90, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "Diana Ross", role: "Senior Frontend Developer", etScore: 88, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 5, name: "Ethan Hunt", role: "Full Stack Engineer", etScore: 87, avatar: "/placeholder.svg?height=40&width=40" },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Recruiter Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your job postings and candidates</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs.length}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeJobs.reduce((sum, job) => sum + job.applicants, 0)}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average ET Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(activeJobs.reduce((sum, job) => sum + job.avgETScore, 0) / activeJobs.length)}
              </div>
              <p className="text-xs text-muted-foreground">
                +5 points from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Active Job Postings</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New Job
            </Button>
          </div>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Total Applicants</TableHead>
                    <TableHead>New Applicants</TableHead>
                    <TableHead>Avg. ET Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activeJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{job.newApplicants} new</Badge>
                      </TableCell>
                      <TableCell>{job.avgETScore}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Applicants</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Candidates</h2>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Applied For</TableHead>
                    <TableHead>ET Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={candidate.avatar} alt={candidate.name} />
                          <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {candidate.name}
                      </TableCell>
                      <TableCell>{candidate.role}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{candidate.etScore}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}