<template>
  <div class="space-y-6">
    <!-- Header AAR -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">After Action Review (AAR)</h2>
      <div class="flex space-x-2">
        <span :class="getAarStatusBadge(aarData.estado)">{{ aarData.estado }}</span>
        <button class="btn-primary" @click="saveAar">Guardar AAR</button>
      </div>
    </div>

    <!-- Selección de tipo de AAR -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Tipo de AAR</h3>
      <div class="space-y-3">
        <div class="flex items-center">
          <input
            id="aar-simple"
            v-model="aarData.tipo"
            type="radio"
            value="Simple"
            class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
          >
          <label for="aar-simple" class="ml-3 block text-sm font-medium text-gray-700">
            AAR Simple
          </label>
        </div>
        <div class="flex items-center">
          <input
            id="aar-critico"
            v-model="aarData.tipo"
            type="radio"
            value="Crítico"
            class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
          >
          <label for="aar-critico" class="ml-3 block text-sm font-medium text-gray-700">
            AAR Crítico
          </label>
        </div>
      </div>
    </div>

    <form @submit.prevent="saveAar" class="space-y-8">
      <!-- Preguntas básicas del AAR -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Preguntas Básicas del AAR</h3>
        <div class="space-y-6">
          <!-- 1. ¿Qué intentábamos hacer? -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              1. ¿Qué intentábamos hacer? *
            </label>
            <textarea
              v-model="aarData.queIntentabamos"
              class="form-textarea"
              rows="4"
              required
              placeholder="Describir el objetivo del PNR, criterios, límites, actores y diseño negociador previsto..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Incluir: objetivo del PNR, criterios establecidos, límites definidos, actores identificados, diseño negociador previsto
            </p>
          </div>

          <!-- 2. ¿Qué ocurrió realmente? -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              2. ¿Qué ocurrió realmente? *
            </label>
            <textarea
              v-model="aarData.queOcurrio"
              class="form-textarea"
              rows="4"
              required
              placeholder="Registrar hechos concretos, comportamiento observado, cambios de narrativa y resultados inesperados..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Incluir: hechos concretos, comportamientos observados, cambios de narrativa, resultados inesperados
            </p>
          </div>

          <!-- 3. ¿Por qué ocurrió así? -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              3. ¿Por qué ocurrió así? *
            </label>
            <textarea
              v-model="aarData.porqueOcurrio"
              class="form-textarea"
              rows="4"
              required
              placeholder="Analizar causas reales, errores de diseño, fallas de coordinación, factores emocionales e identitarios, precedentes ignorados..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Incluir: causas reales, errores de diseño, fallas de coordinación, factores emocionales e identitarios, precedentes ignorados
            </p>
          </div>

          <!-- 4. ¿Qué haremos diferente la próxima vez? -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              4. ¿Qué haremos diferente la próxima vez? *
            </label>
            <textarea
              v-model="aarData.queDiferente"
              class="form-textarea"
              rows="4"
              required
              placeholder="Definir acciones futuras, ajustes al PNR, cambios de roles, criterios y mensajes clave..."
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
              Incluir: acciones futuras, ajustes al PNR, cambios de roles, criterios y mensajes clave
            </p>
          </div>
        </div>
      </div>

      <!-- Precedentes y Riesgos -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Precedentes y Riesgos Identificados</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué precedentes se activaron o se evitaron?
            </label>
            <textarea
              v-model="aarData.precedentes"
              class="form-textarea"
              rows="3"
              placeholder="Precedentes que se activaron, reforzaron o logramos evitar..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Riesgos derivados de lo ocurrido
            </label>
            <textarea
              v-model="aarData.riesgos"
              class="form-textarea"
              rows="3"
              placeholder="Riesgos sociales, reputacionales, operativos o políticos derivados..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Acciones Correctivas -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Acciones Correctivas y Responsables</h3>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700">
                Lista de acciones concretas
              </label>
              <button
                type="button"
                @click="addAccion"
                class="text-orasi-blue hover:text-orasi-dark text-sm"
              >
                + Agregar acción
              </button>
            </div>
            <div v-for="(accion, index) in aarData.acciones" :key="index" class="border border-gray-200 rounded-lg p-4 mb-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-2">
                  <label class="block text-xs font-medium text-gray-600 mb-1">Descripción de la acción</label>
                  <textarea
                    v-model="accion.descripcion"
                    class="form-textarea text-sm"
                    rows="2"
                    placeholder="Describir la acción correctiva..."
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-600 mb-1">Responsable</label>
                  <input
                    v-model="accion.responsable"
                    type="text"
                    class="form-input text-sm"
                    placeholder="Nombre del responsable"
                  >
                  <label class="block text-xs font-medium text-gray-600 mb-1 mt-2">Plazo</label>
                  <input
                    v-model="accion.plazo"
                    type="date"
                    class="form-input text-sm"
                  >
                </div>
              </div>
              <div class="mt-2 flex justify-end">
                <button
                  type="button"
                  @click="removeAccion(index)"
                  class="text-red-600 hover:text-red-800 text-xs"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Campos adicionales para AAR Crítico -->
      <div v-if="aarData.tipo === 'Crítico'" class="space-y-6">
        <!-- Actualización de mapa de actores -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Información Adicional - AAR Crítico</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Actualización del mapa de actores
              </label>
              <textarea
                v-model="aarData.actualizacionActores"
                class="form-textarea"
                rows="3"
                placeholder="Nuevos actores identificados, cambios en influencia, nuevas alianzas..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Rumorología y riesgos de movilización
              </label>
              <textarea
                v-model="aarData.rumorologia"
                class="form-textarea"
                rows="3"
                placeholder="Rumores detectados, riesgos de movilización, narrativas emergentes..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ¿Requiere intervención del CER?
              </label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="cer-si"
                    v-model="aarData.requiereCer"
                    type="radio"
                    value="Sí"
                    class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
                  >
                  <label for="cer-si" class="ml-3 block text-sm text-gray-700">Sí</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="cer-no"
                    v-model="aarData.requiereCer"
                    type="radio"
                    value="No"
                    class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
                  >
                  <label for="cer-no" class="ml-3 block text-sm text-gray-700">No</label>
                </div>
              </div>
              <div v-if="aarData.requiereCer === 'Sí'" class="mt-2">
                <textarea
                  v-model="aarData.justificacionCer"
                  class="form-textarea"
                  rows="2"
                  placeholder="Justificación para la intervención del CER..."
                ></textarea>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                ¿Se usará este caso para entrenamiento (NCC)?
              </label>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input
                    id="entrenamiento-si"
                    v-model="aarData.paraEntrenamiento"
                    type="radio"
                    value="Sí"
                    class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
                  >
                  <label for="entrenamiento-si" class="ml-3 block text-sm text-gray-700">Sí</label>
                </div>
                <div class="flex items-center">
                  <input
                    id="entrenamiento-no"
                    v-model="aarData.paraEntrenamiento"
                    type="radio"
                    value="No"
                    class="h-4 w-4 text-orasi-blue focus:ring-orasi-blue border-gray-300"
                  >
                  <label for="entrenamiento-no" class="ml-3 block text-sm text-gray-700">No</label>
                </div>
              </div>
              <div v-if="aarData.paraEntrenamiento === 'Sí'" class="mt-2">
                <input
                  v-model="aarData.programaEntrenamiento"
                  type="text"
                  class="form-input"
                  placeholder="¿A qué programa o módulo NCC se asocia?"
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end space-x-4">
        <button type="button" class="btn-secondary">Guardar como Borrador</button>
        <button type="submit" class="btn-primary">
          Completar AAR {{ aarData.tipo }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  caso: {
    type: Object,
    required: true
  }
})

const aarData = reactive({
  tipo: 'Simple',
  estado: 'Pendiente',
  queIntentabamos: '',
  queOcurrio: '',
  porqueOcurrio: '',
  queDiferente: '',
  precedentes: '',
  riesgos: '',
  acciones: [
    {
      descripcion: '',
      responsable: '',
      plazo: ''
    }
  ],
  // Campos adicionales para AAR Crítico
  actualizacionActores: '',
  rumorologia: '',
  requiereCer: '',
  justificacionCer: '',
  paraEntrenamiento: '',
  programaEntrenamiento: ''
})

const getAarStatusBadge = (estado) => {
  const classes = {
    'Pendiente': 'status-badge bg-yellow-100 text-yellow-800',
    'En elaboración': 'status-badge bg-blue-100 text-blue-800',
    'Simple': 'status-badge bg-green-100 text-green-800',
    'Crítico': 'status-badge bg-red-100 text-red-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}

const addAccion = () => {
  aarData.acciones.push({
    descripcion: '',
    responsable: '',
    plazo: ''
  })
}

const removeAccion = (index) => {
  if (aarData.acciones.length > 1) {
    aarData.acciones.splice(index, 1)
  }
}

const saveAar = () => {
  // Validar campos obligatorios
  const requiredFields = [
    aarData.queIntentabamos,
    aarData.queOcurrio,
    aarData.porqueOcurrio,
    aarData.queDiferente
  ]

  if (requiredFields.some(field => !field.trim())) {
    alert('Por favor complete todas las preguntas básicas del AAR marcadas con *')
    return
  }

  aarData.estado = aarData.tipo
  alert(`AAR ${aarData.tipo} guardado exitosamente`)
}
</script>