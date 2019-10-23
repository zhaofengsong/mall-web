import Vue from 'vue'
import axios from 'axios'

import { Loading, Message } from 'element-ui';
// 引入路由实例
import router from '@/router.js'

let loading;
// 请求拦截器
axios.interceptors.request.use(function(config) {
	// 在发送请求之前做些什么
	loading = Loading.service({ background: 'rgba(0,0,0,0.7)' });
	// 注册,登录请求忽略token检查
	if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
		return config;
	}
	// 获取token
	let token = sessionStorage.token;
	// 若没有token
	if (!token) {
		Message.error({
			message: '请先登录或token已失效!',
			duration: 1000,
			onClose: () => {
				router.replace('/');
				loading.close();
			}
		})
	}
	config.headers.Authorization = `Bearer ${token}`;
	return config;
}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 响应拦截器
axios.interceptors.response.use(({ status, data }) => {
	//在这里你可以判断后台返回数据携带的请求码
	loading.close();
	if (status === 200) {
		return data;
	} else {
		// 非200请求抱错
		throw Error(data.msg || '服务异常');
	}
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
