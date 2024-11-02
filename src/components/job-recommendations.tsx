'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Briefcase, MapPin, DollarSign, Star, ChevronRight, Search } from 'lucide-react'

export default function JobRecommendations() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp", location: "San Francisco, CA", salary: "$120k - $160k", etScore: 92, skills: ["React", "TypeScript", "GraphQL"] },
    { id: 2, title: "UX Designer", company: "DesignHub", location: "New York, NY", salary: "$90k - $120k", etScore: 88, skills: ["Figma", "User Research", "Prototyping"] },
    { id: 3, title: "Full Stack Engineer", company: "WebSolutions", location: "Austin, TX", salary: "$100k - $140k", etScore: 85, skills: ["Node.js", "React", "MongoDB"] },
    { id: 4, title: "Product Manager", company: "InnovateCo", location: "Seattle, WA", salary: "$110k - $150k", etScore: 78, skills: ["Agile", "User Stories", "Roadmapping"] },
    { id: 5, title: "Data Scientist", company: "DataDriven", location: "Boston, MA", salary: "$130k - $170k", etScore: 95, skills: ["Python", "Machine Learning", "SQL"] },
  ])

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    minSalary: 50000,
    remoteOnly: false,
    minETScore: 70,
  })

  const [userSkills, setUserSkills] = useState([
    "React", "JavaScript", "TypeScript", "Node.js", "GraphQL"
  ])

  const handleFilterChange = (key: string, value: any) => {
  setFilters(prev => ({ ...prev, [key]: value }))
}

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      job.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      job.etScore >= filters.minETScore &&
      parseInt(job.salary.replace(/\D/g, '')) >= filters.minSalary
    )
  })

  const sortedJobs = filteredJobs.sort((a, b) => b.etScore - a.etScore)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Job Recommendations</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Job title or keyword"
                    className="pl-8"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City or state"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="minSalary">Minimum Salary: ${filters.minSalary.toLocaleString()}</Label>
                <Slider
                  id="minSalary"
                  min={0}
                  max={200000}
                  step={10000}
                  value={[filters.minSalary]}
                  onValueChange={(value) => handleFilterChange('minSalary', value[0])}
                />
              </div>
              <div>
                <Label htmlFor="minETScore">Minimum ET Score: {filters.minETScore}</Label>
                <Slider
                  id="minETScore"
                  min={0}
                  max={100}
                  step={5}
                  value={[filters.minETScore]}
                  onValueChange={(value) => handleFilterChange('minETScore', value[0])}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="remoteOnly"
                  checked={filters.remoteOnly}
                  onCheckedChange={(checked) => handleFilterChange('remoteOnly', checked)}
                />
                <Label htmlFor="remoteOnly">Remote only</Label>
              </div>
            </CardContent>
          </Card>
          
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Top Skills</CardTitle>
                <CardDescription>Based on your profile and skill assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {sortedJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-900">{job.title}</h2>
                      <p className="text-lg text-gray-600">{job.company}</p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      {job.etScore}% Match
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="mr-2" size={18} />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Briefcase className="mr-2" size={18} />
                      Full-time
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="mr-2" size={18} />
                      {job.salary}
                    </div>
                  </div>
                  <div className="mb-4">
                    {job.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="mr-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={18} />
                      <span className="text-sm text-gray-600">Recommended based on your profile</span>
                    </div>
                    <Button>
                      View Job
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}