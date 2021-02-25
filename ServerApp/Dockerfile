FROM mcr.microsoft.com/dotnet/sdk:3.1 as build
WORKDIR /app

COPY ["ServerApp.csproj", "./"]
RUN dotnet restore 

COPY . .
RUN dotnet build -o build

FROM mcr.microsoft.com/dotnet/aspnet:3.1 as base
EXPOSE 9000
EXPOSE 9001
EXPOSE 90
WORKDIR /app
COPY --from=build /app/build .
ENTRYPOINT ["dotnet", "ServerApp.dll"]
