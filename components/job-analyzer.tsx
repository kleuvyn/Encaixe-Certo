'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SkillChart from '@/components/skill-chart';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2, Info, BarChart, PieChart, LineChart, AreaChart, BookOpen, ExternalLink } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Link from 'next/link';

interface SkillFrequency {
  skill: string;
  frequency: number;
}

interface Course {
  title: string;
  provider: string;
  url: string;
  skills: string[];
}

const mockCourses: Course[] = [
  {
    title: "Python 3 – Mundo 1",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/python-3-mundo-1/",
    skills: ["python"],
  },
  {
    title: "Python 3 – Mundo 2",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/python-3-mundo-2/",
    skills: ["python"],
  },
  {
    title: "Python 3 – Mundo 3",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/python-3-mundo-3/",
    skills: ["python"],
  },
  {
    title: "Curso de Banco de Dados (MySQL)",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/mysql/",
    skills: ["sql", "banco de dados"],
  },
  {
    title: "Curso de Git e GitHub",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/curso-de-git-e-github/",
    skills: ["git", "github"],
  },
  {
    title: "Curso de JavaScript",
    provider: "Curso em Vídeo (Gustavo Guanabara)",
    url: "https://www.cursoemvideo.com/curso/javascript/",
    skills: ["javascript"],
  },
  {
    title: "Curso de Power BI Gratuito",
    provider: "Data Science Academy (DSA)",
    url: "https://www.datascienceacademy.com.br/cursosgratuitos",
    skills: ["power bi", "data visualization"],
  }
];

const getSuggestedCourses = (skills: SkillFrequency[]): Course[] => {
  const suggested: Course[] = [];
  const addedCourseUrls = new Set<string>(); 

  const sortedSkills = [...skills].sort((a, b) => b.frequency - a.frequency);

  for (const skillFreq of sortedSkills) {
    const skillName = skillFreq.skill.toLowerCase();
    for (const course of mockCourses) {
      if (
        course.skills.some((s) => skillName.includes(s) || s.includes(skillName)) &&
        !addedCourseUrls.has(course.url)
      ) {
        suggested.push(course);
        addedCourseUrls.add(course.url);
        if (suggested.length >= 5) {
          return suggested;
        }
      }
    }
  }
  return suggested;
};

export default function JobAnalyzer() {
  const [jobDescriptions, setJobDescriptions] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<SkillFrequency[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'line' | 'area'>('bar');
  const [suggestedCourses, setSuggestedCourses] = useState<Course[] | null>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!jobDescriptions.trim()) {
      toast({
        title: 'Campo Vazio',
        description: 'Por favor, cole o texto de pelo menos uma descrição de vaga para analisar.',
        variant: 'destructive',
      });
      setAnalysisResult(null);
      setSuggestedCourses(null);
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);
    setSuggestedCourses(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: jobDescriptions }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao analisar as descrições.');
      }

      const data = await response.json();
      const skills = data.skills as SkillFrequency[];
      setAnalysisResult(skills);
      setSuggestedCourses(getSuggestedCourses(skills)); 
      toast({
        title: 'Análise Concluída!',
        description: 'As habilidades e requisitos foram analisados com sucesso.',
      });
    } catch (err: any) {
      console.error('Erro na requisição:', err);
      toast({
        title: 'Erro na Análise',
        description: err.message || 'Ocorreu um erro inesperado ao analisar. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-12 gap-10 w-full max-w-5xl mx-auto">
      <header className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
          Descubra o seu <span className="text-blue-600">Encaixe Certo</span> no mercado de trabalho.
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed font-light">
          Analise descrições de vagas e visualize as habilidades mais demandadas de forma clara e objetiva.
        </p>
      </header>

      <Card className="w-full shadow-md rounded-md border border-gray-200">
        <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
          <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
            Comece sua análise
          </CardTitle>
          <CardDescription className="text-gray-500 leading-relaxed text-sm">
            Cole as descrições das vagas e veja as habilidades em destaque.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 py-6">
          <div className="mb-4">
            <Textarea
              placeholder="Cole aqui as descrições das vagas..."
              value={jobDescriptions}
              onChange={(e) => setJobDescriptions(e.target.value)}
              rows={8}
              className="w-full rounded-md border border-gray-300 p-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder:text-gray-400"
              aria-label="Campo para colar descrições de vagas"
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-6 rounded-md shadow-sm transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analisando...
                </>
              ) : (
                'Analisar'
              )}
            </Button>
          </div>
          {analysisResult && analysisResult.length > 0 && (
            <div className="mt-8 space-y-10"> 
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Habilidades Mais Frequentes
                </h2>
                <Card className="shadow-sm rounded-md border border-gray-200">
                  <CardContent className="p-4">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead className="w-[200px] text-sm font-medium text-gray-700 py-2 px-3">Habilidade</TableHead>
                            <TableHead className="text-right text-sm font-medium text-gray-700 py-2 px-3">Frequência</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analysisResult.slice(0, 50).map((item, index) => (
                            <TableRow key={index} className="hover:bg-gray-100 transition-colors">
                              <TableCell className="text-sm text-gray-800 py-2 px-3">{item.skill.charAt(0).toUpperCase() + item.skill.slice(1)}</TableCell>
                              <TableCell className="text-right text-sm text-gray-700 py-2 px-3">{item.frequency}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>
              <section>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">Visualização</h2>
                  <ToggleGroup
                    type="single"
                    value={chartType}
                    onValueChange={(value: 'bar' | 'pie' | 'line' | 'area') => {
                      if (value) setChartType(value);
                    }}
                    className="bg-gray-100 rounded-md p-1"
                  >
                    <ToggleGroupItem value="bar" aria-label="Gráfico de Barras" className="rounded-md focus:outline-none">
                      <BarChart className={`h-8 w-8 ${chartType === 'bar' ? 'text-blue-600' : 'text-gray-500'}`} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="pie" aria-label="Gráfico de Pizza" className="rounded-md focus:outline-none">
                      <PieChart className={`h-8 w-8 ${chartType === 'pie' ? 'text-blue-600' : 'text-gray-500'}`} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="line" aria-label="Gráfico de Linhas" className="rounded-md focus:outline-none">
                      <LineChart className={`h-8 w-8 ${chartType === 'line' ? 'text-blue-600' : 'text-gray-500'}`} />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="area" aria-label="Gráfico de Área" className="rounded-md focus:outline-none">
                      <AreaChart className={`h-8 w-8 ${chartType === 'area' ? 'text-blue-600' : 'text-gray-500'}`} />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <Card className="shadow-sm rounded-md border border-gray-200">
                  <CardContent className="p-4">
                    <SkillChart skills={analysisResult} chartType={chartType} />
                  </CardContent>
                </Card>
              </section>
              {suggestedCourses && suggestedCourses.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">
                    Sugestão de Cursos Gratuitos
                  </h2>
                  <Card className="shadow-sm rounded-md border border-gray-200">
                    <CardContent className="p-4">
                      <ul className="space-y-3">
                        {suggestedCourses.map((course, index) => (
                          <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                            <BookOpen className="h-5 w-5 text-blue-500 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-800">{course.title}</h3>
                              <p className="text-sm text-gray-600">{course.provider}</p>
                              <Link
                                href={course.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm mt-1 transition-colors"
                                aria-label={`Acessar curso ${course.title}`}
                              >
                                Acessar Curso
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </Link>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </section>
              )}
            </div>
          )}
          {analysisResult === null && !isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-gray-500 text-center">
              <Info className="h-10 w-10 mb-3 text-blue-400" />
              <p className="text-sm font-medium">
                Cole as descrições das vagas e clique em "Analisar" para ver os resultados aqui.
              </p>
            </div>
          )}
          {analysisResult && analysisResult.length === 0 && !isLoading && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md flex items-center gap-2 mt-6">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                Nenhuma habilidade relevante encontrada. Tente com outras descrições.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}