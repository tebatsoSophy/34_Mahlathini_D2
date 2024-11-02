#tebatso u22611704
FROM node:20
WORKDIR /app

COPY . .
RUN npm install
ENV PORT=5000
CMD ["npm","start"]
EXPOSE 5000