'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Briefcase, DollarSign } from 'lucide-react'

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [minETScore, setMinETScore] = useState(50)
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Frontend Developer", company: "TechCorp", location: "San Francisco, CA", salary: "$120k - $160k", etScore: 92, skills: ["React", "TypeScript", "GraphQL"] },
    { id: 2, title: "UX Designer", company: "DesignHub", location: "New York, NY", salary: "$90k - $120k", etScore: 88, skills: ["Figma", "User Research", "Prototyping"] },
    { id: 3, title: "Full Stack Engineer", company: "WebSolutions", location: "Austin, TX", salary: "$100k - $140k", etScore: 85, skills: ["Node.js", "React", "MongoDB"] },
    { id: 4, title: "Product Manager", company: "InnovateCo", location: "Seattle, WA", salary: "$110k - $150k", etScore: 78, skills: ["Agile", "User Stories", "Roadmapping"] },
    { id: 5, title: "Data Scientist", company: "DataDriven", location: "Boston, MA", salary: "$130k - $170k", etScore: 95, skills: ["Python", "Machine Learning", "SQL"] },
  ])

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    job.etScore >= minETScore
  )

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Find Your Perfect Job</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <Input
                    id="search"
                    type="text"
                    placeholder="Job title or keyword"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              <div>
                <label htmlFor="etScore" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum ET Score: {minETScore}
                </label>
                <Slider
                  id="etScore"
                  min={0}
                  max={100}
                  step={1}
                  value={[minETScore]}
                  onValueChange={(value) => setMinETScore(value[0])}
                />
              </div>
              {/* Add more filters here (e.g., location, salary range, etc.) */}
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-3 space-y-6">
          {filteredJobs.map(job => (
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
                  {job.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button>View Job</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}