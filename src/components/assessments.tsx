import React from 'react'
import { Card, CardBody, CardHeader, Chip, Button, Progress, Popover, PopoverTrigger, PopoverContent, Divider } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { format, isToday, isTomorrow } from 'date-fns'

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: Date
  status: 'submitted' | 'pending' | 'in-progress'
  description: string
  priority: 'high' | 'medium' | 'low'
  progress?: number
  attachments?: number
  comments?: number
  type: 'project' | 'homework' | 'quiz' | 'exam'
  estimatedTime?: string
  submissionType: 'online' | 'in-person' | 'both'
}

// Helper functions moved to top level
const getTypeIcon = (type: string) => {
  switch (type) {
    case 'project':
      return 'lucide:code'
    case 'homework':
      return 'lucide:book-open'
    case 'quiz':
      return 'lucide:file-question'
    case 'exam':
      return 'lucide:file-text'
    default:
      return 'lucide:file'
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'project':
      return 'primary'
    case 'homework':
      return 'success'
    case 'quiz':
      return 'warning'
    case 'exam':
      return 'danger'
    default:
      return 'default'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'danger'
    case 'medium':
      return 'warning'
    case 'low':
      return 'success'
    default:
      return 'default'
  }
}

const CountdownTimer: React.FC<{ dueDate: Date }> = ({ dueDate }) => {
  const [timeLeft, setTimeLeft] = React.useState('')

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = dueDate.getTime() - new Date().getTime()

      if (diff <= 0) return 'Due now'

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        return `${days}d ${hours}h`
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`
      } else if (minutes > 0) {
        return `${minutes}m`
      } else {
        return 'Due soon'
      }
    }

    setTimeLeft(calculateTimeLeft())

    // Update every 5 seconds
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 5000)

    return () => clearInterval(timer)
  }, [dueDate])

  const getUrgencyColor = (date: Date) => {
    const diff = date.getTime() - new Date().getTime()
    const hours = diff / (1000 * 60 * 60)

    if (hours < 12) return 'danger'
    if (hours < 24) return 'warning'
    return 'success'
  }

  return (
    <div className="min-w-[90px] text-right">
      <Chip
        size="sm"
        color={getUrgencyColor(dueDate)}
        variant="flat"
        startContent={<Icon icon="lucide:clock" width={14} />}
        className="gap-2 rounded-full px-2.5 font-medium"
      >
        {timeLeft}
      </Chip>
    </div>
  )
}

const AssignmentDetails: React.FC<{ assignment: Assignment }> = ({ assignment }) => {
  const [timeLeft, setTimeLeft] = React.useState('')

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = assignment.dueDate.getTime() - new Date().getTime()

      if (diff <= 0) return 'Due now'

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (days > 0) {
        return `${days}d ${hours}h`
      } else if (hours > 0) {
        return `${hours}h ${minutes}m`
      } else if (minutes > 0) {
        return `${minutes}m`
      } else {
        return 'Due soon'
      }
    }

    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 5000)

    return () => clearInterval(timer)
  }, [assignment.dueDate])

  return (
    <div className="w-[320px] p-4">
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2">
          <Chip
            size="sm"
            color={getTypeColor(assignment.type)}
            variant="flat"
            startContent={<Icon icon={getTypeIcon(assignment.type)} width={14} />}
            className="gap-2 rounded-full px-2.5"
          >
            {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
          </Chip>
          <Chip
            size="sm"
            color={getPriorityColor(assignment.priority)}
            variant="flat"
            startContent={<Icon icon="lucide:alert-circle" width={14} />}
            className="gap-2 rounded-full px-2.5"
          >
            {assignment.priority} Priority
          </Chip>
        </div>
        <h3 className="mb-1 text-lg font-semibold">{assignment.title}</h3>
        <p className="text-sm text-default-500">{assignment.course}</p>
      </div>

      <Divider className="my-3" />

      <div className="mb-4 space-y-3">
        <div>
          <h4 className="mb-1 text-sm font-medium text-default-600">Description</h4>
          <p className="text-sm text-default-500">{assignment.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <h4 className="mb-1 text-xs font-medium text-default-500">Due Date</h4>
            <div className="flex items-center gap-1.5 text-sm">
              <Icon icon="lucide:calendar" className="text-default-400" width={16} />
              <span>{format(assignment.dueDate, 'MMM d, yyyy')}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-medium text-default-500">Time Remaining</h4>
            <div className="flex items-center gap-1.5 text-sm">
              <Icon icon="lucide:clock" className="text-default-400" width={16} />
              <span>{timeLeft}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-medium text-default-500">Estimated Time</h4>
            <div className="flex items-center gap-1.5 text-sm">
              <Icon icon="lucide:timer" className="text-default-400" width={16} />
              <span>{assignment.estimatedTime}</span>
            </div>
          </div>
          <div>
            <h4 className="mb-1 text-xs font-medium text-default-500">Submission Type</h4>
            <div className="flex items-center gap-1.5 text-sm">
              <Icon
                icon={
                  assignment.submissionType === 'online'
                    ? 'lucide:upload-cloud'
                    : assignment.submissionType === 'in-person'
                      ? 'lucide:user'
                      : 'lucide:layers'
                }
                className="text-default-400"
                width={16}
              />
              <span>{assignment.submissionType.replace('-', ' ')}</span>
            </div>
          </div>
        </div>

        {assignment.status === 'in-progress' && (
          <div>
            <div className="mb-1 flex items-center justify-between text-xs">
              <h4 className="font-medium text-default-500">Progress</h4>
              <span className="font-medium">{assignment.progress}%</span>
            </div>
            <Progress value={assignment.progress} color="primary" size="sm" className="h-1.5" />
          </div>
        )}
      </div>

      <Divider className="my-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-default-500">
            <Icon icon="lucide:paperclip" width={14} />
            <span>{assignment.attachments} attachments</span>
          </div>
          {assignment.comments > 0 && (
            <div className="flex items-center gap-1 text-xs text-default-500">
              <Icon icon="lucide:message-square" width={14} />
              <span>{assignment.comments} comments</span>
            </div>
          )}
        </div>
        <Button size="sm" color="primary" variant="flat" endContent={<Icon icon="lucide:arrow-right" width={16} />}>
          Open
        </Button>
      </div>
    </div>
  )
}

export const UpcomingAssignments: React.FC = () => {
  const [assignments] = React.useState<Assignment[]>([
    {
      id: '1',
      title: 'Data Structures Project',
      course: 'CS202: Data Structures',
      dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000 + 40 * 60 * 1000), // 5h 40m from now
      status: 'in-progress',
      description:
        'Implement a balanced binary search tree with insertion, deletion, and traversal operations. Include unit tests and documentation.',
      priority: 'high',
      progress: 65,
      attachments: 3,
      comments: 2,
      type: 'project',
      estimatedTime: '8-10 hours',
      submissionType: 'online',
    },
    {
      id: '2',
      title: 'Database Design Assignment',
      course: 'CS305: Database Systems',
      dueDate: new Date(Date.now() + 26 * 60 * 60 * 1000), // 26h from now
      status: 'pending',
      description:
        'Design a normalized database schema for a library management system with at least 5 entities. Include ER diagrams and SQL scripts.',
      priority: 'medium',
      progress: 0,
      attachments: 1,
      comments: 0,
      type: 'homework',
      estimatedTime: '4-6 hours',
      submissionType: 'both',
    },
    {
      id: '3',
      title: 'Algorithm Analysis Report',
      course: 'CS301: Advanced Algorithms',
      dueDate: new Date(Date.now() + 72 * 60 * 60 * 1000), // 72h from now
      status: 'submitted',
      description: 'Analyze the time and space complexity of the provided sorting algorithms and submit a detailed report with visualizations.',
      priority: 'low',
      progress: 100,
      attachments: 2,
      comments: 1,
      type: 'homework',
      estimatedTime: '6-8 hours',
      submissionType: 'online',
    },
    {
      id: '4',
      title: 'Computer Networks',
      course: 'CS304: Computer Networks',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48h from now
      status: 'pending',
      description: 'Quiz covering network protocols, TCP/IP stack, and basic networking concepts. Open book, 60 minutes duration.',
      priority: 'high',
      progress: 0,
      attachments: 1,
      comments: 0,
      type: 'quiz',
      estimatedTime: '1 hour',
      submissionType: 'in-person',
    },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger'
      case 'medium':
        return 'warning'
      case 'low':
        return 'success'
      default:
        return 'default'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'project':
        return 'lucide:code'
      case 'homework':
        return 'lucide:book-open'
      case 'quiz':
        return 'lucide:file-question'
      case 'exam':
        return 'lucide:file-text'
      default:
        return 'lucide:file'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'primary'
      case 'homework':
        return 'success'
      case 'quiz':
        return 'warning'
      case 'exam':
        return 'danger'
      default:
        return 'default'
    }
  }

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM d, yyyy')
  }

  const pendingCount = assignments.filter((a) => a.status === 'pending' || a.status === 'in-progress').length

  return (
    <Card className="glass-card">
      <CardHeader className="px-4 pb-0 pt-6 sm:px-8">
        <div className="flex w-full flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:clipboard-check" className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Assessments</h2>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-base text-default-500">Upcoming assignments and deadlines</p>
            {pendingCount > 0 && (
              <Chip color="primary" variant="flat" size="sm" className="ml-2 gap-2 px-2.5">
                {pendingCount} active
              </Chip>
            )}
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-4 sm:p-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="relative"
            >
              <Card
                className={`group relative overflow-visible rounded-xl border transition-all hover:scale-[1.02] ${
                  assignment.status === 'in-progress'
                    ? 'border-primary-200 bg-primary-50/30 dark:bg-primary-900/5'
                    : assignment.status === 'pending'
                      ? assignment.priority === 'high'
                        ? 'border-danger-200 bg-danger-50/30 dark:bg-danger-900/5'
                        : assignment.priority === 'medium'
                          ? 'border-warning-200 bg-warning-50/30 dark:bg-warning-900/5'
                          : 'border-success-200 bg-success-50/30 dark:bg-success-900/5'
                      : 'border-divider bg-transparent'
                }`}
                shadow="none"
              >
                <CardBody className="p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex-grow min-w-0">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Chip
                          size="sm"
                          color={getTypeColor(assignment.type)}
                          variant="flat"
                          startContent={<Icon icon={getTypeIcon(assignment.type)} width={14} />}
                          className="gap-2 rounded-full px-2.5"
                        >
                          {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                        </Chip>
                        <h3 className="text-base font-medium sm:text-lg truncate">{assignment.title}</h3>
                      </div>
                      <p className="text-sm text-default-500 truncate">{assignment.course}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {assignment.status === 'in-progress' && (
                        <Chip
                          size="sm"
                          color="primary"
                          variant="flat"
                          startContent={<Icon icon="lucide:play-circle" width={14} />}
                          className="gap-2 rounded-full px-2.5"
                        >
                          In Progress
                        </Chip>
                      )}
                      {assignment.status === 'pending' && (
                        <Chip
                          size="sm"
                          color={getPriorityColor(assignment.priority)}
                          variant="flat"
                          startContent={<Icon icon="lucide:alert-circle" width={14} />}
                          className="gap-2 rounded-full px-2.5"
                        >
                          {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)}
                        </Chip>
                      )}
                      {assignment.status === 'submitted' && (
                        <Chip
                          size="sm"
                          color="success"
                          variant="flat"
                          startContent={<Icon icon="lucide:check-circle" width={14} />}
                          className="gap-2 rounded-full px-2.5"
                        >
                          Submitted
                        </Chip>
                      )}
                    </div>
                  </div>

                  <div className="mb-3 flex flex-wrap gap-2 text-xs text-default-500">
                    <div className="flex items-center gap-1">
                      <Icon icon="lucide:clock" width={14} />
                      <span className="hidden sm:inline">{assignment.estimatedTime}</span>
                      <span className="sm:hidden">{assignment.estimatedTime.split('-')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon="lucide:paperclip" width={14} />
                      <span>{assignment.attachments}</span>
                    </div>
                    {assignment.comments > 0 && (
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:message-square" width={14} />
                        <span>{assignment.comments}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Icon
                        icon={
                          assignment.submissionType === 'online'
                            ? 'lucide:upload-cloud'
                            : assignment.submissionType === 'in-person'
                              ? 'lucide:user'
                              : 'lucide:layers'
                        }
                        width={14}
                      />
                      <span className="hidden sm:inline">{assignment.submissionType.replace('-', ' ')}</span>
                      <span className="sm:hidden">{assignment.submissionType === 'online' ? 'Online' : assignment.submissionType === 'in-person' ? 'In-Person' : 'Both'}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm text-default-600">
                      <Icon icon="lucide:calendar" className="text-default-400" width={16} />
                      <span className="hidden sm:inline">Due: {formatDueDate(assignment.dueDate)}</span>
                      <span className="sm:hidden">{formatDueDate(assignment.dueDate)}</span>
                    </div>

                    {(assignment.status === 'pending' || assignment.status === 'in-progress') && <CountdownTimer dueDate={assignment.dueDate} />}
                  </div>

                  <div className="relative mt-3">
                    <Popover
                      placement="bottom"
                      offset={10}
                      showArrow={true}
                      backdrop="blur"
                      classNames={{
                        base: 'py-3 px-4 border border-divider bg-background shadow-lg rounded-xl',
                        arrow: 'bg-background border-divider',
                        content: 'p-0 rounded-xl',
                      }}
                    >
                      <PopoverTrigger>
                        <Button
                          size="sm"
                          variant="flat"
                          className="w-full rounded-full bg-default-100 transition-colors hover:bg-default-200"
                          startContent={<Icon icon="lucide:info" width={16} />}
                        >
                          View Details
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <AssignmentDetails assignment={assignment} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>

        {assignments.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon icon="lucide:check-circle" className="mb-4 h-12 w-12 text-success-400 sm:h-16 sm:w-16" />
            <h3 className="mb-2 text-lg font-medium sm:text-xl">No pending assignments</h3>
            <p className="text-sm text-default-500 sm:text-base">You're all caught up! Check back later for new assignments.</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}
