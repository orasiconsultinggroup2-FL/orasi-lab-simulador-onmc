<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Biblioteca de Simulación</h2>
          <p class="text-gray-600 mt-1">Repositorio centralizado de escenarios prácticos. 60 casos disponibles para entrenamiento.</p>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Filtros activos</div>
          <div class="flex space-x-2 mt-2">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Todos</span>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Minería</span>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Construcción</span>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Aprendizaje</span>
            <span class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Energía</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros por criticidad -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div 
        v-for="criticidad in ['critico', 'alto', 'medio', 'bajo']" 
        :key="criticidad"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
        :class="{ 'ring-2 ring-blue-500': filtroSeleccionado === criticidad }"
        @click="filtrarPorCriticidad(criticidad)"
      >
        <div class="text-center">
          <div class="text-2xl font-bold mb-2" :class="getCriticalityTextColor(criticidad)">
            {{ getSimulacionesPorCriticidad(criticidad) }}
          </div>
          <div class="text-sm font-medium text-gray-900 capitalize mb-1">{{ criticidad }}</div>
          <div class="text-xs text-gray-500 mb-2">
            {{ getCriticalityDescription(criticidad) }}
          </div>
          <div class="flex justify-center">
            <span 
              class="inline-block w-3 h-3 rounded-full"
              :class="getCriticalityColor(criticidad)"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de simulaciones -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="simulacion in simulacionesFiltradas" 
        :key="simulacion.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        :class="{ 'opacity-60': !canAccessSimulation(simulacion.criticidad) }"
      >
        <div class="p-6">
          <!-- Header de la simulación -->
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span 
                  class="inline-block w-3 h-3 rounded-full mr-2"
                  :class="getCriticalityColor(simulacion.criticidad)"
                ></span>
                <span class="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {{ simulacion.criticidad }}
                </span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">
                {{ simulacion.titulo }}
              </h3>
              <p class="text-sm text-gray-600 mb-4">
                {{ simulacion.descripcion }}
              </p>
            </div>
            <LockIcon 
              v-if="!canAccessSimulation(simulacion.criticidad)" 
              class="w-5 h-5 text-gray-400 ml-2" 
            />
          </div>

          <!-- Contexto -->
          <div class="mb-4">
            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Contexto</div>
            <div class="text-sm text-gray-600">
              En el sector Minería, el caso {{ simulacion.titulo.split(' - ')[0] }} requiere aplicación de metodología {{ simulacion.metodologia }}.
            </div>
          </div>

          <!-- Actores -->
          <div class="mb-4">
            <div class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Actores principales</div>
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="actor in simulacion.actores.slice(0, 3)" 
                :key="actor.nombre"
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getActorBadgeClass(actor.tipo)"
              >
                {{ actor.nombre }}
              </span>
              <span v-if="simulacion.actores.length > 3" class="text-xs text-gray-500">
                +{{ simulacion.actores.length - 3 }} más
              </span>
            </div>
          </div>

          <!-- Metodología -->
          <div class="mb-4">
            <span class="methodology-badge">
              {{ simulacion.metodologia }}
            </span>
          </div>

          <!-- Duración y estado -->
          <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div class="flex items-center">
              <ClockIcon class="w-4 h-4 mr-1" />
              {{ simulacion.duracionEstimada }} min
            </div>
            <div class="flex items-center">
              <CheckCircleIcon 
                v-if="simulacion.completada" 
                class="w-4 h-4 mr-1 text-green-500" 
              />
              <PlayIcon 
                v-else 
                class="w-4 h-4 mr-1 text-blue-500" 
              />
              {{ simulacion.completada ? 'Completada' : 'Disponible' }}
            </div>
          </div>

          <!-- Botón de acción -->
          <div class="pt-4 border-t border-gray-200">
            <button
              v-if="canAccessSimulation(simulacion.criticidad)"
              @click="iniciarSimulacion(simulacion.id)"
              class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              :disabled="loading"
            >
              {{ simulacion.completada ? 'Revisar' : 'Iniciar' }}
            </button>
            <div v-else class="text-center text-sm text-gray-500">
              Requiere Nivel {{ getCriticalityLevel(simulacion.criticidad) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="simulacionesFiltradas.length === 0" class="text-center py-12">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <PlayIcon class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">No hay simulaciones disponibles</h3>
      <p class="text-gray-500">No se encontraron simulaciones que coincidan con los filtros seleccionados.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSimulacionesStore } from '@/stores/simulaciones'
import {
  PlayIcon,
  CheckCircleIcon,
  ClockIcon,
  LockIcon
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const simulacionesStore = useSimulacionesStore()

const filtroSeleccionado = ref('')
const loading = ref(false)

const user = computed(() => authStore.currentUser)

const simulacionesFiltradas = computed(() => {
  let simulaciones = simulacionesStore.simulaciones
  
  if (filtroSeleccionado.value) {
    simulaciones = simulaciones.filter(s => s.criticidad === filtroSeleccionado.value)
  }
  
  return simulaciones
})

const canAccessSimulation = (criticidad) => {
  return authStore.canAccessSimulation(criticidad)
}

const getCriticalityColor = (criticidad) => {
  const colors = {
    'bajo': 'bg-green-400',
    'medio': 'bg-yellow-400',
    'alto': 'bg-orange-400',
    'critico': 'bg-red-400'
  }
  return colors[criticidad] || 'bg-gray-400'
}

const getCriticalityTextColor = (criticidad) => {
  const colors = {
    'bajo': 'text-green-600',
    'medio': 'text-yellow-600',
    'alto': 'text-orange-600',
    'critico': 'text-red-600'
  }
  return colors[criticidad] || 'text-gray-600'
}

const getCriticalityDescription = (criticidad) => {
  const descriptions = {
    'bajo': 'Diálogos preventivos',
    'medio': 'Mediaciones ambientales',
    'alto': 'Conflictos por recursos',
    'critico': 'Convenios marco'
  }
  return descriptions[criticidad] || ''
}

const getSimulacionesPorCriticidad = (criticidad) => {
  return simulacionesStore.simulacionesPorCriticidad(criticidad).length
}

const getActorBadgeClass = (tipo) => {
  const classes = {
    'comunidad': 'bg-green-100 text-green-800',
    'empresa': 'bg-blue-100 text-blue-800',
    'gobierno': 'bg-purple-100 text-purple-800',
    'organizacion': 'bg-orange-100 text-orange-800',
    'gremio': 'bg-yellow-100 text-yellow-800'
  }
  return classes[tipo] || 'bg-gray-100 text-gray-800'
}

const getCriticalityLevel = (criticidad) => {
  const levels = { 'bajo': 1, 'medio': 2, 'alto': 3, 'critico': 4 }
  return levels[criticidad] || 1
}

const filtrarPorCriticidad = (criticidad) => {
  filtroSeleccionado.value = filtroSeleccionado.value === criticidad ? '' : criticidad
}

const iniciarSimulacion = async (simulacionId) => {
  if (!canAccessSimulation(simulacionesStore.simulaciones.find(s => s.id === simulacionId)?.criticidad)) {
    return
  }
  
  loading.value = true
  try {
    await simulacionesStore.iniciarSimulacion(simulacionId)
    router.push(`/simulaciones/${simulacionId}`)
  } catch (error) {
    console.error('Error iniciando simulación:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await simulacionesStore.cargarSimulaciones()
})
</script>