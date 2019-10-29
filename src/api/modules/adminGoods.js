import axios from 'axios';

let list = (data) => axios.get('/api/admin/goods/list', { params: data });
let remove = (data) => axios.delete('/api/admin/goods', { params: data });
let info = (data) => axios.get('/api/admin/goods', { params: data });
let edit = (data) => axios.put('/api/admin/goods', data);
let release = (data) => axios.post('/api/admin/goods', data);

export default {
	list,
	remove,
	info,
	edit,
	release,
}
