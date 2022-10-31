# NestJS Template

Template using NestJS framework and TypeORM library

### Folder Structure

```
├─ src/                                  # source folder
|  ├─ application/                       # core folder of the application
|  |  ├─ controllers/
|  |  |  ├─ controller.module.ts         # contains providers and collections of all controllers
|  |  |  └─ <group>/
|  |  |    └─ <group>.controller.ts      # controller file
|  |  ├─ dtos/
|  |  |  ├─ <group>.dto.ts               # data-transfer objects, used to handle and validate requests
|  |  |  └─ index.ts
|  |  ├─ entities/
|  |  |  ├─ <group>.entity.ts            # entity/model file
|  |  |  └─ index.ts                     
|  |  └─ services/
|  |     ├─ service.module.ts            # contains collection of all services
|  |     └─ <group>/
|  |        └─ <group>.service.ts        # service file
|  ├─ shared/                            # contains files that can be used by other parts of the project
|  |  ├─ filters/                       
|  |  |  └─ generic.filter.ts            # filter file for catching exceptions/errors                      
|  |  ├─ helpers/                        # contains reusable helper functions
|  |  └─ typeorm/                       
|  |     └─ typeorm.service.ts           # TypeORM config and datasource
|  ├─ app.module.ts                      # contains files that can be used by other parts of the project
|  └─ main.ts                            # contains files that can be used by other parts of the project
├─ tests/                                # unit and e2e tests
├─ .dockerignore
├─ .eslintrc.js                          # linter config
├─ .gitginore
├─ .prettierrc
├─ docker-compose.yml
├─ Dockerfile
├─ nest-cli.json
├─ package.json
├─ .env.template                         # environment template file
└─ tsconfig.json                         # TypeScript config
```

### Setup

- Install all dependencies using `npm install`
- Create a copy of environment file by running `cp .env.template .env` and set up accordingly
- Run command `docker compose up -d` to initialize database locally
- Start the application using the command `npm start`
- To run in dev mode, you may use the command `npm run start:dev`