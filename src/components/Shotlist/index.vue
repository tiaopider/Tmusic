<template>
	<section class="s-hotlist">
		<h3 class="title">热门搜索</h3>
		<ul class="list">
			<li class="item" v-for="hot in hotlist" :key="hot.first"><a class="link" href="javascript:void(0);">{{hot.first}}</a></li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'Shotlist',
		props: {},
		data() {
			return {
				hotlist: []
			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {
			this.$axios.get("/api/search/hot", {
				params: {}
			}).then((res) => {
				if (res.status == 200 && res.statusText === "OK") {
					this.hotlist = res.data.result.hots;
				}
			})
		},

		methods: {},

		watch: {}

	}
</script>
<style scoped>
	.s-hotlist {
	    padding: 15px 10px 0;
	}
	.s-hotlist .title {
	    font-size: 12px;
			font-weight: 400;
	    line-height: 12px;
	    color: #666;
	}
	.s-hotlist .list {
	    margin: 10px 0 7px;
	}
	.s-hotlist .item {
			display: inline-block;
			border: .5px solid #d3d4da;
    	border-radius: 32px;
	    height: 32px;
	    margin-right: 8px;
	    margin-bottom: 8px;
	    padding: 0 14px;
	    font-size: 14px;
	    line-height: 32px;
	    color: #333;
	}
</style>
