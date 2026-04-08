$path = 'c:\Users\palay\OneDrive\Documents\projects\codev\frontend\pages\room\[id].js'
$content = [System.IO.File]::ReadAllText($path)
Write-Host "Last 50 chars (hex):"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($content[-50..-1] -join '')
foreach ($b in $bytes) { Write-Host -NoNewline ("{0:X2} " -f $b) }
Write-Host ""
Write-Host "Last 100 chars raw:"
Write-Host $content.Substring([Math]::Max(0, $content.Length - 100))
