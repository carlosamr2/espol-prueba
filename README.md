## Links del video y repositorio

 - https://www.youtube.com/watch?v=kRuVfALlFeE
 
 - https://github.com/carlosamr2/espol-prueba

## Pasos para ejecutar el backend

// restaurar paquetes
 - dotnet restore

// eliminar migraciones existentes
 - rm -rf Migrations

// inicializar la base
 - dotnet ef migrations add InitialCreate

// actualizar la base
 - dotnet ef database update

// buildear la app
 - dotnet build

// ejecutar el servidor
 - dotnet run

## Pasos para ejecutar el frontend (node 22)

 - npm i

 - npm run dev

## Pasos para ejecutar la base en docker

 - docker compose up sqlserver --build -d
