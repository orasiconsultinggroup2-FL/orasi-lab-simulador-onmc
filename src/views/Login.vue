<template>
  <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo y título -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-white rounded-full flex items-center justify-center shadow-lg">
          <img src="/orasi-icon.svg" alt="ORASI Lab" class="h-12 w-12" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-white">
          ORASI Lab
        </h2>
        <p class="mt-2 text-lg text-blue-100">
          Simulador ONMC
        </p>
        <p class="mt-1 text-sm text-blue-200">
          Organización Negociadora de Clase Mundial
        </p>
      </div>

      <!-- Formulario de login -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-white mb-2">
              Email corporativo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              v-model="form.email"
              required
              class="w-full px-3 py-2 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="usuario@hochschild.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-white mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              v-model="form.password"
              required
              class="w-full px-3 py-2 border border-white/20 rounded-md bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-900 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Iniciando sesión...
            </span>
            <span v-else>Iniciar Sesión</span>
          </button>

          <div v-if="error" class="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
            <p class="text-sm text-red-100">{{ error }}</p>
          </div>
        </div>
      </form>

      <!-- Información del piloto -->
      <div class="bg-white/5 backdrop-blur-sm rounded-lg p-4 mt-6">
        <h3 class="text-sm font-medium text-white mb-2">Piloto Controlado - Minera Hochschild</h3>
        <div class="text-xs text-blue-200 space-y-1">
          <p><strong>Usuarios de prueba:</strong></p>
          <p>• gestor@hochschild.com</p>
          <p>• supervisor@hochschild.com</p>
          <p>• gerente@hochschild.com</p>
          <p><strong>Contraseña:</strong> hochschild2024</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs text-blue-200">
          © 2024 ORASI Lab. Piloto exclusivo para Minera Hochschild.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const result = await authStore.login(form.value)
    
    if (result.success) {
      router.push('/')
    } else {
      error.value = result.error
    }
  } catch (err) {
    error.value = err.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}
</script>