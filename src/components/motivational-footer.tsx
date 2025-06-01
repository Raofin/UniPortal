import React from 'react'
import { Card, CardBody, Button, Progress, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion'

// Core interfaces for motivational features
interface Quote {
  id: number
  text: string
  author: string
}

interface MoodEntry {
  date: Date
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible'
  reflection?: string
}

export const MotivationalFooter: React.FC = () => {
  // State management for quotes and reflections
  const [currentQuoteIndex, setCurrentQuoteIndex] = React.useState(0)
  const [showReflection, setShowReflection] = React.useState(false)
  const [reflection, setReflection] = React.useState('')
  const [currentMood, setCurrentMood] = React.useState<MoodEntry['mood'] | null>(null)

  // Initialize mood history with sample data
  const [moodHistory, setMoodHistory] = React.useState<MoodEntry[]>([
    { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), mood: 'good' },
    { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), mood: 'great' },
    { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), mood: 'okay' },
    { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), mood: 'good' },
    { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), mood: 'bad' },
    { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), mood: 'okay' },
  ])

  // Collection of motivational quotes
  const quotes: Quote[] = [
    {
      id: 1,
      text: 'The only way to do great work is to love what you do.',
      author: 'Steve Jobs',
    },
    {
      id: 2,
      text: 'Education is the most powerful weapon which you can use to change the world.',
      author: 'Nelson Mandela',
    },
    {
      id: 3,
      text: 'The beautiful thing about learning is that no one can take it away from you.',
      author: 'B.B. King',
    },
    {
      id: 4,
      text: 'The expert in anything was once a beginner.',
      author: 'Helen Hayes',
    },
    {
      id: 5,
      text: "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
      author: 'Dr. Seuss',
    },
  ]

  // Daily reflection prompts
  const reflectionPrompts = [
    "What's one thing you're proud of today?",
    'What was your biggest challenge today?',
    "What's something new you learned today?",
    'What are you looking forward to tomorrow?',
    "What's one way you helped someone today?",
  ]

  const [currentPrompt, setCurrentPrompt] = React.useState(reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)])

  // Auto-rotate quotes every 10 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [quotes.length])

  // Handle mood selection and update history
  const handleMoodSelection = (mood: MoodEntry['mood']) => {
    setCurrentMood(mood)

    if (mood) {
      const today = new Date()
      const todayEntry = moodHistory.find(
        (entry) =>
          entry.date.getDate() === today.getDate() && entry.date.getMonth() === today.getMonth() && entry.date.getFullYear() === today.getFullYear(),
      )

      if (todayEntry) {
        setMoodHistory(moodHistory.map((entry) => (entry === todayEntry ? { ...entry, mood } : entry)))
      } else {
        setMoodHistory([...moodHistory, { date: today, mood }])
      }
    }
  }

  // Handle reflection submission
  const handleReflectionSubmit = () => {
    if (reflection.trim() && currentMood) {
      const today = new Date()
      const todayEntry = moodHistory.find(
        (entry) =>
          entry.date.getDate() === today.getDate() && entry.date.getMonth() === today.getMonth() && entry.date.getFullYear() === today.getFullYear(),
      )

      if (todayEntry) {
        setMoodHistory(moodHistory.map((entry) => (entry === todayEntry ? { ...entry, mood: currentMood, reflection: reflection.trim() } : entry)))
      } else {
        setMoodHistory([
          ...moodHistory,
          {
            date: today,
            mood: currentMood,
            reflection: reflection.trim(),
          },
        ])
      }

      setReflection('')
      setShowReflection(false)
      setCurrentPrompt(reflectionPrompts[Math.floor(Math.random() * reflectionPrompts.length)])
    }
  }

  // Utility functions for mood display
  const getMoodIcon = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'great':
        return <Icon icon="lucide:smile" className="text-success" />
      case 'good':
        return <Icon icon="lucide:smile" className="text-primary" />
      case 'okay':
        return <Icon icon="lucide:meh" className="text-warning" />
      case 'bad':
        return <Icon icon="lucide:frown" className="text-danger" />
      case 'terrible':
        return <Icon icon="lucide:frown" className="text-danger" />
      default:
        return <Icon icon="lucide:help-circle" className="text-default-500" />
    }
  }

  const getMoodColor = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'great':
        return 'success'
      case 'good':
        return 'primary'
      case 'okay':
        return 'warning'
      case 'bad':
        return 'danger'
      case 'terrible':
        return 'danger'
      default:
        return 'default'
    }
  }

  const getMoodValue = (mood: MoodEntry['mood']) => {
    switch (mood) {
      case 'great':
        return 100
      case 'good':
        return 75
      case 'okay':
        return 50
      case 'bad':
        return 25
      case 'terrible':
        return 0
      default:
        return 0
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { weekday: 'short' })
  }

  return (
    <div className="float-buttons:mb-6 container mx-auto mb-24 mt-12 max-w-6xl px-4">
      <Card className="bg-gradient-to-r from-primary-50 to-background shadow-sm">
        <CardBody className="overflow-hidden p-6">
          <div className="flex flex-col gap-6 md:flex-row">
            {/* Daily motivational quote section */}
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Icon icon="lucide:sparkles" className="text-primary" />
                Today's Spark
              </h2>

              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-lg p-6 pb-0">
                {/* Decorative quote marks and sparkles */}
                <div className="absolute right-2 top-2 text-5xl text-primary-100/40">
                  <Icon icon="lucide:quote" />
                </div>
                <div className="absolute bottom-16 left-2 rotate-180 text-5xl text-primary-100/40">
                  <Icon icon="lucide:quote" />
                </div>
                <div className="absolute bottom-20 right-1/2 -translate-y-1/2 translate-x-1/2 text-7xl text-primary-100/20">
                  <Icon icon="lucide:sparkles" />
                </div>

                <div className="relative flex h-full flex-col">
                  <div className="min-h relative px-4 pt-44">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentQuoteIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col justify-center"
                      >
                        <blockquote className="relative z-10 text-lg italic text-default-700">"{quotes[currentQuoteIndex].text}"</blockquote>
                        <footer className="relative z-10 mt-3 text-sm font-medium text-default-500">— {quotes[currentQuoteIndex].author}</footer>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Animated floating particles */}
                <div className="pointer-events-none absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-primary-100/30"
                      initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: [null, Math.random() * 20 - 10],
                        x: [null, Math.random() * 20 - 10],
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        ease: 'easeInOut',
                      }}
                    >
                      <Icon icon="lucide:sparkles" className="h-4 w-4" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Daily reflection and mood tracking section */}
            <div className="w-full md:w-1/2">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Icon icon="lucide:heart-handshake" className="text-primary" />
                Daily Reflection
              </h2>

              {!showReflection ? (
                <div className="mb-4">
                  <p className="mb-3 text-default-600">{currentPrompt}</p>

                  <Button color="primary" variant="flat" onPress={() => setShowReflection(true)} startContent={<Icon icon="lucide:edit-3" />}>
                    Add Reflection
                  </Button>
                </div>
              ) : (
                <div className="mb-4">
                  <textarea
                    className="mb-3 w-full rounded-lg border border-divider bg-background p-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="Write your reflection here..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                  ></textarea>

                  <div className="flex gap-2">
                    <Button color="primary" onPress={handleReflectionSubmit} isDisabled={!reflection.trim() || !currentMood}>
                      Save
                    </Button>
                    <Button variant="flat" onPress={() => setShowReflection(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <p className="mb-2 text-sm text-default-600">How are you feeling today?</p>

                {/* Mood selection buttons */}
                <div className="mb-4 flex gap-2">
                  <Tooltip content="Great">
                    <Button
                      isIconOnly
                      variant={currentMood === 'great' ? 'solid' : 'light'}
                      color={currentMood === 'great' ? 'success' : 'default'}
                      onPress={() => handleMoodSelection('great')}
                      aria-label="Feeling great"
                    >
                      <Icon icon="lucide:smile" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Good">
                    <Button
                      isIconOnly
                      variant={currentMood === 'good' ? 'solid' : 'light'}
                      color={currentMood === 'good' ? 'primary' : 'default'}
                      onPress={() => handleMoodSelection('good')}
                      aria-label="Feeling good"
                    >
                      <Icon icon="lucide:smile" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Okay">
                    <Button
                      isIconOnly
                      variant={currentMood === 'okay' ? 'solid' : 'light'}
                      color={currentMood === 'okay' ? 'warning' : 'default'}
                      onPress={() => handleMoodSelection('okay')}
                      aria-label="Feeling okay"
                    >
                      <Icon icon="lucide:meh" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Bad">
                    <Button
                      isIconOnly
                      variant={currentMood === 'bad' ? 'solid' : 'light'}
                      color={currentMood === 'bad' ? 'danger' : 'default'}
                      onPress={() => handleMoodSelection('bad')}
                      aria-label="Feeling bad"
                    >
                      <Icon icon="lucide:frown" />
                    </Button>
                  </Tooltip>

                  <Tooltip content="Terrible">
                    <Button
                      isIconOnly
                      variant={currentMood === 'terrible' ? 'solid' : 'light'}
                      color={currentMood === 'terrible' ? 'danger' : 'default'}
                      onPress={() => handleMoodSelection('terrible')}
                      aria-label="Feeling terrible"
                    >
                      <Icon icon="lucide:frown" />
                    </Button>
                  </Tooltip>
                </div>

                {/* Weekly mood history visualization */}
                <div>
                  <p className="mb-2 text-sm text-default-600">Your mood this week:</p>

                  <div className="flex items-center gap-1">
                    {moodHistory.map((entry, index) => (
                      <Tooltip key={index} content={`${formatDate(entry.date)}: ${entry.mood}${entry.reflection ? ` - "${entry.reflection}"` : ''}`}>
                        <div className="flex-1">
                          <div className="flex flex-col items-center">
                            <Progress
                              aria-label={`Mood for ${formatDate(entry.date)}`}
                              value={getMoodValue(entry.mood)}
                              color={getMoodColor(entry.mood) as any}
                              className="h-8"
                              showValueLabel={false}
                            />
                            <span className="mt-1 text-xs">{formatDate(entry.date)}</span>
                          </div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
