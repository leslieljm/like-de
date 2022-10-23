import Layout from '@/layout'

export default {
  path: '/order/index',
  component: Layout,
  children: [
    {
      path: '',
      name: 'order',
      component: () => import('@/views/orders'),
      meta: { title: '订单管理', icon: 'el-icon-document-copy' }
    }
  ]
}
