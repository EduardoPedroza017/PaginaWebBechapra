$file = "app/components/HeroSection.tsx"
$content = Get-Content $file -Raw

# Cambiar gap-4 a gap-6
$content = $content -replace 'gap-4 pt-2', 'gap-6 pt-2'

# Mejorar el botón "Explorar servicios"
$oldButton1 = 'px-7 py-3 rounded-full bg-blue-700 text-white font-semibold shadow-lg hover:bg-blue-800 transition-colors duration-200 text-center'
$newButton1 = 'group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center flex items-center justify-center gap-2 transform hover:-translate-y-1'
$content = $content -replace [regex]::Escape($oldButton1), $newButton1

# Agregar icono al botón "Explorar servicios"
$content = $content -replace 'Explorar servicios\s*</a>', @'
Explorar servicios
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-hover:translate-x-1">
                  <path d="M13 7l5 5-5 5M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
'@

# Mejorar el botón "Contactar"
$oldButton2 = 'px-7 py-3 rounded-full bg-white text-blue-700 font-semibold border border-blue-700 shadow hover:bg-blue-50 transition-colors duration-200 text-center'
$newButton2 = 'group px-8 py-4 rounded-full bg-white text-blue-700 font-semibold border-2 border-blue-700 shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all duration-300 text-center flex items-center justify-center gap-2 transform hover:-translate-y-1'
$content = $content -replace [regex]::Escape($oldButton2), $newButton2

# Agregar icono al botón "Contactar"  
$content = $content -replace '(<a[^>]*href="#contacto"[^>]*>)', @'
$1
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                
'@

Set-Content $file $content -NoNewline
Write-Host "Cambios aplicados exitosamente!"
