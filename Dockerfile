# for use with 
# https://github.com/TentaP/TentaPhttps://github.com/TentaP/TentaP

FROM node:slim

WORKDIR /srv/app

ENV PATH /srv/app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

run npm install

COPY . ./
