import React from 'react'
import { Card, CardBody, CardHeader, Divider, Button, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { format, addDays, isSameDay, isToday, isTomorrow } from 'date-fns'

// Core interfaces for the calendar system
interface DayData {
  date: Date
  status: 'holiday' | 'none'
  classes: ClassData[]
  weekNumber: number
}

interface ClassData {
  id: string
  time: string
  endTime: string
  course: string
  classroom: string
  type: 'lecture' | 'lab' | 'online'
  instructor?: string
  attendance?: number
  nextClass?: boolean
  duration?: number
  status?: 'present' | 'absent' | 'none'
}

// Base schedule configuration for each day of the week
const baseSchedule: { [key: number]: ClassData[] } = {
  0: [
    {
      id: 's1',
      time: '10:00',
      endTime: '11:30',
      course: 'Web Development',
      classroom: 'Room 203',
      type: 'lecture',
      instructor: 'Dr. James Wilson',
      status: 'present',
    },
    {
      id: 's2',
      time: '13:00',
      endTime: '14:30',
      course: 'Mobile App Development',
      classroom: 'Lab 101',
      type: 'lab',
      instructor: 'Prof. Maria Garcia',
      status: 'present',
    },
  ],
  1: [
    {
      id: 'm1',
      time: '09:00',
      endTime: '10:30',
      course: 'Data Structures',
      classroom: 'Room 201',
      type: 'lecture',
      instructor: 'Dr. Emily Brown',
      status: 'absent',
    },
    {
      id: 'm2',
      time: '13:00',
      endTime: '15:00',
      course: 'Computer Networks Lab',
      classroom: 'Lab 102',
      type: 'lab',
      instructor: 'Prof. David Wilson',
      status: 'absent',
    },
  ],
  2: [
    {
      id: 't1',
      time: '10:30',
      endTime: '12:00',
      course: 'Advanced Algorithms',
      classroom: 'Room 301',
      type: 'lecture',
      instructor: 'Dr. Sarah Johnson',
      status: 'present',
    },
    {
      id: 't2',
      time: '14:00',
      endTime: '15:30',
      course: 'Artificial Intelligence',
      classroom: 'Lab 103',
      type: 'lab',
      instructor: 'Dr. Robert Chen',
      status: 'present',
    },
  ],
  3: [
    {
      id: 'w1',
      time: '09:00',
      endTime: '10:30',
      course: 'Database Systems',
      classroom: 'Room 201',
      type: 'lecture',
      instructor: 'Prof. Michael Chen',
      status: 'present',
    },
    {
      id: 'w2',
      time: '14:00',
      endTime: '15:30',
      course: 'Software Engineering',
      classroom: 'Lab 103',
      type: 'lab',
      instructor: 'Dr. Robert Lee',
      status: 'present',
    },
  ],
  4: [
    {
      id: 'th1',
      time: '11:00',
      endTime: '12:30',
      course: 'Machine Learning',
      classroom: 'Room 302',
      type: 'lecture',
      instructor: 'Dr. Lisa Wang',
      status: 'absent',
    },
    {
      id: 'th2',
      time: '13:30',
      endTime: '15:00',
      course: 'Cloud Computing',
      classroom: 'Lab 104',
      type: 'lab',
      instructor: 'Prof. Alex Kumar',
      status: 'absent',
    },
  ],
  5: [], // Friday - holiday
  6: [], // Saturday - holiday
}

export const WeeklyCalendar: React.FC = () => {
  const today = new Date()
  const [selectedDay, setSelectedDay] = React.useState<DayData | null>(null)
  const calendarRef = React.useRef<HTMLDivElement>(null)
  const todayButtonRef = React.useRef<HTMLButtonElement>(null)
  const isScrollingRef = React.useRef(false)

  // Generate a 30-day calendar view centered around today
  const generateInitialDays = React.useCallback((): DayData[] => {
    const days: DayData[] = []
    const startDate = addDays(today, -15) // Start 15 days before today

    for (let i = 0; i < 30; i++) {
      const date = addDays(startDate, i)
      const dayOfWeek = date.getDay()
      const isToday = isSameDay(date, today)

      let status: 'holiday' | 'none'
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        status = 'holiday'
      } else {
        status = 'none'
      }

      days.push({
        date,
        status,
        classes: baseSchedule[dayOfWeek] || [],
        weekNumber: Math.floor(i / 7),
      })
    }
    return days
  }, [today])

  const [days, setDays] = React.useState<DayData[]>(() => generateInitialDays())

  // Handle day selection with smooth scrolling animation
  const handleDaySelect = React.useCallback((day: DayData) => {
    if (isScrollingRef.current) return // Prevent selection while scrolling

    setSelectedDay(day)
    isScrollingRef.current = true

    const buttonElement = calendarRef.current?.querySelector(`[data-date="${format(day.date, 'yyyy-MM-dd')}"]`) as HTMLButtonElement | null

    if (calendarRef.current && buttonElement) {
      const container = calendarRef.current
      const containerRect = container.getBoundingClientRect()
      const buttonRect = buttonElement.getBoundingClientRect()

      // Check if the button is fully visible in the container
      const isFullyVisible =
        buttonRect.left >= containerRect.left &&
        buttonRect.right <= containerRect.right

      // Only scroll if the button is not fully visible
      if (!isFullyVisible) {
        const relativeLeft = buttonRect.left - containerRect.left
        const containerWidth = container.clientWidth
        const buttonWidth = buttonRect.width

        // Calculate the scroll position needed to center the button
        const scrollLeft = container.scrollLeft + relativeLeft - (containerWidth / 2) + (buttonWidth / 2)
        container.scrollLeft = scrollLeft
      }

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 100)
    } else {
      isScrollingRef.current = false
    }
  }, [])

  // Initialize calendar with today's date centered
  React.useEffect(() => {
    if (!selectedDay) {
      const todayIndex = days.findIndex((day) => isSameDay(day.date, today))
      if (todayIndex !== -1) {
        setSelectedDay(days[todayIndex])
      }
    }

    // Center today's date in the calendar view
    if (calendarRef.current) {
      const container = calendarRef.current
      const todayButton = container.querySelector(`[data-date="${format(today, 'yyyy-MM-dd')}"]`) as HTMLButtonElement | null

      if (todayButton) {
        const containerWidth = container.clientWidth
        const buttonLeft = todayButton.offsetLeft
        const buttonWidth = todayButton.offsetWidth
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2)

        container.scrollLeft = scrollLeft
      }
    }
  }, [days, selectedDay, today])

  // Helper functions for UI rendering
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <Icon icon="lucide:check-circle" className="text-success" width={16} />
      case 'absent':
        return <Icon icon="lucide:x-circle" className="text-danger" width={16} />
      case 'holiday':
        return <Icon icon="lucide:palm-tree" className="text-warning" width={16} />
      default:
        return <Icon icon="lucide:circle" className="text-default-400" width={16} />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <Icon icon="lucide:presentation" className="text-primary" width={20} />
      case 'lab':
        return <Icon icon="lucide:flask-conical" className="text-success" width={20} />
      case 'online':
        return <Icon icon="lucide:video" className="text-warning" width={20} />
      default:
        return <Icon icon="lucide:book" className="text-default-500" width={20} />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'primary'
      case 'lab':
        return 'success'
      case 'online':
        return 'warning'
      default:
        return 'default'
    }
  }

  const formatTime = (time: string) => {
    return format(new Date(`2000-01-01T${time}`), 'h:mm a')
  }

  // Find the next upcoming class
  const getNextClass = (classes: ClassData[]) => {
    const now = new Date()
    const currentTime = format(now, 'HH:mm')
    return classes.find((cls) => cls.time > currentTime)
  }

  // Determine the current status of a class (completed, ongoing, or upcoming)
  const getClassStatus = (classItem: ClassData) => {
    const now = new Date()
    const classTime = new Date(`2000-01-01T${classItem.time}`)
    const classEndTime = new Date(`2000-01-01T${classItem.endTime}`)
    const currentTime = new Date(`2000-01-01T${format(now, 'HH:mm')}`)

    if (currentTime > classEndTime) return 'completed'
    if (currentTime >= classTime && currentTime <= classEndTime) return 'ongoing'
    return 'upcoming'
  }

  return (
    <Card className="glass-card">
      <CardHeader className="px-4 pb-0 pt-6 sm:px-8">
        <div className="flex w-full flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:calendar" className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
          </div>
          <p className="text-base text-default-500">Class schedule, details, and attendance</p>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        {/* Calendar days scrollable container */}
        <div
          ref={calendarRef}
          className="overflow-x-auto px-2 pb-6 pt-4 scrollbar-hide sm:px-8"
          style={{
            minHeight: '180px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex min-w-max gap-1 py-4 sm:gap-2">
            {days.map((day, index) => (
              <motion.div
                key={format(day.date, 'yyyy-MM-dd')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Button
                  ref={isToday(day.date) ? todayButtonRef : null}
                  data-date={format(day.date, 'yyyy-MM-dd')}
                  variant={selectedDay && isSameDay(day.date, selectedDay.date) ? 'flat' : 'light'}
                  color={selectedDay && isSameDay(day.date, selectedDay.date) ? 'primary' : 'default'}
                  className={`group relative flex h-auto min-w-[70px] flex-col py-3 sm:min-w-[90px] sm:py-4 ${
                    isToday(day.date) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                  }`}
                  onPress={() => handleDaySelect(day)}
                >
                  <span className="text-[11px] font-medium text-default-500 group-hover:text-default-700 sm:text-xs">{format(day.date, 'EEE')}</span>
                  <span className="mt-1 text-base font-semibold group-hover:text-default-900 sm:mt-1.5 sm:text-lg sm:text-xl">
                    {format(day.date, 'dd')}
                  </span>
                  <div className="mt-2 flex items-center gap-0.5 sm:mt-2.5 sm:gap-1">
                    {day.status === 'holiday' ? (
                      <>
                        <Icon icon="lucide:palm-tree" className="text-warning" width={14} height={14} />
                        <span className="text-[9px] font-medium text-default-500 sm:text-[10px]">Holiday</span>
                      </>
                    ) : day.classes.length > 0 ? (
                      <>
                        <Icon icon="lucide:book-open" className="text-primary" width={14} height={14} />
                        <span className="text-[9px] font-medium text-default-500 sm:text-[10px]">
                          {day.classes.length} {day.classes.length === 1 ? 'Class' : 'Classes'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Icon icon="lucide:calendar-off" className="text-default-400" width={14} height={14} />
                        <span className="text-[9px] font-medium text-default-500 sm:text-[10px]">No Classes</span>
                      </>
                    )}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Selected day's class schedule */}
        {selectedDay && (
          <div className="p-4 sm:p-8">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {isToday(selectedDay.date)
                  ? "Today's Classes"
                  : isTomorrow(selectedDay.date)
                    ? "Tomorrow's Classes"
                    : `Classes for ${format(selectedDay.date, 'MMMM d')}`}
              </h3>
              {selectedDay.classes.length > 0 && (
                <Chip
                  size="sm"
                  color="primary"
                  variant="flat"
                  startContent={<Icon icon="lucide:clock" width={14} />}
                  className="gap-2 rounded-full px-2.5"
                >
                  {selectedDay.classes.length} {selectedDay.classes.length === 1 ? 'Class' : 'Classes'}
                </Chip>
              )}
            </div>

            {selectedDay.classes.length > 0 ? (
              <div className="space-y-3">
                {selectedDay.classes.map((classItem, index) => {
                  const status = getClassStatus(classItem)
                  const isNextClass = getNextClass(selectedDay.classes)?.id === classItem.id

                  return (
                    <motion.div
                      key={classItem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className={`group relative flex items-start gap-3 rounded-xl border p-3 transition-all hover:scale-[1.02] ${
                        status === 'ongoing'
                          ? 'border-primary-200 bg-primary-50/30 dark:bg-primary-900/5'
                          : status === 'upcoming' && isNextClass
                            ? 'border-warning-200 bg-warning-50/30 dark:bg-warning-900/5'
                            : 'border-divider hover:border-default-200'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 rounded-lg p-2 ${
                          status === 'ongoing'
                            ? 'bg-primary-100/30 text-primary-500 dark:bg-primary-900/20'
                            : status === 'upcoming' && isNextClass
                              ? 'bg-warning-100/30 text-warning-500 dark:bg-warning-900/20'
                              : 'bg-default-100/30 text-default-500'
                        }`}
                      >
                        {getTypeIcon(classItem.type)}
                      </div>

                      <div className="min-w-0 flex-grow">
                        {/* Mobile Layout */}
                        <div className="flex flex-col gap-2 sm:hidden">
                          <div className="min-w-0 flex-grow">
                            <h4 className="truncate text-sm font-medium">{classItem.course}</h4>
                            {classItem.instructor && <p className="truncate text-xs text-default-500">Instructor: {classItem.instructor}</p>}
                            <p className="truncate text-xs text-default-500">Room: {classItem.classroom}</p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Icon icon="lucide:clock" className="text-default-400" width={16} />
                              <div>
                                <p className="whitespace-nowrap text-sm font-medium">{formatTime(classItem.time)}</p>
                                <p className="whitespace-nowrap text-[10px] text-default-500">to {formatTime(classItem.endTime)}</p>
                              </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5">
                              <Chip
                                size="sm"
                                color={getTypeColor(classItem.type)}
                                variant="flat"
                                startContent={<Icon icon={getTypeIcon(classItem.type).props.icon} width={14} />}
                                className="gap-1 rounded-full px-2 text-[11px]"
                              >
                                {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
                              </Chip>
                              {classItem.status && classItem.status !== 'none' && getClassStatus(classItem) === 'completed' && (
                                <Chip
                                  size="sm"
                                  color={classItem.status === 'present' ? 'success' : 'danger'}
                                  variant="flat"
                                  startContent={<Icon icon={classItem.status === 'present' ? 'lucide:check-circle' : 'lucide:x-circle'} width={14} />}
                                  className="gap-1 rounded-full px-2 text-[11px]"
                                >
                                  {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                                </Chip>
                              )}
                              {status === 'ongoing' && (
                                <Chip size="sm" color="primary" variant="flat" className="gap-1 rounded-full px-2 text-[11px]">
                                  Ongoing
                                </Chip>
                              )}
                              {isNextClass && status === 'upcoming' && (
                                <Chip size="sm" color="warning" variant="flat" className="gap-1 rounded-full px-2 text-[11px]">
                                  Next
                                </Chip>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Desktop Layout */}
                        <div className="hidden sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-2">
                          <div className="min-w-0 flex-grow">
                            <h4 className="truncate text-base font-medium">{classItem.course}</h4>
                            {classItem.instructor && <p className="truncate text-sm text-default-500">Instructor: {classItem.instructor}</p>}
                            <p className="truncate text-sm text-default-500">Room: {classItem.classroom}</p>
                          </div>

                          <div className="flex flex-col items-end gap-1.5">
                            <div className="flex items-center gap-1.5">
                              <Chip
                                size="sm"
                                color={getTypeColor(classItem.type)}
                                variant="flat"
                                startContent={<Icon icon={getTypeIcon(classItem.type).props.icon} width={14} />}
                                className="gap-2 rounded-full px-2.5 text-xs"
                              >
                                {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
                              </Chip>
                              {classItem.status && classItem.status !== 'none' && getClassStatus(classItem) === 'completed' && (
                                <Chip
                                  size="sm"
                                  color={classItem.status === 'present' ? 'success' : 'danger'}
                                  variant="flat"
                                  startContent={<Icon icon={classItem.status === 'present' ? 'lucide:check-circle' : 'lucide:x-circle'} width={14} />}
                                  className="gap-2 rounded-full px-2.5 text-xs"
                                >
                                  {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                                </Chip>
                              )}
                              {status === 'ongoing' && (
                                <Chip size="sm" color="primary" variant="flat" className="gap-2 rounded-full px-2.5 text-xs">
                                  Ongoing
                                </Chip>
                              )}
                              {isNextClass && status === 'upcoming' && (
                                <Chip size="sm" color="warning" variant="flat" className="gap-2 rounded-full px-2.5 text-xs">
                                  Next
                                </Chip>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="whitespace-nowrap text-base font-medium">{formatTime(classItem.time)}</p>
                              <p className="whitespace-nowrap text-xs text-default-500">to {formatTime(classItem.endTime)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Icon icon="lucide:calendar-off" className="mb-4 h-12 w-12 text-default-300 sm:h-16 sm:w-16" />
                <h3 className="mb-2 text-lg font-medium sm:text-xl">No classes scheduled</h3>
                <p className="text-sm text-default-500 sm:text-base">
                  {isToday(selectedDay.date)
                    ? "You don't have any classes today. Enjoy your free time!"
                    : isTomorrow(selectedDay.date)
                      ? "You don't have any classes tomorrow. Plan ahead!"
                      : `No classes scheduled for ${format(selectedDay.date, 'MMMM d')}.`}
                </p>
              </div>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  )
}

// Custom scrollbar styles
const styles = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scroll-snap-align-center {
    scroll-snap-align: center;
  }
`

// Add styles to document head
const styleSheet = document.createElement('style')
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
