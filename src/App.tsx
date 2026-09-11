import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Analyse } from './pages/Analyse';
import { ZoneP } from './pages/Zone';
import Localisation from './pages/Localisation';
import  Country  from './pages/Country';
import Solution from './pages/Solution';

export default function App(){
  return(
    <Routes>
        <Route path='/' element={<Country/>} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Analyse' element={<Analyse />} />
        <Route path='/Zone' element={<ZoneP />} />
        <Route path='/Localisation' element={<Localisation />} />
        <Route path='/Solution' element={<Solution/>} />
    </Routes>
    
  );
}