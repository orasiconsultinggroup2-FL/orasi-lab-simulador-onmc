<template>
  <div class="space-y-6">
    <!-- Información del perfil -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <UserIcon class="w-12 h-12 text-white" />
          </div>
          <div class="text-white">
            <h1 class="text-2xl font-bold">{{ user?.name }}</h1>
            <p class="text-blue-100 text-lg">{{ getRoleDescription(user?.role) }}</p>
            <div class="flex items-center space-x-4 mt-2">
              <span class="bg-white/20 px-3 py-1 rounded-full text-sm">
                Nivel {{ user?.level }}
              </span>
              <span class="text-blue-200 text-sm">{{ user?.company }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ user?.stats?.simulacionesCompletadas || 0 }}</div>
            <div class="text-sm text-gray-600">Simulaciones Completadas</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ user?.stats?.promedioEvaluacion || 0 }}</div>
            <div class="text-sm text-gray-600">Promedio de Evaluación</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900">{{ diasEnPlataforma }}</div>
            <div class="text-sm text-gray-600">Días en la Plataforma</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Progreso por nivel -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Progreso de Nivel</h3>
      
      <div class="space-y-4">
        <div v-for="nivel in 4" :key="nivel" class="flex items-center space-x-4">
          <div 
            class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
            :class="getNivelClass(nivel)"
          >
            {{ nivel }}
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-sm font-medium text-gray-700">{{ getNivelLabel(nivel) }}</span>
              <span class="text-sm text-gray-600">{{ getNivelProgreso(nivel) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full transition-all duration-300"
                :class="getNivelBarClass(nivel)"
                :style="{ width: `${getNivelProgreso(nivel)}%` }"
              ></div>
            </div>
          </div>
          <div class="text-xs text-gray-500 w-16 text-right">
            {{ getSimulacionesPorNivel(nivel) }}/{{ getRequisitosPorNivel(nivel) }}
          </div>
        </div>
      </div>

      <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div class="flex items-start space-x-3">
          <InfoIcon class="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 class="font-medium text-blue-900">Próximo Nivel</h4>
            <p class="text-sm text-blue-700 mt-1">
              {{ getProximoNivelInfo() }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Competencias desarrolladas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Competencias Desarrolladas</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="competencia in competencias" :key="competencia.nombre" class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">{{ competencia.nombre }}</span>
            <span class="text-sm font-bold text-gray-900">{{ competencia.nivel }}/10</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="h-2 rounded-full transition-all duration-300"
              :class="getCompetenciaColor(competencia.nivel)"
              :style="{ width: `${(competencia.nivel / 10) * 100}%` }"
            ></div>
          </div>
          <p class="text-xs text-gray-600">{{ competencia.descripcion }}</p>
        </div>
      </div>
    </div>

    <!-- Historial de logros -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Logros Recientes</h3>
      
      <div class="space-y-4">
        <div v-for="logro in logros" :key="logro.id" class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
          <div 
            class="w-10 h-10 rounded-full flex items-center justify-center"
            :class="getLogroIconClass(logro.tipo)"
          >
            <component :is="getLogroIcon(logro.tipo)" class="w-5 h-5" />
          </div>
          <div class="flex-1">
            <h4 class="font-medium text-gray-900">{{ logro.titulo }}</h4>
            <p class="text-sm text-gray-600 mt-1">{{ logro.descripcion }}</p>
            <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <span>{{ formatDate(logro.fecha) }}</span>
              <span v-if="logro.puntos" class="flex items-center">
                <StarIcon class="w-3 h-3 mr-1" />
                +{{ logro.puntos }} puntos
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Metodologías dominadas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Metodologías de Negociación</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="metodologia in metodologias" :key="metodologia.nombre" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <h4 class="font-medium text-gray-900">{{ metodologia.nombre }}</h4>
            <span 
              class="px-2 py-1 text-xs font-medium rounded-full"
              :class="getMetodologiaClass(metodologia.dominio)"
            >
              {{ getMetodologiaLabel(metodologia.dominio) }}
            </span>
          </div>
          <p class="text-sm text-gray-600 mb-3">{{ metodologia.descripcion }}</p>
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">Simulaciones completadas</span>
              <span class="font-medium">{{ metodologia.simulacionesCompletadas }}</span>
            </div>
            <div class="flex items-center justify-between text-xs">
              <span class="text-gray-600">Promedio de puntuación</span>
              <span class="font-medium">{{ metodologia.promedioScore }}/10</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recomendaciones personalizadas -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recomendaciones Personalizadas</h3>
      
      <div class="space-y-4">
        <div v-for="recomendacion in recomendaciones" :key="recomendacion.id" class="border-l-4 border-blue-400 pl-4">
          <h4 class="font-medium text-gray-900">{{ recomendacion.titulo }}</h4>
          <p class="text-sm text-gray-600 mt-1">{{ recomendacion.descripcion }}</p>
          <button
            v-if="recomendacion.accion"
            @click="ejecutarRecomendacion(recomendacion)"
            class="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {{ recomendacion.accion.texto }} →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSimulacionesStore } from '@/stores/simulaciones'
import { format, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import {
  UserIcon,
  InfoIcon,
  StarIcon,
  TrophyIcon,
  TargetIcon,
  BookOpenIcon,
  AwardIcon
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const simulacionesStore = useSimulacionesStore()

const user = computed(() => authStore.currentUser)

const diasEnPlataforma = computed(() => {
  // Simulamos que el usuario se registró hace algunos días
  const fechaRegistro = new Date('2024-01-01')
  return differenceInDays(new Date(), fechaRegistro)
})

const competencias = computed(() => [
  {
    nombre: 'Separación Personas-Problemas',
    nivel: 8.2,
    descripcion: 'Capacidad para distinguir entre las personas y los problemas en una negociación'
  },
  {
    nombre: 'Enfoque en Intereses',
    nivel: 7.5,
    descripcion: 'Habilidad para identificar intereses subyacentes vs posiciones declaradas'
  },
  {
    nombre: 'Generación de Opciones',
    nivel: 6.8,
    descripcion: 'Creatividad para generar alternativas de valor mutuo'
  },
  {
    nombre: 'Criterios Objetivos',
    nivel: 8.0,
    descripcion: 'Uso de estándares justos e independientes para evaluar acuerdos'
  },
  {
    nombre: 'Comunicación Efectiva',
    nivel: 7.2,
    descripcion: 'Habilidades de escucha activa y comunicación clara'
  },
  {
    nombre: 'Gestión de Emociones',
    nivel: 6.5,
    descripcion: 'Manejo de emociones propias y de otros durante conflictos'
  }
])

const logros = computed(() => [
  {
    id: 1,
    titulo: 'Primera Simulación Completada',
    descripcion: 'Has completado tu primera simulación de negociación',
    fecha: '2024-01-15',
    tipo: 'milestone',
    puntos: 100
  },
  {
    id: 2,
    titulo: 'Negociador Colaborativo',
    descripcion: 'Excelente desempeño en metodología Harvard Negotiation Project',
    fecha: '2024-01-20',
    tipo: 'skill',
    puntos: 150
  },
  {
    id: 3,
    titulo: 'Nivel 2 Alcanzado',
    descripcion: 'Has desbloqueado simulaciones de criticidad media',
    fecha: '2024-01-25',
    tipo: 'level',
    puntos: 200
  }
])

const metodologias = computed(() => [
  {
    nombre: 'Harvard Negotiation',
    descripcion: 'Enfoque sistemático en intereses vs posiciones',
    dominio: 'avanzado',
    simulacionesCompletadas: 5,
    promedioScore: 8.2
  },
  {
    nombre: 'Mutual Gains',
    descripcion: 'Creación de valor compartido',
    dominio: 'intermedio',
    simulacionesCompletadas: 3,
    promedioScore: 7.1
  },
  {
    nombre: 'Mediación Colaborativa',
    descripcion: 'Facilitación de diálogo constructivo',
    dominio: 'basico',
    simulacionesCompletadas: 1,
    promedioScore: 6.5
  }
])

const recomendaciones = computed(() => [
  {
    id: 1,
    titulo: 'Practica Generación de Opciones',
    descripcion: 'Tu puntuación en este criterio puede mejorar. Te recomendamos la simulación de Convenio Marco.',
    accion: {
      texto: 'Ir a simulación',
      tipo: 'simulacion',
      id: 2
    }
  },
  {
    id: 2,
    titulo: 'Explora Mediación Colaborativa',
    descripcion: 'Amplía tus habilidades con una nueva metodología de negociación.',
    accion: {
      texto: 'Ver simulaciones',
      tipo: 'metodologia',
      filtro: 'Mediación Colaborativa'
    }
  },
  {
    id: 3,
    titulo: 'Próximo a Nivel 3',
    descripcion: 'Completa 2 simulaciones más para desbloquear casos de alta criticidad.',
    accion: {
      texto: 'Ver simulaciones disponibles',
      tipo: 'nivel'
    }
  }
])

const getRoleDescription = (role) => {
  const descriptions = {
    'gestor': 'Gestor de Relacionamiento Comunitario',
    'supervisor': 'Supervisor de Operaciones Sociales',
    'gerencia': 'Gerencia de Asuntos Corporativos'
  }
  return descriptions[role] || 'Negociador'
}

const getNivelClass = (nivel) => {
  const currentLevel = user.value?.level || 1
  if (nivel <= currentLevel) {
    return 'bg-blue-600 text-white'
  }
  return 'bg-gray-200 text-gray-600'
}

const getNivelLabel = (nivel) => {
  const labels = {
    1: 'Negociador Básico',
    2: 'Negociador Intermedio', 
    3: 'Negociador Avanzado',
    4: 'Negociador Experto'
  }
  return labels[nivel] || `Nivel ${nivel}`
}

const getNivelProgreso = (nivel) => {
  const currentLevel = user.value?.level || 1
  if (nivel < currentLevel) return 100
  if (nivel === currentLevel) {
    // Simular progreso hacia el siguiente nivel
    const completadas = user.value?.stats?.simulacionesCompletadas || 0
    const requeridas = getRequisitosPorNivel(nivel)
    return Math.min(100, (completadas / requeridas) * 100)
  }
  return 0
}

const getNivelBarClass = (nivel) => {
  const currentLevel = user.value?.level || 1
  if (nivel <= currentLevel) {
    return 'bg-blue-600'
  }
  return 'bg-gray-300'
}

const getSimulacionesPorNivel = (nivel) => {
  const currentLevel = user.value?.level || 1
  if (nivel <= currentLevel) {
    return getRequisitosPorNivel(nivel)
  }
  if (nivel === currentLevel + 1) {
    return user.value?.stats?.simulacionesCompletadas || 0
  }
  return 0
}

const getRequisitosPorNivel = (nivel) => {
  const requisitos = { 1: 2, 2: 5, 3: 10, 4: 15 }
  return requisitos[nivel] || 0
}

const getProximoNivelInfo = () => {
  const currentLevel = user.value?.level || 1
  if (currentLevel >= 4) {
    return 'Has alcanzado el nivel máximo. ¡Felicitaciones!'
  }
  
  const completadas = user.value?.stats?.simulacionesCompletadas || 0
  const requeridas = getRequisitosPorNivel(currentLevel + 1)
  const faltantes = Math.max(0, requeridas - completadas)
  
  if (faltantes === 0) {
    return `¡Estás listo para el Nivel ${currentLevel + 1}!`
  }
  
  return `Completa ${faltantes} simulación${faltantes > 1 ? 'es' : ''} más para alcanzar el Nivel ${currentLevel + 1}`
}

const getCompetenciaColor = (nivel) => {
  if (nivel >= 8) return 'bg-green-500'
  if (nivel >= 6) return 'bg-yellow-500'
  if (nivel >= 4) return 'bg-orange-500'
  return 'bg-red-500'
}

const getLogroIconClass = (tipo) => {
  const classes = {
    'milestone': 'bg-blue-100 text-blue-600',
    'skill': 'bg-green-100 text-green-600',
    'level': 'bg-purple-100 text-purple-600'
  }
  return classes[tipo] || 'bg-gray-100 text-gray-600'
}

const getLogroIcon = (tipo) => {
  const icons = {
    'milestone': TrophyIcon,
    'skill': TargetIcon,
    'level': AwardIcon
  }
  return icons[tipo] || BookOpenIcon
}

const getMetodologiaClass = (dominio) => {
  const classes = {
    'basico': 'bg-gray-100 text-gray-800',
    'intermedio': 'bg-yellow-100 text-yellow-800',
    'avanzado': 'bg-green-100 text-green-800'
  }
  return classes[dominio] || 'bg-gray-100 text-gray-800'
}

const getMetodologiaLabel = (dominio) => {
  const labels = {
    'basico': 'Básico',
    'intermedio': 'Intermedio',
    'avanzado': 'Avanzado'
  }
  return labels[dominio] || 'Sin clasificar'
}

const formatDate = (dateString) => {
  return format(new Date(dateString), 'dd MMM yyyy', { locale: es })
}

const ejecutarRecomendacion = (recomendacion) => {
  switch (recomendacion.accion.tipo) {
    case 'simulacion':
      router.push(`/simulaciones/${recomendacion.accion.id}`)
      break
    case 'metodologia':
      router.push('/simulaciones')
      break
    case 'nivel':
      router.push('/simulaciones')
      break
  }
}
</script>