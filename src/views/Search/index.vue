<template>
	<div class="content m-hmsrch">
		<Navbar/>
		<div class="m-hmsrch">
			<form class="m-input" action="javascript:void 0" method="get">
				<div class="inputcover">
					<i class="iconfont icon-sousuo seaico sousuo"></i>
					<input name="search" class="input" type="search" placeholder="搜索歌曲、歌手、专辑" v-model="inputText" value=""
					 autocomplete="off" @keyup.13="tapToSearch">
					<i class="iconfont icon-guanbi seaico close"></i>
				</div>
			</form>
			<Shotlist v-show="showhot" />
			<Srecom v-show="showrec" :intext="inputText" />
			<Songlist v-show="showlis" :intext="inputText" />
		</div>
	</div>
</template>

<script>
	import Navbar from "@/components/Navbar";
	import Shotlist from "@/components/Shotlist";
	import Srecom from "@/components/Srecom";
	import Songlist from "@/components/Songlist";
	export default {
		name: 'Search',
		props: [''],
		data() {
			return {
				showhot:true,
				showrec:false,
				showlis:false,
				inputText:''
			};
		},

		components: {
			Navbar,Shotlist,Srecom,Songlist
		},

		computed: {},

		beforeMount() {},

		mounted() {
			document.getElementsByClassName("close")[0].addEventListener("touchend",this.clearinput);
		},

		methods: {
			clearinput(){
				this.inputText='';
			},
			tapToSearch(){
      		this.showhot=false;
					this.showrec=false;
					this.showlis=true;
					document.activeElement.blur();  
			}
		
		},

		watch: {
			inputText(value){
				if(value==""){
					this.showhot=true;
					this.showrec=false;
					this.showlis=false;
					document.getElementsByClassName("close")[0].style.display="none"
				}else{
					this.showhot=false;
					this.showrec=true;
					this.showlis=false;
					document.getElementsByClassName("close")[0].style.display="block"
				}
			}
		}

	}
</script>
<style scoped>
.m-hmsrch {
		width: 100%;
		background-color: #fbfcfd;
	}

	.m-input {
		padding: 15px 10px;
		border-bottom: .5px solid rgba(0,0,0,.1);
    box-sizing: border-box;
	}

	
	.m-input .inputcover {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 30px;
		padding: 0 30px;
		box-sizing: border-box;
		background: #ebecec;
		border-radius: 30px;
	}

	.seaico {
		position: absolute;
		top: 8px;
		font-size: 13px;
		margin: 0 8px;
		vertical-align: middle;
	}

	.sousuo {
		left: 0;
	}

	.close {
		right: 0;
		display: none;
		font-size: 9px;
		font-weight: bold;
		width: 14px;
		height: 14px;
		color: #EBECEC;
		text-align: center;
		line-height: 14px;
		border-radius: 50%;
		background-color: #BCBDBD;
	}


	input[type=search]::-webkit-search-cancel-button {
		-webkit-appearance: none;
		/* 此处去掉默认的小× */
	}

	input {
		border-radius: 0;
		border: 0;
		background-color: rgba(0, 0, 0, 0);
	}

	input:focus {
		outline: 0;
	}

	.m-input .input {
		width: 100%;
		height: 30px;
		line-height: 18px;
		background: rgba(0, 0, 0, 0);
		font-size: 14px;
		color: #333;
	}
</style>
