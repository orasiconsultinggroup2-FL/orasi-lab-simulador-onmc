import { defineStore } from 'pinia'

export const useSimulacionesStore = defineStore('simulaciones', {
  state: () => ({
    simulaciones: [],
    simulacionActual: null,
    evaluaciones: [],
    loading: false
  }),

  getters: {
    simulacionesPorCriticidad: (state) => (criticidad) => {
      return state.simulaciones.filter(sim => sim.criticidad === criticidad)
    },
    
    simulacionesDisponibles: (state) => (userLevel) => {
      const criticalityLevels = { 'bajo': 1, 'medio': 2, 'alto': 3, 'critico': 4 }
      return state.simulaciones.filter(sim => 
        criticalityLevels[sim.criticidad] <= userLevel
      )
    },

    promedioEvaluaciones: (state) => {
      if (state.evaluaciones.length === 0) return 0
      const suma = state.evaluaciones.reduce((acc, evaluacion) => acc + evaluacion.puntuacionTotal, 0)
      return (suma / state.evaluaciones.length).toFixed(1)
    }
  },

  actions: {
    async cargarSimulaciones() {
      this.loading = true
      try {
        // 60 Simulaciones preconfiguradas para el piloto
        this.simulaciones = [
          // CASOS CRÍTICOS (15 casos)
          {
            id: 1,
            titulo: 'Conflicto por Uso de Agua - Comunidad Huancavelica',
            descripcion: 'La comunidad de Huancavelica reclama que las operaciones mineras están afectando sus fuentes de agua tradicionales.',
            criticidad: 'critico',
            duracionEstimada: 45,
            actores: [
              { nombre: 'Comunidad Huancavelica', tipo: 'comunidad', interes: 'Preservar acceso al agua' },
              { nombre: 'Minera Hochschild', tipo: 'empresa', interes: 'Continuar operaciones' },
              { nombre: 'ANA', tipo: 'gobierno', interes: 'Cumplimiento normativo' }
            ],
            objetivos: [
              'Identificar intereses reales vs posiciones declaradas',
              'Generar opciones de valor mutuo',
              'Establecer criterios objetivos de evaluación'
            ],
            metodologia: 'Harvard Negotiation Project',
            completada: false,
            fechaCreacion: '2024-01-15'
          },
          {
            id: 2,
            titulo: 'Negociación de Convenio Marco - Distrito Minero',
            descripcion: 'Renovación del convenio marco con las comunidades del distrito minero para los próximos 5 años.',
            criticidad: 'critico',
            duracionEstimada: 60,
            actores: [
              { nombre: 'Federación de Comunidades', tipo: 'organizacion', interes: 'Beneficios económicos' },
              { nombre: 'Municipalidad Distrital', tipo: 'gobierno', interes: 'Desarrollo local' },
              { nombre: 'Minera Hochschild', tipo: 'empresa', interes: 'Licencia social' }
            ],
            objetivos: [
              'Establecer marco de beneficios compartidos',
              'Definir mecanismos de monitoreo participativo',
              'Crear sistema de resolución de conflictos'
            ],
            metodologia: 'Mutual Gains Approach',
            completada: false,
            fechaCreacion: '2024-01-10'
          },
          // Más casos críticos...
          ...Array.from({length: 13}, (_, i) => ({
            id: i + 3,
            titulo: `Crisis Crítica ${i + 1} - Sector Minero`,
            descripcion: `Caso crítico de negociación en contexto minero que requiere intervención inmediata y expertise avanzado.`,
            criticidad: 'critico',
            duracionEstimada: 50 + (i * 2),
            actores: [
              { nombre: 'Comunidad Local', tipo: 'comunidad', interes: 'Protección ambiental' },
              { nombre: 'Empresa Minera', tipo: 'empresa', interes: 'Continuidad operacional' },
              { nombre: 'Autoridad Regional', tipo: 'gobierno', interes: 'Cumplimiento legal' }
            ],
            objetivos: [
              'Aplicar metodología Harvard en contexto crítico',
              'Gestionar múltiples stakeholders',
              'Crear soluciones sostenibles'
            ],
            metodologia: i % 2 === 0 ? 'Harvard Negotiation Project' : 'Mutual Gains Approach',
            completada: false,
            fechaCreacion: '2024-01-' + String(10 + i).padStart(2, '0')
          })),

          // CASOS ALTOS (15 casos)
          {
            id: 16,
            titulo: 'Mediación Ambiental - Impacto en Pastizales',
            descripcion: 'Mediación por reclamos de impacto ambiental en pastizales utilizados por ganaderos locales.',
            criticidad: 'alto',
            duracionEstimada: 35,
            actores: [
              { nombre: 'Asociación de Ganaderos', tipo: 'gremio', interes: 'Compensación por daños' },
              { nombre: 'SENACE', tipo: 'gobierno', interes: 'Cumplimiento ambiental' },
              { nombre: 'Minera Hochschild', tipo: 'empresa', interes: 'Resolver conflicto' }
            ],
            objetivos: [
              'Evaluar evidencia técnica disponible',
              'Proponer medidas de mitigación',
              'Acordar compensaciones justas'
            ],
            metodologia: 'Mediación Colaborativa',
            completada: true,
            fechaCreacion: '2024-01-05'
          },
          ...Array.from({length: 14}, (_, i) => ({
            id: i + 17,
            titulo: `Conflicto Alto ${i + 1} - Gestión Socioambiental`,
            descripcion: `Caso de alta complejidad que requiere negociación avanzada y manejo de múltiples intereses.`,
            criticidad: 'alto',
            duracionEstimada: 35 + (i * 2),
            actores: [
              { nombre: 'Stakeholder Principal', tipo: 'comunidad', interes: 'Beneficios directos' },
              { nombre: 'Empresa Operadora', tipo: 'empresa', interes: 'Eficiencia operativa' },
              { nombre: 'Regulador Sectorial', tipo: 'gobierno', interes: 'Supervisión normativa' }
            ],
            objetivos: [
              'Negociar en contexto de alta tensión',
              'Balancear intereses múltiples',
              'Implementar soluciones prácticas'
            ],
            metodologia: ['Harvard Negotiation Project', 'Mutual Gains Approach', 'Mediación Colaborativa'][i % 3],
            completada: i % 4 === 0,
            fechaCreacion: '2024-01-' + String(5 + i).padStart(2, '0')
          })),

          // CASOS MEDIOS (15 casos)
          {
            id: 31,
            titulo: 'Diálogo Comunitario - Proyecto de Expansión',
            descripcion: 'Facilitación de diálogo para proyecto de expansión de operaciones mineras.',
            criticidad: 'medio',
            duracionEstimada: 30,
            actores: [
              { nombre: 'Comunidad San José', tipo: 'comunidad', interes: 'Participación en beneficios' },
              { nombre: 'Minera Hochschild', tipo: 'empresa', interes: 'Aprobación social' }
            ],
            objetivos: [
              'Facilitar comunicación efectiva',
              'Identificar oportunidades de colaboración',
              'Establecer acuerdos preliminares'
            ],
            metodologia: 'Mediación Colaborativa',
            completada: false,
            fechaCreacion: '2024-01-12'
          },
          ...Array.from({length: 14}, (_, i) => ({
            id: i + 32,
            titulo: `Negociación Media ${i + 1} - Desarrollo Sostenible`,
            descripcion: `Caso de complejidad media enfocado en desarrollo sostenible y relacionamiento comunitario.`,
            criticidad: 'medio',
            duracionEstimada: 25 + (i * 2),
            actores: [
              { nombre: 'Comunidad Beneficiaria', tipo: 'comunidad', interes: 'Desarrollo local' },
              { nombre: 'Empresa Responsable', tipo: 'empresa', interes: 'Sostenibilidad' }
            ],
            objetivos: [
              'Desarrollar capacidades de negociación',
              'Crear valor compartido',
              'Fortalecer relaciones'
            ],
            metodologia: ['Harvard Negotiation Project', 'Mutual Gains Approach', 'Mediación Colaborativa'][i % 3],
            completada: i % 3 === 0,
            fechaCreacion: '2024-01-' + String(12 + i).padStart(2, '0')
          })),

          // CASOS BAJOS (15 casos)
          {
            id: 46,
            titulo: 'Diálogo Preventivo - Nueva Concesión',
            descripcion: 'Diálogo preventivo con comunidades antes del inicio de exploración en nueva concesión.',
            criticidad: 'bajo',
            duracionEstimada: 25,
            actores: [
              { nombre: 'Comunidad San Pedro', tipo: 'comunidad', interes: 'Información y participación' },
              { nombre: 'Minera Hochschild', tipo: 'empresa', interes: 'Licencia social temprana' }
            ],
            objetivos: [
              'Establecer canales de comunicación',
              'Informar sobre el proyecto',
              'Acordar protocolos de relacionamiento'
            ],
            metodologia: 'Diálogo Apreciativo',
            completada: false,
            fechaCreacion: '2024-01-20'
          },
          ...Array.from({length: 14}, (_, i) => ({
            id: i + 47,
            titulo: `Diálogo Básico ${i + 1} - Relacionamiento Temprano`,
            descripcion: `Caso básico para desarrollar habilidades fundamentales de negociación y diálogo.`,
            criticidad: 'bajo',
            duracionEstimada: 20 + (i * 1),
            actores: [
              { nombre: 'Grupo de Interés', tipo: 'comunidad', interes: 'Información clara' },
              { nombre: 'Empresa Minera', tipo: 'empresa', interes: 'Relacionamiento positivo' }
            ],
            objetivos: [
              'Practicar habilidades básicas',
              'Construir confianza',
              'Establecer bases de diálogo'
            ],
            metodologia: ['Harvard Negotiation Project', 'Mediación Colaborativa'][i % 2],
            completada: i % 2 === 0,
            fechaCreacion: '2024-01-' + String(20 + i).padStart(2, '0')
          }))
        ]
      } catch (error) {
        console.error('Error cargando simulaciones:', error)
      } finally {
        this.loading = false
      }
    },

    async iniciarSimulacion(simulacionId) {
      const simulacion = this.simulaciones.find(s => s.id === simulacionId)
      if (simulacion) {
        this.simulacionActual = {
          ...simulacion,
          fechaInicio: new Date().toISOString(),
          progreso: 0,
          fase: 'preparacion',
          decisiones: [],
          tiempoTranscurrido: 0
        }
        return this.simulacionActual
      }
      return null
    },

    async guardarDecision(decision) {
      if (this.simulacionActual) {
        this.simulacionActual.decisiones.push({
          ...decision,
          timestamp: new Date().toISOString()
        })
      }
    },

    async completarSimulacion(evaluacion) {
      if (this.simulacionActual) {
        const evaluacionCompleta = {
          id: Date.now(),
          simulacionId: this.simulacionActual.id,
          userId: evaluacion.userId,
          fechaCompletada: new Date().toISOString(),
          tiempoTotal: this.simulacionActual.tiempoTranscurrido,
          criterios: evaluacion.criterios,
          puntuacionTotal: evaluacion.puntuacionTotal,
          feedback: evaluacion.feedback,
          decisiones: this.simulacionActual.decisiones
        }
        
        this.evaluaciones.push(evaluacionCompleta)
        
        const simulacion = this.simulaciones.find(s => s.id === this.simulacionActual.id)
        if (simulacion) {
          simulacion.completada = true
        }
        
        this.simulacionActual = null
        return evaluacionCompleta
      }
      return null
    },

    async obtenerEvaluaciones(userId = null) {
      if (userId) {
        return this.evaluaciones.filter(evaluacion => evaluacion.userId === userId)
      }
      return this.evaluaciones
    }
  }
})