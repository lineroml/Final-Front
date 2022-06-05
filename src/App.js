import './App.css';
import Main from './pages/main';
import Test from './pages/test';
import Login from './pages/login';
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
                <Route path='login' element={<Login />} />
                <Route path='/test' element={<Test />} />
              </Routes>
            </Router>
          </UserProvider>
        </ItemProvider>
      </CartProvider>
    </>
  );
}

export default App;
