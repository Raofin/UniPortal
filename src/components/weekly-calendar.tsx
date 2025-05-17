import React from 'react'
import { Card, CardBody, CardHeader, Divider, Button } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { format, addDays, isSameDay } from 'date-fns'

interface DayData {
  date: Date
  status: 'present' | 'absent' | 'holiday' | 'none'
  classes: ClassData[]
}

interface ClassData {
  id: string
  time: string
  endTime: string
  course: string
  classroom: string
  type: 'lecture' | 'lab' | 'online'
}

export const WeeklyCalendar: React.FC = () => {
  const today = new Date()

  // Generate 7 days starting from 3 days ago
  const generateWeek = (): DayData[] => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(today, i - 3)
      // Random status for demo purposes
      const statuses = ['present', 'absent', 'holiday', 'none'] as const
      const randomStatus = i === 3 ? 'present' : statuses[Math.floor(Math.random() * statuses.length)]

      return {
        date,
        status: randomStatus,
        classes: i === 3 ? todayClasses : i % 2 === 0 ? [] : otherDayClasses,
      }
    })
  }

  const [week, setWeek] = React.useState<DayData[]>(generateWeek())
  const [selectedDay, setSelectedDay] = React.useState<DayData>(week[3]) // Default to today

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <span className="h-3 w-3 rounded-full bg-success-500"></span>
      case 'absent':
        return <span className="h-3 w-3 rounded-full bg-danger-500"></span>
      case 'holiday':
        return <span className="h-3 w-3 rounded-full bg-warning-500"></span>
      default:
        return <span className="h-3 w-3 rounded-full bg-default-200"></span>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture':
        return <Icon icon="lucide:presentation" className="text-primary" />
      case 'lab':
        return <Icon icon="lucide:flask-conical" className="text-success" />
      case 'online':
        return <Icon icon="lucide:video" className="text-warning" />
      default:
        return <Icon icon="lucide:book" className="text-default-500" />
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Weekly Calendar</h2>
          <Button isIconOnly variant="light" aria-label="Refresh calendar">
            <Icon icon="lucide:refresh-cw" />
          </Button>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {week.map((day, index) => (
              <motion.div
                key={format(day.date, 'yyyy-MM-dd')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Button
                  variant={isSameDay(day.date, selectedDay.date) ? 'flat' : 'light'}
                  color={isSameDay(day.date, selectedDay.date) ? 'primary' : 'default'}
                  className={`flex h-auto min-w-[80px] flex-col py-2 ${isSameDay(day.date, today) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                  onPress={() => setSelectedDay(day)}
                >
                  <span className="text-xs font-normal">{format(day.date, 'EEE')}</span>
                  <span className="text-lg font-semibold">{format(day.date, 'dd')}</span>
                  <div className="mt-1">{getStatusIcon(day.status)}</div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </CardHeader>

      <Divider />

      <CardBody>
        <h3 className="mb-4 text-lg font-medium">
          {isSameDay(selectedDay.date, today) ? "Today's Classes" : `Classes for ${format(selectedDay.date, 'MMMM d')}`}
        </h3>

        {selectedDay.classes.length > 0 ? (
          <div className="space-y-3">
            {selectedDay.classes.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center gap-3 rounded-lg border border-divider p-3 transition-colors hover:bg-content1"
              >
                <div className="rounded-md bg-primary-100/50 p-2">{getTypeIcon(classItem.type)}</div>

                <div className="flex-grow">
                  <h4 className="font-medium">{classItem.course}</h4>
                  <p className="text-sm text-default-500">{classItem.classroom}</p>
                </div>

                <div className="text-right">
                  <p className="font-medium">{classItem.time}</p>
                  <p className="text-xs text-default-500">to {classItem.endTime}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Icon icon="lucide:calendar-off" className="mb-2 h-12 w-12 text-default-300" />
            <p className="text-default-500">No classes scheduled for this day</p>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

// Sample data
const todayClasses: ClassData[] = [
  {
    id: '1',
    time: '10:30 AM',
    endTime: '12:00 PM',
    course: 'Advanced Algorithms',
    classroom: 'Room 301',
    type: 'lecture',
  },
  {
    id: '2',
    time: '2:00 PM',
    endTime: '3:30 PM',
    course: 'Database Systems',
    classroom: 'Online (Zoom)',
    type: 'online',
  },
]

const otherDayClasses: ClassData[] = [
  {
    id: '3',
    time: '9:00 AM',
    endTime: '10:30 AM',
    course: 'Data Structures',
    classroom: 'Room 201',
    type: 'lecture',
  },
  {
    id: '4',
    time: '1:00 PM',
    endTime: '3:00 PM',
    course: 'Computer Networks Lab',
    classroom: 'Lab 102',
    type: 'lab',
  },
]
