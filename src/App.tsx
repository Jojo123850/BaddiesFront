import { Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Analyse } from './pages/Analyse';
import { ZoneP } from './pages/Zone';
import Localisation from './pages/Localisation';
import  Country  from './pages/Country';
import Recap from './pages/Recap';
import { EvaluationProvider } from './evaluation/evaluationContext';
import { Solution } from './pages/Solution';
import MedicalAlert from './pages/MedicalAlert';
import { RulesAlert } from './pages/Rules';
import Login from './components/login';
// import Login from './components/Login';
import Register from './components/Register';
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';
import { History } from './pages/History';
import Episode from './pages/Episode';

export default function App(){
  return(
      <EvaluationProvider>
            <Routes>
                <Route path='/' element={<Country/>} />
                <Route path='/Register' element={<Register/>} />
                <Route path='/Login' element={<Login/>} />
                <Route path='/ForgotPassword' element={<ForgotPassword/>} />
                <Route path='/ResetPassword' element={<ResetPassword />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Analyse' element={<Analyse />} />
                <Route path='/Zone' element={<ZoneP />} />
                <Route path='/Localisation' element={<Localisation />} />
                <Route path='/Recapitulatif' element={<Recap/>} />
                <Route path='/Analyse de réponse' element={<RulesAlert/> }/>
                <Route path='/Alerte' element={<MedicalAlert/>} />
                <Route path='/Solution' element={<Solution/>} />
                <Route path='/Historique' element={<History/>} />
                <Route path='/Historique/:id' element={<Episode/>} />

            </Routes>
      </EvaluationProvider>
    
  );
}