<template>
	<div class="NavBar clearfix">
		<img style="height: 35px;margin: 5px 0 0 10px; float: left;" src="../assets/ia_100000001.png" alt="">
		<p style="font-size: 15px; color: black; margin-left: 10px;float: left;">华为商城管理系统</p>

		<i class="el-icon-s-fold" @click="collapseMenu" style="color: #000000;margin-top: 18px;margin-left: 10px;"></i>
		<el-dropdown style="float: right;padding: 10px 20px;cursor: pointer;">
			<span>
				<img style="width: 30px;border-radius: 15px;vertical-align: middle;" :src="userInfo.avatar">
				<span style="vertical-align: middle;margin-left: 15px;width: 100px;display: inline-block;">{{userInfo.fullname}}</span>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>收到的信息</el-dropdown-item>
				<el-dropdown-item>切换账户</el-dropdown-item>
				<el-dropdown-item>注销</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

	</div>
</template>

<script>
	import { mapMutations, mapState, mapActions } from 'vuex'

	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('User', ['userInfo']),
		},
		methods: {
			...mapMutations('Menu', ['collapseMenu']),
			...mapActions('User', ['loadInfo'])
		},
		created() {
			this.loadInfo().then(user => {
				this.$message({
					message: '欢迎 ' + user.role_name + ' ' + user.username,
					type: 'success',
					duration: 3000,
				});
			})
		}
	}
</script>

<style scoped="scoped">
	.NavBar {
		width: 100%;
		height: 50px;
		color: #FFFFFF;
		background: whitesmoke;
	}


	.clearfix:after {
		content: "";
		display: table;
		clear: both;

	}
</style>
