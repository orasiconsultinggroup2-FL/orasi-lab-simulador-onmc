<template>
  <div class="space-y-6">
    <!-- Bienvenida personalizada -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Torre de Control de Riesgos Socio-Comunitarios</h2>
          <p class="text-gray-600 mt-1">
            {{ getRoleDescription(user?.role) }} - {{ user?.name }}
          </p>
          <div class="flex items-center mt-2 space-x-4">
            <span class="pilot-badge">Piloto Controlado - Minera Hochschild</span>
            <span class="text-sm text-gray-500">Nivel {{ user?.level }}</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold text-blue-600">{{ user?.stats?.simulacionesCompletadas || 0 }}</div>
          <div class="text-gray-500 text-sm">Simulaciones completadas</div>
        </div>
      </div>
    </div>

    <!-- Métricas principales -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <PlayIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900">{{ stats.disponibles }}</div>
            <div class="text-sm text-gray-600">Casos Activos</div>
            <div class="text-xs text-gray-500">Simulaciones</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="p-3 bg-red-100 rounded-lg">
            <AlertTriangleIcon class="w-6 h-6 text-red-600" />
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900">1</div>
            <div class="text-sm text-gray-600">Riesgo Crítico</div>
            <div class="text-xs text-gray-500">Atención inmediata</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900">85%</div>
            <div class="text-sm text-gray-600">Acuerdos Exitosos</div>
            <div class="text-xs text-gray-500">Tasa de éxito</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <TrendingUpIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900">$2.5M</div>
            <div class="text-sm text-gray-600">Valor Protegido</div>
            <div class="text-xs text-gray-500">En acuerdos</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Alertas y Casos Activos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Alertas Tempranas -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">⚠️ Alertas Tempranas & Movimientos Recientes</h3>
            <button class="text-sm text-blue-600 hover:text-blue-800">Ver todo</button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                <div>
                  <div class="font-medium text-gray-900">Comunidad Huancavelica</div>
                  <div class="text-sm text-gray-600">Conflicto por uso de agua</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-red-600">Crítico</div>
                <div class="text-xs text-gray-500">Hace 2h</div>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div class="flex items-center">
                <div class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <div class="font-medium text-gray-900">Distrito Minero</div>
                  <div class="text-sm text-gray-600">Renovación convenio marco</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-sm font-medium text-yellow-600">Alto</div>
                <div class="text-xs text-gray-500">Hace 1d</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Casos por Fase -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Casos por Fase</h3>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Preparación</span>
              </div>
              <span class="text-sm text-gray-600">3 casos</span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Negociación</span>
              </div>
              <span class="text-sm text-gray-600">2 casos</span>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span class="text-sm font-medium text-gray-900">Seguimiento</span>
              </div>
              <span class="text-sm text-gray-600">1 caso</span>
            </div>
          </div>
          
          <!-- Gráfico simple -->
          <div class="mt-6">
            <div class="flex h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="bg-blue-500 flex-1"></div>
              <div class="bg-yellow-500 flex-1"></div>
              <div class="bg-green-500 flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulaciones Disponibles -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Biblioteca de Simulación</h3>
          <router-link
            to="/simulaciones"
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Ver todas las simulaciones
          </router-link>
        </div>
        <p class="text-sm text-gray-600 mt-1">Repositorio centralizado de escenarios prácticos. 60 casos disponibles para entrenamiento.</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div v-for="criticidad in ['critico', 'alto', 'medio', 'bajo']" :key="criticidad" class="text-center">
            <div class="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
              <div class="text-2xl font-bold mb-2" :class="getCriticalityTextColor(criticidad)">
                {{ getSimulacionesPorCriticidad(criticidad) }}
              </div>
              <div class="text-sm font-medium text-gray-900 capitalize mb-1">{{ criticidad }}</div>
              <div class="text-xs text-gray-500">
                {{ getCriticalityDescription(criticidad) }}
              </div>
              <div class="mt-2">
                <span 
                  class="inline-block w-3 h-3 rounded-full"
                  :class="getCriticalityColor(criticidad)"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Metodologías ONMC -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Metodologías de Negociación ONMC</h3>
        <p class="text-sm text-gray-600 mt-1">Enfoques utilizados en las simulaciones del piloto</p>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="p-4 border border-gray-200 rounded-lg">
            <div class="font-medium text-gray-900 mb-2">Harvard Negotiation Project</div>
            <p class="text-sm text-gray-600">
              Enfoque en intereses vs posiciones, opciones de valor mutuo y criterios objetivos.
            </p>
          </div>
          <div class="p-4 border border-gray-200 rounded-lg">
            <div class="font-medium text-gray-900 mb-2">Mutual Gains Approach</div>
            <p class="text-sm text-gray-600">
              Creación de valor compartido y soluciones ganar-ganar en conflictos complejos.
            </p>
          </div>
          <div class="p-4 border border-gray-200 rounded-lg">
            <div class="font-medium text-gray-900 mb-2">Mediación Colaborativa</div>
            <p class="text-sm text-gray-600">
              Facilitación de diálogo constructivo entre múltiples actores con intereses diversos.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSimulacionesStore } from '@/stores/simulaciones'
import {
  CheckCircleIcon,
  PlayIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  LockIcon,
  ClipboardIcon
} from 'lucide-vue-next'

const authStore = useAuthStore()
const simulacionesStore = useSimulacionesStore()

const user = computed(() => authStore.currentUser)

const stats = computed(() => ({
  completadas: simulacionesStore.simulaciones.filter(s => s.completada).length,
  disponibles: simulacionesStore.simulacionesDisponibles(user.value?.level || 1).length,
  enProgreso: 0 // Por implementar
}))

const evaluacionesRecientes = computed(() => {
  return simulacionesStore.evaluaciones
    .filter(e => e.userId === user.value?.id)
    .slice(0, 3)
    .map(e => ({
      ...e,
      simulacionTitulo: simulacionesStore.simulaciones.find(s => s.id === e.simulacionId)?.titulo || 'Simulación'
    }))
})

const getRoleDescription = (role) => {
  const descriptions = {
    'gestor': 'Gestor de Relacionamiento Comunitario',
    'supervisor': 'Supervisor de Operaciones Sociales',
    'gerencia': 'Gerencia de Asuntos Corporativos'
  }
  return descriptions[role] || 'Negociador'
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

const canAccessCriticality = (criticidad) => {
  const criticalityLevels = { 'bajo': 1, 'medio': 2, 'alto': 3, 'critico': 4 }
  return (user.value?.level || 1) >= criticalityLevels[criticidad]
}

const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  return 'text-red-600'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  })
}

onMounted(async () => {
  await simulacionesStore.cargarSimulaciones()
})
</script>