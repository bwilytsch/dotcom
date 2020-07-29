FROM node:12

# Creaet app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copy source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Run app
CMD "npm" "start"
