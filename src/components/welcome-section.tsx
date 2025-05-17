import React, { useState } from 'react'
import { Card, CardBody, Popover, PopoverTrigger, PopoverContent } from '@heroui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

export const WelcomeSection: React.FC = () => {
  const [isClassOpen, setIsClassOpen] = useState(false)
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false)

  const isAnyPopoverOpen = isClassOpen || isAssignmentOpen

  return (
    <>
      {/* Global backdrop blur overlay */}
      <AnimatePresence>
        {isAnyPopoverOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <div className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary-100/30 to-background" />

        <Card className="relative z-50 border-none bg-background/60 shadow-none backdrop-blur-sm">
          <CardBody className="p-6">
            <div className="flex flex-col items-center gap-6">
              {/* Avatar */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary sm:h-24 sm:w-24">
                  <Icon icon="lucide:bot" width={40} height={40} className="sm:h-12 sm:w-12" />
                </div>
              </motion.div>

              {/* Welcome message */}
              <div className="text-center">
                <motion.h1
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-2 text-2xl font-bold text-foreground"
                >
                  Welcome back, Rawfin! 👋
                </motion.h1>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-default-600"
                >
                  You have <span className="font-semibold text-primary">2 classes</span> today and{' '}
                  <span className="font-semibold text-warning">1 assignment</span> due in <span className="font-semibold text-danger">5h 40m</span>!
                </motion.p>
              </div>

              {/* Quick info with popovers */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {/* Class popover */}
                <Popover isOpen={isClassOpen} onOpenChange={setIsClassOpen} placement="bottom">
                  <PopoverTrigger>
                    <button className="flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-sm text-primary-600 transition-colors hover:bg-primary-100">
                      <Icon icon="lucide:book-open" />
                      <span>Advanced Algorithms (10:30 AM)</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 border-none bg-background/95 p-4 shadow-none backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">Advanced Algorithms</h3>
                          <p className="text-sm text-default-500">CS 401 - Section A</p>
                        </div>
                        <div className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700">Next</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:clock" className="h-4 w-4" />
                          <span>10:30 AM - 12:00 PM</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:map-pin" className="h-4 w-4" />
                          <span>Room 302, Computer Science Building</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:user" className="h-4 w-4" />
                          <span>Prof. Sarah Johnson</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button className="w-full rounded-lg bg-primary-50 px-3 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100">
                          View Course Details
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Assignment popover */}
                <Popover isOpen={isAssignmentOpen} onOpenChange={setIsAssignmentOpen} placement="bottom">
                  <PopoverTrigger>
                    <button className="flex items-center gap-2 rounded-full bg-warning-50 px-3 py-1.5 text-sm text-warning-600 transition-colors hover:bg-warning-100">
                      <Icon icon="lucide:clock" />
                      <span>Data Structures Project</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 border-none bg-background/95 p-4 shadow-none backdrop-blur-sm">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">Data Structures Project</h3>
                          <p className="text-sm text-default-500">CS 301 - Final Project</p>
                        </div>
                        <div className="rounded-full bg-warning-100 px-2 py-0.5 text-xs font-medium text-warning-700">Due Soon</div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:clock" className="h-4 w-4" />
                          <span>Due in 5h 40m (Today, 11:59 PM)</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:file-text" className="h-4 w-4" />
                          <span>Implementation of AVL Trees</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-600">
                          <Icon icon="lucide:percent" className="h-4 w-4" />
                          <span>Worth 25% of final grade</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <button className="w-full rounded-lg bg-warning-50 px-3 py-2 text-sm font-medium text-warning-600 transition-colors hover:bg-warning-100">
                          View Assignment Details
                        </button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </motion.div>
            </div>
          </CardBody>
        </Card>
      </div>
    </>
  )
}
