<template>
  <div class="space-y-6">
    <!-- Filtros de período -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex items-center space-x-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Período de análisis</label>
            <select 
              v-model="periodoSeleccionado" 
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ultima_semana">Última semana</option>
              <option value="ultimo_mes">Último mes</option>
              <option value="ultimos_3_meses">Últimos 3 meses</option>
              <option value="todo">Todo el período</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Comparar con</label>
            <select 
              v-model="comparacionPeriodo" 
              class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sin comparación</option>
              <option value="periodo_anterior">Período anterior</option>
              <option value="promedio_historico">Promedio histórico</option>
            </select>
          </div>
        </div>
        <button
          @click="exportarReporte"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <DownloadIcon class="w-4 h-4 inline mr-2" />
          Exportar Reporte
        </button>
      </div>
    </div>

    <!-- Métricas principales -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ metricas.simulacionesCompletadas }}</div>
            <div class="text-sm text-gray-600">Simulaciones Completadas</div>
            <div v-if="metricas.cambioSimulaciones" class="flex items-center mt-1">
              <component 
                :is="metricas.cambioSimulaciones > 0 ? TrendingUpIcon : TrendingDownIcon" 
                class="w-4 h-4 mr-1"
                :class="metricas.cambioSimulaciones > 0 ? 'text-green-500' : 'text-red-500'"
              />
              <span 
                class="text-xs font-medium"
                :class="metricas.cambioSimulaciones > 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ Math.abs(metricas.cambioSimulaciones) }}%
              </span>
            </div>
          </div>
          <div class="p-3 bg-blue-100 rounded-lg">
            <PlayIcon class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ metricas.promedioGeneral }}</div>
            <div class="text-sm text-gray-600">Promedio General</div>
            <div v-if="metricas.cambioPromedio" class="flex items-center mt-1">
              <component 
                :is="metricas.cambioPromedio > 0 ? TrendingUpIcon : TrendingDownIcon" 
                class="w-4 h-4 mr-1"
                :class="metricas.cambioPromedio > 0 ? 'text-green-500' : 'text-red-500'"
              />
              <span 
                class="text-xs font-medium"
                :class="metricas.cambioPromedio > 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ Math.abs(metricas.cambioPromedio) }}%
              </span>
            </div>
          </div>
          <div class="p-3 bg-green-100 rounded-lg">
            <StarIcon class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ metricas.tiempoPromedio }}m</div>
            <div class="text-sm text-gray-600">Tiempo Promedio</div>
            <div v-if="metricas.cambioTiempo" class="flex items-center mt-1">
              <component 
                :is="metricas.cambioTiempo > 0 ? TrendingUpIcon : TrendingDownIcon" 
                class="w-4 h-4 mr-1"
                :class="metricas.cambioTiempo > 0 ? 'text-red-500' : 'text-green-500'"
              />
              <span 
                class="text-xs font-medium"
                :class="metricas.cambioTiempo > 0 ? 'text-red-600' : 'text-green-600'"
              >
                {{ Math.abs(metricas.cambioTiempo) }}%
              </span>
            </div>
          </div>
          <div class="p-3 bg-yellow-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-2xl font-bold text-gray-900">{{ metricas.nivelActual }}</div>
            <div class="text-sm text-gray-600">Nivel Actual</div>
            <div class="text-xs text-gray-500 mt-1">
              {{ metricas.progresoNivel }}% al siguiente
            </div>
          </div>
          <div class="p-3 bg-purple-100 rounded-lg">
            <AwardIcon class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Gráficos de rendimiento -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Evolución del desempeño -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Evolución del Desempeño</h3>
        <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div class="text-center">
            <BarChart3Icon class="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p class="text-gray-500 text-sm">Gráfico de evolución temporal</p>
            <p class="text-xs text-gray-400 mt-1">Puntuaciones por simulación completada</p>
          </div>
        </div>
      </div>

      <!-- Distribución por criterios -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Desempeño por Criterios</h3>
        <div class="space-y-4">
          <div v-for="criterio in criteriosDesempeno" :key="criterio.nombre" class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ criterio.nombre }}</span>
              <span class="text-sm font-bold text-gray-900">{{ criterio.promedio }}/10</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getCriterioColor(criterio.promedio)"
                :style="{ width: `${(criterio.promedio / 10) * 100}%` }"
              ></div>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>Min: {{ criterio.minimo }}</span>
              <span>Max: {{ criterio.maximo }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Análisis por metodología -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Análisis por Metodología</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Metodología
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Simulaciones
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Promedio
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mejor Resultado
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tiempo Promedio
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fortaleza
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="metodologia in analisisMetodologias" :key="metodologia.nombre">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-medium text-gray-900">{{ metodologia.nombre }}</div>
                <div class="text-sm text-gray-500">{{ metodologia.descripcion }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ metodologia.simulaciones }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="text-sm font-medium"
                  :class="getScoreColor(metodologia.promedio)"
                >
                  {{ metodologia.promedio }}/10
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="text-sm font-medium"
                  :class="getScoreColor(metodologia.mejor)"
                >
                  {{ metodologia.mejor }}/10
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ metodologia.tiempoPromedio }}m
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getFortalezaClass(metodologia.fortaleza)"
                >
                  {{ metodologia.fortaleza }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Recomendaciones basadas en datos -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Basadas en Datos</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="recomendacion in recomendacionesData" :key="recomendacion.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-start space-x-3">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              :class="getRecomendacionIconClass(recomendacion.tipo)"
            >
              <component :is="getRecomendacionIcon(recomendacion.tipo)" class="w-4 h-4" />
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 mb-1">{{ recomendacion.titulo }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ recomendacion.descripcion }}</p>
              <div class="flex items-center justify-between">
                <span 
                  class="px-2 py-1 text-xs font-medium rounded-full"
                  :class="getPrioridadClass(recomendacion.prioridad)"
                >
                  {{ recomendacion.prioridad }}
                </span>
                <button
                  v-if="recomendacion.accion"
                  @click="ejecutarRecomendacion(recomendacion)"
                  class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {{ recomendacion.accion.texto }} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparación con otros usuarios (si está habilitado) -->
    <div v-if="user?.role === 'supervisor' || user?.role === 'gerencia'" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Comparación de Equipo</h3>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div class="flex items-start space-x-3">
          <InfoIcon class="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 class="font-medium text-blue-900">Vista de Supervisor</h4>
            <p class="text-sm text-blue-700 mt-1">
              Como {{ user?.role }}, puedes ver métricas agregadas del equipo para identificar oportunidades de mejora.
            </p>
          </div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">{{ equipoMetricas.promedioEquipo }}</div>
          <div class="text-sm text-gray-600">Promedio del Equipo</div>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">{{ equipoMetricas.mejorPerformance }}</div>
          <div class="text-sm text-gray-600">Mejor Performance</div>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">{{ equipoMetricas.simulacionesTotales }}</div>
          <div class="text-sm text-gray-600">Simulaciones Totales</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSimulacionesStore } from '@/stores/simulaciones'
import {
  DownloadIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlayIcon,
  StarIcon,
  ClockIcon,
  AwardIcon,
  BarChart3Icon,
  InfoIcon,
  TargetIcon,
  BookOpenIcon,
  AlertTriangleIcon,
  CheckCircleIcon
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const simulacionesStore = useSimulacionesStore()

const periodoSeleccionado = ref('ultimo_mes')
const comparacionPeriodo = ref('')

const user = computed(() => authStore.currentUser)

const metricas = computed(() => ({
  simulacionesCompletadas: user.value?.stats?.simulacionesCompletadas || 0,
  promedioGeneral: user.value?.stats?.promedioEvaluacion || 0,
  tiempoPromedio: 42, // Simulado
  nivelActual: user.value?.level || 1,
  progresoNivel: 65, // Simulado
  cambioSimulaciones: 15, // Simulado - cambio porcentual
  cambioPromedio: 8, // Simulado
  cambioTiempo: -12 // Simulado (negativo es mejor)
}))

const criteriosDesempeno = computed(() => [
  {
    nombre: 'Separación Personas-Problemas',
    promedio: 8.2,
    minimo: 6.5,
    maximo: 9.5
  },
  {
    nombre: 'Enfoque en Intereses',
    promedio: 7.5,
    minimo: 6.0,
    maximo: 9.0
  },
  {
    nombre: 'Generación de Opciones',
    promedio: 6.8,
    minimo: 5.5,
    maximo: 8.5
  },
  {
    nombre: 'Criterios Objetivos',
    promedio: 8.0,
    minimo: 7.0,
    maximo: 9.2
  }
])

const analisisMetodologias = computed(() => [
  {
    nombre: 'Harvard Negotiation Project',
    descripcion: 'Enfoque sistemático en intereses',
    simulaciones: 5,
    promedio: 8.2,
    mejor: 9.5,
    tiempoPromedio: 38,
    fortaleza: 'Alta'
  },
  {
    nombre: 'Mutual Gains Approach',
    descripcion: 'Creación de valor compartido',
    simulaciones: 3,
    promedio: 7.1,
    mejor: 8.0,
    tiempoPromedio: 45,
    fortaleza: 'Media'
  },
  {
    nombre: 'Mediación Colaborativa',
    descripcion: 'Facilitación de diálogo',
    simulaciones: 1,
    promedio: 6.5,
    mejor: 6.5,
    tiempoPromedio: 52,
    fortaleza: 'Baja'
  }
])

const recomendacionesData = computed(() => [
  {
    id: 1,
    titulo: 'Mejorar Generación de Opciones',
    descripcion: 'Tu puntuación más baja está en este criterio. Practica con simulaciones de alta complejidad.',
    tipo: 'mejora',
    prioridad: 'Alta',
    accion: {
      texto: 'Ver simulaciones recomendadas',
      tipo: 'simulaciones'
    }
  },
  {
    id: 2,
    titulo: 'Explorar Nueva Metodología',
    descripcion: 'Has dominado Harvard Negotiation. Es momento de explorar Mutual Gains Approach.',
    tipo: 'expansion',
    prioridad: 'Media',
    accion: {
      texto: 'Explorar metodología',
      tipo: 'metodologia'
    }
  },
  {
    id: 3,
    titulo: 'Optimizar Tiempo de Simulación',
    descripcion: 'Tu tiempo promedio es 15% mayor al recomendado. Practica toma de decisiones más ágil.',
    tipo: 'eficiencia',
    prioridad: 'Baja',
    accion: {
      texto: 'Ver consejos',
      tipo: 'tips'
    }
  },
  {
    id: 4,
    titulo: 'Próximo a Nivel 3',
    descripcion: 'Estás a solo 2 simulaciones de desbloquear casos de alta criticidad.',
    tipo: 'progreso',
    prioridad: 'Alta',
    accion: {
      texto: 'Continuar progreso',
      tipo: 'nivel'
    }
  }
])

const equipoMetricas = computed(() => ({
  promedioEquipo: 7.8,
  mejorPerformance: 9.2,
  simulacionesTotales: 47
}))

const getCriterioColor = (promedio) => {
  if (promedio >= 8) return 'bg-green-500'
  if (promedio >= 6) return 'bg-yellow-500'
  if (promedio >= 4) return 'bg-orange-500'
  return 'bg-red-500'
}

const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600'
  if (score >= 6) return 'text-yellow-600'
  if (score >= 4) return 'text-orange-600'
  return 'text-red-600'
}

const getFortalezaClass = (fortaleza) => {
  const classes = {
    'Alta': 'bg-green-100 text-green-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-red-100 text-red-800'
  }
  return classes[fortaleza] || 'bg-gray-100 text-gray-800'
}

const getRecomendacionIconClass = (tipo) => {
  const classes = {
    'mejora': 'bg-red-100 text-red-600',
    'expansion': 'bg-blue-100 text-blue-600',
    'eficiencia': 'bg-yellow-100 text-yellow-600',
    'progreso': 'bg-green-100 text-green-600'
  }
  return classes[tipo] || 'bg-gray-100 text-gray-600'
}

const getRecomendacionIcon = (tipo) => {
  const icons = {
    'mejora': AlertTriangleIcon,
    'expansion': BookOpenIcon,
    'eficiencia': ClockIcon,
    'progreso': CheckCircleIcon
  }
  return icons[tipo] || TargetIcon
}

const getPrioridadClass = (prioridad) => {
  const classes = {
    'Alta': 'bg-red-100 text-red-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-green-100 text-green-800'
  }
  return classes[prioridad] || 'bg-gray-100 text-gray-800'
}

const exportarReporte = () => {
  // Simular exportación de reporte
  const data = {
    usuario: user.value?.name,
    periodo: periodoSeleccionado.value,
    metricas: metricas.value,
    criterios: criteriosDesempeno.value,
    metodologias: analisisMetodologias.value,
    fecha: new Date().toISOString()
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reporte-onmc-${user.value?.name}-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const ejecutarRecomendacion = (recomendacion) => {
  switch (recomendacion.accion.tipo) {
    case 'simulaciones':
      router.push('/simulaciones')
      break
    case 'metodologia':
      router.push('/simulaciones')
      break
    case 'tips':
      // Mostrar modal con consejos
      break
    case 'nivel':
      router.push('/simulaciones')
      break
  }
}
</script>