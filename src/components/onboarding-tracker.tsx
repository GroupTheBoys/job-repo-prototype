'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, Briefcase, CheckCircle, Clock, AlertTriangle, Users, FileText, Mail } from 'lucide-react'

type OnboardingTask = {
  id: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'not-started'
  dueDate: string
}

type NewHire = {
  id: string
  name: string
  position: string
  department: string
  startDate: string
  avatar: string
  progress: number
}

export default function OnboardingTracker() {
  const [newHires, setNewHires] = useState<NewHire[]>([
    { id: '1', name: 'Alice Johnson', position: 'Frontend Developer', department: 'Engineering', startDate: '2024-11-15', avatar: '/placeholder.svg?height=40&width=40', progress: 75 },
    { id: '2', name: 'Bob Smith', position: 'UX Designer', department: 'Design', startDate: '2024-11-20', avatar: '/placeholder.svg?height=40&width=40', progress: 50 },
    { id: '3', name: 'Charlie Davis', position: 'Product Manager', department: 'Product', startDate: '2024-11-25', avatar: '/placeholder.svg?height=40&width=40', progress: 25 },
  ])

  const [selectedHire, setSelectedHire] = useState<NewHire | null>(newHires[0])

  const [tasks, setTasks] = useState<OnboardingTask[]>([
    { id: '1', title: 'Complete new hire paperwork', description: 'Fill out all necessary forms and documents', status: 'completed', dueDate: '2024-11-16' },
    { id: '2', title: 'Set up workstation', description: 'Prepare computer, software, and necessary equipment', status: 'completed', dueDate: '2024-11-17' },
    { id: '3', title: 'Schedule orientation', description: 'Arrange company and team introductions', status: 'in-progress', dueDate: '2024-11-18' },
    { id: '4', title: 'Assign onboarding buddy', description: 'Pair with an experienced team member', status: 'in-progress', dueDate: '2024-11-19' },
    { id: '5', title: 'Review company policies', description: 'Go through employee handbook and guidelines', status: 'not-started', dueDate: '2024-11-20' },
    { id: '6', title: 'Set up accounts', description: 'Create necessary email and software accounts', status: 'not-started', dueDate: '2024-11-21' },
  ])

  const handleTaskStatusChange = (taskId: string, newStatus: 'completed' | 'in-progress' | 'not-started') => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
    updateHireProgress()
  }

  const updateHireProgress = () => {
    if (selectedHire) {
      const completedTasks = tasks.filter(task => task.status === 'completed').length
      const newProgress = Math.round((completedTasks / tasks.length) * 100)
      setNewHires(newHires.map(hire => 
        hire.id === selectedHire.id ? { ...hire, progress: newProgress } : hire
      ))
      setSelectedHire({ ...selectedHire, progress: newProgress })
    }
  }

  const addNewTask = (title: string, description: string, dueDate: string) => {
    const newTask: OnboardingTask = {
      id: Date.now().toString(),
      title,
      description,
      status: 'not-started',
      dueDate
    }
    setTasks([...tasks, newTask])
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Onboarding Tracker</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>New Hires</CardTitle>
              <CardDescription>Track onboarding progress for new team members</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {newHires.map(hire => (
                  <div
                    key={hire.id}
                    className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 rounded-lg ${selectedHire?.id === hire.id ? 'bg-gray-100' : ''}`}
                    onClick={() => setSelectedHire(hire)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={hire.avatar} alt={hire.name} />
                        <AvatarFallback>{hire.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{hire.name}</p>
                        <p className="text-sm text-gray-500">{hire.position}</p>
                      </div>
                    </div>
                    <Badge variant={hire.progress === 100 ? 'default' : 'secondary'}>
                      {hire.progress}%
                    </Badge>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Hire
              </Button>
            </CardFooter>
          </Card>
          
          <div className="md:col-span-2">
            {selectedHire && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{selectedHire.name}</CardTitle>
                      <CardDescription>{selectedHire.position} - {selectedHire.department}</CardDescription>
                    </div>
                    <Badge variant="outline">Start Date: {selectedHire.startDate}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <Label>Onboarding Progress</Label>
                      <span className="text-sm font-medium">{selectedHire.progress}%</span>
                    </div>
                    <Progress value={selectedHire.progress} className="h-2" />
                  </div>
                  
                  <Tabs defaultValue="tasks">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tasks">Tasks</TabsTrigger>
                      <TabsTrigger value="add-task">Add Task</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tasks">
                      <ScrollArea className="h-[300px] pr-4">
                        {tasks.map(task => (
                          <Card key={task.id} className="mb-4">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Checkbox
                                    checked={task.status === 'completed'}
                                    onCheckedChange={(checked) => 
                                      handleTaskStatusChange(task.id, checked ? 'completed' : 'not-started')
                                    }
                                  />
                                  <span className="ml-2 font-medium">{task.title}</span>
                                </div>
                                <Badge variant={
                                  task.status === 'completed' ? 'default' :
                                  task.status === 'in-progress' ? 'secondary' : 'outline'
                                }>
                                  {task.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                                  {task.status === 'in-progress' && <Clock className="mr-1 h-3 w-3" />}
                                  {task.status === 'not-started' && <AlertTriangle className="mr-1 h-3 w-3" />}
                                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 ml-6">{task.description}</p>
                              <div className="flex justify-between items-center mt-2 ml-6">
                                <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                                <Select
                                  value={task.status}
                                  onValueChange={(value) => handleTaskStatusChange(task.id, value as any)}
                                >
                                  <SelectTrigger className="w-[140px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="not-started">Not Started</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </ScrollArea>
                    </TabsContent>
                    <TabsContent value="add-task">
                      <Card>
                        <CardContent className="p-4">
                          <form onSubmit={(e) => {
                            e.preventDefault()
                            const form = e.target as HTMLFormElement
                            const title = (form.elements.namedItem('title') as HTMLInputElement).value
                            const description = (form.elements.namedItem('description') as HTMLInputElement).value
                            const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement).value
                            addNewTask(title, description, dueDate)
                            form.reset()
                          }}>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="title">Task Title</Label>
                                <Input id="title" name="title" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input id="description" name="description" required />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input id="dueDate" name="dueDate" type="date" required />
                              </div>
                              <Button type="submit" className="w-full">Add Task</Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Send Welcome Email
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Onboarding Report
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Onboarding Overview</CardTitle>
            <CardDescription>Quick stats on current onboarding processes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Onboarding</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newHires.length}</div>
                  <p className="text-xs text-muted-foreground">
                    New team members in onboarding
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {Math.round(newHires.reduce((sum, hire) => sum + hire.progress, 0) / newHires.length)}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Average onboarding progress
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Start Dates</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {newHires.filter(hire => new Date(hire.startDate) > new Date()).length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    New hires starting soon
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
