'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { DollarSign, MapPin, Briefcase, TrendingUp, Info } from 'lucide-react'

type SalaryData = {
  jobTitle: string
  location: string
  experienceLevel: string
  averageSalary: number
  salaryRange: { min: number; max: number }
  trend: number
}

export default function SalaryInsightsTool() {
  const [jobTitle, setJobTitle] = useState('')
  const [location, setLocation] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [yearsOfExperience, setYearsOfExperience] = useState(0)

  const [salaryData, setSalaryData] = useState<SalaryData>({
    jobTitle: 'Software Engineer',
    location: 'San Francisco, CA',
    experienceLevel: 'Mid-Level',
    averageSalary: 120000,
    salaryRange: { min: 95000, max: 145000 },
    trend: 5.2
  })

  const salaryTrendData = [
    { year: 2019, salary: 100000 },
    { year: 2020, salary: 105000 },
    { year: 2021, salary: 112000 },
    { year: 2022, salary: 118000 },
    { year: 2023, salary: 120000 },
    { year: 2024, salary: 126000 },
  ]

  const salaryComparisonData = [
    { role: 'Junior', salary: 85000 },
    { role: 'Mid-Level', salary: 120000 },
    { role: 'Senior', salary: 160000 },
    { role: 'Lead', salary: 200000 },
  ]

  const handleSearch = () => {
    // In a real application, this would make an API call to fetch salary data
    console.log('Searching for:', { jobTitle, location, experienceLevel, yearsOfExperience })
    // For now, we'll just update the state with some mock data
    setSalaryData({
      jobTitle,
      location,
      experienceLevel,
      averageSalary: 125000,
      salaryRange: { min: 100000, max: 150000 },
      trend: 6.5
    })
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(salary)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Salary Insights Tool</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Explore Salaries</CardTitle>
            <CardDescription>Find out how much you could earn in your desired role and location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. San Francisco, CA"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger id="experienceLevel">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid-Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="lead">Lead / Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience: {yearsOfExperience}</Label>
                <Slider
                  id="yearsOfExperience"
                  min={0}
                  max={20}
                  step={1}
                  value={[yearsOfExperience]}
                  onValueChange={(value) => setYearsOfExperience(value[0])}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSearch} className="w-full">Search</Button>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatSalary(salaryData.averageSalary)}</div>
              <p className="text-xs text-muted-foreground">
                For {salaryData.jobTitle} in {salaryData.location}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salary Range</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatSalary(salaryData.salaryRange.min)} - {formatSalary(salaryData.salaryRange.max)}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on market data and job postings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Salary Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salaryData.trend}%</div>
              <p className="text-xs text-muted-foreground">
                Increase over the past year
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList>
            <TabsTrigger value="trends">Salary Trends</TabsTrigger>
            <TabsTrigger value="comparison">Role Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Salary Trends Over Time</CardTitle>
                <CardDescription>Average salary for {salaryData.jobTitle} in {salaryData.location} over the past 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salaryTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatSalary(value as number)} />
                      <Line type="monotone" dataKey="salary" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Salary Comparison by Experience Level</CardTitle>
                <CardDescription>Average salaries for different experience levels in {salaryData.jobTitle} roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salaryComparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="role" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatSalary(value as number)} />
                      <Bar dataKey="salary" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Salary Insights</CardTitle>
            <CardDescription>Key factors influencing salaries for {salaryData.jobTitle} roles</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-blue-500" />
                <div>
                  <h3 className="font-semibold">Location Impact</h3>
                  <p className="text-sm text-gray-600">Salaries in {salaryData.location} are typically higher due to the cost of living and competitive job market in the tech industry.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Briefcase className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <h3 className="font-semibold">Experience Level</h3>
                  <p className="text-sm text-gray-600">As you progress from entry-level to senior positions, salaries can increase significantly. Lead roles often come with additional responsibilities and higher compensation.</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-500" />
                <div>
                  <h3 className="font-semibold">Industry Trends</h3>
                  <p className="text-sm text-gray-600">The tech industry is seeing steady growth, with increasing demand for skilled professionals leading to competitive salaries and benefits packages.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Info className="mr-2 h-5 w-5 text-yellow-500" />
                <div>
                  <h3 className="font-semibold">Additional Factors</h3>
                  <p className="text-sm text-gray-600">Company size, specific technologies or skills required, and overall market conditions can also influence salary ranges for {salaryData.jobTitle} positions.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}