import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { GenreSelect } from './pages/GenreSelect';
import { CategorySelect } from './pages/CategorySelect';
import { Study } from './pages/Study';
import { Review } from './pages/Review';
import { Stats } from './pages/Stats';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<GenreSelect />} />
        <Route path="/genre/:genreId" element={<CategorySelect />} />
        <Route path="/study/:genreId/:categoryId/:mode" element={<Study />} />
        <Route path="/review" element={<Review />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
