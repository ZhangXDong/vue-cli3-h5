<template>
    <div class="ld-flex ld-container">
   		<!--头部-->
		   
		<!-- loading -->
		<div class="ld-loading_box" v-show="$store.state.showLoading">
			<van-loading type="spinner" vertical color="#1989fa">加载中...</van-loading>
		</div>

       	<!--内容区-->
       	<div class="ld-flex">
	      	<router-view></router-view>
	    </div>
   </div>
</template>

<script>
export default {
	data(){
		return {
			
		}
	}
}
</script>

<style lang="scss">
	.ld-loading_box {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9;
		.van-loading__text {
			color: #1989fa;
		}
	}
</style>
