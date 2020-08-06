<template>
	<div class="songlist">
		<a class="m-sgitem" v-for="song in songlist" :key="song.id" href="//music.163.com/m/song?id=1467189463">
			<div class="sgfr ">
				<div class="sgchfl">
					<div class="f-thide sgtl">{{song.name}}<span class="sgalia">{{song.song.alias[0]}}</span></div>
					<div class="f-thide sginfo">
            <i class="iconfont icon-sq"></i>
            <span v-for="anm in song.song.artists" :key="anm.id">{{anm.name}}/</span> - {{song.song.album.name}}
            
          </div>
				</div>
				<div class="sgchfr"><i class="iconfont icon-start"></i></div>
			</div>
		</a>
	</div>
</template>

<script>

	export default {
		name:'NewSonglist',
		props:{
			'apiurl':String,
			'intext':String
		},
		data () {
			return {
				// api_url:this.apiurl,
				// kword:this.stext,
				// keyword:"",
				songlist: []
			};
		},

		components: {},

		computed: {},

		beforeMount() {},

		mounted() {
		this.$axios.get(this.apiurl, {
				params: {	}
			}).then((res) => {
				if (res.status == 200 && res.statusText === "OK") {
					this.songlist = res.data.result;
					console.log(this.songlist);
				}
    	})
		},

		methods: {},

		watch: {}

	}

</script>
<style scoped>
.songlist {
    position: relative;
    min-height: 20px;
}
.m-sgitem{
  display: inline-block;
  padding-left: 10px;
	width: 100vw;
  box-sizing: border-box;
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
		display: flex;
		align-items: center;
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
}
</style>