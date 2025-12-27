<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Mapa de Actores</h2>
      <p class="text-gray-600">Gestión de relaciones, influencia y posiciones de stakeholders clave.</p>
    </div>

    <!-- Mapa Visual de Actores -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Mapa Visual de Stakeholders</h3>
      
      <!-- Matriz de Influencia vs Interés -->
      <div class="relative bg-gray-50 rounded-lg p-8 h-96">
        <!-- Ejes -->
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-full h-px bg-gray-300"></div>
        </div>
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="w-px h-full bg-gray-300"></div>
        </div>
        
        <!-- Labels de los ejes -->
        <div class="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
          Alta Influencia
        </div>
        <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
          Baja Influencia
        </div>
        <div class="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
          Alto Interés
        </div>
        <div class="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 text-sm font-medium text-gray-700">
          Bajo Interés
        </div>

        <!-- Actores posicionados -->
        <div class="absolute top-16 left-16 w-20 h-20 bg-red-100 border-2 border-red-300 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-xs font-medium text-red-800">Comunidad</div>
            <div class="text-xs text-red-600">Huancavelica</div>
          </div>
        </div>

        <div class="absolute top-16 right-16 w-20 h-20 bg-blue-100 border-2 border-blue-300 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-xs font-medium text-blue-800">Minera</div>
            <div class="text-xs text-blue-600">Hochschild</div>
          </div>
        </div>

        <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-purple-100 border-2 border-purple-300 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-xs font-medium text-purple-800">ANA</div>
            <div class="text-xs text-purple-600">Gobierno</div>
          </div>
        </div>

        <div class="absolute top-1/2 right-24 transform -translate-y-1/2 w-20 h-20 bg-green-100 border-2 border-green-300 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="text-xs font-medium text-green-800">Municipio</div>
            <div class="text-xs text-green-600">Local</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Actores -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Actores Principales -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Actores Principales</h3>
        </div>
        <div class="p-6 space-y-4">
          <div v-for="actor in actoresPrincipales" :key="actor.id" class="border border-gray-200 rounded-lg p-4">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <h4 class="font-medium text-gray-900">{{ actor.nombre }}</h4>
                <p class="text-sm text-gray-600">{{ actor.descripcion }}</p>
              </div>
              <span 
                class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                :class="getInfluenciaClass(actor.influencia)"
              >
                {{ actor.influencia }}
              </span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div class="font-medium text-gray-700">Interés:</div>
                <div class="text-gray-600">{{ actor.interes }}</div>
              </div>
              <div>
                <div class="font-medium text-gray-700">Posición:</div>
                <div class="text-gray-600">{{ actor.posicion }}</div>
              </div>
            </div>
            
            <div class="mt-3 flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <span class="text-xs text-gray-500">Última actualización:</span>
                <span class="text-xs text-gray-600">{{ actor.ultimaActualizacion }}</span>
              </div>
              <button class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Análisis de Relaciones -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Análisis de Relaciones</h3>
        </div>
        <div class="p-6 space-y-4">
          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">Alianzas Estratégicas</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Municipio ↔ Comunidad</span>
                <span class="text-green-600 font-medium">Fuerte</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">ANA ↔ Minera</span>
                <span class="text-yellow-600 font-medium">Moderada</span>
              </div>
            </div>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">Tensiones Identificadas</h4>
            <div class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">Comunidad ↔ Minera</span>
                <span class="text-red-600 font-medium">Alta</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-600">ANA ↔ Comunidad</span>
                <span class="text-orange-600 font-medium">Media</span>
              </div>
            </div>
          </div>

          <div class="border border-gray-200 rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-2">Oportunidades de Mediación</h4>
            <ul class="text-sm text-gray-600 space-y-1">
              <li>• Diálogo tripartito: Comunidad-Minera-ANA</li>
              <li>• Mesa técnica sobre recursos hídricos</li>
              <li>• Comité de monitoreo participativo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Herramientas de Análisis -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Herramientas de Análisis</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button class="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
          <div class="font-medium text-gray-900 mb-2">Análisis de Poder</div>
          <p class="text-sm text-gray-600">Evalúa la distribución de poder entre stakeholders</p>
        </button>
        
        <button class="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left">
          <div class="font-medium text-gray-900 mb-2">Matriz de Coaliciones</div>
          <p class="text-sm text-gray-600">Identifica posibles alianzas y oposiciones</p>
        </button>
        
        <button class="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
          <div class="font-medium text-gray-900 mb-2">Escenarios de Negociación</div>
          <p class="text-sm text-gray-600">Simula diferentes estrategias de aproximación</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const actoresPrincipales = ref([
  {
    id: 1,
    nombre: 'Comunidad Huancavelica',
    descripcion: 'Comunidad campesina afectada por operaciones mineras',
    influencia: 'Alta',
    interes: 'Preservar acceso al agua',
    posicion: 'Oposición a expansión',
    ultimaActualizacion: '2024-01-15'
  },
  {
    id: 2,
    nombre: 'Minera Hochschild',
    descripcion: 'Empresa minera operadora del proyecto',
    influencia: 'Muy Alta',
    interes: 'Continuidad operacional',
    posicion: 'Busca licencia social',
    ultimaActualizacion: '2024-01-14'
  },
  {
    id: 3,
    nombre: 'Autoridad Nacional del Agua (ANA)',
    descripcion: 'Ente regulador de recursos hídricos',
    influencia: 'Alta',
    interes: 'Cumplimiento normativo',
    posicion: 'Neutral regulatorio',
    ultimaActualizacion: '2024-01-13'
  },
  {
    id: 4,
    nombre: 'Municipalidad Distrital',
    descripcion: 'Gobierno local del distrito',
    influencia: 'Media',
    interes: 'Desarrollo local',
    posicion: 'Apoyo condicionado',
    ultimaActualizacion: '2024-01-12'
  }
])

const getInfluenciaClass = (influencia) => {
  const classes = {
    'Muy Alta': 'bg-red-100 text-red-800',
    'Alta': 'bg-orange-100 text-orange-800',
    'Media': 'bg-yellow-100 text-yellow-800',
    'Baja': 'bg-green-100 text-green-800'
  }
  return classes[influencia] || 'bg-gray-100 text-gray-800'
}
</script>