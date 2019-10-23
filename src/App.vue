<template>
	<div>
		<router-view></router-view>
	</div>
	
</template>
<script>
	import NavBar from '@/components/NavBar.vue';
	import SideBar from '@/components/SideBar.vue';
	export default {
		components: {
			NavBar,
			SideBar,
		}
	}
</script>
<style lang="scss">
	/* 公共类 */
	body{
		margin: 0;
	}
	
</style>
