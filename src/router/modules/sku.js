import Layout from '@/layout'

export default {
  path: '/sku',
  component: Layout,
  meta: { title: '商品管理', icon: 'el-icon-sell' },
  children: [
    {
      path: 'sku-class',
      name: 'sku-class',
      component: () => import('@/views/goods/goodsType'),
      meta: { title: '商品类型' }
    },
    {
      path: 'sku',
      name: 'sku',
      component: () => import('@/views/goods/goodsManage'),
      meta: { title: '商品管理' }
    }
  ]
}
