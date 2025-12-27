<template>
  <div v-if="caso" class="space-y-6">
    <!-- Header del caso -->
    <div class="flex justify-between items-start">
      <div>
        <div class="flex items-center space-x-4 mb-2">
          <router-link to="/casos" class="text-orasi-blue hover:text-orasi-dark">
            <ArrowLeft class="w-5 h-5" />
          </router-link>
          <h1 class="text-3xl font-bold text-gray-900">{{ caso.titulo }}</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">{{ caso.id }}</span>
          <span :class="getRiskBadgeClass(caso.nivelRiesgo)">{{ caso.nivelRiesgo }}</span>
          <span :class="getStatusBadgeClass(caso.estado)">{{ caso.estado }}</span>
        </div>
      </div>
      <div class="flex space-x-2">
        <button class="btn-secondary">Editar Caso</button>
        <button class="btn-primary">Ir a PNR</button>
      </div>
    </div>

    <!-- Pestañas -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === tab.id
              ? 'border-orasi-blue text-orasi-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Contenido de las pestañas -->
    <div class="mt-6">
      <!-- Pestaña Resumen -->
      <div v-if="activeTab === 'resumen'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Datos básicos -->
          <div class="lg:col-span-2 card p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Datos Básicos del Caso</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">ID del Caso</label>
                <p class="text-sm text-gray-900">{{ caso.id }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Territorio</label>
                <p class="text-sm text-gray-900">{{ caso.territorio }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Comunidad</label>
                <p class="text-sm text-gray-900">{{ caso.comunidad }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Tipo de Caso</label>
                <p class="text-sm text-gray-900">{{ formatTipoCaso(caso.tipo) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Responsable Frontline</label>
                <p class="text-sm text-gray-900">{{ caso.responsableFrontline }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Fecha de Creación</label>
                <p class="text-sm text-gray-900">{{ formatDate(caso.fechaCreacion) }}</p>
              </div>
            </div>
            <div class="mt-4">
              <label class="block text-sm font-medium text-gray-700">Descripción</label>
              <p class="text-sm text-gray-900 mt-1">{{ caso.descripcion }}</p>
            </div>
          </div>

          <!-- Semáforo de riesgo y acciones rápidas -->
          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Estado del Caso</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Nivel de Riesgo</span>
                  <span :class="getRiskBadgeClass(caso.nivelRiesgo)">{{ caso.nivelRiesgo }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Estado PNR</span>
                  <span :class="getPnrBadgeClass(caso.pnrEstado)">{{ caso.pnrEstado }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-gray-600">Estado AAR</span>
                  <span :class="getAarBadgeClass(caso.aarEstado)">{{ caso.aarEstado }}</span>
                </div>
              </div>
            </div>

            <div class="card p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
              <div class="space-y-2">
                <button @click="activeTab = 'pnr'" class="w-full btn-primary text-left">
                  Ir a PNR
                </button>
                <button @click="activeTab = 'aar'" class="w-full btn-secondary text-left">
                  Ir a AAR
                </button>
                <button @click="activeTab = 'interacciones'" class="w-full btn-secondary text-left">
                  Ver Interacciones
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Compromisos -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Compromisos Vinculados</h3>
          <div v-if="caso.compromisos && caso.compromisos.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compromiso</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsable</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vencimiento</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="compromiso in caso.compromisos" :key="compromiso.id">
                  <td class="px-6 py-4 text-sm text-gray-900">{{ compromiso.descripcion }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ compromiso.tipo }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ compromiso.responsable }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ formatDate(compromiso.fechaVencimiento) }}</td>
                  <td class="px-6 py-4">
                    <span :class="getCompromisoBadgeClass(compromiso.estado)">
                      {{ compromiso.estado }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            No hay compromisos registrados para este caso
          </div>
        </div>
      </div>

      <!-- Pestaña PNR -->
      <div v-if="activeTab === 'pnr'" class="space-y-6">
        <PnrForm :caso="caso" />
      </div>

      <!-- Pestaña AAR -->
      <div v-if="activeTab === 'aar'" class="space-y-6">
        <AarForm :caso="caso" />
      </div>

      <!-- Pestaña Interacciones -->
      <div v-if="activeTab === 'interacciones'" class="space-y-6">
        <InteraccionesList :caso="caso" />
      </div>

      <!-- Pestaña Compromisos -->
      <div v-if="activeTab === 'compromisos'" class="space-y-6">
        <CompromisosList :caso="caso" />
      </div>

      <!-- Pestaña Riesgos -->
      <div v-if="activeTab === 'riesgos'" class="space-y-6">
        <RiesgosList :caso="caso" />
      </div>

      <!-- Pestaña Aprendizajes -->
      <div v-if="activeTab === 'aprendizajes'" class="space-y-6">
        <AprendizajesList :caso="caso" />
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <p class="text-gray-500">Caso no encontrado</p>
    <router-link to="/casos" class="text-orasi-blue hover:text-orasi-dark mt-2 inline-block">
      Volver a la lista de casos
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useCasosStore } from '@/stores/casos'

// Componentes de las pestañas (se crearán después)
import PnrForm from '@/components/casos/PnrForm.vue'
import AarForm from '@/components/casos/AarForm.vue'
import InteraccionesList from '@/components/casos/InteraccionesList.vue'
import CompromisosList from '@/components/casos/CompromisosList.vue'
import RiesgosList from '@/components/casos/RiesgosList.vue'
import AprendizajesList from '@/components/casos/AprendizajesList.vue'

const route = useRoute()
const casosStore = useCasosStore()

const activeTab = ref('resumen')
const caso = computed(() => casosStore.getCasoById(route.params.id))

const tabs = [
  { id: 'resumen', name: 'Resumen' },
  { id: 'pnr', name: 'PNR' },
  { id: 'aar', name: 'AAR' },
  { id: 'interacciones', name: 'Interacciones' },
  { id: 'compromisos', name: 'Compromisos y Acuerdos' },
  { id: 'riesgos', name: 'Riesgos y Precedentes' },
  { id: 'aprendizajes', name: 'Aprendizajes' }
]

const formatTipoCaso = (tipo) => {
  const tipos = {
    'queja': 'Queja',
    'conflicto': 'Conflicto',
    'incidente': 'Incidente',
    'rumor crítico': 'Rumor Crítico',
    'negociación estructurada': 'Negociación Estructurada'
  }
  return tipos[tipo] || tipo
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

const getRiskBadgeClass = (riesgo) => {
  const classes = {
    'Bajo': 'risk-badge-bajo',
    'Medio': 'risk-badge-medio',
    'Alto': 'risk-badge-alto',
    'Crítico': 'risk-badge-critico'
  }
  return classes[riesgo] || 'risk-badge-bajo'
}

const getStatusBadgeClass = (estado) => {
  const classes = {
    'En preparación (PNR en curso)': 'status-badge bg-blue-100 text-blue-800',
    'En negociación': 'status-badge bg-yellow-100 text-yellow-800',
    'En implementación de acuerdos': 'status-badge bg-purple-100 text-purple-800',
    'Cerrado con acuerdo': 'status-badge bg-green-100 text-green-800',
    'Cerrado sin acuerdo': 'status-badge bg-gray-100 text-gray-800',
    'En escalamiento CER': 'status-badge bg-red-100 text-red-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}

const getPnrBadgeClass = (estado) => {
  const classes = {
    'Completo': 'status-badge bg-green-100 text-green-800',
    'Parcial': 'status-badge bg-yellow-100 text-yellow-800',
    'Pendiente': 'status-badge bg-red-100 text-red-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}

const getAarBadgeClass = (estado) => {
  const classes = {
    'No aplica': 'status-badge bg-gray-100 text-gray-800',
    'Simple': 'status-badge bg-blue-100 text-blue-800',
    'Crítico': 'status-badge bg-red-100 text-red-800',
    'Pendiente': 'status-badge bg-yellow-100 text-yellow-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}

const getCompromisoBadgeClass = (estado) => {
  const classes = {
    'planificado': 'status-badge bg-blue-100 text-blue-800',
    'en ejecución': 'status-badge bg-yellow-100 text-yellow-800',
    'cumplido': 'status-badge bg-green-100 text-green-800',
    'en riesgo': 'status-badge bg-orange-100 text-orange-800',
    'vencido': 'status-badge bg-red-100 text-red-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}
</script>