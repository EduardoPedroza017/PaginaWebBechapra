#!/usr/bin/env node

// Script para buscar importaciones de dependencias pesadas en el frontend
// Uso: node scripts/find-heavy-deps.js

const fs = require('fs');
const path = require('path');

const root = process.cwd();
const scanDir = path.join(root, 'app');

const heavyDeps = [
  'three',
  '@react-three',
  '@react-three/fiber',
  '@react-three/drei',
  'lottie',
  'lottiefiles',
  'react-icons',
  '@heroicons',
  'chart.js',
  'react-chartjs-2',
  'framer-motion',
  'gsap',
  '@mui/material',
  'tiptap',
  '@tiptap',
  'konva',
  'react-konva',
  'zustand'
];

function walk(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.next' || file === '.git') return;
      walk(full, filelist);
    } else {
      if (full.endsWith('.js') || full.endsWith('.ts') || full.endsWith('.tsx')) filelist.push(full);
    }
  });
  return filelist;
}

function scan() {
  if (!fs.existsSync(scanDir)) {
    console.error('Directorio app/ no encontrado. Ejecuta desde la raíz del frontend.');
    process.exit(1);
  }

  const files = walk(scanDir);
  const results = {};
  heavyDeps.forEach(dep => results[dep] = []);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    heavyDeps.forEach(dep => {
      const re = new RegExp("from ['\"]" + dep.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + "['\"]|require\\(['\"]" + dep.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + "['\"]\\)", 'g');
      if (re.test(content)) {
        results[dep].push(file);
      }
    });
  });

  console.log('\nHeavy deps import report (frontend/app):\n');
  Object.entries(results).forEach(([dep, arr]) => {
    if (arr.length === 0) return;
    console.log(`- ${dep}: ${arr.length} import(s)`);
    arr.forEach(f => console.log(`    ${path.relative(root, f)}`));
  });
  console.log('\nTip: para reducir bundle, lazy-load estos módulos con dynamic() o moverlos fuera del bundle inicial.');
}

scan();
