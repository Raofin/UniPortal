import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Avatar, Divider, Button, Progress } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

// Props interface for profile popup component
interface ProfilePopupProps {
  trigger: React.ReactNode
}

export const ProfilePopup: React.FC<ProfilePopupProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  // Sample student data for demonstration
  const studentData = {
    name: 'Zaid Amin Rawfin',
    id: '20-42459-1',
    email: 'hello@rawfin.net',
    department: 'Computer Science',
    year: '3rd Year',
    advisor: 'Dr. Emily Johnson',
    cgpa: 3.99,
    maxCgpa: 4.0,
    creditsCompleted: 130,
    totalCredits: 148,
    enrollmentStatus: 'Full-time',
    lastLogin: 'Today, 9:15 AM',
  }

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen} showArrow>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {/* Student profile header with avatar and basic info */}
          <div className="flex items-center gap-4 p-4">
            <Avatar src="/images/me.jpg" size="lg" isBordered color="primary" />
            <div>
              <h3 className="font-semibold">{studentData.name}</h3>
              <p className="text-xs text-default-500">{studentData.email}</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="rounded-full bg-primary-100 px-1.5 py-0.5 text-xs text-primary-600">{studentData.enrollmentStatus}</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Academic progress section */}
          <div className="p-4">
            {/* CGPA progress */}
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-medium">CGPA</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">{studentData.cgpa}</span>
                <span className="text-xs text-default-500">/ {studentData.maxCgpa}</span>
              </div>
            </div>

            <Progress value={(studentData.cgpa / studentData.maxCgpa) * 100} color="success" className="mb-4" size="sm" />

            {/* Credits progress */}
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-medium">Credits Completed</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-semibold">{studentData.creditsCompleted}</span>
                <span className="text-xs text-default-500">/ {studentData.totalCredits}</span>
              </div>
            </div>

            <Progress value={(studentData.creditsCompleted / studentData.totalCredits) * 100} color="primary" className="mb-4" size="sm" />

            {/* Academic details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-default-500">Student ID</span>
                <span className="font-medium">{studentData.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-default-500">Department</span>
                <span className="font-medium">{studentData.department}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-default-500">Year</span>
                <span className="font-medium">{studentData.year}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-default-500">Academic Advisor</span>
                <span className="font-medium">{studentData.advisor}</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Footer with last login and action buttons */}
          <div className="flex items-center justify-between p-4">
            <div className="text-xs text-default-500">
              <span>Last login: {studentData.lastLogin}</span>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="light" color="primary" startContent={<Icon icon="lucide:settings" width={16} height={16} />}>
                Settings
              </Button>

              <Button size="sm" variant="flat" color="danger" startContent={<Icon icon="lucide:log-out" width={16} height={16} />}>
                Logout
              </Button>
            </div>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
