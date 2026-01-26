# Plan de Refactorización: NewsForm.tsx → Wizard Format

## Información Recopilada

### Archivos Involucrados
- **Archivo principal**: `/home/enrique/Bausen/web/frontend/app/admin/news/NewsForm.tsx`
- **Componente de referencia**: `/home/enrique/Bausen/web/frontend/components/modals/NewsWizardForm.example.tsx`
- **Componentes base wizard**:
  - `FormWizardModal.tsx` - Modal wrapper con backdrop
  - `WizardStep.tsx` - Componentes de formulario (StepInput, StepTextarea, etc.)
  - `WizardControls.tsx` - Controles de navegación

### Funcionalidades Actuales de NewsForm.tsx
1. Formulario colapsable/expandible
4 tabs: Contenido, Imagen, Meta, SEO
2. Campos actuales:
   - Título (max 100 caracteres)
   - Subtítulo (max 150 caracteres)
   - Descripción (RichTextEditor, min 50, max 2000 caracteres)
   - Imagen principal (drag & drop, max 2MB)
   - Texto alternativo (alt text)
   - Categoría (dropdown)
   - Etiquetas (tags, max 8)
   - Featured (toggle)
   - Fecha y hora de publicación
   - Meta descripción SEO (max 160 caracteres)
   - Palabras clave SEO
3. Validaciones por campo
4. Vista previa en modal separado
5. Cálculo de tiempo de lectura automático
6. Envío de formulario con FormData

## Plan de Implementación

### Paso 1: Crear NewsWizardForm.tsx refactorizado
**Archivo destino**: `/home/enrique/Bausen/web/frontend/app/admin/news/NewsWizardForm.tsx`

Basado en `NewsWizardForm.example.tsx`, pero:
- Mantener toda la lógica de API existente
- Mantener validación actual
- Mantener estilos ADMIN_COLORS
- Usar componentes WizardStep

### Paso 2: Definir pasos del Wizard
1. **basic**: Título, Subtítulo
2. **content**: Descripción (RichTextEditor), Tiempo de lectura
3. **media**: Imagen principal, Alt text
4. **meta**: Categoría, Etiquetas, Featured toggle
5. **seo**: Fecha/Hora, Meta descripción, Palabras clave
6. **review**: Resumen final con todos los datos

### Paso 3: Actualizar page.tsx
- Importar y usar NewsWizardForm
- Reemplazar NewsForm actual si es necesario

### Paso 4: Mantener compatibilidad
- Mantener NewsForm.tsx como backup o eliminarlo gradualmente
- Asegurar que la API llamada sea idéntica

## Archivos a Editar/Crear

| Archivo | Acción |
|---------|--------|
| `/home/enrique/Bausen/web/frontend/app/admin/news/NewsWizardForm.tsx` | Crear |
| `/home/enrique/Bausen/web/frontend/app/admin/news/page.tsx` | Editar (importar nuevo componente) |
| `/home/enrique/Bausen/web/frontend/docs/WIZARD_MODAL_TODO.md` | Actualizar progreso |

## Pasos de Implementación

1. ✅ Revisar archivos existentes (completado)
2. ⏳ Crear NewsWizardForm.tsx basado en el ejemplo
3. ⏳ Integrar en page.tsx
4. ⏳ Actualizar WIZARD_MODAL_TODO.md
5. ⏳ Testing básico

## Notas
- Mantener el RichTextEditor existente
- Mantener estructura de API idéntica
- Usar el tema (theme) del contexto existente
- Preservar mensajes de error y éxito actuales

