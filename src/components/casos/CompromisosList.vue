<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Compromisos y Acuerdos</h2>
      <div class="flex space-x-2">
        <button @click="showNewCompromisoForm = true" class="btn-secondary">
          <Plus class="w-4 h-4 mr-2" />
          Nuevo Compromiso
        </button>
        <button @click="showNewAcuerdoForm = true" class="btn-primary">
          <Plus class="w-4 h-4 mr-2" />
          Nuevo Acuerdo
        </button>
      </div>
    </div>

    <!-- Formulario nuevo compromiso -->
    <div v-if="showNewCompromisoForm" class="card p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Nuevo Compromiso</h3>
        <button @click="showNewCompromisoForm = false" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <form @submit.prevent="saveCompromiso" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descripción del compromiso *</label>
          <textarea
            v-model="newCompromiso.descripcion"
            class="form-textarea"
            rows="3"
            required
            placeholder="Describir claramente el compromiso adquirido..."
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de compromiso *</label>
            <select v-model="newCompromiso.tipo" required class="form-select">
              <option value="">Seleccionar...</option>
              <option value="social">Social</option>
              <option value="económico">Económico</option>
              <option value="operativo">Operativo</option>
              <option value="informativo">Informativo</option>
              <option value="ambiental">Ambiental</option>
              <option value="infraestructura">Infraestructura</option>
              <option value="capacitación">Capacitación</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Comunidad/Actor beneficiario *</label>
            <input
              v-model="newCompromiso.beneficiario"
              type="text"
              required
              class="form-input"
              placeholder="¿Quién se beneficia de este compromiso?"
            >
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Responsable interno *</label>
            <input
              v-model="newCompromiso.responsable"
              type="text"
              required
              class="form-input"
              placeholder="Persona o área responsable"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
            <select v-model="newCompromiso.estado" required class="form-select">
              <option value="planificado">Planificado</option>
              <option value="en ejecución">En ejecución</option>
              <option value="cumplido">Cumplido</option>
              <option value="en riesgo">En riesgo</option>
              <option value="vencido">Vencido</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de inicio</label>
            <input
              v-model="newCompromiso.fechaInicio"
              type="date"
              class="form-input"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento *</label>
            <input
              v-model="newCompromiso.fechaVencimiento"
              type="date"
              required
              class="form-input"
            >
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Evidencias de cumplimiento</label>
          <textarea
            v-model="newCompromiso.evidencias"
            class="form-textarea"
            rows="2"
            placeholder="Documentos, fotos, reportes que evidencian el cumplimiento..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="showNewCompromisoForm = false" class="btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn-primary">
            Guardar Compromiso
          </button>
        </div>
      </form>
    </div>

    <!-- Formulario nuevo acuerdo -->
    <div v-if="showNewAcuerdoForm" class="card p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Nuevo Acuerdo</h3>
        <button @click="showNewAcuerdoForm = false" class="text-gray-400 hover:text-gray-600">
          <X class="w-5 h-5" />
        </button>
      </div>
      
      <form @submit.prevent="saveAcuerdo" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Descripción del acuerdo *</label>
          <textarea
            v-model="newAcuerdo.descripcion"
            class="form-textarea"
            rows="3"
            required
            placeholder="Describir el acuerdo alcanzado..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Partes que firman o acuerdan *</label>
          <textarea
            v-model="newAcuerdo.partes"
            class="form-textarea"
            rows="2"
            required
            placeholder="Organizaciones, personas o entidades que participan del acuerdo..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Puntos clave del acuerdo</label>
          <textarea
            v-model="newAcuerdo.puntosClave"
            class="form-textarea"
            rows="4"
            placeholder="1. Primer punto clave&#10;2. Segundo punto clave&#10;3. Tercer punto clave..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Vínculo con PNR y AAR</label>
          <textarea
            v-model="newAcuerdo.vinculoPnrAar"
            class="form-textarea"
            rows="2"
            placeholder="¿Cómo se relaciona este acuerdo con el PNR y AAR del caso?"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Riesgos o precedentes asociados</label>
          <textarea
            v-model="newAcuerdo.riesgosPrecedentes"
            class="form-textarea"
            rows="3"
            placeholder="Riesgos que genera este acuerdo, precedentes que establece..."
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <button type="button" @click="showNewAcuerdoForm = false" class="btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn-primary">
            Guardar Acuerdo
          </button>
        </div>
      </form>
    </div>

    <!-- Pestañas para compromisos y acuerdos -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'compromisos'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'compromisos'
              ? 'border-orasi-blue text-orasi-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Compromisos ({{ compromisos.length }})
        </button>
        <button
          @click="activeTab = 'acuerdos'"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm',
            activeTab === 'acuerdos'
              ? 'border-orasi-blue text-orasi-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          Acuerdos ({{ acuerdos.length }})
        </button>
      </nav>
    </div>

    <!-- Lista de compromisos -->
    <div v-if="activeTab === 'compromisos'" class="space-y-4">
      <div v-for="compromiso in compromisos" :key="compromiso.id" class="card p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <span :class="getCompromisoBadgeClass(compromiso.estado)">
                {{ formatEstadoCompromiso(compromiso.estado) }}
              </span>
              <span :class="getTipoBadgeClass(compromiso.tipo)">
                {{ formatTipoCompromiso(compromiso.tipo) }}
              </span>
              <span class="text-sm text-gray-500">
                Vence: {{ formatDate(compromiso.fechaVencimiento) }}
              </span>
            </div>
            <h4 class="text-lg font-medium text-gray-900 mb-2">{{ compromiso.descripcion }}</h4>
            <div class="text-sm text-gray-600">
              <p><strong>Beneficiario:</strong> {{ compromiso.beneficiario }}</p>
              <p><strong>Responsable:</strong> {{ compromiso.responsable }}</p>
            </div>
          </div>
          <div class="flex space-x-2">
            <button class="text-orasi-blue hover:text-orasi-dark text-sm">Editar</button>
            <button class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
          </div>
        </div>

        <div v-if="compromiso.evidencias" class="mt-4 p-3 bg-gray-50 rounded-md">
          <h5 class="text-sm font-medium text-gray-700 mb-1">Evidencias de Cumplimiento</h5>
          <p class="text-sm text-gray-900">{{ compromiso.evidencias }}</p>
        </div>
      </div>

      <div v-if="compromisos.length === 0" class="text-center py-12">
        <FileText class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 mb-4">No hay compromisos registrados para este caso</p>
        <button @click="showNewCompromisoForm = true" class="btn-primary">
          Registrar Primer Compromiso
        </button>
      </div>
    </div>

    <!-- Lista de acuerdos -->
    <div v-if="activeTab === 'acuerdos'" class="space-y-4">
      <div v-for="acuerdo in acuerdos" :key="acuerdo.id" class="card p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h4 class="text-lg font-medium text-gray-900 mb-2">{{ acuerdo.descripcion }}</h4>
            <p class="text-sm text-gray-600 mb-2">
              <strong>Partes:</strong> {{ acuerdo.partes }}
            </p>
          </div>
          <div class="flex space-x-2">
            <button class="text-orasi-blue hover:text-orasi-dark text-sm">Editar</button>
            <button class="text-red-600 hover:text-red-800 text-sm">Eliminar</button>
          </div>
        </div>

        <div v-if="acuerdo.puntosClave" class="mb-4">
          <h5 class="text-sm font-medium text-gray-700 mb-2">Puntos Clave</h5>
          <div class="text-sm text-gray-900 whitespace-pre-line">{{ acuerdo.puntosClave }}</div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div v-if="acuerdo.vinculoPnrAar">
            <h5 class="text-sm font-medium text-gray-700 mb-1">Vínculo con PNR/AAR</h5>
            <p class="text-sm text-gray-900">{{ acuerdo.vinculoPnrAar }}</p>
          </div>
          <div v-if="acuerdo.riesgosPrecedentes">
            <h5 class="text-sm font-medium text-gray-700 mb-1">Riesgos y Precedentes</h5>
            <div class="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p class="text-sm text-yellow-800">{{ acuerdo.riesgosPrecedentes }}</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="acuerdos.length === 0" class="text-center py-12">
        <FileText class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 mb-4">No hay acuerdos registrados para este caso</p>
        <button @click="showNewAcuerdoForm = true" class="btn-primary">
          Registrar Primer Acuerdo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Plus, X, FileText } from 'lucide-vue-next'

const props = defineProps({
  caso: {
    type: Object,
    required: true
  }
})

const activeTab = ref('compromisos')
const showNewCompromisoForm = ref(false)
const showNewAcuerdoForm = ref(false)

// Datos mock
const compromisos = ref([
  {
    id: 'COMP-001',
    descripcion: 'Instalación de sistema de agua alternativo',
    tipo: 'operativo',
    beneficiario: 'Comunidad El Roble',
    responsable: 'Departamento Técnico',
    estado: 'en ejecución',
    fechaInicio: '2024-01-15',
    fechaVencimiento: '2024-02-15',
    evidencias: 'Contrato firmado con proveedor, inicio de obras programado para el 25 de enero'
  }
])

const acuerdos = ref([
  {
    id: 'ACU-001',
    descripcion: 'Acuerdo de acceso temporal al agua durante operaciones',
    partes: 'Comunidad El Roble, Empresa Minera, Alcaldía Municipal',
    puntosClave: '1. Garantizar acceso mínimo de 50 litros por persona por día\n2. Instalación de sistema alternativo en 30 días\n3. Monitoreo conjunto de calidad del agua\n4. Compensación por molestias durante instalación',
    vinculoPnrAar: 'Este acuerdo surge del PNR donde se identificó el acceso al agua como interés compartido',
    riesgosPrecedentes: 'Establece precedente de compensación por restricciones temporales de servicios'
  }
])

const newCompromiso = reactive({
  descripcion: '',
  tipo: '',
  beneficiario: '',
  responsable: '',
  estado: 'planificado',
  fechaInicio: '',
  fechaVencimiento: '',
  evidencias: ''
})

const newAcuerdo = reactive({
  descripcion: '',
  partes: '',
  puntosClave: '',
  vinculoPnrAar: '',
  riesgosPrecedentes: ''
})

const formatEstadoCompromiso = (estado) => {
  const estados = {
    'planificado': 'Planificado',
    'en ejecución': 'En Ejecución',
    'cumplido': 'Cumplido',
    'en riesgo': 'En Riesgo',
    'vencido': 'Vencido'
  }
  return estados[estado] || estado
}

const formatTipoCompromiso = (tipo) => {
  const tipos = {
    'social': 'Social',
    'económico': 'Económico',
    'operativo': 'Operativo',
    'informativo': 'Informativo',
    'ambiental': 'Ambiental',
    'infraestructura': 'Infraestructura',
    'capacitación': 'Capacitación'
  }
  return tipos[tipo] || tipo
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

const getTipoBadgeClass = (tipo) => {
  return 'status-badge bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-ES')
}

const saveCompromiso = () => {
  if (!newCompromiso.descripcion || !newCompromiso.tipo || !newCompromiso.beneficiario || !newCompromiso.responsable || !newCompromiso.fechaVencimiento) {
    alert('Por favor complete todos los campos obligatorios')
    return
  }

  const nuevoCompromiso = {
    id: `COMP-${String(compromisos.value.length + 1).padStart(3, '0')}`,
    ...newCompromiso
  }

  compromisos.value.push(nuevoCompromiso)

  // Limpiar formulario
  Object.keys(newCompromiso).forEach(key => {
    if (key === 'estado') {
      newCompromiso[key] = 'planificado'
    } else {
      newCompromiso[key] = ''
    }
  })

  showNewCompromisoForm.value = false
  alert('Compromiso guardado exitosamente')
}

const saveAcuerdo = () => {
  if (!newAcuerdo.descripcion || !newAcuerdo.partes) {
    alert('Por favor complete todos los campos obligatorios')
    return
  }

  const nuevoAcuerdo = {
    id: `ACU-${String(acuerdos.value.length + 1).padStart(3, '0')}`,
    ...newAcuerdo
  }

  acuerdos.value.push(nuevoAcuerdo)

  // Limpiar formulario
  Object.keys(newAcuerdo).forEach(key => {
    newAcuerdo[key] = ''
  })

  showNewAcuerdoForm.value = false
  alert('Acuerdo guardado exitosamente')
}
</script>