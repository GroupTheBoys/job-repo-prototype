'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Video, Calendar as CalendarIcon, Plus, X } from 'lucide-react'

type Interview = {
  id: number
  candidateName: string
  candidateAvatar: string
  position: string
  date: Date
  time: string
  duration: string
  type: 'in-person' | 'video'
  location: string
}

export default function InterviewScheduler() {
  const [interviews, setInterviews] = useState<Interview[]>([
    {
      id: 1,
      candidateName: "Alice Johnson",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "Senior Frontend Developer",
      date: new Date(2024, 10, 15),
      time: "10:00 AM",
      duration: "1 hour",
      type: "video",
      location: "Zoom"
    },
    {
      id: 2,
      candidateName: "Bob Smith",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "UX Designer",
      date: new Date(2024, 10, 16),
      time: "2:00 PM",
      duration: "45 minutes",
      type: "in-person",
      location: "Conference Room A"
    },
    {
      id: 3,
      candidateName: "Charlie Davis",
      candidateAvatar: "/placeholder.svg?height=40&width=40",
      position: "Full Stack Developer",
      date: new Date(2024, 10, 17),
      time: "11:30 AM",
      duration: "1 hour",
      type: "video",
      location: "Google Meet"
    }
  ])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newInterview, setNewInterview] = useState<Partial<Interview>>({
    date: new Date(),
    type: 'video'
  })

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setNewInterview(prev => ({ ...prev, date }))
  }

  const handleNewInterviewChange = (key: keyof Interview, value: string) => {
    setNewInterview(prev => ({ ...prev, [key]: value }))
  }

  const handleAddInterview = () => {
    if (newInterview.candidateName && newInterview.position && newInterview.date && newInterview.time) {
      setInterviews(prev => [...prev, { id: Date.now(), ...newInterview as Interview }])
      setNewInterview({
        date: new Date(),
        type: 'video'
      })
    }
  }

  const handleDeleteInterview = (id: number) => {
    setInterviews(prev => prev.filter(interview => interview.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Interview Scheduler</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Scheduled Interviews</CardTitle>
              <CardDescription>Manage your upcoming interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="upcoming">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming">
                  <ScrollArea className="h-[400px]">
                    {interviews.filter(interview => interview.date >= new Date()).map(interview => (
                      <Card key={interview.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                                <AvatarFallback>{interview.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{interview.candidateName}</h3>
                                <p className="text-sm text-gray-500">{interview.position}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteInterview(interview.id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {interview.date.toLocaleDateString()}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {interview.time} ({interview.duration})
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                              {interview.type === 'video' ? <Video className="mr-1 h-3 w-3" /> : <MapPin className="mr-1 h-3 w-3" />}
                              {interview.location}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="past">
                  <ScrollArea className="h-[400px]">
                    {interviews.filter(interview => interview.date < new Date()).map(interview => (
                      <Card key={interview.id} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <Avatar>
                              <AvatarImage src={interview.candidateAvatar} alt={interview.candidateName} />
                              <AvatarFallback>{interview.candidateName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{interview.candidateName}</h3>
                              <p className="text-sm text-gray-500">{interview.position}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge variant="secondary" className="flex items-center">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              {interview.date.toLocaleDateString()}
                            </Badge>
                            <Badge variant="secondary" className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {interview.time} ({interview.duration})
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Schedule New Interview</CardTitle>
              <CardDescription>Add a new interview to your calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={newInterview.candidateName || ''}
                    onChange={(e) => handleNewInterviewChange('candidateName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newInterview.position || ''}
                    onChange={(e) => handleNewInterviewChange('position', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={newInterview.date}
                    onSelect={handleDateSelect}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newInterview.time || ''}
                    onChange={(e) => handleNewInterviewChange('time', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select onValueChange={(value) => handleNewInterviewChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30 minutes">30 minutes</SelectItem>
                      <SelectItem value="45 minutes">45 minutes</SelectItem>
                      <SelectItem value="1 hour">1 hour</SelectItem>
                      <SelectItem value="1.5 hours">1.5 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Interview Type</Label>
                  <Select onValueChange={(value) => handleNewInterviewChange('type', value as 'in-person' | 'video')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in-person">In-person</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={newInterview.location || ''}
                    onChange={(e) => handleNewInterviewChange('location', e.target.value)}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleAddInterview}>
                <Plus className="mr-2 h-4 w-4" /> Schedule Interview
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}