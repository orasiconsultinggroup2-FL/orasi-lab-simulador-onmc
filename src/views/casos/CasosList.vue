<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Casos y Conflictos</h1>
      <button class="btn-primary">
        <Plus class="w-4 h-4 mr-2" />
        Nuevo Caso
      </button>
    </div>

    <!-- Filtros -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Filtros</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Territorio</label>
          <select v-model="filtros.territorio" class="form-select">
            <option value="">Todos</option>
            <option value="Región Norte">Región Norte</option>
            <option value="Región Sur">Región Sur</option>
            <option value="Región Este">Región Este</option>
            <option value="Región Oeste">Región Oeste</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Nivel de Riesgo</label>
          <select v-model="filtros.nivelRiesgo" class="form-select">
            <option value="">Todos</option>
            <option value="Bajo">Bajo</option>
            <option value="Medio">Medio</option>
            <option value="Alto">Alto</option>
            <option value="Crítico">Crítico</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Estado</label>
          <select v-model="filtros.estado" class="form-select">
            <option value="">Todos</option>
            <option value="En preparación (PNR en curso)">En preparación</option>
            <option value="En negociación">En negociación</option>
            <option value="En implementación de acuerdos">En implementación</option>
            <option value="Cerrado con acuerdo">Cerrado con acuerdo</option>
            <option value="Cerrado sin acuerdo">Cerrado sin acuerdo</option>
            <option value="En escalamiento CER">En escalamiento CER</option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="clearFiltros" class="btn-secondary w-full">
            Limpiar Filtros
          </button>
        </div>
      </div>
    </div>

    <!-- Lista de casos -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / Título</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Territorio</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Riesgo</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responsable</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PNR</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AAR</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="caso in casosFiltrados" :key="caso.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ caso.titulo }}</div>
                  <div class="text-sm text-gray-500">{{ caso.id }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ caso.territorio }}</div>
                <div class="text-sm text-gray-500">{{ caso.comunidad }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatTipoCaso(caso.tipo) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getRiskBadgeClass(caso.nivelRiesgo)">
                  {{ caso.nivelRiesgo }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusBadgeClass(caso.estado)">
                  {{ caso.estado }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ caso.responsableFrontline }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getPnrBadgeClass(caso.pnrEstado)">
                  {{ caso.pnrEstado }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getAarBadgeClass(caso.aarEstado)">
                  {{ caso.aarEstado }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link
                  :to="`/casos/${caso.id}`"
                  class="text-orasi-blue hover:text-orasi-dark mr-4"
                >
                  Gestionar caso
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { Plus } from 'lucide-vue-next'
import { useCasosStore } from '@/stores/casos'

const casosStore = useCasosStore()

const filtros = computed({
  get: () => casosStore.filtros,
  set: (value) => casosStore.updateFiltros(value)
})

const casosFiltrados = computed(() => casosStore.casosFiltrados)

const clearFiltros = () => {
  casosStore.clearFiltros()
}

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
</script>