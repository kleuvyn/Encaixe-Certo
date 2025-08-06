'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import SkillChart from './skill-chart';
import { commonSkills, courseSuggestions } from '../lib/skills';

interface SkillFrequency {
  skill: string;
  frequency: number;
}

// Dados de exemplo para as habilidades.
const sampleSkills: SkillFrequency[] = [
  { skill: 'react', frequency: 85 },
  { skill: 'javascript', frequency: 72 },
  { skill: 'python', frequency: 65 },
  { skill: 'sql', frequency: 60 },
  { skill: 'aws', frequency: 55 },
  { skill: 'node.js', frequency: 50 },
  { skill: 'docker', frequency: 45 },
  { skill: 'agile', frequency: 40 },
  { skill: 'power bi', frequency: 35 },
  { skill: 'machine learning', frequency: 30 },
  { skill: 'git', frequency: 28 },
  { skill: 'typescript', frequency: 25 },
  { skill: 'comunicação', frequency: 22 },
  { skill: 'resolução de problemas', frequency: 20 },
  { skill: 'excel', frequency: 18 },
  { skill: 'business intelligence', frequency: 15 },
];

export default function SkillDashboard() {
  const top10Skills = [...sampleSkills].sort((a, b) => b.frequency - a.frequency).slice(0, 10);

  return (
    <Box className="p-8 max-w-4xl mx-auto">
      <Typography variant="h4" component="h1" className="text-center font-bold mb-8">
        Análise de Habilidades
      </Typography>

      <SkillChart
        skills={top10Skills}
        chartType="bar"
        title="Habilidades Mais Frequentes"
      />
      
      <Box sx={{ my: 6 }} />

      <Typography variant="h5" component="h2" className="font-bold mb-4">
        Recursos de Aprendizagem
      </Typography>
      <ul className="list-disc pl-5 space-y-2">
        {commonSkills.map((skill, index) => {
          const suggestions = courseSuggestions[skill];
          return (
            <li key={index}>
              <span className="font-semibold text-lg">{skill}:</span>
              {suggestions ? (
                <ul className="list-none pl-4 space-y-1 mt-1">
                  {suggestions.map((s, sIndex) => (
                    <li key={sIndex}>
                      <a
                        href={s.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:underline transition-all ${s.platform === 'Alura' ? 'text-green-600' : 'text-blue-600'}`}
                      >
                        {s.platform}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500 ml-2">
                  Nenhuma sugestão de curso encontrada.
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </Box>
  );
}