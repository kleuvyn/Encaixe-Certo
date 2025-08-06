'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ExternalLink } from 'lucide-react';

interface Resource {
  name: string;
  url?: string; // URL é opcional para a categoria 'Apps'
}

interface ResourceCategory {
  title: string;
  description?: string;
  resources: Resource[];
}

const resourcesData: ResourceCategory[] = [
  {
    title: "Sites de Cursos Gratuitos",
    description: "Plataformas online para aprender novas habilidades de forma autodidata.",
    resources: [
      { name: "Ada - Plataforma de Educação em Tecnologia", url: "https://www.ada.tech/" },
      { name: "Data Science Academy", url: "https://www.datascienceacademy.com.br/" },
      { name: "Curso Gratuito Python - XP Educação", url: "https://www.xpeducacao.com.br/cursos-gratuitos/curso-de-python" },
      { name: "Coursera", url: "https://www.coursera.org/" },
      { name: "edX", url: "https://www.edx.org/" },
      { name: "Khan Academy", url: "https://www.khanacademy.org/" },
      { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
      { name: "Codecademy", url: "https://www.codecademy.com/" },
      { name: "SoloLearn", url: "https://www.sololearn.com/" },
      { name: "Udemy", url: "https://www.udemy.com/" },
      { name: "Mozilla Developer Network (MDN) Web Docs", url: "https://developer.mozilla.org/pt-BR/" },
      { name: "DataCamp", url: "https://www.datacamp.com/" },
      { name: "Escola Virtual", url: "https://www.ev.org.br/" },
      { name: "Escola Nacional de Administração Pública (ENAP)", url: "https://www.enap.gov.br/" },
    ],
  },
  {
    title: "Sites de Exercícios",
    description: "Plataformas para praticar e aprimorar suas habilidades de programação.",
    resources: [
      { name: "HackerRank", url: "https://www.hackerrank.com/" },
      { name: "LeetCode", url: "https://leetcode.com/" },
      { name: "CodeSignal", url: "https://codesignal.com/" },
      { name: "Codewars", url: "https://www.codewars.com/" },
      { name: "Exercism", url: "https://exercism.org/" },
      { name: "TopCoder", url: "https://www.topcoder.com/" },
      { name: "Coderbyte", url: "https://www.coderbyte.com/" },
      { name: "Project Euler", url: "https://projecteuler.net/" },
    ],
  },
  {
    title: "Sites para Montar Trilhas de Estudo",
    description: "Ferramentas e plataformas para planejar sua jornada de aprendizado em tecnologia.",
    resources: [
      { name: "Roadmap.sh", url: "https://roadmap.sh/" },
      { name: "OpenClassrooms", url: "https://openclassrooms.com/pt/" },
      { name: "Coursera", url: "https://www.coursera.org/" },
      { name: "edX", url: "https://www.edx.org/" },
      { name: "Codecademy", url: "https://www.codecademy.com/" },
      { name: "SoloLearn", url: "https://www.sololearn.com/" },
    ],
  },
  {
    title: "Apps de Estudo",
    description: "Aplicativos mobile para aprender e praticar programação em qualquer lugar.",
    resources: [
      { name: "Panda | Python, R e SQL" },
      { name: "Mimo | Aprenda a programar/codar" },
      { name: "Motiro | Aprenda a programar" },
      { name: "SoloLearn" },
      { name: "Enki" },
      { name: "Codecademy Go" },
      { name: "Udacity" },
      { name: "Khan Academy" },
      { name: "Coursera" },
      { name: "edX" },
      { name: "Memrise" },
    ],
  },
  {
    title: "Repositórios e Recursos no GitHub",
    description: "Coleções de código, tutoriais e projetos open source para acelerar seu aprendizado.",
    resources: [
      { name: "FreeCodeCamp", url: "https://github.com/freeCodeCamp" },
      { name: "TensorFlow", url: "https://github.com/tensorflow/tensorflow" },
      { name: "TheAlgorithms", url: "https://github.com/TheAlgorithms" },
      { name: "Public APIs", url: "https://github.com/public-apis/public-apis" },
      { name: "Awesome", url: "https://github.com/sindresorhus/awesome" },
      { name: "30 Seconds of Code", url: "https://github.com/30-seconds/30-seconds-of-code" },
      { name: "Frontend Mentor", url: "https://github.com/frontendmentor" },
      { name: "Real Python", url: "https://github.com/realpython" },
      { name: "Mozilla Developer Network (MDN) Web Docs", url: "https://github.com/mdn/content" },
      { name: "BibliotecaDev", url: "https://github.com/KAYOKG/BibliotecaDev/tree/main/LivrosDev" },
      { name: "Esin", url: "https://github.com/esin" },
      { name: "Florin Pop", url: "https://github.com/florinpop17" },
    ],
  },
  {
    title: "Apostilas Online",
    description: "Fontes de material de estudo em formato de apostilas digitais.",
    resources: [
      { name: "Apostilando.com", url: "http://www.apostilando.com/" },
      { name: "Apostilas Opção", url: "https://www.apostilasopcao.com.br/" },
      { name: "Portal do Professor - MEC", url: "http://portaldoprofessor.mec.gov.br/" },
      { name: "Apostilas Gratuitas", url: "https://www.apostilasgratis.net/" },
      { name: "Apostilas Objetiva", url: "https://apostilasobjetiva.com.br/" },
    ],
  },
  {
    title: "Conversores de Documentos",
    description: "Ferramentas online para gerenciar e converter seus arquivos.",
    resources: [
      { name: "SmallPDF", url: "https://smallpdf.com/pt" },
      { name: "Zamzar", url: "https://www.zamzar.com/" },
      { name: "PDF2Go", url: "https://www.pdf2go.com/" },
      { name: "PDFescape", url: "https://www.pdfescape.com/online/" },
      { name: "PDFsam", url: "https://pdfsam.org/" },
      { name: "PDF Candy", url: "https://pdfcandy.com/" },
      { name: "Online2PDF", url: "https://online2pdf.com/" },
      { name: "PDF2JPG", url: "https://pdf2jpg.net/" },
      { name: "PDF Converter", url: "https://www.pdfconverter.com/" },
      { name: "*PDF.io", url: "https://pdf.io/" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
          Recursos de Estudo
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed font-light">
          Uma curadoria de sites, apps e materiais para impulsionar seu aprendizado em tecnologia.
        </p>
      </header>

      {resourcesData.map((category, index) => (
        <section key={index}>
          <Card className="shadow-sm rounded-md border border-gray-200">
            <CardHeader className="border-b border-gray-100 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {category.title}
              </CardTitle>
              {category.description && (
                <p className="text-sm text-gray-500 mt-1">
                  {category.description}
                </p>
              )}
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.resources.map((resource, resIndex) => (
                  <li key={resIndex} className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    {resource.url ? (
                      <Link
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-blue-600 hover:underline transition-colors text-base font-medium"
                      >
                        {resource.name}
                        <ExternalLink className="h-4 w-4 ml-2 inline text-gray-500" />
                      </Link>
                    ) : (
                      <span className="text-gray-800 font-medium text-base">
                        {resource.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      ))}
    </div>
  );
}