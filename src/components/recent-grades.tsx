import React from "react";
import { Card, CardBody, CardHeader, Chip, Button, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip
} from "recharts";

interface Grade {
  id: string;
  course: string;
  assessment: string;
  score: number;
  totalScore: number;
  grade: string;
  date: string;
}

interface Assessment {
  id: string;
  name: string;
  weight: number;
  score?: number;
  totalScore: number;
  status: "completed" | "pending" | "unavailable";
}

interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  credits: number;
  assessments: {
    midterm: Assessment[];
    final: Assessment[];
  };
}

export const RecentGrades: React.FC = () => {
  const [selected, setSelected] = React.useState<"byDate" | "byCourse">("byDate");
  
  const courses: Course[] = [
    {
      id: "cs301",
      name: "Advanced Algorithms",
      code: "CS301",
      instructor: "Prof. Johnson",
      credits: 4,
      assessments: {
        midterm: [
          {
            id: "a1",
            name: "Attendance",
            weight: 10,
            score: 9,
            totalScore: 10,
            status: "completed"
          },
          {
            id: "a2",
            name: "Assignments",
            weight: 20,
            score: 18,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "a3",
            name: "Quizzes",
            weight: 20,
            score: 17,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "a4",
            name: "Midterm Exam",
            weight: 40,
            score: 34,
            totalScore: 40,
            status: "completed"
          },
          {
            id: "a5",
            name: "Presentation",
            weight: 10,
            score: 8,
            totalScore: 10,
            status: "completed"
          }
        ],
        final: [
          {
            id: "a6",
            name: "Attendance",
            weight: 10,
            status: "pending",
            totalScore: 10
          },
          {
            id: "a7",
            name: "Assignments",
            weight: 20,
            status: "pending",
            totalScore: 20
          },
          {
            id: "a8",
            name: "Quizzes",
            weight: 20,
            status: "unavailable",
            totalScore: 20
          },
          {
            id: "a9",
            name: "Final Exam",
            weight: 40,
            status: "unavailable",
            totalScore: 40
          },
          {
            id: "a10",
            name: "Project",
            weight: 10,
            status: "unavailable",
            totalScore: 10
          }
        ]
      }
    },
    {
      id: "cs305",
      name: "Database Systems",
      code: "CS305",
      instructor: "Dr. Smith",
      credits: 3,
      assessments: {
        midterm: [
          {
            id: "b1",
            name: "Attendance",
            weight: 10,
            score: 10,
            totalScore: 10,
            status: "completed"
          },
          {
            id: "b2",
            name: "Assignments",
            weight: 20,
            score: 19,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "b3",
            name: "Quizzes",
            weight: 20,
            score: 16,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "b4",
            name: "Midterm Exam",
            weight: 40,
            score: 38,
            totalScore: 40,
            status: "completed"
          },
          {
            id: "b5",
            name: "Presentation",
            weight: 10,
            score: 9,
            totalScore: 10,
            status: "completed"
          }
        ],
        final: [
          {
            id: "b6",
            name: "Attendance",
            weight: 10,
            status: "pending",
            totalScore: 10
          },
          {
            id: "b7",
            name: "Assignments",
            weight: 20,
            status: "pending",
            totalScore: 20
          },
          {
            id: "b8",
            name: "Quizzes",
            weight: 20,
            status: "unavailable",
            totalScore: 20
          },
          {
            id: "b9",
            name: "Final Exam",
            weight: 40,
            status: "unavailable",
            totalScore: 40
          },
          {
            id: "b10",
            name: "Project",
            weight: 10,
            status: "unavailable",
            totalScore: 10
          }
        ]
      }
    },
    {
      id: "cs202",
      name: "Data Structures",
      code: "CS202",
      instructor: "Prof. Williams",
      credits: 4,
      assessments: {
        midterm: [
          {
            id: "c1",
            name: "Attendance",
            weight: 10,
            score: 8,
            totalScore: 10,
            status: "completed"
          },
          {
            id: "c2",
            name: "Assignments",
            weight: 20,
            score: 17,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "c3",
            name: "Quizzes",
            weight: 20,
            score: 18,
            totalScore: 20,
            status: "completed"
          },
          {
            id: "c4",
            name: "Midterm Exam",
            weight: 40,
            score: 35,
            totalScore: 40,
            status: "completed"
          },
          {
            id: "c5",
            name: "Presentation",
            weight: 10,
            score: 9,
            totalScore: 10,
            status: "completed"
          }
        ],
        final: [
          {
            id: "c6",
            name: "Attendance",
            weight: 10,
            status: "pending",
            totalScore: 10
          },
          {
            id: "c7",
            name: "Assignments",
            weight: 20,
            status: "pending",
            totalScore: 20
          },
          {
            id: "c8",
            name: "Quizzes",
            weight: 20,
            status: "unavailable",
            totalScore: 20
          },
          {
            id: "c9",
            name: "Final Exam",
            weight: 40,
            status: "unavailable",
            totalScore: 40
          },
          {
            id: "c10",
            name: "Project",
            weight: 10,
            status: "unavailable",
            totalScore: 10
          }
        ]
      }
    }
  ];
  
  const calculateProgress = (course: Course) => {
    const midtermAssessments = course.assessments.midterm;
    const finalAssessments = course.assessments.final;
    
    const totalMidtermWeight = midtermAssessments.reduce((sum, a) => sum + a.weight, 0);
    const totalFinalWeight = finalAssessments.reduce((sum, a) => sum + a.weight, 0);
    const totalWeight = totalMidtermWeight + totalFinalWeight;
    
    const earnedMidtermPoints = midtermAssessments
      .filter(a => a.status === "completed" && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0);
    
    const earnedFinalPoints = finalAssessments
      .filter(a => a.status === "completed" && a.score !== undefined)
      .reduce((sum, a) => sum + ((a.score || 0) / a.totalScore) * a.weight, 0);
    
    const totalEarnedPoints = earnedMidtermPoints + earnedFinalPoints;
    
    // Calculate completed percentage (what portion of the course has been completed)
    const completedMidtermWeight = midtermAssessments
      .filter(a => a.status === "completed")
      .reduce((sum, a) => sum + a.weight, 0);
    
    const completedFinalWeight = finalAssessments
      .filter(a => a.status === "completed")
      .reduce((sum, a) => sum + a.weight, 0);
    
    const completedPercentage = ((completedMidtermWeight + completedFinalWeight) / totalWeight) * 100;
    
    // Calculate current grade percentage based on completed assessments
    const currentGradePercentage = completedPercentage > 0 
      ? (totalEarnedPoints / (completedMidtermWeight + completedFinalWeight)) * 100
      : 0;
    
    return {
      currentGradePercentage,
      completedPercentage,
      letterGrade: getLetterGrade(currentGradePercentage)
    };
  };
  
  const getLetterGrade = (percentage: number) => {
    if (percentage >= 90) return "A";
    if (percentage >= 80) return "B";
    if (percentage >= 70) return "C";
    if (percentage >= 60) return "D";
    return "F";
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "unavailable":
        return "default";
      default:
        return "default";
    }
  };
  
  // Add new function for tooltips
  const renderTooltip = (assessment: Assessment) => {
    if (assessment.status !== "completed" || assessment.score === undefined) {
      return `${assessment.name} - Not completed yet`;
    }
    
    const percentage = (assessment.score / assessment.totalScore) * 100;
    return `${assessment.name} - ${assessment.score}/${assessment.totalScore} (${assessment.weight}%)`;
  };
  
  // Define colors for different assessment types
  const assessmentColors = {
    "Attendance": "var(--heroui-success)",
    "Assignments": "var(--heroui-primary)",
    "Quizzes": "var(--heroui-secondary)",
    "Midterm Exam": "var(--heroui-danger)",
    "Final Exam": "var(--heroui-danger)",
    "Presentation": "var(--heroui-warning)",
    "Project": "var(--heroui-warning)"
  };
  
  // Fix the circle charts visibility issues by ensuring proper color contrast
  const renderCircleChart = (data: any[], percentage: number, title: string) => {
    return (
      <div className="flex flex-col items-center">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
          <Icon icon={title.includes("Midterm") ? "lucide:calendar-check" : "lucide:calendar-clock"} className="text-primary" size={16} />
          {title}
        </h4>
        
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle with improved visibility */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="var(--heroui-default-200)"
              strokeWidth="10"
            />
            
            {/* Segments for each assessment with improved visibility */}
            {data.map((item, i) => {
              // Calculate start and end angles
              const totalValue = data.reduce((sum, d) => sum + d.value, 0);
              const anglePerValue = 360 / totalValue;
              
              let startAngle = 0;
              for (let j = 0; j < i; j++) {
                startAngle += data[j].value * anglePerValue;
              }
              
              const endAngle = startAngle + item.value * anglePerValue;
              
              // Convert to radians and calculate path
              const startRad = (startAngle - 90) * Math.PI / 180;
              const endRad = (endAngle - 90) * Math.PI / 180;
              
              const x1 = 50 + 45 * Math.cos(startRad);
              const y1 = 50 + 45 * Math.sin(startRad);
              const x2 = 50 + 45 * Math.cos(endRad);
              const y2 = 50 + 45 * Math.sin(endRad);
              
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              
              const pathData = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
              
              // For pending items, use dashed stroke
              const dashArray = item.status === "pending" ? "3,2" : "none";
              
              // Use more vibrant colors with better contrast
              const fillColor = item.status === "completed" 
                ? item.color 
                : item.status === "pending" 
                  ? "var(--heroui-default-200)" 
                  : "var(--heroui-default-100)";
              
              return (
                <Tooltip 
                  key={`${title}-${item.name}`}
                  content={
                    <div className="p-2">
                      <p className="font-medium">{item.name}</p>
                      {item.status === "completed" && item.score !== undefined ? (
                        <p className="text-sm">{item.score}/{item.totalScore} ({item.weight}%)</p>
                      ) : (
                        <p className="text-sm">{item.status === "pending" ? "Pending" : "Not available yet"}</p>
                      )}
                    </div>
                  }
                  placement="top"
                >
                  <path
                    d={pathData}
                    fill={fillColor}
                    stroke="var(--heroui-background)"
                    strokeWidth="1"
                    strokeDasharray={dashArray}
                    className="cursor-help transition-opacity hover:opacity-80"
                  />
                </Tooltip>
              );
            })}
            
            {/* Center circle with improved visibility */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="var(--heroui-background)"
              stroke="var(--heroui-divider)"
              strokeWidth="1"
            />
            
            {/* Completion text with improved visibility */}
            <text
              x="50"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="bold"
              fill="var(--heroui-foreground)"
              className="text-foreground"
            >
              {Math.round(percentage)}%
            </text>
            
            <text
              x="50"
              y="60"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="var(--heroui-foreground-500)"
              className="text-foreground-500"
            >
              Complete
            </text>
          </svg>
        </div>
      </div>
    );
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Current Semester</h2>
          <Button
            variant="light"
            startContent={<Icon icon="lucide:download" />}
          >
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardBody>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {courses.map((course, courseIndex) => {
              const progress = calculateProgress(course);
              
              // Calculate midterm and final term data for pie charts
              const midtermData = course.assessments.midterm.map(assessment => ({
                name: assessment.name,
                value: assessment.weight,
                status: assessment.status,
                score: assessment.score,
                totalScore: assessment.totalScore,
                color: assessmentColors[assessment.name as keyof typeof assessmentColors] || "var(--heroui-default-500)"
              }));
              
              const finalData = course.assessments.final.map(assessment => ({
                name: assessment.name,
                value: assessment.weight,
                status: assessment.status,
                score: assessment.score,
                totalScore: assessment.totalScore,
                color: assessmentColors[assessment.name as keyof typeof assessmentColors] || "var(--heroui-default-500)"
              }));
              
              // Calculate completion percentages
              const midtermCompletedWeight = course.assessments.midterm
                .filter(a => a.status === "completed")
                .reduce((sum, a) => sum + a.weight, 0);
              
              const finalCompletedWeight = course.assessments.final
                .filter(a => a.status === "completed")
                .reduce((sum, a) => sum + a.weight, 0);
              
              const midtermPercentage = (midtermCompletedWeight / 50) * 100;
              const finalPercentage = (finalCompletedWeight / 50) * 100;
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: courseIndex * 0.1, duration: 0.3 }}
                  className="min-w-[400px]"
                >
                  <Card shadow="sm" className="border border-divider">
                    <CardBody className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{course.name}</h3>
                          <p className="text-sm text-default-500">{course.code} • {course.credits} Credits</p>
                          <p className="text-sm text-default-500">{course.instructor}</p>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Chip size="sm" color="primary" variant="flat">
                              {Math.round(progress.completedPercentage)}% Complete
                            </Chip>
                            <Chip 
                              size="sm" 
                              color={progress.currentGradePercentage >= 80 ? "success" : 
                                    progress.currentGradePercentage >= 70 ? "primary" : 
                                    progress.currentGradePercentage >= 60 ? "warning" : "danger"}
                              variant="flat"
                            >
                              Current: {progress.letterGrade} ({Math.round(progress.currentGradePercentage)}%)
                            </Chip>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        {/* Midterm Chart */}
                        {renderCircleChart(midtermData, midtermPercentage, "Midterm (50%)")}
                        
                        {/* Final Term Chart */}
                        {renderCircleChart(finalData, finalPercentage, "Final Term (50%)")}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};