# Solución de Problemas - Búsqueda de Código Postal

## ¿Por qué marca error al buscar un código postal?

Hay varias razones por las que COPOMEX puede no encontrar información:

### 1. **Código Postal No Existe o Es Muy Nuevo**

- COPOMEX tiene datos de la administración postal mexicana
- Códigos postales muy nuevos pueden no estar en su base de datos
- Los datos se actualizan periódicamente

### 2. **Limitaciones del Token "pruebas"**

- El token `pruebas` tiene limitaciones de uso
- Para obtener mejor soporte, necesitas un token de pago en [api.copomex.com](https://api.copomex.com/)

### 3. **Formato Incorrecto**

- El código postal debe tener exactamente 5 dígitos
- No pueden incluir espacios, guiones u otros caracteres

## ✅ Solución: Entrada Manual

Si COPOMEX no encuentra tu código postal, **puedes completar los datos manualmente**:

1. **Buscar el CP en COPOMEX manualmente**
   - Visita: [correodelmexico.gob.mx](https://www.correodelmexico.gob.mx/)
   - Busca tu dirección y obtén el CP correcto
   - O prueba con otros CPs de la zona

2. **Completar los datos en el formulario**
   - Ingresa la calle y número
   - Completa ciudad, estado y país
   - Ingresa el CP manualmente
   - Los datos se guardarán igual en la base de datos

3. **Coordenadas Geográficas**
   - Si necesitas coordenadas exactas, usa [Google Maps](https://maps.google.com)
   - Haz clic derecho en la ubicación para ver latitud y longitud
   - Copialas en los campos de Latitud y Longitud

## 📋 CPs Válidos para Pruebas

Aquí hay algunos códigos postales mexicanos válidos que puedes probar:

- **CDMX**: 06500 (Centro), 06600 (Cuauhtémoc), 03100 (Benito Juárez)
- **Estado de México**: 50000 (Toluca), 53500 (Naucalpan)
- **Jalisco**: 44100 (Guadalajara), 45000 (Zapopan)
- **Guanajuato**: 36000 (Guanajuato), 37000 (León)

## 🔧 Para Desarrolladores

Si necesitas mejorar la búsqueda:

1. **Obtén un Token Pagado de COPOMEX**

   ```env
   NEXT_PUBLIC_COPOMEX_TOKEN=tu_token_pagado_aqui
   ```

2. **Implementar Búsqueda por Colonia**
   - El servicio ya tiene `searchByStateAndMunicipality()`
   - Puedes usarla como alternativa de búsqueda

3. **Integrar otras APIs**
   - Google Maps API para geocodificación
   - Open Street Map para coordenadas
   - INEGI para datos administrativos

## 📞 Contacto

Si tienes problemas persistentes:

1. Verifica que el CP tenga 5 dígitos
2. Intenta con otro CP de la misma región
3. Completa los datos manualmente si es necesario
4. Contacta a COPOMEX si sospechas que el CP no existe
