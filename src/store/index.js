import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu/index.js'
import User from './modules/user/index.js'

Vue.use(Vuex)

let store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		Menu,
		User,
	}
});

export default store
