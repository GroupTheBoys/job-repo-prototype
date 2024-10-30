'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Users, Briefcase, Star, Globe, Clock, DollarSign, Coffee, Laptop, Heart } from 'lucide-react'

type JobListing = {
  id: number
  title: string
  department: string
  location: string
  type: string
  salary: string
  posted: string
}

type Review = {
  id: number
  author: string
  rating: number
  position: string
  date: string
  content: string
}

export default function CompanyProfilePage() {
  const [company] = useState({
    name: "TechInnovate Solutions",
    logo: "/placeholder.svg?height=128&width=128",
    description: "TechInnovate Solutions is a leading technology company specializing in cutting-edge software development and innovative IT solutions. With a focus on artificial intelligence, cloud computing, and cybersecurity, we're shaping the future of technology.",
    industry: "Information Technology",
    founded: "2010",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    website: "https://techinnovatesolutions.com",
    rating: 4.5,
    reviews: 1280,
  })

  const [jobListings] = useState<JobListing[]>([
    { id: 1, title: "Senior Frontend Developer", department: "Engineering", location: "San Francisco, CA", type: "Full-time", salary: "$120k - $160k", posted: "2 days ago" },
    { id: 2, title: "UX Designer", department: "Design", location: "New York, NY", type: "Full-time", salary: "$90k - $120k", posted: "1 week ago" },
    { id: 3, title: "DevOps Engineer", department: "Operations", location: "Remote", type: "Full-time", salary: "$100k - $140k", posted: "3 days ago" },
    { id: 4, title: "Product Manager", department: "Product", location: "Seattle, WA", type: "Full-time", salary: "$110k - $150k", posted: "5 days ago" },
    { id: 5, title: "Data Scientist", department: "Data", location: "Boston, MA", type: "Full-time", salary: "$130k - $170k", posted: "1 day ago" },
  ])

  const [reviews] = useState<Review[]>([
    { id: 1, author: "John D.", rating: 5, position: "Software Engineer", date: "June 2024", content: "Great work environment with cutting-edge projects. The company truly values work-life balance and professional growth." },
    { id: 2, author: "Sarah M.", rating: 4, position: "Product Manager", date: "May 2024", content: "Innovative company with lots of opportunities for career advancement. Sometimes the pace can be challenging, but it's rewarding." },
    { id: 3, author: "Alex K.", rating: 5, position: "UX Designer", date: "April 2024", content: "TechInnovate Solutions is at the forefront of design thinking. I've grown so much as a designer here." },
    { id: 4, author: "Emily R.", rating: 4, position: "Data Analyst", date: "March 2024", content: "Exciting projects and great team collaboration. The company could improve on internal communication." },
  ])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4 md:mb-0 md:mr-6">
                <AvatarImage src={company.logo} alt={company.name} />
                <AvatarFallback>{company.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{company.name}</h1>
                <p className="text-gray-600 mb-4">{company.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary" className="flex items-center">
                    <Briefcase className="mr-1 h-4 w-4" />
                    {company.industry}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    Founded {company.founded}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {company.size}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {company.location}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <Globe className="mr-1 h-4 w-4" />
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      Website
                    </a>
                  </Badge>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="font-bold mr-2">{company.rating}</span>
                  <span className="text-gray-600">({company.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">Open Positions</TabsTrigger>
            <TabsTrigger value="culture">Company Culture</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle>Open Positions</CardTitle>
                <CardDescription>Explore current job openings at {company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {jobListings.map(job => (
                    <Card key={job.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-gray-600">{job.department}</p>
                          </div>
                          <Badge>{job.type}</Badge>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center">
                            <DollarSign className="mr-1 h-3 w-3" />
                            {job.salary}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            Posted {job.posted}
                          </Badge>
                        </div>
                        <Button className="mt-4">Apply Now</Button>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="culture">
            <Card>
              <CardHeader>
                <CardTitle>Company Culture</CardTitle>
                <CardDescription>Learn about the values and work environment at {company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>At {company.name}, we foster a culture of innovation, collaboration, and continuous learning. Our core values include:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Embracing challenges and pushing technological boundaries</li>
                    <li>Promoting diversity, equity, and inclusion in all aspects of our work</li>
                    <li>Encouraging open communication and idea-sharing across all levels</li>
                    <li>Prioritizing work-life balance and employee well-being</li>
                    <li>Commitment to ethical practices and social responsibility</li>
                  </ul>
                  <p>We believe in creating an environment where every employee can thrive, contribute their best work, and grow both personally and professionally.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="benefits">
            <Card>
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
                <CardDescription>Discover the advantages of working at {company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span>Comprehensive health, dental, and vision insurance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                    <span>Competitive salary and performance bonuses</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Coffee className="h-5 w-5 text-brown-500" />
                    <span>Flexible work hours and remote work options</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Laptop className="h-5 w-5 text-blue-500" />
                    <span>Professional development and learning opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-purple-500" />
                    <span>Employee stock options and 401(k) matching</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>Generous paid time off and parental leave</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Employee Reviews</CardTitle>
                <CardDescription>See what employees are saying about working at {company.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  {reviews.map(review => (
                    <Card key={review.id} className="mb-4">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{review.author}</h3>
                            <p className="text-sm text-gray-600">{review.position}</p>
                          </div>
                          <Badge variant="secondary">{review.date}</Badge>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}