FROM node:alpine3.20

RUN addgroup app && adduser -S -G app app

WORKDIR /app

# Copy files as root
COPY package*.json ./

RUN npm install

COPY . . 
RUN chown -R app:app /app
# RUN chmod +x docker-entrypoint.sh

USER app

EXPOSE 3001 

CMD ["npm", "start"]



# FROM node:slim

# # Create non-root user
# RUN groupadd -r app && useradd -m -r -g app app

# WORKDIR /app

# # Copy files and install dependencies as root
# COPY package*.json ./
# RUN npm install
# COPY . .

# # Make sure the app directory is owned by the app user
# RUN chown -R app:app /app

# # Now switch to the app user
# USER app

# EXPOSE 3001
# CMD ["npm", "start"]
