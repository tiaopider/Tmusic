<template>
	<div class="songlist">
		<Loading v-if="isloading" />
		<a class="m-sgitem" v-for="(song,index) in songlist" :key="index"  @click="songpage(song.id)">
			<div class="sgfr ">
				<div class="sgchfl">
					<div class="f-thide sgtl">{{song.name}}<span class="sgalia">{{song.alias[0]}}</span></div>
					<div class="f-thide sginfo">
						<!-- <i class="iconfont icon-sq" v-show="song.mark>=70000"></i> -->
						<span v-for="(anm,index) in song.artists" :key="index">{{anm.name}}/</span> - {{song.album.name}}
					</div>
				</div>
				<div class="sgchfr"><i class="iconfont icon-start"></i></div>
			</div>
		</a>
	</div>
</template>

<script>
	export default {
		name: 'Songlist',
		props: ["intext"],
		data() {
			return {
				isloading: true,
				songlist: []
			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {


		},

		methods: {
			songpage(id){
				this.$store.commit('saveSongUrlId',id)
			}
		},

		watch: {
			intext(value) {
				if (!value == "") {
					this.songlist="";
					this.isloading=true;
					this.$axios.get('/api/search', {
						params: {
							keywords: value
						}
					}).then((res) => {
						if (res.status == 200 && res.statusText === "OK") {
							this.songlist = res.data.result.songs;
							this.isloading = false;
						}
					})
				}
			}
		}


	}
</script>
<style scoped>
	.songlist {
		position: relative;
		min-height: 20px;
	}

	.m-sgitem {
		display: inline-block;
		padding-left: 10px;
		width: 100vw;
		box-sizing: border-box;
	}

	.m-sgitem .sgfr {
		display: flex;
		justify-content: space-between;
		position: relative;
		border-bottom: .5px solid rgba(0, 0, 0, .1);
		box-sizing: border-box;
	}

	.m-sgitem .sgchfl {
		padding: 6px 0;
		width: 85vw;
	}

	.f-thide {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: normal;
	}

	.m-sgitem .sgtl {
		font-size: 17px;
	}

	.m-sgitem .sginfo {
		font-size: 12px;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 1px 0;
		box-sizing: border-box;
	}

	.m-sgitem .sginfo i {
		font-size: 18px;
		color: #ff6700;
	}

	.m-sgitem .sgalia {
		color: #888;
		margin-left: 4px;
	}

	.m-sgitem .sgchfr {
		display: flex;
		align-items: center;
		padding: 0 10px;
	}

	.m-sgitem .sgchfr i {
		font-size: 25px;
    color: #ff6700;
	}
</style>
