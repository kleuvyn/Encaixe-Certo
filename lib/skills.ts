// lib/skills.ts

export const commonSkills: string[] = [
    "python", "sql", "excel", "power bi", "tableau", "javascript", "react", "angular",
    "node.js", "java", "c#", ".net", "php", "ruby", "go", "swift", "kotlin",
    "aws", "azure", "gcp", "docker", "kubernetes", "git", "linux", "unix", "shell scripting",
    "machine learning", "deep learning", "data science", "big data", "data analysis",
    "statistics", "r programming", "spark", "hadoop", "kafka", "etl", "data warehousing",
    "business intelligence", "nlp", "computer vision", "ai", "artificial intelligence",
    "agile", "scrum", "kanban", "project management", "product management",
    "ui/ux", "figma", "adobe xd", "photoshop", "illustrator", "sketch",
    "marketing digital", "seo", "sem", "google analytics", "meta ads", "social media",
    "vendas", "salesforce", "sap", "erp", "crm",
    "comunicação", "resolução de problemas", "pensamento crítico", "liderança", "trabalho em equipe",
    "apresentação", "negociação", "adaptabilidade", "criatividade", "organização",
    "gestão", "finanças", "contabilidade", "orçamento", "relatórios",
    "bancos de dados", "nosql", "mongodb", "postgresql", "mysql", "redis",
    "cloud computing", "devops", "ci/cd", "automação", "testes",
    "cybersecurity", "segurança da informação", "redes", "cloud",
    "web development", "mobile development", "backend", "frontend", "fullstack",
    "spreadsheet", "word", "powerpoint", "ms office", "google suite",
    "consultoria", "business development", "customer success",
    "research", "pesquisa", "análise de dados", "engenharia de dados", "arquitetura de dados"
];

export const processedSkills = commonSkills.map(skill => skill.toLowerCase());
export const commonSkillsSorted = processedSkills.sort((a, b) => b.length - a.length);

export const courseSuggestions: { [key: string]: { platform: string, link: string }[] } = {
    "python": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-linguagem-python" },
    { platform: "Gustavo Guanabara", link: "https://www.cursoemvideo.com/curso/python-3-mundo-1/" }
  ],
  "sql": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-sql" },
    { platform: "Gustavo Guanabara", link: "https://www.cursoemvideo.com/curso/mysql/" }
  ],
  "excel": [
    { platform: "Gustavo Guanabara", link: "https://www.cursoemvideo.com/curso/excell/" }
  ],
  "power bi": [
    { platform: "Data Science Academy", link: "https://www.datascienceacademy.com.br/cursosgratuitos" }
  ],
  "javascript": [
    { platform: "Ada Tech", link: "https://comunidade.ada.tech/cursos/1eee6337-f72e-61e0-f36a-9477308320a9" },
    { platform: "Gustavo Guanabara", link: "https://www.cursoemvideo.com/curso/javascript/" }
  ],
  "react": [
    { platform: "Ada Tech", link: "https://comunidade.ada.tech/cursos/explorar" }
  ],
  "aws": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-aws" }
  ],
  "git": [
    { platform: "Ada Tech", link: "https://comunidade.ada.tech/cursos/explorar" },
    { platform: "Gustavo Guanabara", link: "https://www.cursoemvideo.com/curso/curso-de-git-e-github/" }
  ],
  "machine learning": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-machine-learning" }
  ],
  "data analysis": [
    { platform: "Data Science Academy", link: "https://www.datascienceacademy.com.br/course/fundamentos-de-linguagem-python-para-analise-de-dados-e-data-science" }
  ],
  "comunicação": [
    { platform: "Alura", link: "https://www.alura.com.br/cursos-online-soft-skills/comunicacao" }
  ],
  "resolução de problemas": [
    { platform: "Alura", link: "https://www.alura.com.br/curso-online-resolucao-problemas" }
  ],
  "liderança": [
    { platform: "Alura", link: "https://www.alura.com.br/cursos-online-soft-skills/lideranca" }
  ],
  "agile": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-metodologias-ageis" }
  ],
  "ui/ux": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-ux-ui-design" }
  ],
  "marketing digital": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-marketing-digital" }
  ],
  "business intelligence": [
    { platform: "Alura", link: "https://www.alura.com.br/formacao-business-intelligence" }
  ]
}