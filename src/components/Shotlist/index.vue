<template>
	<section class="s-hotlist" v-if="isloading">
		<h3 class="title" id="gg">热门搜索</h3>
		<ul class="list">
			<li class="hotitem" v-for="(hot,index) in hotlist" :key="index" @click="ontouchEnd(index)"><a class="link" href="javascript:void(0);">{{hot.first}}</a></li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'Shotlist',
		props: { },
		data() {
			return {
				isloading:false,
				hotlist: [],
				hotitems:[]
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
					this.isloading=true;
				}
			})
		},

		methods: {
			ontouchEnd(inx){
				var text= document.getElementsByClassName("link")[inx].innerHTML;
				this.$emit("ontouchtochange",text);
			}
		},

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
	.s-hotlist .hotitem {
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
