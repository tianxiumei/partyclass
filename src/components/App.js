import React from 'react';
import Header from '../moudles/Header/Header.js'
import Main from "../moudles/Main/Main.js";
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './styles.scss'
class App extends React.Component {
    constructor(props) {
        super(props);
    };
    static childContextTypes = {
        location: PropTypes.object,
        route: PropTypes.object
    };
    static contextTypes = {
    	  location: PropTypes.object,
        router: PropTypes.object
    };
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route
        }
    }
    render() {
        return (
            <div styleName="wrapper">
                <Main/>
			</div>
        );
    }
}
export default CSSModules(App,styles)
