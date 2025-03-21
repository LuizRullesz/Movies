const express = require('express');
const path = require('path');
const axios = require('axios');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 2191;
const API_KEY = process.env.TMDB_API_KEY || 'SUA_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Configurações do aplicativo
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar o Express EJS Layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração para trabalhar com diferentes idiomas
app.use((req, res, next) => {
  // Definir idioma padrão
  res.locals.language = req.query.lang || 'pt-BR';
  next();
});

// Rota principal - página inicial
app.get('/', async (req, res) => {
  try {
    const language = req.query.lang || 'pt-BR';
    const type = req.query.type || 'all';
    const page = req.query.page || 1;
    
    let url;
    if (type === 'all') {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}&page=${page}`;
    } else if (type === 'movie') {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${language}&page=${page}`;
    } else {
      url = `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=${language}&page=${page}`;
    }
    
    const response = await axios.get(url);
    
    res.render('index', { 
      movies: response.data.results, 
      type, 
      page: parseInt(page), 
      totalPages: response.data.total_pages,
      language,
      IMAGE_BASE_URL
    });
  } catch (error) {
    console.error('Erro ao carregar filmes:', error);
    res.status(500).render('error', { error: 'Erro ao carregar filmes' });
  }
});

// Rota para busca
app.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const language = req.query.lang || 'pt-BR';
    
    if (!query) {
      return res.redirect('/');
    }
    
    const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=${language}&query=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    
    // Filtrar resultados que não têm imagem ou título
    const results = response.data.results.filter(item => 
      (item.poster_path || item.backdrop_path) && 
      (item.title || item.name)
    );
    
    res.render('search', { 
      results, 
      query, 
      language,
      IMAGE_BASE_URL
    });
  } catch (error) {
    console.error('Erro na busca:', error);
    res.status(500).render('error', { error: 'Erro ao realizar a busca' });
  }
});

// Rota para detalhes do filme
app.get('/movie/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const language = req.query.lang || 'pt-BR';
    
    const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=${language}&append_to_response=credits,videos`;
    const response = await axios.get(url);
    
    res.render('movie-detail', { 
      movie: response.data,
      language,
      IMAGE_BASE_URL
    });
  } catch (error) {
    console.error('Erro ao carregar detalhes do filme:', error);
    res.status(500).render('error', { error: 'Erro ao carregar detalhes do filme' });
  }
});

// Rota para detalhes da série
app.get('/tv/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const language = req.query.lang || 'pt-BR';
    
    const url = `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=${language}&append_to_response=credits,videos`;
    const response = await axios.get(url);
    
    res.render('series-detail', { 
      series: response.data,
      language,
      IMAGE_BASE_URL
    });
  } catch (error) {
    console.error('Erro ao carregar detalhes da série:', error);
    res.status(500).render('error', { error: 'Erro ao carregar detalhes da série' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 
