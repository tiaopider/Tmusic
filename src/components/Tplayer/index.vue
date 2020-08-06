<template>
	<div id="tplayer">
		<div class="pic">
			<img src="/img/04de313fdd7f3835563d3c4bdfb980735556062.jpg" alt="">
		</div>
		<audio src="/libs/少年.mp3" id="myMusic"></audio>
		<div class="musicInfo">
			<div class="aplayer-music">
				<span class="aplayer-title">少年</span> -
				<span class="aplayer-author">梦然</span>
			</div>
			<div class="jingdu">
				<div id="aplayer-bar">
					<div id="aplayer-loaded">
						<div id="aplayer-played">
						</div>
						<span id="aplayer-thumb"></span>
					</div>
				</div>
			</div>
		</div>
		<div class="musicBtn">
			<i id="next" class="iconfont icon-prev"></i>
			<i id="play" class="iconfont icon-start"></i>
			<i id="next" class="iconfont icon-next"></i>
			<i id="list" class="iconfont icon-gedan"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Navbar',
		props: [''],
		data() {
			return {
				mark: true,
				alltime: 0,
				nowtime: 0,
				song_id: 0,
				img: "",
				audio: "",
				aplayer_title: "",
				aplayer_author: "",
				aplayer_bar: "",
				aplayer_loaded: "",
				aplayer_played: "",
				aplayer_thumb: "",
				play: "",
				prev: "",
				next: "",
				list: "",
			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {
			this.img = document.getElementsByTagName("img")[0];
			this.audio = document.getElementById("myMusic");
			this.aplayer_title = document.getElementsByClassName("aplayer-title")[0]; //歌曲名
			this.aplayer_author = document.getElementsByClassName("aplayer-author")[0]; //歌手
			this.aplayer_bar = document.getElementById("aplayer-bar"); //进度条 白色
			this.audio = document.getElementById("myMusic"); //音频
			this.aplayer_loaded = document.getElementById("aplayer-loaded"); //进度条 白色
			this.aplayer_played = document.getElementById("aplayer-played"); //进度条 红色
			this.aplayer_thumb = document.getElementById("aplayer-thumb"); //进度点
			this.play_stop = document.getElementById("play"); //播放、暂停
			this.prev = document.getElementById("prev"); //上一首
			this.next = document.getElementById("next"); //下一首
			this.list = document.getElementById("list"); //歌单
			window.addEventListener('load', this.audioInit)
			this.aplayer_bar.addEventListener('click', this.aplayer_bar_click, false);
			this.play_stop.addEventListener('click', this.play_stop_click, false);
			document.getElementById("myMusic").addEventListener('timeupdate', this.audio_timeupdate);
		},

		methods: {

			//点击进度条某一位置触发事件，并根据进度条的位置改变歌曲的播放时间 和 歌词的样式变化
			aplayer_bar_click(e) {
				var e = e ? e : event;
				//获取坐标
				var pageX = e.pageX;
				//获取白色进度条的left值 
				var aplayer_bar_Left = this.aplayer_bar.offsetLeft;
				//计算进度条的百分比
				var n = (pageX - aplayer_bar_Left) / this.aplayer_bar.offsetWidth;
				//获取歌曲的总时间
				var audio_duration = this.audio.duration;
				
				// 根据进度条的百分比改变音频的播放时间  
				// 公式 = 鼠标点击的位置到div最左边的位置宽度/div的总宽度*音频的总时间
				
				this.audio.currentTime = n * this.alltime;

				// //获取音频播放的时间
				// var audio_currentTime = this.audio.currentTime
				// //获取到音频播放的秒数
				// var num = parseInt(audio_currentTime);

				// //获取到当前的 歌词节点
				// var objElem_p = elem_p(num)

				// //歌词的切换 样式调整
				// lyric_txt_p(objElem_p);
			},
			play_stop_click() {
				if (this.mark) {
					document.getElementById("myMusic").play(); //播放音乐
					this.mark = false;
					document.getElementById("play").className = "iconfont icon-stop";
				} else {
					document.getElementById("myMusic").pause(); //音乐暂停
					this.mark = true;
					document.getElementById("play").className = "iconfont icon-start";
				}
			},


			prev_song_click() {

			},
			next_song_click() {

			},
			audio_timeupdate() {
				//获取音频的总时间 以秒为单位
				this.alltime = document.getElementById("myMusic").duration; //总时长
				//获取音频的播放时间 以秒为单位
				this.nowtime = document.getElementById("myMusic").currentTime; //已播放
				//歌曲自动播放完就切换下一首
				if (this.nowtime == this.alltime) {
					this.next_song_click();
				}

				var n = this.nowtime / this.alltime;
				//根据视频播放的百分比改变进度条  公式 = 播放时间/总时间*进度条的宽度
				this.aplayer_played.style.width = n * this.aplayer_bar.offsetWidth + 'px';
				this.aplayer_thumb.style.left = (n * this.aplayer_bar.offsetWidth - 3) + 'px';

				// //获取到音频播放的秒数
				// var num = parseInt(audio_currentTime);
				// //将播放的事件显示到页面  format()转换为分秒格式
				// time_update.innerHTML = format(num);

				// //剩余多少事件 并且显示到页面
				// var sum_num = parseInt(audio_duration) - parseInt(audio_currentTime);
				// if (!isNaN(sum_num)) {
				// 	time_all.innerHTML = format(sum_num);
				// } else {
				// 	time_all.innerHTML = '00:00';
				// }

				// //获取到当前唱到的这一句歌词
				// var boj_p = $('lyric' + num);
				// //改变样式
				// lyric_txt_p(boj_p);
			},
			//初始化
			audioInit() {
				//将进度条的宽度初始化为0 红色的
				this.aplayer_played.style.width = 0 + 'px';
				this.aplayer_thumb.style.left = -3 + 'px';
				this.$axios.get('/api/song/url', {
					params: {
						id: 1325905146
					}
				}).then((res) => {
					if (res.status == 200 && res.statusText === "OK") {
						// console.log(res);
						//获取当前歌曲的路径
						this.audio.src = res.data.data[0].url;
						this.song_id = res.data.data[0].id;
					}
				})
				// //获取歌曲的一个总时间
				// if (!isNaN(audio.duration)) {
				// 	time_all.innerHTML = format(audio.duration);
				// } else {
				// 	time_all.innerHTML = '00:00'
				// }
				// console.log(parseInt(this.song_id));
				this.$axios.get('/api/song/detail', {
					params: {
						ids: 1325905146
					}
				}).then((res2) => {
					if (res2.status == 200 && res2.statusText === "OK") {
						// console.log(res2);

						//获取当前歌曲的pic
						this.img.src = res2.data.songs[0].al.picUrl;
						//获取当前歌曲的名称
						this.aplayer_title.innerHTML = res2.data.songs[0].al.name;
						//获取当前歌曲的演唱者
						this.aplayer_author.innerHTML = res2.data.songs[0].ar[0].name;
					}
				})

				// //歌词解析
				// this.lyric_str();
			},

			format(num) {
				var num = parseInt(num);
				//得到的是分钟
				var m = parseInt(num / 60);
				//得到的是秒
				var s = parseInt(num % 60);
				//返回拼接的时间
				return format_s(m) + ':' + format_s(s)
			},

			//修改歌曲时间格式
			format_s(num) {
				if (num < 10) {
					return '0' + num;
				}
				return num;
			}




		},

		watch: {}

	}
</script>

<style scoped>
	#tplayer {
		z-index: 999;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 65px;
		box-shadow: 0 0 7px 0px gainsboro;
		background-color: #f4f9fc !important;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0 8px;
	}

	#tplayer .pic {
		width: 50px;
		height: 50px;
	}

	#tplayer img {
		border-radius: 5px;
		display: inline-block;
		width: 50px;
		height: 50px;
	}

	#tplayer .aplayer-music {
		margin-left: 10px;
	}

	#tplayer .musicInfo {
		display: inline-block;
		width: 100%;
		height: 70%;
	}

	#tplayer .musicBtn {
		display: inline-block;
		width: 90%;
		height: 70%;
		padding-right: 11px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	#tplayer .jingdu {
		width: 100%;
		height: 50%;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top: 6px;
	}

	#tplayer #aplayer-bar {
		position: relative;
		width: 90%;
		height: 4px;
		border-radius: 2.5px;
		background: #e7e7e7;
		cursor: pointer;
	}

	#tplayer #aplayer-loaded {
		width: 70%;
		height: 100%;
		background: #b9ddcf;
		border-radius: 2.5px;
	}

	#tplayer #aplayer-played {
		width: 0px;
		height: 100%;
		background: #FF6700;
		border-radius: 2.5px;
	}

	#tplayer #aplayer-thumb {
		position: absolute;
		top: -4px;
		left: -3px;
		display: inline-block;
		height: 12px;
		width: 12px;
		background: #ff6700;
		border-radius: 50%;
	}

	#tplayer .musicBtn i {
		font-size: 2.4rem;
		color: #ff6700;
	}

	.big {
		font-weight: 500;
	}
</style>
