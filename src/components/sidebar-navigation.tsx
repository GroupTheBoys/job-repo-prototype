'use client'

import { useState, useEffect } from 'react' 
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  LayoutDashboard,
  Search,
  Building2,
  UserCircle,
  GraduationCap,
  ClipboardCheck,
  BookOpen,
  Route,
  FileText,
  DollarSign,
  ListTodo,
  Users,
  Calendar,
  MessageSquare,
  BarChart,
  ClipboardList,
  Menu
} from 'lucide-react'

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const jobSeekerItems: NavItem[] = [
  { title: "Dashboard", href: "/", icon: <LayoutDashboard className="h-4 w-4" /> },
  { title: "Job Search", href: "/job-search", icon: <Search className="h-4 w-4" /> },
  { title: "Company Profile", href: "/company-profile", icon: <Building2 className="h-4 w-4" /> },
  { title: "Candidate Profile", href: "/candidate-profile", icon: <UserCircle className="h-4 w-4" /> },
  { title: "Skill Assessment", href: "/skill-assessment", icon: <GraduationCap className="h-4 w-4" /> },
  { title: "Skill Verification", href: "/skill-verification", icon: <ClipboardCheck className="h-4 w-4" /> },
  { title: "Skill Development", href: "/skill-development", icon: <BookOpen className="h-4 w-4" /> },
  { title: "Development Roadmap", href: "/skill-development-roadmap", icon: <Route className="h-4 w-4" /> },
  { title: "Resume Builder", href: "/resume-builder", icon: <FileText className="h-4 w-4" /> },
  { title: "Salary Insights", href: "/salary-insights", icon: <DollarSign className="h-4 w-4" /> },
  { title: "Application Tracker", href: "/job-application-tracker", icon: <ListTodo className="h-4 w-4" /> },
  { title: "Networking Events", href: "/networking-events", icon: <Users className="h-4 w-4" /> },
  { title: "Interview Scheduler", href: "/interview-scheduler", icon: <Calendar className="h-4 w-4" /> },
  { title: "Messages", href: "/messaging", icon: <MessageSquare className="h-4 w-4" /> },
]

const recruiterItems: NavItem[] = [
  { title: "Recruiter Dashboard", href: "/recruiter-dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { title: "Recruiter Analytics", href: "/recruiter-analytics", icon: <BarChart className="h-4 w-4" /> },
  { title: "Onboarding Tracker", href: "/onboarding-tracker", icon: <ClipboardList className="h-4 w-4" /> },
]

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

    // Add effect to update CSS variable when sidebar state changes
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isOpen ? '256px' : '60px')
  }, [isOpen])

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="absolute right-[-40px] top-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-[60px]"
      )}>
        <ScrollArea className="h-full">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className={cn(
                "mb-2 px-4 text-lg font-semibold tracking-tight transition-all duration-300",
                !isOpen && "opacity-0"
              )}>
                Job Seeker
              </h2>
              <div className="space-y-1">
                {jobSeekerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        !isOpen && "px-2"
                      )}
                    >
                      {item.icon}
                      {isOpen && <span className="ml-2">{item.title}</span>}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className={cn(
                "mb-2 px-4 text-lg font-semibold tracking-tight transition-all duration-300",
                !isOpen && "opacity-0"
              )}>
                Recruiter
              </h2>
              <div className="space-y-1">
                {recruiterItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        !isOpen && "px-2"
                      )}
                    >
                      {item.icon}
                      {isOpen && <span className="ml-2">{item.title}</span>}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </div>
  )
}

export function MobileSidebar() {
  const pathname = usePathname()
  
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      {/* @ts-ignore*/}
      <SheetContent side={'left' as 'left' | 'right' | 'top' | 'bottom'} className="p-0">
        <ScrollArea className="h-full">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Job Seeker
              </h2>
              <div className="space-y-1">
                {jobSeekerItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Recruiter
              </h2>
              <div className="space-y-1">
                {recruiterItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}