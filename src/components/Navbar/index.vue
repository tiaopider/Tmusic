<template>
	<nav id="nav_bar">
		<router-link tag="div" class="item" to="/audio"><i class="iconfont icon-yanchu"></i></router-link>
		<router-link tag="div" class="item col" to="/home">推荐</router-link>
		<router-link tag="div" class="item col" to="/mylist">榜单</router-link>
		<router-link tag="div" class="item col" to="/search"><i class="iconfont icon-sousuo"></i></router-link>
	</nav>
</template>

<script>
	export default {
		name: 'Navbar',
		props: [''],
		data() {
			return {

			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {},

		methods: {},

		watch: {}

	}
</script>
<style scoped>
	#nav_bar {z-index: 999;position: fixed;left: 0;top: 0;width: 100vw;height: 45px;box-shadow: 0 0 7px 0px gainsboro;background-color: #FFFFFF !important;display: flex;justify-content: space-between;align-items: center;}
	#nav_bar .item {display: inline-block;height: 100%;line-height: 42px;color: #8F8F8F;font-size: 1.37rem;text-align: center;padding: 0 20px;}
	#nav_bar .item.router-link-active {color: #ff6700;}
	#nav_bar .item i {display: block;font-size: 1.65rem;margin-top:1px;}
</style>
