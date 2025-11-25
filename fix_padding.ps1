# Script to fix padding issue
$pageFile = "app/servicios/page.tsx"
$content = Get-Content $pageFile -Raw
$content = $content -replace "padding: '0',", "padding: '7.5rem 0',"
Set-Content $pageFile $content -NoNewline
