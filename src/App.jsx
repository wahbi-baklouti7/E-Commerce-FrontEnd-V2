import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import ArticlesApp from './Components/Article/ArticlesApp';
import CategorieApp from './Components/Categorie/CategorieApp';
import ScategorieApp from './Components/Scategorie/ScategorieApp';
import NavScroll from './Components/Shared/NavScroll';




function App() {

  return (
    
      
    <Router>
      <NavScroll/>
      <Routes>
        
        <Route path='/articles' element={<ArticlesApp />} />
        <Route path='/categories' element={<CategorieApp />} />
        <Route path='/scategories' element={<ScategorieApp />} />
        </Routes>
      </Router>
    
  )
}

export default App
