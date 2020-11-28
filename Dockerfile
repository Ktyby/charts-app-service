FROM node:8
LABEL maintainer="kutskolukes@gmail.com"
COPY . /
RUN npm
EXPOSE 3000
CMD [ "npm", "start" ]
