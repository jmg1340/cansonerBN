
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: "cercar", path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/canso',
    component: () => import('layouts/layoutCanso.vue'),
    children: [
      { name: "canso", path: '', component: () => import('pages/canso.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
