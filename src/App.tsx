import React from "react";
import { Navbar } from "./components/navbar";
import { WelcomeSection } from "./components/welcome-section";
import { WeeklyCalendar } from "./components/weekly-calendar";
import { UpcomingAssignments } from "./components/upcoming-assignments";
import { RecentGrades } from "./components/recent-grades";
import { NotesAndFiles } from "./components/notes-files";
import { ScrollToTop } from "./components/scroll-to-top";
import { motion } from "framer-motion";
import { AcademicTimeline } from "./components/academic-timeline";
import { Conversations } from "./components/conversations";
import { MotivationalFooter } from "./components/motivational-footer";
import { FloatingChat } from "./components/floating-chat";
import { FloatingResources } from "./components/floating-resources";

const App: React.FC = () => {
  const sectionRefs = {
    calendar: React.useRef<HTMLDivElement>(null),
    assignments: React.useRef<HTMLDivElement>(null),
    grades: React.useRef<HTMLDivElement>(null),
    notes: React.useRef<HTMLDivElement>(null),
    timeline: React.useRef<HTMLDivElement>(null),
    conversations: React.useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (section: keyof typeof sectionRefs) => {
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={scrollToSection} />
      
      <main className="container mx-auto px-4 pt-16 pb-24 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WelcomeSection />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.calendar}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <WeeklyCalendar />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.assignments}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <UpcomingAssignments />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.grades}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <RecentGrades />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.notes}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <NotesAndFiles />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.timeline}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <AcademicTimeline />
        </motion.div>
        
        <motion.div 
          ref={sectionRefs.conversations}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          <Conversations />
        </motion.div>
      </main>
      
      <MotivationalFooter />
      <ScrollToTop />
      <FloatingChat />
      <FloatingResources />
    </div>
  );
};

export default App;