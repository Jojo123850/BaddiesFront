import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Analyse } from './pages/Analyse';
import { ZoneP } from './pages/Zone';
import Localisation from './pages/Localisation';
export default function App(){
  return(
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Analyse' element={<Analyse />} />
        <Route path='/Zone' element={<ZoneP />} />
        <Route path='/Localisation' element={<Localisation />} />
    </Routes>
    
  );
}