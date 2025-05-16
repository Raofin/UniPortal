import React from "react";
import { 
  Button, 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  Tabs,
  Tab,
  Avatar,
  Input,
  Chip,
  Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: "student" | "teacher" | "assistant" | "self";
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatGroup {
  id: string;
  name: string;
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: Date;
}

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"discussion" | "inbox" | "ai">("discussion");
  const [selectedChat, setSelectedChat] = React.useState<string | null>("cs301");
  const [newMessage, setNewMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  
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
  const [messages, setMessages] = React.useState<Record<string, Message[]>>({
    cs301: [
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
        isRead: true
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
    ],
    cs202: [
      {
        id: "d1",
        sender: {
          id: "sarah",
          name: "Sarah Williams",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
          role: "student"
        },
        content: "Has anyone started on the binary tree implementation?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: true
      },
      {
        id: "d2",
        sender: {
          id: "john",
          name: "John Davis",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
          role: "student"
        },
        content: "I've started working on it. The balancing part is a bit tricky though.",
        timestamp: new Date(Date.now() - 1.9 * 60 * 60 * 1000), // 1.9 hours ago
        isRead: true
      }
    ],
    ai: [
      {
        id: "ai1",
        sender: {
          id: "assistant",
          name: "Study Assistant",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10",
          role: "assistant"
        },
        content: "Hello! I'm your AI study assistant. I can help with your coursework, assignments, and uploaded notes. Just mention the course name, file, or topic you need help with.",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        isRead: true
      }
    ]
  });
  
  // Mock inbox messages
  const inboxMessages = [
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
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    const newMsg: Message = {
      id: `new-${Date.now()}`,
      sender: {
        id: "self",
        name: "Rawfin",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
        role: "self"
      },
      content: newMessage,
      timestamp: new Date(),
      isRead: true
    };
    
    // For AI chat, we'll simulate a response
    if (activeTab === "ai") {
      setMessages(prev => ({
        ...prev,
        ai: [...prev.ai, newMsg]
      }));
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        setIsTyping(false);
        
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          sender: {
            id: "assistant",
            name: "Study Assistant",
            avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10",
            role: "assistant"
          },
          content: generateAIResponse(newMessage),
          timestamp: new Date(),
          isRead: true
        };
        
        setMessages(prev => ({
          ...prev,
          ai: [...prev.ai, aiResponse]
        }));
      }, 1500);
    } else {
      // For regular chats
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMsg]
      }));
    }
    
    setNewMessage("");
  };
  
  // Generate a simple AI response based on the message content
  const generateAIResponse = (message: string) => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes("algorithm") || lowerMsg.includes("cs301")) {
      return "For Advanced Algorithms (CS301), I recommend focusing on dynamic programming, graph algorithms, and complexity analysis. The midterm exam will cover these topics extensively. Would you like me to explain any specific algorithm concept?";
    } else if (lowerMsg.includes("data structure") || lowerMsg.includes("cs202")) {
      return "For Data Structures (CS202), make sure you understand binary trees, heaps, and hash tables thoroughly. The upcoming assignment requires implementing a balanced binary search tree. Would you like some resources on AVL trees or Red-Black trees?";
    } else if (lowerMsg.includes("database") || lowerMsg.includes("cs305")) {
      return "For Database Systems (CS305), focus on normalization, SQL queries, and transaction management. Your project on library management system should include at least 5 entities with proper relationships. Would you like help with the ER diagram or normalization process?";
    } else if (lowerMsg.includes("help") || lowerMsg.includes("assignment")) {
      return "I'd be happy to help with your assignment! Please specify which course it's for and what specific concept you're struggling with. I can provide explanations, resources, or step-by-step guidance.";
    } else {
      return "I'm here to help with your coursework and assignments. Could you please specify which course or topic you need assistance with? For example, you can ask about Advanced Algorithms (CS301), Data Structures (CS202), or Database Systems (CS305).";
    }
  };
  
  // Scroll to bottom of chat when new messages are added
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, selectedChat, activeTab, isTyping]);
  
  return (
    <>
      {/* Floating button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          color="primary"
          size="lg"
          className="shadow-lg rounded-full h-14 px-6"
          startContent={<Icon icon="lucide:message-circle" width={24} height={24} />}
          onPress={() => setIsOpen(true)}
        >
          Conversations
        </Button>
      </motion.div>
      
      {/* Chat modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={setIsOpen}
        size="4xl"
        scrollBehavior="inside"
        classNames={{
          base: "h-[80vh]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <Tabs 
                  selectedKey={activeTab} 
                  onSelectionChange={(key) => setActiveTab(key as "discussion" | "inbox" | "ai")}
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                  }}
                >
                  <Tab 
                    key="discussion" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:users" />
                        <span>Class Discussion</span>
                      </div>
                    }
                  />
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
                    key="ai" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:sparkles" />
                        <span>AI Chat</span>
                      </div>
                    }
                  />
                </Tabs>
              </ModalHeader>
              
              <ModalBody className="p-0">
                {activeTab === "discussion" && (
                  <div className="flex h-full">
                    {/* Chat groups list */}
                    <div className="w-1/3 border-r border-divider overflow-y-auto">
                      <div className="p-3">
                        <Input
                          placeholder="Search chats..."
                          startContent={<Icon icon="lucide:search" className="text-default-400" />}
                          size="sm"
                          className="mb-2"
                        />
                      </div>
                      
                      <div className="space-y-1 px-2">
                        {chatGroups.map((group) => (
                          <motion.div
                            key={group.id}
                            whileHover={{ backgroundColor: "var(--heroui-content1)" }}
                            className={`p-3 rounded-md cursor-pointer ${
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
                    </div>
                    
                    {/* Chat content */}
                    <div className="w-2/3 flex flex-col h-full">
                      {selectedChat ? (
                        <>
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
                          
                          <div 
                            ref={chatContainerRef}
                            className="flex-grow overflow-y-auto p-4 space-y-4"
                          >
                            {messages[selectedChat]?.map((message, index) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.2 }}
                              >
                                <div className={`flex items-start gap-3 ${
                                  message.sender.role === "self" ? "flex-row-reverse" : ""
                                }`}>
                                  <Avatar src={message.sender.avatar} size="sm" />
                                  <div className={`max-w-[70%] ${
                                    message.sender.role === "self" ? "bg-primary-100 text-primary-700" : "bg-default-100"
                                  } p-3 rounded-lg`}>
                                    <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-1">
                                        {message.sender.role !== "self" && (
                                          <span className="font-medium text-sm">{message.sender.name}</span>
                                        )}
                                        {message.sender.role === "teacher" && (
                                          <Chip size="sm" variant="flat" color="primary" className="h-4 px-1">
                                            Instructor
                                          </Chip>
                                        )}
                                      </div>
                                      <span className="text-xs text-default-400 ml-2">
                                        {formatTime(message.timestamp)}
                                      </span>
                                    </div>
                                    
                                    <div className="mt-1">
                                      <p className="text-sm">{message.content}</p>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          
                          <div className="p-3 border-t border-divider">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Type a message..."
                                fullWidth
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                  }
                                }}
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
                                onPress={handleSendMessage}
                                isDisabled={!newMessage.trim()}
                              >
                                <Icon icon="lucide:send" />
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6">
                          <Icon icon="lucide:message-circle" className="w-16 h-16 text-default-300 mb-4" />
                          <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                          <p className="text-default-500 max-w-md">
                            Choose a course to start chatting
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {activeTab === "inbox" && (
                  <div className="flex h-full">
                    {/* Message list */}
                    <div className="w-1/3 border-r border-divider overflow-y-auto">
                      <div className="p-3">
                        <Input
                          placeholder="Search messages..."
                          startContent={<Icon icon="lucide:search" className="text-default-400" />}
                          size="sm"
                          className="mb-2"
                        />
                      </div>
                      
                      <div className="divide-y divide-divider">
                        {inboxMessages.map((message) => (
                          <motion.div
                            key={message.id}
                            whileHover={{ backgroundColor: "var(--heroui-content1)" }}
                            className={`p-3 cursor-pointer ${
                              !message.isRead ? "border-l-4 border-primary" : ""
                            }`}
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
                    <div className="w-2/3 flex flex-col h-full">
                      <div className="flex flex-col items-center justify-center h-full text-center p-6">
                        <Icon icon="lucide:mail" className="w-16 h-16 text-default-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Select a message</h3>
                        <p className="text-default-500 max-w-md">
                          Choose a message from the list to view its contents
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === "ai" && (
                  <div className="flex h-full w-full">
                    <EnhancedAIChat />
                  </div>
                )}
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};