import React from 'react'
import { Popover, PopoverTrigger, PopoverContent, Button, Badge, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

// Core interface for notification data structure
interface Notification {
  id: string
  type: 'grade' | 'assignment' | 'message'
  title: string
  description: string
  timestamp: Date
  isRead: boolean
  course?: string
  link?: string
  sender?: string
  score?: string
  dueDate?: Date
}

export const NotificationCenter: React.FC = () => {
  // State management for notifications
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState<'all' | 'grade' | 'assignment' | 'message'>('all')

  // Initialize notifications with sample data
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 'n1',
      type: 'grade',
      title: 'Midterm Grade Released',
      description: 'Your midterm exam for Advanced Algorithms has been graded.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      course: 'CS301: Advanced Algorithms',
      score: '92/100',
      sender: 'Prof. Johnson',
    },
    {
      id: 'n2',
      type: 'assignment',
      title: 'Assignment Due Soon',
      description: 'Data Structures Project is due in 5 hours and 40 minutes.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      course: 'CS202: Data Structures',
      dueDate: new Date(Date.now() + 5 * 60 * 60 * 1000),
    },
    {
      id: 'n3',
      type: 'message',
      title: 'New Message from Prof. Johnson',
      description: "Don't forget to submit your assignments by Friday!",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isRead: true,
      course: 'CS301: Advanced Algorithms',
      sender: 'Prof. Johnson',
    },
    {
      id: 'n4',
      type: 'grade',
      title: 'Project Grade Released',
      description: 'Your Project 1 for Database Systems has been graded.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      course: 'CS305: Database Systems',
      score: '88/100',
      sender: 'Prof. Smith',
    },
    {
      id: 'n5',
      type: 'assignment',
      title: 'Assignment Deadline Passed',
      description: 'The deadline for Computer Networks Lab Report has passed.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      course: 'CS304: Computer Networks',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: 'n6',
      type: 'message',
      title: 'Group Project Update',
      description: 'Your team members have updated the project repository with new changes.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      isRead: false,
      course: 'CS301: Advanced Algorithms',
      sender: 'Team Lead',
    },
    {
      id: 'n7',
      type: 'grade',
      title: 'Quiz Results Available',
      description: 'Your weekly quiz results for Data Structures are now available.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      isRead: false,
      course: 'CS202: Data Structures',
      score: '18/20',
      sender: 'Prof. Williams',
    },
  ])

  // Calculate notification counts
  const totalCount = notifications.length
  const unreadCount = notifications.filter((n) => !n.isRead).length

  // Filter notifications based on selected type
  const filteredNotifications = selectedType === 'all' ? notifications : notifications.filter((n) => n.type === selectedType)

  // Notification handlers
  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })))
  }

  const handleTypeChange = (type: 'all' | 'grade' | 'assignment' | 'message') => {
    setSelectedType(type)
  }

  // Utility functions for notification display
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'grade':
        return <Icon icon="lucide:award" className="text-success" />
      case 'assignment':
        return <Icon icon="lucide:clipboard-list" className="text-warning" />
      case 'message':
        return <Icon icon="lucide:message-circle" className="text-primary" />
      default:
        return <Icon icon="lucide:bell" className="text-default-500" />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours)
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
      showArrow={true}
      classNames={{
        base: 'p-0',
        content: 'w-80 sm:w-96 bg-background/80 backdrop-blur-md border border-divider shadow-lg',
      }}
    >
      {/* Notification bell trigger */}
      <PopoverTrigger>
        <Button
          isIconOnly
          variant="light"
          aria-label={`${unreadCount} unread notifications`}
          className="relative flex h-8 w-8 items-center justify-center"
        >
          <Icon icon="lucide:bell" className={`text-default-600 transition-colors ${unreadCount > 0 ? 'text-primary' : ''}`} width={18} height={18} />
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        {/* Notification header with filters */}
        <div className="border-b border-divider bg-background/80 p-3 backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium">Notifications</h3>
            <Button size="sm" variant="light" onPress={markAllAsRead} isDisabled={unreadCount === 0}>
              Mark all as read
            </Button>
          </div>

          {/* Notification type filters */}
          <div className="flex flex-wrap gap-1">
            <Button
              size="sm"
              variant={selectedType === 'all' ? 'flat' : 'light'}
              color={selectedType === 'all' ? 'primary' : 'default'}
              className="flex-1 min-w-[60px]"
              onPress={() => handleTypeChange('all')}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={selectedType === 'grade' ? 'flat' : 'light'}
              color={selectedType === 'grade' ? 'success' : 'default'}
              className="flex-1 min-w-[60px]"
              startContent={<Icon icon="lucide:award" />}
              onPress={() => handleTypeChange('grade')}
            >
              <span className="hidden sm:inline">Grades</span>
              <span className="sm:hidden">Grade</span>
            </Button>
            <Button
              size="sm"
              variant={selectedType === 'assignment' ? 'flat' : 'light'}
              color={selectedType === 'assignment' ? 'warning' : 'default'}
              className="flex-1 min-w-[60px]"
              startContent={<Icon icon="lucide:clipboard-list" />}
              onPress={() => handleTypeChange('assignment')}
            >
              <span className="hidden sm:inline">Assignments</span>
              <span className="sm:hidden">Task</span>
            </Button>
            <Button
              size="sm"
              variant={selectedType === 'message' ? 'flat' : 'light'}
              color={selectedType === 'message' ? 'primary' : 'default'}
              className="flex-1 min-w-[60px]"
              startContent={<Icon icon="lucide:message-circle" />}
              onPress={() => handleTypeChange('message')}
            >
              <span className="hidden sm:inline">Messages</span>
              <span className="sm:hidden">Msg</span>
            </Button>
          </div>
        </div>

        {/* Notification list with animations */}
        <div className="max-h-[400px] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-divider">
                  {filteredNotifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className={`${!notification.isRead ? 'bg-primary-50/50 dark:bg-primary-900/20' : ''} hover:bg-default-100`}
                    >
                      <div className="cursor-pointer p-3" onClick={() => handleNotificationClick(notification.id)}>
                        <div className="flex gap-3">
                          {/* Notification icon */}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className={`rounded-full p-2 ${
                              notification.type === 'grade'
                                ? 'bg-success-100 text-success-500 dark:bg-success-900/30'
                                : notification.type === 'assignment'
                                  ? 'bg-warning-100 text-warning-500 dark:bg-warning-900/30'
                                  : 'bg-primary-100 text-primary-500 dark:bg-primary-900/30'
                            }`}
                          >
                            {getTypeIcon(notification.type)}
                          </motion.div>

                          {/* Notification content */}
                          <div className="flex-grow min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className={`text-sm truncate ${!notification.isRead ? 'font-medium' : ''}`}>{notification.title}</h4>
                                {notification.sender && <p className="text-xs text-default-500 truncate">From: {notification.sender}</p>}
                              </div>
                              <span className="text-xs text-default-400 shrink-0">{formatTime(notification.timestamp)}</span>
                            </div>

                            <p className="mt-1 text-xs text-default-500 line-clamp-2">{notification.description}</p>

                            {/* Notification metadata chips */}
                            <div className="mt-2 flex flex-wrap gap-2">
                              {notification.course && (
                                <Chip size="sm" variant="flat" color="primary" className="text-xs truncate max-w-[120px]">
                                  {notification.course}
                                </Chip>
                              )}
                              {notification.score && (
                                <Chip size="sm" variant="flat" color="success" className="text-xs">
                                  {notification.score}
                                </Chip>
                              )}
                              {notification.dueDate && (
                                <Chip size="sm" variant="flat" color="warning" className="text-xs">
                                  {formatTime(notification.dueDate)}
                                </Chip>
                              )}
                            </div>
                          </div>

                          {/* Unread indicator */}
                          {!notification.isRead && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                              className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary"
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-8 text-center"
                >
                  <Icon icon="lucide:check-circle" className="mx-auto mb-2 h-10 w-10 text-default-300" />
                  <p className="text-default-500">No notifications to display</p>
                  {selectedType !== 'all' && (
                    <Button size="sm" variant="light" color="primary" className="mt-2" onPress={() => handleTypeChange('all')}>
                      Show all notifications
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer with close button */}
        <div className="border-t border-divider bg-background/80 p-2 backdrop-blur-md">
          <Button size="sm" variant="light" className="w-full" onPress={() => setIsOpen(false)}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
