import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Avatar, Button, Divider } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

// Core interfaces for professor data and component props
interface ProfessorInfo {
  id: string
  name: string
  title: string
  department: string
  officeHours: string
  email: string
  phone?: string
  avatar: string
}

interface ProfessorHoverCardProps {
  professorId: string
  children: React.ReactNode
}

export const ProfessorHoverCard: React.FC<ProfessorHoverCardProps> = ({ professorId, children }) => {
  // Sample professor data for demonstration
  const professors: Record<string, ProfessorInfo> = {
    prof1: {
      id: 'prof1',
      name: 'Dr. Johnson',
      title: 'Associate Professor',
      department: 'Computer Science',
      officeHours: 'Mon, Wed: 2-4 PM',
      email: 'johnson@university.edu',
      phone: '555-123-4567',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
    },
    prof2: {
      id: 'prof2',
      name: 'Dr. Smith',
      title: 'Professor',
      department: 'Computer Science',
      officeHours: 'Tue, Thu: 1-3 PM',
      email: 'smith@university.edu',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
    },
    prof3: {
      id: 'prof3',
      name: 'Dr. Williams',
      title: 'Assistant Professor',
      department: 'Computer Science',
      officeHours: 'Fri: 10 AM-12 PM',
      email: 'williams@university.edu',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
    },
  }

  const professor = professors[professorId]

  // Return children without hover card if professor not found
  if (!professor) {
    return <>{children}</>
  }

  return (
    <Popover placement="top" showArrow>
      <PopoverTrigger>
        <span className="cursor-pointer text-primary-500 hover:underline">{children}</span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
          {/* Professor header with avatar and basic info */}
          <div className="flex items-center gap-4 p-4">
            <Avatar src={professor.avatar} size="lg" isBordered color="primary" />
            <div>
              <h3 className="font-semibold">{professor.name}</h3>
              <p className="text-xs text-default-500">{professor.title}</p>
              <p className="text-xs text-default-500">{professor.department}</p>
            </div>
          </div>

          <Divider />

          {/* Contact information section */}
          <div className="space-y-3 p-4">
            <div className="flex items-start gap-2">
              <Icon icon="lucide:clock" className="mt-0.5 text-default-500" width={16} height={16} />
              <div>
                <p className="text-sm font-medium">Office Hours</p>
                <p className="text-xs text-default-500">{professor.officeHours}</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Icon icon="lucide:mail" className="mt-0.5 text-default-500" width={16} height={16} />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-xs text-default-500">{professor.email}</p>
              </div>
            </div>

            {professor.phone && (
              <div className="flex items-start gap-2">
                <Icon icon="lucide:phone" className="mt-0.5 text-default-500" width={16} height={16} />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-xs text-default-500">{professor.phone}</p>
                </div>
              </div>
            )}
          </div>

          <Divider />

          {/* Action buttons */}
          <div className="flex justify-between p-3">
            <Button size="sm" variant="light" color="primary" startContent={<Icon icon="lucide:calendar" width={16} height={16} />}>
              Schedule Meeting
            </Button>

            <Button size="sm" variant="flat" color="primary" startContent={<Icon icon="lucide:mail" width={16} height={16} />}>
              Send Email
            </Button>
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
