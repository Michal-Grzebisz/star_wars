import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './components/_Home';

function App() {
  return (
    <>
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/'>
        </Route>
      </Switch>
    </BrowserRouter>
  </>
  );
}

export default App;
