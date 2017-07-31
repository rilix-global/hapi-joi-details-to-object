import Hapi from 'hapi';
import register from '../src/index';
import joi from 'joi';

describe('register', () => {
  it('should return mapped details on error response', (done) => {
    const server = new Hapi.Server();
    server.connection({
      routes: {
        validate: {
          options: {
            abortEarly: false
          }
        }
      }
    });

    server.register(register, () => {
      server.route({
        method: 'post',
        path: '/',
        handler: function (req, reply) {
          return reply('ok');
        },
        config: {
          validate: {
            payload: {
              name: joi.string().required(),
              email: joi.string().email().required()
            }
          }
        }
      });

      server.inject({
        method: 'post',
        url: '/',
        payload: {}
      }, (res) => {
        expect(res.statusCode).toBe(400);
        const payload = JSON.parse(res.payload);
        expect(payload).toHaveProperty('errors');
        expect(payload.errors).toHaveProperty('name');
        expect(payload.errors).toHaveProperty('email');
        expect(payload.errors.name).toHaveProperty('messages', expect.any(Array));
        expect(payload.errors.email).toHaveProperty('messages', expect.any(Array));
        done();
      });
    });
  });
});
