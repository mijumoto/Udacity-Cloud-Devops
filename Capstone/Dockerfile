FROM node:12.21-buster-slim

ENV PORT 80

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install --production

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build

# Exposing port
EXPOSE 80

# Running the app
CMD [ "npm", "run", "start" ]