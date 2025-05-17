import React from 'react'
import { Card, Tabs, Tab, Avatar, Input, Button, Divider, Chip, ModalHeader, ModalBody } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'
import './modal-fix.css'

interface Message {
  id: string
  sender: {
    id: string
    name: string
    avatar: string
    role: 'student' | 'teacher' | 'assistant'
  }
  subject?: string
  content: string
  timestamp: Date
  isRead: boolean
  attachments?: {
    name: string
    type: string
    size: string
  }[]
  isPinned?: boolean
}

interface ChatGroup {
  id: string
  name: string
  unreadCount: number
  lastMessage: string
  lastMessageTime: Date
}

export const Conversations: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [selected, setSelected] = React.useState<'inbox' | 'discussion' | 'ai'>('inbox')
  const [selectedInboxMessage, setSelectedInboxMessage] = React.useState<string | null>(null)
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null)
  const [newMessage, setNewMessage] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)

  // Mock data for inbox
  const messages: Message[] = [
    {
      id: 'm1',
      sender: {
        id: 'prof1',
        name: 'Prof. Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
        role: 'teacher',
      },
      subject: 'Upcoming Midterm Exam Details',
      content:
        'Dear students, I wanted to provide some additional details about the upcoming midterm exam scheduled for next week. The exam will cover chapters 1-5 from the textbook, with a focus on tree and graph algorithms. Please make sure to review the practice problems we discussed in class. If you have any questions, feel free to reach out during office hours or via email. Best regards, Prof. Johnson',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
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
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
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
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: true,
    },
    {
      id: 'm4',
      sender: {
        id: 'ta1',
        name: 'Sarah (TA)',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=5',
        role: 'teacher',
      },
      subject: 'Feedback on Your Assignment',
      content:
        "Hi Rawfin, I've reviewed your recent assignment submission for the Data Structures course. Overall, your implementation was well-structured and efficient. I particularly liked your approach to the balancing algorithm. There are a few minor optimizations you could make to improve the time complexity further. I've attached detailed feedback with suggestions. Let me know if you have any questions! Best, Sarah",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: false,
      attachments: [
        {
          name: 'Assignment_Feedback.docx',
          type: 'docx',
          size: '245 KB',
        },
      ],
    },
  ]

  // Mock data for chat groups
  const chatGroups: ChatGroup[] = [
    {
      id: 'cs301',
      name: 'CS301: Advanced Algorithms',
      unreadCount: 3,
      lastMessage: "Prof. Johnson: Don't forget to submit your assignments by Friday!",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    {
      id: 'cs202',
      name: 'CS202: Data Structures',
      unreadCount: 0,
      lastMessage: 'Sarah: Has anyone started on the binary tree implementation?',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 'cs305',
      name: 'CS305: Database Systems',
      unreadCount: 5,
      lastMessage: "Alex: I'm having trouble with the normalization exercise",
      lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    },
  ]

  // Mock chat messages for CS301
  const cs301Messages: Message[] = [
    {
      id: 'c1',
      sender: {
        id: 'prof1',
        name: 'Prof. Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
        role: 'teacher',
      },
      content: "Good morning everyone! Today we'll be discussing dynamic programming approaches to optimization problems.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      isPinned: true,
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
      timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
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
      timestamp: new Date(Date.now() - 1.7 * 60 * 60 * 1000), // 1.7 hours ago
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
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      isRead: true,
    },
    {
      id: 'c5',
      sender: {
        id: 'assistant',
        name: 'Study Assistant',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
        role: 'assistant',
      },
      content:
        "Here's a summary of today's key concepts:\n\n1. Dynamic Programming fundamentals\n2. Memoization vs Tabulation\n3. Optimal Substructure property\n4. Overlapping Subproblems\n\nWould anyone like me to provide practice problems on these topics?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
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
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
    },
  ]

  // Format time function
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

  React.useEffect(() => {
    return () => {}
  }, [])

  // Select first message by default when in inbox tab
  React.useEffect(() => {
    if (selected === 'inbox' && messages.length > 0 && !selectedInboxMessage) {
      setSelectedInboxMessage(messages[0].id)
    }
  }, [selected, messages, selectedInboxMessage])

  // Select first chat by default when in discussion tab
  React.useEffect(() => {
    if (selected === 'discussion' && chatGroups.length > 0 && !selectedChat) {
      setSelectedChat(chatGroups[0].id)
    }
  }, [selected, chatGroups, selectedChat])

  const selectedMessageData = React.useMemo(() => {
    return messages.find((m) => m.id === selectedInboxMessage) || null
  }, [selectedInboxMessage])

  const memoizedCS301Messages = React.useMemo(() => cs301Messages, [])

  const timersRef = React.useRef<{
    timer1?: number
    timer2?: number
  }>({})

  // Simulate typing indicator with proper cleanup
  React.useEffect(() => {
    if (timersRef.current.timer1) clearTimeout(timersRef.current.timer1)
    if (timersRef.current.timer2) clearTimeout(timersRef.current.timer2)

    if (selected === 'discussion' && selectedChat) {
      timersRef.current.timer1 = setTimeout(() => {
        setIsTyping(true)

        timersRef.current.timer2 = setTimeout(() => {
          setIsTyping(false)
        }, 3000)
      }, 5000)
    }

    return () => {
      if (timersRef.current.timer1) clearTimeout(timersRef.current.timer1)
      if (timersRef.current.timer2) clearTimeout(timersRef.current.timer2)
    }
  }, [selected, selectedChat])
  return (
    <div className="no-trap-focus">
      <ModalHeader className="modal-header-fix sticky top-0 z-10 flex flex-row items-center justify-between gap-2 rounded-t-lg border-b border-divider bg-default-50/80">
        <div className="flex flex-row items-center gap-2">
          <Tabs
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as 'inbox' | 'discussion' | 'ai')}
            variant="light"
            color="primary"
            classNames={{ tabList: 'gap-4' }}
            disableAnimation={true}
          >
            <Tab
              key="inbox"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:inbox" />
                  <span>Smart Inbox</span>
                </div>
              }
            />
            <Tab
              key="discussion"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:message-circle" />
                  <span>Class Discussion</span>
                </div>
              }
            />
            <Tab
              key="ai"
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:sparkles" />
                  <span>AI Chat</span>
                </div>
              }
            />
          </Tabs>
        </div>
        <button
          type="button"
          onClick={onClose || (() => {})}
          className="ml-auto rounded-full p-2 text-danger transition-colors hover:bg-danger-100"
          aria-label="Close conversations"
        >
          <Icon icon="lucide:x" style={{ fontSize: 22 }} className="text-danger" />
        </button>
      </ModalHeader>
      <ModalBody className="modal-scroll-fix h-[660px] min-h-0 flex-1 overflow-x-hidden p-0">
        <AnimatePresence mode="wait" initial={false}>
          {selected === 'inbox' && (
            <motion.div
              key="inbox"
              className="optimized-animation flex h-screen flex-col md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Message list */}
              <div className="w-full overflow-y-auto border-r border-divider md:w-2/5">
                <div className="p-3 pb-0">
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.1 }}>
                    <Input
                      placeholder="Search messages..."
                      startContent={<Icon icon="lucide:search" className="text-default-400" style={{ fontSize: 18 }} />}
                      size="sm"
                      className="mb-2"
                    />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  {messages.map((message, idx) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: idx * 0.05,
                        ease: 'easeOut',
                      }}
                      whileHover={{
                        backgroundColor: 'var(--heroui-content1)',
                        transition: { duration: 0.2 },
                      }}
                      className={`cursor-pointer rounded-md p-3 ${
                        selectedInboxMessage === message.id ? 'border-l-4 border-primary-500 bg-content1' : ''
                      }`}
                      onClick={() => setSelectedInboxMessage(message.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar src={message.sender.avatar} size="sm" />
                        <div className="min-w-0 flex-grow">
                          <div className="mb-1 flex items-center justify-between">
                            <h4
                              className={`truncate font-medium ${
                                selectedInboxMessage === message.id ? 'text-primary-500' : !message.isRead ? 'text-foreground' : 'text-default-600'
                              }`}
                            >
                              {message.sender.name}
                            </h4>
                            <span className="whitespace-nowrap text-xs text-default-400">{formatTime(message.timestamp)}</span>
                          </div>

                          <p
                            className={`truncate text-sm ${
                              selectedInboxMessage === message.id ? 'text-primary-500' : !message.isRead ? 'font-medium' : 'text-default-500'
                            }`}
                          >
                            {message.subject}
                          </p>

                          <p className="truncate text-xs text-default-400">{message.content.substring(0, 60)}...</p>

                          {message.attachments && message.attachments.length > 0 && (
                            <div className="mt-1 flex items-center gap-1">
                              <Icon icon="lucide:paperclip" className="text-default-400" style={{ fontSize: 12 }} />
                              <span className="text-xs text-default-400">
                                {message.attachments.length} attachment
                                {message.attachments.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Message content */}
              <div className="flex h-[full] w-full flex-col md:w-3/5">
                {selectedMessageData ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedMessageData.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex h-full flex-col"
                    >
                      {(() => {
                        const message = selectedMessageData
                        if (!message) return null

                        return (
                          <>
                            <motion.div
                              className="border-b border-divider p-4"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 }}
                            >
                              <div className="mb-3 flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <Avatar src={message.sender.avatar} size="md" />
                                  <div>
                                    <h3 className="font-medium">{message.sender.name}</h3>
                                    <p className="text-xs text-default-400">
                                      {formatTime(message.timestamp)} ({message.sender.role})
                                    </p>
                                  </div>
                                </div>

                                <div className="flex gap-1">
                                  <Button isIconOnly size="sm" variant="light" aria-label="Reply">
                                    <Icon icon="lucide:reply" style={{ fontSize: 18 }} />
                                  </Button>
                                  <Button isIconOnly size="sm" variant="light" aria-label="Forward">
                                    <Icon icon="lucide:forward" style={{ fontSize: 18 }} />
                                  </Button>
                                  <Button isIconOnly size="sm" variant="light" aria-label="More options">
                                    <Icon icon="lucide:more-vertical" style={{ fontSize: 18 }} />
                                  </Button>
                                </div>
                              </div>

                              <h2 className="text-lg font-medium">{message.subject}</h2>
                            </motion.div>

                            <motion.div
                              className="flex-grow overflow-y-auto p-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            >
                              <div className="prose prose-sm max-w-none">
                                {message.content.split('\n').map((paragraph, i) => (
                                  <p key={i} className="mb-4 text-default-700">
                                    {paragraph}
                                  </p>
                                ))}
                              </div>

                              {message.attachments && message.attachments.length > 0 && (
                                <div className="mt-6">
                                  <h4 className="mb-2 text-sm font-medium">Attachments</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {message.attachments.map((attachment, i) => (
                                      <div
                                        key={i}
                                        className="flex cursor-pointer items-center gap-2 rounded-md border border-divider p-2 transition-colors hover:bg-default-100"
                                      >
                                        <Icon
                                          icon={
                                            attachment.type === 'pdf'
                                              ? 'lucide:file-text'
                                              : attachment.type === 'docx'
                                                ? 'lucide:file-text'
                                                : attachment.type === 'pptx'
                                                  ? 'lucide:file-presentation'
                                                  : 'lucide:file'
                                          }
                                          className={
                                            attachment.type === 'pdf'
                                              ? 'text-danger'
                                              : attachment.type === 'docx'
                                                ? 'text-primary'
                                                : attachment.type === 'pptx'
                                                  ? 'text-warning'
                                                  : 'text-default-500'
                                          }
                                        />
                                        <div>
                                          <p className="text-sm font-medium">{attachment.name}</p>
                                          <p className="text-xs text-default-400">{attachment.size}</p>
                                        </div>
                                        <Button isIconOnly size="sm" variant="light" className="ml-2" aria-label="Download attachment">
                                          <Icon icon="lucide:download" style={{ fontSize: 16 }} />
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </motion.div>

                            <motion.div
                              className="border-t border-divider p-4"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.3 }}
                            >
                              <div className="flex gap-2">
                                <Button color="primary" startContent={<Icon icon="lucide:reply" />}>
                                  Reply
                                </Button>
                                <Button variant="flat" startContent={<Icon icon="lucide:forward" />}>
                                  Forward
                                </Button>
                              </div>
                            </motion.div>
                          </>
                        )
                      })()}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <motion.div
                    className="flex h-full flex-col items-center justify-center p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon icon="lucide:mail" className="mb-4 h-16 w-16 text-default-300" />
                    <h3 className="mb-2 text-xl font-medium">Select a message</h3>
                    <p className="max-w-md text-default-500">Choose a message from the list to view its contents</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
          {selected === 'discussion' && (
            <motion.div
              key="discussion"
              className="flex h-[600px] min-h-0 flex-1 flex-col md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Chat groups list */}
              <div className="w-full overflow-y-auto border-r border-divider md:w-1/4">
                <div className="p-3">
                  <Input
                    placeholder="Search chats..."
                    startContent={<Icon icon="lucide:search" className="text-default-400" style={{ fontSize: 18 }} />}
                    size="sm"
                    className="mb-2"
                  />
                </div>

                <div className="px-3 py-2">
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-default-500">Your Courses</h4>
                </div>

                <div className="space-y-1 px-2">
                  {chatGroups.map((group, idx) => (
                    <motion.div
                      key={group.id}
                      whileHover={{ backgroundColor: 'var(--heroui-content1)' }}
                      className={`cursor-pointer rounded-md p-2 ${selectedChat === group.id ? 'border-l-4 border-primary-500 bg-content1' : ''}`}
                      onClick={() => setSelectedChat(group.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${selectedChat === group.id ? 'text-primary-500' : ''}`}>{group.name}</h4>
                        {group.unreadCount > 0 && (
                          <Chip size="sm" color="primary" variant="flat">
                            {group.unreadCount}
                          </Chip>
                        )}
                      </div>

                      <p className={`mt-1 truncate text-xs ${selectedChat === group.id ? 'text-primary-500' : 'text-default-500'}`}>
                        {group.lastMessage}
                      </p>

                      <p className="mt-1 text-xs text-default-400">{formatTime(group.lastMessageTime)}</p>
                    </motion.div>
                  ))}
                </div>

                <Divider className="my-3" />

                <div className="px-3 py-2">
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wider text-default-500">Direct Messages</h4>
                </div>

                <div className="space-y-1 px-2">
                  <div className="cursor-pointer rounded-md p-2 hover:bg-content1">
                    <div className="flex items-center gap-2">
                      <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" size="sm" />
                      <div>
                        <h4 className="text-sm font-medium">Prof. Johnson</h4>
                        <p className="text-xs text-default-400">Online</p>
                      </div>
                    </div>
                  </div>

                  <div className="cursor-pointer rounded-md p-2 hover:bg-content1">
                    <div className="flex items-center gap-2">
                      <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4" size="sm" />
                      <div>
                        <h4 className="text-sm font-medium">Alex Chen</h4>
                        <p className="text-xs text-default-400">Last seen 2h ago</p>
                      </div>
                    </div>
                  </div>

                  <div className="cursor-pointer rounded-md p-2 hover:bg-content1">
                    <div className="flex items-center gap-2">
                      <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=5" size="sm" />
                      <div>
                        <h4 className="text-sm font-medium">Sarah Williams</h4>
                        <p className="text-xs text-default-400">Last seen 5m ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat content */}
              <div className="flex h-full w-full flex-col md:w-3/4">
                {selectedChat ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedChat}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-full flex-col"
                    >
                      <div className="border-b border-divider p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{chatGroups.find((g) => g.id === selectedChat)?.name}</h3>
                            <Chip size="sm" variant="flat" color="primary">
                              28 members
                            </Chip>
                          </div>

                          <div className="flex gap-1">
                            <Button isIconOnly size="sm" variant="light" aria-label="Search in conversation">
                              <Icon icon="lucide:search" style={{ fontSize: 18 }} />
                            </Button>
                            <Button isIconOnly size="sm" variant="light" aria-label="More options">
                              <Icon icon="lucide:more-vertical" style={{ fontSize: 18 }} />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex-grow overflow-y-auto p-4">
                        {/* Pinned messages */}
                        <div className="mb-4">
                          {cs301Messages
                            .filter((m) => m.isPinned)
                            .map((message) => (
                              <div key={message.id} className="mb-2 rounded-lg border-l-4 border-primary bg-default-50 p-3">
                                <div className="flex items-start justify-between">
                                  <div className="mb-1 flex items-center gap-2">
                                    <Icon icon="lucide:pin" className="text-primary" style={{ fontSize: 14 }} />
                                    <span className="text-xs font-medium text-primary">Pinned by instructor</span>
                                  </div>
                                  <span className="text-xs text-default-400">{formatTime(message.timestamp)}</span>
                                </div>

                                <div className="mt-1 flex items-start gap-2">
                                  <Avatar src={message.sender.avatar} size="sm" />
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-sm font-medium">{message.sender.name}</span>
                                      {message.sender.role === 'teacher' && (
                                        <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                          Instructor
                                        </Chip>
                                      )}
                                    </div>
                                    <p className="mt-1 text-sm">{message.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>

                        {/* Regular messages */}
                        <div className="space-y-4">
                          {cs301Messages
                            .filter((m) => !m.isPinned)
                            .map((message, index) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: index * 0.05,
                                  ease: 'easeOut',
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <Avatar src={message.sender.avatar} size="sm" />
                                  <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-1">
                                        <span className="font-medium">{message.sender.name}</span>
                                        {message.sender.role === 'teacher' && (
                                          <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                            Instructor
                                          </Chip>
                                        )}
                                        {message.sender.role === 'assistant' && (
                                          <Chip size="sm" variant="flat" color="secondary" className="h-4 px-1">
                                            AI Assistant
                                          </Chip>
                                        )}
                                      </div>
                                      <span className="text-xs text-default-400">{formatTime(message.timestamp)}</span>
                                    </div>

                                    <div className="mt-1">
                                      {message.content.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className="mb-2 text-sm">
                                          {paragraph}
                                        </p>
                                      ))}
                                    </div>

                                    <div className="mt-1 flex gap-2">
                                      <Button
                                        size="sm"
                                        variant="light"
                                        className="h-6 min-w-0 px-1"
                                        startContent={<Icon icon="lucide:thumbs-up" style={{ fontSize: 14 }} />}
                                      >
                                        <span className="text-xs">2</span>
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="light"
                                        className="h-6 min-w-0 px-1"
                                        startContent={<Icon icon="lucide:reply" style={{ fontSize: 14 }} />}
                                      >
                                        <span className="text-xs">Reply</span>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                        </div>

                        {/* Typing indicator */}
                        {isTyping && (
                          <div className="mt-4 flex items-start gap-3">
                            <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4" size="sm" />
                            <div className="rounded-lg bg-default-100 px-3 py-2">
                              <div className="flex gap-1">
                                <motion.div
                                  className="h-2 w-2 rounded-full bg-default-400"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0,
                                  }}
                                />
                                <motion.div
                                  className="h-2 w-2 rounded-full bg-default-400"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0.2,
                                  }}
                                />
                                <motion.div
                                  className="h-2 w-2 rounded-full bg-default-400"
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: 0.4,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-divider p-3">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type a message..."
                            fullWidth
                            endContent={
                              <div className="flex gap-1">
                                <Button isIconOnly size="sm" variant="light" aria-label="Attach file">
                                  <Icon icon="lucide:paperclip" style={{ fontSize: 18 }} />
                                </Button>
                                <Button isIconOnly size="sm" variant="light" aria-label="Add emoji">
                                  <Icon icon="lucide:smile" style={{ fontSize: 18 }} />
                                </Button>
                              </div>
                            }
                          />
                          <Button color="primary" isIconOnly aria-label="Send message">
                            <Icon icon="lucide:send" />
                          </Button>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <Icon icon="lucide:sparkles" className="text-primary" style={{ fontSize: 16 }} />
                          <span className="text-xs text-default-500">AI Assistant is available to help with questions about this course</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <Icon icon="lucide:message-circle" className="mb-4 h-16 w-16 text-default-300" />
                    <h3 className="mb-2 text-xl font-medium">Select a conversation</h3>
                    <p className="max-w-md text-default-500">Choose a course or direct message to start chatting</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
          {selected === 'ai' && (
            <motion.div
              key="ai"
              className="flex h-[600px] min-h-0 flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex h-full min-h-0 flex-1 flex-col">
                <div className="min-h-0 flex-1 overflow-y-auto bg-default-50 p-6">
                  {/* Dummy conversation thread */}
                  <div className="mx-auto max-w-2xl space-y-6">
                    {/* User message 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-lg bg-primary-100 p-4 text-primary-800">
                        <div className="mb-1 text-sm font-medium">You</div>
                        <div>
                          Can you summarize the key points from <span className="font-semibold text-primary">@algo_lecture4.pdf</span>?
                        </div>
                        <div className="mt-2 text-right text-xs text-default-400">Today, 10:02 AM</div>
                      </div>
                    </motion.div>

                    {/* AI message 1 */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-lg bg-default-100 p-4">
                        <div className="mb-1 text-sm font-medium">AI Assistant</div>
                        <div>
                          Sure! Here are the key points from <span className="font-semibold text-primary">@algo_lecture4.pdf</span>:
                          <ul className="ml-5 mt-2 list-disc">
                            <li>Dynamic programming principles and optimal substructure</li>
                            <li>Memoization vs. tabulation</li>
                            <li>Example: Longest Increasing Subsequence</li>
                            <li>Practice problems at the end of the lecture</li>
                          </ul>
                          Let me know if you want a detailed explanation of any section!
                        </div>
                        <div className="mt-2 text-xs text-default-400">Today, 10:02 AM</div>
                      </div>
                    </motion.div>

                    {/* User message 2 */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
                      className="flex justify-end"
                    >
                      <div className="max-w-[80%] rounded-lg bg-primary-100 p-4 text-primary-800">
                        <div className="mb-1 text-sm font-medium">You</div>
                        <div>
                          Can you generate some practice questions based on <span className="font-semibold text-primary">@algo_lecture4.pdf</span>?
                        </div>
                        <div className="mt-2 text-right text-xs text-default-400">Today, 10:03 AM</div>
                      </div>
                    </motion.div>

                    {/* AI message 2 */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.3 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-lg bg-default-100 p-4">
                        <div className="mb-1 text-sm font-medium">AI Assistant</div>
                        <div>
                          Absolutely! Here are some practice questions:
                          <ol className="ml-5 mt-2 list-decimal">
                            <li>Explain the difference between memoization and tabulation with examples.</li>
                            <li>Given an array, how would you find the Longest Increasing Subsequence using dynamic programming?</li>
                            <li>What are the advantages of using dynamic programming over greedy algorithms?</li>
                          </ol>
                          Would you like solutions or hints for any of these?
                        </div>
                        <div className="mt-2 text-xs text-default-400">Today, 10:03 AM</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Input area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 }}
                  className="color-inherit flex gap-2 border-t border-divider p-4"
                >
                  <Input fullWidth placeholder="Message AI Assistant..." startContent={<Icon icon="lucide:sparkles" className="text-primary" />} />
                  <Button color="primary" isIconOnly aria-label="Send message">
                    <Icon icon="lucide:send" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </ModalBody>
    </div>
  )
}
