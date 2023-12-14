const Cluster_test = require('../src/server/models/test_models/cluster_test');
const User_test = require('../src/server/models/test_models/user_test');

describe('Cluster model unit tests', () => {
  beforeAll((done) => {
    Cluster_test.deleteMany({});
    done();
  });

  describe('sync', () => {
    it('adds valid clusters to Cluster model', () => {
      const newCluster = {
        clusterName: 'kubikTest',
        clusterUrl: 'http://localhost:3000',
      };
      const result = Cluster_test.create(newCluster);
      expect(result).not.toBeInstanceOf(Error);
    });
  });

  it('does not add invalid clusters to Cluster model', () => {
    const newCluster = {
      clusterName: 2,
      clusterUrl: '',
    };
    const result = Cluster_test.create(newCluster);
    expect(result).toBeInstanceOf(Error);
  });
});

describe('User model unit tests', () => {
  beforeAll((done) => {
    User_test.deleteMany({});
    done();
  });

  describe('sync', () => {
    it('adds user to User model', () => {
      const newUser = {
        firstName: 'first',
        lastName: 'last',
        username: 'username',
        password: 'password',
      };
      const result = User_test.create(newUser);
      expect(result).not.toBeInstanceOf(Error);
    });
    it('hashes user password', () => {
      const newUser = {
        firstName: 'first',
        lastName: 'last',
        username: 'username',
        password: 'password',
      };
      const create = User_test.create(newUser);
      const hashed = User_test.findONe({ username: 'username' });
      expect(hashed).not.toEqual(newUser.password);
    });
  });
});
