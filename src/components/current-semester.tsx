import React from 'react'
import { Card, CardBody, CardHeader, Chip } from '@heroui/react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

// Core interfaces for grade tracking and assessment management
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
  const [hoveredSegment, setHoveredSegment] = React.useState<{ x: number; y: number; content: string } | null>(null);

  // Utility functions for generating mock data
  const getRandomStatus = (index: number, total: number): 'completed' | 'pending' | 'unavailable' => {
    const random = Math.random()
    if (index < Math.floor(total * 0.6)) return 'completed' // 60% chance of completed
    if (index < Math.floor(total * 0.8)) return 'pending' // 20% chance of pending
    return 'unavailable' // 20% chance of unavailable
  }

  const getRandomScore = (total: number, minPercentage: number = 0.6): number => {
    const min = Math.floor(total * minPercentage)
    const max = total
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Mock course data with assessments
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
            score: getRandomScore(10, 0.7),
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'a2',
            name: 'Assignments',
            weight: 20,
            score: getRandomScore(20, 0.8),
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'a3',
            name: 'Quizzes',
            weight: 20,
            score: getRandomScore(20, 0.75),
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'a4',
            name: 'Midterm Exam',
            weight: 40,
            score: getRandomScore(40, 0.8),
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'a5',
            name: 'Presentation',
            weight: 10,
            score: getRandomScore(10, 0.7),
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'a6',
            name: 'Attendance',
            weight: 10,
            status: getRandomStatus(0, 5),
            totalScore: 10,
            ...(getRandomStatus(0, 5) === 'completed' && { score: getRandomScore(10, 0.7) }),
          },
          {
            id: 'a7',
            name: 'Assignments',
            weight: 20,
            status: getRandomStatus(1, 5),
            totalScore: 20,
            ...(getRandomStatus(1, 5) === 'completed' && { score: getRandomScore(20, 0.8) }),
          },
          {
            id: 'a8',
            name: 'Quizzes',
            weight: 20,
            status: getRandomStatus(2, 5),
            totalScore: 20,
            ...(getRandomStatus(2, 5) === 'completed' && { score: getRandomScore(20, 0.75) }),
          },
          {
            id: 'a9',
            name: 'Final Exam',
            weight: 40,
            status: getRandomStatus(3, 5),
            totalScore: 40,
            ...(getRandomStatus(3, 5) === 'completed' && { score: getRandomScore(40, 0.8) }),
          },
          {
            id: 'a10',
            name: 'Project',
            weight: 10,
            status: getRandomStatus(4, 5),
            totalScore: 10,
            ...(getRandomStatus(4, 5) === 'completed' && { score: getRandomScore(10, 0.7) }),
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
            score: getRandomScore(10, 0.6), // 6-10
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'b2',
            name: 'Assignments',
            weight: 20,
            score: getRandomScore(20, 0.7), // 14-20
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'b3',
            name: 'Quizzes',
            weight: 20,
            score: getRandomScore(20, 0.65), // 13-20
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'b4',
            name: 'Midterm Exam',
            weight: 40,
            score: getRandomScore(40, 0.75), // 30-40
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'b5',
            name: 'Presentation',
            weight: 10,
            score: getRandomScore(10, 0.6), // 6-10
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'b6',
            name: 'Attendance',
            weight: 10,
            status: getRandomStatus(0, 5),
            totalScore: 10,
            ...(getRandomStatus(0, 5) === 'completed' && { score: getRandomScore(10, 0.6) }),
          },
          {
            id: 'b7',
            name: 'Assignments',
            weight: 20,
            status: getRandomStatus(1, 5),
            totalScore: 20,
            ...(getRandomStatus(1, 5) === 'completed' && { score: getRandomScore(20, 0.7) }),
          },
          {
            id: 'b8',
            name: 'Quizzes',
            weight: 20,
            status: getRandomStatus(2, 5),
            totalScore: 20,
            ...(getRandomStatus(2, 5) === 'completed' && { score: getRandomScore(20, 0.65) }),
          },
          {
            id: 'b9',
            name: 'Final Exam',
            weight: 40,
            status: getRandomStatus(3, 5),
            totalScore: 40,
            ...(getRandomStatus(3, 5) === 'completed' && { score: getRandomScore(40, 0.75) }),
          },
          {
            id: 'b10',
            name: 'Project',
            weight: 10,
            status: getRandomStatus(4, 5),
            totalScore: 10,
            ...(getRandomStatus(4, 5) === 'completed' && { score: getRandomScore(10, 0.6) }),
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
            score: getRandomScore(10, 0.8), // 8-10
            totalScore: 10,
            status: 'completed',
          },
          {
            id: 'c2',
            name: 'Assignments',
            weight: 20,
            score: getRandomScore(20, 0.75), // 15-20
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'c3',
            name: 'Quizzes',
            weight: 20,
            score: getRandomScore(20, 0.7), // 14-20
            totalScore: 20,
            status: 'completed',
          },
          {
            id: 'c4',
            name: 'Midterm Exam',
            weight: 40,
            score: getRandomScore(40, 0.775), // 31-40
            totalScore: 40,
            status: 'completed',
          },
          {
            id: 'c5',
            name: 'Presentation',
            weight: 10,
            score: getRandomScore(10, 0.7), // 7-10
            totalScore: 10,
            status: 'completed',
          },
        ],
        final: [
          {
            id: 'c6',
            name: 'Attendance',
            weight: 10,
            status: getRandomStatus(0, 5),
            totalScore: 10,
            ...(getRandomStatus(0, 5) === 'completed' && { score: getRandomScore(10, 0.8) }),
          },
          {
            id: 'c7',
            name: 'Assignments',
            weight: 20,
            status: getRandomStatus(1, 5),
            totalScore: 20,
            ...(getRandomStatus(1, 5) === 'completed' && { score: getRandomScore(20, 0.75) }),
          },
          {
            id: 'c8',
            name: 'Quizzes',
            weight: 20,
            status: getRandomStatus(2, 5),
            totalScore: 20,
            ...(getRandomStatus(2, 5) === 'completed' && { score: getRandomScore(20, 0.7) }),
          },
          {
            id: 'c9',
            name: 'Final Exam',
            weight: 40,
            status: getRandomStatus(3, 5),
            totalScore: 40,
            ...(getRandomStatus(3, 5) === 'completed' && { score: getRandomScore(40, 0.775) }),
          },
          {
            id: 'c10',
            name: 'Project',
            weight: 10,
            status: getRandomStatus(4, 5),
            totalScore: 10,
            ...(getRandomStatus(4, 5) === 'completed' && { score: getRandomScore(10, 0.7) }),
          },
        ],
      },
    },
  ]

  // Calculate course progress and grades
  const calculateProgress = (course: Course) => {
    const midtermAssessments = course.assessments.midterm
    const finalAssessments = course.assessments.final

    const totalMidtermWeight = midtermAssessments.reduce((sum, a) => sum + a.weight, 0)
    const totalFinalWeight = finalAssessments.reduce((sum, a) => sum + a.weight, 0)
    const totalWeight = totalMidtermWeight + totalFinalWeight

    // Calculate earned points from completed assessments
    const earnedMidtermPoints = midtermAssessments
      .filter((a) => a.status === 'completed' && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0)

    const earnedFinalPoints = finalAssessments
      .filter((a) => a.status === 'completed' && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0)

    const totalEarnedPoints = earnedMidtermPoints + earnedFinalPoints

    // Calculate completion percentage
    const completedMidtermWeight = midtermAssessments.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
    const completedFinalWeight = finalAssessments.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
    const completedPercentage = ((completedMidtermWeight + completedFinalWeight) / totalWeight) * 100

    // Calculate current grade based on completed assessments
    const currentGradePercentage = completedPercentage > 0 ? (totalEarnedPoints / (completedMidtermWeight + completedFinalWeight)) * 100 : 0

    return {
      currentGradePercentage,
      completedPercentage,
      letterGrade: getLetterGrade(currentGradePercentage),
    }
  }

  // Helper functions for grade calculations and UI
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

  const renderTooltip = (assessment: Assessment) => {
    if (assessment.status !== 'completed' || assessment.score === undefined) {
      return `${assessment.name} - Not completed yet`
    }

    const percentage = (assessment.score / assessment.totalScore) * 100
    return `${assessment.name} - ${assessment.score}/${assessment.totalScore} (${assessment.weight}%)`
  }

  // Color scheme for different assessment types
  const assessmentColors = {
    Attendance: '#60a5fa',
    Assignments: '#3b82f6',
    Quizzes: '#2563eb',
    'Midterm Exam': '#1d4ed8',
    'Final Exam': '#1d4ed8',
    Presentation: '#93c5fd',
    Project: '#93c5fd',
  }

  // Render circular progress chart for assessments
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
            {/* Background circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              className="dark:stroke-gray-700"
              strokeWidth="10"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />

            {/* Assessment segments */}
            {data.map((item, i) => {
              const totalValue = data.reduce((sum, d) => sum + d.value, 0)
              const anglePerValue = 360 / totalValue

              let startAngle = 0
              for (let j = 0; j < i; j++) {
                startAngle += data[j].value * anglePerValue
              }

              const endAngle = startAngle + item.value * anglePerValue
              const startRad = ((startAngle - 90) * Math.PI) / 180
              const endRad = ((endAngle - 90) * Math.PI) / 180

              const x1 = 50 + 45 * Math.cos(startRad)
              const y1 = 50 + 45 * Math.sin(startRad)
              const x2 = 50 + 45 * Math.cos(endRad)
              const y2 = 50 + 45 * Math.sin(endRad)

              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0
              const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`

              const dashArray = item.status === 'pending' ? '3,2' : 'none'
              const fillColor =
                item.status === 'completed'
                  ? item.color
                  : item.status === 'pending'
                    ? '#fbbf24'
                    : '#e5e7eb'

              const tooltipContent = `${item.name} - ${
                item.status === 'completed' && typeof item.score === 'number' && typeof item.totalScore === 'number'
                  ? `${item.score}/${item.totalScore} (${item.weight}%)`
                  : item.status === 'pending'
                    ? 'Pending'
                    : 'Not available yet'
              }`

              return (
                <g key={`${title}-${item.name}`}>
                  <motion.path
                    d={pathData}
                    fill={fillColor}
                    stroke="#ffffff"
                    className="cursor-help dark:stroke-gray-900"
                    strokeWidth="1"
                    strokeDasharray={dashArray}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.1,
                      ease: 'easeOut',
                    }}
                    onMouseEnter={(e) => {
                      setHoveredSegment({
                        x: e.clientX,
                        y: e.clientY + 5,
                        content: tooltipContent
                      });
                    }}
                    onMouseLeave={() => setHoveredSegment(null)}
                  />
                </g>
              )
            })}

            {/* Center circle with completion percentage */}
            <motion.circle
              cx="50"
              cy="50"
              r="25"
              fill="#ffffff"
              stroke="#e5e7eb"
              className="dark:fill-gray-900 dark:stroke-gray-700"
              strokeWidth="1"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            />

            <motion.text
              x="50"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#111827"
              className="dark:fill-gray-100"
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
              fontSize="8"
              fill="#6b7280"
              className="dark:fill-gray-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 }}
            >
              Complete
            </motion.text>
          </svg>
        </motion.div>

        {/* Tooltip for assessment details */}
        {hoveredSegment && (
          <div
            className="fixed z-50 -translate-x-1/2 transform rounded-lg bg-content1 p-1.5 shadow-lg"
            style={{
              left: hoveredSegment.x,
              top: hoveredSegment.y,
            }}
          >
            <p className="text-xs">{hoveredSegment.content}</p>
            <div className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rotate-45 transform bg-content1"></div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="glass-card">
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

              // Prepare data for progress charts
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

              // Calculate completion percentages for each term
              const midtermCompletedWeight = course.assessments.midterm.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
              const finalCompletedWeight = course.assessments.final.filter((a) => a.status === 'completed').reduce((sum, a) => sum + a.weight, 0)
              const totalMidtermWeight = course.assessments.midterm.reduce((sum, a) => sum + a.weight, 0)
              const totalFinalWeight = course.assessments.final.reduce((sum, a) => sum + a.weight, 0)

              const midtermPercentage = (midtermCompletedWeight / totalMidtermWeight) * 100
              const finalPercentage = (finalCompletedWeight / totalFinalWeight) * 100

              // Find next upcoming assessment
              const allAssessments = [...course.assessments.midterm, ...course.assessments.final]
              const upcomingAssessment = allAssessments.find((a) => a.status === 'pending') || allAssessments.find((a) => a.status === 'unavailable')

              return (
                <div
                  key={course.id}
                  className="min-w-[320px] sm:min-w-[480px]"
                >
                  <Card shadow="none" className="border border-divider bg-transparent dark:bg-content1/60">
                    <CardBody className="p-4 sm:p-8">
                      {/* Course Header with basic info and progress */}
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

                      {/* Progress Charts for midterm and final */}
                      <div className="mb-6 flex flex-nowrap justify-center gap-4 overflow-x-auto pb-2 sm:mb-8 sm:gap-6">
                        <div className="flex-shrink-0">{renderCircleChart(midtermData, midtermPercentage, 'Midterm (50%)')}</div>
                        <div className="flex-shrink-0">{renderCircleChart(finalData, finalPercentage, 'Final Term (50%)')}</div>
                      </div>

                      {/* Assessment Summary Statistics */}
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
                </div>
              )
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
