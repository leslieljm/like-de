import Layout from '@/layout'

export default {
  path: '/policy/index',
  component: Layout,
  children: [
    {
      path: '',
      name: 'policy',
      component: () => import('@/views/strategy'),
      meta: { title: '策略管理', icon: 'el-icon-magic-stick' }
    }
  ]
}
