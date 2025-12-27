<template>
  <div class="space-y-6">
    <!-- Header PNR -->
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Preparación para Negociar (PNR)</h2>
      <div class="flex space-x-2">
        <span :class="getPnrStatusBadge(pnrData.estado)">{{ pnrData.estado }}</span>
        <button class="btn-primary">Guardar PNR</button>
      </div>
    </div>

    <form @submit.prevent="savePnr" class="space-y-8">
      <!-- 1. Propósito de la reunión/negociación -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">1. Propósito de la Reunión/Negociación</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué buscamos lograr en esta reunión/negociación? *
            </label>
            <textarea
              v-model="pnrData.proposito.objetivo"
              class="form-textarea"
              rows="3"
              required
              placeholder="Describir el objetivo principal de la negociación..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué NO vamos a hacer?
            </label>
            <textarea
              v-model="pnrData.proposito.noHaremos"
              class="form-textarea"
              rows="2"
              placeholder="Límites y restricciones claras..."
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Decisiones dentro del mandato
              </label>
              <textarea
                v-model="pnrData.proposito.dentroMandato"
                class="form-textarea"
                rows="3"
                placeholder="Qué decisiones podemos tomar..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Decisiones fuera del mandato
              </label>
              <textarea
                v-model="pnrData.proposito.fueraMandato"
                class="form-textarea"
                rows="3"
                placeholder="Qué decisiones NO podemos tomar..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. Análisis de Actores -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">2. Análisis de Actores</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Quiénes participarán en la reunión? *
            </label>
            <textarea
              v-model="pnrData.actores.participantes"
              class="form-textarea"
              rows="3"
              required
              placeholder="Personas y organizaciones que participarán..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Intereses, preocupaciones y temores principales
            </label>
            <textarea
              v-model="pnrData.actores.interesesPreocupaciones"
              class="form-textarea"
              rows="3"
              placeholder="¿Qué les preocupa? ¿Qué temen? ¿Qué buscan?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Expectativas históricas
            </label>
            <textarea
              v-model="pnrData.actores.expectativasHistoricas"
              class="form-textarea"
              rows="2"
              placeholder="Basado en experiencias anteriores..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Poder de movilización e influencia
            </label>
            <textarea
              v-model="pnrData.actores.poderMovilizacion"
              class="form-textarea"
              rows="2"
              placeholder="Capacidad de influir en otros actores..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 3. Intereses -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">3. Intereses</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nuestros intereses (por prioridad) *
            </label>
            <textarea
              v-model="pnrData.intereses.nuestros"
              class="form-textarea"
              rows="4"
              required
              placeholder="1. Interés más importante&#10;2. Segundo interés&#10;3. Tercer interés..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Intereses de la otra parte (estimados)
            </label>
            <textarea
              v-model="pnrData.intereses.otraParte"
              class="form-textarea"
              rows="4"
              placeholder="¿Qué creemos que buscan?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Intereses compartidos identificados
            </label>
            <textarea
              v-model="pnrData.intereses.compartidos"
              class="form-textarea"
              rows="3"
              placeholder="Puntos en común que podemos aprovechar..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Intereses mínimos que debemos proteger *
            </label>
            <textarea
              v-model="pnrData.intereses.minimos"
              class="form-textarea"
              rows="3"
              required
              placeholder="Líneas rojas que no podemos cruzar..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 4. Alternativas y MAAN -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">4. Alternativas y MAAN (BATNA)</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nuestras alternativas si no hay acuerdo (MAAN) *
            </label>
            <textarea
              v-model="pnrData.alternativas.nuestroMaan"
              class="form-textarea"
              rows="3"
              required
              placeholder="¿Qué haremos si no llegamos a un acuerdo?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Alternativas que probablemente tiene la otra parte
            </label>
            <textarea
              v-model="pnrData.alternativas.otraParteMaan"
              class="form-textarea"
              rows="3"
              placeholder="¿Qué opciones tienen ellos?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué pasaría si no se llega a ningún acuerdo?
            </label>
            <textarea
              v-model="pnrData.alternativas.sinAcuerdo"
              class="form-textarea"
              rows="3"
              placeholder="Consecuencias para todas las partes..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 5. Opciones Creativas -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">5. Opciones Creativas</h3>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Lista de opciones/paquetes posibles
          </label>
          <textarea
            v-model="pnrData.opciones.lista"
            class="form-textarea"
            rows="5"
            placeholder="Opción 1: Descripción&#10;Opción 2: Descripción&#10;Opción 3: Descripción..."
          ></textarea>
          <p class="text-xs text-gray-500 mt-1">
            Incluir opciones que puedan satisfacer intereses de ambas partes
          </p>
        </div>
      </div>

      <!-- 6. Criterios de Legitimidad -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">6. Criterios de Legitimidad</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Criterios objetivos para evaluar opciones
            </label>
            <textarea
              v-model="pnrData.legitimidad.criterios"
              class="form-textarea"
              rows="3"
              placeholder="Normas, evidencias técnicas, estándares, acuerdos anteriores..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fuentes de legitimidad
            </label>
            <textarea
              v-model="pnrData.legitimidad.fuentes"
              class="form-textarea"
              rows="2"
              placeholder="Documentos, normas, peritajes que respaldan nuestra posición..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 7. Comunicación y Mensaje -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">7. Comunicación y Mensaje</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué queremos preguntar en la reunión?
            </label>
            <textarea
              v-model="pnrData.comunicacion.preguntas"
              class="form-textarea"
              rows="3"
              placeholder="Preguntas clave para entender mejor sus intereses..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Mensaje que queremos transmitir
            </label>
            <textarea
              v-model="pnrData.comunicacion.mensaje"
              class="form-textarea"
              rows="3"
              placeholder="Mensaje principal y puntos clave..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Temas a evitar o manejar con cuidado
            </label>
            <textarea
              v-model="pnrData.comunicacion.temasEvitar"
              class="form-textarea"
              rows="2"
              placeholder="Temas sensibles que requieren manejo especial..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Voceros propuestos y estilo de comunicación
            </label>
            <textarea
              v-model="pnrData.comunicacion.voceros"
              class="form-textarea"
              rows="2"
              placeholder="Quién hablará y cómo..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 8. Relación -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">8. Relación</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Estado actual de la relación
              </label>
              <select v-model="pnrData.relacion.estadoActual" class="form-select">
                <option value="">Seleccionar...</option>
                <option value="Muy buena">Muy buena</option>
                <option value="Buena">Buena</option>
                <option value="Regular">Regular</option>
                <option value="Tensa">Tensa</option>
                <option value="Muy tensa">Muy tensa</option>
                <option value="Conflictiva">Conflictiva</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Estado deseado
              </label>
              <select v-model="pnrData.relacion.estadoDeseado" class="form-select">
                <option value="">Seleccionar...</option>
                <option value="Muy buena">Muy buena</option>
                <option value="Buena">Buena</option>
                <option value="Regular">Regular</option>
                <option value="Colaborativa">Colaborativa</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué haremos para mejorar o proteger la relación?
            </label>
            <textarea
              v-model="pnrData.relacion.acciones"
              class="form-textarea"
              rows="3"
              placeholder="Acciones específicas durante la reunión..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 9. Riesgos y Precedentes -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">9. Riesgos y Precedentes</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Riesgos asociados a esta negociación
            </label>
            <textarea
              v-model="pnrData.riesgos.riesgosAsociados"
              class="form-textarea"
              rows="3"
              placeholder="Riesgos sociales, operativos, reputacionales..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Precedentes históricos relevantes
            </label>
            <textarea
              v-model="pnrData.riesgos.precedentes"
              class="form-textarea"
              rows="3"
              placeholder="Acuerdos pasados, compensaciones, conflictos anteriores..."
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Precedentes que queremos evitar crear o reforzar
            </label>
            <textarea
              v-model="pnrData.riesgos.precedentesEvitar"
              class="form-textarea"
              rows="3"
              placeholder="¿Qué precedentes NO queremos establecer?"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- 10. Plan de Reunión y Seguimiento -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">10. Plan de Reunión y Seguimiento</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Agenda propuesta
            </label>
            <textarea
              v-model="pnrData.plan.agenda"
              class="form-textarea"
              rows="4"
              placeholder="1. Apertura y presentaciones&#10;2. Revisión de objetivos&#10;3. Discusión de opciones&#10;4. Acuerdos y próximos pasos"
            ></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Escenario ideal de resultado
              </label>
              <textarea
                v-model="pnrData.plan.escenarioIdeal"
                class="form-textarea"
                rows="3"
                placeholder="El mejor resultado posible..."
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Escenario mínimo aceptable
              </label>
              <textarea
                v-model="pnrData.plan.escenarioMinimo"
                class="form-textarea"
                rows="3"
                placeholder="El resultado mínimo que aceptaríamos..."
              ></textarea>
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Próximos pasos después de la reunión
            </label>
            <textarea
              v-model="pnrData.plan.proximosPasos"
              class="form-textarea"
              rows="2"
              placeholder="¿Qué haremos después de la reunión?"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Cómo se registrará en el CRM
            </label>
            <textarea
              v-model="pnrData.plan.registroCrm"
              class="form-textarea"
              rows="2"
              placeholder="Interacciones, AAR, compromisos a registrar..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-end space-x-4">
        <button type="button" class="btn-secondary">Guardar como Borrador</button>
        <button type="submit" class="btn-primary">Marcar PNR como Completo</button>
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

const pnrData = reactive({
  estado: 'En elaboración',
  proposito: {
    objetivo: '',
    noHaremos: '',
    dentroMandato: '',
    fueraMandato: ''
  },
  actores: {
    participantes: '',
    interesesPreocupaciones: '',
    expectativasHistoricas: '',
    poderMovilizacion: ''
  },
  intereses: {
    nuestros: '',
    otraParte: '',
    compartidos: '',
    minimos: ''
  },
  alternativas: {
    nuestroMaan: '',
    otraParteMaan: '',
    sinAcuerdo: ''
  },
  opciones: {
    lista: ''
  },
  legitimidad: {
    criterios: '',
    fuentes: ''
  },
  comunicacion: {
    preguntas: '',
    mensaje: '',
    temasEvitar: '',
    voceros: ''
  },
  relacion: {
    estadoActual: '',
    estadoDeseado: '',
    acciones: ''
  },
  riesgos: {
    riesgosAsociados: '',
    precedentes: '',
    precedentesEvitar: ''
  },
  plan: {
    agenda: '',
    escenarioIdeal: '',
    escenarioMinimo: '',
    proximosPasos: '',
    registroCrm: ''
  }
})

const getPnrStatusBadge = (estado) => {
  const classes = {
    'PNR pendiente': 'status-badge bg-red-100 text-red-800',
    'En elaboración': 'status-badge bg-yellow-100 text-yellow-800',
    'PNR completo': 'status-badge bg-green-100 text-green-800'
  }
  return classes[estado] || 'status-badge bg-gray-100 text-gray-800'
}

const savePnr = () => {
  // Validar campos obligatorios
  const requiredFields = [
    pnrData.proposito.objetivo,
    pnrData.actores.participantes,
    pnrData.intereses.nuestros,
    pnrData.intereses.minimos,
    pnrData.alternativas.nuestroMaan
  ]

  if (requiredFields.some(field => !field.trim())) {
    alert('Por favor complete todos los campos obligatorios marcados con *')
    return
  }

  pnrData.estado = 'PNR completo'
  alert('PNR guardado exitosamente')
}
</script>