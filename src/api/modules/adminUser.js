import axios from 'axios';

let login = (data) => axios.post('/api/admin/login', data);
let register = (data) => axios.post('/api/admin/register', data);
let list = (data) => axios.get('/api/admin/list', { params: data });
let remove = (data) => axios.delete('/api/admin', { params: data });
let update = (data) => axios.put('/api/admin', data);

// 获取用户本人资料
let info = (data) => axios.get('/api/admin', { params: data });

export default {
	login,
	register,
	list,
	remove,
	update,
	info,
}
