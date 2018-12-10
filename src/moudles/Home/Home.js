import React from "react";
import PropTypes from 'prop-types';
import {
	getdata
}from "../../actions/home.js";
import { Link } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from "./Home.scss";
import {
	connect
} from 'react-redux';
class Home extends React.Component{
   constructor(){
   	super()
   };
   componentDidMount() {
   	this.props.dispatch(getdata())
   };
   static contextTypes = {
		route: PropTypes.object,
		location: PropTypes.object,
	};
   render(){
   	return (<div>
      <div styleName="start">
        <div styleName="go"><Link styleName="link"to={"/problem"}>&nbsp;开 始 答 题&nbsp;</Link></div>
         <div styleName="show">
           <p>测试时间：30分钟</p>
           <p>题目数量：40题</p>
           <p>题目类型：多选题 单选题 判断题</p>
           <p>点击上方‘开始答题’进入考试页面并开始计时</p>
        </div>      
      </div>
      </div>)
   }
}
let h=CSSModules(Home,styles)
export default connect((state)=>{
    return{
      todos:state.todos
    }
})(h)
