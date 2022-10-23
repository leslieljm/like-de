import Layout from '@/layout'

export default {
  path: '/vm',
  component: Layout,
  meta: { title: '设备管理', icon: 'el-icon-set-up' },
  children: [
    {
      path: 'index',
      name: 'index',
      component: () => import('@/views/equipments/equipments'),
      meta: { title: '设备管理' }
    },
    {
      path: 'status',
      name: 'status',
      component: () => import('@/views/equipments/status'),
      meta: { title: '设备状态' }
    },
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/equipments/type'),
      meta: { title: '设备类型管理' }
    }
  ]
}
