import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || 'gestor',
    userLevel: (state) => state.user?.level || 1,
    currentUser: (state) => state.user,
    canAccessSimulation: (state) => (criticidad) => {
      const level = state.user?.level || 1
      const criticalityLevels = { 'bajo': 1, 'medio': 2, 'alto': 3, 'critico': 4 }
      return level >= criticalityLevels[criticidad]
    }
  },

  actions: {
    async login(credentials) {
      try {
        // Usuarios del piloto para Minera Hochschild
        const mockUsers = {
          'gestor@hochschild.com': {
            id: 1,
            name: 'Carlos Mendoza',
            email: 'gestor@hochschild.com',
            role: 'gestor',
            level: 2,
            company: 'Minera Hochschild',
            avatar: '/avatars/gestor.jpg',
            stats: {
              simulacionesCompletadas: 12,
              promedioEvaluacion: 7.8,
              nivelActual: 2
            }
          },
          'supervisor@hochschild.com': {
            id: 2,
            name: 'Ana Rodriguez',
            email: 'supervisor@hochschild.com',
            role: 'supervisor',
            level: 3,
            company: 'Minera Hochschild',
            avatar: '/avatars/supervisor.jpg',
            stats: {
              simulacionesCompletadas: 25,
              promedioEvaluacion: 8.5,
              nivelActual: 3
            }
          },
          'gerente@hochschild.com': {
            id: 3,
            name: 'Roberto Silva',
            email: 'gerente@hochschild.com',
            role: 'gerencia',
            level: 4,
            company: 'Minera Hochschild',
            avatar: '/avatars/gerente.jpg',
            stats: {
              simulacionesCompletadas: 8,
              promedioEvaluacion: 9.2,
              nivelActual: 4
            }
          }
        }

        const user = mockUsers[credentials.email]
        if (user && credentials.password === 'hochschild2024') {
          const token = 'onmc-token-' + Date.now()
          
          this.user = user
          this.token = token
          
          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          
          return { success: true, user }
        } else {
          return { success: false, error: 'Credenciales inválidas para el piloto ONMC' }
        }
      } catch (error) {
        return { success: false, error: 'Error de conexión' }
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async initializeAuth() {
      if (this.token) {
        const userData = localStorage.getItem('user')
        if (userData) {
          this.user = JSON.parse(userData)
        }
      }
    }
  }
})