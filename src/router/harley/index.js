const harley = [
    {
        path: '/demo',
        name: 'demo',
        component: () =>
            import('@/views/demo.vue')
    },
    {
        path: '/funcMenu',
        name: '菜单',
        component: () =>
            import('@/views/funcMenu.vue')
    }
]
export default harley