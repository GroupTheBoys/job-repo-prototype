'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Briefcase, Calendar, MapPin, DollarSign, Plus, Edit2, Trash2 } from 'lucide-react'

type ApplicationStatus = 'Applied' | 'Phone Screen' | 'Interview' | 'Offer' | 'Rejected'

type JobApplication = {
  id: string
  company: string
  position: string
  location: string
  salary: string
  appliedDate: string
  status: ApplicationStatus
  notes: string
}

const initialColumns: Record<ApplicationStatus, JobApplication[]> = {
  'Applied': [
    { id: '1', company: 'TechCorp', position: 'Frontend Developer', location: 'San Francisco, CA', salary: '$120k - $150k', appliedDate: '2024-11-01', status: 'Applied', notes: 'Applied through company website' },
    { id: '2', company: 'InnovateSoft', position: 'UX Designer', location: 'New York, NY', salary: '$90k - $120k', appliedDate: '2024-11-03', status: 'Applied', notes: 'Referred by John from HR' },
  ],
  'Phone Screen': [
    { id: '3', company: 'DataDrive', position: 'Data Scientist', location: 'Boston, MA', salary: '$130k - $160k', appliedDate: '2024-10-28', status: 'Phone Screen', notes: 'Phone screen scheduled for next week' },
  ],
  'Interview': [
    { id: '4', company: 'CloudNine', position: 'DevOps Engineer', location: 'Seattle, WA', salary: '$140k - $170k', appliedDate: '2024-10-25', status: 'Interview', notes: 'On-site interview next Monday' },
  ],
  'Offer': [
    { id: '5', company: 'StartupX', position: 'Full Stack Developer', location: 'Austin, TX', salary: '$110k - $140k', appliedDate: '2024-10-20', status: 'Offer', notes: 'Received offer, negotiating terms' },
  ],
  'Rejected': [
    { id: '6', company: 'MegaCorp', position: 'Product Manager', location: 'Chicago, IL', salary: '$100k - $130k', appliedDate: '2024-10-15', status: 'Rejected', notes: 'Position filled internally' },
  ],
}

export default function JobApplicationKanbanBoard() {
  const [columns, setColumns] = useState(initialColumns)
  const [newApplication, setNewApplication] = useState<Partial<JobApplication>>({})
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Dropped outside the list
    if (!destination) return

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const column = columns[source.droppableId as ApplicationStatus]
      const newItems = Array.from(column)
      const [reorderedItem] = newItems.splice(source.index, 1)
      newItems.splice(destination.index, 0, reorderedItem)

      setColumns({
        ...columns,
        [source.droppableId]: newItems,
      })
    } else {
      // Moving from one column to another
      const sourceColumn = columns[source.droppableId as ApplicationStatus]
      const destColumn = columns[destination.droppableId as ApplicationStatus]
      const sourceItems = Array.from(sourceColumn)
      const destItems = Array.from(destColumn)
      const [movedItem] = sourceItems.splice(source.index, 1)
      destItems.splice(destination.index, 0, { ...movedItem, status: destination.droppableId as ApplicationStatus })

      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      })
    }
  }

  const handleAddApplication = () => {
    const newApp: JobApplication = {
      id: Date.now().toString(),
      company: newApplication.company || '',
      position: newApplication.position || '',
      location: newApplication.location || '',
      salary: newApplication.salary || '',
      appliedDate: newApplication.appliedDate || new Date().toISOString().split('T')[0],
      status: 'Applied',
      notes: newApplication.notes || '',
    }

    setColumns({
      ...columns,
      Applied: [...columns.Applied, newApp],
    })

    setNewApplication({})
    setIsAddDialogOpen(false)
  }

  const handleEditApplication = () => {
    if (!editingApplication) return

    const updatedColumns = { ...columns }
    for (const status in updatedColumns) {
      updatedColumns[status as ApplicationStatus] = updatedColumns[status as ApplicationStatus].map(app => 
        app.id === editingApplication.id ? editingApplication : app
      )
    }

    setColumns(updatedColumns)
    setEditingApplication(null)
    setIsEditDialogOpen(false)
  }

  const handleDeleteApplication = (appToDelete: JobApplication) => {
    const updatedColumns = { ...columns }
    for (const status in updatedColumns) {
      updatedColumns[status as ApplicationStatus] = updatedColumns[status as ApplicationStatus].filter(app => app.id !== appToDelete.id)
    }
    setColumns(updatedColumns)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Job Application Tracker</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Job Application</DialogTitle>
                <DialogDescription>Enter the details of your new job application.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">Company</Label>
                  <Input id="company" className="col-span-3" value={newApplication.company || ''} onChange={(e) => setNewApplication({ ...newApplication, company: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position</Label>
                  <Input id="position" className="col-span-3" value={newApplication.position || ''} onChange={(e) => setNewApplication({ ...newApplication, position: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">Location</Label>
                  <Input id="location" className="col-span-3" value={newApplication.location || ''} onChange={(e) => setNewApplication({ ...newApplication, location: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="salary" className="text-right">Salary</Label>
                  <Input id="salary" className="col-span-3" value={newApplication.salary || ''} onChange={(e) => setNewApplication({ ...newApplication, salary: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="appliedDate" className="text-right">Applied Date</Label>
                  <Input id="appliedDate" type="date" className="col-span-3" value={newApplication.appliedDate || ''} onChange={(e) => setNewApplication({ ...newApplication, appliedDate: e.target.value })} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Notes</Label>
                  <Input id="notes" className="col-span-3" value={newApplication.notes || ''} onChange={(e) => setNewApplication({ ...newApplication, notes: e.target.value })} />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddApplication}>Add Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(columns).map(([columnId, applications]) => (
              <div key={columnId} className="bg-gray-200 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">{columnId} ({applications.length})</h2>
                <Droppable droppableId={columnId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                      {applications.map((app, index) => (
                        <Draggable key={app.id} draggableId={app.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white"
                            >
                              <CardHeader>
                                <CardTitle>{app.position}</CardTitle>
                                <CardDescription>{app.company}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex items-center">
                                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{app.location}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{app.salary}</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                                    <span className="text-sm">Applied: {app.appliedDate}</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="flex justify-between">
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setEditingApplication(app)}>
                                      <Edit2 className="mr-2 h-4 w-4" /> Edit
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Edit Job Application</DialogTitle>
                                      <DialogDescription>Update the details of your job application.</DialogDescription>
                                    </DialogHeader>
                                    {editingApplication && (
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-company" className="text-right">Company</Label>
                                          <Input id="edit-company" className="col-span-3" value={editingApplication.company} onChange={(e) => setEditingApplication({ ...editingApplication, company: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-position" className="text-right">Position</Label>
                                          <Input id="edit-position" className="col-span-3" value={editingApplication.position} onChange={(e) => setEditingApplication({ ...editingApplication, position: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-location" className="text-right">Location</Label>
                                          <Input id="edit-location" className="col-span-3" value={editingApplication.location} onChange={(e) => setEditingApplication({ ...editingApplication, location: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-salary" className="text-right">Salary</Label>
                                          <Input id="edit-salary" className="col-span-3" value={editingApplication.salary} onChange={(e) => setEditingApplication({ ...editingApplication, salary: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-appliedDate" className="text-right">Applied Date</Label>
                                          <Input id="edit-appliedDate" type="date" className="col-span-3" value={editingApplication.appliedDate} onChange={(e) => setEditingApplication({ ...editingApplication, appliedDate: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-status" className="text-right">Status</Label>
                                          <Select value={editingApplication.status} onValueChange={(value) => setEditingApplication({ ...editingApplication, status: value as ApplicationStatus })}>
                                            <SelectTrigger  className="col-span-3">
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="Applied">Applied</SelectItem>
                                              <SelectItem value="Phone Screen">Phone Screen</SelectItem>
                                              <SelectItem value="Interview">Interview</SelectItem>
                                              <SelectItem value="Offer">Offer</SelectItem>
                                              <SelectItem value="Rejected">Rejected</SelectItem>
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="edit-notes" className="text-right">Notes</Label>
                                          <Input id="edit-notes" className="col-span-3" value={editingApplication.notes} onChange={(e) => setEditingApplication({ ...editingApplication, notes: e.target.value })} />
                                        </div>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <Button onClick={handleEditApplication}>Save Changes</Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteApplication(app)}>
                                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </Button>
                              </CardFooter>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  )
}