import axios from 'axios';

// let update = (data) => axios.put('/api/category', data);
let remove = (data) => axios.delete('/api/upload', { params: data });

export default {
	remove,
}
