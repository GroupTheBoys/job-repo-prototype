'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, MapPin, GraduationCap, Award, Github, Linkedin, Mail, Phone, Calendar } from 'lucide-react'

export default function CandidateProfile() {
  const [candidate, setCandidate] = useState({
    name: "Alice Johnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=128&width=128",
    etScore: 92,
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "GraphQL", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "CSS/SASS", level: 88 },
    ],
    experience: [
      {
        company: "TechCorp",
        position: "Senior Frontend Developer",
        duration: "2019 - Present",
        description: "Led the frontend team in developing a large-scale SaaS application using React and GraphQL."
      },
      {
        company: "WebSolutions Inc.",
        position: "Frontend Developer",
        duration: "2016 - 2019",
        description: "Developed responsive web applications using React and Redux, improving site performance by 40%."
      }
    ],
    education: [
      {
        institution: "University of California, Berkeley",
        degree: "B.S. in Computer Science",
        year: "2016"
      }
    ],
    certifications: [
      "AWS Certified Developer - Associate",
      "Google Cloud Professional Cloud Developer"
    ],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB.",
        link: "https://github.com/alicejohnson/ecommerce-platform"
      },
      {
        name: "Weather App",
        description: "Developed a real-time weather application using React and OpenWeatherMap API.",
        link: "https://github.com/alicejohnson/weather-app"
      }
    ]
  })

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4 md:mb-0 md:mr-6">
                <AvatarImage src={candidate.avatar} alt={candidate.name} />
                <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{candidate.name}</h1>
                <p className="text-xl text-gray-600 mb-2">{candidate.title}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary" className="flex items-center">
                    <MapPin className="mr-1 h-3 w-3" />
                    {candidate.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Mail className="mr-1 h-3 w-3" />
                    {candidate.email}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Phone className="mr-1 h-3 w-3" />
                    {candidate.phone}
                  </Badge>
                </div>
                <div className="flex justify-center md:justify-start gap-2">
                  <Button variant="outline" size="sm">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ET Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{candidate.etScore}</div>
              <Progress value={candidate.etScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                Top 10% of candidates
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5+ years</div>
              <p className="text-xs text-muted-foreground mt-2">
                In frontend development
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Education</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">B.S.</div>
              <p className="text-xs text-muted-foreground mt-2">
                Computer Science, UC Berkeley
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="skills" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Technical Skills</CardTitle>
                <CardDescription>Verified through skill assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidate.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.experience.map((exp, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="text-lg font-semibold">{exp.position}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Briefcase className="mr-2 h-4 w-4" />
                        {exp.company}
                        <span className="mx-2">•</span>
                        <Calendar className="mr-2 h-4 w-4" />
                        {exp.duration}
                      </div>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education & Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.education.map((edu, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="text-lg font-semibold">{edu.degree}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        {edu.institution}
                        <span className="mx-2">•</span>
                        <Calendar className="mr-2 h-4 w-4" />
                        {edu.year}
                      </div>
                    </div>
                  ))}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                    <ul className="list-disc list-inside">
                      {candidate.certifications.map((cert, index) => (
                        <li key={index} className="text-gray-700">{cert}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>Notable projects and contributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {candidate.projects.map((project, index) => (
                    <div key={index} className="border-b last:border-b-0 pb-4 last:pb-0">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      <Button variant="link" className="p-0">
                        <Github className="mr-2 h-4 w-4" />
                        View on GitHub
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardContent className="flex justify-between items-center p-6">
            <div>
              <h3 className="text-lg font-semibold mb-1">Interested in this candidate?</h3>
              <p className="text-gray-600">Schedule an interview or add to your shortlist.</p>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Add to Shortlist</Button>
              <Button>Schedule Interview</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}