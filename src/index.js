import joiDetailsToObject from './joi-details-to-object';

register.attributes = { name: 'joi-details-to-object' };
export default function register(server, options, next) {
  server.ext('onPreResponse', (req, reply) => {
    const response = req.response;

    if (
      response.isBoom &&
      response.data &&
      response.data.isJoi &&
      req.headers['content-type'] === 'application/json'
    ) {
      response.output.payload.errors = joiDetailsToObject(response.data.details);
    }
    reply.continue();
  });

  next();
}
