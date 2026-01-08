# DOTNET + Angular Demo Dating App

## What is this?

Demo project created with .NET and Angular. Part of Udemy course [_Build an app with ASPNET Core and Angular from scratch_](https://www.udemy.com/course/build-an-app-with-aspnet-core-and-angular-from-scratch)

## Demo

The easiest way to run the app is to check out the online demo.

Demo is available at [https://da-2026-nd.azurewebsites.net/](https://da-2026-nd.azurewebsites.net/)

Note that the demo site sleeps between usage so it will take a few seconds to first load.

### Credentials

#### Login as admin user with credentials:

- Email: admin@test.com
- Password: Pa$$w0rd

#### Login as regular member:

- Email: lisa@test.com
- Password: Pa$$w0rd

## Technologies

- Backend: .NET 10
- Frontend: Angular 21
- ASP Identity
- Entity Framework
- SignalR
- Azure
- SQL Server

## Features

- Login, Register, Logout
- User profile and editing
- Instant messaging – SignalR Messages Hub allows for real-time communication between users (no need to refresh the page)
- Presence detection – SignalR Presence Hub tracks which chat user is currently in (if any) and notifies user of new messages when user is outside chat
- Image upload, favouriting, deletion
- Like/Unlike other users (liked users appear on Lists page)
- Results pagination (Messages page, Matches page)
- Results filtering (Matches page)
- Admin/Moderation panel
- Roles: Admin, Moderator, Member (admin users can manage user roles; moderators can approve photos)

## Can this be run locally?

Yes, but it requires a little set up first. You'll need:

- .NET 10
- Node.js and NPM
- Docker (Docker contains an instance of SQL Server)
- Sign up to [Cloudinary](https://cloudinary.com/) and get your own Cloudinary credentials (Cloudinary stores the uploaded images)

### Backend app settings

In API directory, create a file called `appsettings.Development.json` and add the following:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Information"
    }
  },
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=datingdb;User Id=SA;Password=Password@1;TrustServerCertificate=true"
  },
  "TokenKey": "ThisIsASuperSecretKeyThisIsASuperSecretKeyThisIsASuperSecretKeyThisIsASuperSecretKey" // Needs to be at least 64 characters in length
}
```

Again in API directory, create a file called `appsettings.json` and add the following:

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "CloudinarySettings": {
    "CloudName": "{Your Cloudinary Cloud Name}",
    "ApiKey": "{Your Cloudinary API Key}",
    "ApiSecret": "{Your Cloudinary API Secret}"
  },
  "AllowedHosts": "*"
}
```

### OPTION 1 (Recommended): Running the app with a single server and pre-built frontend (frontend build is found in API/wwwroot)

1. Open Docker.
2. Run the following command:

```
docker compose up -d
```

3. Navigate to the API directory and run the following command:

```
cd API
dotnet run
```

4. Navigate to [https://localhost:5001](https://localhost:5001) to see the app.

5. When finished, run the following command:

```
docker compose down
```

### OPTION 2: Running the app with both a backend server and a fronend server (not using pre-built frontend)

1. Open Docker.
2. Run the following command:

```
docker compose up -d
```

3. Navigate to the API directory and run the following command to start backend server:

```
cd API
dotnet run
```

4. Navigate to the client directory, install dependencies, and run the server:

```
cd client
npm install
ng serve
```

5. Navigate to [http://localhost:4200](http://localhost:4200) to see the app.

6. When finished, run the following command:

```
docker compose down
```

### HTTPS

The app runs on HTTPS by default.

To set up self-signed certificates:

1. For DOTNET read the [documentation](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs)
2. For the frontend (if running frontend server separately), you can create a self-signed certificate using [mkcert](https://github.com/FiloSottile/mkcert).

### Build the frontend

If you make changes to the frontend and wish to rebuild, run:

```
cd client
ng build
```

## Making manual changes to the csproj file

If you make changes to the csproj file, run the following command to resync the project before building:

```
cd api
dotnet restore
```
