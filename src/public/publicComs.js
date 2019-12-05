// 组件
import headerTop from '@components/headerTop.vue'

const publicComs = {
    install (Vue) {
        Vue.component('headerTop', headerTop)
    }
}

export default publicComs