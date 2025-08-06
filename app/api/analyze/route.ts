import { NextResponse } from 'next/server';
import { commonSkillsSorted } from '@/lib/skills';

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'Texto inválido fornecido.' }, { status: 400 });
    }

    const textLower = text.toLowerCase();
    const skillFrequencies: { [key: string]: number } = {};

    for (const skill of commonSkillsSorted) {
      const pattern = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
      const matches = textLower.match(pattern);

      if (matches) {
        skillFrequencies[skill] = (skillFrequencies[skill] || 0) + matches.length;
      }
    }

    const sortedSkills = Object.entries(skillFrequencies)
      .sort(([, freqA], [, freqB]) => freqB - freqA)
      .map(([skill, frequency]) => ({ skill, frequency }));

    return NextResponse.json({ skills: sortedSkills });

  } catch (error) {
    console.error('Erro na API de análise:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
