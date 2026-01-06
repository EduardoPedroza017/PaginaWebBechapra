#!/usr/bin/env node

/**
 * ==============================================================================
 * SCRIPT DE MIGRACIÓN - REEMPLAZAR URLs HARDCODEADAS
 * ==============================================================================
 * 
 * Este script reemplaza automáticamente todas las URLs hardcodeadas de
 * http://localhost:5000 por el uso de la configuración centralizada.
 * 
 * USO: node scripts/migrate-urls.js
 */

const fs = require('fs');
const path = require('path');

// Configuración
const ROOT_DIR = path.join(__dirname, '..');
const CONFIG_PATH = path.join(ROOT_DIR, 'lib', 'config.ts');

// Verificar que existe el archivo de configuración
if (!fs.existsSync(CONFIG_PATH)) {
  console.error('❌ ERROR: No se encontró el archivo de configuración en @/lib/config');
  console.error('   Asegúrate de tener config.ts o config.js en /lib/config/');
  process.exit(1);
}

// Contadores
let filesProcessed = 0;
let filesModified = 0;
let totalReplacements = 0;

/**
 * Verifica si un archivo ya importa config
 */
function hasConfigImport(content) {
  return content.includes("from '@/lib/config'") || 
         content.includes("from '../lib/config'") ||
         content.includes("from './lib/config'") ||
         content.includes("from '../../lib/config'") ||
         content.includes("from '../../../lib/config'");
}

/**
 * Agrega el import de config de manera inteligente
 */
function addConfigImport(content, filePath) {
  if (hasConfigImport(content)) {
    return content;
  }

  // Determinar ruta relativa para el import
  const relativeToLib = path.relative(path.dirname(filePath), path.join(ROOT_DIR, 'lib'));
  let importPath = relativeToLib;
  
  // Si está en la raíz o mismo nivel
  if (!importPath.startsWith('.')) {
    importPath = './' + importPath;
  }
  
  // Normalizar para quiera index.ts/.js
  importPath = importPath.replace(/\\/g, '/');
  if (importPath.endsWith('/config')) {
    importPath += '/index';
  }

  // Buscar último import o lugar para insertar
  const importLines = [];
  const lines = content.split('\n');
  let lastImportIndex = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('import ') || lines[i].trim().startsWith('//') || lines[i].trim() === '') {
      lastImportIndex = i;
    } else if (lines[i].trim() !== '') {
      break;
    }
  }

  const newImport = `import { config } from '${importPath}/config';`;
  
  if (lastImportIndex >= 0) {
    // Insertar después del último import
    lines.splice(lastImportIndex + 1, 0, newImport);
    return lines.join('\n');
  } else {
    // Agregar al inicio
    return newImport + '\n\n' + content;
  }
}

/**
 * Procesa un archivo
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let replacements = 0;
    let needsConfig = false;

    // Patrones de reemplazo (en orden específico para evitar conflictos)
    const patterns = [
      // 1. URLs completas en fetch, axios, etc.
      {
        name: 'URL completa en fetch',
        regex: /(['"`])http:\/\/localhost:5000(\/[^'"`]*)(['"`])/g,
        replacement: (match, p1, p2, p3) => {
          needsConfig = true;
          return `${p1}\${config.api.url}${p2}${p3}`;
        }
      },
      // 2. Concatenación de strings con localhost
      {
        name: 'Concatenación con template strings',
        regex: /(['"`])http:\/\/localhost:5000\$\{([^}]+)\}(['"`])/g,
        replacement: (match, p1, p2, p3) => {
          needsConfig = true;
          return `${p1}\${config.api.url}\${${p2}}${p3}`;
        }
      },
      // 3. Variables que asignan la URL
      {
        name: 'Asignación de variable API',
        regex: /(const|let|var)\s+(\w+)\s*=\s*(?:process\.env\.NEXT_PUBLIC_API_URL\s*\|\|?\s*)?['"]http:\/\/localhost:5000['"]/gi,
        replacement: (match, p1, p2) => {
          needsConfig = true;
          return `${p1} ${p2} = config.api.url`;
        }
      },
      // 4. Uso directo en expresiones
      {
        name: 'Uso directo de URL',
        regex: /(['"])http:\/\/localhost:5000(['"])/g,
        replacement: (match, p1, p2) => {
          needsConfig = true;
          return `${p1}\${config.api.url}${p2}`;
        }
      },
    ];

    // Aplicar cada patrón
    for (const pattern of patterns) {
      const matches = content.match(pattern.regex);
      if (matches) {
        content = content.replace(pattern.regex, pattern.replacement);
        replacements += matches.length;
        if (process.env.DEBUG) {
          console.log(`   ↳ ${pattern.name}: ${matches.length} reemplazos`);
        }
      }
    }

    // Agregar import si es necesario
    if (needsConfig && !hasConfigImport(content)) {
      content = addConfigImport(content, filePath);
    }

    // Guardar si hubo cambios
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
      totalReplacements += replacements;
      const relativePath = path.relative(ROOT_DIR, filePath);
      console.log(`✅ ${relativePath} - ${replacements} reemplazo(s)`);
      
      // Mostrar cambios en modo debug
      if (process.env.DEBUG) {
        const originalLines = originalContent.split('\n');
        const newLines = content.split('\n');
        for (let i = 0; i < Math.max(originalLines.length, newLines.length); i++) {
          if (originalLines[i] !== newLines[i]) {
            if (originalLines[i]) console.log(`   - ${originalLines[i]}`);
            if (newLines[i]) console.log(`   + ${newLines[i]}`);
          }
        }
      }
    }

    filesProcessed++;
  } catch (error) {
    console.warn(`⚠️  Error procesando ${filePath}: ${error.message}`);
  }
}

/**
 * Procesa un directorio recursivamente
 */
function processDirectory(dirPath) {
  const extensions = ['.ts', '.tsx', '.js', '.jsx', '.vue', '.svelte'];
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      // Ignorar directorios comunes
      const ignoreDirs = ['node_modules', '.next', '.git', '.vscode', 'dist', 'build', 'coverage'];
      if (entry.isDirectory() && ignoreDirs.includes(entry.name)) {
        continue;
      }

      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (extensions.includes(ext.toLowerCase())) {
          processFile(fullPath);
        }
      }
    }
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn(`⚠️  No se pudo acceder a ${dirPath}: ${error.message}`);
    }
  }
}

/**
 * Main
 */
function main() {
  console.log('🚀 Iniciando migración de URLs hardcodeadas...');
  console.log('📁 Buscando http://localhost:5000 en archivos de código\n');
  
  const startTime = Date.now();

  // Directorios a procesar (verificar existencia primero)
  const dirsToProcess = [
    'app',
    'components', 
    'lib',
    'pages',
    'src',
    'utils',
    'hooks',
    'services'
  ].filter(dir => fs.existsSync(path.join(ROOT_DIR, dir)));

  if (dirsToProcess.length === 0) {
    console.log('ℹ️  No se encontraron directorios comunes para procesar.');
    console.log('   Procesando todo el proyecto (excepto node_modules, .next, etc.)...');
    processDirectory(ROOT_DIR);
  } else {
    for (const dir of dirsToProcess) {
      const fullPath = path.join(ROOT_DIR, dir);
      console.log(`📂 Procesando ${dir}/...`);
      processDirectory(fullPath);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE LA MIGRACIÓN');
  console.log('='.repeat(60));
  console.log(`📁 Archivos procesados: ${filesProcessed}`);
  console.log(`✏️  Archivos modificados: ${filesModified}`);
  console.log(`🔁 Total de reemplazos: ${totalReplacements}`);
  console.log(`⏱️  Tiempo total: ${elapsed}s`);
  console.log('='.repeat(60));
  
  if (filesModified > 0) {
    console.log('\n✅ ¡Migración completada!');
    console.log('⚠️  NOTA: Verifica manualmente los cambios importantes.');
    console.log('   Algunos reemplazos pueden necesitar ajustes manuales.');
  } else {
    console.log('\nℹ️  No se encontraron URLs hardcodeadas para migrar.');
  }
}

// Modo dry-run opcional
if (process.argv.includes('--dry-run') || process.argv.includes('--check')) {
  console.log('🔍 MODO DRY-RUN: Solo mostrando lo que se haría (sin modificar archivos)');
  process.env.DEBUG = 'true';
  
  // Sobrescribir fs.writeFileSync para no escribir
  const originalWriteFile = fs.writeFileSync;
  fs.writeFileSync = function() {
    console.log('   (Simulación: archivo no modificado)');
  };
}

// Ejecutar
main();