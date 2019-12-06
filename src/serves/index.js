import axios from 'axios'
import Vue from 'vue'
import store from '../store/store'
import HOST_CONF from '../../build/config.js'
import { Notify } from 'vant'
Vue.use(Notify)

axios.defaults.timeout = 3000
axios.defaults.withCredentials = true // 解决跨域cookie丢失问题
axios.defaults.retry = 10; // 重试次数
axios.defaults.retryDelay = 1000; // 重试延时，1秒重试一次
axios.default.shouldRetry = (error) => true // 重试条件，默认只要是错误都需要重试

// 领航本机-孝平环境
// axios.defaults.baseURL = 'http://10.0.20.220:8083'

// baseUrl
axios.defaults.baseURL = HOST_CONF.baseUrl

//http request 拦截器
axios.interceptors.request.use(
	config => {
		config.headers = {
			'Content-Type':'application/json'
		}
		return config; 
	},
	error => {
		return Promise.reject(err);
	}
)


//http response 拦截器
axios.interceptors.response.use(
	response => {
		return response
	},
	// 超时重连
	function axiosRetryInterceptor(err) { 
		let config = err.config

		// 判断是否配置了重试
		if(!config || !config.retry) return Promise.reject(err)

		// 超过指定重试次数后，停止重试
		config.__retryCount = config.__retryCount || 0
		if (config.__retryCount >= config.retry) { 
			store.state.showLoading = false
			if(err.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
				console.log('------------请求超时------------');
				Notify({
					message: '请求超时',
					duration: 2000,
					className: 'vantNotify'
				})
				return Promise.reject(err)
			  }
			if(err.message.includes('Network Error')){   // 判断请求异常信息中是否含有网络错误Network Error字符串
				console.log('------------网络错误------------');
				Notify({
					message: '网络错误',
					duration: 2000,
					className: 'vantNotify'
				})
				return Promise.reject(err)
			}
			return Promise.reject(err) 
		}

		// 重试次数自增
		config.__retryCount += 1
		
		// 延时处理
		let backoff = new Promise(function(resolve) {
			setTimeout(function() {
				resolve();
			}, config.retryDelay || 1)
		})

		// 重新发起axios请求
		return backoff.then(function() {
			return axios(config)
		});
	},
	error => {
		return Promise.reject(error)
	}
)

const reqFunc = {

	/**
		* 封装get方法
		* @param url
		* @param data
		* @returns {Promise}
	*/
	get: function get(url,params={}){
		return new Promise((resolve,reject) => {
			axios.get(url,{
				params:params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
		})
	},

	/**
		* 封装post请求
		* @param url
		* @param data
		* @returns {Promise}
	*/
	post: function post(url,data = {}){
		return new Promise((resolve,reject) => {
			axios.post(url,data).then(response => {
				resolve(response.data);
			},err => {
				reject(err)
			})
		})
	},

	/**
		* 封装patch请求
		* @param url
		* @param data
		* @returns {Promise}
	*/
	patch: function patch(url,data = {}){
		return new Promise((resolve,reject) => {
			axios.patch(url,data).then(response => {
				resolve(response.data);
			},err => {
				reject(err)
			})
		})
	},

	/**
		* 封装put请求
		* @param url
		* @param data
		* @returns {Promise}
	*/
	put: function put(url,data = {}){
		return new Promise((resolve,reject) => {
			axios.put(url,data).then(response => {
				resolve(response.data);
			},err => {
				reject(err)
			})
		})
	},
	
	/**
		* 封装delete请求
		* @param url
		* @param data
		* @returns {Promise}
	*/
	delete: function DELETE(url,params = {}){
		return new Promise((resolve,reject) => {
			axios.delete(url,{
				params:params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}
export default reqFunc
