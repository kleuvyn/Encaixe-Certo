'use client';

import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Card, CardContent, Link as MuiLink } from '@mui/material';
import { Code, Server, Database, BookOpen, Clock, Globe } from 'lucide-react';

interface CourseLink {
  platform: string;
  link: string;
}

interface CourseItem {
  title: string;
  hours: number;
  links: CourseLink[];
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const renderCourseSection = (courses: CourseItem[]) => (
  <Box className="flex flex-col gap-4">
    {courses.map((course, index) => (
      <Card key={index} className="shadow-sm border border-gray-200">
        <CardContent>
          <Box className="flex items-center gap-4 mb-2">
            <BookOpen size={20} className="text-gray-600" />
            <Typography variant="h6" className="font-bold">{course.title}</Typography>
          </Box>
          <Box className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-gray-500" />
            <Typography variant="body2" color="text.secondary">
              {course.hours} Horas
            </Typography>
          </Box>
          <Box className="flex flex-col gap-1 mt-3">
            {course.links.map((link, linkIndex) => (
              <MuiLink
                key={linkIndex}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-600 hover:underline transition-colors"
                sx={{ fontSize: '0.9rem' }}
              >
                <Globe size={14} />
                {link.platform}
              </MuiLink>
            ))}
          </Box>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default function CourseTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const frontEndCourses: CourseItem[] = [
    { title: "HTML", hours: 4, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/html/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "CSS", hours: 6, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/css/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "JavaScript", hours: 3, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/js/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Node.js", hours: 4, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/nodejs/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "React", hours: 46, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/react/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "API", hours: 2, links: [{ platform: "RapidAPI", link: "https://rapidapi.com/learn" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Git", hours: 2, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/git/" }, { platform: "Ada.tech", link: "#" }] },
  ];

  const backEndCourses: CourseItem[] = [
    { title: "Back-end em Node.js", hours: 23, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "JavaScript", hours: 3, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/js/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Node.js", hours: 4, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/nodejs/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Banco de dados", hours: 2, links: [{ platform: "W3Schools - SQL", link: "https://www.w3schools.com/sql/" }, { platform: "W3Schools - PostgreSQL", link: "https://www.w3schools.com/postgresql/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Introdução à Infraestrutura Web", hours: 3, links: [{ platform: "DevMedia", link: "https://www.devmedia.com.br/infraestrutura-web" }, { platform: "Ada.tech", link: "#" }] },
    { title: "API", hours: 2, links: [{ platform: "RapidAPI", link: "https://rapidapi.com/learn" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Git", hours: 2, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/git/" }, { platform: "Ada.tech", link: "#" }] },
  ];
  
  const dataScienceCourses: CourseItem[] = [
    { title: "Introdução a Data Science", hours: 2, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/datascience/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Engenharia vs Ciência de Dados", hours: 2, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Python: noções introdutórias", hours: 3, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/python/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Processamento e análise de dados", hours: 10, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Análise Exploratória de Dados", hours: 2, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Banco de dados", hours: 2, links: [{ platform: "W3Schools - SQL", link: "https://www.w3schools.com/sql/" }, { platform: "W3Schools - PostgreSQL", link: "https://www.w3schools.com/postgresql/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Fundamentos Matemáticos", hours: 3, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Estatística", hours: 6, links: [{ platform: "W3Schools", link: "https://www.w3schools.com/statistics/" }, { platform: "Ada.tech", link: "#" }] },
    { title: "Estatística com Python", hours: 11, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Python for Finance", hours: 6, links: [{ platform: "Ada.tech", link: "#" }] },
    { title: "Power BI", hours: 2, links: [{ platform: "Ada.tech", link: "#" }] },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" className="text-center font-bold mb-6">
        Trilhas de Aprendizagem
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="course tabs" centered>
          <Tab label="FrontEnd" icon={<Code />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="BackEnd" icon={<Server />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Data Science" icon={<Database />} iconPosition="start" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {renderCourseSection(frontEndCourses)}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {renderCourseSection(backEndCourses)}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {renderCourseSection(dataScienceCourses)}
      </TabPanel>
    </Box>
  );
}