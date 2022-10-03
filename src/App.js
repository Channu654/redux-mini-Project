import { Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import ProductDetails from './pages/ProductDetails';
import Home from './pages/Home';
import Shop from './pages/Shop';

function App() {
  return (
    <div className='App'>
      <Navbar />
      {/* <h1>Please click on shop.....</h1> */}

      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/' element={<Shop />} />
        <Route path='/collection/all/:id' element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
