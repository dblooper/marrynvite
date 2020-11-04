import React from 'react';
import './App.module.css'
import Jumbotron from './components/jumbotron/Jumbotron';
import {Route, Switch} from 'react-router-dom' 
import Home from './pages/home/Home'
import Confirm from './pages/confirm/Confirm'
import {withRouter} from 'react-router-dom' //dla celow przewinięcia
import ScrollToTop from './components/items/scrollToTop/ScrollToTop'

function App() {
  let additionalClass = window.location.pathname === '/' ? '' : 'HideHome';

  return (
    <div>
      <div id="jumbo">
        <Jumbotron additional={additionalClass}>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/signup" exact component={Confirm} />
            </Switch>
          </ScrollToTop>
        </Jumbotron>
      </div>
    </div>
  );
}

export default withRouter(props => <App {...props} />)
