import React from "react";
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button, 
  Badge, 
  Chip,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "grade" | "assignment" | "message";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  course?: string;
  link?: string;
}

export const NotificationCenter: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<"all" | "grade" | "assignment" | "message">("all");
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "n1",
      type: "grade",
      title: "New Grade Released",
      description: "Your midterm exam for Advanced Algorithms has been graded.",
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isRead: false,
      course: "CS301: Advanced Algorithms"
    },
    {
      id: "n2",
      type: "assignment",
      title: "Assignment Due Soon",
      description: "Data Structures Project is due in 5 hours and 40 minutes.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isRead: false,
      course: "CS202: Data Structures"
    },
    {
      id: "n3",
      type: "message",
      title: "New Message from Prof. Johnson",
      description: "Don't forget to submit your assignments by Friday!",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      isRead: true,
      course: "CS301: Advanced Algorithms"
    },
    {
      id: "n4",
      type: "grade",
      title: "New Grade Released",
      description: "Your Project 1 for Database Systems has been graded.",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isRead: true,
      course: "CS305: Database Systems"
    },
    {
      id: "n5",
      type: "assignment",
      title: "Assignment Deadline Passed",
      description: "The deadline for Computer Networks Lab Report has passed.",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      isRead: true,
      course: "CS304: Computer Networks"
    }
  ]);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;
  
  const filteredNotifications = selectedType === "all" 
    ? notifications 
    : notifications.filter(n => n.type === selectedType);
  
  const handleNotificationClick = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grade":
        return <Icon icon="lucide:award" className="text-success" />;
      case "assignment":
        return <Icon icon="lucide:clipboard-list" className="text-warning" />;
      case "message":
        return <Icon icon="lucide:message-circle" className="text-primary" />;
      default:
        return <Icon icon="lucide:bell" className="text-default-500" />;
    }
  };
  
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <Dropdown 
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-end"
    >
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          aria-label={`${unreadCount} unread notifications`}
          className="relative"
        >
          <Icon icon="lucide:bell" className="text-default-600" />
          {unreadCount > 0 && (
            <Badge 
              content={unreadCount > 9 ? "9+" : unreadCount} 
              color="danger" 
              shape="circle"
              size="sm"
              className="absolute -top-1 -right-1"
            />
          )}
        </Button>
      </DropdownTrigger>
      
      <DropdownMenu 
        aria-label="Notifications" 
        className="p-0 w-80 sm:w-96"
        onAction={(key) => {
          if (key === "mark-all-read") {
            markAllAsRead();
          } else {
            setSelectedType(key as any);
          }
        }}
      >
        <div className="p-3 border-b border-divider">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Notifications</h3>
            <Button 
              size="sm" 
              variant="light" 
              onPress={markAllAsRead}
              isDisabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant={selectedType === "all" ? "flat" : "light"}
              color={selectedType === "all" ? "primary" : "default"}
              className="flex-1"
              onPress={() => setSelectedType("all")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={selectedType === "grade" ? "flat" : "light"}
              color={selectedType === "grade" ? "success" : "default"}
              className="flex-1"
              startContent={<Icon icon="lucide:award" />}
              onPress={() => setSelectedType("grade")}
            >
              Grades
            </Button>
            <Button
              size="sm"
              variant={selectedType === "assignment" ? "flat" : "light"}
              color={selectedType === "assignment" ? "warning" : "default"}
              className="flex-1"
              startContent={<Icon icon="lucide:clipboard-list" />}
              onPress={() => setSelectedType("assignment")}
            >
              Assignments
            </Button>
            <Button
              size="sm"
              variant={selectedType === "message" ? "flat" : "light"}
              color={selectedType === "message" ? "primary" : "default"}
              className="flex-1"
              startContent={<Icon icon="lucide:message-circle" />}
              onPress={() => setSelectedType("message")}
            >
              Messages
            </Button>
          </div>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <DropdownItem
                    key={notification.id}
                    textValue={notification.title}
                    className={`py-3 ${!notification.isRead ? "bg-primary-50 dark:bg-primary-900/20" : ""}`}
                    onClick={() => handleNotificationClick(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className={`p-2 rounded-full ${
                        notification.type === "grade" ? "bg-success-100 text-success-500" :
                        notification.type === "assignment" ? "bg-warning-100 text-warning-500" :
                        "bg-primary-100 text-primary-500"
                      }`}>
                        {getTypeIcon(notification.type)}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm ${!notification.isRead ? "font-medium" : ""}`}>
                            {notification.title}
                          </h4>
                          <span className="text-xs text-default-400">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        
                        <p className="text-xs text-default-500 mt-1">
                          {notification.description}
                        </p>
                        
                        {notification.course && (
                          <div className="mt-2">
                            <Chip size="sm" variant="flat" color="primary" className="text-xs">
                              {notification.course}
                            </Chip>
                          </div>
                        )}
                      </div>
                      
                      {!notification.isRead && (
                        <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                      )}
                    </div>
                  </DropdownItem>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="py-8 text-center">
              <Icon icon="lucide:check-circle" className="w-10 h-10 mx-auto text-default-300 mb-2" />
              <p className="text-default-500">No notifications to display</p>
              {selectedType !== "all" && (
                <Button 
                  size="sm" 
                  variant="light" 
                  color="primary" 
                  className="mt-2"
                  onPress={() => setSelectedType("all")}
                >
                  Show all notifications
                </Button>
              )}
            </div>
          )}
        </div>
        
        <div className="p-2 border-t border-divider">
          <Button
            size="sm"
            variant="light"
            className="w-full"
            onPress={() => setIsOpen(false)}
          >
            View all notifications
          </Button>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};