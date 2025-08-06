'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface DocumentationResource {
  name: string;
  url: string;
}

interface DocumentationCategory {
  title: string;
  resources: DocumentationResource[];
}

const docsData: DocumentationCategory[] = [
  {
    title: "Frontend",
    resources: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/pt-BR/" },
      { name: "React", url: "https://react.dev/" },
      { name: "Vue.js", url: "https://vuejs.org/" },
      { name: "HTML", url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS" },
      { name: "JavaScript", url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript" },
    ],
  },
  {
    title: "Backend",
    resources: [
      { name: "Node.js", url: "https://nodejs.org/en/docs" },
      { name: "Django", url: "https://docs.djangoproject.com/en/stable/" },
      { name: "Spring Framework", url: "https://docs.spring.io/spring-framework/docs/current/reference/html/" },
      { name: "Java", url: "https://docs.oracle.com/en/java/javase/index.html" },
      { name: "Python", url: "https://docs.python.org/3/" },
      { name: "C", url: "https://en.cppreference.com/w/c" },
      { name: "C++", url: "https://en.cppreference.com/w/cpp" },
      { name: "SQL", url: "https://www.w3schools.com/sql/sql_intro.asp" },
      { name: "PHP", url: "https://www.php.net/docs.php" },
      { name: "Ruby", url: "https://www.ruby-lang.org/pt/documentation/" },
      { name: "Swift", url: "https://www.swift.org/documentation/" },
      { name: "Go", url: "https://go.dev/doc/" },
      { name: "Rust", url: "https://doc.rust-lang.org/book/" },
    ],
  },
  {
    title: "DevOps",
    resources: [
      { name: "Docker", url: "https://docs.docker.com/" },
      { name: "Kubernetes", url: "https://kubernetes.io/docs/home/" },
      { name: "Jenkins", url: "https://www.jenkins.io/doc/" },
    ],
  },
  {
    title: "Full Stack",
    resources: [
      { name: "Express.js", url: "https://expressjs.com/" },
      { name: "Meteor", url: "https://www.meteor.com/tutorials" },
      { name: "MEAN Stack", url: "https://www.mongodb.com/mern-stack/mean-stack-tutorial" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="flex flex-col gap-10 py-8">
      <header className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
          Documentação Essencial
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed font-light">
          Uma coleção de links para a documentação oficial das principais tecnologias do mercado.
        </p>
      </header>

      {docsData.map((category, index) => (
        <section key={index}>
          <Card className="shadow-sm rounded-md border border-gray-200">
            <CardHeader className="border-b border-gray-100 p-6">
              <CardTitle className="text-2xl font-semibold text-gray-800">
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.resources.map((resource, resIndex) => (
                  <li key={resIndex} className="flex items-center gap-2">
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-blue-600 hover:underline transition-colors text-base font-medium"
                    >
                      {resource.name}
                      <ExternalLink className="h-4 w-4 ml-2 inline text-gray-500" />
                    </Link>
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