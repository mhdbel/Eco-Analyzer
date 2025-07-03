# Eco Analyzer
Environmental impact analysis platform

## Features
- Product carbon footprint calculation
- AI-powered recommendations
- User authentication
- Historical analysis tracking

## Setup
1. `docker-compose up`
2. Run migrations: `npm run migrate`
3. Seed data: `npm run seed`

# Project Structure
eco-analyzer/
├── backend/               # Complete Node.js/Express backend
│   ├── config/            # Configuration files (DB, logger)
│   ├── controllers/       # API controllers
│   ├── migrations/        # Database migrations
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── services/          # Business logic (AI integration, caching)
│   ├── tests/             # Unit/integration tests
│   ├── Dockerfile         # Docker configuration
│   └── app.js             # Main server file
├── frontend/              # React.js frontend
│   ├── public/            # Static assets
│   ├── src/               # React components and logic
│   │   ├── components/    # All UI components
│   │   ├── services/      # API client
│   │   └── App.js         # Main component
│   ├── Dockerfile         # Docker configuration
│   └── package.json       # Dependencies
├── ai-service/            # AI/ML service
│   ├── ai_model.py        # Inference script
│   ├── Dockerfile.ai      # Docker configuration
│   └── requirements.txt   # Python dependencies
├── k8s/                   # Kubernetes manifests
│   ├── deployment.yaml
│   ├── service.yaml
│   └── ingress.yaml
├── .env                   # Environment variables
├── docker-compose.yml     # Local development setup
└── README.md              # Project documentation
