# TODO - NewsForm.tsx Wizard Refactorización

## Estado: EN PROGRESO
**Fecha de inicio**: Implementación actual
**Objetivo**: Convertir NewsForm.tsx al formato Wizard

---

## Paso 1: Crear NewsWizardForm.tsx
- [x] Crear archivo `/home/enrique/Bausen/web/frontend/app/admin/news/NewsWizardForm.tsx`
- [x] Basarse en `NewsWizardForm.example.tsx` como referencia
- [x] Mantener toda la lógica de API existente
- [x] Mantener validación actual
- [x] Usar componentes WizardStep (StepInput, StepTextarea, StepSelect, etc.)
- [x] Implementar 6 pasos del wizard:
  - [x] Paso 1: basic (título, subtítulo)
  - [x] Paso 2: content (descripción, tiempo de lectura)
  - [x] Paso 3: media (imagen, alt text)
  - [x] Paso 4: meta (categoría, etiquetas, featured)
  - [x] Paso 5: seo (fecha, hora, meta descripción, keywords)
  - [x] Paso 6: review (resumen final)

## Paso 2: Integrar en page.tsx
- [x] Importar NewsWizardForm en `/home/enrique/Bausen/web/frontend/app/admin/news/page.tsx`
- [x] Añadir estado para alternar entre formularios
- [x] Renderizar NewsWizardForm con toggle para comparar
- [x] Probar creación de noticias (build exitoso)

## Paso 3: Actualizar Documentación
- [ ] Actualizar `/home/enrique/Bausen/web/frontend/docs/WIZARD_MODAL_TODO.md`
  - [ ] Marcar News como "En progreso"
  - [ ] Agregar detalles de implementación

## Criterios de Éxito
- [ ] El formulario wizard se abre correctamente
- [ ] La navegación entre pasos funciona
- [ ] La validación por paso funciona
- [ ] El envío de datos a la API funciona igual que antes
- [ ] El guardado automático (draft) funciona
- [ ] La vista previa de imagen funciona
- [ ] Los mensajes de error/success se muestran correctamente
- [ ] Compatible con tema light/dark

## Notas de Implementación
- Mantener RichTextEditor existente
- Mantener estructura de API idéntica (mismo endpoint, mismos campos)
- Preservar todos los mensajes de error actuales
- Mantener compatibilidad con el backend existente

## Comandos de Testing
```bash
# Verificar que no hay errores de Typescript
cd frontend && npx tsc --noEmit

# Verificar que la build funciona
cd frontend && npm run build
```

---
**Referencia**: Ver `WIZARD_PLAN_NEWSFORM.md` para detalles completos del plan

