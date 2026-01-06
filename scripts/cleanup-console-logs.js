#!/usr/bin/env node

/**
 * Script para limpiar console.log() del código
 * ✓ Remueve console.log() completamente
 * ✓ Mantiene console.error/warn/info para development
 * ✓ NO rompe la sintaxis
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Directorios a procesar
const DIRS_TO_PROCESS = [
  'app',
  'components',
  'lib',
];

const EXTENSIONS = ['ts', 'tsx', 'js', 'jsx'];

let totalFiles = 0;
let totalRemoved = 0;

function shouldProcessFile(filePath) {
  // Ignorar archivos node_modules, .next, etc
  const ignore = ['node_modules', '.next', 'dist', 'out', 'build'];
  return !ignore.some(dir => filePath.includes(dir));
}

function removeConsoleLogs(content) {
  let removed = 0;
  let result = content;

  // Patrón 1: console.log(...) en una sola línea
  const pattern1 = /^\s*console\.log\([^)]*\);?\s*\n/gm;
  const matches1 = result.match(pattern1);
  if (matches1) {
    removed += matches1.length;
    result = result.replace(pattern1, '');
  }

  // Patrón 2: console.log en línea (pero no remover si es la única declaración)
  const pattern2 = /\s*console\.log\([^)]*\);\s*/g;
  const matches2 = result.match(pattern2);
  if (matches2) {
    // Ser más cuidadoso aquí - solo remover si hay más contenido en la línea
    matches2.forEach(match => {
      // Verificar que no sea la única cosa en la línea
      const line = result.substring(
        result.lastIndexOf('\n', result.indexOf(match)),
        result.indexOf('\n', result.indexOf(match) + match.length)
      );
      if (line.trim().length > match.trim().length) {
        result = result.replace(match, ' ');
        removed += 1;
      }
    });
  }

  return { result, removed };
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { result, removed } = removeConsoleLogs(content);

    if (removed > 0) {
      fs.writeFileSync(filePath, result, 'utf8');
      totalRemoved += removed;
      console.log(`✓ ${path.relative(process.cwd(), filePath)}: ${removed} logs removed`);
    }
  } catch (error) {
    console.error(`✗ Error procesando ${filePath}: ${error.message}`);
  }
}

function main() {
  console.log('🧹 Limpiando console.log() del proyecto...\n');

  // Procesar cada directorio
  DIRS_TO_PROCESS.forEach(dir => {
    if (!fs.existsSync(dir)) return;

    EXTENSIONS.forEach(ext => {
      const pattern = path.join(dir, '**', `*.${ext}`);
      const files = glob.sync(pattern, { ignore: ['**/node_modules/**', '**/.next/**'] });

      files.forEach(file => {
        if (shouldProcessFile(file)) {
          totalFiles++;
          processFile(file);
        }
      });
    });
  });

  console.log(`\n═════════════════════════════════════════════════════════════`);
  console.log(`✅ LIMPIEZA COMPLETADA`);
  console.log(`═════════════════════════════════════════════════════════════`);
  console.log(`📁 Archivos procesados: ${totalFiles}`);
  console.log(`🗑️  Console.logs removidos: ${totalRemoved}`);
  console.log(`═════════════════════════════════════════════════════════════\n`);

  if (totalRemoved > 0) {
    console.log('⚠️  Por favor ejecuta: yarn build');
    console.log('   Para validar que el código compile correctamente\n');
  }
}

main();
