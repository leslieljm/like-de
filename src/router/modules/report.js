import Layout from '@/layout'

export default {
  path: '/report/index',
  component: Layout,
  children: [
    {
      path: '',
      name: 'report',
      component: () => import('@/views/bills'),
      meta: { title: '对账统计', icon: 'el-icon-document-checked' }
    }
  ]
}
