'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CheckCircle2, BookOpen, Code, Trophy, Star, ArrowRight, PlayCircle, FileText, Zap, Clock } from 'lucide-react'

type Skill = {
  name: string
  level: number
  status: 'completed' | 'in-progress' | 'not-started'
}

type Course = {
  id: number
  title: string
  provider: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  enrolled: number
  description: string
}

type Project = {
  id: number
  title: string
  description: string
  skills: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  estimatedTime: string
}

export default function SkillDevelopmentRoadmap() {
  const [currentSkills] = useState<Skill[]>([
    { name: "JavaScript", level: 70, status: 'in-progress' },
    { name: "React", level: 60, status: 'in-progress' },
    { name: "Node.js", level: 40, status: 'in-progress' },
    { name: "TypeScript", level: 30, status: 'not-started' },
    { name: "GraphQL", level: 20, status: 'not-started' },
  ])

  const [recommendedCourses] = useState<Course[]>([
    {
      id: 1,
      title: "Advanced JavaScript Concepts",
      provider: "TechEdu",
      duration: "4 weeks",
      difficulty: "Intermediate",
      rating: 4.7,
      enrolled: 15000,
      description: "Deep dive into advanced JavaScript concepts including closures, prototypes, and async programming."
    },
    {
      id: 2,
      title: "React Hooks Masterclass",
      provider: "CodeAcademy",
      duration: "3 weeks",
      difficulty: "Intermediate",
      rating: 4.8,
      enrolled: 12000,
      description: "Master React Hooks and learn to build efficient and reusable React components."
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      provider: "ServerSide Learning",
      duration: "6 weeks",
      difficulty: "Intermediate",
      rating: 4.6,
      enrolled: 8000,
      description: "Learn to build scalable backend applications with Node.js, Express, and MongoDB."
    },
  ])

  const [recommendedProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Full-Stack Task Management App",
      description: "Build a task management application with React frontend and Node.js backend. Implement user authentication, CRUD operations, and real-time updates.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      difficulty: "Medium",
      estimatedTime: "4-6 weeks"
    },
    {
      id: 2,
      title: "Real-time Chat Application",
      description: "Create a real-time chat application using React for the frontend and Socket.io with Node.js for the backend. Implement features like private messaging and chat rooms.",
      skills: ["React", "Node.js", "Socket.io"],
      difficulty: "Medium",
      estimatedTime: "3-4 weeks"
    },
    {
      id: 3,
      title: "E-commerce Platform",
      description: "Develop a full-fledged e-commerce platform with features like product catalog, shopping cart, user authentication, and payment integration.",
      skills: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
      difficulty: "Hard",
      estimatedTime: "8-10 weeks"
    },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Your Skill Development Roadmap</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Current Skills</CardTitle>
              <CardDescription>Your progress in key areas</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {currentSkills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <Badge variant={
                        skill.status === 'completed' ? 'default' :
                        skill.status === 'in-progress' ? 'secondary' : 'outline'
                      }>
                        {skill.status === 'completed' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                        {skill.status.charAt(0).toUpperCase() + skill.status.slice(1)}
                      </Badge>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                    <span className="text-sm text-gray-500">{skill.level}% Proficiency</span>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Zap className="mr-2 h-4 w-4" />
                Take Skill Assessment
              </Button>
            </CardFooter>
          </Card>
          
          <div className="md:col-span-2">
            <Tabs defaultValue="courses" className="space-y-4">
              <TabsList>
                <TabsTrigger value="courses">Recommended Courses</TabsTrigger>
                <TabsTrigger value="projects">Recommended Projects</TabsTrigger>
              </TabsList>
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Courses</CardTitle>
                    <CardDescription>Courses tailored to enhance your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      {recommendedCourses.map(course => (
                        <Card key={course.id} className="mb-4">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{course.title}</h3>
                                <p className="text-sm text-gray-600">{course.provider}</p>
                              </div>
                              <Badge>{course.difficulty}</Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{course.description}</p>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <Badge variant="secondary" className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                {course.duration}
                              </Badge>
                              <Badge variant="secondary" className="flex items-center">
                                <Star className="mr-1 h-3 w-3" />
                                {course.rating} ({course.enrolled} enrolled)
                              </Badge>
                            </div>
                            <Button className="w-full">
                              <PlayCircle className="mr-2 h-4 w-4" />
                              Start Course
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <CardTitle>Recommended Projects</CardTitle>
                    <CardDescription>Hands-on projects to apply and showcase your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      {recommendedProjects.map(project => (
                        <Accordion type="single" collapsible key={project.id} className="mb-4">
                          <AccordionItem value={`project-${project.id}`}>
                            <AccordionTrigger>
                              <div className="flex justify-between items-center w-full">
                                <span className="font-semibold text-lg">{project.title}</span>
                                <Badge>{project.difficulty}</Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {project.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline">{skill}</Badge>
                                ))}
                              </div>
                              <p className="text-sm text-gray-600 mb-4">
                                <Clock className="inline mr-1 h-3 w-3" />
                                Estimated time: {project.estimatedTime}
                              </p>
                              <Button className="w-full">
                                <Code className="mr-2 h-4 w-4" />
                                Start Project
                              </Button>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Learning Path</CardTitle>
            <CardDescription>Recommended steps to achieve your career goals</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="relative border-l border-gray-200 dark:border-gray-700">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <BookOpen className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  Complete "Advanced JavaScript Concepts" course
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ml-3">In Progress</span>
                </h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Estimated completion: 2 weeks</time>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Deepen your understanding of JavaScript to build a strong foundation for advanced web development.</p>
                <Button variant="outline">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Continue Learning
                </Button>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Code className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Build "Real-time Chat Application" project</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Estimated time: 3-4 weeks</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Apply your React and Node.js skills to create a functional real-time chat application. This project will help you understand full-stack development and real-time communication.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-blue-900">
                  <Trophy className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">Achieve "Full Stack Developer" certification</h3>
                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Target date: December 2024</time>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Complete all required courses and projects to earn your Full Stack Developer certification, showcasing your comprehensive skills to potential employers.</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}