import './assets/style/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import GlobalContextProvider from './context/globalContext';
import Master from './Pages/Master';
import Taluka from './Pages/Taluka';
import Country from './Pages/Country';
import State from './Pages/State';
import District from './Pages/District';

function App() {

  return (
    <>
    <GlobalContextProvider>
        <Routes>
          <Route path='/' element={<Master />} />
          <Route path='/country' element={<Country />} />
          <Route path='/state' element={<State />} />
          <Route path='/district' element={<District />} />
          <Route path='/taluka' element={<Taluka />} />
        </Routes>
    </GlobalContextProvider>
    </>
  );
}

export default App;
