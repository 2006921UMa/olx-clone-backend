// swagger.js

const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = [
  './routes/ad.routes.js',
  './routes/auth.routes.js',
  './routes/category.routes.js',
  './routes/favorite.routes.js',
  './routes/message.routes.js',
  './routes/user.routes.js'
];

const doc = {
  info: {
    title: 'OLX Clone API',
    description: 'Documentação gerada automaticamente para o projeto final da UC Desenvolvimento Web Back-End.'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

swaggerAutogen(outputFile, endpointsFiles, doc);

