FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

COPY dist /app 

WORKDIR /app

EXPOSE 9000/tcp

ENTRYPOINT ["dotnet", "ServerApp.dll"]
