#!/usr/bin/env node

/**
 * ==============================================================================
 * REMOVER CONSOLE.LOGS DE PRODUCCIÓN
 * ==============================================================================
 * 
 * Script que remueve o reemplaza console.logs con logging apropiado
 * 
 * USO: node scripts/remove-console-logs.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

let filesProcessed = 0;
let logsFound = 0;
let logsRemoved = 0;

/**
 * Procesa un archivo para encontrar y limpiar console.logs
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Contar logs primero (sin modificar)
    const logPattern = /console\.(log|warn|info|debug)\s*\([^)]*\)\s*;?\s*[\n\r]?/g;
    const matches = content.match(logPattern);
    if (matches) {
      logsFound += matches.length;
    }
    
    // Patrones a buscar - versión mejorada
    const patterns = [
      // console.log(...) - remover completamente
      { 
        regex: /^[ \t]*console\.(log|info|debug)\s*\([^)]*\)\s*;?\s*[\n\r]?/gm,
        replacement: ''
      },
      // console.warn(...) - convertir a error condicional
      {
        regex: /^[ \t]*console\.warn\s*\(([^)]*)\)\s*;?\s*[\n\r]?/gm,
        replacement: 'if (process.env.NODE_ENV !== "production") {\n  console.warn($1);\n}\n'
      },
      // console.error(...) - mantener solo en desarrollo
      {
        regex: /^[ \t]*console\.error\s*\(([^)]*)\)\s*;?\s*[\n\r]?/gm,
        replacement: 'if (process.env.NODE_ENV !== "production") {\n  console.error($1);\n}\n'
      },
    ];

    let modified = false;
    
    for (const pattern of patterns) {
      const newContent = content.replace(pattern.regex, pattern.replacement);
      if (newContent !== content) {
        content = newContent;
        modified = true;
      }
    }
    
    // Remover líneas vacías múltiples consecutivas
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Contar logs removidos
    const remainingLogs = content.match(logPattern);
    if (remainingLogs) {
      logsRemoved = logsFound - remainingLogs.length;
    } else if (logsFound > 0) {
      logsRemoved = logsFound;
    }

    // Si cambió, guardar
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Procesado: ${path.relative(ROOT_DIR, filePath)}`);
    }

    filesProcessed++;
  } catch (error) {
    console.warn(`⚠️  Error en ${filePath}: ${error.message}`);
  }
}

/**
 * Procesa directorio recursivamente
 */
function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    // Ignorar directorios especiales
    const ignoreDirs = ['node_modules', '.next', '.git', '.vscode', 'dist', 'build', 'coverage'];
    if (ignoreDirs.includes(entry.name)) {
      continue;
    }

    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (['.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte'].includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

// Validar que estamos en el directorio correcto
if (!fs.existsSync(path.join(ROOT_DIR, 'package.json'))) {
  console.error('❌ No se encontró package.json. Asegúrate de ejecutar desde la raíz del proyecto.');
  process.exit(1);
}

console.log('🔍 Buscando console.logs en archivos de código...\n');

// Ejecutar
processDirectory(ROOT_DIR);

// Mostrar resumen
console.log('\n' + '='.repeat(50));
console.log('📊 RESUMEN:');
console.log(`📁 Archivos procesados: ${filesProcessed}`);
console.log(`🔍 console.logs encontrados: ${logsFound}`);
console.log(`🗑️  console.logs eliminados/reemplazados: ${logsRemoved}`);
console.log('='.repeat(50));

if (logsRemoved > 0) {
  console.log('\n✅ ¡Proceso completado! Los console.logs han sido limpiados.');
} else {
  console.log('\nℹ️  No se encontraron console.logs para limpiar.');
}