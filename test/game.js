var should = require('chai').should();
require('fake-dom');
document.getElementsByTagName('body')[0].setAttribute('id','stats');
describe('game', function() {
  var game = require('../modules/game');
  console.log(typeof game);
  console.log(game);
  var fakeBody = document.getElementsByTagName('body')[0];
  it('game should be an function', function() {
    game.should.be.a('function');
  });
  //functions
  describe('#tick()', function() {
    it('tick should be a function', function() {
      game(fakeBody).tick.should.be.a('function');
    });
  });
  //data
  describe('#resources', function() {
    it('resources should be an object', function() {
      game(fakeBody).resources.should.be.a('object');
    });
  });  
});
