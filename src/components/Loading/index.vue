<template>
	<div class="loader">
		<div class="object obleft" id="object_one"></div>
		<div class="object" id="object_two"></div>
		<div class="object obleft" id="object_three"></div>
		<div class="object" id="object_four"></div>
		<div class="object obleft" id="object_five"></div>
		<div class="object" id="object_six"></div>
	</div>
</template>
<script>
	export default {
		name: 'loading'
	}
</script>

<style scoped>
	.loader {
		position: absolute;
		left: 50%;
		top: 40%;
    display: block;
		height: 2.5rem;
		width: 1.5rem;
		margin-left: -0.75rem;
	}

	.object {
		width: .5rem;
		height: .5rem;
		background-color: #ff6700;
		float: left;
		margin-bottom: .5rem;
	}
	
	.object:nth-of-type(odd){
		margin-right: .5rem;
	}

	#object_one {
		-webkit-animation: object_one 1s infinite;
		animation: object_one 1s infinite;
	}

	#object_two {
		-webkit-animation: object_two 1s infinite;
		animation: object_two 1s infinite;
	}

	#object_three {
		-webkit-animation: object_three 1s infinite;
		animation: object_three 1s infinite;
	}

	#object_four {
		-webkit-animation: object_four 1s infinite;
		animation: object_four 1s infinite;
	}

	#object_five {
		-webkit-animation: object_five 1s infinite;
		animation: object_five 1s infinite;
	}

	#object_six {
		-webkit-animation: object_six 1s infinite;
		animation: object_six 1s infinite;
	}


	@keyframes object_one {
		50% {
			-ms-transform: translate(-3rem, 1rem) rotate(-179deg);
			-webkit-transform: translate(-3rem, 1rem) rotate(-179deg);
			transform: translate(-3rem, 1rem) rotate(-179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	@keyframes object_two {
		50% {
			-ms-transform: translate(3rem, 1rem) rotate(179deg);
			-webkit-transform: translate(3rem, 1rem) rotate(179deg);
			transform: translate(3rem, 1rem) rotate(179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	@keyframes object_three {
		50% {
			-ms-transform: translate(-3rem, 0) rotate(-179deg);
			-webkit-transform: translate(-3rem, 0) rotate(-179deg);
			transform: translate(-3rem, 0) rotate(-179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	@keyframes object_four {
		50% {
			-ms-transform: translate(3rem, 0) rotate(179deg);
			-webkit-transform: translate(3rem, 0) rotate(179deg);
			transform: translate(3rem, 0) rotate(179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	@keyframes object_five {
		50% {
			-ms-transform: translate(-3rem, -1rem) rotate(-179deg);
			-webkit-transform: translate(-3rem, -1rem) rotate(-179deg);
			transform: translate(-3rem, -1rem) rotate(-179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	@keyframes object_six {
		50% {
			-ms-transform: translate(3rem, -1rem) rotate(179deg);
			-webkit-transform: translate(3rem, -1rem) rotate(179deg);
			transform: translate(3rem, -1rem) rotate(179deg);
		}

		100% {
			-ms-transform: translate(0, 0);
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}
</style>
