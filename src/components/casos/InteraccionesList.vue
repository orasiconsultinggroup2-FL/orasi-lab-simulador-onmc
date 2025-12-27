<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Interacciones</h2>
      <button @click="showNewInteractionForm = true" class="btn-primary">
        <Plus class="w-4 h-4 mr-2" />
        Nueva Interacción
      </button>
    </div>

    <!-- Formulario nueva interacción -->
    <div v-if="showNewInteractionForm" class="card p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Nueva Interacción</h3>
        <button @click="showNewInteractionForm = false" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <form @submit.prevent="saveInteraction" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha y hora *</label>
            <input
              v-model="newInteraction.fechaHora"
              type="datetime-local"
              required
              class="form-input"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de interacción *</label>
            <select v-model="newInteraction.tipo" required class="form-select">
              <option value="">Seleccionar...</option>
              <option value="reunión">Reunión</option>
              <option value="llamada">Llamada telefónica</option>
              <option value="visita">Visita de campo</option>
              <option value="asamblea">Asamblea comunitaria</option>
              <option value="taller">Taller/Capacitación</option>
              <option value="correo">Correo electrónico</option>
              <option value="whatsapp">WhatsApp/Mensaje</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Participantes *</label>
          <textarea
            v-model="newInteraction.participantes"
            class="form-textarea"
            rows="2"
            required
            placeholder="Nombres y organizaciones de los participantes..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Objetivo de la interacción</label>
          <input
            v-model="newInteraction.objetivo"
            type="text"
            class="form-input"
            placeholder="¿Cuál era el propósito de esta interacción?"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Resumen de lo discutido *</label>
          <textarea
            v-model="newInteraction.resumen"
            class="form-textarea"
            rows="4"
            required
            placeholder="Puntos principales discutidos, decisiones tomadas, información intercambiada..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Compromisos verbales mencionados</label>
          <textarea
            v-model="newInteraction.compromisosVerbales"
            class="form-textarea"
            rows="3"
            placeholder="Compromisos mencionados durante la interacción (que luego deben formalizarse)..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Riesgos o señales detectadas</label>
          <textarea
            v-model="newInteraction.riesgosDetectados"
            class="form-textarea"
            rows="3"
            placeholder="Señales de alerta, cambios de actitud, nuevos riesgos identificados..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Observaciones adicionales</label>
          <textarea
            v-model="newInteraction.observaciones"
            class="form-textarea"
            rows="2"
            placeholder="Cualquier información adicional relevante..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="showNewInteractionForm = false" class="btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn-primary">
            Guardar Interacción
          </button>
        </div>
      </form>
    </div>

    <!-- Lista de interacciones -->
    <div class="space-y-4">
      <div v-for="interaccion in interacciones" :key="interaccion.id" class="card p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {{ formatTipoInteraccion(interaccion.tipo) }}
              </span>
              <span class="text-sm text-gray-500">
                {{ formatDateTime(interaccion.fechaHora) }}
              </span>
            </div>
            <h4 class="text-lg font-medium text-gray-900">{{ interaccion.objetivo || 'Sin objetivo específico' }}</h4>
          </div>
          <div class="flex space-x-2">
            <button class="text-orasi-blue hover:text-orasi-dark text-sm">
              Editar
            </button>
            <button class="text-red-600 hover:text-red-800 text-sm">
              Eliminar
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h5 class="text-sm font-medium text-gray-700 mb-2">Participantes</h5>
            <p class="text-sm text-gray-900 mb-4">{{ interaccion.participantes }}</p>

            <h5 class="text-sm font-medium text-gray-700 mb-2">Resumen</h5>
            <p class="text-sm text-gray-900">{{ interaccion.resumen }}</p>
          </div>

          <div class="space-y-4">
            <div v-if="interaccion.compromisosVerbales">
              <h5 class="text-sm font-medium text-gray-700 mb-2">Compromisos Verbales</h5>
              <p class="text-sm text-gray-900">{{ interaccion.compromisosVerbales }}</p>
            </div>

            <div v-if="interaccion.riesgosDetectados">
              <h5 class="text-sm font-medium text-gray-700 mb-2">Riesgos Detectados</h5>
              <div class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
                <p class="text-sm text-yellow-800">{{ interaccion.riesgosDetectados }}</p>
              </div>
            </div>

            <div v-if="interaccion.observaciones">
              <h5 class="text-sm font-medium text-gray-700 mb-2">Observaciones</h5>
              <p class="text-sm text-gray-900">{{ interaccion.observaciones }}</p>
            </div>
          </div>
        </div>

        <!-- Archivos adjuntos (placeholder) -->
        <div v-if="interaccion.archivos && interaccion.archivos.length > 0" class="mt-4 pt-4 border-t border-gray-200">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Archivos Adjuntos</h5>
          <div class="flex space-x-2">
            <span v-for="archivo in interaccion.archivos" :key="archivo" class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
              <Paperclip class="w-3 h-3 mr-1" />
              {{ archivo }}
            </span>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-if="interacciones.length === 0" class="text-center py-12">
        <Users class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 mb-4">No hay interacciones registradas para este caso</p>
        <button @click="showNewInteractionForm = true" class="btn-primary">
          Registrar Primera Interacción
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus, X, Users, Paperclip } from 'lucide-vue-next'

const props = defineProps({
  caso: {
    type: Object,
    required: true
  }
})

const showNewInteractionForm = ref(false)

// Datos mock de interacciones
const interacciones = ref([
  {
    id: 'INT-001',
    fechaHora: '2024-01-20T10:00',
    tipo: 'reunión',
    participantes: 'Líder comunitario Juan Pérez, Alcalde Municipal, Representante empresa',
    objetivo: 'Discutir alternativas para el acceso al agua',
    resumen: 'Se presentaron tres alternativas para garantizar el acceso al agua durante las operaciones. La comunidad mostró preferencia por la opción de sistema de bombeo alternativo.',
    compromisosVerbales: 'La empresa se comprometió a presentar estudio técnico en 15 días',
    riesgosDetectados: 'Se detectó resistencia de algunos miembros de la comunidad que no participaron en la reunión',
    observaciones: 'Ambiente cordial, buena disposición al diálogo',
    archivos: ['acta_reunion_20240120.pdf', 'propuesta_tecnica.docx']
  }
])

const newInteraction = reactive({
  fechaHora: '',
  tipo: '',
  participantes: '',
  objetivo: '',
  resumen: '',
  compromisosVerbales: '',
  riesgosDetectados: '',
  observaciones: ''
})

const formatTipoInteraccion = (tipo) => {
  const tipos = {
    'reunión': 'Reunión',
    'llamada': 'Llamada',
    'visita': 'Visita',
    'asamblea': 'Asamblea',
    'taller': 'Taller',
    'correo': 'Correo',
    'whatsapp': 'WhatsApp',
    'otro': 'Otro'
  }
  return tipos[tipo] || tipo
}

const formatDateTime = (dateTime) => {
  return new Date(dateTime).toLocaleString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const saveInteraction = () => {
  // Validar campos requeridos
  if (!newInteraction.fechaHora || !newInteraction.tipo || !newInteraction.participantes || !newInteraction.resumen) {
    alert('Por favor complete todos los campos obligatorios')
    return
  }

  // Agregar nueva interacción
  const nuevaInteraccion = {
    id: `INT-${String(interacciones.value.length + 1).padStart(3, '0')}`,
    ...newInteraction
  }

  interacciones.value.unshift(nuevaInteraccion)

  // Limpiar formulario
  Object.keys(newInteraction).forEach(key => {
    newInteraction[key] = ''
  })

  showNewInteractionForm.value = false
  alert('Interacción guardada exitosamente')
}
</script>