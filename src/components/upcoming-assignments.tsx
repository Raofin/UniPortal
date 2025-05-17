import React from 'react'
import { Card, CardBody, CardHeader, Tooltip, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: Date
  status: 'submitted' | 'pending'
  description: string
}

export const UpcomingAssignments: React.FC = () => {
  const [assignments] = React.useState<Assignment[]>([
    {
      id: '1',
      title: 'Data Structures Project',
      course: 'CS202: Data Structures',
      dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000 + 40 * 60 * 1000), // 5h 40m from now
      status: 'pending',
      description: 'Implement a balanced binary search tree with insertion, deletion, and traversal operations.',
    },
    {
      id: '2',
      title: 'Database Design',
      course: 'CS305: Database Systems',
      dueDate: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26h from now
      status: 'pending',
      description: 'Design a normalized database schema for a library management system with at least 5 entities.',
    },
    {
      id: '3',
      title: 'Algorithm Analysis',
      course: 'CS301: Advanced Algorithms',
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72h from now
      status: 'submitted',
      description: 'Analyze the time and space complexity of the provided sorting algorithms and submit a report.',
    },
  ])

  // For countdown timer
  const [now, setNow] = React.useState(new Date())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getCountdown = (dueDate: Date) => {
    const diff = dueDate.getTime() - now.getTime()

    if (diff <= 0) return 'Due now'

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`
    } else {
      return `${minutes}m ${seconds}s`
    }
  }

  const getUrgencyColor = (dueDate: Date) => {
    const diff = dueDate.getTime() - now.getTime()
    const hours = diff / (1000 * 60 * 60)

    if (hours < 24) return 'danger'
    if (hours < 48) return 'warning'
    return 'success'
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Upcoming Assignments</h2>
          <Chip color="primary" variant="flat">
            {assignments.filter((a) => a.status === 'pending').length} pending
          </Chip>
        </div>
      </CardHeader>

      <CardBody>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Tooltip
                content={
                  <div className="max-w-xs p-2">
                    <p className="mb-1 font-medium">{assignment.title}</p>
                    <p className="text-sm">{assignment.description}</p>
                  </div>
                }
                placement="top"
              >
                <Card className="border border-divider transition-colors hover:border-primary" shadow="sm">
                  <CardBody className="p-4">
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="font-medium">{assignment.title}</h3>
                      <Chip size="sm" color={assignment.status === 'submitted' ? 'success' : 'default'} variant="flat">
                        {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </Chip>
                    </div>

                    <p className="mb-3 text-sm text-default-500">{assignment.course}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Icon icon="lucide:calendar" className="text-default-400" width={16} />
                        <span>Due: {assignment.dueDate.toLocaleDateString()}</span>
                      </div>

                      {assignment.status === 'pending' && (
                        <Chip size="sm" color={getUrgencyColor(assignment.dueDate)} startContent={<Icon icon="lucide:clock" width={14} />}>
                          {getCountdown(assignment.dueDate)}
                        </Chip>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Tooltip>
            </motion.div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}
