from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import Counter
import re
import spacy

app = Flask(__name__)
CORS(app)  


try:
    nlp = spacy.load("pt_core_news_sm")
except OSError:
    print("Baixando o modelo 'pt_core_news_sm' do spaCy. Pode demorar...")
    from spacy.cli import download
    download("pt_core_news_sm")
    nlp = spacy.load("pt_core_news_sm")

# Lista de palavras-chave a serem filtradas
KEYWORDS = [
    "javascript", "python", "java", "c#", "c++", "ruby", "php", "typescript",
    "react", "angular", "vue", "node.js", "express.js", "django", "flask",
    "spring", "asp.net", "laravel", "rails", "sql", "nosql", "mongodb",
    "postgresql", "mysql", "docker", "kubernetes", "aws", "azure", "gcp",
    "git", "github", "gitlab", "jira", "agile", "scrum", "kanban",
    "html", "css", "tailwind", "sass", "less", "webpack", "babel",
    "api", "rest", "graphql", "linux", "windows", "macos", "shell",
    "testes", "jest", "cypress", "selenium", "tdd", "bdd"
]

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    job_description = data.get('jobDescription', '').lower()

    if not job_description:
        return jsonify({"error": "Nenhuma descrição de vaga fornecida"}), 400

    doc = nlp(job_description)
    
    found_skills = []
    
    for keyword in KEYWORDS:
        if re.search(r'\b' + re.escape(keyword) + r'\b', job_description):
            found_skills.append(keyword)

    for ent in doc.ents:
        if ent.label_ in ["ORG", "PRODUCT", "LANGUAGE"]:  
            found_skills.append(ent.text.lower())
            
    skill_counts = Counter(found_skills)
    
    result = [
        {"name": skill, "count": count}
        for skill, count in skill_counts.most_common()
    ]

    return jsonify({"skills": result})

if __name__ == '__main__':
    app.run(debug=True)