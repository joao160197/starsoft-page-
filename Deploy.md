Pré-requisitos
Antes de realizar o deploy da aplicação, certifique-se de que você possui o seguinte instalado na sua máquina:

Docker e Docker Compose
Instalação das Dependências
Para rodar a aplicação corretamente, você precisará instalar algumas dependências. Execute os seguintes comandos no terminal:

SASS (para estilos):
npm install -g sass

React Icons (para ícones):
npm install react-icons 

React Query (para sincronização com a API):
npm install @tanstack/react-query@4

Redux (para gerenciamento de estado):
npm install @reduxjs/toolkit

Framer Motion (para animações):
npm install framer-motion

Outras Dependências (instale todas as dependências necessárias):
npm install


Build e Deploy
Após instalar as dependências, você pode buildar e rodar a aplicação utilizando Docker. Siga os passos abaixo:

Build da Imagem Docker:
docker build -t docker-next .


Subir os Containers:
docker-compose up -d --build

Iniciar a Aplicação:
docker-compose up

Executando em Ambiente de Desenvolvimento:
Se você deseja rodar o projeto no ambiente de desenvolvimento sem Docker, execute:
npm run dev


Após o deploy, a aplicação estará acessível em:
Docker: http://'3000:3000'
Vercel: https://starsoft-page.vercel.app/
