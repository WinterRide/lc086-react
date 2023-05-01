import './App.css';
import List from './pages/ListPage';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AnimeDetail } from './components/animeDetail.jsx';
import { FavPage } from './pages/FavoritePage.jsx';
import { SearchPage } from './pages/SearchPage';

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>AniDev</h1>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
        <Route path="/:animeId" element={<AnimeDetail />}></Route>
        <Route path="/favorite" element={<FavPage />}></Route>
        <Route path="/search" element={<SearchPage />}></Route>
      </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
