import axios from 'axios';

let info = (data) => axios.get('/api/category/all', { params: data });
let sub = (data) => axios.get('/api/category/sub', { params: data });
let list = (data) => axios.get('/api/category/all', { params: data });
let insert = (data) => axios.post('/api/category', data);
let update = (data) => axios.put('/api/category', data);
let remove = (data) => axios.delete('/api/category', { params: data });

export default {
	info,
	sub,
	list,
	insert,
	update,
	remove,
}
