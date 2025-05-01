FROM node:slim

# Create non-root user and group
RUN groupadd app && useradd -m -g app app

# Set working directory
WORKDIR /app

# Copy only json file for npm install
COPY package*.json .
RUN chown -R app:app /app

# Switch to non-root user
USER app

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Set environment and expose port
ENV API_URL=http://localhost:3000
EXPOSE 5173

# run the application
# shell form
# CMD npm run dev

# exec form
CMD ["npm", "run", "dev"]

# you can use the entrypoint command to run the application
# ENTRYPOINT ["npm", "run", "dev"]