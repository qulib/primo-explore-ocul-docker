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
1. Move the Queen's "Privo VE skin" into the primo-explore/custom directory. You can clone the git repo from `https://github.com/qulib/qul-primove`
1. Navigate to `http://localhost:8003/discovery/search?vid=01OCUL_QU:QU_DEFAULT&lang=en` to see the basic VIEW up and running!
