import { defineStore } from 'pinia'

export const useCasosStore = defineStore('casos', {
  state: () => ({
    casos: [
      {
        id: 'CASO-001',
        titulo: 'Conflicto por acceso al agua - Comunidad El Roble',
        territorio: 'Región Norte',
        comunidad: 'El Roble',
        tipo: 'conflicto',
        nivelRiesgo: 'Alto',
        estado: 'En negociación',
        responsableFrontline: 'María González',
        pnrEstado: 'Completo',
        aarEstado: 'Pendiente',
        fechaCreacion: '2024-01-15',
        fechaActualizacion: '2024-01-20',
        descripcion: 'Conflicto por restricciones de acceso al agua durante operaciones mineras',
        actoresInvolucrados: ['Comunidad El Roble', 'Autoridades Locales', 'Empresa'],
        compromisos: [
          {
            id: 'COMP-001',
            descripcion: 'Instalación de sistema de agua alternativo',
            tipo: 'operativo',
            responsable: 'Departamento Técnico',
            fechaVencimiento: '2024-02-15',
            estado: 'en ejecución'
          }
        ]
      },
      {
        id: 'CASO-002',
        titulo: 'Rumor crítico sobre contaminación',
        territorio: 'Región Sur',
        comunidad: 'Las Flores',
        tipo: 'rumor crítico',
        nivelRiesgo: 'Crítico',
        estado: 'En escalamiento CER',
        responsableFrontline: 'Carlos Mendoza',
        pnrEstado: 'Completo',
        aarEstado: 'Crítico',
        fechaCreacion: '2024-01-10',
        fechaActualizacion: '2024-01-22',
        descripcion: 'Rumores sobre contaminación del río por actividades mineras',
        actoresInvolucrados: ['Comunidad Las Flores', 'Medios Locales', 'ONG Ambiental'],
        compromisos: []
      }
    ],
    filtros: {
      territorio: '',
      nivelRiesgo: '',
      estado: '',
      responsable: ''
    }
  }),

  getters: {
    casosFiltrados: (state) => {
      return state.casos.filter(caso => {
        return (!state.filtros.territorio || caso.territorio === state.filtros.territorio) &&
               (!state.filtros.nivelRiesgo || caso.nivelRiesgo === state.filtros.nivelRiesgo) &&
               (!state.filtros.estado || caso.estado === state.filtros.estado) &&
               (!state.filtros.responsable || caso.responsableFrontline === state.filtros.responsable)
      })
    },

    casosActivos: (state) => state.casos.filter(caso => !['Cerrado con acuerdo', 'Cerrado sin acuerdo'].includes(caso.estado)),
    
    casosCerrados: (state) => state.casos.filter(caso => ['Cerrado con acuerdo', 'Cerrado sin acuerdo'].includes(caso.estado)),
    
    casosCriticos: (state) => state.casos.filter(caso => ['Alto', 'Crítico'].includes(caso.nivelRiesgo)),

    estadisticas: (state) => {
      const total = state.casos.length
      const activos = state.casos.filter(c => !['Cerrado con acuerdo', 'Cerrado sin acuerdo'].includes(c.estado)).length
      const cerrados = total - activos
      const escalamiento = state.casos.filter(c => c.estado === 'En escalamiento CER').length
      
      const porRiesgo = {
        Bajo: state.casos.filter(c => c.nivelRiesgo === 'Bajo').length,
        Medio: state.casos.filter(c => c.nivelRiesgo === 'Medio').length,
        Alto: state.casos.filter(c => c.nivelRiesgo === 'Alto').length,
        Crítico: state.casos.filter(c => c.nivelRiesgo === 'Crítico').length
      }

      const pnrCompleto = state.casos.filter(c => c.pnrEstado === 'Completo').length
      const pnrParcial = state.casos.filter(c => c.pnrEstado === 'Parcial').length
      const pnrPendiente = state.casos.filter(c => c.pnrEstado === 'Pendiente').length

      return {
        total,
        activos,
        cerrados,
        escalamiento,
        porRiesgo,
        pnr: {
          completo: Math.round((pnrCompleto / total) * 100),
          parcial: Math.round((pnrParcial / total) * 100),
          pendiente: Math.round((pnrPendiente / total) * 100)
        }
      }
    }
  },

  actions: {
    getCasoById(id) {
      return this.casos.find(caso => caso.id === id)
    },

    updateFiltros(filtros) {
      this.filtros = { ...this.filtros, ...filtros }
    },

    clearFiltros() {
      this.filtros = {
        territorio: '',
        nivelRiesgo: '',
        estado: '',
        responsable: ''
      }
    }
  }
})