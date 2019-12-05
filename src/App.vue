<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	data(){
		return {
			scanVal: '',
			timer: null
		}
	},
	mounted(){
		document.onkeypress = (evt) => {
			let key = evt.charCode
			this.scanVal += String.fromCharCode(key)
			this.timer && clearTimeout(this.timer)
			
		}
	}
}
</script>
<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;
		width: 100%;
	}
</style>
