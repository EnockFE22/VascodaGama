# VascodaGama
Site com informações a respeito do Gigante da Colina

# 📄 Dashboard de Clube de Futebol

## 📁 Descrição

Este projeto é um painel interativo que exibe informações de um clube de futebol (como nome, fundação, elenco, partidas e transferências), utilizando dados de um arquivo `data.json`.

---

## 🚀 Requisitos

- Node.js (recomenda-se a versão LTS)
- http-server (instalar globalmente se ainda não tiver):

```bash
npm install -g http-server
```

---

## ▶️ Como iniciar o projeto

Navegue até a pasta onde está localizado seu projeto:

```bash
cd caminho/do/seu/projeto
```

Inicie o servidor local na porta 3000:

```bash
http-server -p 3000
```

Acesse no navegador:

- http://127.0.0.1:3000
- http://192.168.1.8:3000 (em rede local)

Abra um dos endereços acima no navegador. Você verá a interface com as informações do clube carregadas a partir de `data/data.json`.

---

## 🛠 Estrutura do Projeto

Tecnologias utilizadas:
- HTML
- Bootstrap
- JavaScript
- JSON

```
projeto/
├── assets/         
│   └── img/
├── js/
│   └── script.js                   # Lógica JavaScript do projeto
├── pages/
│   └── checkin.html
├── data/
│   └── data.json                  # Arquivo com os dados do clube
└── index.html                      # Página principal (Dashboard)
```

---

## ✅ Funcionalidades

- Exibe dados básicos do clube (nome, fundação, cores)
- Lista o elenco com nome, posição e idade
- Exibe partidas com datas formatadas para o padrão brasileiro
- Mostra contadores de vitórias, empates e derrotas
- Exibe transferências
- Mostra outras informações como cards (caso existam)

