var should = require('chai').should();
describe('game', function() {
  //functions
  describe('#tick()', function() {
    it('tick should be a function', function() {
      game.tick.should.be.a('function');
    });
  });
  describe('#resource()', function() {
    it('resource should be a function', function() {
      game.resource.should.be.a('function');
    });
  });
  describe('#modifier()', function() {
    it('modifier should be a function', function() {
      game.modifier.should.be.a('function');
    });
  });
  //data
  describe('#resources', function() {
    it('resources should be an object', function() {
      game.resources.should.be.a('object');
    });
  });  
});
