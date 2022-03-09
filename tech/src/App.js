import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import RegisterScreen from "./pages/RegisterScreen";

function App() {
  const user = localStorage.getItem('user');
  console.log(user);
  return (
    <Router>        
    <Switch>
      <Route exact path='/'>
       {user ? <HomeScreen /> : <Redirect to="/register" />}
      </Route>
      <Route path='/register'>
       {!user ? <RegisterScreen /> : <Redirect to="/" />}
      </Route>
      <Route path='/login'>
       {!user ? <LoginScreen /> : <Redirect to="/" />}
      </Route>
      user && <Redirect to="/"/>
    </Switch>
  </Router>
  );
}

export default App;
