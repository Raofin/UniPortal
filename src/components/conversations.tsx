import React from 'react'
import { Card, Tabs, Tab, Avatar, Input, Button, Divider, Chip, ModalHeader, ModalBody, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence, animate } from 'framer-motion'
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
  reactions?: { emoji: string; count: number; users: string[] }[]
}

interface ChatGroup {
  id: string
  name: string
  unreadCount: number
  lastMessage: string
  lastMessageTime: Date
  members?: { id: string; name: string }[]
}

export const Conversations: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  // Mock data declarations first
  const inboxMessages: Message[] = [
    {
      id: 'ai-summary',
      sender: {
        id: 'ai-assistant',
        name: 'AI Assistant',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
        role: 'assistant',
      },
      subject: 'Smart Inbox Summary',
      content: `<div class="space-y-4">
<div>
<span class="text-warning font-medium">🔴 Priority Items:</span>
<ul class="mt-2 space-y-1">
  <li><span class="text-warning-600">• Midterm exam details</span> from <span class="text-primary">Prof. Johnson</span> <span class="text-default-400">(2h ago)</span> - Review chapters 1-5, focus on tree/graph algorithms</li>
  <li><span class="text-warning-600">• Spring 2024 registration</span> deadline: <span class="text-danger font-medium">November 15th</span></li>
</ul>
</div>

<div>
<span class="text-success font-medium">✅ Action Required:</span>
<ul class="mt-2 space-y-1">
  <li><span class="text-success-600">• Review assignment feedback</span> from <span class="text-primary">Sarah (TA)</span> - Includes optimization suggestions</li>
  <li><span class="text-success-600">• Consider joining</span> <span class="text-primary">Alex's study group</span> for Database Systems final <span class="text-default-400">(Thursday, 6 PM)</span></li>
</ul>
</div>

<div>
<span class="text-primary font-medium">📱 Quick Updates:</span>
<ul class="mt-2 space-y-1">
  <li><span class="text-primary-600">• 3 unread messages</span> in <span class="font-medium">CS301: Advanced Algorithms</span></li>
  <li><span class="text-primary-600">• 5 unread messages</span> in <span class="font-medium">CS305: Database Systems</span></li>
</ul>
</div>
</div>`,
      timestamp: new Date(),
      isRead: false,
      isPinned: true,
    },
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

  const chatMessages: Message[] = [
    {
      id: 'c1',
      sender: {
        id: 'prof1',
        name: 'Prof. Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
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
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
        role: 'teacher',
      },
      content:
        'Great question, Alex! Memoization is a top-down approach where we store the results of subproblems in a table (usually a map or array) and access them when needed. Tabulation is a bottom-up approach where we build our table starting from the smallest subproblems and work our way up to the original problem.',
      timestamp: new Date(Date.now() - 1.7 * 60 * 60 * 1000), // 1.7 hours ago
      isRead: true,
      reactions: [
        { emoji: '👍', count: 3, users: ['alex', 'sarah', 'current'] },
        { emoji: '👏', count: 2, users: ['alex', 'sarah'] },
      ],
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
      reactions: [
        { emoji: '❤️', count: 1, users: ['current'] },
        { emoji: '👍', count: 2, users: ['alex', 'prof1'] },
      ],
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
      reactions: [
        { emoji: '👍', count: 4, users: ['prof1', 'alex', 'sarah', 'current'] },
        { emoji: '😮', count: 1, users: ['alex'] },
      ],
    },
    {
      id: 'c6',
      sender: {
        id: 'prof1',
        name: 'Prof. Johnson',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
        role: 'teacher',
      },
      content: "Don't forget to submit your assignments by Friday!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
    },
    {
      id: 'c7',
      sender: {
        id: 'current',
        name: 'You',
        avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
        role: 'student',
      },
      content: "I've been working on the dynamic programming assignment and I'm stuck on the memoization part. Can anyone help?",
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isRead: true,
      reactions: [{ emoji: '❤️', count: 2, users: ['alex', 'sarah'] }],
    },
  ]

  // State declarations
  const [selected, setSelected] = React.useState<'inbox' | 'discussion' | 'ai'>('inbox')
  const [selectedInboxMessage, setSelectedInboxMessage] = React.useState<string | null>(null)
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null)
  const [newMessage, setNewMessage] = React.useState('')
  const [activeReactionMenu, setActiveReactionMenu] = React.useState<string | null>(null)
  const [chatState, setChatState] = React.useState(chatMessages)
  const chatContainerRef = React.useRef<HTMLDivElement>(null)
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth < 768)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  // Add this effect to handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
    if (selected === 'inbox' && inboxMessages.length > 0 && !selectedInboxMessage) {
      setSelectedInboxMessage(inboxMessages[0].id)
    }
  }, [selected, inboxMessages, selectedInboxMessage])

  // Select first chat by default when in discussion tab
  React.useEffect(() => {
    if (selected === 'discussion' && chatGroups.length > 0 && !selectedChat) {
      setSelectedChat(chatGroups[0].id)
    }
  }, [selected, chatGroups, selectedChat])

  const selectedMessageData = React.useMemo(() => {
    return inboxMessages.find((m) => m.id === selectedInboxMessage) || null
  }, [selectedInboxMessage])

  const memoizedChatMessages = React.useMemo(() => chatMessages, [])

  // Add click outside handler to close reaction menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeReactionMenu && !(event.target as Element).closest('.reaction-menu-container')) {
        setActiveReactionMenu(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [activeReactionMenu])

  const handleReaction = (messageId: string, emoji: string) => {
    setChatState((prevMessages) => {
      return prevMessages.map((message) => {
        if (message.id !== messageId) return message

        const currentReactions = message.reactions || []
        const existingReaction = currentReactions.find((r) => r.emoji === emoji)

        if (existingReaction) {
          // If user already reacted, remove their reaction
          if (existingReaction.users.includes('current')) {
            const updatedUsers = existingReaction.users.filter((u) => u !== 'current')
            if (updatedUsers.length === 0) {
              // Remove reaction if no users left
              return {
                ...message,
                reactions: currentReactions.filter((r) => r.emoji !== emoji),
              }
            }
            return {
              ...message,
              reactions: currentReactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count - 1, users: updatedUsers } : r)),
            }
          } else {
            // Add user's reaction
            return {
              ...message,
              reactions: currentReactions.map((r) => (r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, 'current'] } : r)),
            }
          }
        } else {
          // Add new reaction
          return {
            ...message,
            reactions: [...currentReactions, { emoji, count: 1, users: ['current'] }],
          }
        }
      })
    })
    setActiveReactionMenu(null)
  }

  return (
    <div className="no-trap-focus h-full">
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
                  <Tooltip content="Smart Inbox" placement="bottom" className="md:hidden">
                    <div>
                      <Icon icon="lucide:inbox" />
                    </div>
                  </Tooltip>
                  <span className="hidden md:inline">Smart Inbox</span>
                </div>
              }
            />
            <Tab
              key="discussion"
              title={
                <div className="flex items-center gap-2">
                  <Tooltip content="Class Discussion" placement="bottom" className="md:hidden">
                    <div>
                      <Icon icon="lucide:message-circle" />
                    </div>
                  </Tooltip>
                  <span className="hidden md:inline">Class Discussion</span>
                </div>
              }
            />
            <Tab
              key="ai"
              title={
                <div className="flex items-center gap-2">
                  <Tooltip content="AI Chat" placement="bottom" className="md:hidden">
                    <div>
                      <Icon icon="lucide:sparkles" />
                    </div>
                  </Tooltip>
                  <span className="hidden md:inline">AI Chat</span>
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
      <ModalBody className="modal-scroll-fix h-[calc(100%-57px)] min-h-0 flex-1 overflow-hidden p-0">
        <AnimatePresence mode="wait" initial={false}>
          {selected === 'inbox' && (
            <motion.div
              key="inbox"
              className="optimized-animation flex h-full flex-col md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Message list */}
              <div
                className={`fixed inset-y-0 left-0 z-20 w-full transform bg-default-50 transition-transform duration-200 ease-in-out md:relative md:z-0 md:w-2/5 md:translate-x-0 ${
                  isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
              >
                <div className="flex h-full flex-col border-r border-divider">
                  <div className="flex items-center justify-between border-b border-divider p-3 md:hidden">
                    <h3 className="font-medium">Messages</h3>
                    <Button isIconOnly variant="light" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                      <Icon icon="lucide:x" style={{ fontSize: 20 }} />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-3 pb-0">
                      <Input
                        placeholder="Search messages..."
                        startContent={<Icon icon="lucide:search" className="text-default-400" style={{ fontSize: 18 }} />}
                        size="sm"
                        className="mb-2"
                      />
                    </div>

                    <div className="space-y-1">
                      {inboxMessages.map((message, idx) => (
                        <div
                          key={message.id}
                          className={`cursor-pointer rounded-md p-3 ${
                            selectedInboxMessage === message.id ? 'border-l-4 border-primary-500 bg-content1' : ''
                          } ${message.isPinned && !selectedInboxMessage ? 'bg-primary-50' : ''}`}
                          onClick={() => {
                            setSelectedInboxMessage(message.id)
                            setIsSidebarOpen(false)
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={message.sender.avatar}
                              size="sm"
                              className="h-8 w-8 min-w-8"
                              imgProps={{
                                className: 'object-cover',
                              }}
                            />
                            <div className="min-w-0 flex-grow">
                              <div className="mb-1 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <h4
                                    className={`truncate font-medium ${
                                      selectedInboxMessage === message.id
                                        ? 'text-primary-500'
                                        : !message.isRead
                                          ? 'text-foreground'
                                          : 'text-default-600'
                                    }`}
                                  >
                                    {message.sender.name}
                                  </h4>
                                  {message.sender.role === 'assistant' && (
                                    <Chip size="sm" variant="flat" color="secondary" className="h-4 px-1">
                                      AI
                                    </Chip>
                                  )}
                                  {message.isPinned && <Icon icon="lucide:pin" className="text-primary" style={{ fontSize: 14 }} />}
                                </div>
                                <span className="whitespace-nowrap text-xs text-default-400">{formatTime(message.timestamp)}</span>
                              </div>

                              <p
                                className={`truncate text-sm ${
                                  selectedInboxMessage === message.id ? 'text-primary-500' : !message.isRead ? 'font-medium' : 'text-default-500'
                                }`}
                              >
                                {message.subject}
                              </p>

                              {message.sender.role !== 'assistant' && (
                                <p className="truncate text-xs text-default-400">{message.content.split('\n')[0].replace(/<[^>]*>/g, '')}...</p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Message content */}
              <div className="flex h-full w-full flex-col md:w-3/5">
                <div className="flex items-center border-b border-divider p-3 md:hidden">
                  <Button isIconOnly variant="light" className="mr-2" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
                    <Icon icon="lucide:menu" style={{ fontSize: 20 }} />
                  </Button>
                  <h3 className="font-medium">Message</h3>
                </div>
                {selectedInboxMessage && (
                  <>
                    {selectedMessageData ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={selectedMessageData.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex h-full flex-col"
                        >
                          {(() => {
                            const message = selectedMessageData
                            if (!message) return null

                            return (
                              <>
                                <motion.div
                                  className={`border-b p-4 ${message.isPinned ? 'bg-primary-50' : 'border-divider'}`}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="mb-3 flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                      <Avatar
                                        src={message.sender.avatar}
                                        size="md"
                                        className="h-8 w-8 min-w-8"
                                        imgProps={{
                                          className: 'object-cover',
                                        }}
                                      />
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-medium">{message.sender.name}</h3>
                                          {message.sender.role === 'assistant' && (
                                            <Chip size="sm" variant="flat" color="secondary">
                                              AI Assistant
                                            </Chip>
                                          )}
                                          {message.isPinned && <Icon icon="lucide:pin" className="text-primary" style={{ fontSize: 14 }} />}
                                        </div>
                                        <p className="text-xs text-default-400">
                                          {formatTime(message.timestamp)} {message.sender.role !== 'assistant' && `(${message.sender.role})`}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex gap-1">
                                      {!message.isPinned && (
                                        <>
                                          <Button isIconOnly size="sm" variant="light" aria-label="Reply">
                                            <Icon icon="lucide:reply" style={{ fontSize: 18 }} />
                                          </Button>
                                          <Button isIconOnly size="sm" variant="light" aria-label="Forward">
                                            <Icon icon="lucide:forward" style={{ fontSize: 18 }} />
                                          </Button>
                                        </>
                                      )}
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
                                  <div className={`prose prose-sm max-w-none ${message.sender.role === 'assistant' ? 'text-default-700' : ''}`}>
                                    {message.sender.role === 'assistant' ? (
                                      <div dangerouslySetInnerHTML={{ __html: message.content }} />
                                    ) : (
                                      message.content.split('\n').map((paragraph, i) => (
                                        <p key={i} className="mb-4 whitespace-pre-wrap">
                                          {paragraph}
                                        </p>
                                      ))
                                    )}
                                  </div>
                                </motion.div>

                                {message.sender.role === 'assistant' && (
                                  <div className="mb-4 border-t border-divider px-4 py-3">
                                    <div className="inline-flex items-center whitespace-nowrap">
                                      <span className="ml-1 text-xs text-default-400">Auto-updates every 5 minutes</span>
                                      <button
                                        className="ml-1 inline-flex items-center justify-center rounded-full p-1 text-default-400 transition-colors hover:bg-default-100 hover:text-default-600"
                                        onClick={() => {
                                          // Add refresh logic here
                                          console.log('Refreshing AI summary...')
                                        }}
                                      >
                                        <Icon icon="lucide:refresh-cw" style={{ fontSize: 16 }} />
                                      </button>
                                    </div>
                                  </div>
                                )}

                                {!message.isPinned && message.sender.role !== 'assistant' && (
                                  <motion.div
                                    className="border-t border-divider p-4 pb-6"
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
                                )}
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
                  </>
                )}
              </div>
            </motion.div>
          )}
          {selected === 'discussion' && (
            <motion.div
              key="discussion"
              className="flex h-full flex-col md:flex-row"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {/* Chat groups list - separate for desktop and mobile */}
              {/* Desktop view */}
              <div className="hidden md:block md:w-1/4">
                <div className="flex h-full flex-col border-r border-divider">
                  <div className="flex-1 overflow-y-auto">
                    <div className="flex-none p-3">
                      <Input
                        placeholder="Search chats..."
                        startContent={<Icon icon="lucide:search" className="text-default-400" style={{ fontSize: 18 }} />}
                        size="sm"
                        className="mb-2"
                      />
                    </div>
                    <div className="space-y-1 px-2">
                      {chatGroups.map((group) => (
                        <div
                          key={group.id}
                          className={`cursor-pointer rounded-md p-2 ${selectedChat === group.id ? 'border-l-4 border-primary-500 bg-content1' : ''}`}
                          onClick={() => {
                            setSelectedChat(group.id)
                            setIsSidebarOpen(false)
                          }}
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
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile view */}
              <div className="relative flex h-full w-full flex-col md:hidden">
                {/* Chat groups list */}
                <div
                  className={`absolute inset-y-0 left-0 z-20 w-full transform bg-default-50 transition-transform duration-200 ease-in-out ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                  }`}
                >
                  <div className="flex h-full flex-col border-r border-divider">
                    <div className="flex items-center justify-between border-b border-divider p-3">
                      <h3 className="font-medium">Class Discussion</h3>
                      <Button isIconOnly variant="light" onClick={() => setIsSidebarOpen(false)} aria-label="Close sidebar">
                        <Icon icon="lucide:x" style={{ fontSize: 20 }} />
                      </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex-none p-3">
                        <Input
                          placeholder="Search chats..."
                          startContent={<Icon icon="lucide:search" className="text-default-400" style={{ fontSize: 18 }} />}
                          size="sm"
                          className="mb-2"
                        />
                      </div>
                      <div className="space-y-1 px-2">
                        {chatGroups.map((group) => (
                          <div
                            key={group.id}
                            className={`cursor-pointer rounded-md p-2 ${selectedChat === group.id ? 'border-l-4 border-primary-500 bg-content1' : ''}`}
                            onClick={() => {
                              setSelectedChat(group.id)
                              setIsSidebarOpen(false)
                            }}
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
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat content */}
                <div className="flex h-full w-full flex-col">
                  <div className="flex items-center justify-between border-b border-divider p-2">
                    <div className="flex items-center gap-2">
                      <Button isIconOnly variant="light" className="md:hidden" onClick={() => setIsSidebarOpen(true)} aria-label="Open sidebar">
                        <Icon icon="lucide:menu" style={{ fontSize: 20 }} />
                      </Button>
                      <div>
                        <h3 className="font-medium">{selectedChat && chatGroups.find((g) => g.id === selectedChat)?.name}</h3>
                        <p className="text-xs text-default-400">
                          {selectedChat && chatGroups.find((g) => g.id === selectedChat)?.members?.length} members
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button isIconOnly variant="light" aria-label="Search">
                        <Icon icon="lucide:search" style={{ fontSize: 20 }} />
                      </Button>
                      <Button isIconOnly variant="light" aria-label="More options">
                        <Icon icon="lucide:more-vertical" style={{ fontSize: 20 }} />
                      </Button>
                    </div>
                  </div>

                  {/* Chat content */}
                  <div className="flex min-h-0 flex-1 flex-col">
                    <div className="flex-1 overflow-y-auto p-2">
                      {/* Pinned messages */}
                      <div className="mb-4">
                        {chatState
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
                                <Avatar
                                  src={message.sender.avatar}
                                  size="sm"
                                  className="h-8 w-8 min-w-8"
                                  imgProps={{
                                    className: 'object-cover',
                                  }}
                                />
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
                        {chatState
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
                              className={`flex items-start gap-3 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}
                            >
                              <Avatar
                                src={message.sender.avatar}
                                size="sm"
                                className="h-8 w-8 min-w-8"
                                imgProps={{
                                  className: 'object-cover',
                                }}
                              />
                              <div className={`flex-grow ${message.sender.id === 'current' ? 'flex flex-col items-end' : ''}`}>
                                <div className={`flex items-center justify-between ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`flex items-center gap-1 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                    <span className="font-medium">{message.sender.name}</span>
                                    {message.sender.role === 'teacher' && (
                                      <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                        Instructor
                                      </Chip>
                                    )}
                                  </div>
                                  <span className="text-xs text-default-400">{formatTime(message.timestamp)}</span>
                                </div>

                                <div
                                  className={`mt-1 rounded-lg px-3 py-2 ${
                                    message.sender.id === 'current' ? 'bg-primary-100 text-primary-800' : 'bg-default-100'
                                  }`}
                                >
                                  {message.content.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="mb-2 text-sm last:mb-0">
                                      {paragraph}
                                    </p>
                                  ))}
                                </div>

                                <div className={`mt-1 flex gap-2 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                  <div className="relative">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      className="h-6 min-w-0 px-1"
                                      startContent={<Icon icon="lucide:smile" style={{ fontSize: 14 }} />}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveReactionMenu(activeReactionMenu === message.id ? null : message.id)
                                      }}
                                    >
                                      <span className="text-xs">React</span>
                                    </Button>
                                    <AnimatePresence>
                                      {activeReactionMenu === message.id && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                          animate={{ opacity: 1, scale: 1, y: 0 }}
                                          exit={{ opacity: 0, scale: 0.8, y: 5 }}
                                          transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30,
                                            duration: 0.2,
                                          }}
                                          className={`absolute ${
                                            message.sender.id === 'current' ? 'right-0' : 'left-0'
                                          } bottom-full mb-2 flex gap-1 rounded-full border border-divider bg-default-100 p-1 shadow-lg`}
                                        >
                                          {['👍', '❤️', '😂', '😮', '👏'].map((emoji, index) => (
                                            <motion.button
                                              key={emoji}
                                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                              animate={{ opacity: 1, scale: 1, y: 0 }}
                                              exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                              transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                                delay: index * 0.05,
                                              }}
                                              whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.2 },
                                              }}
                                              whileTap={{ scale: 0.9 }}
                                              className={`rounded-full p-1 transition-colors hover:bg-default-200 ${
                                                message.reactions?.find((r) => r.emoji === emoji && r.users.includes('current'))
                                                  ? 'bg-primary-100 text-primary-800'
                                                  : ''
                                              }`}
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handleReaction(message.id, emoji)
                                              }}
                                            >
                                              {emoji}
                                            </motion.button>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div className={`flex flex-wrap gap-1 ${message.sender.id === 'current' ? 'justify-end' : ''}`}>
                                      <AnimatePresence mode="popLayout">
                                        {message.reactions.map((reaction, idx) => (
                                          <motion.div
                                            key={`${message.id}-${reaction.emoji}`}
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                            transition={{
                                              type: 'spring',
                                              stiffness: 500,
                                              damping: 30,
                                              delay: idx * 0.05,
                                            }}
                                            className={`flex items-center gap-1 rounded-full bg-default-100 px-2 py-0.5 text-xs ${
                                              reaction.users.includes('current') ? 'bg-primary-100 text-primary-800' : ''
                                            }`}
                                          >
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                              }}
                                            >
                                              {reaction.emoji}
                                            </motion.span>
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ delay: 0.1 }}
                                              className="text-default-500"
                                            >
                                              {reaction.count}
                                            </motion.span>
                                          </motion.div>
                                        ))}
                                      </AnimatePresence>
                                    </div>
                                  )}
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
                            </motion.div>
                          ))}
                      </div>
                    </div>

                    {/* Message input */}
                    <div className="border-t border-divider p-3 pb-6">
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

                      <div className="mb-2 mt-3 flex items-center gap-2 px-1">
                        <Icon icon="lucide:sparkles" className="text-primary" style={{ fontSize: 16 }} />
                        <span className="text-xs text-default-500">AI Assistant is available to help with questions about this course</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop chat content */}
              <div className="hidden h-full w-3/4 flex-col md:flex">
                {selectedChat && (
                  <>
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

                    <div className="flex-grow overflow-y-auto p-4 pb-6">
                      {/* Pinned messages */}
                      <div className="mb-4">
                        {chatState
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
                                <Avatar
                                  src={message.sender.avatar}
                                  size="sm"
                                  className="h-8 w-8 min-w-8"
                                  imgProps={{
                                    className: 'object-cover',
                                  }}
                                />
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
                        {chatState
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
                              className={`flex items-start gap-3 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}
                            >
                              <Avatar
                                src={message.sender.avatar}
                                size="sm"
                                className="h-8 w-8 min-w-8"
                                imgProps={{
                                  className: 'object-cover',
                                }}
                              />
                              <div className={`flex-grow ${message.sender.id === 'current' ? 'flex flex-col items-end' : ''}`}>
                                <div className={`flex items-center justify-between ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                  <div className={`flex items-center gap-1 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                    <span className="font-medium">{message.sender.name}</span>
                                    {message.sender.role === 'teacher' && (
                                      <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                        Instructor
                                      </Chip>
                                    )}
                                  </div>
                                  <span className="text-xs text-default-400">{formatTime(message.timestamp)}</span>
                                </div>

                                <div
                                  className={`mt-1 rounded-lg px-3 py-2 ${
                                    message.sender.id === 'current' ? 'bg-primary-100 text-primary-800' : 'bg-default-100'
                                  }`}
                                >
                                  {message.content.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="mb-2 text-sm last:mb-0">
                                      {paragraph}
                                    </p>
                                  ))}
                                </div>

                                <div className={`mt-1 flex gap-2 ${message.sender.id === 'current' ? 'flex-row-reverse' : ''}`}>
                                  <div className="relative">
                                    <Button
                                      size="sm"
                                      variant="light"
                                      className="h-6 min-w-0 px-1"
                                      startContent={<Icon icon="lucide:smile" style={{ fontSize: 14 }} />}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveReactionMenu(activeReactionMenu === message.id ? null : message.id)
                                      }}
                                    >
                                      <span className="text-xs">React</span>
                                    </Button>
                                    <AnimatePresence>
                                      {activeReactionMenu === message.id && (
                                        <motion.div
                                          initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                          animate={{ opacity: 1, scale: 1, y: 0 }}
                                          exit={{ opacity: 0, scale: 0.8, y: 5 }}
                                          transition={{
                                            type: 'spring',
                                            stiffness: 500,
                                            damping: 30,
                                            duration: 0.2,
                                          }}
                                          className={`absolute ${
                                            message.sender.id === 'current' ? 'right-0' : 'left-0'
                                          } bottom-full mb-2 flex gap-1 rounded-full border border-divider bg-default-100 p-1 shadow-lg`}
                                        >
                                          {['👍', '❤️', '😂', '😮', '👏'].map((emoji, index) => (
                                            <motion.button
                                              key={emoji}
                                              initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                              animate={{ opacity: 1, scale: 1, y: 0 }}
                                              exit={{ opacity: 0, scale: 0.5, y: 10 }}
                                              transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                                delay: index * 0.05,
                                              }}
                                              whileHover={{
                                                scale: 1.2,
                                                transition: { duration: 0.2 },
                                              }}
                                              whileTap={{ scale: 0.9 }}
                                              className={`rounded-full p-1 transition-colors hover:bg-default-200 ${
                                                message.reactions?.find((r) => r.emoji === emoji && r.users.includes('current'))
                                                  ? 'bg-primary-100 text-primary-800'
                                                  : ''
                                              }`}
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                handleReaction(message.id, emoji)
                                              }}
                                            >
                                              {emoji}
                                            </motion.button>
                                          ))}
                                        </motion.div>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div className={`flex flex-wrap gap-1 ${message.sender.id === 'current' ? 'justify-end' : ''}`}>
                                      <AnimatePresence mode="popLayout">
                                        {message.reactions.map((reaction, idx) => (
                                          <motion.div
                                            key={`${message.id}-${reaction.emoji}`}
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                            transition={{
                                              type: 'spring',
                                              stiffness: 500,
                                              damping: 30,
                                              delay: idx * 0.05,
                                            }}
                                            className={`flex items-center gap-1 rounded-full bg-default-100 px-2 py-0.5 text-xs ${
                                              reaction.users.includes('current') ? 'bg-primary-100 text-primary-800' : ''
                                            }`}
                                          >
                                            <motion.span
                                              initial={{ scale: 0 }}
                                              animate={{ scale: 1 }}
                                              transition={{
                                                type: 'spring',
                                                stiffness: 500,
                                                damping: 30,
                                              }}
                                            >
                                              {reaction.emoji}
                                            </motion.span>
                                            <motion.span
                                              initial={{ opacity: 0 }}
                                              animate={{ opacity: 1 }}
                                              transition={{ delay: 0.1 }}
                                              className="text-default-500"
                                            >
                                              {reaction.count}
                                            </motion.span>
                                          </motion.div>
                                        ))}
                                      </AnimatePresence>
                                    </div>
                                  )}
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
                            </motion.div>
                          ))}
                      </div>

                      {/* Multiple typing indicators */}
                      <div className="mt-4 space-y-2">
                        {/* Alex typing */}
                        <div className="flex items-start gap-3">
                          <Avatar
                            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4"
                            size="sm"
                            className="h-8 w-8 min-w-8"
                            imgProps={{
                              className: 'object-cover',
                            }}
                          />
                          <div className="rounded-lg bg-default-100 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-default-500">Alex is typing</span>
                              <div className="flex gap-1">
                                <motion.div
                                  className="h-1.5 w-1.5 rounded-full bg-default-400"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1.2,
                                    ease: 'easeInOut',
                                    times: [0, 0.5, 1],
                                  }}
                                />
                                <motion.div
                                  className="h-1.5 w-1.5 rounded-full bg-default-400"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1.2,
                                    ease: 'easeInOut',
                                    times: [0, 0.5, 1],
                                    delay: 0.2,
                                  }}
                                />
                                <motion.div
                                  className="h-1.5 w-1.5 rounded-full bg-default-400"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5],
                                  }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 1.2,
                                    ease: 'easeInOut',
                                    times: [0, 0.5, 1],
                                    delay: 0.4,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-divider p-4 pb-6">
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

                      <div className="mt-3 flex items-center gap-2">
                        <Icon icon="lucide:sparkles" className="text-primary" style={{ fontSize: 16 }} />
                        <span className="text-xs text-default-500">AI Assistant is available to help with questions about this course</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
          {selected === 'ai' && (
            <motion.div
              key="ai"
              className="flex h-full min-h-0 flex-1 flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex h-full min-h-0 flex-1 flex-col">
                <div className="h-full min-h-0 flex-1 overflow-y-auto bg-default-50 p-6 pb-8">
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
                  className="color-inherit flex gap-2 border-t border-divider p-4 pb-6"
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
