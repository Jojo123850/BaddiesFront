import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Analyse } from './pages/Analyse';

export default function App(){
  return(
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Analyse' element={<Analyse />} />
    </Routes>
    
  );
}