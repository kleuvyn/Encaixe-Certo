'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  BarChart, Bar, PieChart, Pie, Tooltip, ResponsiveContainer, Cell, XAxis, YAxis, CartesianGrid, LineChart,
  Line, AreaChart, Area
} from 'recharts';

interface SkillFrequency {
  skill: string;
  frequency: number;
}

interface SkillChartProps {
  skills: SkillFrequency[];
  chartType: 'bar' | 'pie' | 'line' | 'area';
  title?: string;
  colors?: string[];
  maxItems?: number;
}

interface PieChartLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const DEFAULT_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A288E8', '#FF6666'];

export default function SkillChart({
  skills,
  chartType,
  title,
  colors = DEFAULT_COLORS,
  maxItems = 10,
}: SkillChartProps) {
  const chartTitle = title || 'Distribuição de Habilidades';

  if (!skills || skills.length === 0) {
    return (
      <Box className="flex items-center justify-center h-full">
        <Typography variant="body1" className="text-gray-500">
          Nenhum dado para o gráfico.
        </Typography>
      </Box>
    );
  }

  const sortedSkills = [...skills].sort((a, b) => b.frequency - a.frequency);
  const dataToShow = sortedSkills.slice(0, maxItems);

  // Use a nova interface aqui para tipar os parâmetros
  const renderPieChartLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }: PieChartLabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={colors[index % colors.length]}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '12px' }}
      >
        {`${dataToShow[index].skill}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataToShow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="skill" tick={{ fill: '#4b5563', fontSize: 12 }} />
              <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Bar dataKey="frequency" fill={colors[0] || DEFAULT_COLORS[0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataToShow}
                dataKey="frequency"
                nameKey="skill"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={renderPieChartLabel}
                labelLine={false}
              >
                {dataToShow.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataToShow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="skill" tick={{ fill: '#4b5563', fontSize: 12 }} />
              <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Line type="monotone" dataKey="frequency" stroke={colors[0] || DEFAULT_COLORS[0]} strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dataToShow}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="skill" tick={{ fill: '#4b5563', fontSize: 12 }} />
              <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
              <Area type="monotone" dataKey="frequency" stroke={colors[0] || DEFAULT_COLORS[0]} fillOpacity={0.8} fill={colors[0] || DEFAULT_COLORS[0]} />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="w-full">
      <Typography variant="h6" component="h2" className="text-center mb-4">
        {chartTitle}
      </Typography>
      {renderChart()}
    </Box>
  );
}
