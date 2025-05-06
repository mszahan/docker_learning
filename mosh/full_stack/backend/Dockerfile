FROM node:slim

# Create non-root user
RUN groupadd -r app && useradd -m -r -g app app

WORKDIR /app

# Copy files and install dependencies as root
COPY package*.json ./
RUN npm install
COPY . .

# Make sure the app directory is owned by the app user
RUN chown -R app:app /app

# Now switch to the app user
USER app

EXPOSE 3001
CMD ["npm", "start"]
