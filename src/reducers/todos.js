import actions from"../constants/actions.js";
const {HOME,HOMESUB}=actions
const Home = (state = [], action) => {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        data:action.data
      }
      case HOMESUB:
      return{
      	...state,
        sub:action.data
      }
    default:
      return state
  }
}

export default Home