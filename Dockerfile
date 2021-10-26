FROM node:14

# Create app directory
WORKDIR /webreport
ENV PATH="/webreport/node_modules/.bin:$PATH"

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install -g react-scripts
RUN npm install react

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3005
CMD ["npm", "start"]
