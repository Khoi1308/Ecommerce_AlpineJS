FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# CMD ["sh", "-c", "npm run migration:run && npm run dev"]
CMD ["npm", "run", "dev"]
