# Integrar ServicesWizardForm en page.tsx de Servicios

## Estado
- [x] Planificar implementación
- [x] Importar ServicesWizardForm en page.tsx
- [x] Añadir estado useWizardForm y botones toggle
- [x] Implementar renderizado condicional para wizard form
- [x] Actualizar handler onEdit para usar wizard
- [x] Mantener ServicePageForm como opción tradicional
- [ ] Testing de la integración

## Detalles de Implementación

### Patrón seguido (igual que News):
```tsx
// Importar
import ServicesWizardForm from "./components/ServicesWizardForm";

// Estado
const [useWizardForm, setUseWizardForm] = useState(true);

// Toggle buttons
<button onClick={() => setUseWizardForm(true)}>Wizard (Nuevo)</button>
<button onClick={() => setUseWizardForm(false)}>Tradicional</button>

// Renderizado condicional
{useWizardForm ? (
  <ServicesWizardForm isOpen={true} onClose={...} onSaved={...} theme={...} />
) : (
  <ServicePageForm ... />
)}
```

### Cambios en page.tsx:
1. ✅ Importar ServicesWizardForm
2. ✅ Añadir estado useWizardForm (boolean, default true)
3. ✅ Añadir botones toggle en pestaña 'create'
4. ✅ Renderizar ServicesWizardForm cuando useWizardForm es true
5. ✅ Mantener ServicePageForm como fallback tradicional
6. ✅ Actualizar handleEdit para pasar datos iniciales al wizard
7. ✅ Añadir ServicesWizardForm para edición con initialData

### Archivos modificados:
- `/frontend/app/admin/servicios/page.tsx`
  - Import added: `ServicesWizardForm`
  - New state: `useWizardForm`, `editingService`
  - New callback: `handleServiceSaved`
  - Modified: `handleNew`, `handleEdit` (to support wizard)
  - New in 'create' tab: Toggle buttons + conditional rendering
  - New at end: ServicesWizardForm for editing


