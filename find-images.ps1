# Find all images in the uploads directory
$uploadsPath = "c:\git\ansa\apps\web\public\uploads"
$outputFile = "c:\git\ansa\found-images.txt"

"Scanning: $uploadsPath" | Out-File $outputFile -Encoding utf8
"" | Out-File $outputFile -Append

if (Test-Path $uploadsPath) {
    "Directory exists!" | Out-File $outputFile -Append
    "" | Out-File $outputFile -Append
    
    $images = Get-ChildItem -Path $uploadsPath -Recurse -File | Where-Object {
        $_.Extension -match '\.(jpg|jpeg|png|gif|webp|bmp|svg)$'
    }
    
    "Found $($images.Count) images:" | Out-File $outputFile -Append
    "" | Out-File $outputFile -Append
    
    foreach ($img in $images) {
        $relativePath = $img.FullName.Replace("c:\git\ansa\apps\web\public\", "").Replace("\", "/")
        "/$relativePath" | Out-File $outputFile -Append
    }
} else {
    "Directory does NOT exist!" | Out-File $outputFile -Append
}

"" | Out-File $outputFile -Append
"Done!" | Out-File $outputFile -Append





