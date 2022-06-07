import './App.css';
import Main from './pages/main';
import Test from './pages/test';
import Login from './pages/login';
import Cart from './pages/cart';
import Checkout from './pages/checkout';
import Success from './pages/success';
import Master from './pages/master';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ItemProvider } from './hooks/useItemStore';
import { UserProvider } from './hooks/useUserStore';
import { CartProvider } from './hooks/useCart';

function App() {
  return (
    <>
      <CartProvider>
        <ItemProvider>
          <UserProvider>
            <Router>
              <Routes>
                <Route path='/' exact element={<Main />} />
                <Route path='/login' element={<Login />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/success' element={<Success />} />
                <Route path='/test' element={<Test />} />
                <Route path='/master' element={<Master />} />
              </Routes>
            </Router>
          </UserProvider>
        </ItemProvider>
      </CartProvider>
    </>
  );
}

export default App;
