#!/usr/bin/env node

/**
 * ==============================================================================
 * ANÁLISIS DE BUNDLE SIZE
 * ==============================================================================
 * 
 * Script para generar reporte de tamaño de bundles y ayudar a identificar
 * oportunidades de optimización.
 * 
 * USO: yarn analyze
 * Genera un análisis de bundles en .next/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const nextDir = path.join(process.cwd(), '.next');
const analysisDir = path.join(nextDir, 'analyze');

// Verificar si .next existe
if (!fs.existsSync(nextDir)) {
  process.exit(1);
}

// Archivos a analizar
const filesToAnalyze = [
  { name: 'Server Bundle', file: path.join(nextDir, 'server', '**', '*.js') },
  { name: 'Client Bundle', file: path.join(nextDir, 'static', '**', '*.js') },
];

// Calcular tamaño del directorio
function getDirSize(dir) {
  if (!fs.existsSync(dir)) return 0;
  
  let size = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      size += getDirSize(fullPath);
    } else {
      size += fs.statSync(fullPath).size;
    }
  });
  
  return size;
}

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Analizar directorios principales
const dirs = {
  '.next/server': path.join(nextDir, 'server'),
  '.next/static': path.join(nextDir, 'static'),
  '.next/static/chunks': path.join(nextDir, 'static', 'chunks'),
  '.next/static/_app': path.join(nextDir, 'static', '_app'),
};

let totalSize = 0;

Object.entries(dirs).forEach(([name, dir]) => {
  const size = getDirSize(dir);
  totalSize += size;
  console.log(`  ${name.padEnd(30)} ${formatSize(size).padStart(10)}`);
});

console.log(`  ${''.padEnd(30)} ${''.padStart(10, '─')}`);
console.log(`  ${'Total .next'.padEnd(30)} ${formatSize(totalSize).padStart(10)}`);

// Analizar chunk más grandes
const chunksDir = path.join(nextDir, 'static', 'chunks');
if (fs.existsSync(chunksDir)) {
  const chunks = fs.readdirSync(chunksDir)
    .filter(f => f.endsWith('.js'))
    .map(f => ({
      name: f,
      size: fs.statSync(path.join(chunksDir, f)).size
    }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 10);

  chunks.forEach((chunk, i) => {
    const isMapFile = chunk.name.includes('.map');
    const icon = isMapFile ? '📋' : '📄';
    console.log(`  ${i + 1}. ${icon} ${chunk.name.padEnd(40)} ${formatSize(chunk.size).padStart(10)}`);
  });
}

// Recomendaciones
console.log(`

╔════════════════════════════════════════════════════════════╗
║              RECOMENDACIONES DE OPTIMIZACIÓN              ║
╚════════════════════════════════════════════════════════════╝

✓ Si .next/server es > 5MB:
  - Revisa imports en páginas
  - Usa lazy loading para componentes pesados
  - Verifica que las dependencias sean necesarias

✓ Si chunks individuales > 500KB:
  - Considera code splitting
  - Lazy load con dynamic()
  - Revisa imports de librerías grandes

✓ Archivos .map > 1MB:
  - Deshabilita source maps en producción
  - Configura en next.config.ts: productionBrowserSourceMaps: false

✓ Para verificar imports específicos:
  - yarn add -D webpack-bundle-analyzer
  - Agrega en next.config.ts

═══════════════════════════════════════════════════════════════

Para análisis más detallado, instala webpack-bundle-analyzer:

  npm install --save-dev webpack-bundle-analyzer
  npm install --save-dev @next/bundle-analyzer

Luego actualiza next.config.ts con la configuración.

`);
