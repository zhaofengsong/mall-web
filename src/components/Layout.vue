<template>
	<div id="app">
		<NavBar></NavBar>
		<div class="container">
			<SideBar></SideBar>
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
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

<style scoped>
	body {
		margin: 0;
	}

	.container {
		display: flex;

		.main {
			flex: 1;
		}

	}
</style>
