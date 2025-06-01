import React, { useEffect } from 'react'
import { Navbar } from './components/navbar'
import { WelcomeSection } from './components/welcome-section'
import { WeeklyCalendar } from './components/calendar'
import { UpcomingAssignments } from './components/assessments'
import { RecentGrades } from './components/current-semester'
import { NotesAndFiles } from './components/notes-files'
import { motion, AnimatePresence } from 'framer-motion'
import { AcademicTimeline } from './components/timeline'
import { Conversations } from './components/conversations'
import { MotivationalFooter } from './components/motivational-footer'
import { FloatingChat } from './components/floating-chat'
import { FloatingResources } from './components/floating-resources'
import { Spinner } from '@heroui/react'

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true)

  // Refs for smooth scrolling to sections
  const sectionRefs = {
    calendar: React.useRef<HTMLDivElement>(null),
    assignments: React.useRef<HTMLDivElement>(null),
    grades: React.useRef<HTMLDivElement>(null),
    notes: React.useRef<HTMLDivElement>(null),
    timeline: React.useRef<HTMLDivElement>(null),
    conversations: React.useRef<HTMLDivElement>(null),
  }

  // Simulate initial loading of resources
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Smooth scroll to section with navbar offset
  const scrollToSection = (section: keyof typeof sectionRefs) => {
    const element = sectionRefs[section].current
    if (element) {
      const navbarHeight = 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated background blobs */}
      <div className="blob-1" />
      <div className="blob-2" />
      <div className="blob-3" />

      {/* Loading overlay with blur effect */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="flex flex-col items-center gap-4"
            >
              <Spinner size="lg" color="primary" />
              <p className="text-lg font-medium text-default-600">Loading Portal...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content with conditional blur during loading */}
      <div className={isLoading ? 'blur-sm' : ''}>
        <Navbar onNavigate={scrollToSection} />

        <main className="container mx-auto max-w-6xl px-4 pt-24">
          {/* Welcome section with fade-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: isLoading ? 0.5 : 0 }}
            className="scroll-mt-24"
          >
            <WelcomeSection />
          </motion.div>

          {/* Calendar section with scroll-triggered animation */}
          <motion.div
            ref={sectionRefs.calendar}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: isLoading ? 0.6 : 0.1 }}
            className="mt-8 scroll-mt-24"
          >
            <WeeklyCalendar />
          </motion.div>

          {/* Assignments section with scroll-triggered animation */}
          <motion.div
            ref={sectionRefs.assignments}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: isLoading ? 0.7 : 0.1 }}
            className="mt-12 scroll-mt-24"
          >
            <UpcomingAssignments />
          </motion.div>

          {/* Grades section with scroll-triggered animation */}
          <motion.div
            ref={sectionRefs.grades}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: isLoading ? 0.8 : 0.1 }}
            className="mt-12 scroll-mt-24"
          >
            <RecentGrades />
          </motion.div>

          {/* Timeline section with scroll-triggered animation */}
          <motion.div
            ref={sectionRefs.timeline}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: isLoading ? 0.9 : 0.1 }}
            className="mt-12 scroll-mt-24"
          >
            <AcademicTimeline />
          </motion.div>
        </main>

        {/* Floating components and footer */}
        <MotivationalFooter />
        <FloatingChat />
        <FloatingResources />
      </div>
    </div>
  )
}

export default App
