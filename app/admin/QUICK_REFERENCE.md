# 🎨 Quick Reference: Componentes UI/UX v2.0

Referencia rápida para uso diario de los componentes del panel admin.

---

## 🔵 Buttons

### Variantes

```tsx
import { Button } from '../components/shared';
import { Save, Trash, Eye, Download } from 'lucide-react';

// Primary (Acción principal)
<Button variant="primary" theme={theme}>
  Guardar
</Button>

// Secondary (Acción secundaria)
<Button variant="secondary" theme={theme}>
  Cancelar
</Button>

// Success (Confirmación positiva)
<Button variant="success" theme={theme} icon={<Save size={18} />}>
  Guardar Cambios
</Button>

// Danger (Acción destructiva)
<Button variant="danger" theme={theme} icon={<Trash size={18} />}>
  Eliminar
</Button>

// Ghost (Acción terciaria/sutil)
<Button variant="ghost" theme={theme} icon={<Eye size={18} />}>
  Ver detalles
</Button>
```

### Tamaños

```tsx
// Pequeño (Para espacios reducidos)
<Button size="sm" variant="primary" theme={theme}>Pequeño</Button>

// Mediano (Default, más común)
<Button size="md" variant="primary" theme={theme}>Mediano</Button>

// Grande (CTAs importantes)
<Button size="lg" variant="primary" theme={theme}>Grande</Button>
```

### Estados

```tsx
// Loading
<Button loading={isSubmitting} variant="primary" theme={theme}>
  Guardar
</Button>

// Disabled
<Button disabled variant="primary" theme={theme}>
  No disponible
</Button>

// Con icono a la izquierda (default)
<Button icon={<Download size={18} />} iconPosition="left">
  Descargar
</Button>

// Con icono a la derecha
<Button icon={<ChevronRight size={18} />} iconPosition="right">
  Siguiente
</Button>
```

### Ejemplos de Grupos

```tsx
// Grupo horizontal
<div className="flex gap-3">
  <Button variant="secondary" theme={theme}>Cancelar</Button>
  <Button variant="primary" theme={theme}>Guardar</Button>
</div>

// Grupo vertical (mobile)
<div className="flex flex-col gap-2">
  <Button variant="primary" theme={theme} className="w-full">Acción 1</Button>
  <Button variant="secondary" theme={theme} className="w-full">Acción 2</Button>
</div>
```

---

## 📝 Form Inputs

### Input Básico

```tsx
import { FormInput } from '../components/shared';
import { User, Mail, Lock, Phone } from 'lucide-react';

// Input simple
<FormInput
  label="Nombre completo"
  placeholder="Juan Pérez"
  theme={theme}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Input con icono
<FormInput
  label="Email"
  type="email"
  icon={<Mail size={18} />}
  placeholder="correo@ejemplo.com"
  theme={theme}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Input requerido
<FormInput
  label="Contraseña"
  type="password"
  icon={<Lock size={18} />}
  required
  theme={theme}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Input con Validación

```tsx
// Con mensaje de error
<FormInput
  label="Email"
  type="email"
  icon={<Mail size={18} />}
  theme={theme}
  required
  error={errors.email}  // "Email inválido"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// Con helper text
<FormInput
  label="Teléfono"
  type="tel"
  icon={<Phone size={18} />}
  theme={theme}
  helperText="Formato: +52 xxx xxx xxxx"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

// Con error y helper
<FormInput
  label="Username"
  icon={<User size={18} />}
  theme={theme}
  required
  error={errors.username}
  helperText={!errors.username && "Solo letras y números"}
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
```

### Textarea

```tsx
// Textarea básica
<FormInput
  variant="textarea"
  label="Descripción"
  rows={4}
  theme={theme}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

// Textarea con validación
<FormInput
  variant="textarea"
  label="Contenido"
  rows={8}
  theme={theme}
  required
  error={errors.content}
  helperText={`${content.length}/500 caracteres`}
  value={content}
  onChange={(e) => setContent(e.target.value)}
  maxLength={500}
/>
```

---

## 🎴 Cards

### Card Básica

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '../components/shared';

<Card theme={theme}>
  <CardBody>
    Contenido de la tarjeta
  </CardBody>
</Card>
```

### Card con Header

```tsx
<Card theme={theme}>
  <CardHeader 
    title="Información del Usuario"
    subtitle="Datos personales y de contacto"
  />
  <CardBody>
    {/* Formulario o contenido */}
  </CardBody>
</Card>
```

### Card con Acción

```tsx
<Card theme={theme}>
  <CardHeader 
    title="Configuración"
    subtitle="Ajustes del sistema"
    action={
      <Button variant="primary" size="sm" theme={theme}>
        Guardar
      </Button>
    }
  />
  <CardBody>
    {/* Opciones */}
  </CardBody>
</Card>
```

### Card Completa

```tsx
<Card theme={theme} hover>
  <CardHeader 
    title="Crear Publicación"
    subtitle="Nueva entrada en el blog"
    action={
      <Button variant="ghost" size="sm" theme={theme}>
        Vista previa
      </Button>
    }
  />
  <CardBody>
    <div className="space-y-4">
      <FormInput label="Título" theme={theme} />
      <FormInput variant="textarea" label="Contenido" rows={6} theme={theme} />
    </div>
  </CardBody>
  <CardFooter theme={theme}>
    <div className="flex justify-end gap-3">
      <Button variant="secondary" theme={theme}>Cancelar</Button>
      <Button variant="primary" theme={theme}>Publicar</Button>
    </div>
  </CardFooter>
</Card>
```

---

## 📊 Stat Cards

### Stat Card Básica

```tsx
import { StatCard } from '../components/shared';
import { Users, DollarSign, TrendingUp, Package } from 'lucide-react';

<StatCard
  title="Total Usuarios"
  value="1,234"
  icon={<Users size={24} />}
  color="blue"
  theme={theme}
/>
```

### Con Subtítulo

```tsx
<StatCard
  title="Ingresos"
  value="$45,231"
  icon={<DollarSign size={24} />}
  color="green"
  theme={theme}
  subtitle="Últimos 30 días"
/>
```

### Con Trend (Tendencia)

```tsx
// Trend positivo
<StatCard
  title="Visitas"
  value="23,456"
  icon={<TrendingUp size={24} />}
  color="purple"
  theme={theme}
  subtitle="Esta semana"
  trend={{ value: 12, isPositive: true }}  // ↑ 12%
/>

// Trend negativo
<StatCard
  title="Productos Agotados"
  value="8"
  icon={<Package size={24} />}
  color="red"
  theme={theme}
  trend={{ value: 5, isPositive: false }}  // ↓ 5%
/>
```

### Colores Disponibles

```tsx
// blue - Azul (Default, información)
<StatCard color="blue" {...props} />

// purple - Morado (Métricas premium)
<StatCard color="purple" {...props} />

// green - Verde (Métricas positivas, ingresos)
<StatCard color="green" {...props} />

// orange - Naranja (Alertas, warnings)
<StatCard color="orange" {...props} />

// red - Rojo (Errores, crítico)
<StatCard color="red" {...props} />

// yellow - Amarillo (Pendientes)
<StatCard color="yellow" {...props} />

// gray - Gris (Neutral)
<StatCard color="gray" {...props} />
```

### Grid de Stats

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
  <StatCard
    title="Usuarios"
    value="1,234"
    icon={<Users size={24} />}
    color="blue"
    theme={theme}
    trend={{ value: 12, isPositive: true }}
  />
  <StatCard
    title="Ventas"
    value="$45,231"
    icon={<DollarSign size={24} />}
    color="green"
    theme={theme}
    trend={{ value: 8, isPositive: true }}
  />
  <StatCard
    title="Productos"
    value="456"
    icon={<Package size={24} />}
    color="purple"
    theme={theme}
  />
  <StatCard
    title="Pendientes"
    value="23"
    icon={<AlertCircle size={24} />}
    color="orange"
    theme={theme}
    trend={{ value: 3, isPositive: false }}
  />
</div>
```

---

## 📋 Tables

### Table Básica

```tsx
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeaderCell, 
  TableCell 
} from '../components/shared';

<Table theme={theme}>
  <TableHead theme={theme}>
    <TableRow theme={theme}>
      <TableHeaderCell theme={theme}>Nombre</TableHeaderCell>
      <TableHeaderCell theme={theme}>Email</TableHeaderCell>
      <TableHeaderCell theme={theme}>Rol</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id} theme={theme}>
        <TableCell theme={theme}>{user.name}</TableCell>
        <TableCell theme={theme}>{user.email}</TableCell>
        <TableCell theme={theme}>{user.role}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

### Table con Empty State

```tsx
import { TableEmptyState } from '../components/shared';
import { Inbox } from 'lucide-react';

<Table theme={theme}>
  <TableHead theme={theme}>
    <TableRow theme={theme}>
      <TableHeaderCell theme={theme}>Producto</TableHeaderCell>
      <TableHeaderCell theme={theme}>Precio</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {products.length === 0 ? (
      <TableEmptyState 
        theme={theme}
        message="No hay productos disponibles"
        icon={<Inbox size={48} />}
      />
    ) : (
      products.map(product => (
        <TableRow key={product.id} theme={theme}>
          <TableCell theme={theme}>{product.name}</TableCell>
          <TableCell theme={theme}>${product.price}</TableCell>
        </TableRow>
      ))
    )}
  </TableBody>
</Table>
```

### Table con Acciones

```tsx
<Table theme={theme}>
  <TableHead theme={theme}>
    <TableRow theme={theme}>
      <TableHeaderCell theme={theme}>Usuario</TableHeaderCell>
      <TableHeaderCell theme={theme}>Estado</TableHeaderCell>
      <TableHeaderCell theme={theme}>Acciones</TableHeaderCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {users.map(user => (
      <TableRow key={user.id} theme={theme}>
        <TableCell theme={theme}>{user.name}</TableCell>
        <TableCell theme={theme}>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
            user.active 
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {user.active ? 'Activo' : 'Inactivo'}
          </span>
        </TableCell>
        <TableCell theme={theme}>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" theme={theme}>
              Editar
            </Button>
            <Button variant="danger" size="sm" theme={theme}>
              Eliminar
            </Button>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## 🎨 Utilidades del Design System

### Obtener Clases de Tema

```tsx
import { getThemeClasses } from '../design-system';

const { background, card, textPrimary, textSecondary } = getThemeClasses(theme);

<div className={background}>
  <div className={card}>
    <h1 className={textPrimary}>Título</h1>
    <p className={textSecondary}>Descripción</p>
  </div>
</div>
```

### Clases de Botones Personalizadas

```tsx
import { getButtonClasses } from '../design-system';

const buttonClasses = getButtonClasses('primary', theme, 'lg');

<button className={buttonClasses}>
  Mi Botón Custom
</button>
```

### Clases de Inputs Personalizadas

```tsx
import { getInputClasses } from '../design-system';

const inputClasses = getInputClasses(theme, hasError);

<input className={inputClasses} />
```

---

## 🔄 Patrones Comunes

### Formulario Completo

```tsx
<Card theme={theme}>
  <CardHeader title="Nuevo Usuario" subtitle="Datos del usuario" />
  <CardBody>
    <div className="space-y-4">
      <FormInput
        label="Nombre completo"
        icon={<User size={18} />}
        theme={theme}
        required
        error={errors.name}
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      
      <FormInput
        label="Email"
        type="email"
        icon={<Mail size={18} />}
        theme={theme}
        required
        error={errors.email}
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      
      <FormInput
        variant="textarea"
        label="Biografía"
        rows={4}
        theme={theme}
        value={formData.bio}
        onChange={(e) => setFormData({...formData, bio: e.target.value})}
      />
    </div>
  </CardBody>
  <CardFooter theme={theme}>
    <div className="flex justify-end gap-3">
      <Button variant="secondary" theme={theme} onClick={onCancel}>
        Cancelar
      </Button>
      <Button 
        variant="primary" 
        theme={theme} 
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Guardar
      </Button>
    </div>
  </CardFooter>
</Card>
```

### Dashboard con Stats y Table

```tsx
<div className="space-y-8">
  {/* Stats Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
    <StatCard
      title="Total Usuarios"
      value="1,234"
      icon={<Users size={24} />}
      color="blue"
      theme={theme}
      trend={{ value: 12, isPositive: true }}
    />
    <StatCard
      title="Activos Hoy"
      value="456"
      icon={<UserCheck size={24} />}
      color="green"
      theme={theme}
    />
    <StatCard
      title="Nuevos"
      value="89"
      icon={<UserPlus size={24} />}
      color="purple"
      theme={theme}
    />
  </div>

  {/* Table */}
  <Card theme={theme}>
    <CardHeader 
      title="Usuarios Recientes"
      action={
        <Button variant="primary" size="sm" theme={theme}>
          Ver todos
        </Button>
      }
    />
    <CardBody>
      <Table theme={theme}>
        {/* Table content */}
      </Table>
    </CardBody>
  </Card>
</div>
```

---

## 💡 Tips Rápidos

### 1. Siempre pasa el theme
```tsx
// ✅ Correcto
<Button variant="primary" theme={theme}>Guardar</Button>

// ❌ Incorrecto (usará light por defecto)
<Button variant="primary">Guardar</Button>
```

### 2. Usa las variantes correctas
```tsx
// Primary - Acción principal
<Button variant="primary">Guardar</Button>

// Secondary - Cancelar/Volver
<Button variant="secondary">Cancelar</Button>

// Success - Confirmar
<Button variant="success">Confirmar</Button>

// Danger - Eliminar
<Button variant="danger">Eliminar</Button>

// Ghost - Acciones sutiles
<Button variant="ghost">Ver más</Button>
```

### 3. Agrupa inputs en formularios
```tsx
<div className="space-y-4">
  <FormInput ... />
  <FormInput ... />
  <FormInput ... />
</div>
```

### 4. Responsive grids
```tsx
// 1 columna en mobile, 2 en tablet, 3 en desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
```

---

## 📱 Responsive Patterns

### Stack en Mobile, Row en Desktop
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <Button>Acción 1</Button>
  <Button>Acción 2</Button>
</div>
```

### Full Width en Mobile
```tsx
<Button className="w-full md:w-auto">
  Botón Responsive
</Button>
```

### Grid Adaptativo
```tsx
// 1 columna → 2 → 3 → 4
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
```

---

**¡Usa esta referencia para desarrollo rápido! 🚀**
