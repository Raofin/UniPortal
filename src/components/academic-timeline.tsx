import React from "react";
import { Card, CardBody, CardHeader, Button, Tooltip, Chip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { format, addDays, isSameDay, differenceInDays } from "date-fns";

interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  type: "assignment" | "exam" | "holiday" | "semester-break" | "class";
  course?: string;
  description?: string;
  time?: string;
  location?: string;
}

export const AcademicTimeline: React.FC = () => {
  const today = new Date();
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const [filters, setFilters] = React.useState({
    assignment: true,
    exam: true,
    holiday: true,
    semesterBreak: true,
    class: true
  });
  
  // Generate 30 days of events
  const generateEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    
    // Add assignments
    events.push({
      id: "a1",
      date: addDays(today, 2),
      title: "Data Structures Project",
      type: "assignment",
      course: "CS202: Data Structures",
      description: "Implement a balanced binary search tree with insertion, deletion, and traversal operations."
    });
    
    events.push({
      id: "a2",
      date: addDays(today, 5),
      title: "Database Design",
      type: "assignment",
      course: "CS305: Database Systems",
      description: "Design a normalized database schema for a library management system with at least 5 entities."
    });
    
    events.push({
      id: "a3",
      date: addDays(today, 12),
      title: "Algorithm Analysis",
      type: "assignment",
      course: "CS301: Advanced Algorithms",
      description: "Analyze the time and space complexity of the provided sorting algorithms and submit a report."
    });
    
    // Add exams
    events.push({
      id: "e1",
      date: addDays(today, 7),
      title: "Midterm Exam",
      type: "exam",
      course: "CS202: Data Structures",
      description: "Covers chapters 1-5 from the textbook. Focus on tree and graph algorithms.",
      time: "10:00 AM - 12:00 PM",
      location: "Room 301"
    });
    
    events.push({
      id: "e2",
      date: addDays(today, 15),
      title: "Final Project Presentation",
      type: "exam",
      course: "CS305: Database Systems",
      description: "Present your database design project to the class.",
      time: "2:00 PM - 4:00 PM",
      location: "Room 201"
    });
    
    // Add holidays
    events.push({
      id: "h1",
      date: addDays(today, 10),
      title: "University Foundation Day",
      type: "holiday",
      description: "University closed for Foundation Day celebrations."
    });
    
    // Add semester break
    events.push({
      id: "sb1",
      date: addDays(today, 25),
      title: "Fall Break Begins",
      type: "semester-break",
      description: "Fall semester break. Classes resume on November 2nd."
    });
    
    // Add regular classes (for today and a few other days)
    events.push({
      id: "c1",
      date: today,
      title: "Advanced Algorithms",
      type: "class",
      course: "CS301",
      time: "10:30 AM - 12:00 PM",
      location: "Room 301"
    });
    
    events.push({
      id: "c2",
      date: today,
      title: "Database Systems",
      type: "class",
      course: "CS305",
      time: "2:00 PM - 3:30 PM",
      location: "Online (Zoom)"
    });
    
    events.push({
      id: "c3",
      date: addDays(today, 1),
      title: "Data Structures",
      type: "class",
      course: "CS202",
      time: "9:00 AM - 10:30 AM",
      location: "Room 201"
    });
    
    events.push({
      id: "c4",
      date: addDays(today, 3),
      title: "Computer Networks Lab",
      type: "class",
      course: "CS304",
      time: "1:00 PM - 3:00 PM",
      location: "Lab 102"
    });
    
    // Add a few more events in the past for context
    events.push({
      id: "p1",
      date: addDays(today, -2),
      title: "Quiz 2",
      type: "exam",
      course: "CS301: Advanced Algorithms",
      description: "Short quiz covering recent topics.",
      time: "11:00 AM - 11:30 AM",
      location: "Room 301"
    });
    
    events.push({
      id: "p2",
      date: addDays(today, -5),
      title: "Lab Report Submission",
      type: "assignment",
      course: "CS304: Computer Networks",
      description: "Submit the report for Lab 3: Network Protocols."
    });
    
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  };
  
  const [events] = React.useState<TimelineEvent[]>(generateEvents());
  
  // Group events by date
  const eventsByDate = React.useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {};
    
    events.forEach(event => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    return grouped;
  }, [events]);
  
  // Filter events based on selected filters
  const filteredEvents = React.useMemo(() => {
    return events.filter(event => {
      switch (event.type) {
        case "assignment":
          return filters.assignment;
        case "exam":
          return filters.exam;
        case "holiday":
          return filters.holiday;
        case "semester-break":
          return filters.semesterBreak;
        case "class":
          return filters.class;
        default:
          return true;
      }
    });
  }, [events, filters]);
  
  // Group filtered events by date
  const filteredEventsByDate = React.useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {};
    
    filteredEvents.forEach(event => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(event);
    });
    
    return grouped;
  }, [filteredEvents]);
  
  // Scroll to today's date when component mounts or filters change
  React.useEffect(() => {
    if (timelineRef.current) {
      // Find today's date element
      const todayElement = timelineRef.current.querySelector('[data-today="true"]');
      if (todayElement) {
        // Scroll to the element with a small offset
        todayElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [filters]);
  
  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <Icon icon="lucide:clipboard-list" className="text-primary" />;
      case "exam":
        return <Icon icon="lucide:file-text" className="text-danger" />;
      case "holiday":
        return <Icon icon="lucide:palm-tree" className="text-success" />;
      case "semester-break":
        return <Icon icon="lucide:calendar-off" className="text-warning" />;
      case "class":
        return <Icon icon="lucide:book-open" className="text-default-600" />;
      default:
        return <Icon icon="lucide:calendar" className="text-default-500" />;
    }
  };
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "primary";
      case "exam":
        return "danger";
      case "holiday":
        return "success";
      case "semester-break":
        return "warning";
      default:
        return "default";
    }
  };
  
  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Academic Timeline</h2>
          <Button
            variant="light"
            startContent={<Icon icon="lucide:filter" />}
          >
            Filters
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={filters.assignment ? "flat" : "light"}
            color={filters.assignment ? "primary" : "default"}
            startContent={<Icon icon="lucide:clipboard-list" />}
            onPress={() => toggleFilter("assignment")}
          >
            Assignments
          </Button>
          <Button
            size="sm"
            variant={filters.exam ? "flat" : "light"}
            color={filters.exam ? "danger" : "default"}
            startContent={<Icon icon="lucide:file-text" />}
            onPress={() => toggleFilter("exam")}
          >
            Exams
          </Button>
          <Button
            size="sm"
            variant={filters.holiday ? "flat" : "light"}
            color={filters.holiday ? "success" : "default"}
            startContent={<Icon icon="lucide:palm-tree" />}
            onPress={() => toggleFilter("holiday")}
          >
            Holidays
          </Button>
          <Button
            size="sm"
            variant={filters.semesterBreak ? "flat" : "light"}
            color={filters.semesterBreak ? "warning" : "default"}
            startContent={<Icon icon="lucide:calendar-off" />}
            onPress={() => toggleFilter("semesterBreak")}
          >
            Breaks
          </Button>
          <Button
            size="sm"
            variant={filters.class ? "flat" : "light"}
            color={filters.class ? "default" : "default"}
            startContent={<Icon icon="lucide:book-open" />}
            onPress={() => toggleFilter("class")}
          >
            Classes
          </Button>
        </div>
      </CardHeader>
      
      <CardBody>
        <div 
          ref={timelineRef}
          className="relative max-h-[500px] overflow-y-auto pr-2"
        >
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-default-200 z-0"></div>
          
          {Object.entries(filteredEventsByDate).map(([dateKey, dateEvents]) => {
            const date = new Date(dateKey);
            const isToday = isSameDay(date, today);
            const isPast = date < today;
            const isFuture = date > today;
            
            return (
              <div 
                key={dateKey}
                className="relative mb-6"
                data-today={isToday}
              >
                {/* Date header */}
                <div className={`flex items-center mb-2 ${isToday ? "sticky top-0 z-10 bg-background pb-2" : ""}`}>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      isToday 
                        ? "bg-primary text-white ring-4 ring-primary-100" 
                        : isPast 
                          ? "bg-default-100 text-default-500" 
                          : "bg-default-100 text-default-700"
                    }`}
                  >
                    <span className="text-sm font-medium">{format(date, "d")}</span>
                  </div>
                  
                  <div className="ml-4">
                    <h3 className={`font-medium ${isToday ? "text-primary" : ""}`}>
                      {isToday ? "Today" : format(date, "EEEE, MMMM d")}
                    </h3>
                    {isToday && (
                      <motion.div
                        animate={{ 
                          boxShadow: ['0 0 0 rgba(99, 102, 241, 0)', '0 0 8px rgba(99, 102, 241, 0.5)', '0 0 0 rgba(99, 102, 241, 0)'] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2 
                        }}
                      >
                        <Chip size="sm" color="primary" variant="flat">Today</Chip>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Events for this date */}
                <div className="ml-4 pl-8 space-y-3">
                  {dateEvents.map((event, eventIndex) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: eventIndex % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.3, delay: eventIndex * 0.1 }}
                      className="relative"
                    >
                      {/* Connector line to main timeline */}
                      <div className="absolute -left-8 top-4 w-6 h-0.5 bg-default-200"></div>
                      
                      {/* Event dot */}
                      <div className={`absolute -left-10 top-3 w-4 h-4 rounded-full border-2 border-background ${
                        event.type === "assignment" ? "bg-primary" :
                        event.type === "exam" ? "bg-danger" :
                        event.type === "holiday" ? "bg-success" :
                        event.type === "semester-break" ? "bg-warning" :
                        "bg-default-400"
                      }`}></div>
                      
                      <Card shadow="sm" className="border border-divider">
                        <CardBody className="p-3">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-md ${
                              event.type === "assignment" ? "bg-primary-100 text-primary-500" :
                              event.type === "exam" ? "bg-danger-100 text-danger-500" :
                              event.type === "holiday" ? "bg-success-100 text-success-500" :
                              event.type === "semester-break" ? "bg-warning-100 text-warning-500" :
                              "bg-default-100 text-default-600"
                            }`}>
                              {getEventTypeIcon(event.type)}
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{event.title}</h4>
                                  {event.course && (
                                    <p className="text-xs text-default-500">{event.course}</p>
                                  )}
                                </div>
                                
                                <Chip 
                                  size="sm" 
                                  color={getEventTypeColor(event.type) as any}
                                  variant="flat"
                                >
                                  {event.type.replace("-", " ")}
                                </Chip>
                              </div>
                              
                              {event.description && (
                                <p className="text-sm text-default-600 mt-2">{event.description}</p>
                              )}
                              
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                                {event.time && (
                                  <div className="flex items-center gap-1 text-xs text-default-500">
                                    <Icon icon="lucide:clock" size={12} />
                                    <span>{event.time}</span>
                                  </div>
                                )}
                                
                                {event.location && (
                                  <div className="flex items-center gap-1 text-xs text-default-500">
                                    <Icon icon="lucide:map-pin" size={12} />
                                    <span>{event.location}</span>
                                  </div>
                                )}
                                
                                <div className="flex items-center gap-1 text-xs text-default-500">
                                  <Icon icon="lucide:calendar" size={12} />
                                  <span>
                                    {isToday ? "Today" : 
                                     isSameDay(date, addDays(today, 1)) ? "Tomorrow" :
                                     isSameDay(date, addDays(today, -1)) ? "Yesterday" :
                                     format(date, "MMM d")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
          
          {Object.keys(filteredEventsByDate).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Icon icon="lucide:calendar-x" className="w-16 h-16 text-default-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">No events to display</h3>
              <p className="text-default-500 max-w-md mb-4">
                Try adjusting your filters to see more events
              </p>
              <Button
                color="primary"
                variant="flat"
                onPress={() => setFilters({
                  assignment: true,
                  exam: true,
                  holiday: true,
                  semesterBreak: true,
                  class: true
                })}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};