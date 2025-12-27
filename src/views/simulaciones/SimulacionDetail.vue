<template>
  <div v-if="simulacion" class="space-y-6">
    <!-- Header con información básica -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <div class="flex items-center space-x-2 mb-2">
            <span 
              class="px-3 py-1 text-sm font-medium rounded-full"
              :class="getCriticalityBadgeClass(simulacion.criticidad)"
            >
              {{ simulacion.criticidad.toUpperCase() }}
            </span>
            <span class="px-3 py-1 text-sm font-medium rounded-full bg-indigo-100 text-indigo-800">
              {{ simulacion.metodologia }}
            </span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">{{ simulacion.titulo }}</h1>
          <p class="text-gray-600">{{ simulacion.descripcion }}</p>
        </div>
        <button
          @click="$router.go(-1)"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeftIcon class="w-4 h-4 inline mr-2" />
          Volver
        </button>
      </div>
    </div>

    <!-- Metodología Harvard - Pasos Estructurados -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-xl font-bold text-gray-900">Metodología Harvard - Negociación Basada en Principios</h2>
        <p class="text-gray-600 mt-1">Sigue estos pasos estructurados para desarrollar el caso</p>
      </div>

      <!-- Progreso de pasos -->
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <div 
            v-for="(paso, index) in pasosHarvard" 
            :key="index"
            class="flex items-center"
            :class="{ 'flex-1': index < pasosHarvard.length - 1 }"
          >
            <div class="flex items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                :class="[
                  pasoActual > index ? 'bg-green-500 text-white' : 
                  pasoActual === index ? 'bg-blue-500 text-white' : 
                  'bg-gray-200 text-gray-600'
                ]"
              >
                <CheckIcon v-if="pasoActual > index" class="w-5 h-5" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="ml-3">
                <div class="text-sm font-medium text-gray-900">{{ paso.titulo }}</div>
                <div class="text-xs text-gray-500">{{ paso.descripcion }}</div>
              </div>
            </div>
            <div 
              v-if="index < pasosHarvard.length - 1" 
              class="flex-1 h-0.5 mx-4"
              :class="pasoActual > index ? 'bg-green-500' : 'bg-gray-200'"
            ></div>
          </div>
        </div>

        <!-- Contenido del paso actual -->
        <div class="bg-gray-50 rounded-lg p-6">
          <!-- Paso 1: Separar Personas del Problema -->
          <div v-if="pasoActual === 0">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Paso 1: Separar las Personas del Problema
            </h3>
            <p class="text-gray-600 mb-6">
              Identifica a los actores y sus emociones. Construye rapport y mantén relaciones constructivas.
            </p>

            <div class="space-y-6">
              <!-- Actores del caso -->
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Actores Identificados</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="actor in simulacion.actores" 
                    :key="actor.nombre"
                    class="border border-gray-200 rounded-lg p-4"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <h5 class="font-medium text-gray-900">{{ actor.nombre }}</h5>
                      <span 
                        class="px-2 py-1 text-xs font-medium rounded-full"
                        :class="getActorBadgeClass(actor.tipo)"
                      >
                        {{ actor.tipo }}
                      </span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">{{ actor.interes }}</p>
                    
                    <!-- Análisis emocional -->
                    <div class="space-y-2">
                      <label class="block text-xs font-medium text-gray-700">
                        Estado emocional percibido:
                      </label>
                      <select class="w-full text-sm border border-gray-300 rounded px-2 py-1">
                        <option>Neutral</option>
                        <option>Frustrado</option>
                        <option>Preocupado</option>
                        <option>Colaborativo</option>
                        <option>Defensivo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Estrategia de rapport -->
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Estrategia de Construcción de Rapport</h4>
                <textarea 
                  class="w-full border border-gray-300 rounded-lg p-3 text-sm"
                  rows="3"
                  placeholder="¿Cómo vas a establecer una relación constructiva con cada actor? ¿Qué elementos comunes puedes identificar?"
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button 
                  @click="siguientePaso"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continuar al Paso 2
                </button>
              </div>
            </div>
          </div>

          <!-- Paso 2: Identificar Intereses vs Posiciones -->
          <div v-if="pasoActual === 1">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Paso 2: Concentrarse en los Intereses, no en las Posiciones
            </h3>
            <p class="text-gray-600 mb-6">
              Las posiciones son lo que dicen querer; los intereses son por qué lo quieren. Explora el "por qué" detrás de cada demanda.
            </p>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Posiciones Declaradas</h4>
                  <div class="space-y-3">
                    <div v-for="actor in simulacion.actores" :key="actor.nombre" class="border border-gray-200 rounded-lg p-3">
                      <div class="font-medium text-sm text-gray-900 mb-2">{{ actor.nombre }}</div>
                      <textarea 
                        class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        rows="2"
                        :placeholder="`¿Qué está pidiendo ${actor.nombre}?`"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-medium text-gray-900 mb-3">Intereses Subyacentes</h4>
                  <div class="space-y-3">
                    <div v-for="actor in simulacion.actores" :key="actor.nombre" class="border border-gray-200 rounded-lg p-3">
                      <div class="font-medium text-sm text-gray-900 mb-2">{{ actor.nombre }}</div>
                      <textarea 
                        class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        rows="2"
                        :placeholder="`¿POR QUÉ lo quiere? ¿Qué necesidad busca satisfacer?`"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <!-- MAAN y ZOPA -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <h4 class="font-medium text-blue-900 mb-3">MAAN (Mejor Alternativa a un Acuerdo Negociado)</h4>
                  <textarea 
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                    rows="3"
                    placeholder="¿Cuál es tu mejor alternativa si no se llega a un acuerdo? ¿Qué opciones tienes fuera de esta negociación?"
                  ></textarea>
                </div>

                <div class="border border-green-200 rounded-lg p-4 bg-green-50">
                  <h4 class="font-medium text-green-900 mb-3">ZOPA (Zona de Posible Acuerdo)</h4>
                  <textarea 
                    class="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-white"
                    rows="3"
                    placeholder="¿Dónde crees que se puede encontrar un acuerdo que satisfaga los intereses de todas las partes?"
                  ></textarea>
                </div>
              </div>

              <div class="flex justify-between">
                <button 
                  @click="pasoAnterior"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Paso Anterior
                </button>
                <button 
                  @click="siguientePaso"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continuar al Paso 3
                </button>
              </div>
            </div>
          </div>

          <!-- Paso 3: Generar Opciones -->
          <div v-if="pasoActual === 2">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Paso 3: Generar Opciones de Beneficio Mutuo
            </h3>
            <p class="text-gray-600 mb-6">
              Busca soluciones creativas que satisfagan los intereses de ambas partes. Piensa en expandir el pastel antes de dividirlo.
            </p>

            <div class="space-y-6">
              <!-- Lluvia de ideas -->
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Lluvia de Ideas - Opciones Creativas</h4>
                <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p class="text-sm text-yellow-800">
                    💡 <strong>Regla de oro:</strong> Genera opciones sin juzgar. Separa la creación de la evaluación.
                  </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="n in 6" :key="n" class="border border-gray-200 rounded-lg p-3">
                    <label class="block text-xs font-medium text-gray-700 mb-2">Opción {{ n }}</label>
                    <textarea 
                      class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows="2"
                      :placeholder="`Describe una posible solución creativa...`"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Evaluación de opciones -->
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Evaluación de Opciones</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full border border-gray-200 rounded-lg">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Opción</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Beneficios</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Riesgos</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Viabilidad</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="n in 3" :key="n">
                        <td class="px-4 py-2 text-sm">Opción {{ n }}</td>
                        <td class="px-4 py-2">
                          <input type="text" class="w-full text-xs border border-gray-300 rounded px-2 py-1" placeholder="Beneficios...">
                        </td>
                        <td class="px-4 py-2">
                          <input type="text" class="w-full text-xs border border-gray-300 rounded px-2 py-1" placeholder="Riesgos...">
                        </td>
                        <td class="px-4 py-2">
                          <select class="w-full text-xs border border-gray-300 rounded px-2 py-1">
                            <option>Alta</option>
                            <option>Media</option>
                            <option>Baja</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="flex justify-between">
                <button 
                  @click="pasoAnterior"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Paso Anterior
                </button>
                <button 
                  @click="siguientePaso"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continuar al Paso 4
                </button>
              </div>
            </div>
          </div>

          <!-- Paso 4: Criterios Objetivos -->
          <div v-if="pasoActual === 3">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Paso 4: Usar Criterios Objetivos
            </h3>
            <p class="text-gray-600 mb-6">
              Base las decisiones en estándares justos e independientes de la voluntad de las partes.
            </p>

            <div class="space-y-6">
              <!-- Criterios objetivos -->
              <div>
                <h4 class="font-medium text-gray-900 mb-3">Criterios Objetivos Identificados</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-2">Criterios Legales</h5>
                    <textarea 
                      class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows="2"
                      placeholder="Leyes, regulaciones, normativas aplicables..."
                    ></textarea>
                  </div>
                  
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-2">Precedentes</h5>
                    <textarea 
                      class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows="2"
                      placeholder="Casos similares, decisiones anteriores..."
                    ></textarea>
                  </div>
                  
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-2">Estándares de Mercado</h5>
                    <textarea 
                      class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows="2"
                      placeholder="Precios de mercado, prácticas estándar..."
                    ></textarea>
                  </div>
                  
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h5 class="font-medium text-gray-900 mb-2">Opinión de Expertos</h5>
                    <textarea 
                      class="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                      rows="2"
                      placeholder="Evaluaciones técnicas, peritajes..."
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- Propuesta final -->
              <div class="border border-green-200 rounded-lg p-6 bg-green-50">
                <h4 class="font-medium text-green-900 mb-3">Propuesta Final Basada en Criterios Objetivos</h4>
                <textarea 
                  class="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white"
                  rows="4"
                  placeholder="Redacta tu propuesta final integrando los 4 principios de Harvard: personas separadas del problema, intereses identificados, opciones creativas y criterios objetivos..."
                ></textarea>
              </div>

              <div class="flex justify-between">
                <button 
                  @click="pasoAnterior"
                  class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Paso Anterior
                </button>
                <button 
                  @click="completarSimulacion"
                  class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Completar Simulación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Panel lateral con información del caso -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Información del Caso</h3>
      
      <!-- Contexto -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-900 mb-2">Contexto</h4>
        <p class="text-sm text-gray-600">{{ simulacion.descripcion }}</p>
      </div>

      <!-- Objetivos de aprendizaje -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-900 mb-2">Objetivos de Aprendizaje</h4>
        <ul class="space-y-1">
          <li v-for="objetivo in simulacion.objetivos" :key="objetivo" class="flex items-start text-sm text-gray-600">
            <CheckCircleIcon class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            {{ objetivo }}
          </li>
        </ul>
      </div>

      <!-- Metodología -->
      <div class="mb-6">
        <h4 class="font-medium text-gray-900 mb-2">Metodología</h4>
        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
          {{ simulacion.metodologia }}
        </span>
      </div>

      <!-- Tiempo estimado -->
      <div>
        <h4 class="font-medium text-gray-900 mb-2">Duración Estimada</h4>
        <div class="flex items-center text-sm text-gray-600">
          <ClockIcon class="w-4 h-4 mr-2" />
          {{ simulacion.duracionEstimada }} minutos
        </div>
      </div>
    </div>
  </div>

  <!-- Estado de carga -->
  <div v-else class="flex items-center justify-center h-64">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p class="text-gray-600">Cargando simulación...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSimulacionesStore } from '@/stores/simulaciones'
import { useAuthStore } from '@/stores/auth'
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const simulacionesStore = useSimulacionesStore()
const authStore = useAuthStore()

const pasoActual = ref(0)

const simulacion = computed(() => {
  const id = parseInt(route.params.id)
  return simulacionesStore.simulaciones.find(s => s.id === id)
})

const pasosHarvard = [
  {
    titulo: 'Personas vs Problema',
    descripcion: 'Separar actores del conflicto'
  },
  {
    titulo: 'Intereses vs Posiciones',
    descripcion: 'Identificar el "por qué"'
  },
  {
    titulo: 'Opciones Creativas',
    descripcion: 'Generar valor mutuo'
  },
  {
    titulo: 'Criterios Objetivos',
    descripcion: 'Estándares justos'
  }
]

const getCriticalityBadgeClass = (criticidad) => {
  const classes = {
    'bajo': 'bg-green-100 text-green-800',
    'medio': 'bg-yellow-100 text-yellow-800',
    'alto': 'bg-orange-100 text-orange-800',
    'critico': 'bg-red-100 text-red-800'
  }
  return classes[criticidad] || 'bg-gray-100 text-gray-800'
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

const siguientePaso = () => {
  if (pasoActual.value < pasosHarvard.length - 1) {
    pasoActual.value++
  }
}

const pasoAnterior = () => {
  if (pasoActual.value > 0) {
    pasoActual.value--
  }
}

const completarSimulacion = () => {
  // Aquí se implementaría la lógica para completar la simulación
  alert('¡Simulación completada! Serás redirigido a la evaluación.')
  router.push('/evaluaciones')
}

onMounted(async () => {
  await simulacionesStore.cargarSimulaciones()
})
</script>