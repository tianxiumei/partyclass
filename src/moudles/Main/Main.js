import Home from '../Home/Home.js';
import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Problem from '../Problem/Problem.js'
export default class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
           <main>
		    <Switch>
		      <Route exact path='/' component={Home} />
             <Route exact path='/problem' component={Problem} />
		    </Switch>
		  </main>
        );
    }
}
