FROM node:slim
WORKDIR /app
COPY . .
RUN npm install
ENV API_URL=http://localhost:3000
EXPOSE 5173
RUN groupadd app && useradd -m -g app app
USER app