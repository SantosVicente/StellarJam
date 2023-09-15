# Stellar Jam

## Tecnologias e Bibliotecas de Frontend

### Framework e Bibliotecas Principais:
- React
- Vite.js
- TypeScript
- Shadcn UI

### Gerenciamento de Estado:
- Redux Toolkit

### Navegação:
- React Router

### Requisições HTTP:
- Axios

### Ferramentas de Desenvolvimento:
- ESLint
- Prettier

### Hospedagem e Implantação:
- Vercel

### Bibliotecas de Áudio:
- Howler.js
- Tone.js
- Sound.js

### Integração com Serviços de Música:
- Spotify API
- ID3.js

# 
## Tecnologias e Bibliotecas de Backend

### Framework e Bibliotecas Principais:
- Fastify
- <a href="https://github.com/fastify/fastify-multipart">Fastify Multipart</a> 
- TypeScript
- Prisma
- MongoDB
- Node.js

### Validação
- Zod
- Validator.js
- JSON Web Tokens (JWT)

### Documentação
- Swagger

### Hospedagem
- Vercel

### Processo do Banco de Dados:

#### Models:
- **Usuários**: Para armazenar informações de usuários, como nome de usuário, email, telefone, senha, preferências de estilos musicais, músicas favoritas e playlists favoritas.

- **Playlists**: Para armazenar informações sobre as playlists, incluindo nome, descrição, proprietário e músicas associadas.

- **Músicas**: Para armazenar informações sobre as músicas, incluindo título, artista, gênero e outros metadados relevantes.

- **Estilos Musicais**: Para armazenar os estilos musicais disponíveis, que podem ser usados para filtrar dados.

#### Autenticação com JWT:
- Ao criar uma conta, os usuários fornecem um nome de usuário, email, telefone e senha.
- As informações são validadas usando Zod e Validator.js.
- Quando um usuário faz login com sucesso, um token JWT é gerado e retornado como resposta.
- O token JWT contém informações de autenticação do usuário.
- Esse token é usado nas solicitações subsequentes para autenticar o usuário nas rotas protegidas.

### Documentação da API:
- A API é documentada usando Swagger ou outra ferramenta de documentação de API.
- A documentação fornece detalhes sobre os endpoints, parâmetros, tipos de retorno e exemplos de uso.

### Implantação:
- A aplicação backend é implantada em um serviço de hospedagem como a Vercel para estar disponível na web.

