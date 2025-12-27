<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900">
      <div class="flex h-full flex-col">
        <!-- Logo -->
        <div class="flex h-16 items-center justify-center border-b border-gray-700 px-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-sm">O</span>
            </div>
            <div class="ml-3">
              <div class="text-lg font-bold text-white">ORASI Lab</div>
              <div class="text-xs text-gray-300">SIMULADOR ONMC</div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 space-y-1 px-3 py-4">
          <router-link
            to="/"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.name === 'Dashboard'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <HomeIcon class="mr-3 h-5 w-5" />
            Dashboard Ejecutivo
          </router-link>

          <router-link
            to="/simulaciones"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.path.startsWith('/simulaciones')
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <PlayIcon class="mr-3 h-5 w-5" />
            Biblioteca de Simulación
          </router-link>

          <router-link
            to="/manual"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.name === 'Manual'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <BookOpenIcon class="mr-3 h-5 w-5" />
            Manual de Operaciones
          </router-link>

          <router-link
            to="/evaluaciones"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.name === 'Evaluaciones'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <ClipboardCheckIcon class="mr-3 h-5 w-5" />
            Aprendizaje (AAR)
          </router-link>

          <router-link
            to="/perfil"
            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.name === 'PerfilGestor'
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            ]"
          >
            <UserIcon class="mr-3 h-5 w-5" />
            Mi Perfil
          </router-link>

          <!-- CRM Social - Fase 2 (Bloqueado) -->
          <div class="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-500 cursor-not-allowed">
            <UsersIcon class="mr-3 h-5 w-5" />
            <span>Mapa de Actores & CRM</span>
            <LockIcon class="ml-auto h-4 w-4" />
          </div>
          <div class="px-3 text-xs text-gray-500">
            Disponible en Fase 2
          </div>
        </nav>

        <!-- User info -->
        <div class="border-t border-gray-700 p-4">
          <div class="flex items-center">
            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span class="text-white font-medium text-sm">
                {{ user?.name?.charAt(0) }}
              </span>
            </div>
            <div class="ml-3">
              <div class="text-sm font-medium text-white">{{ user?.name }}</div>
              <div class="text-xs text-gray-400">{{ getRoleDescription(user?.role) }}</div>
            </div>
          </div>
          <button
            @click="handleLogout"
            class="mt-3 w-full text-left text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 ml-64">
      <!-- Top bar -->
      <div class="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
        <div class="px-6 lg:px-8">
          <div class="flex h-16 items-center justify-between">
            <div class="flex items-center">
              <h1 class="text-xl font-semibold text-gray-900">
                {{ pageTitle }}
              </h1>
            </div>
            <div class="flex items-center space-x-4">
              <div class="pilot-badge">
                Piloto Controlado - Minera Hochschild
              </div>
              <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Nivel {{ user?.level }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1">
        <div class="p-6">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon,
  PlayIcon,
  ClipboardCheckIcon,
  UserIcon,
  BookOpenIcon,
  UsersIcon,
  LockIcon
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const user = computed(() => authStore.currentUser)

const pageTitle = computed(() => {
  const titles = {
    'Dashboard': 'Dashboard Ejecutivo',
    'Simulaciones': 'Biblioteca de Simulación',
    'SimulacionDetail': 'Simulación en Curso',
    'Evaluaciones': 'Aprendizaje (AAR)',
    'PerfilGestor': 'Mi Perfil',
    'Manual': 'Manual de Operaciones'
  }
  return titles[route.name] || 'ORASI Lab'
})

const getRoleDescription = (role) => {
  const descriptions = {
    'gestor': 'Gestor de Relacionamiento',
    'supervisor': 'Supervisor de Operaciones',
    'gerencia': 'Gerencia de Asuntos Corporativos'
  }
  return descriptions[role] || 'Negociador'
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>