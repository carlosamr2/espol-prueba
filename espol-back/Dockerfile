# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY *.sln .
COPY PoolApi/*.csproj ./PoolApi/
RUN dotnet restore

COPY . .
WORKDIR /app/PoolApi
RUN dotnet tool install --global dotnet-ef
ENV PATH="${PATH}:/root/.dotnet/tools"
RUN rm -rf Migrations
RUN dotnet build

ENTRYPOINT ["dotnet", "PoolApi.dll"]
