<template>
  <div class="m-playlist content">
    <nav class="nav_back">
      <i class="iconfont icon-huitui" @click="toback"></i>
      <span>歌单</span>
    </nav>
    <Loading v-if="isloading" />
    <div v-else>
      <div>
        <section class="u-plhead">
          <div class="plhead_bg" :style="this.bgimg"></div>
          <div class="plhead_wrap">
            <div class="plhead_fl">
              <img class="u-img" :src="Plist.coverImgUrl" />
              <span class="lsthd_icon">歌单</span>
              <i class="u-earp lsthd_num">{{this.numberFormat(this.playCount)}}</i>
            </div>
            <div class="plhead_fr">
              <h2 class="lsthd_title f-thide">{{Plist.name}}</h2>
              <div class="lsthd_auth f-thide">
                <a class="lsthd_link" href="//music.163.com/m/user?id=129593031">
                  <div class="u-avatar lsthd_ava">
                    <img class="u-img" :src="this.avatarUrl" />
                    <span class="ava-icon ava-icon-daren"></span>
                  </div>
                  {{this.nickname}}
                </a>
              </div>
            </div>
          </div>
        </section>
        <section class="pylst_intro">
          <div class="lstit_tags">
            标签：
            <em class="lstit_tag" v-for="(exp,index1) in Plist.tags" :key="index1">{{exp}}</em>
          </div>
          <div class="u-intro">
            <div class="pretil f-thide3">
              简介：<span v-for="(pre,index) in thepre" :key="index" >{{pre}}<br/></span>
            </div>
            <i class="iconfont icon-gengduo intro_arrow" @click="introArrow"></i>
          </div>
        </section>
      </div>
      <div class="pylst_list">
        <h3 class="u-smtitle">歌曲列表</h3>
        <div class="m-sglst">
          <a
            class="m-sgitem"
            v-for="(pl,index) in Plist.tracks"
            :key="pl.id" 
            @click="songpage(pl.id)"
          >
            <div class="sgfl">{{index+1}}</div>
            <div class="sgfr">
              <div class="sgchfl">
                <div class="f-thide sgtl">{{pl.name}}</div>
                <div class="f-thide sginfo">
                  <span v-for="anm in pl.ar" :key="anm.id">{{anm.name}}&nbsp;/&nbsp;</span>
                  - {{pl.al.name}}
                </div>
              </div>
              <div class="sgchfr">
                <i class="iconfont icon-start"></i>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["pid"],
  data() {
    return {
      Plist: [],
      bgimg: "",
      playCount: "",
      avatarUrl: "",
			nickname: "",
			thepre:[],
      isloading: false,
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    toback() {
      // this.$router.back();
      this.$emit("toback", false);
    },
    songpage(id){
			this.$store.commit('saveSongUrlId',id)
		},
    introArrow() {
      if (
        document.getElementsByClassName("pretil")[0].style.display == "block"
      ) {
        document.getElementsByClassName("pretil")[0].style.display = "";
      } else {
        document.getElementsByClassName("pretil")[0].style.display = "block";
      }
    },
    // 数字转换:将数值转化为万、亿、万亿并保留几位小数
    numberFormat(value) {
      var param = {};
      var k = 10000,
        sizes = ["", "万", "亿", "万亿"],
        i;
      if (value < k) {
        param.value = value;
        param.unit = "";
      } else {
        i = Math.floor(Math.log(value) / Math.log(k));

        param.value = (value / Math.pow(k, i)).toFixed(1); //保留几位小数
        param.unit = sizes[i];
      }
      return param.value + param.unit;
    },
  },

  watch: {
    pid(value) {
      this.Plist = "";
      this.isloading = true;
      this.$axios
        .get("/api/playlist/detail", {
          params: {
            id: value,
          },
        })
        .then((res) => {
          if (res.status == 200 && res.statusText === "OK") {
            this.Plist = res.data.playlist;
            this.playCount = this.Plist.playCount;
            this.isloading = false;
						// console.log(this.Plist.description);
            this.avatarUrl = this.Plist.creator.avatarUrl;
            this.nickname = this.Plist.creator.nickname;
						this.bgimg = "background-image:url(" + this.Plist.coverImgUrl + ")";
						this.thepre=this.Plist.description.split("\n")
          }
        });
    },
  },
};
</script>
<style scoped>
.nav_back {
  z-index: 300;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 45px;
	color:#8F8F8F;
  box-shadow: 0 0 7px 0px gainsboro;
  background-color: #ffffff !important;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

.nav_back i {
  display: block;
  font-size: 1.65rem;
  margin: 1px 20px 0 20px;
}
.nav_back span {
  font-size: 1.7rem;
}

.m-playlist {
  position: fixed;
  top: 0;
  left: 0;
  background-color: #f8f8f8;
  min-height: 100%;
  z-index: 300;
}

.u-plhead {
  position: relative;
  padding: 30px 10px 30px 15px;
  overflow: hidden;
}

.u-plhead .plhead_bg,
.u-plhead .plhead_bg:after {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.u-plhead .plhead_bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  filter: blur(20px);
  transform: scale(1.5);
}

.u-plhead .plhead_wrap {
  display: flex;
  position: relative;
  z-index: 2;
}

.u-plhead .plhead_fl {
  position: relative;
  width: 126px;
  height: 126px;
  background-color: #e2e2e3;
}

.u-img {
  width: 100%;
  vertical-align: middle;
}

.lsthd_icon {
  position: absolute;
  z-index: 3;
  top: 10px;
  left: 0;
  padding: 0 8px;
  height: 17px;
  color: #fff;
  font-size: 9px;
  text-align: center;
  line-height: 17px;
  background-color: rgba(217, 48, 48, 0.8);
  border-top-right-radius: 17px;
  border-bottom-right-radius: 17px;
}

.u-plhead .lsthd_num {
  position: absolute;
  right: 2px;
  top: 0;
  z-index: 3;
  padding-left: 15px;
  color: #fff;
  font-size: 12px;
  font-style: normal;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: 11px 10px;
  text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
}

.u-earp {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
}

.u-plhead .plhead_fr {
  flex: 1 1 auto;
  width: 1%;
  margin-left: 16px;
}

.u-plhead .lsthd_title {
  padding-top: 1px;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.3;
  color: #fefefe;
  height: 44px;
  display: -webkit-box;
  -webkit-box-pack: center;
}

.u-plhead .lsthd_auth {
  display: block;
  position: relative;
  margin-top: 20px;
}

.u-plhead .lsthd_link {
  display: inline-block;
  color: hsla(0, 0%, 100%, 0.7);
}

.u-avatar {
  position: relative;
  width: 100%;
}

.u-plhead .lsthd_ava {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 5px;
}

.u-avatar > .u-img {
  border-radius: 50%;
}

.u-avatar .ava-icon {
  position: absolute;
  right: -5px;
  bottom: 0;
  width: 12px;
  height: 12px;
  background-image: url(../../../public/img/usericn_2x.png);
  background-repeat: no-repeat;
  background-size: 75px auto;
}

.u-avatar .ava-icon.ava-icon-daren {
  background-position: -40px 0;
}

.pylst_intro {
  position: relative;
  margin: 0 10px 0 15px;
  padding-top: 10px;
  line-height: 19px;
  color: #666;
}

.lstit_tags {
  margin-bottom: 10px;
  line-height: 20px;
  margin-right: -10px;
}

.lstit_tag {
  display: inline-block;
  margin-right: 10px;
  padding: 1px 8px;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
}

.lstit_tag:after {
  border-radius: 9999px;
}

.u-intro {
  position: relative;
  padding-bottom: 18px;
  line-height: 19px;
  color: #666;
  white-space: normal;
}

.f-thide3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.f-thide3 pre {
  font: 14px/1.5 Helvetica, sans-serif, STHeiTi;
  color: #333;
  outline: 0;
}

.u-intro .intro_arrow {
  position: absolute;
  bottom: 3px;
  right: 0;
  z-index: 3;
  width: 15px;
  height: 15px;
  background-position: 50%;
}

.m-playlist {
  background-color: #f8f8f8;
  min-height: 100%;
}

.pylst_more {
  position: relative;
  min-height: 50px;
}

.u-btn-red:first-child:not(:last-child) {
  background-color: rgba(0, 0, 0, 0);
  color: #d33a31;
}

.u-smtitle {
  height: 23px;
  line-height: 23px;
  padding: 0 10px;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  background-color: #eeeff0;
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

.m-sgitem .sgfr {
  display: flex;
  justify-content: space-between;
  position: relative;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.m-sgitem .sgchfl {
  padding: 6px 0;
  width: 75vw;
}

.f-thide {
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: normal;
  -webkit-line-clamp: 2;
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
}
</style>
