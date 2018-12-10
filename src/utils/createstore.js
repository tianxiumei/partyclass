import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/index.js'

export default function create(initialState){
  const store=createStore(rootReducer
  	,initialState,
  	applyMiddleware(thunk))
  return store
}