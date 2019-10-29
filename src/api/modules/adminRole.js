import axios from 'axios';


// 获取全部权限角色
let list = (data) => axios.get('/api/role/list', { params: data });
// 根据角色id获取菜单配置
let config = (data) => axios.get('/api/role/config', { params: data });
// 修改名称
let update = (data) => axios.put('/api/role', data);
let remove = (data) => axios.delete('/api/role', { params: data });
let add = (data) => axios.post('/api/role', data);

export default {
	list,
	config,
	update,
	remove,
	add,
}
