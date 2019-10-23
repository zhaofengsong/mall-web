import axios from 'axios';

// 显示菜单栏
let list = (data) => axios.get('/api/menu/tree', { params: data });
// 更新子菜单
let update = (data) => axios.put('/api/menu', data);
let remove = (data) => axios.delete('/api/menu', { params: data });
let add = (data) => axios.post('/api/menu', data);
// 设置子菜单图标
let set = (data) => axios.put('/api/menu/icon', data);
// 获取子菜单
let sub = (data) => axios.get('/api/menu/sub', { params: data });
// 获取所有图标
let icon = (data) => axios.get('/api/admin/icon/list', { params: data });

export default {
	list,
	update,
	remove,
	add,
	set,
	sub,
	icon,
}
