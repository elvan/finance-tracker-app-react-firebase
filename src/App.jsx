import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/' exact>
              {user && <HomePage />}
              {!user && <Redirect to='/login' />}
            </Route>
            <Route path='/login' exact>
              {!user && <LoginPage />}
              {user && <Redirect to='/' />}
            </Route>
            <Route path='/register' exact>
              {!user && <RegisterPage />}
              {user && <Redirect to='/' />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
