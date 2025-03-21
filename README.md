# Site de Filmes e Séries

Um site para descobrir e explorar filmes e séries usando a API do TMDB.

Link do site rodando: http://node1.lunes.host:2191

## Funcionalidades

- Listagem de filmes e séries populares
- Busca por título
- Detalhes completos de filmes e séries
- Paginação
- Suporte a múltiplos idiomas
- Design responsivo

## Tecnologias

- Node.js
- Express
- EJS Templates
- TMDB API
- Axios
- CSS (Responsive)

## Instalação

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd movies-node-app
```

2. Instale as dependências
```bash
npm install
```

3. Configure o arquivo .env com sua API key do TMDB
```
PORT=3000
TMDB_API_KEY=sua_api_key_aqui
```

4. Inicie o servidor
```bash
npm start
```

5. Para desenvolvimento (com hot reload)
```bash
npm run dev
```

6. Acesse o site em http://localhost:3000

## Deployment

Para deploy em plataformas de hospedagem, como Heroku, Vercel ou Railway:

1. Faça o push do código para um repositório Git
2. Configure a plataforma de hospedagem para usar o repositório
3. Configure as variáveis de ambiente (PORT e TMDB_API_KEY)
4. O comando de inicialização será `npm start`

## API Key do TMDB

Para obter uma API key do TMDB:
1. Crie uma conta em https://www.themoviedb.org/
2. Vá para as configurações da conta
3. Acesse a seção de API
4. Solicite uma nova API key para uso pessoal

## Licença

MIT 
