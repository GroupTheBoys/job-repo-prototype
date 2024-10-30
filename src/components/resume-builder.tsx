'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { PlusCircle, Trash2, Download, Upload, CheckCircle, AlertCircle } from 'lucide-react'

type ResumeSection = {
  id: string
  title: string
  content: string
}

type Skill = {
  name: string
  level: number
}

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(123) 456-7890",
    location: "New York, NY"
  })

  const [summary, setSummary] = useState("Experienced software developer with a passion for creating efficient and scalable web applications.")

  const [sections, setSections] = useState<ResumeSection[]>([
    { id: "experience", title: "Work Experience", content: "Software Developer at TechCorp\n2018 - Present\n• Developed and maintained multiple web applications using React and Node.js\n• Collaborated with cross-functional teams to deliver high-quality software solutions\n• Implemented CI/CD pipelines to streamline development processes" },
    { id: "education", title: "Education", content: "Bachelor of Science in Computer Science\nUniversity of Technology\n2014 - 2018" },
    { id: "projects", title: "Projects", content: "E-commerce Platform\n• Built a full-stack e-commerce platform using MERN stack\n• Implemented user authentication, product catalog, and payment integration" }
  ])

  const [skills, setSkills] = useState<Skill[]>([
    { name: "React", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 80 },
    { name: "MongoDB", level: 75 }
  ])

  const [etScore, setEtScore] = useState(85)

  const handlePersonalInfoChange = (key: keyof typeof personalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [key]: value }))
  }

  const handleSectionChange = (id: string, content: string) => {
    setSections(prev => prev.map(section => section.id === id ? { ...section, content } : section))
  }

  const handleAddSection = () => {
    const newSection: ResumeSection = {
      id: `section-${Date.now()}`,
      title: "New Section",
      content: ""
    }
    setSections(prev => [...prev, newSection])
  }

  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(section => section.id !== id))
  }

  const handleAddSkill = () => {
    setSkills(prev => [...prev, { name: "New Skill", level: 50 }])
  }

  const handleSkillChange = (index: number, key: keyof Skill, value: string | number) => {
    setSkills(prev => prev.map((skill, i) => i === index ? { ...skill, [key]: value } : skill))
  }

  const handleDeleteSkill = (index: number) => {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Resume Builder</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Resume</CardTitle>
                <CardDescription>Create a professional resume tailored to your target job</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="sections">Sections</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={personalInfo.name}
                            onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={personalInfo.phone}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={personalInfo.location}
                            onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={summary}
                          onChange={(e) => setSummary(e.target.value)}
                          rows={4}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="sections">
                    <ScrollArea className="h-[400px] pr-4">
                      {sections.map(section => (
                        <Card key={section.id} className="mb-4">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-center">
                              <Input
                                value={section.title}
                                onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                className="font-semibold text-lg"
                              />
                              <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(section.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <Textarea
                              value={section.content}
                              onChange={(e) => handleSectionChange(section.id, e.target.content)}
                              rows={6}
                            />
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                    <Button onClick={handleAddSection} className="w-full mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Section
                    </Button>
                  </TabsContent>
                  <TabsContent value="skills">
                    <ScrollArea className="h-[400px] pr-4">
                      {skills.map((skill, index) => (
                        <div key={index} className="mb-4 flex items-center space-x-2">
                          <Input
                            value={skill.name}
                            onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                            className="flex-grow"
                          />
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={skill.level}
                            onChange={(e) => handleSkillChange(index, 'level', parseInt(e.target.value))}
                            className="w-20"
                          />
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteSkill(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </ScrollArea>
                    <Button onClick={handleAddSkill} className="w-full mt-4">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" /> Import Resume
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>AI-powered insights to improve your resume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>ET Score</Label>
                      <Badge variant={etScore >= 80 ? "default" : "secondary"}>{etScore}</Badge>
                    </div>
                    <Progress value={etScore} className="h-2" />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Suggestions</h3>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>Strong professional summary</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Add more quantifiable achievements</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>Consider adding relevant certifications</span>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h3 className="font-semibold">Keyword Analysis</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">React</Badge>
                      <Badge variant="secondary">Node.js</Badge>
                      <Badge variant="secondary">JavaScript</Badge>
                      <Badge variant="outline">Docker</Badge>
                      <Badge variant="outline">AWS</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}