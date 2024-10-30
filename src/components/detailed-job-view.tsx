'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Briefcase, DollarSign, Calendar, Building, Users, ChevronRight } from 'lucide-react'

export default function DetailedJobView() {
  const [job, setJob] = useState({
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    posted: "2 days ago",
    applicants: 45,
    etScore: 92,
    description: "We are seeking a talented Senior Frontend Developer to join our innovative team at TechCorp. The ideal candidate will have a strong background in modern web technologies and a passion for creating exceptional user experiences.",
    responsibilities: [
      "Develop and maintain high-quality, responsive web applications",
      "Collaborate with designers and backend developers to implement new features",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging trends and technologies in frontend development"
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Expert knowledge of JavaScript, HTML, and CSS",
      "Strong proficiency in React and its ecosystem",
      "Experience with state management (e.g., Redux, MobX)",
      "Familiarity with modern frontend build tools and workflows",
      "Excellent problem-solving and communication skills"
    ],
    skills: ["React", "TypeScript", "GraphQL", "Redux", "Webpack", "Jest"]
  })

  const [userSkills, setUserSkills] = useState({
    React: 90,
    TypeScript: 85,
    GraphQL: 70,
    Redux: 80,
    Webpack: 75,
    Jest: 65
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600">{job.company}</p>
              </div>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {job.etScore}% Match
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="mr-2" size={18} />
                {job.location}
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="mr-2" size={18} />
                {job.type}
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="mr-2" size={18} />
                {job.salary}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-2" size={18} />
                Posted {job.posted}
              </div>
              <div className="flex items-center text-gray-600">
                <Building className="mr-2" size={18} />
                {job.company}
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="mr-2" size={18} />
                {job.applicants} applicants
              </div>
            </div>
            <div className="mb-6">
              {job.skills.map(skill => (
                <Badge key={skill} variant="outline" className="mr-2 mb-2">
                  {skill}
                </Badge>
              ))}
            </div>
            <Button size="lg" className="w-full md:w-auto">Apply Now</Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="description" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="etScore">ET Score</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <Card>
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{job.description}</p>
                <h3 className="text-lg font-semibold mb-2">Responsibilities:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {job.responsibilities.map((resp, index) => (
                    <li key={index} className="mb-1">{resp}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="requirements">
            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="mb-2">{req}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="etScore">
            <Card>
              <CardHeader>
                <CardTitle>Your ET Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(userSkills).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill}</span>
                        <span className="text-sm font-medium text-gray-700">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Improve Your ET Score</h4>
                  <p className="mb-4">Take skill assessments to boost your match percentage for this job.</p>
                  <Button variant="outline">
                    View Skill Tests
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}