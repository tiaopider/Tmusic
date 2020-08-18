<template>
	<section class="s-recom">
		<h3 class="title">搜索“{{this.intext}}”</h3>
		<Loading v-if="isloading"/>
		<ul>
			<li class="recomitem" v-for="(rec,index) in recomlist" :key="index" @click="ontouchEnd(index)">
				<i class="iconfont icon-sousuo"></i><span class="s-thide">{{rec.keyword}}</span>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'Srecom',
		props: ["intext"]
		,
		data() {
			return {
				isloading:true,
				recomlist: []
			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {

		},

		methods: {
			ontouchEnd(inx){
				var text= document.getElementsByClassName("s-thide")[inx].innerHTML;
				this.$emit("ontouchtochange",text);
			}
		},

		watch: {
			intext(value) {
				if (!value == "") {
					this.recomlist="";
					this.isloading=true;
					this.$axios.get('/api/search/suggest', {
						params: {
							keywords: value,
							type: 'mobile'
						}
					}).then((res) => {
						if (res.status == 200 && res.statusText === "OK") {
							this.recomlist = res.data.result.allMatch;
							this.isloading=false;
						}
					})
				}
			}
		}

	}
</script>
<style scoped>
	.s-recom {
		margin: 0 auto;
	}

	.s-recom .title {
		height: 50px;
		margin-left: 10px;
		padding-right: 10px;
		font-size: 15px;
		font-weight: 400;
		line-height: 50px;
		color: #507daf;
		border-bottom: .5px solid rgba(0,0,0,.1);
	}

	.s-recom .recomitem {
		display: flex;
		align-items: center;
		height: 45px;
		padding-left: 10px;
	}
	.s-recom .recomitem i{
		color: rgba(0,0,0,.5);
}
	.s-recom span {
    display: inline-block;
    width: 100%;
    padding:0 10px 0 7px;
    font-size: 15px;
    line-height: 45px;
		color: #333;
		border-bottom: .5px solid rgba(0,0,0,.1);
}
</style>
