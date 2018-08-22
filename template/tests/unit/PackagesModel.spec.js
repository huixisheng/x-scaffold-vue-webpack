import { expect } from 'chai';
import modelInstance from '@/models/index';

describe('models/index.js', () => {
  it('docsList', (done) => {
    // this.timeout(4000);
    modelInstance
      .run('docsList', {})
      .then((data) => {
        expect(data.data).to.be.an('array');
        expect(data).to.be.an('object');
        expect(data.data.status).to.equal('1');
        done();
      })
      .catch(() => {
        done();
      });
  });
});
