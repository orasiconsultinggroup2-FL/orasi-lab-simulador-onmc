import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Layouts
import MainLayout from '@/layouts/MainLayout.vue'

// Views
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import SimulacionesList from '@/views/simulaciones/SimulacionesList.vue'
import SimulacionDetail from '@/views/simulaciones/SimulacionDetail.vue'
import EvaluacionesList from '@/views/evaluaciones/EvaluacionesList.vue'
import PerfilGestor from '@/views/perfil/PerfilGestor.vue'
import ManualOperaciones from '@/views/ManualOperaciones.vue'
import MapaActores from '@/views/MapaActores.vue'
import MapaActores from '@/views/MapaActores.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: '/simulaciones',
        name: 'Simulaciones',
        component: SimulacionesList
      },
      {
        path: '/simulaciones/:id',
        name: 'SimulacionDetail',
        component: SimulacionDetail,
        props: true
      },
      {
        path: '/manual',
        name: 'Manual',
        component: ManualOperaciones
      },
      {
        path: '/evaluaciones',
        name: 'Evaluaciones',
        component: EvaluacionesList
      },
      {
        path: '/perfil',
        name: 'PerfilGestor',
        component: PerfilGestor
      },
      {
        path: '/mapa-actores',
        name: 'MapaActores',
        component: MapaActores
      },
      {
        path: '/mapa-actores',
        name: 'MapaActores',
        component: MapaActores
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router