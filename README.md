# Post-Comment Microservices

A microservices-based application for creating posts and comments, demonstrating event-driven architecture, service decoupling, and Kubernetes orchestration.

## Architecture Overview

This project consists of several Node.js microservices and a React client, all orchestrated with Kubernetes and managed locally with Skaffold. The services communicate via HTTP and an event bus, following an event-driven pattern.

### Services

- **posts**: Handles post creation and emits `PostCreated` events.
- **comments**: Handles comment creation for posts, emits `CommentCreated` events, and listens for moderation results.
- **query**: Aggregates posts and comments for efficient querying by the client, updating its store based on events.
- **moderation**: Listens for new comments, applies simple moderation logic, and emits `CommentModerated` events.
- **event-bus**: Receives all events and dispatches them to all other services.
- **client**: React frontend for creating posts and comments and viewing the aggregated data.

### Event Flow

1. **Post Creation**:  
   - Client sends a request to the posts service.
   - Posts service emits a `PostCreated` event via the event bus.
   - Query service updates its store.

2. **Comment Creation**:  
   - Client sends a request to the comments service.
   - Comments service emits a `CommentCreated` event.
   - Moderation service receives the event, checks the comment, and emits a `CommentModerated` event.
   - Comments and query services update their data accordingly.

### Technologies

- Node.js (Express) for backend services
- React for frontend
- Docker for containerization
- Kubernetes for orchestration (YAML manifests in `infra/k8s/`)
- Skaffold for local development workflow

## Local Development

### Prerequisites

- Docker
- Kubernetes (e.g., Docker Desktop, Minikube)
- Skaffold

### Running Locally

1. **Start Kubernetes Cluster**  
   Ensure your Kubernetes cluster is running.

2. **Install Skaffold**  
   [Skaffold installation guide](https://skaffold.dev/docs/install/)

3. **Run Skaffold**  
   From the project root, run:
   ```bash
   skaffold dev
   ```
   This will build all images, deploy services, and watch for changes.

4. **Access the App**  
   The client is exposed via an Ingress. Check `infra/k8s/ingress-srv.yaml` for the hostname (commonly `localhost` or a custom domain with `/etc/hosts` entry).

## Project Structure

```
client/         # React frontend
comments/       # Comments microservice
event-bus/      # Event bus microservice
moderation/     # Moderation microservice
posts/          # Posts microservice
query/          # Query microservice
infra/k8s/      # Kubernetes manifests
skaffold.yaml   # Skaffold configuration
```

## Kubernetes Manifests

All deployment and service YAMLs are in `infra/k8s/`. Each service has its own deployment, and the client is exposed via an Ingress.

## Skaffold

The `skaffold.yaml` file defines how each service is built and deployed, enabling rapid local development with hot reloading.

## Extending the Project

- Add more event types or services by following the event-driven pattern.
- Enhance moderation logic in the moderation service.
- Add persistent storage (e.g., databases) for production use.


