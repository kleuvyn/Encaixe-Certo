import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Puzzle, Github, BookOpen, Library, FileText, Globe } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Encaixe Certo',
  description: 'Descubra as habilidades mais requisitadas pelo mercado de trabalho. Analise e visualize os requisitos de vagas de emprego de forma simples e eficaz.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-gray-100 font-sans antialiased text-gray-800', 
          inter.className
        )}
      >
        <ThemeProvider 
          attribute="class" // Mantém o atributo class para compatibilidade, mas não será usado para alternar temas
          defaultTheme="light" // Define o tema padrão como claro
          enableSystem={false} // Desabilita a detecção automática do tema do sistema
        >
          <div className="flex min-h-screen flex-col">
            <header className="py-6 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm"> 
              <nav className="container mx-auto max-w-5xl flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <Puzzle className="h-6 w-6 text-blue-600" /> 
                  <h1 className="text-xl font-semibold text-gray-900 tracking-wide select-none">
                    Encaixe Certo
                  </h1>
                </Link>

                <div className="flex items-center gap-6">
                  <Link 
                    href="/courses"
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    <BookOpen className="h-4 w-4" />
                    Cursos
                  </Link>
                  <Link 
                    href="/resources"
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    <Library className="h-4 w-4" />
                    Recursos
                  </Link>
                  <Link 
                    href="/docs"
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm"
                  >
                    <FileText className="h-4 w-4" />
                    Docs
                  </Link>
                </div>
              </nav>
            </header>

            <main className="flex-1 container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
              {children}
            </main>

            <footer className="mt-auto border-t border-gray-200 bg-white/75 backdrop-blur-sm py-6">
              <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500 flex flex-col sm:flex-row justify-between items-center">
                <span>
                  Encaixe Certo &copy; {new Date().getFullYear()} Kleuvyn 
                </span>
                <div className="flex items-center gap-4 mt-2 sm:mt-0">
                  <a
                    href="https://kleuvyn.tec.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Acessar o site de Kleuvyn"
                  >
                    <Globe className="h-4 w-4" />
                    <span>kleuvyn.tec.br</span>
                  </a>
                  <a
                    href="https://github.com/kleuvyn/Encaixe-Certo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors"
                    aria-label="Acessar o perfil de Kleuvyn no GitHub"
                  >
                    <Github className="h-4 w-4" />
                    <span>Ver no GitHub</span>
                  </a>
                </div>
              </div>
            </footer>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}