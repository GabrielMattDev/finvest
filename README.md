Finvest
<p align="center">
  <img src="assets/logo.png" alt="Finvest Logo" width="180">
</p>
<p align="center">
  <b>Gestão Financeira e Investimentos</b><br>
  <i>Controle seu dinheiro, simule seus investimentos e acompanhe o mercado em um só lugar.</i>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-0a3d2e?style=flat-square">
  <img src="https://img.shields.io/badge/license-MIT-0f2c59?style=flat-square">
  <img src="https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-c9a227?style=flat-square">
</p>
Sobre
Finvest é uma aplicação web para gestão financeira pessoal e simulação de investimentos. Desenvolvida com foco em simplicidade, visualização de dados e tomada de decisão financeira, a plataforma permite:
📊 Gestão Financeira — Importe planilhas Excel, visualize KPIs, gráficos de evolução patrimonial e distribuição de gastos
📰 Notícias do Mercado — Acompanhe as principais notícias do mercado financeiro em layout editorial
💰 Investimentos e Simulação — Compare os melhores investimentos do mercado e simule retornos com aportes mensais
Funcionalidades
1. Gestão Financeira
Dashboard com 4 KPIs principais (patrimônio, receitas, despesas, investimentos)
Gráfico de linha com evolução patrimonial dos últimos 12 meses
Gráfico de donut com distribuição de gastos por categoria
Tabela de transações com categorização e status
Upload de planilhas Excel/CSV para importação automática de dados
2. Notícias do Mercado
Layout estilo jornal com card em destaque
Grid de notícias por categoria (cripto, economia, câmbio, fundos, indicadores)
Cards com data, tempo de leitura e categoria colorida
3. Investimentos / Simulação
Lista dos melhores investimentos do mercado com taxas atualizadas
Badge "recomendado" para destaque
Simulador funcional com:
Valor inicial e aporte mensal
Seleção de período (1 a 20 anos)
Cálculo de montante final, total investido e rendimento
Gráfico de crescimento em tempo real
Tecnologias
Planilhas
Camada	Tecnologia
Estrutura	HTML5
Estilização	CSS3 (variáveis CSS, Grid, Flexbox, animações)
Lógica	Vanilla JavaScript (ES6+)
Gráficos	SVG nativo (sem bibliotecas externas)
Autenticação	localStorage (sessão simples)
Design	Tema escuro com paleta baseada na identidade visual
Estrutura do Projeto
plain
finvest/
├── index.html              # Tela de login
├── dashboard.html          # Dashboard principal (3 abas)
├── README.md               # Este arquivo
├── assets/
│   ├── logo.png            # Logo principal (Option 3)
│   └── logo_full.png       # Imagem completa com as 3 opções
├── css/
│   ├── login.css           # Estilos da tela de login
│   └── style.css           # Estilos do dashboard
└── js/
    ├── login.js            # Autenticação e sessão
    └── app.js              # Lógica do dashboard, gráficos e simulador
Como Executar
Localmente
Clone o repositório:
bash
git clone <url-do-repositorio>
cd finvest
Abra o arquivo index.html em qualquer navegador moderno:
bash
# Linux/Mac
open index.html

# Windows
start index.html
Ou use uma extensão de Live Server (VS Code) para desenvolvimento.
Credenciais de Acesso (desenvolvimento)
Usuário: admin
Senha: admin
A autenticação utiliza localStorage para manter a sessão ativa entre recarregamentos.
Paleta de Cores
A identidade visual do Finvest foi construída a partir da Option 3 da logo, com tons que remetem a dinheiro, crescimento e confiança:
Planilhas
Cor	Hex	Uso
Azul-marinho (fundo)	#0b1a3a	Background principal
Azul-profundo (cards)	#0d1f45	Superfícies elevadas
Verde-crescimento	#22c55e	Positivo, gráficos, investimentos
Dourado-acento	#c9a227	Destaques, badges, hover
Azul-dados	#3b82f6	Séries secundárias
Roxo-multimercado	#a855f7	Categorias diversas
Vermelho-alerta	#ef4444	Negativo, despesas, erro
Roadmap
[ ] v1.1 — Conexão com API de cotações em tempo real (Brapi, Alpha Vantage)
[ ] v1.2 — Parser de planilhas Excel (.xlsx) com SheetJS
[ ] v1.3 — Exportação de simulações em PDF/Excel
[ ] v1.4 — Modo claro/escuro toggle
[ ] v2.0 — Backend com autenticação real e persistência de dados
[ ] v2.1 — PWA (Progressive Web App) para instalação mobile
Contribuição
Contribuições são bem-vindas! Para propor melhorias:
Faça um fork do projeto
Crie uma branch para sua feature (git checkout -b feature/nova-funcionalidade)
Commit suas mudanças (git commit -m 'feat: adiciona nova funcionalidade')
Push para a branch (git push origin feature/nova-funcionalidade)
Abra um Pull Request
Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
<p align="center">
  <sub>Finvest — Feito com 💚 e 📈 para quem quer crescer.</sub>
</p>