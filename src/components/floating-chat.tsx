import React from 'react'
import { Button, Modal, ModalContent, ModalBody, ModalFooter, Avatar, Input, Chip, Divider, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import { EnhancedAIChat } from './ai-chat'
import { Conversations } from './conversations'
import { ThemeSwitcher } from './theme-switcher'

// Core interfaces for chat functionality
interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    role: 'student' | 'teacher' | 'assistant' | 'self'
  }
  content: string
  timestamp: Date
  isRead: boolean
}

interface ChatGroup {
  id: string
  name: string
  unreadCount: number
  lastMessage: string
  lastMessageTime: Date
}

export const FloatingChat: React.FC = () => {
  // State management for chat functionality
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'conversations' | 'ai'>('conversations')
  const [selectedChat, setSelectedChat] = React.useState<string | null>('cs301')
  const [newMessage, setNewMessage] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const [selectedInboxMessage, setSelectedInboxMessage] = React.useState<string | null>(null)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)
  const [isSpinning, setIsSpinning] = React.useState(false)

  // Mock data for chat groups and messages
  const chatGroups: ChatGroup[] = [
    {
      id: 'cs301',
      name: 'CS301: Advanced Algorithms',
      unreadCount: 3,
      lastMessage: "Prof. Johnson: Don't forget to submit your assignments by Friday!",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: 'cs202',
      name: 'CS202: Data Structures',
      unreadCount: 0,
      lastMessage: 'Sarah: Has anyone started on the binary tree implementation?',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 'cs305',
      name: 'CS305: Database Systems',
      unreadCount: 5,
      lastMessage: "Alex: I'm having trouble with the normalization exercise",
      lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
  ]

  // Initialize chat messages for different conversations
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({
    cs301: [
      {
        id: 'c1',
        sender: {
          id: 'prof1',
          name: 'Prof. Johnson',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
          role: 'teacher',
        },
        content: "Good morning everyone! Today we'll be discussing dynamic programming approaches to optimization problems.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'c2',
        sender: {
          id: 'alex',
          name: 'Alex Chen',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
          role: 'student',
        },
        content: 'Professor, could you clarify the difference between memoization and tabulation approaches?',
        timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'c3',
        sender: {
          id: 'prof1',
          name: 'Prof. Johnson',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
          role: 'teacher',
        },
        content:
          'Great question, Alex! Memoization is a top-down approach where we store the results of subproblems in a table (usually a map or array) and access them when needed. Tabulation is a bottom-up approach where we build our table starting from the smallest subproblems and work our way up to the original problem.',
        timestamp: new Date(Date.now() - 1.7 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'c4',
        sender: {
          id: 'sarah',
          name: 'Sarah Williams',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
          role: 'student',
        },
        content: 'I found this article that explains it really well: https://example.com/dynamic-programming',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'c6',
        sender: {
          id: 'prof1',
          name: 'Prof. Johnson',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
          role: 'teacher',
        },
        content: "Don't forget to submit your assignments by Friday!",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isRead: false,
      },
    ],
    cs202: [
      {
        id: 'd1',
        sender: {
          id: 'sarah',
          name: 'Sarah Williams',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
          role: 'student',
        },
        content: 'Has anyone started on the binary tree implementation?',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isRead: true,
      },
      {
        id: 'd2',
        sender: {
          id: 'john',
          name: 'John Davis',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=6',
          role: 'student',
        },
        content: "I've started working on it. The balancing part is a bit tricky though.",
        timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000),
        isRead: true,
      },
    ],
    ai: [
      {
        id: 'ai1',
        sender: {
          id: 'assistant',
          name: 'Study Assistant',
          avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
          role: 'assistant',
        },
        content: "Hello! I'm your AI study assistant. I can help with your coursework, assignments, and uploaded notes. Just mention the course name, file, or topic you need help with.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        isRead: true,
      },
    ],
  })

  // Mock inbox messages for notifications
  const inboxMessages = [
    {
      id: 'm1',
      sender: {
        id: 'prof1',
        name: 'Prof. Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
        role: 'teacher',
      },
      subject: 'Upcoming Midterm Exam Details',
      content: 'Dear students, I wanted to provide some additional details about the upcoming midterm exam scheduled for next week...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: false,
      attachments: [
        {
          name: 'Midterm_Study_Guide.pdf',
          type: 'pdf',
          size: '1.2 MB',
        },
      ],
    },
    {
      id: 'm2',
      sender: {
        id: 'admin1',
        name: 'University Admin',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
        role: 'teacher',
      },
      subject: 'Registration for Next Semester Now Open',
      content:
        'Dear students, Registration for the Spring 2024 semester is now open. Please log in to the student portal to view available courses and register. Priority registration is available based on your academic standing. If you need advising before registration, please contact your academic advisor. Registration will close on November 15th. Thank you.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isRead: true,
    },
    {
      id: 'm3',
      sender: {
        id: 'alex',
        name: 'Alex Chen',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=4',
        role: 'student',
      },
      subject: 'Study Group for Database Final',
      content:
        "Hey Rawfin, A few of us are forming a study group for the Database Systems final exam. We're planning to meet at the library on Thursday at 6 PM. Would you like to join us? We'll be going over the practice problems and reviewing the key concepts from the semester. Let me know if you're interested! Best, Alex",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isRead: true,
    },
  ]

  // Format timestamp for message display
  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  // Handle sending new messages
  const handleSendMessage = () => {
    if (!newMessage.trim() || (!selectedChat && activeTab !== 'ai')) return
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      sender: {
        id: 'self',
        name: 'Rawfin',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
        role: 'self',
      },
      content: newMessage,
      timestamp: new Date(),
      isRead: true,
    }

    if (activeTab === 'ai') {
      setMessages((prev) => ({
        ...prev,
        ai: [...prev.ai, newMsg],
      }))
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          sender: {
            id: 'assistant',
            name: 'Study Assistant',
            avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
            role: 'assistant',
          },
          content: generateAIResponse(newMessage),
          timestamp: new Date(),
          isRead: true,
        }
        setMessages((prev) => ({
          ...prev,
          ai: [...prev.ai, aiResponse],
        }))
      }, 1500)
    } else {
      setMessages((prev) => ({
        ...prev,
        [selectedChat!]: [...(prev[selectedChat!] || []), newMsg],
      }))
    }
    setNewMessage('')
  }

  // Generate AI responses based on message content
  const generateAIResponse = (message: string) => {
    const lowerMsg = message.toLowerCase()

    if (lowerMsg.includes('algorithm') || lowerMsg.includes('cs301')) {
      return 'For Advanced Algorithms (CS301), I recommend focusing on dynamic programming, graph algorithms, and complexity analysis. The midterm exam will cover these topics extensively. Would you like me to explain any specific algorithm concept?'
    } else if (lowerMsg.includes('data structure') || lowerMsg.includes('cs202')) {
      return 'For Data Structures (CS202), make sure you understand binary trees, heaps, and hash tables thoroughly. The upcoming assignment requires implementing a balanced binary search tree. Would you like some resources on AVL trees or Red-Black trees?'
    } else if (lowerMsg.includes('database') || lowerMsg.includes('cs305')) {
      return 'For Database Systems (CS305), focus on normalization, SQL queries, and transaction management. Your project on library management system should include at least 5 entities with proper relationships. Would you like help with the ER diagram or normalization process?'
    } else if (lowerMsg.includes('help') || lowerMsg.includes('assignment')) {
      return "I'd be happy to help with your assignment! Please specify which course it's for and what specific concept you're struggling with. I can provide explanations, resources, or step-by-step guidance."
    } else {
      return "I'm here to help with your coursework and assignments. Could you please specify which course or topic you need assistance with? For example, you can ask about Advanced Algorithms (CS301), Data Structures (CS202), or Database Systems (CS305)."
    }
  }

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, selectedChat, activeTab, isTyping])

  // Handle chat button click with animation
  const handleClick = () => {
    setIsSpinning(true)
    setIsOpen(true)
    setTimeout(() => setIsSpinning(false), 500)
  }

  return (
    <>
      {/* Floating action buttons container */}
      <div className="fixed bottom-8 left-0 right-0 z-50 flex w-full justify-center float-buttons:left-auto float-buttons:right-8 float-buttons:w-auto float-buttons:justify-end">
        {/* Mobile layout: Horizontal button group */}
        <div className="flex w-fit flex-row items-center justify-center gap-4 rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-md float-buttons:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="relative h-12 w-12"
          >
            <ThemeSwitcher />
          </motion.div>

          {/* Resources button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="relative h-12 w-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden rounded-full">
              <Tooltip content="Open resources">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  className="relative h-12 w-12 rounded-full"
                  onPress={() => {
                    const resourcesButton = document.querySelector('[data-resources-button]')
                    if (resourcesButton instanceof HTMLElement) {
                      resourcesButton.click()
                    }
                  }}
                  aria-label="Open resources"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      scale: 1,
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      scale: 1.1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                    className="flex h-full w-full items-center justify-center rounded-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Icon icon="lucide:folder" width={24} height={24} className="text-danger" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Tooltip>
            </motion.div>
          </motion.div>

          {/* Chat button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative h-12 w-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden rounded-full">
              <Tooltip content="Open conversations">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  className="relative h-12 w-12 rounded-full"
                  onPress={handleClick}
                  aria-label="Open conversations"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      scale: 1,
                      rotate: isSpinning ? 360 : 0,
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      scale: 1.1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className="flex h-full w-full items-center justify-center rounded-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Icon icon="lucide:message-circle" width={24} height={24} className="text-success" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Tooltip>
            </motion.div>
          </motion.div>
        </div>

        {/* Desktop layout: Vertical button group */}
        <div className="hidden flex-col items-end gap-4 float-buttons:flex">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="relative h-12 w-12"
          >
            <ThemeSwitcher />
          </motion.div>

          {/* Resources button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="relative h-12 w-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden rounded-full">
              <Tooltip content="Open resources">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  className="relative h-12 w-12 rounded-full"
                  onPress={() => {
                    const resourcesButton = document.querySelector('[data-resources-button]')
                    if (resourcesButton instanceof HTMLElement) {
                      resourcesButton.click()
                    }
                  }}
                  aria-label="Open resources"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      scale: 1,
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      scale: 1.1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.2 },
                      scale: { duration: 0.2 },
                    }}
                    className="flex h-full w-full items-center justify-center rounded-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Icon icon="lucide:folder" width={24} height={24} className="text-danger" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Tooltip>
            </motion.div>
          </motion.div>

          {/* Chat button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="relative h-12 w-12"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative overflow-hidden rounded-full">
              <Tooltip content="Open conversations">
                <Button
                  isIconOnly
                  variant="light"
                  size="lg"
                  className="relative h-12 w-12 rounded-full"
                  onPress={handleClick}
                  aria-label="Open conversations"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      scale: 1,
                      rotate: isSpinning ? 360 : 0,
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      scale: 1.1,
                    }}
                    transition={{
                      backgroundColor: { duration: 0.2 },
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                    }}
                    className="flex h-full w-full items-center justify-center rounded-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <Icon icon="lucide:message-circle" width={24} height={24} className="text-success" />
                    </motion.div>
                  </motion.div>
                </Button>
              </Tooltip>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Chat modal for conversations */}
      <Modal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        size="4xl"
        hideCloseButton={true}
        classNames={{
          base: 'h-[90vh] overflow-hidden md:my-16 [&:not(.md)]:my-0',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="h-full p-0">
                <Conversations onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
