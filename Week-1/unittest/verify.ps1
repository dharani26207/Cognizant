$ErrorActionPreference = "Stop"

# Define directories
$libDir = "lib"
$targetDir = "target/classes"

# 1. Create lib directory if it doesn't exist
if (!(Test-Path $libDir)) {
    New-Item -ItemType Directory -Path $libDir | Out-Null
    Write-Host "Created lib/ directory."
}

# 2. Download JUnit and Hamcrest Core JARs if not present
$junitJar = "$libDir/junit-4.13.2.jar"
$hamcrestJar = "$libDir/hamcrest-core-1.3.jar"

if (!(Test-Path $junitJar)) {
    Write-Host "Downloading JUnit 4.13.2 jar from Maven Central..."
    Invoke-WebRequest -Uri "https://repo1.maven.org/maven2/junit/junit/4.13.2/junit-4.13.2.jar" -OutFile $junitJar
} else {
    Write-Host "JUnit jar already exists."
}

if (!(Test-Path $hamcrestJar)) {
    Write-Host "Downloading Hamcrest Core 1.3 jar from Maven Central..."
    Invoke-WebRequest -Uri "https://repo1.maven.org/maven2/org/hamcrest/hamcrest-core/1.3/hamcrest-core-1.3.jar" -OutFile $hamcrestJar
} else {
    Write-Host "Hamcrest jar already exists."
}

# 3. Clean and recreate build directory
if (Test-Path $targetDir) {
    Remove-Item -Recurse -Force $targetDir
}
New-Item -ItemType Directory -Path $targetDir | Out-Null

# 4. Compile Java files
Write-Host "Compiling Java classes..."
$classpath = "$junitJar;$hamcrestJar"
$sources = Get-ChildItem -Recurse -Filter *.java | Select-Object -ExpandProperty FullName

javac -cp $classpath -d $targetDir $sources
if ($LASTEXITCODE -ne 0) {
    Write-Error "Compilation failed."
    exit 1
}
Write-Host "Compilation successful."

# 5. Run JUnit tests
Write-Host "Running JUnit tests..."
$runClasspath = "$targetDir;$classpath"

java -cp $runClasspath org.junit.runner.JUnitCore com.example.AssertionsTest com.example.CalculatorTest
