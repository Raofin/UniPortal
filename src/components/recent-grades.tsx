import React from 'react'
import { Card, CardBody, CardHeader, Chip, Button, Tabs, Tab, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts'

interface Grade {
  id: string
  course: string
  assessment: string
  score: number
  totalScore: number
  grade: string
  date: string
}

interface Assessment {
  id: string
  name: string
  weight: number
  score?: number
  totalScore: number
  status: 'completed' | 'pending' | 'unavailable'
}

interface Course {
  id: string
  name: string
  code: string
  instructor: string
  credits: number
  assessments: {
    midterm: Assessment[]
    final: Assessment[]
  }
}

export const RecentGrades: React.FC = () => {
  const [selected, setSelected] = React.useState<'byDate' | 'byCourse'>('byDate')

  const courses: Course[] = [
    {
      id: 'cs301',
      name: 'Advanced Algorithms',
      code: 'CS301',
      instructor: 'Prof. Johnson',
      credits: 4,
      assessments: {
        midterm: [
          {
            id: 'a1',
            name: 'Attendance',
            weight: 10,
            score: 9,
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'a2',
            name: 'Assignments',
            weight: 20,
            score: 18,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'a3',
            name: 'Quizzes',
            weight: 20,
            score: 17,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'a4',
            name: 'Midterm Exam',
            weight: 40,
            score: 34,
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'a5',
            name: 'Presentation',
            weight: 10,
            score: 8,
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'a6',
            name: 'Attendance',
            weight: 10,
            status: 'pending',
            totalScore: 10,
          },
          {
            id: 'a7',
            name: 'Assignments',
            weight: 20,
            status: 'pending',
            totalScore: 20,
          },
          {
            id: 'a8',
            name: 'Quizzes',
            weight: 20,
            status: 'unavailable',
            totalScore: 20,
          },
          {
            id: 'a9',
            name: 'Final Exam',
            weight: 40,
            status: 'unavailable',
            totalScore: 40,
          },
          {
            id: 'a10',
            name: 'Project',
            weight: 10,
            status: 'unavailable',
            totalScore: 10,
          },
        ],
      },
    },
    {
      id: 'cs305',
      name: 'Database Systems',
      code: 'CS305',
      instructor: 'Dr. Smith',
      credits: 3,
      assessments: {
        midterm: [
          {
            id: 'b1',
            name: 'Attendance',
            weight: 10,
            score: 10,
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'b2',
            name: 'Assignments',
            weight: 20,
            score: 19,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'b3',
            name: 'Quizzes',
            weight: 20,
            score: 16,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'b4',
            name: 'Midterm Exam',
            weight: 40,
            score: 38,
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'b5',
            name: 'Presentation',
            weight: 10,
            score: 9,
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'b6',
            name: 'Attendance',
            weight: 10,
            status: 'pending',
            totalScore: 10,
          },
          {
            id: 'b7',
            name: 'Assignments',
            weight: 20,
            status: 'pending',
            totalScore: 20,
          },
          {
            id: 'b8',
            name: 'Quizzes',
            weight: 20,
            status: 'unavailable',
            totalScore: 20,
          },
          {
            id: 'b9',
            name: 'Final Exam',
            weight: 40,
            status: 'unavailable',
            totalScore: 40,
          },
          {
            id: 'b10',
            name: 'Project',
            weight: 10,
            status: 'unavailable',
            totalScore: 10,
          },
        ],
      },
    },
    {
      id: 'cs202',
      name: 'Data Structures',
      code: 'CS202',
      instructor: 'Prof. Williams',
      credits: 4,
      assessments: {
        midterm: [
          {
            id: 'c1',
            name: 'Attendance',
            weight: 10,
            score: 8,
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'c2',
            name: 'Assignments',
            weight: 20,
            score: 17,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'c3',
            name: 'Quizzes',
            weight: 20,
            score: 18,
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'c4',
            name: 'Midterm Exam',
            weight: 40,
            score: 35,
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'c5',
            name: 'Presentation',
            weight: 10,
            score: 9,
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'c6',
            name: 'Attendance',
            weight: 10,
            status: 'pending',
            totalScore: 10,
          },
          {
            id: 'c7',
            name: 'Assignments',
            weight: 20,
            status: 'pending',
            totalScore: 20,
          },
          {
            id: 'c8',
            name: 'Quizzes',
            weight: 20,
            status: 'unavailable',
            totalScore: 20,
          },
          {
            id: 'c9',
            name: 'Final Exam',
            weight: 40,
            status: 'unavailable',
            totalScore: 40,
          },
          {
            id: 'c10',
            name: 'Project',
            weight: 10,
            status: 'unavailable',
            totalScore: 10,
          },
        ],
      },
    },
  ]

  const calculateProgress = (course: Course) => {
    const midtermAssessments = course.assessments.midterm
    const finalAssessments = course.assessments.final

    const totalMidtermWeight = midtermAssessments.reduce((sum, a) => sum + a.weight, 0)
    const totalFinalWeight = finalAssessments.reduce((sum, a) => sum + a.weight, 0)
    const totalWeight = totalMidtermWeight + totalFinalWeight

    const earnedMidtermPoints = midtermAssessments
      .filter((a) => a.status === 'completed' && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0)

    const earnedFinalPoints = finalAssessments
      .filter((a) => a.status === 'completed' && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0)

    const totalEarnedPoints = earnedMidtermPoints + earnedFinalPoints

    // Calculate completed percentage (what portion of the course has been completed)
    const completedMidtermWeight = midtermAssessments.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)

    const completedFinalWeight = finalAssessments.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)

    const completedPercentage = ((completedMidtermWeight + completedFinalWeight) / totalWeight) * 100

    // Calculate current grade percentage based on completed assessments
    const currentGradePercentage = completedPercentage > 0 ? (totalEarnedPoints / (completedMidtermWeight + completedFinalWeight)) * 100 : 0

    return {
      currentGradePercentage,
      completedPercentage,
      letterGrade: getLetterGrade(currentGradePercentage),
    }
  }

  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'unavailable':
        return 'default'
      default:
        return 'default'
    }
  }

  // Add new function for tooltips
  const renderTooltip = (assessment: Assessment) => {
    if (assessment.status !== 'completed' || assessment.score === undefined) {
      return `${assessment.name} - Not completed yet`
    }

    const percentage = (assessment.score / assessment.totalScore) * 100
    return `${assessment.name} - ${assessment.score}/${assessment.totalScore} (${assessment.weight}%)`
  }

  // Define a cohesive color scheme with different shades of blue
  const assessmentColors = {
    // Use different shades of blue for different assessment types
    Attendance: '#60a5fa', // lighter blue
    Assignments: '#3b82f6', // primary blue
    Quizzes: '#2563eb', // darker blue
    'Midterm Exam': '#1d4ed8', // deep blue
    'Final Exam': '#1d4ed8', // deep blue
    Presentation: '#93c5fd', // very light blue
    Project: '#93c5fd', // very light blue
  }

  // Fix the circle charts visibility issues with a cohesive color scheme
  const renderCircleChart = (data: any[], percentage: number, title: string) => {
    return (
      <div className="flex flex-col items-center">
        <h4 className="mb-2 flex items-center gap-1 text-sm font-medium">
          <Icon icon={title.includes('Midterm') ? 'lucide:calendar-check' : 'lucide:calendar-clock'} className="text-primary" width={16} />
          {title}
        </h4>

        <motion.div
          className="relative h-32 w-32"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <svg className="h-full w-full" viewBox="0 0 100 100">
            {/* Background circle with improved visibility */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb" // light gray for light mode
              className="dark:stroke-gray-700" // darker gray for dark mode
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />

            {/* Segments for each assessment with improved visibility */}
            {data.map((item, i) => {
              // Calculate start and end angles
              const totalValue = data.reduce((sum, d) => sum + d.value, 0)
              const anglePerValue = 360 / totalValue

              let startAngle = 0
              for (let j = 0; j < i; j++) {
                startAngle += data[j].value * anglePerValue
              }

              const endAngle = startAngle + item.value * anglePerValue

              // Convert to radians and calculate path
              const startRad = ((startAngle - 90) * Math.PI) / 180
              const endRad = ((endAngle - 90) * Math.PI) / 180

              const x1 = 50 + 45 * Math.cos(startRad)
              const y1 = 50 + 45 * Math.sin(startRad)
              const x2 = 50 + 45 * Math.cos(endRad)
              const y2 = 50 + 45 * Math.sin(endRad)

              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0

              const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

              // For pending items, use dashed stroke
              const dashArray = item.status === 'pending' ? '3,2' : 'none'

              // Use different colors based on status and type
              const fillColor =
                item.status === 'completed'
                  ? item.color // use the assessment-specific color
                  : item.status === 'pending'
                    ? '#fbbf24' // amber for pending
                    : '#e5e7eb' // light gray for unavailable

              return (
                <Tooltip
                  key={`${title}-${item.name}`}
                  content={
                    <div className="p-2">
                      <p className="font-medium">{item.name}</p>
                      {item.status === 'completed' && item.score !== undefined ? (
                        <p className="text-sm">
                          {item.score}/{item.totalScore} ({item.weight}%)
                        </p>
                      ) : (
                        <p className="text-sm">{item.status === 'pending' ? 'Pending' : 'Not available yet'}</p>
                      )}
                    </div>
                  }
                  placement="top"
                >
                  <motion.path
                    d={pathData}
                    fill={fillColor}
                    stroke="#ffffff" // white stroke for light mode
                    className="cursor-help transition-all hover:scale-105 hover:opacity-80 dark:stroke-gray-900" // dark stroke for dark mode
                    strokeWidth="1"
                    strokeDasharray={dashArray}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                  />
                </Tooltip>
              )
            })}

            {/* Center circle with improved visibility */}
            <motion.circle
              cx="50"
              cy="50"
              r="25"
              fill="#ffffff" // white for light mode
              stroke="#e5e7eb" // light gray for light mode
              className="dark:fill-gray-900 dark:stroke-gray-700" // dark mode styles
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />

            {/* Completion text with improved visibility */}
            <motion.text
              x="50"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#111827" // dark text for light mode
              className="dark:fill-gray-100" // light text for dark mode
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              {Math.round(percentage)}%
            </motion.text>

            <motion.text
              x="50"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="#6b7280" // gray text for light mode
              className="dark:fill-gray-400" // lighter gray for dark mode
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              Complete
            </motion.text>
          </svg>
        </motion.div>
      </div>
    )
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="px-4 pb-0 pt-6 sm:px-8">
        <div className="flex w-full flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:graduation-cap" className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight">Current Semester</h2>
          </div>
          <p className="text-base text-default-500">Academic progress and grades across all courses</p>
        </div>
      </CardHeader>

      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <div className="flex min-w-max gap-4 pb-4 pt-2 sm:gap-8 sm:p-8">
            {courses.map((course, courseIndex) => {
              const progress = calculateProgress(course)

              // Calculate midterm and final term data for pie charts
              const midtermData = course.assessments.midterm.map((assessment) => ({
                name: assessment.name,
                value: assessment.weight,
                status: assessment.status,
                score: assessment.score,
                totalScore: assessment.totalScore,
                color: assessmentColors[assessment.name as keyof typeof assessmentColors] || 'var(--heroui-default-500)',
              }))

              const finalData = course.assessments.final.map((assessment) => ({
                name: assessment.name,
                value: assessment.weight,
                status: assessment.status,
                score: assessment.score,
                totalScore: assessment.totalScore,
                color: assessmentColors[assessment.name as keyof typeof assessmentColors] || 'var(--heroui-default-500)',
              }))

              // Calculate completion percentages
              const midtermCompletedWeight = course.assessments.midterm.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
              const finalCompletedWeight = course.assessments.final.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
              const midtermPercentage = (midtermCompletedWeight / 50) * 100
              const finalPercentage = (finalCompletedWeight / 50) * 100

              // Calculate next upcoming assessment
              const allAssessments = [...course.assessments.midterm, ...course.assessments.final]
              const upcomingAssessment = allAssessments.find((a) => a.status === 'pending') || allAssessments.find((a) => a.status === 'unavailable')

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: courseIndex * 0.1, duration: 0.3 }}
                  className="min-w-[320px] sm:min-w-[480px]"
                >
                  <Card shadow="sm" className="border border-divider">
                    <CardBody className="p-4 sm:p-8">
                      {/* Course Header */}
                      <div className="mb-6 flex items-start justify-between border-b border-divider pb-4 sm:mb-8 sm:pb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{course.name}</h3>
                            <Chip size="sm" variant="flat" color="primary" className="font-medium">
                              {course.code}
                            </Chip>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-default-600 sm:gap-3">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Icon icon="lucide:user" className="h-4 w-4" />
                              <span>{course.instructor}</span>
                            </div>
                            <span className="text-divider">•</span>
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <Icon icon="lucide:book" className="h-4 w-4" />
                              <span>{course.credits} Credits</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 sm:gap-2">
                          <Chip
                            size="sm"
                            color={
                              progress.currentGradePercentage >= 80
                                ? 'success'
                                : progress.currentGradePercentage >= 70
                                  ? 'primary'
                                  : progress.currentGradePercentage >= 60
                                    ? 'warning'
                                    : 'danger'
                            }
                            variant="flat"
                            className="px-2 py-1 text-xs font-semibold sm:px-3 sm:text-sm"
                          >
                            {progress.letterGrade} ({Math.round(progress.currentGradePercentage)}%)
                          </Chip>
                          <div className="flex items-center gap-1 text-xs text-default-500 sm:gap-1.5 sm:text-sm">
                            <Icon icon="lucide:check-circle" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>{Math.round(progress.completedPercentage)}% Complete</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Charts */}
                      <div className="mb-6 flex flex-nowrap justify-center gap-4 overflow-x-auto pb-2 sm:mb-8 sm:gap-6">
                        <div className="flex-shrink-0">{renderCircleChart(midtermData, midtermPercentage, 'Midterm (50%)')}</div>
                        <div className="flex-shrink-0">{renderCircleChart(finalData, finalPercentage, 'Final Term (50%)')}</div>
                      </div>

                      {/* Assessment Summary */}
                      <div className="grid grid-cols-3 gap-3 rounded-xl bg-default-50 p-3 dark:bg-default-100 sm:gap-4 sm:p-4">
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="rounded-full bg-success/10 p-1 sm:p-1.5">
                            <Icon icon="lucide:check-circle" className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium sm:text-sm">{allAssessments.filter((a) => a.status === 'completed').length}</p>
                            <p className="text-[10px] text-default-500 sm:text-xs">Completed</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="rounded-full bg-warning/10 p-1 sm:p-1.5">
                            <Icon icon="lucide:clock" className="h-3.5 w-3.5 text-warning sm:h-4 sm:w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium sm:text-sm">{allAssessments.filter((a) => a.status === 'pending').length}</p>
                            <p className="text-[10px] text-default-500 sm:text-xs">Pending</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-2.5">
                          <div className="rounded-full bg-default-200/50 p-1 dark:bg-default-100 sm:p-1.5">
                            <Icon icon="lucide:calendar" className="h-3.5 w-3.5 text-default-500 sm:h-4 sm:w-4" />
                          </div>
                          <div>
                            <p className="text-xs font-medium sm:text-sm">{allAssessments.filter((a) => a.status === 'unavailable').length}</p>
                            <p className="text-[10px] text-default-500 sm:text-xs">Upcoming</p>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
