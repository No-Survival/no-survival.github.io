(function() {
    var game = require('game')(document.getElementById( 'stats' ));
    game.tick.bind( game );
    game.interval = window.setInterval( game.tick, 100 );
    window.game = game;
}());
