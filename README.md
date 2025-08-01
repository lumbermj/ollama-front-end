# Ollama Frontend

A Vue.js 3 frontend application for interacting with Ollama AI models, built with modern web technologies and containerized for easy deployment.

## 🚀 Features

- **Vue.js 3** with Composition API
- **Bun** as the JavaScript runtime and package manager
- **Tailwind CSS** for utility-first styling
- **TypeScript** support
- **Docker** containerization with multi-stage builds
- **Nginx** for production serving
- **Development and Production** Docker configurations

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (latest version)
- [Docker](https://www.docker.com/) and Docker Compose (for containerized development)
- [Git](https://git-scm.com/)

## 🛠️ Installation & Setup

### Local Development (without Docker)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ollama-frontend
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
    - Navigate to `http://localhost:7000`
    - The development server will automatically reload when you make changes

### Docker Development

#### Option 1: Development Mode (Recommended for Development)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ollama-frontend
   ```

2. **Start the development container**
   ```bash
   docker-compose --profile dev up --build
   ```

3. **Access the application**
    - Open `http://localhost:7000` in your browser
    - Changes to your code will be automatically reflected (hot reload)

#### Option 2: Production Mode

1. **Start the production container**
   ```bash
   docker-compose up --build ollama-frontend
   ```

2. **Access the application**
    - Open `http://localhost:7000` in your browser

## 🏗️ Build Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run lint` | Run linting |
| `bun run format` | Format code |

## 🐳 Docker Commands

### Development
```bash
# Start development environment
docker-compose --profile dev up --build

# Stop development environment
docker-compose --profile dev down

# View logs
docker-compose --profile dev logs -f ollama-frontend-dev
```

### Production
```bash
# Start production environment
docker-compose up --build ollama-frontend

# Stop production environment
docker-compose down

# View logs
docker-compose logs -f ollama-frontend
```

### Useful Docker Commands
```bash
# Rebuild containers
docker-compose build --no-cache

# Remove containers and volumes
docker-compose down -v

# Access container shell
docker-compose exec ollama-frontend-dev sh
```

## 📁 Project Structure

```
ollama-frontend/
├── src/
│   ├── components/          # Vue components
│   │   ├── ChatHeader.vue
│   │   ├── ChatInput.vue
│   │   ├── ChatMessage.vue
│   │   ├── ChatWindow.vue
│   │   ├── ContributorCard.vue
│   │   ├── FloatingNav.vue
│   │   ├── UniversityFooter.vue
│   │   └── UniversityHeader.vue
│   ├── composables/         # Vue composables
│   ├── data/               # Static data files
│   │   └── contributors.ts
│   ├── assets/             # Static assets
│   ├── router/             # Vue Router configuration
│   ├── types/              # TypeScript type definitions
│   ├── views/              # Vue page components
│   ├── App.vue             # Main App component
│   └── main.ts             # Application entry point
├── public/                 # Public static files
├── docker-compose.yaml     # Docker Compose configuration
├── Dockerfile             # Production Docker image
├── Dockerfile.dev         # Development Docker image
├── nginx.conf             # Nginx configuration
├── package.json           # Package dependencies
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process using port 7000
   lsof -ti:7000 | xargs kill -9
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

3. **Bun installation issues**
   ```bash
   # Reinstall Bun
   curl -fsSL https://bun.sh/install | bash
   
   # Clear Bun cache
   bun install --force
   ```

4. **Environment variables not loading**
    - Ensure variables are prefixed with `VITE_`
    - Restart the development server after changing environment variables

### Getting Help

If you encounter issues:

1. Check the [Issues](../../issues) section for known problems
2. Review the Docker logs: `docker-compose logs -f`
3. Verify your backend is running and accessible
4. Ensure all prerequisites are properly installed


## 🙏 Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [Ollama](https://ollama.ai/) - Run large language models locally
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Bun](https://bun.sh/) - Fast JavaScript runtime & package manager