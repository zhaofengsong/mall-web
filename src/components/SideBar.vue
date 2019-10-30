<template>
	<div class="SideBar">
		<el-aside width='200px'>

			<el-menu router :default-openeds="['1']" :collapse='isCollapse'>
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-goods"></i>
						<span>商品管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/goods/list">商品列表</el-menu-item>
						<el-menu-item index="/goods/category">商品分类</el-menu-item>
						<el-menu-item index="/goods/release">发布商品</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span>订单管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/order/list">订单列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span>账户设置</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/account">账户信息</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-s-order"></i>
						<span>用户管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/admin/list">用户列表</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-user-solid"></i>
						<span>权限管理</span>
					</template>
					<el-menu-item-group>
						<el-menu-item index="/role/list">用户角色</el-menu-item>
						<el-menu-item index="/role/config">菜单权限</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside>
	</div>
</template>

<script>
	import { AdminMenu } from '@/api/index.js'

	import { mapState } from 'vuex'

	export default {
		data() {
			return {
				menu: [],
			}
		},

		computed: {
			// 获取store中的数据
			...mapState('Menu', ['isCollapse']),
		},


		methods: {
			// 加载分类
			// async loadNode() {
			// 	let pId = 1;
			// 	let { status, data } = await AdminMenu.sub({ pId })
			// 	// console.log(data);
			// },
		},
		created() {
			// this.loadNode();
		}
	}
</script>


<style scoped="scoped">
	.el-menu:not(.el-menu--collapse) {
		width: 199px;
	}
</style>
