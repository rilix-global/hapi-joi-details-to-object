import joiDetailsToObject from '../src/joi-details-to-object';

describe('joiDetailsToObject()', () => {
  describe('joi < 11.0.0', () => {
    it('transform Joi details into mapped object', () => {
      const fakeDetails = [
        {
          path: 'name',
          someValue: 'value',
          message: 'some message'
        },
        {
          path: 'path.one',
          oneValue: 'value',
          message: 'some message one'
        },
        {
          path: 'path.two',
          twoValue: 'value',
          message: 'some message two'
        },
        {
          path: 'path.two.three',
          threeValue: 'value',
          message: 'some message three'
        }
      ];
  
      const object = joiDetailsToObject(fakeDetails);
  
      expect(object).toEqual({
        'name': {
          path: 'name',
          someValue: 'value',
          messages: ['some message']
        },
        path: {
          one: {
            path: 'path.one',
            oneValue: 'value',
            messages: ['some message one']
          },
          two: {
            path: 'path.two',
            twoValue: 'value',
            messages: ['some message two'],
            three: {
              path: 'path.two.three',
              threeValue: 'value',
              messages: ['some message three']
            }
          }
        }
      });
    });
  });

  describe('joi > 11.0.0', () => {
    it('transform Joi details into mapped object', () => {
      const fakeDetails = [
        {
          path: ['name'],
          someValue: 'value',
          message: 'some message'
        },
        {
          path: ['path', 'one'],
          oneValue: 'value',
          message: 'some message one'
        },
        {
          path: ['path', 'two'],
          twoValue: 'value',
          message: 'some message two'
        },
        {
          path: ['path', 'two', 'three'],
          threeValue: 'value',
          message: 'some message three'
        }
      ];
  
      const object = joiDetailsToObject(fakeDetails);
  
      expect(object).toEqual({
        'name': {
          path: ['name'],
          someValue: 'value',
          messages: ['some message']
        },
        path: {
          one: {
            path: ['path', 'one'],
            oneValue: 'value',
            messages: ['some message one']
          },
          two: {
            path: ['path', 'two'],
            twoValue: 'value',
            messages: ['some message two'],
            three: {
              path: ['path', 'two', 'three'],
              threeValue: 'value',
              messages: ['some message three']
            }
          }
        }
      });
    });
  })
});
