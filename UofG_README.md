# The Primo New UI Customization Workflow Development Environment - Additional Notes
### Getting started in Docker
1. With the Docker daemon running, build the Docker image.
      ```sh
      docker-compose build
      ```
1. Run the container service
      ```sh
      # The 'up' command will deploy any dependent services,
      # and run with the service's ports enabled and mapped to the host.
      docker-compose up web
      ```
1. Navigate to `http://localhost:8003/discovery/search?vid=01OCUL_GUE:GUELPH&lang=en` to see the basic VIEW up and running!

## Steps to get the env running - non docker version

1. To ensure gulp is found (mostly a Windows OS issue): edit PATH environment variable and add %APPDATA%\npm
    * Right click My Computer/ This Pc and click on properties
    * Go to Advance System Settings and it will open system properties windows
    * Click on Environment Variables it will open an environment and system variables windows
    * You can edit Path under user or System
2. Reopen cmd.
3. open terminal in C:\gitdev\primo-explore-devenv\ and run: gulp run --view GUELPH
4. browser view: http://localhost:8003/primo-explore/search?vid=GUELPH&sortby=rank&lang=en_US