FROM node:20-alpine

# creating a 'app' group and adding it to the "app" user(System user it is)
RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

# Copy the package.json and package-lock.json to the /app directory
# package.json 's are copied first to utilize the docker's cache
COPY --chown=app:app package*.json ./

#install npm dependencies
RUN npm install

#Copy rest of the files to the working directory
COPY --chown=app:app . .

EXPOSE 3002

CMD npm run dev
