import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Product from './Product';
import Contact from './Contact';
import About from './About';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import ErrorPage from './ErrorPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Product' element={<Product />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/About' element={<About />} />
        <Route path='/SingleProduct' element={<SingleProduct />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
