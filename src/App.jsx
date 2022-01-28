import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { authIsReady } = useAuthContext();

  return (
    <div>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path='/' component={HomePage} exact />
            <Route path='/login' component={LoginPage} exact />
            <Route path='/register' component={RegisterPage} exact />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
