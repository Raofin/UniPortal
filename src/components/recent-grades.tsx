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

export const RecentGrades: React.FC = () => {
  const [selected, setSelected] = React.useState<"byDate" | "byCourse">("byDate");
  
  const grades: Grade[] = [
    {
      id: "1",
      course: "Advanced Algorithms",
      assessment: "Midterm",
      score: 85,
      totalScore: 100,
      grade: "A-",
      date: "2023-10-15"
    },
    {
      id: "2",
      course: "Database Systems",
      assessment: "Project 1",
      score: 92,
      totalScore: 100,
      grade: "A",
      date: "2023-10-10"
    },
    {
      id: "3",
      course: "Computer Networks",
      assessment: "Quiz 2",
      score: 78,
      totalScore: 100,
      grade: "B+",
      date: "2023-10-05"
    },
    {
      id: "4",
      course: "Data Structures",
      assessment: "Assignment 3",
      score: 88,
      totalScore: 100,
      grade: "B+",
      date: "2023-09-28"
    }
  ];
  
  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "success";
    if (grade.startsWith("B")) return "primary";
    if (grade.startsWith("C")) return "warning";
    return "danger";
  };
  
  // Data for the chart
  const chartData = grades.map(grade => ({
    name: grade.assessment,
    course: grade.course,
    score: (grade.score / grade.totalScore) * 100,
    date: grade.date
  }));
  
  // Group grades by course for the "by course" view
  const courseGroups = React.useMemo(() => {
    const groups: Record<string, Grade[]> = {};
    grades.forEach(grade => {
      if (!groups[grade.course]) {
        groups[grade.course] = [];
      }
      groups[grade.course].push(grade);
    });
    return groups;
  }, []);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Grades</h2>
          <Button
            variant="light"
            startContent={<Icon icon="lucide:download" />}
          >
            Export
          </Button>
        </div>
        
        <Tabs 
          selectedKey={selected} 
          onSelectionChange={key => setSelected(key as "byDate" | "byCourse")}
          variant="light"
          color="primary"
          classNames={{
            tabList: "gap-4",
          }}
        >
          <Tab key="byDate" title="By Date" />
          <Tab key="byCourse" title="By Course" />
        </Tabs>
      </CardHeader>
      
      <CardBody>
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--heroui-divider)" />
              <XAxis 
                dataKey={selected === "byDate" ? "date" : "course"} 
                tick={{ fontSize: 12 }}
                stroke="var(--heroui-foreground-300)"
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                stroke="var(--heroui-foreground-300)"
              />
              <RechartsTooltip 
                formatter={(value: number) => [`${value}%`, 'Score']}
                labelFormatter={(label) => selected === "byDate" ? `Date: ${label}` : `Course: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="var(--heroui-primary)" 
                fill="var(--heroui-primary-100)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        {selected === "byDate" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Card shadow="sm" className="border border-divider">
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-sm">{grade.course}</h3>
                      <Chip 
                        size="sm" 
                        color={getGradeColor(grade.grade)}
                      >
                        {grade.grade}
                      </Chip>
                    </div>
                    
                    <p className="text-xs text-default-500 mb-3">{grade.assessment}</p>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">
                        {grade.score}/{grade.totalScore}
                      </div>
                      <div className="text-xs text-default-500">
                        {new Date(grade.date).toLocaleDateString()}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(courseGroups).map(([course, courseGrades], courseIndex) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: courseIndex * 0.1, duration: 0.3 }}
              >
                <h3 className="font-medium mb-3">{course}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {courseGrades.map((grade, gradeIndex) => (
                    <motion.div
                      key={grade.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: courseIndex * 0.1 + gradeIndex * 0.05, duration: 0.3 }}
                    >
                      <Card shadow="sm" className="border border-divider">
                        <CardBody className="p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-sm">{grade.assessment}</p>
                              <p className="text-xs text-default-500">{new Date(grade.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <Chip 
                                size="sm" 
                                color={getGradeColor(grade.grade)}
                                className="mb-1"
                              >
                                {grade.grade}
                              </Chip>
                              <span className="text-xs font-medium">
                                {grade.score}/{grade.totalScore}
                              </span>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};