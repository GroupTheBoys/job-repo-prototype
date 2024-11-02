'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Users, Calendar as CalendarIcon, Plus, Edit2, Trash2 } from 'lucide-react'

type NetworkingEvent = {
  id: string
  title: string
  date: Date
  time: string
  location: string
  type: 'Job Fair' | 'Industry Conference' | 'Networking Mixer' | 'Workshop'
  description: string
  attendees: number
}

export default function NetworkingEventsCalendar() {
  const [events, setEvents] = useState<NetworkingEvent[]>([
    { id: '1', title: 'Tech Job Fair 2024', date: new Date(2024, 10, 15), time: '10:00 AM - 4:00 PM', location: 'San Francisco Convention Center', type: 'Job Fair', description: 'Annual tech job fair featuring top companies in the Bay Area', attendees: 500 },
    { id: '2', title: 'Web Dev Conference', date: new Date(2024, 10, 20), time: '9:00 AM - 6:00 PM', location: 'Online', type: 'Industry Conference', description: 'Learn about the latest web development trends and technologies', attendees: 1000 },
    { id: '3', title: 'Startup Networking Night', date: new Date(2024, 10, 25), time: '7:00 PM - 10:00 PM', location: 'TechHub, New York', type: 'Networking Mixer', description: 'Connect with founders, investors, and job seekers in the startup ecosystem', attendees: 150 },
  ])

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newEvent, setNewEvent] = useState<Partial<NetworkingEvent>>({})
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false)

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.location && newEvent.type) {
      const eventToAdd: NetworkingEvent = {
        id: Date.now().toString(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        location: newEvent.location,
        type: newEvent.type as NetworkingEvent['type'],
        description: newEvent.description || '',
        attendees: newEvent.attendees || 0,
      }
      setEvents([...events, eventToAdd])
      setNewEvent({})
      setIsAddEventDialogOpen(false)
    }
  }

  const handleDeleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId))
  }

  const filteredEvents = selectedDate
    ? events.filter(event => event.date.toDateString() === selectedDate.toDateString())
    : events

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Networking Events Calendar</h1>
          <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Networking Event</DialogTitle>
                <DialogDescription>Enter the details of the new networking event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" className="col-span-3" value={newEvent.title || ''} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input id="date" type="date" className="col-span-3" value={newEvent.date ? newEvent.date.toISOString().split('T')[0] : ''} onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">Time</Label>
                  <Input id="time" className="col-span-3" value={newEvent.time || ''} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input id="location" className="col-span-3" value={newEvent.location || ''} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Type</Label>
                  <Select onValueChange={(value) => setNewEvent({ ...newEvent, type: value as NetworkingEvent['type'] })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Job Fair">Job Fair</SelectItem>
                      <SelectItem value="Industry Conference">Industry Conference</SelectItem>
                      <SelectItem value="Networking Mixer">Networking Mixer</SelectItem>
                      <SelectItem value="Workshop">Workshop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Input id="description" className="col-span-3" value={newEvent.description || ''} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="attendees" className="text-right">Expected Attendees</Label>
                  <Input id="attendees" type="number" className="col-span-3" value={newEvent.attendees || ''} onChange={(e) => setNewEvent({ ...newEvent, attendees: parseInt(e.target.value) })} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddEvent}>Add Event</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                {selectedDate
                  ? `Events on ${selectedDate.toLocaleDateString()}`
                  : 'All upcoming events'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <Card key={event.id} className="mb-4">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription>{event.type}</CardDescription>
                          </div>
                          <Badge>{new Date(event.date).toLocaleDateString()}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4 text-gray-500" />
                            <span>{event.attendees} expected attendees</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline">
                          Register
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No events found for this date.</p>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upcoming Events Overview</CardTitle>
            <CardDescription>Quick view of your networking opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="job-fairs">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="job-fairs">Job Fairs</TabsTrigger>
                <TabsTrigger value="conferences">Conferences</TabsTrigger>
                <TabsTrigger value="mixers">Mixers</TabsTrigger>
                <TabsTrigger value="workshops">Workshops</TabsTrigger>
              </TabsList>
              {['job-fairs', 'conferences', 'mixers', 'workshops'].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <ScrollArea className="h-[200px]">
                    {events
                      .filter(event => event.type.toLowerCase().includes(tab.replace('-', ' ')))
                      .map(event => (
                        <div key={event.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{event.title}</p>
                            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} - {event.location}</p>
                          </div>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      ))}
                  </ScrollArea>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}