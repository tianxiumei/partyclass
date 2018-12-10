import React from "react";
import PropTypes from 'prop-types';
import axios from 'axios';
import {
	getdata,
  sub
}from "../../actions/home.js";
import CSSModules from 'react-css-modules';
import styles from "./styles.scss";
import {
	connect
} from 'react-redux';
class Problem extends React.Component{
   constructor(){
   	super();
    this.mounted=false;
    this.state={
      select:[{option:'根本',name:"A",value:"A"},{option:"基本",name:"A",value:"B"}],
      index:0,
      detalis:[],
      anws:[],
      yuoeAn:"",
      ans:"",
      time:29,
      s:60,
      rightNum:0,
      disabled:false,
      completion:"",
      selects1:[],
      color:"red",
      display:"none",
      display2:"",
      checkedA:false,
      checkedB:false,
      checkedC:false,
      checkedD:false,
      checkedE:false,
      checkedF:false,
      textValue:"每个小点用,隔开 每个空用、隔开!!",
      textValues:""
    }
   };
   init=()=>{
    let {detalis}=this.state;
    for(let i=0;i<40;i++){
      let ob={index:i+1,type:""}
      detalis[i]=ob;
    }
    if (this.mounted) {
      this.setState({
        detalis
      })
    }
   }
   componentWillMount() {
    let timer=setInterval(()=>{
      let {time,rightNum,s}=this.state;
      s--;
      if (s==0) {
        time--;
        s=59;
      }
      if (this.mounted) {
        this.setState({
         s,
         time
      })
      }
       if (time===0) {
        clearInterval(timer);
       this.setState({
        display:"block",
        display2:"none"
      })
       
      }
    },1000)
     this.mounted=true;
   }
   componentWillUnmount() {
     this.mounted=true;
   }
   componentDidMount() {
    this.init();
   	this.props.dispatch(getdata()).then(()=>{
      let data=[];
      if (this.props.home) {
        data=this.props.home.data.data
      }
       for(let i=0;i<data.length;i++){
         data[i]={...data[i],yuoeAn:""};
         data[i]={...data[i],ans:""}
       }
    })
   };
   //上一题
   front=()=>{
     
     let {index}=this.state;
     if (index==0) {
      alert("这是第一题！");
      return;
     }
     index--;

    this.setstati(index);
     this.setState({
      index,
       anws:[]
     })
   };
  setstati=(index)=>{
      let data=this.props.home.data.data
      let yuoeAn="";
      let ans="";
      yuoeAn=data[index].yuoeAn;
      ans=data[index].ans;
      if (data[index].type==3) {
        if (ans=='A') {
          ans="对"
        }else if(ans=="B"){
          ans="错"
        }
        if (yuoeAn=="A") {
          yuoeAn="对"
        }else if(yuoeAn=="B"){
          yuoeAn="错"
        }
      }
       if (ans) {

      this.setState({
        disabled:true
      })
     }else{
      yuoeAn=""
      this.setState({
        disabled:false
      })
     }
      this.setState({
      index,
      yuoeAn,
      ans,
      textValues:"",
       anws:[],
       checkedA:false,
       checkedB:false,
       checkedC:false,
       checkedD:false,
       checkedE:false,
       checkedF:false,
      textValue:"每个小点用,隔开 每个空用、隔开!!"
     })
  }
   //下一题
   next=()=>{
     let {index}=this.state;
     if (index==39) {
      alert("这是最后一题！");
      return;
     }
     index++;
     this.setstati(index);
   };
   //点击答题卡
   changeIndex=(index)=>{
     let value=index;
        this.setState({
             index,
             anws:[]
         })
           this.setstati(index)
  
     
   }
   //填空题变化
   handchange=(e)=>{
    let {anws}=this.state;
    let yuoeAn="";
    let data=this.props.home.data.data
    const {type}=data[this.state.index];
     let textValues=e.target.value;
     data[this.state.index].yuoeAn=textValues;
          this.setState({
            completion:e.target.value,
            textValues,
           })
   }
   //重新开始
   re=()=>{
     this.props.history.push('/');
   }
   //提交
   subm=()=>{
     let data=this.props.home.data.data;
     let {index,detalis}=this.state;
     data=data[index];
     let yuoeAn=data.yuoeAn;
     let type=data.type;
      if (data.type==3) {
          if (yuoeAn=="A") {
             this.setState({
               yuoeAn:'对'
             })
          }else if(yuoeAn=="B"){
             this.setState({
                yuoeAn:'错'
             })
          }
     }else{
          this.setState({
                yuoeAn
             })
     }
    
     if (yuoeAn=="") {
      alert("请选择你的答案！！")
      return;
     }
     this.setState({
      disabled:true
     })
     this.props.dispatch(sub(`id=${data.id}&ans=${yuoeAn}`)).then(()=>{
        let {status,ans}=this.props.home.sub.data
        let tt=status;
          detalis[index].type=status;
        let {rightNum}=this.state;
        if (tt==1) {
          rightNum++;

        }
        this.props.home.data.data[index]={...this.props.home.data.data[index],ans}
        if (data.type==3) {
          if (ans=="A") {
            ans="对"
          }else if(ans=="B"){
             ans="错"
          }
        }
        this.setState({
          ans,
          rightNum
        })
        
     })
     
   }
   static contextTypes = {
		route: PropTypes.object,
		location: PropTypes.object,
	};
submm=()=>{
  let {rightNum}=this.state;
this.setState({
  display:"block",
  display2:"none"
})
}
  check=(e)=>{
    e=e||window.event;
    if (!e.target) {
      return
    }
    if ([...e.target.innerHTML][0]==="<") {
      return;
    }
    let value;
      let ss;
     if (e.target.value) {
       value=e.target.value
     }else{
        value=e.target.innerHTML
     }
    ss=[...value][0];
    let tt;
    let dd;
    let {anws}=this.state;
    let yuoeAn="";
    let data=this.props.home.data.data
    const {type}=data[this.state.index];
    if (type!=2) {
      if (ss=="对") {
        tt='A';
      }else if(ss=="错")
      {
        tt="B"
      }else{
        tt=ss;
      }
      if (type==3) {
        anws[0]=e.target.value||tt;
        dd=tt;

      }else{
            anws[0]=e.target.value||ss;
            dd=ss;
      }
     
       switch(dd)
        {
          case 'A':
          this.setState({
            checkedA:true,
            checkedB:false,
            checkedC:false,
            checkedD:false
          });break;
          case 'B':
          this.setState({
            checkedA:false,
            checkedB:true,
            checkedC:false,
            checkedD:false
          });break;
          case 'C':
          this.setState({
            checkedA:false,
            checkedB:false,
            checkedC:true,
            checkedD:false
          });break;
          case 'D':
          this.setState({
            checkedA:false,
            checkedB:false,
            checkedC:false,
            checkedD:true
          });break;
        }
    }else if(type==2){
      let tt=anws.indexOf(e.target.value||ss);
      if (tt==-1) {
         anws.push(ss);
      }else{
        anws.splice(tt,1)
      }
       let checkedA=false;
       let checkedB=false;
       let checkedC=false;
       let checkedD=false;
       let checkedE=false;
       let checkedF=false;
      for(let i=0;i<anws.length;i++){
        let item=anws[i];
        switch(item){
          case 'A':
          checkedA=true;break;
           case 'B':
          checkedB=true;break;
           case 'C':
          checkedC=true;break;
           case 'D':
          checkedD=true;break;
           case 'E':
          checkedE=true;break;
           case 'F':
          checkedF=true;break;
        }
      }
      this.setState({
        checkedA,
        checkedB,
        checkedC,
        checkedD,
        checkedE,
        checkedF
      })
      
    }
    anws=[...new Set(anws)];
    anws.sort()
    
   for(let item of anws)
   {
     yuoeAn+=item;
   };
   data[this.state.index].yuoeAn=yuoeAn;
    this.setState({
      anws,
    })
  }
chan=(e)=>{
  e=e||window.event;
  e.target.checked=true;
}
   render(){
     const getLi=()=>{
       const {detalis}=this.state
      
       let str=detalis.map((index,elem)=>{
        let color;
        let {type}=index
        if (type==-1) {
          color="red"
        }else if(type==1)
           {
            color='#4DB870'
           }
         return(<li style={{background:`${color}`}} onClick={this.changeIndex.bind(this,elem)} key={index.index} value={elem}><span styleName="lit">{index.index}</span></li>)
       })
       return  str
     }
     const getDetalis=()=>{
       const {index}=this.state
       if (this.props.home) {
         let data=this.props.home.data;
             if (this.props.home.data) {
             data=data.data[index];
             const {type}=data;
             const{op1,op2,op3,op4,op5,op6}=data;
             let selects=[];
              
             if (type==1) {
               let ob={};
               selects.push({name:"1",value:`${op1}`,option:"A",checked:this.state.checkedA},
                {name:"1",value:`${op2}`,option:"B",checked:this.state.checkedB},
                {name:"1",value:`${op3}`,option:"C",checked:this.state.checkedC},
                {name:"1",value:`${op4}`,option:"D",checked:this.state.checkedD});
    
                let str=selects.map((index, elem)=> {
                  if (this) {
                       return ( <div  onClick={this.check} value={index.option}    key={index.value}>
                    <input  type="radio" name={index.name} value={index.option} checked={index.checked} onChange={this.chan}/>
                     <label name={index.name} onClick={this.check}>{index.option}:{index.value}</label>
                   
                    </div>);
                  }
                })
                return (<div onClick={this.check} >{str}</div>)
             }else if(type==2){
               selects.push({name:"1",value:`${op1}`,option:"A",checked:this.state.checkedA},
                {name:"1",value:`${op2}`,option:"B",checked:this.state.checkedB},
                {name:"1",value:`${op3}`,option:"C",checked:this.state.checkedC},
                {name:"1",value:`${op4}`,option:"D",checked:this.state.checkedD})
               if (op5!=null) {
                   selects=[...selects,{name:"1",value:`${op5}`,option:"E",checked:this.state.checkedE}]
                 }
                 if (op6!=null) {
                  selects=[...selects,{name:"1",value:`${op6}`,option:"F",checked:this.state.checkedF}]
                 }

                  let str=selects.map((index, elem)=> {
                  return ( <div key={index.value} onClick={this.check}>
                    <input type="checkbox"name={index.option} value={index.option}  checked={index.checked} onChange={this.chan}/>
                    <label >{index.option}:{index.value}</label></div>);
                })
                return str
             }else if (type==3) {
               selects.push({name:"1",value:`对`,option:"A",checked:this.state.checkedA},
                {name:"1",value:`错`,option:"B",checked:this.state.checkedB});
                let str=selects.map((index, elem)=> {
                  return ( <div onClick={this.check} key={index.value}><input type="radio"
                     name={index.name} 
                     value={index.option}
                     checked={index.checked}
                     onChange={this.chan}  />
                    <label>{index.value}</label>
                    </div>);
                })
                return str
             }else{
               selects=[];
                return(<div>
                   <textarea rows="3" cols="40" style={{marginTop:"20px",width:"250px"}} placeholder ={this.state.textValue} onChange={this.handchange} value={this.state.textValues}></textarea>
                </div>)
             }
           }
       }
     }
     const getTitle=()=>{
         const {index}=this.state
         let data=this.props.home.data;
         if (this.props.home.data) {
           data=data.data[index];
           const {content,type}=data;
           if (type) {
               return(<h4>第{index+1}题：{content}</h4>)
           }else{
            // let arr=[...content]
            // console.log(arr)
           }
         }
     }
      let styleObj ={
      display:this.state.display,
    }
    let style2={
      display:this.state.display2
    }
   	return (<div >
      <div styleName="tier"  ref={(tire) => { this.tire = tire }} style={styleObj}>
       <h3>用时{30-this.state.time}分钟</h3>
       <p><span>答对：{this.state.rightNum}</span></p>
          <p><span>正确率：{parseFloat(this.state.rightNum/40*100)}%</span></p>
       <p><input type="button" value="重新开始" onClick={this.re}/></p>
      </div>
     <div styleName="box" style={style2}>
      <div styleName="wrapper">
        <fieldset styleName="marf">
            <legend ><b>倒计时</b></legend>
            <div id="Viewtime">{this.state.time}：{this.state.s}</div>
        </fieldset>
        <fieldset styleName="marf">
            <legend><b>正确题数</b></legend>
            <div id="scores">{this.state.rightNum}</div>
        </fieldset>
       </div>
       <div styleName="problem_content">
           <fieldset  styleName="problem_wrapper">
           <legend><b>考试题目</b></legend>
            <div styleName="title">
               {getTitle()}
            </div>
             <div  styleName="checks">
              { getDetalis()}
             </div>
             <div styleName="problem_botton">
             <span>你的答案：{this.state.yuoeAn}</span>
             &nbsp;&nbsp;&nbsp;&nbsp;
             <span>正确答案：{this.state.ans}</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <div styleName="bott">
                   <input type="button" value="上一题" onClick={this.front}/>
                   <input type="button" value="提交" onClick={this.subm} disabled={this.state.disabled}/>
                   <input type="button" value="下一题" onClick={this.next}/>
                   <input type="button" value="完成" onClick={this.submm}/>
              </div>
             </div>
          </fieldset>
       </div>
     </div>
     <div styleName="bottom" style={style2}>
       <fieldset >
            <legend><b>答题信息</b></legend>
            <ul styleName="exam_ul" >
             {getLi()}
            </ul>
        </fieldset>
     </div>
    </div>)
   }
}
let h=CSSModules(Problem,styles)
export default connect((state)=>{
    return{
      home:state.home
    }
})(h)
