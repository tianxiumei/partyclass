import actions from"../constants/actions.js";
import axios from 'axios';
const {HOME,HOMESUB}=actions
export function getdata(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`http://www.wangzhengyu.cn/dklxxt/getPro.do${query}`)).data;
			// const data = (await axios.get(`/dklxxt/getPro.do${query}`)).data;
			dispatch({
				type:HOME,
				data: data
			});
		} catch (error) {
			
		}
	};
};
export function sub(query = '') {
	return async(dispatch) => {
		try {
			const data = (await axios.get(`http://www.wangzhengyu.cn/dklxxt/judge.do?${query}`)).data;
			// const data = (await axios.get(`/dklxxt/judge.do?${query}`)).data;
			dispatch({
				type:HOMESUB,
				data: data
			});
		} catch (error) {
			 
		}
	};
};