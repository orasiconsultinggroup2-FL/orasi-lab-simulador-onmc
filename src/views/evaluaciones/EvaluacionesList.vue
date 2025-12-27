<template>
  <div class="space-y-6">
    <!-- Resumen de evaluaciones -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-blue-600">{{ evaluaciones.length }}</div>
          <div class="text-sm text-gray-600">Total Evaluaciones</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-green-600">{{ promedioGeneral }}</div>
          <div class="text-sm text-gray-600">Promedio General</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-purple-600">{{ mejorPuntuacion }}</div>
          <div class="text-sm text-gray-600">Mejor Puntuación</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-orange-600">{{ tendencia }}</div>
          <div class="text-sm text-gray-600">Tendencia</div>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Período</label>
            <select 
              v-model="filtroFecha" 
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="ultima_semana">Última semana</option>
              <option value="ultimo_mes">Último mes</option>
              <option value="ultimos_3_meses">Últimos 3 meses</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Puntuación</label>
            <select 
              v-model="filtroPuntuacion" 
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              <option value="excelente">Excelente (8-10)</option>
              <option value="buena">Buena (6-7.9)</option>
              <option value="regular">Regular (4-5.9)</option>
              <option value="baja">Baja (0-3.9)</option>
            </select>
          </div>
        </div>
        <div class="text-sm text-gray-600">
          {{ evaluacionesFiltradas.length }} evaluaciones encontradas
        </div>
      </div>
    </div>

    <!-- Lista de evaluaciones -->
    <div class="space-y-4">
      <div 
        v-for="evaluacion in evaluacionesFiltradas" 
        :key="evaluacion.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">
                {{ getSimulacionTitulo(evaluacion.simulacionId) }}
              </h3>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <span class="flex items-center">
                  <CalendarIcon class="w-4 h-4 mr-1" />
                  {{ formatDate(evaluacion.fechaCompletada) }}
                </span>
                <span class="flex items-center">
                  <ClockIcon class="w-4 h-4 mr-1" />
                  {{ formatTiempo(evaluacion.tiempoTotal) }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div 
                class="text-3xl font-bold mb-1"
                :class="getScoreColor(evaluacion.puntuacionTotal)"
              >
                {{ evaluacion.puntuacionTotal }}/10
              </div>
              <div class="text-sm text-gray-600">Puntuación final</div>
            </div>
          </div>

          <!-- Criterios de evaluación -->
          <div class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-3">Criterios de Evaluación</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(puntuacion, criterio) in evaluacion.criterios" :key="criterio" class="flex items-center justify-between">
                <span class="text-sm text-gray-700">{{ criterio }}</span>
                <div class="flex items-center space-x-2">
                  <div class="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getBarColor(puntuacion)"
                      :style="{ width: `${(puntuacion / 10) * 100}%` }"
                    ></div>
                  </div>
                  <span class="text-sm font-medium text-gray-900 w-8">{{ puntuacion }}/10</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Feedback -->
          <div v-if="evaluacion.feedback" class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Retroalimentación</h4>
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p class="text-sm text-blue-800">{{ evaluacion.feedback }}</p>
            </div>
          </div>

          <!-- Decisiones clave -->
          <div v-if="evaluacion.decisiones && evaluacion.decisiones.length > 0" class="mb-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Decisiones Clave</h4>
            <div class="space-y-2">
              <div 
                v-for="(decision, index) in evaluacion.decisiones.slice(0, 3)" 
                :key="index"
                class="flex items-start space-x-2 text-sm"
              >
                <div class="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span class="font-medium text-gray-900">{{ decision.tipo }}:</span>
                  <span class="text-gray-600 ml-1">{{ decision.opcion?.titulo || 'Decisión registrada' }}</span>
                </div>
              </div>
              <div v-if="evaluacion.decisiones.length > 3" class="text-xs text-gray-500 ml-4">
                +{{ evaluacion.decisiones.length - 3 }} decisiones más
              </div>
            </div>
          </div>

          <!-- Acciones -->
          <div class="flex items-center justify-between pt-4 border-t border-gray-200">
            <div class="flex items-center space-x-2">
              <span 
                class="px-2 py-1 text-xs font-medium rounded-full"
                :class="getPerformanceBadgeClass(evaluacion.puntuacionTotal)"
              >
                {{ getPerformanceLabel(evaluacion.puntuacionTotal) }}
              </span>
            </div>
            <div class="flex space-x-2">
              <button
                @click="verDetalles(evaluacion)"
                class="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver detalles
              </button>
              <button
                @click="repetirSimulacion(evaluacion.simulacionId)"
                class="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 font-medium"
              >
                Repetir simulación
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-if="evaluacionesFiltradas.length === 0" class="text-center py-12">
      <ClipboardCheckIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 mb-2">No hay evaluaciones disponibles</h3>
      <p class="text-gray-600 mb-4">
        {{ filtroFecha || filtroPuntuacion ? 'Intenta cambiar los filtros' : 'Completa una simulación para ver tus evaluaciones' }}
      </p>
      <router-link
        to="/simulaciones"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <PlayIcon class="w-4 h-4 mr-2" />
        Ir a Simulaciones
      </router-link>
    </div>

    <!-- Modal de detalles -->
    <div v-if="evaluacionSeleccionada" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Detalles de Evaluación</h3>
            <button
              @click="evaluacionSeleccionada = null"
              class="text-gray-400 hover:text-gray-600"
            >
              <XIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
        <div class="p-6">
          <div class="space-y-6">
            <!-- Información general -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Información General</h4>
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-600">Simulación:</span>
                  <div class="font-medium">{{ getSimulacionTitulo(evaluacionSeleccionada.simulacionId) }}</div>
                </div>
                <div>
                  <span class="text-gray-600">Fecha:</span>
                  <div class="font-medium">{{ formatDate(evaluacionSeleccionada.fechaCompletada) }}</div>
                </div>
                <div>
                  <span class="text-gray-600">Tiempo total:</span>
                  <div class="font-medium">{{ formatTiempo(evaluacionSeleccionada.tiempoTotal) }}</div>
                </div>
                <div>
                  <span class="text-gray-600">Puntuación:</span>
                  <div class="font-medium text-lg" :class="getScoreColor(evaluacionSeleccionada.puntuacionTotal)">
                    {{ evaluacionSeleccionada.puntuacionTotal }}/10
                  </div>
                </div>
              </div>
            </div>

            <!-- Criterios detallados -->
            <div>
              <h4 class="font-medium text-gray-900 mb-3">Evaluación por Criterios</h4>
              <div class="space-y-3">
                <div v-for="(puntuacion, criterio) in evaluacionSeleccionada.criterios" :key="criterio">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-medium text-gray-700">{{ criterio }}</span>
                    <span class="text-sm font-bold text-gray-900">{{ puntuacion }}/10</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getBarColor(puntuacion)"
                      :style="{ width: `${(puntuacion / 10) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Todas las decisiones -->
            <div v-if="evaluacionSeleccionada.decisiones && evaluacionSeleccionada.decisiones.length > 0">
              <h4 class="font-medium text-gray-900 mb-3">Historial de Decisiones</h4>
              <div class="space-y-3">
                <div 
                  v-for="(decision, index) in evaluacionSeleccionada.decisiones" 
                  :key="index"
                  class="border border-gray-200 rounded-lg p-3"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-gray-900">{{ decision.tipo }}</span>
                    <span class="text-xs text-gray-500">{{ formatDate(decision.timestamp) }}</span>
                  </div>
                  <div class="text-sm text-gray-600">
                    {{ decision.opcion?.titulo || 'Decisión registrada' }}
                  </div>
                  <div v-if="decision.opcion?.descripcion" class="text-xs text-gray-500 mt-1">
                    {{ decision.opcion.descripcion }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSimulacionesStore } from '@/stores/simulaciones'
import { format, subWeeks, subMonths } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  CalendarIcon,
  ClockIcon,
  ClipboardCheckIcon,
  PlayIcon,
  XIcon
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const simulacionesStore = useSimulacionesStore()

const filtroFecha = ref('')
const filtroPuntuacion = ref('')
const evaluacionSeleccionada = ref(null)

const user = computed(() => authStore.currentUser)
const evaluaciones = computed(() => 
  simulacionesStore.evaluaciones.filter(e => e.userId === user.value?.id)
)

const evaluacionesFiltradas = computed(() => {
  let filtered = evaluaciones.value

  // Filtrar por fecha
  if (filtroFecha.value) {
    const now = new Date()
    let fechaLimite
    
    switch (filtroFecha.value) {
      case 'ultima_semana':
        fechaLimite = subWeeks(now, 1)
        break
      case 'ultimo_mes':
        fechaLimite = subMonths(now, 1)
        break
      case 'ultimos_3_meses':
        fechaLimite = subMonths(now, 3)
        break
    }
    
    if (fechaLimite) {
      filtered = filtered.filter(e => new Date(e.fechaCompletada) >= fechaLimite)
    }
  }

  // Filtrar por puntuación
  if (filtroPuntuacion.value) {
    switch (filtroPuntuacion.value) {
      case 'excelente':
        filtered = filtered.filter(e => e.puntuacionTotal >= 8)
        break
      case 'buena':
        filtered = filtered.filter(e => e.puntuacionTotal >= 6 && e.puntuacionTotal < 8)
        break
      case 'regular':
        filtered = filtered.filter(e => e.puntuacionTotal >= 4 && e.puntuacionTotal < 6)
        break
      case 'baja':
        filtered = filtered.filter(e => e.puntuacionTotal < 4)
        break
    }
  }

  return filtered.sort((a, b) => new Date(b.fechaCompletada) - new Date(a.fechaCompletada))
})

const promedioGeneral = computed(() => {
  if (evaluaciones.value.length === 0) return '0.0'
  const suma = evaluaciones.value.reduce((acc, e) => acc + e.puntuacionTotal, 0)
  return (suma / evaluaciones.value.length).toFixed(1)
})

const mejorPuntuacion = computed(() => {
  if (evaluaciones.value.length === 0) return '0.0'
  return Math.max(...evaluaciones.value.map(e => e.puntuacionTotal)).toFixed(1)
})

const tendencia = computed(() => {
  if (evaluaciones.value.length < 2) return '→'
  const recientes = evaluaciones.value.slice(0, 3)
  const anteriores = evaluaciones.value.slice(3, 6)
  
  if (anteriores.length === 0) return '→'
  
  const promedioReciente = recientes.reduce((acc, e) => acc + e.puntuacionTotal, 0) / recientes.length
  const promedioAnterior = anteriores.reduce((acc, e) => acc + e.puntuacionTotal, 0) / anteriores.length
  
  if (promedioReciente > promedioAnterior) return '↗'
  if (promedioReciente < promedioAnterior) return '↘'
  return '→'
})

const getSimulacionTitulo = (simulacionId) => {
  const simulacion = simulacionesStore.simulaciones.find(s => s.id === simulacionId)
  return simulacion?.titulo || 'Simulación no encontrada'
}

const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  if (score >= 4) return 'text-orange-600'
  return 'text-red-600'
}

const getBarColor = (score) => {
  if (score >= 8) return 'bg-green-500'
  if (score >= 6) return 'bg-yellow-500'
  if (score >= 4) return 'bg-orange-500'
  return 'bg-red-500'
}

const getPerformanceBadgeClass = (score) => {
  if (score >= 8) return 'bg-green-100 text-green-800'
  if (score >= 6) return 'bg-yellow-100 text-yellow-800'
  if (score >= 4) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

const getPerformanceLabel = (score) => {
  if (score >= 8) return 'Excelente'
  if (score >= 6) return 'Bueno'
  if (score >= 4) return 'Regular'
  return 'Necesita mejorar'
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM yyyy', { locale: es })
}

const formatTiempo = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  if (horas > 0) {
    return `${horas}h ${mins}m`
  }
  return `${mins}m`
}

const verDetalles = (evaluacion) => {
  evaluacionSeleccionada.value = evaluacion
}

const repetirSimulacion = (simulacionId) => {
  router.push(`/simulaciones/${simulacionId}`)
}

onMounted(async () => {
  await simulacionesStore.cargarSimulaciones()
})
</script>