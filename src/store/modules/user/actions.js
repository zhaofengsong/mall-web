import { AdminUser } from '@/api/index.js'

export default {
	async loadInfo({ commit }) {
		let id = sessionStorage.id;
		let { status, data } = await AdminUser.info({ id });
		if (status) {
			commit('saveUserInfo', data);
		}
		return data;
	}
}
