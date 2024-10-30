'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, Briefcase, Clock, TrendingUp, ChevronUp, ChevronDown } from 'lucide-react'

export default function RecruiterAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d')

  const overviewData = {
    totalApplications: 1245,
    applicationsChange: 12,
    activeJobs: 18,
    activeJobsChange: 2,
    averageTimeToHire: 21,
    timeToHireChange: -3,
    offerAcceptanceRate: 85,
    offerAcceptanceChange: 5
  }

  const applicationsByJobData = [
    { name: 'Frontend Developer', applications: 320 },
    { name: 'UX Designer', applications: 280 },
    { name: 'Data Scientist', applications: 250 },
    { name: 'Product Manager', applications: 220 },
    { name: 'Backend Developer', applications: 200 },
    { name: 'DevOps Engineer', applications: 180 },
  ]

  const applicationsBySourceData = [
    { name: 'Job Board', applications: 450 },
    { name: 'Company Website', applications: 350 },
    { name: 'Employee Referral', applications: 250 },
    { name: 'LinkedIn', applications: 150 },
    { name: 'Other', applications: 45 },
  ]

  const etScoreDistributionData = [
    { score: '90-100', candidates: 50 },
    { score: '80-89', candidates: 120 },
    { score: '70-79', candidates: 200 },
    { score: '60-69', candidates: 180 },
    { score: '50-59', candidates: 100 },
    { score: '0-49', candidates: 50 },
  ]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Recruiter Analytics Dashboard</h1>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.totalApplications}</div>
              <p className="text-xs text-muted-foreground">
                {overviewData.applicationsChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    {overviewData.applicationsChange}% from last period
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ChevronDown className="mr-1 h-4 w-4" />
                    {Math.abs(overviewData.applicationsChange)}% from last period
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.activeJobs}</div>
              <p className="text-xs text-muted-foreground">
                {overviewData.activeJobsChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    {overviewData.activeJobsChange} more than last period
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ChevronDown className="mr-1 h-4 w-4" />
                    {Math.abs(overviewData.activeJobsChange)} less than last period
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Time to Hire</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.averageTimeToHire} days</div>
              <p className="text-xs text-muted-foreground">
                {overviewData.timeToHireChange < 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ChevronDown className="mr-1 h-4 w-4" />
                    {Math.abs(overviewData.timeToHireChange)} days faster than last period
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    {overviewData.timeToHireChange} days slower than last period
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Offer Acceptance Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overviewData.offerAcceptanceRate}%</div>
              <p className="text-xs text-muted-foreground">
                {overviewData.offerAcceptanceChange > 0 ? (
                  <span className="text-green-600 flex items-center">
                    <ChevronUp className="mr-1 h-4 w-4" />
                    {overviewData.offerAcceptanceChange}% increase from last period
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center">
                    <ChevronDown className="mr-1 h-4 w-4" />
                    {Math.abs(overviewData.offerAcceptanceChange)}% decrease from last period
                  </span>
                )}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="etScores">ET Scores</TabsTrigger>
          </TabsList>
          <TabsContent value="applications" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Job</CardTitle>
                  <CardDescription>Number of applications received per job posting</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationsByJobData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Source</CardTitle>
                  <CardDescription>Distribution of applications across different sources</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={applicationsBySourceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="etScores" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ET Score Distribution</CardTitle>
                <CardDescription>Distribution of candidates across ET score ranges</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={etScoreDistributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="score" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="candidates" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}