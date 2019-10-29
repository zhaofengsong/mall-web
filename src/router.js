import Vue from 'vue'
import Router from 'vue-router'

import { Message } from 'element-ui';
// 页面级组件

Vue.use(Router)

let router = new Router({
	routes: [{
			path: '/login',
			alias: "/",
			name: 'Login',
			component: () => import("./views/admin/login.vue"),
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import("./views/admin/register.vue"),
		},
		{
			path: '/goods/',
			name: 'Goods',
			component: () => import("@/components/Layout.vue"),
			meta: { auth: true },
			children: [{
					path: 'list',
					name: 'GoodsList',
					component: () => import("./views/goods/list.vue"),
				},
				{
					path: 'edit/:id',
					name: 'GoodsEdit',
					props: true,
					component: () => import("./views/goods/edit.vue"),
				},
				{
					path: 'category',
					name: 'GoodsCategory',
					component: () => import("./views/goods/category.vue"),
				}, {
					path: 'release',
					name: 'GoodsRelease',
					component: () => import("./views/goods/release.vue"),
				}
			],
		},
		{
			path: '/admin/',
			name: 'Admin',
			component: () => import("@/components/Layout.vue"),
			meta: { auth: true },
			children: [{
					path: 'list',
					name: 'AdminList',
					component: () => import("./views/admin/list.vue"),
				},
				{
					path: 'account',
					name: 'AdminAccount',
					component: () => import("./views/admin/account.vue"),
				},
			],
		},
		{
			path: '/role/',
			name: 'Role',
			component: () => import("@/components/Layout.vue"),
			meta: { auth: true },
			children: [{
					path: 'list',
					name: 'RoleList',
					component: () => import("./views/role/list.vue"),
				},
				{
					path: 'config',
					name: 'RoleConfig',
					component: () => import("./views/role/config.vue"),
				},
			],
		},
		{
			path: '/order/',
			name: 'Order',
			component: () => import("@/components/Layout.vue"),
			meta: { auth: true },
			children: [{
					path: 'list',
					name: 'OrderList',
					component: () => import("./views/order/list.vue"),
				},
			],
		},

	]
})
//全局路由守卫
router.beforeEach((to, from, next) => {
	// 判断匹配的路由是否需要权限，如果只要有一个路由匹配则为true，即需要权限，需要登陆
	let isAuth = to.matched.some((item) => item.meta.auth);
	// isAuth:true 无token，跳转到登录页
	// isAuth:true 有token，next()放行
	// isAuth:false 不管token 都next()放行
	if (!isAuth) {
		next();
		return;
	} else if (sessionStorage.token) {
		next();
		return;
	} else {
		// 跳转登录
		Message.error({
			message: '请先登录或token已失效!',
			duration: 1000,
			onClose: () => {
				next({
					path: '/',
					query: { redirect: to.fullPath },
				});
			}
		});

	}
})

export default router
