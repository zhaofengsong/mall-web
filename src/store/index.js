import Vue from 'vue'
import Vuex from 'vuex'

import Menu from './modules/menu/index.js'
import User from './modules/user/index.js'
import Cart from './modules/cart/index.js'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 手写插件原理
// let persist = store => {
// 	// 当 store 初始化后调用,取出localStorage中的state
// 	if (localStorage.state) {
// 		store.replaceState(JSON.parse(localStorage.state));
// 	}
// 	store.subscribe((mutation, state) => {
// 		// 每次 mutation 之后调用
// 		// mutation 的格式为 { type, payload }
// 		localStorage.state = JSON.stringify(state);
// 	})
// }


const store = new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: {
		Menu,
		User,
		Cart,
	},
	// vuex持久化保存数据插件
	// plugins: [persist],
	plugins: [createPersistedState()],
});

export default store
