import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  meta: { title: '人员管理', icon: 'el-icon-user' },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/users/usersList'),
      meta: { title: '人员列表' }
    },
    {
      path: 'user-task-stats',
      name: 'user-task-stats',
      component: () => import('@/views/users/personnelPerformance'),
      meta: { title: '人效统计' }
    },
    {
      path: 'user-work',
      name: 'user-work',
      component: () => import('@/views/users/workload'),
      meta: { title: '工作量列表' }
    }
  ]
}
