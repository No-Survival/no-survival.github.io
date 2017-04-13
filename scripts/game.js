var game = require('game');
(function() {
    game.tick.bind( game );
    game.buttons = document.getElementById( 'buttons' );
    game.labels = document.getElementById( 'stats' );
    game.interval = window.setInterval( game.tick, 100 );
}());
