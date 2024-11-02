'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, GraduationCap, Award, Star, ChevronRight, ChevronLeft } from 'lucide-react'

type Candidate = {
  id: number
  name: string
  avatar: string
  currentRole: string
  etScore: number
  experience: number
  education: string
  skills: { name: string; level: number }[]
  certifications: string[]
}

export default function CandidateComparisonTool() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=80&width=80",
      currentRole: "Senior Frontend Developer",
      etScore: 92,
      experience: 7,
      education: "B.S. in Computer Science",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "GraphQL", level: 85 },
        { name: "Node.js", level: 80 },
      ],
      certifications: ["AWS Certified Developer", "Google Cloud Professional"]
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=80&width=80",
      currentRole: "Frontend Developer",
      etScore: 88,
      experience: 5,
      education: "B.A. in Web Development",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 92 },
        { name: "CSS", level: 88 },
        { name: "Vue.js", level: 85 },
      ],
      certifications: ["React Certification", "JavaScript Algorithms and Data Structures"]
    },
    {
      id: 3,
      name: "Charlie Davis",
      avatar: "/placeholder.svg?height=80&width=80",
      currentRole: "Full Stack Developer",
      etScore: 90,
      experience: 6,
      education: "M.S. in Software Engineering",
      skills: [
        { name: "React", level: 88 },
        { name: "Node.js", level: 92 },
        { name: "MongoDB", level: 85 },
        { name: "Express.js", level: 87 },
      ],
      certifications: ["MongoDB Certified Developer", "Node.js Certification"]
    }
  ])

  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([1, 2])

  const handleCandidateToggle = (candidateId: number) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    )
  }

  const filteredCandidates = candidates.filter(candidate => selectedCandidates.includes(candidate.id))

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Candidate Comparison Tool</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Select Candidates to Compare</h2>
          <div className="flex flex-wrap gap-4">
            {candidates.map(candidate => (
              <Button
                key={candidate.id}
                variant={selectedCandidates.includes(candidate.id) ? "default" : "outline"}
                onClick={() => handleCandidateToggle(candidate.id)}
              >
                {candidate.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCandidates.map(candidate => (
            <Card key={candidate.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={candidate.avatar} alt={candidate.name} />
                    <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{candidate.name}</CardTitle>
                    <CardDescription>{candidate.currentRole}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <Tabs defaultValue="overview" className="h-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="h-[300px]">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Star className="mr-2 h-4 w-4 text-yellow-500" />
                            ET Score
                          </h3>
                          <div className="flex items-center mt-2">
                            <Progress value={candidate.etScore} className="w-full mr-2" />
                            <span className="font-semibold">{candidate.etScore}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <Briefcase className="mr-2 h-4 w-4" />
                            Experience
                          </h3>
                          <p>{candidate.experience} years</p>
                        </div>
                        <div>
                          <h3 className="font-semibold flex items-center">
                            <GraduationCap className="mr-2 h-4 w-4" />
                            Education
                          </h3>
                          <p>{candidate.education}</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="skills" className="h-[300px]">
                    <ScrollArea className="h-full">
                      <div className="space-y-4">
                        {candidate.skills.map(skill => (
                          <div key={skill.name}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{skill.name}</span>
                              <span className="text-sm font-medium">{skill.level}%</span>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="certifications" className="h-[300px]">
                    <ScrollArea className="h-full">
                      <div className="space-y-2">
                        {candidate.certifications.map((cert, index) => (
                          <Badge key={index} variant="secondary" className="mr-2 mb-2">
                            <Award className="mr-1 h-4 w-4" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Job Listing
          </Button>
          <Button>
            Schedule Interviews
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}