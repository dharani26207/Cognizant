$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

# Define directories
$libDir = "lib"
$targetDir = "target/classes"

# 1. Create lib directory if it doesn't exist
if (!(Test-Path $libDir)) {
    New-Item -ItemType Directory -Path $libDir | Out-Null
    Write-Host "Created lib/ directory."
}

# 2. Define dependencies to download
$dependencies = @(
    @{
        Name = "junit-platform-console-standalone-1.10.2.jar"
        Url  = "https://repo1.maven.org/maven2/org/junit/platform/junit-platform-console-standalone/1.10.2/junit-platform-console-standalone-1.10.2.jar"
    },
    @{
        Name = "mockito-core-5.11.0.jar"
        Url  = "https://repo1.maven.org/maven2/org/mockito/mockito-core/5.11.0/mockito-core-5.11.0.jar"
    },
    @{
        Name = "byte-buddy-1.14.12.jar"
        Url  = "https://repo1.maven.org/maven2/net/bytebuddy/byte-buddy/1.14.12/byte-buddy-1.14.12.jar"
    },
    @{
        Name = "byte-buddy-agent-1.14.12.jar"
        Url  = "https://repo1.maven.org/maven2/net/bytebuddy/byte-buddy-agent/1.14.12/byte-buddy-agent-1.14.12.jar"
    },
    @{
        Name = "objenesis-3.3.jar"
        Url  = "https://repo1.maven.org/maven2/org/objenesis/objenesis/3.3/objenesis-3.3.jar"
    }
)

# Download dependencies
foreach ($dep in $dependencies) {
    $filePath = Join-Path $libDir $dep.Name
    if (!(Test-Path $filePath)) {
        Write-Host "Downloading $($dep.Name) from Maven Central..."
        Invoke-WebRequest -Uri $dep.Url -OutFile $filePath
    } else {
        Write-Host "$($dep.Name) already exists."
    }
}

# 3. Clean and recreate build directory
if (Test-Path $targetDir) {
    Remove-Item -Recurse -Force $targetDir
}
New-Item -ItemType Directory -Path $targetDir | Out-Null

# 4. Compile Java files
Write-Host "Compiling Java classes..."
$classpath = "$libDir/junit-platform-console-standalone-1.10.2.jar;$libDir/mockito-core-5.11.0.jar;$libDir/byte-buddy-1.14.12.jar;$libDir/byte-buddy-agent-1.14.12.jar;$libDir/objenesis-3.3.jar"
$sources = Get-ChildItem -Recurse -Filter *.java | Select-Object -ExpandProperty FullName

javac -cp $classpath -d $targetDir $sources
if ($LASTEXITCODE -ne 0) {
    Write-Error "Compilation failed."
    exit 1
}
Write-Host "Compilation successful."

# 5. Run JUnit 5 tests
Write-Host "Running Mocking JUnit tests..."
$runClasspath = "$targetDir;$classpath"

java -jar "$libDir/junit-platform-console-standalone-1.10.2.jar" --class-path $runClasspath --select-class com.example.MyServiceTest
