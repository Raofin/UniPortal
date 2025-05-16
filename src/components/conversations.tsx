import React from "react";
import { Card, CardBody, CardHeader, Tabs, Tab, Avatar, Input, Button, Divider, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: "student" | "teacher" | "assistant";
  };
  subject?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
  isPinned?: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: Date;
}

export const Conversations: React.FC = () => {
  const [selected, setSelected] = React.useState<"inbox" | "discussion">("inbox");
  const [selectedMessage, setSelectedMessage] = React.useState<string | null>(null);
  const [selectedChat, setSelectedChat] = React.useState<string | null>("cs301");
  const [isTyping, setIsTyping] = React.useState(false);
  
  // Mock data for inbox
  const messages: Message[] = [
    {
      id: "m1",
      sender: {
        id: "prof1",
        name: "Prof. Johnson",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        role: "teacher"
      },
      subject: "Upcoming Midterm Exam Details",
      content: "Dear students, I wanted to provide some additional details about the upcoming midterm exam scheduled for next week. The exam will cover chapters 1-5 from the textbook, with a focus on tree and graph algorithms. Please make sure to review the practice problems we discussed in class. If you have any questions, feel free to reach out during office hours or via email. Best regards, Prof. Johnson",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      attachments: [
        {
          name: "Midterm_Study_Guide.pdf",
          type: "pdf",
          size: "1.2 MB"
        }
      ]
    },
    {
      id: "m2",
      sender: {
        id: "admin1",
        name: "University Admin",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
        role: "teacher"
      },
      subject: "Registration for Next Semester Now Open",
      content: "Dear students, Registration for the Spring 2024 semester is now open. Please log in to the student portal to view available courses and register. Priority registration is available based on your academic standing. If you need advising before registration, please contact your academic advisor. Registration will close on November 15th. Thank you.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true
    },
    {
      id: "m3",
      sender: {
        id: "alex",
        name: "Alex Chen",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
        role: "student"
      },
      subject: "Study Group for Database Final",
      content: "Hey Rawfin, A few of us are forming a study group for the Database Systems final exam. We're planning to meet at the library on Thursday at 6 PM. Would you like to join us? We'll be going over the practice problems and reviewing the key concepts from the semester. Let me know if you're interested! Best, Alex",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      isRead: true
    },
    {
      id: "m4",
      sender: {
        id: "ta1",
        name: "Sarah (TA)",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
        role: "teacher"
      },
      subject: "Feedback on Your Assignment",
      content: "Hi Rawfin, I've reviewed your recent assignment submission for the Data Structures course. Overall, your implementation was well-structured and efficient. I particularly liked your approach to the balancing algorithm. There are a few minor optimizations you could make to improve the time complexity further. I've attached detailed feedback with suggestions. Let me know if you have any questions! Best, Sarah",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      isRead: false,
      attachments: [
        {
          name: "Assignment_Feedback.docx",
          type: "docx",
          size: "245 KB"
        }
      ]
    }
  ];
  
  // Mock data for chat groups
  const chatGroups: ChatGroup[] = [
    {
      id: "cs301",
      name: "CS301: Advanced Algorithms",
      unreadCount: 3,
      lastMessage: "Prof. Johnson: Don't forget to submit your assignments by Friday!",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
    },
    {
      id: "cs202",
      name: "CS202: Data Structures",
      unreadCount: 0,
      lastMessage: "Sarah: Has anyone started on the binary tree implementation?",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
    },
    {
      id: "cs305",
      name: "CS305: Database Systems",
      unreadCount: 5,
      lastMessage: "Alex: I'm having trouble with the normalization exercise",
      lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000) // 1 hour ago
    }
  ];
  
  // Mock chat messages for CS301
  const cs301Messages: Message[] = [
    {
      id: "c1",
      sender: {
        id: "prof1",
        name: "Prof. Johnson",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        role: "teacher"
      },
      content: "Good morning everyone! Today we'll be discussing dynamic programming approaches to optimization problems.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: true,
      isPinned: true
    },
    {
      id: "c2",
      sender: {
        id: "alex",
        name: "Alex Chen",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
        role: "student"
      },
      content: "Professor, could you clarify the difference between memoization and tabulation approaches?",
      timestamp: new Date(Date.now() - 1.8 * 60 * 60 * 1000), // 1.8 hours ago
      isRead: true
    },
    {
      id: "c3",
      sender: {
        id: "prof1",
        name: "Prof. Johnson",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        role: "teacher"
      },
      content: "Great question, Alex! Memoization is a top-down approach where we store the results of subproblems in a table (usually a map or array) and access them when needed. Tabulation is a bottom-up approach where we build our table starting from the smallest subproblems and work our way up to the original problem.",
      timestamp: new Date(Date.now() - 1.7 * 60 * 60 * 1000), // 1.7 hours ago
      isRead: true
    },
    {
      id: "c4",
      sender: {
        id: "sarah",
        name: "Sarah Williams",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
        role: "student"
      },
      content: "I found this article that explains it really well: https://example.com/dynamic-programming",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000), // 1.5 hours ago
      isRead: true
    },
    {
      id: "c5",
      sender: {
        id: "assistant",
        name: "Study Assistant",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10",
        role: "assistant"
      },
      content: "Here's a summary of today's key concepts:\n\n1. Dynamic Programming fundamentals\n2. Memoization vs Tabulation\n3. Optimal Substructure property\n4. Overlapping Subproblems\n\nWould anyone like me to provide practice problems on these topics?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      isRead: true
    },
    {
      id: "c6",
      sender: {
        id: "prof1",
        name: "Prof. Johnson",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        role: "teacher"
      },
      content: "Don't forget to submit your assignments by Friday!",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false
    }
  ];
  
  // Format time function
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Fix the Smart Inbox tab crash by ensuring proper state handling
  React.useEffect(() => {
    return () => {
      // Clean up any timers or subscriptions
    };
  }, []);
  
  // Fix the inbox tab rendering by adding proper null checks
  const selectedMessageData = React.useMemo(() => {
    return messages.find(m => m.id === selectedMessage) || null;
  }, [selectedMessage]);
  
  // Simulate typing indicator
  React.useEffect(() => {
    if (selected === "discussion" && selectedChat) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        
        const timer2 = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        
        return () => clearTimeout(timer2);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [selected, selectedChat, cs301Messages]);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">Conversations</h2>
        
        <Tabs 
          selectedKey={selected} 
          onSelectionChange={key => setSelected(key as "inbox" | "discussion")}
          variant="light"
          color="primary"
          classNames={{
            tabList: "gap-4",
          }}
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
        </Tabs>
      </CardHeader>
      
      <CardBody className="p-0">
        {selected === "inbox" && (
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Message list */}
            <div className="w-full md:w-2/5 border-r border-divider overflow-y-auto">
              <div className="p-3">
                <Input
                  placeholder="Search messages..."
                  startContent={<Icon icon="lucide:search" className="text-default-400" />}
                  size="sm"
                  className="mb-2"
                />
              </div>
              
              <div className="divide-y divide-divider">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    whileHover={{ backgroundColor: "var(--heroui-content1)" }}
                    className={`p-3 cursor-pointer ${
                      selectedMessage === message.id ? "bg-content1" : ""
                    } ${!message.isRead ? "border-l-4 border-primary" : ""}`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar src={message.sender.avatar} size="sm" />
                      
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-medium truncate ${!message.isRead ? "text-foreground" : "text-default-600"}`}>
                            {message.sender.name}
                          </h4>
                          <span className="text-xs text-default-400 whitespace-nowrap">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        
                        <p className={`text-sm truncate ${!message.isRead ? "font-medium" : "text-default-500"}`}>
                          {message.subject}
                        </p>
                        
                        <p className="text-xs truncate text-default-400">
                          {message.content.substring(0, 60)}...
                        </p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Icon icon="lucide:paperclip" className="text-default-400" size={12} />
                            <span className="text-xs text-default-400">
                              {message.attachments.length} attachment{message.attachments.length > 1 ? 's' : ''}
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
            <div className="w-full md:w-3/5 flex flex-col h-full">
              {selectedMessageData ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedMessageData.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    {(() => {
                      const message = messages.find(m => m.id === selectedMessage);
                      if (!message) return null;
                      
                      return (
                        <>
                          <div className="p-4 border-b border-divider">
                            <div className="flex justify-between items-start mb-3">
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
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  aria-label="Reply"
                                >
                                  <Icon icon="lucide:reply" size={18} />
                                </Button>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  aria-label="Forward"
                                >
                                  <Icon icon="lucide:forward" size={18} />
                                </Button>
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="light"
                                  aria-label="More options"
                                >
                                  <Icon icon="lucide:more-vertical" size={18} />
                                </Button>
                              </div>
                            </div>
                            
                            <h2 className="text-lg font-medium">{message.subject}</h2>
                          </div>
                          
                          <div className="p-4 flex-grow overflow-y-auto">
                            <div className="prose prose-sm max-w-none">
                              {message.content.split('\n').map((paragraph, i) => (
                                <p key={i} className="mb-4 text-default-700">{paragraph}</p>
                              ))}
                            </div>
                            
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-6">
                                <h4 className="text-sm font-medium mb-2">Attachments</h4>
                                <div className="flex flex-wrap gap-2">
                                  {message.attachments.map((attachment, i) => (
                                    <div 
                                      key={i}
                                      className="flex items-center gap-2 p-2 border border-divider rounded-md hover:bg-default-100 transition-colors cursor-pointer"
                                    >
                                      <Icon 
                                        icon={
                                          attachment.type === "pdf" ? "lucide:file-text" :
                                          attachment.type === "docx" ? "lucide:file-text" :
                                          attachment.type === "pptx" ? "lucide:file-presentation" :
                                          "lucide:file"
                                        } 
                                        className={
                                          attachment.type === "pdf" ? "text-danger" :
                                          attachment.type === "docx" ? "text-primary" :
                                          attachment.type === "pptx" ? "text-warning" :
                                          "text-default-500"
                                        }
                                      />
                                      <div>
                                        <p className="text-sm font-medium">{attachment.name}</p>
                                        <p className="text-xs text-default-400">{attachment.size}</p>
                                      </div>
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="light"
                                        className="ml-2"
                                        aria-label="Download attachment"
                                      >
                                        <Icon icon="lucide:download" size={16} />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4 border-t border-divider">
                            <div className="flex gap-2">
                              <Button
                                color="primary"
                                startContent={<Icon icon="lucide:reply" />}
                              >
                                Reply
                              </Button>
                              <Button
                                variant="flat"
                                startContent={<Icon icon="lucide:forward" />}
                              >
                                Forward
                              </Button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <Icon icon="lucide:mail" className="w-16 h-16 text-default-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Select a message</h3>
                  <p className="text-default-500 max-w-md">
                    Choose a message from the list to view its contents
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Chat groups list */}
            <div className="w-full md:w-1/4 border-r border-divider overflow-y-auto">
              <div className="p-3">
                <Input
                  placeholder="Search chats..."
                  startContent={<Icon icon="lucide:search" className="text-default-400" />}
                  size="sm"
                  className="mb-2"
                />
              </div>
              
              <div className="px-3 py-2">
                <h4 className="text-xs font-medium text-default-500 uppercase tracking-wider mb-2">
                  Your Courses
                </h4>
              </div>
              
              <div className="space-y-1 px-2">
                {chatGroups.map((group) => (
                  <motion.div
                    key={group.id}
                    whileHover={{ backgroundColor: "var(--heroui-content1)" }}
                    className={`p-2 rounded-md cursor-pointer ${
                      selectedChat === group.id ? "bg-content1" : ""
                    }`}
                    onClick={() => setSelectedChat(group.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-sm">{group.name}</h4>
                      {group.unreadCount > 0 && (
                        <Chip size="sm" color="primary" variant="flat">
                          {group.unreadCount}
                        </Chip>
                      )}
                    </div>
                    
                    <p className="text-xs text-default-500 truncate mt-1">
                      {group.lastMessage}
                    </p>
                    
                    <p className="text-xs text-default-400 mt-1">
                      {formatTime(group.lastMessageTime)}
                    </p>
                  </motion.div>
                ))}
              </div>
              
              <Divider className="my-3" />
              
              <div className="px-3 py-2">
                <h4 className="text-xs font-medium text-default-500 uppercase tracking-wider mb-2">
                  Direct Messages
                </h4>
              </div>
              
              <div className="space-y-1 px-2">
                <div className="p-2 rounded-md hover:bg-content1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" size="sm" />
                    <div>
                      <h4 className="font-medium text-sm">Prof. Johnson</h4>
                      <p className="text-xs text-default-400">Online</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 rounded-md hover:bg-content1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4" size="sm" />
                    <div>
                      <h4 className="font-medium text-sm">Alex Chen</h4>
                      <p className="text-xs text-default-400">Last seen 2h ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2 rounded-md hover:bg-content1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=5" size="sm" />
                    <div>
                      <h4 className="font-medium text-sm">Sarah Williams</h4>
                      <p className="text-xs text-default-400">Last seen 5m ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Chat content */}
            <div className="w-full md:w-3/4 flex flex-col h-full">
              {selectedChat ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedChat}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    <div className="p-3 border-b border-divider">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {chatGroups.find(g => g.id === selectedChat)?.name}
                          </h3>
                          <Chip size="sm" variant="flat" color="primary">
                            28 members
                          </Chip>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="Search in conversation"
                          >
                            <Icon icon="lucide:search" size={18} />
                          </Button>
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            aria-label="More options"
                          >
                            <Icon icon="lucide:more-vertical" size={18} />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto p-4">
                      {/* Pinned messages */}
                      <div className="mb-4">
                        {cs301Messages.filter(m => m.isPinned).map((message) => (
                          <div 
                            key={message.id}
                            className="bg-default-50 p-3 rounded-lg border-l-4 border-primary mb-2"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon icon="lucide:pin" className="text-primary" size={14} />
                                <span className="text-xs font-medium text-primary">Pinned by instructor</span>
                              </div>
                              <span className="text-xs text-default-400">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                            
                            <div className="flex items-start gap-2 mt-1">
                              <Avatar src={message.sender.avatar} size="sm" />
                              <div>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium text-sm">{message.sender.name}</span>
                                  {message.sender.role === "teacher" && (
                                    <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                      Instructor
                                    </Chip>
                                  )}
                                </div>
                                <p className="text-sm mt-1">{message.content}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Regular messages */}
                      <div className="space-y-4">
                        {cs301Messages.filter(m => !m.isPinned).map((message, index) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar src={message.sender.avatar} size="sm" />
                              <div className="flex-grow">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1">
                                    <span className="font-medium">{message.sender.name}</span>
                                    {message.sender.role === "teacher" && (
                                      <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                        Instructor
                                      </Chip>
                                    )}
                                    {message.sender.role === "assistant" && (
                                      <Chip size="sm" variant="flat" color="secondary" className="h-4 px-1">
                                        AI Assistant
                                      </Chip>
                                    )}
                                  </div>
                                  <span className="text-xs text-default-400">
                                    {formatTime(message.timestamp)}
                                  </span>
                                </div>
                                
                                <div className="mt-1">
                                  {message.content.split('\n\n').map((paragraph, i) => (
                                    <p key={i} className="text-sm mb-2">{paragraph}</p>
                                  ))}
                                </div>
                                
                                <div className="flex gap-2 mt-1">
                                  <Button
                                    size="sm"
                                    variant="light"
                                    className="h-6 min-w-0 px-1"
                                    startContent={<Icon icon="lucide:thumbs-up" size={14} />}
                                  >
                                    <span className="text-xs">2</span>
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="light"
                                    className="h-6 min-w-0 px-1"
                                    startContent={<Icon icon="lucide:reply" size={14} />}
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
                        <div className="flex items-start gap-3 mt-4">
                          <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=4" size="sm" />
                          <div className="bg-default-100 rounded-lg px-3 py-2">
                            <div className="flex gap-1">
                              <motion.div
                                className="w-2 h-2 rounded-full bg-default-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 rounded-full bg-default-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 rounded-full bg-default-400"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-3 border-t border-divider">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          fullWidth
                          endContent={
                            <div className="flex gap-1">
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                aria-label="Attach file"
                              >
                                <Icon icon="lucide:paperclip" size={18} />
                              </Button>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                aria-label="Add emoji"
                              >
                                <Icon icon="lucide:smile" size={18} />
                              </Button>
                            </div>
                          }
                        />
                        <Button
                          color="primary"
                          isIconOnly
                          aria-label="Send message"
                        >
                          <Icon icon="lucide:send" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Icon icon="lucide:sparkles" className="text-primary" size={16} />
                        <span className="text-xs text-default-500">
                          AI Assistant is available to help with questions about this course
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <Icon icon="lucide:message-circle" className="w-16 h-16 text-default-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                  <p className="text-default-500 max-w-md">
                    Choose a course or direct message to start chatting
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};