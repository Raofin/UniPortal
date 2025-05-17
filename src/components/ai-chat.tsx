import React from 'react'
import { Input, Button, Avatar, Divider, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatThread {
  id: string
  title: string
  lastUpdated: Date
  messages: ChatMessage[]
}

export const EnhancedAIChat: React.FC = () => {
  const [threads, setThreads] = React.useState<ChatThread[]>([
    {
      id: 'thread-1',
      title: 'Help with DB Project Notes',
      lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: [
        {
          id: 'msg-1-1',
          role: 'user',
          content: 'Can you help me understand the key concepts from @Lecture3_DB.pdf about normalization?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
        {
          id: 'msg-1-2',
          role: 'assistant',
          content:
            'Based on the lecture notes from Lecture3_DB.pdf, database normalization is the process of structuring a database to reduce data redundancy and improve data integrity. The key forms of normalization covered are:\n\n1. First Normal Form (1NF): Eliminate repeating groups and ensure atomic values\n2. Second Normal Form (2NF): Meet 1NF requirements and remove partial dependencies\n3. Third Normal Form (3NF): Meet 2NF requirements and remove transitive dependencies\n4. Boyce-Codd Normal Form (BCNF): A stronger version of 3NF\n\nThe lecture emphasizes that normalization helps prevent update anomalies, insertion anomalies, and deletion anomalies. Would you like me to explain any of these concepts in more detail?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 30 * 1000),
        },
      ],
    },
    {
      id: 'thread-2',
      title: 'Quiz Summary - Algorithms',
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      messages: [
        {
          id: 'msg-2-1',
          role: 'user',
          content: 'Can you summarize the key topics I should study for my upcoming algorithms quiz?',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: 'msg-2-2',
          role: 'assistant',
          content:
            "Based on your course materials and recent lectures, here are the key topics to focus on for your upcoming algorithms quiz:\n\n1. **Time and Space Complexity Analysis**\n   - Big O, Omega, and Theta notations\n   - Best, worst, and average case scenarios\n\n2. **Sorting Algorithms**\n   - QuickSort, MergeSort, HeapSort\n   - Their time complexities and use cases\n\n3. **Graph Algorithms**\n   - BFS and DFS traversals\n   - Dijkstra's shortest path algorithm\n   - Minimum spanning trees (Prim's and Kruskal's)\n\n4. **Dynamic Programming**\n   - Memoization vs. Tabulation approaches\n   - Classic problems: Knapsack, Longest Common Subsequence\n\n5. **Greedy Algorithms**\n   - Activity selection problem\n   - Huffman coding\n\nWould you like me to provide practice problems for any of these topics?",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 45 * 1000),
        },
        {
          id: 'msg-2-3',
          role: 'user',
          content: 'Yes, can you give me some practice problems for dynamic programming?',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000),
        },
        {
          id: 'msg-2-4',
          role: 'assistant',
          content:
            'Here are some dynamic programming practice problems to help you prepare for your algorithms quiz:\n\n1. **Fibonacci Sequence**\n   - Implement both recursive with memoization and iterative tabulation approaches\n   - Compare their time and space complexities\n\n2. **Coin Change Problem**\n   - Given a set of coin denominations and a target amount, find the minimum number of coins needed to make that amount\n   - Example: coins = [1, 5, 10, 25], amount = 37\n\n3. **Longest Increasing Subsequence**\n   - Find the length of the longest subsequence in an array such that all elements are in increasing order\n   - Example: [10, 22, 9, 33, 21, 50, 41, 60] → Length: 5 ([10, 22, 33, 50, 60])\n\n4. **Edit Distance**\n   - Given two strings, find the minimum number of operations (insert, delete, replace) to convert one string to another\n   - Example: Convert "kitten" to "sitting"\n\n5. **Matrix Chain Multiplication**\n   - Given a sequence of matrices, find the most efficient way to multiply them\n\nFor each problem, I recommend:\n1. First try to identify the subproblems and recurrence relation\n2. Implement a recursive solution with memoization\n3. Convert it to a bottom-up tabulation approach\n4. Analyze the time and space complexity\n\nWould you like me to walk through the solution for any of these problems?',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 1000),
        },
      ],
    },
    {
      id: 'thread-3',
      title: 'Data Structures Assignment Help',
      lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      messages: [
        {
          id: 'msg-3-1',
          role: 'user',
          content:
            "I'm having trouble with the binary tree implementation for my data structures assignment. Can you help me understand how to implement the balancing part?",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
        {
          id: 'msg-3-2',
          role: 'assistant',
          content:
            "I'd be happy to help with your binary tree balancing implementation. It sounds like you're working on an AVL tree or a similar self-balancing binary search tree.\n\nFor AVL trees, the key concept is maintaining a balance factor for each node. Here's a step-by-step approach:\n\n1. **Balance Factor Calculation**:\n   - For each node, calculate: height(right subtree) - height(left subtree)\n   - A balanced node should have a factor of -1, 0, or 1\n\n2. **Rotations to Restore Balance**:\n   - **Left Rotation**: When right subtree is heavier\n   - **Right Rotation**: When left subtree is heavier\n   - **Left-Right Rotation**: When left subtree is heavier but imbalance is in its right child\n   - **Right-Left Rotation**: When right subtree is heavier but imbalance is in its left child\n\n3. **Implementation Steps**:\n   ```typescript\n   // Node structure\n   class AVLNode {\n     value: number;\n     left: AVLNode | null = null;\n     right: AVLNode | null = null;\n     height: number = 1; // Height of the node\n     \n     constructor(value: number) {\n       this.value = value;\n     }\n   }\n   \n   // Get height of a node\n   function getHeight(node: AVLNode | null): number {\n     return node ? node.height : 0;\n   }\n   \n   // Get balance factor\n   function getBalanceFactor(node: AVLNode | null): number {\n     return node ? getHeight(node.right) - getHeight(node.left) : 0;\n   }\n   \n   // Update height of a node\n   function updateHeight(node: AVLNode): void {\n     node.height = Math.max(getHeight(node.left), getHeight(node.right)) + 1;\n   }\n   \n   // Right rotation\n   function rotateRight(y: AVLNode): AVLNode {\n     const x = y.left!;\n     const T2 = x.right;\n     \n     // Perform rotation\n     x.right = y;\n     y.left = T2;\n     \n     // Update heights\n     updateHeight(y);\n     updateHeight(x);\n     \n     return x; // New root\n   }\n   \n   // Left rotation\n   function rotateLeft(x: AVLNode): AVLNode {\n     const y = x.right!;\n     const T2 = y.left;\n     \n     // Perform rotation\n     y.left = x;\n     x.right = T2;\n     \n     // Update heights\n     updateHeight(x);\n     updateHeight(y);\n     \n     return y; // New root\n   }\n   ```\n\n4. **Balancing during insertion**:\n   ```typescript\n   function insert(root: AVLNode | null, value: number): AVLNode {\n     // Standard BST insertion\n     if (!root) return new AVLNode(value);\n     \n     if (value < root.value) {\n       root.left = insert(root.left, value);\n     } else if (value > root.value) {\n       root.right = insert(root.right, value);\n     } else {\n       return root; // Duplicate values not allowed\n     }\n     \n     // Update height\n     updateHeight(root);\n     \n     // Get balance factor\n     const balance = getBalanceFactor(root);\n     \n     // Left-Left Case\n     if (balance < -1 && getBalanceFactor(root.left) <= 0) {\n       return rotateRight(root);\n     }\n     \n     // Left-Right Case\n     if (balance < -1 && getBalanceFactor(root.left) > 0) {\n       root.left = rotateLeft(root.left!);\n       return rotateRight(root);\n     }\n     \n     // Right-Right Case\n     if (balance > 1 && getBalanceFactor(root.right) >= 0) {\n       return rotateLeft(root);\n     }\n     \n     // Right-Left Case\n     if (balance > 1 && getBalanceFactor(root.right) < 0) {\n       root.right = rotateRight(root.right!);\n       return rotateLeft(root);\n     }\n     \n     return root;\n   }\n   ```\n\nThe key to understanding balancing is visualizing the rotations. Would you like me to explain any specific rotation in more detail or help with a specific part of your implementation?",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000 + 3 * 60 * 1000),
        },
      ],
    },
  ])

  const [selectedThread, setSelectedThread] = React.useState<string>(threads[0].id)
  const [newMessage, setNewMessage] = React.useState('')
  const [isTyping, setIsTyping] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const currentThread = threads.find((t) => t.id === selectedThread) || threads[0]

  // Scroll to bottom when messages change or when typing indicator appears/disappears
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentThread.messages, isTyping])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const updatedThreads = threads.map((thread) => {
      if (thread.id === selectedThread) {
        return {
          ...thread,
          lastUpdated: new Date(),
          messages: [
            ...thread.messages,
            {
              id: `msg-${Date.now()}`,
              role: 'user',
              content: newMessage,
              timestamp: new Date(),
            },
          ],
        }
      }
      return thread
    })

    setThreads(updatedThreads)
    setNewMessage('')

    // Simulate AI typing
    setIsTyping(true)

    // Simulate AI response after a delay
    setTimeout(() => {
      setIsTyping(false)

      const aiResponse = generateAIResponse(newMessage)

      setThreads((prevThreads) =>
        prevThreads.map((thread) => {
          if (thread.id === selectedThread) {
            return {
              ...thread,
              lastUpdated: new Date(),
              messages: [
                ...thread.messages,
                {
                  id: `msg-${Date.now()}-ai`,
                  role: 'assistant',
                  content: aiResponse,
                  timestamp: new Date(),
                },
              ],
            }
          }
          return thread
        }),
      )
    }, 2000)
  }

  const createNewThread = () => {
    const newThreadId = `thread-${Date.now()}`

    setThreads([
      {
        id: newThreadId,
        title: 'New Conversation',
        lastUpdated: new Date(),
        messages: [],
      },
      ...threads,
    ])

    setSelectedThread(newThreadId)
  }

  // Generate a simple AI response based on the message content
  const generateAIResponse = (message: string) => {
    const lowerMsg = message.toLowerCase()

    if (lowerMsg.includes('algorithm') || lowerMsg.includes('sorting')) {
      return 'Based on your course materials, here are the key sorting algorithms you should understand:\n\n1. **QuickSort**\n   - Average time complexity: O(n log n)\n   - Worst case: O(n²) when poorly pivoted\n   - Uses divide and conquer with a pivot element\n\n2. **MergeSort**\n   - Time complexity: O(n log n) in all cases\n   - Space complexity: O(n)\n   - Stable sorting algorithm\n\n3. **HeapSort**\n   - Time complexity: O(n log n) in all cases\n   - In-place algorithm with O(1) extra space\n   - Not stable\n\nWould you like me to explain any of these algorithms in more detail or provide implementation examples?'
    } else if (lowerMsg.includes('data structure') || lowerMsg.includes('tree') || lowerMsg.includes('binary')) {
      return "For binary trees, there are several key operations you should master:\n\n1. **Traversals**:\n   - In-order: Left → Root → Right (gives sorted order for BST)\n   - Pre-order: Root → Left → Right (useful for copying trees)\n   - Post-order: Left → Right → Root (useful for deletion)\n   - Level-order: Level by level from top to bottom\n\n2. **Search Operations**:\n   - Find minimum/maximum value\n   - Search for a specific value\n   - Find successor/predecessor\n\n3. **Modification Operations**:\n   - Insertion\n   - Deletion\n   - Balancing (for self-balancing trees)\n\nFor your assignment, make sure you understand the balancing algorithms if you're implementing AVL or Red-Black trees. Would you like me to provide code examples for any specific operation?"
    } else if (lowerMsg.includes('database') || lowerMsg.includes('normalization')) {
      return 'Database normalization is a systematic approach to organizing data in a database to reduce redundancy and improve data integrity. The main normal forms are:\n\n1. **First Normal Form (1NF)**:\n   - Eliminate repeating groups\n   - Create separate tables for related data\n   - Identify each set of related data with a primary key\n\n2. **Second Normal Form (2NF)**:\n   - Meet all requirements of 1NF\n   - Remove partial dependencies (attributes that depend on only part of the primary key)\n\n3. **Third Normal Form (3NF)**:\n   - Meet all requirements of 2NF\n   - Remove transitive dependencies (attributes that depend on non-key attributes)\n\n4. **Boyce-Codd Normal Form (BCNF)**:\n   - A stricter version of 3NF\n   - For any dependency A → B, A must be a superkey\n\nFor your database project, I recommend starting with a clear ER diagram before implementing the normalized schema. Would you like me to help analyze a specific table design for normalization issues?'
    } else if (lowerMsg.includes('help') || lowerMsg.includes('assignment')) {
      return "I'd be happy to help with your assignment! To provide the most relevant assistance, could you please:\n\n1. Specify which course the assignment is for\n2. Share the specific requirements or questions you're working on\n3. Let me know what part you're finding challenging\n\nIf you have any lecture notes, assignment instructions, or code you've already written, you can mention them (e.g., @Lecture3_DB.pdf) and I can reference that information in my response."
    } else {
      return "I'm here to help with your coursework and assignments. Could you please provide more details about what you're working on? For example:\n\n- Which course is this for?\n- What specific topic or concept are you studying?\n- Are you working on an assignment, preparing for an exam, or trying to understand lecture material?\n\nThe more specific you can be, the better I can tailor my assistance to your needs."
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="flex h-full w-full">
      {/* Sidebar with conversation threads */}
      <div className="flex w-1/4 flex-col overflow-y-auto border-r border-divider">
        <div className="border-b border-divider p-3">
          <Button fullWidth color="primary" onPress={createNewThread} startContent={<Icon icon="lucide:plus" />}>
            New Chat
          </Button>
        </div>

        <div className="flex-grow overflow-y-auto">
          {threads.map((thread) => (
            <motion.div
              key={thread.id}
              whileHover={{ backgroundColor: 'var(--heroui-content1)' }}
              className={`cursor-pointer border-b border-divider p-3 ${selectedThread === thread.id ? 'bg-content1' : ''}`}
              onClick={() => setSelectedThread(thread.id)}
            >
              <div className="flex items-center gap-2">
                <Icon icon="lucide:message-circle" className={selectedThread === thread.id ? 'text-primary' : 'text-default-500'} />
                <div className="min-w-0 flex-grow">
                  <h4 className="truncate text-sm font-medium">{thread.title}</h4>
                  <p className="truncate text-xs text-default-500">
                    {thread.messages.length > 0
                      ? thread.messages[thread.messages.length - 1].content.substring(0, 50) +
                        (thread.messages[thread.messages.length - 1].content.length > 50 ? '...' : '')
                      : 'New conversation'}
                  </p>
                </div>
                <span className="whitespace-nowrap text-xs text-default-400">{formatDate(thread.lastUpdated)}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex h-full w-3/4 flex-col">
        {/* Chat header */}
        <div className="border-b border-divider p-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{currentThread.title}</h3>
            <div className="flex gap-1">
              <Tooltip content="Edit title">
                <Button isIconOnly size="sm" variant="light" aria-label="Edit conversation title">
                  <Icon icon="lucide:edit" size={18} />
                </Button>
              </Tooltip>
              <Tooltip content="Clear conversation">
                <Button isIconOnly size="sm" variant="light" aria-label="Clear conversation">
                  <Icon icon="lucide:trash-2" size={18} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow space-y-6 overflow-y-auto p-4">
          {currentThread.messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Icon icon="lucide:bot" className="mb-4 h-16 w-16 text-primary-200" />
              <h3 className="mb-2 text-xl font-medium">How can I help you today?</h3>
              <p className="mb-4 max-w-md text-default-500">
                Ask me about your coursework, assignments, or uploaded notes. I can help explain concepts, provide examples, or guide you through
                problem-solving.
              </p>
              <div className="grid max-w-md grid-cols-1 gap-2 md:grid-cols-2">
                <Button
                  variant="flat"
                  color="primary"
                  className="justify-start text-left"
                  startContent={<Icon icon="lucide:book-open" />}
                  onPress={() => setNewMessage('Explain the key concepts from my latest database lecture')}
                >
                  Explain lecture concepts
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  className="justify-start text-left"
                  startContent={<Icon icon="lucide:code" />}
                  onPress={() => setNewMessage('Help me debug my binary tree implementation')}
                >
                  Help with coding assignment
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  className="justify-start text-left"
                  startContent={<Icon icon="lucide:file-text" />}
                  onPress={() => setNewMessage('Summarize the key points from @Lecture3_DB.pdf')}
                >
                  Summarize uploaded notes
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  className="justify-start text-left"
                  startContent={<Icon icon="lucide:help-circle" />}
                  onPress={() => setNewMessage('Create practice questions for my algorithms quiz')}
                >
                  Generate practice questions
                </Button>
              </div>
            </div>
          ) : (
            <>
              {currentThread.messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar
                      src={
                        message.role === 'user'
                          ? 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1'
                          : 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10'
                      }
                      size="sm"
                      className={message.role === 'assistant' ? 'bg-primary-100' : ''}
                    />

                    <div className={`rounded-lg p-4 ${message.role === 'user' ? 'bg-primary-100 text-primary-700' : 'bg-default-100'}`}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{message.role === 'user' ? 'You' : 'AI Assistant'}</span>
                        <span className="ml-4 text-xs text-default-400">{formatTime(message.timestamp)}</span>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        {message.content.split('\n\n').map((paragraph, i) => (
                          <p key={i} className={`mb-2 ${message.role === 'user' ? '' : 'whitespace-pre-wrap'}`}>
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {message.role === 'assistant' && (
                        <div className="mt-2 flex justify-end gap-2">
                          <Button size="sm" variant="light" isIconOnly className="text-default-400 hover:text-primary">
                            <Icon icon="lucide:copy" size={16} />
                          </Button>
                          <Button size="sm" variant="light" isIconOnly className="text-default-400 hover:text-primary">
                            <Icon icon="lucide:thumbs-up" size={16} />
                          </Button>
                          <Button size="sm" variant="light" isIconOnly className="text-default-400 hover:text-primary">
                            <Icon icon="lucide:thumbs-down" size={16} />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] items-start gap-3">
                    <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=10" size="sm" className="bg-primary-100" />

                    <div className="rounded-lg bg-default-100 p-4">
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
                </div>
              )}

              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input area */}
        <div className="border-t border-divider p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Message AI Assistant..."
              fullWidth
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              startContent={<Icon icon="lucide:sparkles" className="text-primary" />}
              endContent={
                <div className="flex gap-1">
                  <Button isIconOnly size="sm" variant="light" aria-label="Attach file">
                    <Icon icon="lucide:paperclip" size={18} />
                  </Button>
                </div>
              }
            />
            <Button color="primary" isIconOnly aria-label="Send message" onPress={handleSendMessage} isDisabled={!newMessage.trim()}>
              <Icon icon="lucide:send" />
            </Button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Icon icon="lucide:info" className="text-default-400" size={16} />
            <span className="text-xs text-default-500">
              I can help with your coursework, assignments, and uploaded notes. Just mention the course name, file, or topic you need help with.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
