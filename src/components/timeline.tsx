import React from 'react'
import { Card, CardBody, CardHeader, Button, Tooltip, Chip, Tabs, Tab } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { format, addDays, isSameDay, differenceInDays } from 'date-fns'

interface TimelineEvent {
  id: string
  date: Date
  title: string
  type: 'assignment' | 'exam' | 'holiday' | 'semester-break' | 'class'
  course?: string
  description?: string
  time?: string
  location?: string
  status?: 'upcoming' | 'submitted' | 'graded'
  grade?: string
}

export const AcademicTimeline: React.FC = () => {
  const today = new Date()
  const timelineRef = React.useRef<HTMLDivElement>(null)
  const [filters, setFilters] = React.useState({
    assignment: false,
    exam: true,
    holiday: true,
    semesterBreak: false,
    class: true,
  })

  // Generate 30 days of events
  const generateEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = []

    // Add assignments with status
    events.push({
      id: 'a1',
      date: addDays(today, 2),
      title: 'Data Structures Project',
      type: 'assignment',
      course: 'CS202: Data Structures',
      description: 'Implement a balanced binary search tree with insertion, deletion, and traversal operations.',
      status: 'upcoming',
    })

    events.push({
      id: 'a2',
      date: addDays(today, 5),
      title: 'Database Design',
      type: 'assignment',
      course: 'CS305: Database Systems',
      description: 'Design a normalized database schema for a library management system with at least 5 entities.',
      status: 'submitted',
    })

    events.push({
      id: 'a3',
      date: addDays(today, -3), // Past assignment
      title: 'Algorithm Analysis',
      type: 'assignment',
      course: 'CS301: Advanced Algorithms',
      description: 'Analyze the time and space complexity of the provided sorting algorithms and submit a report.',
      status: 'graded',
      grade: 'A',
    })

    // Add exams
    events.push({
      id: 'e1',
      date: addDays(today, 7),
      title: 'Midterm Exam',
      type: 'exam',
      course: 'CS202: Data Structures',
      description: 'Covers chapters 1-5 from the textbook. Focus on tree and graph algorithms.',
      time: '10:00 AM - 12:00 PM',
      location: 'Room 301',
    })

    events.push({
      id: 'e2',
      date: addDays(today, 15),
      title: 'Final Project Presentation',
      type: 'exam',
      course: 'CS305: Database Systems',
      description: 'Present your database design project to the class.',
      time: '2:00 PM - 4:00 PM',
      location: 'Room 201',
    })

    // Add holidays
    events.push({
      id: 'h1',
      date: addDays(today, 10),
      title: 'University Foundation Day',
      type: 'holiday',
      description: 'University closed for Foundation Day celebrations.',
    })

    // Add semester break
    events.push({
      id: 'sb1',
      date: addDays(today, 25),
      title: 'Fall Break Begins',
      type: 'semester-break',
      description: 'Fall semester break. Classes resume on November 2nd.',
    })

    // Add regular classes (for today and a few other days)
    events.push({
      id: 'c1',
      date: today,
      title: 'Advanced Algorithms',
      type: 'class',
      course: 'CS301',
      time: '10:30 AM - 12:00 PM',
      location: 'Room 301',
    })

    events.push({
      id: 'c2',
      date: today,
      title: 'Database Systems',
      type: 'class',
      course: 'CS305',
      time: '2:00 PM - 3:30 PM',
      location: 'Online (Zoom)',
    })

    events.push({
      id: 'c3',
      date: addDays(today, 1),
      title: 'Data Structures',
      type: 'class',
      course: 'CS202',
      time: '9:00 AM - 10:30 AM',
      location: 'Room 201',
    })

    events.push({
      id: 'c4',
      date: addDays(today, 3),
      title: 'Computer Networks Lab',
      type: 'class',
      course: 'CS304',
      time: '1:00 PM - 3:00 PM',
      location: 'Lab 102',
    })

    // Add a few more events in the past for context
    events.push({
      id: 'p1',
      date: addDays(today, -2),
      title: 'Quiz 2',
      type: 'exam',
      course: 'CS301: Advanced Algorithms',
      description: 'Short quiz covering recent topics.',
      time: '11:00 AM - 11:30 AM',
      location: 'Room 301',
    })

    events.push({
      id: 'p2',
      date: addDays(today, -5),
      title: 'Lab Report Submission',
      type: 'assignment',
      course: 'CS304: Computer Networks',
      description: 'Submit the report for Lab 3: Network Protocols.',
    })

    return events.sort((a, b) => a.date.getTime() - b.date.getTime())
  }

  const [events] = React.useState<TimelineEvent[]>(generateEvents())

  // Group events by date
  const eventsByDate = React.useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {}

    events.forEach((event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd')
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })

    return grouped
  }, [events])

  // Filter events based on selected filters
  const filteredEvents = React.useMemo(() => {
    return events.filter((event) => {
      switch (event.type) {
        case 'assignment':
          return filters.assignment
        case 'exam':
          return filters.exam
        case 'holiday':
          return filters.holiday
        case 'semester-break':
          return filters.semesterBreak
        case 'class':
          return filters.class
        default:
          return true
      }
    })
  }, [events, filters])

  // Group filtered events by date
  const filteredEventsByDate = React.useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {}

    filteredEvents.forEach((event) => {
      const dateKey = format(event.date, 'yyyy-MM-dd')
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(event)
    })

    return grouped
  }, [filteredEvents])

  // Scroll to today's date when component mounts or filters change
  React.useEffect(() => {
    if (timelineRef.current) {
      // Find today's date element
      const todayElement = timelineRef.current.querySelector('[data-today="true"]')
      if (todayElement) {
        // Scroll to the element with a small offset
        todayElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [filters])

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Icon icon="lucide:clipboard-check" className="text-primary" width={20} height={20} />
      case 'exam':
        return <Icon icon="lucide:file-check" className="text-danger" width={20} height={20} />
      case 'holiday':
        return <Icon icon="lucide:party-popper" className="text-success" width={20} height={20} />
      case 'semester-break':
        return <Icon icon="lucide:coffee" className="text-warning" width={20} height={20} />
      case 'class':
        return <Icon icon="lucide:graduation-cap" className="text-primary" width={20} height={20} />
      default:
        return <Icon icon="lucide:calendar" className="text-default-500" width={20} height={20} />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'primary'
      case 'exam':
        return 'danger'
      case 'holiday':
        return 'success'
      case 'semester-break':
        return 'warning'
      default:
        return 'default'
    }
  }

  const getAssignmentStatusColor = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return 'warning'
      case 'submitted':
        return 'primary'
      case 'graded':
        return 'success'
      default:
        return 'default'
    }
  }

  const getAssignmentStatusIcon = (status?: string) => {
    switch (status) {
      case 'upcoming':
        return <Icon icon="lucide:clock" className="text-warning" width={16} height={16} />
      case 'submitted':
        return <Icon icon="lucide:check-circle" className="text-primary" width={16} height={16} />
      case 'graded':
        return <Icon icon="lucide:award" className="text-success" width={16} height={16} />
      default:
        return <Icon icon="lucide:clipboard" className="text-default-500" width={16} height={16} />
    }
  }

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }))
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="px-4 pb-0 pt-6 sm:px-8">
        <div className="flex w-full flex-col items-center gap-1 pb-2 text-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:history" className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Academic Timeline</h2>
          </div>
          <p className="text-base text-default-500">Academic events, assignments, and important dates</p>
        </div>
      </CardHeader>

      <CardBody className="pt-0">
        <div className="px-4 pb-6 pt-2 sm:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              size="sm"
              variant={filters.assignment ? 'flat' : 'light'}
              color={filters.assignment ? 'primary' : 'default'}
              startContent={<Icon icon="lucide:clipboard-list" className="h-4 w-4 sm:h-5 sm:w-5" />}
              onPress={() => toggleFilter('assignment')}
              className="text-xs sm:text-sm"
            >
              Assignments
            </Button>
            <Button
              size="sm"
              variant={filters.exam ? 'flat' : 'light'}
              color={filters.exam ? 'danger' : 'default'}
              startContent={<Icon icon="lucide:file-text" className="h-4 w-4 sm:h-5 sm:w-5" />}
              onPress={() => toggleFilter('exam')}
              className="text-xs sm:text-sm"
            >
              Exams
            </Button>
            <Button
              size="sm"
              variant={filters.holiday ? 'flat' : 'light'}
              color={filters.holiday ? 'success' : 'default'}
              startContent={<Icon icon="lucide:party-popper" className="h-4 w-4 sm:h-5 sm:w-5" />}
              onPress={() => toggleFilter('holiday')}
              className="text-xs sm:text-sm"
            >
              Holidays
            </Button>
            <Button
              size="sm"
              variant={filters.semesterBreak ? 'flat' : 'light'}
              color={filters.semesterBreak ? 'warning' : 'default'}
              startContent={<Icon icon="lucide:calendar-off" className="h-4 w-4 sm:h-5 sm:w-5" />}
              onPress={() => toggleFilter('semesterBreak')}
              className="text-xs sm:text-sm"
            >
              Breaks
            </Button>
            <Button
              size="sm"
              variant={filters.class ? 'flat' : 'light'}
              color={filters.class ? 'primary' : 'default'}
              startContent={<Icon icon="lucide:book-open" className="h-4 w-4 sm:h-5 sm:w-5" />}
              onPress={() => toggleFilter('class')}
              className="text-xs sm:text-sm"
            >
              Classes
            </Button>
          </div>
        </div>

        <div className="relative max-h-[500px] overflow-y-auto px-4 pb-4 sm:px-8">
          {/* Timeline container with the main line */}
          <div className="relative">
            {/* The main timeline line */}
            <div className="absolute bottom-0 top-0 w-0.5 bg-default-200" />

            {Object.entries(filteredEventsByDate).map(([dateKey, dateEvents], dateIndex, dates) => {
              const date = new Date(dateKey)
              const isToday = isSameDay(date, today)
              const isPast = date < today
              const isFuture = date > today

              return (
                <div key={dateKey} data-today={isToday} className="relative mb-6 last:mb-0">
                  {/* Date header with circle and connecting line */}
                  <div className={`mb-3 flex items-center gap-3 ${isToday ? 'sticky top-0 z-20 pb-2' : ''}`}>
                    <div className="relative flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
                      {/* Horizontal connecting line */}
                      <div className="absolute left-0 top-1/2 h-0.5 w-8 -translate-y-1/2 bg-default-200" />
                      {/* Date circle */}
                      {isToday ? (
                        <div className="absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2">
                          {/* Main circle */}
                          <motion.div
                            animate={{
                              scale: [1, 1.15, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: [0.4, 0, 0.2, 1],
                            }}
                            className="absolute inset-0 rounded-full bg-primary"
                          />
                          {/* Pulse effect */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{
                              scale: [0.8, 1.5],
                              opacity: [0.5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: [0.4, 0, 0.2, 1],
                              repeatDelay: 0.2,
                            }}
                            className="absolute inset-0 rounded-full bg-primary"
                          />
                          {/* Second pulse for continuous effect */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0.5 }}
                            animate={{
                              scale: [0.8, 1.5],
                              opacity: [0.5, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: [0.4, 0, 0.2, 1],
                              delay: 0.75,
                              repeatDelay: 0.2,
                            }}
                            className="absolute inset-0 rounded-full bg-primary"
                          />
                        </div>
                      ) : (
                        <div
                          className={`absolute left-0 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                            isPast ? 'bg-primary' : 'bg-default-300'
                          }`}
                        />
                      )}
                    </div>

                    <div className="relative z-20 flex items-center gap-2">
                      <h3
                        className={`text-sm font-medium sm:text-base ${isToday ? 'text-primary' : isPast ? 'text-default-600' : 'text-default-500'}`}
                      >
                        {format(date, 'EEEE, MMMM d')}
                      </h3>
                      {isToday && (
                        <Chip size="sm" color="primary" variant="flat" className="text-xs">
                          Today
                        </Chip>
                      )}
                    </div>
                  </div>

                  {/* Events */}
                  <div className="relative ml-6 space-y-3 pl-4 sm:ml-8 sm:pl-6">
                    {dateEvents.map((event, eventIndex) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                        className="relative"
                      >
                        {/* Event card */}
                        <Card
                          shadow="sm"
                          className={`relative border ${
                            event.type === 'assignment'
                              ? event.status === 'upcoming'
                                ? 'border-warning-200 bg-warning-50/30 dark:bg-warning-900/5'
                                : event.status === 'submitted'
                                  ? 'border-primary-200 bg-primary-50/30 dark:bg-primary-900/5'
                                  : 'border-success-200 bg-success-50/30 dark:bg-success-900/5'
                              : 'border-divider'
                          }`}
                        >
                          <CardBody className="p-3 sm:p-4">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-md p-2 ${
                                  event.type === 'assignment'
                                    ? event.status === 'upcoming'
                                      ? 'bg-warning-100/30 text-warning-500 dark:bg-warning-900/20'
                                      : event.status === 'submitted'
                                        ? 'bg-primary-100/30 text-primary-500 dark:bg-primary-900/20'
                                        : 'bg-success-100/30 text-success-500 dark:bg-success-900/20'
                                    : event.type === 'exam'
                                      ? 'bg-danger-100/30 text-danger-500 dark:bg-danger-900/20'
                                      : event.type === 'holiday'
                                        ? 'bg-success-100/30 text-success-500 dark:bg-success-900/20'
                                        : event.type === 'semester-break'
                                          ? 'bg-warning-100/30 text-warning-500 dark:bg-warning-900/20'
                                          : 'bg-primary-100/30 text-primary-500 dark:bg-primary-900/20'
                                }`}
                              >
                                {event.type === 'assignment' ? getAssignmentStatusIcon(event.status) : getEventTypeIcon(event.type)}
                              </motion.div>

                              <div className="flex-grow">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                  <div>
                                    <h4 className="text-sm font-medium sm:text-base">{event.title}</h4>
                                    {event.course && <p className="text-xs text-default-500 sm:text-sm">{event.course}</p>}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {event.type === 'assignment' && event.status === 'graded' && event.grade && (
                                      <Chip size="sm" color="success" variant="flat" className="text-xs font-medium">
                                        Grade: {event.grade}
                                      </Chip>
                                    )}
                                    <Chip
                                      size="sm"
                                      color={event.type === 'assignment' ? getAssignmentStatusColor(event.status) : getEventTypeColor(event.type)}
                                      variant="flat"
                                      className="text-xs"
                                    >
                                      {event.type === 'assignment'
                                        ? event.status === 'upcoming'
                                          ? 'Upcoming'
                                          : event.status === 'submitted'
                                            ? 'Submitted'
                                            : 'Graded'
                                        : event.type.replace('-', ' ')}
                                    </Chip>
                                  </div>
                                </div>

                                {event.description && <p className="mt-2 text-xs text-default-600 sm:text-sm">{event.description}</p>}

                                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 sm:gap-x-4">
                                  {event.time && (
                                    <div className="flex items-center gap-1 text-[10px] text-default-500 sm:text-xs">
                                      <Icon icon="lucide:clock" width={12} height={12} />
                                      <span>{event.time}</span>
                                    </div>
                                  )}

                                  {event.location && (
                                    <div className="flex items-center gap-1 text-[10px] text-default-500 sm:text-xs">
                                      <Icon icon="lucide:map-pin" width={12} height={12} />
                                      <span>{event.location}</span>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-1 text-[10px] text-default-500 sm:text-xs">
                                    <Icon icon="lucide:calendar" width={12} height={12} />
                                    <span>
                                      {isToday
                                        ? 'Today'
                                        : isSameDay(date, addDays(today, 1))
                                          ? 'Tomorrow'
                                          : isSameDay(date, addDays(today, -1))
                                            ? 'Yesterday'
                                            : format(date, 'MMM d')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {Object.keys(filteredEventsByDate).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon icon="lucide:calendar-x" className="mb-4 h-12 w-12 text-default-300 sm:h-16 sm:w-16" />
              <h3 className="mb-2 text-lg font-medium sm:text-xl">No events to display</h3>
              <p className="mb-4 max-w-md text-sm text-default-500 sm:text-base">Try adjusting your filters to see more events</p>
              <Button
                color="primary"
                variant="flat"
                size="sm"
                className="text-xs sm:text-sm"
                onPress={() =>
                  setFilters({
                    assignment: false,
                    exam: true,
                    holiday: true,
                    semesterBreak: false,
                    class: false,
                  })
                }
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  )
}
