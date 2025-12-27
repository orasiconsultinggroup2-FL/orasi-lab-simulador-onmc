<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Manual de Operaciones</h2>
      <p class="text-gray-600">Tu guía paso a paso para dominar la negociación estratégica en ORASI Lab.</p>
    </div>

    <!-- Metodologías -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Harvard Negotiation Project -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <BookOpenIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Método Harvard</h3>
            <p class="text-sm text-gray-600">Negociación basada en principios</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-gray-900">1. Separar las Personas del Problema</h4>
            <p class="text-sm text-gray-600 mt-1">
              Los negociadores son personas primero. Reconoce sus emociones, construye rapport y mantén una relación constructiva.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-gray-900">2. Concentrarse en los Intereses, no en las Posiciones</h4>
            <p class="text-sm text-gray-600 mt-1">
              Las posiciones son lo que dicen querer; los intereses son por qué lo quieren. Explora el "por qué" detrás de cada demanda.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-gray-900">3. Generar Opciones de Beneficio Mutuo</h4>
            <p class="text-sm text-gray-600 mt-1">
              Busca soluciones creativas que satisfagan los intereses de ambas partes. Piensa en expandir el pastel antes de dividirlo.
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="font-medium text-gray-900">4. Usar Criterios Objetivos</h4>
            <p class="text-sm text-gray-600 mt-1">
              Base las decisiones en estándares justos e independientes de la voluntad de las partes.
            </p>
          </div>
        </div>
      </div>

      <!-- Mutual Gains Approach -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <UsersIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900">Mutual Gains Approach</h3>
            <p class="text-sm text-gray-600">Creación de valor compartido</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-medium text-gray-900">1. Preparación Colaborativa</h4>
            <p class="text-sm text-gray-600 mt-1">
              Involucra a todas las partes en el diseño del proceso de negociación desde el inicio.
            </p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-medium text-gray-900">2. Creación de Valor</h4>
            <p class="text-sm text-gray-600 mt-1">
              Identifica oportunidades para crear beneficios adicionales que no existían antes de la negociación.
            </p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-medium text-gray-900">3. Distribución Justa</h4>
            <p class="text-sm text-gray-600 mt-1">
              Una vez creado el valor, distribúyelo de manera que todas las partes perciban como justa.
            </p>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <h4 class="font-medium text-gray-900">4. Seguimiento y Adaptación</h4>
            <p class="text-sm text-gray-600 mt-1">
              Establece mecanismos para monitorear el cumplimiento y adaptar los acuerdos según sea necesario.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Proceso de Simulación -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Proceso de Simulación ONMC</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-blue-600 font-bold">1</span>
          </div>
          <h4 class="font-medium text-gray-900 mb-2">Selección del Desafío</h4>
          <p class="text-sm text-gray-600">
            Elige un caso según tu nivel de acceso. Cada caso representa un desafío real del sector minero.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-green-600 font-bold">2</span>
          </div>
          <h4 class="font-medium text-gray-900 mb-2">Preparación PNR (Harvard)</h4>
          <p class="text-sm text-gray-600">
            Entra a la posición, identifica intereses. Opciones, criterios. MAAN y ZOPA son tus herramientas clave.
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-yellow-600 font-bold">3</span>
          </div>
          <h4 class="font-medium text-gray-900 mb-2">Registro de Aprendizaje (AAR)</h4>
          <p class="text-sm text-gray-600">
            Después de cada paso, registra tu After Action Review. ¿Qué funcionó? ¿Qué mejorarías? ¿Qué aprendiste?
          </p>
        </div>
        
        <div class="text-center">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span class="text-purple-600 font-bold">4</span>
          </div>
          <h4 class="font-medium text-gray-900 mb-2">Resolución y IA Benchmark</h4>
          <p class="text-sm text-gray-600">
            Al final del caso, "Resolver" y "Finalizar" el Cuadro de Expertos te dará una evaluación con los estándares de Harvard.
          </p>
        </div>
      </div>
    </div>

    <!-- Recursos Adicionales -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recursos Adicionales</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-2">Glosario de Términos</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><strong>MAAN:</strong> Mejor Alternativa a un Acuerdo Negociado</li>
            <li><strong>ZOPA:</strong> Zona de Posible Acuerdo</li>
            <li><strong>PNR:</strong> Preparación para Negociación Racional</li>
            <li><strong>AAR:</strong> After Action Review</li>
          </ul>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-2">Casos por Criticidad</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><span class="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span><strong>Bajo:</strong> Diálogos preventivos</li>
            <li><span class="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span><strong>Medio:</strong> Mediaciones ambientales</li>
            <li><span class="inline-block w-3 h-3 bg-orange-400 rounded-full mr-2"></span><strong>Alto:</strong> Conflictos por recursos</li>
            <li><span class="inline-block w-3 h-3 bg-red-400 rounded-full mr-2"></span><strong>Crítico:</strong> Convenios marco</li>
          </ul>
        </div>
        
        <div class="border border-gray-200 rounded-lg p-4">
          <h4 class="font-medium text-gray-900 mb-2">Evaluación</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><strong>Excelente:</strong> 9-10 puntos</li>
            <li><strong>Bueno:</strong> 7-8 puntos</li>
            <li><strong>Promedio:</strong> 5-6 puntos</li>
            <li><strong>Necesita mejora:</strong> < 5 puntos</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BookOpenIcon, UsersIcon } from 'lucide-vue-next'
</script>