<template>
	<div class="content">
		<Navbar/>
		<div class="m-homeremd">
			<h2 class="remd_tl">推荐歌单</h2>
				<Loading v-if="isloading1"/>
				<div class="remd_ul clearfix">
					<a class="remd_li" v-for="list in playlists" :key="list.id" @click="listpage(list.id)">
						<div class="remd_img"><img :src="list.picUrl" class="u-img"><span class="u-earp remd_lnum">{{numberFormat(list.playCount)}}</span></div>
						<p class="remd_text">{{list.name}}</p>
					</a>
				</div>
			<h2 class="remd_tl">最新音乐</h2>
			<Loading v-if="isloading2"/>
			<div class="songlist">
				<a class="m-sgitem" v-for="(song,index) in songlist" :key="song.id" @click="songpage(song.id)">
					<div class="sgfl"><i>{{index+1}}</i></div>
					<div class="sgfr">
						<div class="sgchfl">
							<div class="f-thide sgtl">{{song.name}}<span class="sgalia">{{song.song.alias[0]}}</span></div>
							<div class="f-thide sginfo">
  		          <!-- <i class="iconfont icon-sq" v-show="song.song.exclusive"></i> -->
  		          <span v-for="anm in song.song.artists" :key="anm.id">{{anm.name}}/</span> - {{song.song.album.name}}
  		        </div>
						</div>
						<div class="sgchfr"><i class="iconfont icon-start"></i></div>
					</div>
				</a>
			</div>
		</div>
		<Playlist v-show="ishow1" :pid="playid" @toback="isfalse1($event)"/>
		<!-- <Playlist v-show="ishow2" :pid="songid" @toback="isfalse2($event)"/> -->
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar";
	import Playlist from "@/components/Playlist";
	
	export default {
		name: 'Home',
		props: [''],
		data() {
			return {
				isloading1:true,
				isloading2:true,
				playlists: [],
				songlist: [],
				ishow1:false,
				ishow2:false,
				playid:'',
				songid:''
			};
		},

		components: {
			Navbar,Playlist
		},

		computed: {},

		beforeMount() {},

		mounted() {
			window.addEventListener('load', this.loadInit)
			this.$axios.get('/api/personalized', {
				params: {
					limit: 6
				}
			}).then((res) => {
				if (res.status == 200 && res.statusText === "OK") {
					this.playlists = res.data.result;
					this.isloading1=false;
				}
      })
      ///////////////////////////////////
      this.$axios.get('/api/personalized/newsong', {
				params: {	}
			}).then((res) => {
				if (res.status == 200 && res.statusText === "OK") {
					this.songlist = res.data.result;
					this.$store.commit('saveSongUrlId',this.songlist[0].id)
					this.isloading2=false;
				}
			})
		},

		methods: {
			// 数字转换:将数值转化为万、亿、万亿并保留几位小数
			numberFormat(value) {
				var param = {};
				var k = 10000,
					sizes = ['', '万', '亿', '万亿'],
					i;
				if (value < k) {
					param.value = value
					param.unit = ''
				} else {
					i = Math.floor(Math.log(value) / Math.log(k));

					param.value = ((value / Math.pow(k, i))).toFixed(1); //保留几位小数
					param.unit = sizes[i];
				}
				return param.value + param.unit;
			},
			listpage(id){
				this.playid=id;
				this.ishow1=true;
			},
			songpage(id){
				// this.songid=id;
				// this.ishow2=true;
				 this.$store.commit('saveSongUrlId',id)
			},
			isfalse1(value){
				this.ishow1=value;
			},
			isfalse2(value){
				this.ishow2=value;
			}
		},

		watch: {}

	}
</script>
<style scoped>
	.m-homeremd {
		padding-top: 20px;
	}

	.m-homeremd .remd_tl {
		position: relative;
		padding-left: 9px;
		margin-bottom: 14px;
		font-size: 17px;
		font-weight: 400;
		height: 20px;
		line-height: 20px;
	}

	.m-homeremd .remd_tl:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 50%;
		margin-top: -9px;
		width: 2px;
		height: 16px;
		background-color: #FF6700;
	}

	.m-homeremd .remd_li {
		display: block;
		margin-bottom: 16px;
		float: left;
		width: 33.3%;
		padding-left: 1px;
		padding-right: 1px;
		box-sizing: border-box;
	}

	.m-homeremd :first-child.remd_li {
		padding-left: 0px;
		padding-right: 2px;
	}

	.m-homeremd :last-child.remd_li {
		padding-left: 2px;
		padding-right: 0px;
	}

	.m-homeremd .remd_img {
		position: relative;
		padding-bottom: 100%;
	}

	.m-homeremd .remd_text {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		padding: 6px 2px 0 6px;
		min-height: 30px;
		line-height: 15px;
		font-size: 13px;
	}

	.u-img {
		width: 100%;
		vertical-align: middle;
	}

	.m-homeremd .remd_img>.u-img {
		position: absolute;
		width: 100%;
		left: 0px;
		top: 0px;
		z-index: 1;
	}

	.u-earp {
		background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
	}

	.m-homeremd .remd_lnum {
		position: absolute;
		right: 5px;
		top: 2px;
		z-index: 3;
		padding-left: 13px;
		color: #fff;
		font-size: 12px;
		background-position: 0;
		background-repeat: no-repeat;
		background-size: 11px 10px;
		text-shadow: 1px 0px 0px rgba(0, 0, 0, 0.15);
	}
/*  *//*  *//*  *//*  *//*  *//*  *//*  *//*  */ /*  *//*  *//*  *//*  *//*  *//*  */
.songlist {
    position: relative;
    min-height: 20px;
}
	.m-sgitem {
		display: flex;
		padding-left: 10px;
		width: 100vw;
		box-sizing: border-box;
	}

	.m-sgitem .sgfl {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		font-size: 17px;
		color: #999;
		margin-left: -10px;
	}
	.m-sgitem .sgfl i{
		display: inline-block;
		border-radius: 25px;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		font-style: normal;
		background-color: #ebf0f2;
	}
.m-sgitem .sgfr{
  display: flex;
  justify-content: space-between;
  position: relative;
	border-bottom: .5px solid rgba(0,0,0,.1);
  box-sizing: border-box;
}
.m-sgitem .sgchfl {
    padding: 6px 0;
		width: 75vw;
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
		text-overflow:ellipsis;
		white-space: nowrap;
}
.m-sgitem .sginfo i{
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
