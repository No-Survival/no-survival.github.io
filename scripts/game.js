var game = {
    resources: {},
    tick: function () {
        for ( var res in game.resources ) {
            game.resources[res].update();
        }
    }
};
game.tick.bind( game );
game.interval = window.setInterval( game.tick, 100 );
game.buttons = document.getElementById( 'buttons' );
game.labels = document.getElementById( 'stats' );

game.resource = function ( name, startingValue, onTick, onClick, label ) {
    this.name = name;
    this.onTick = onTick ? onTick : function () { return 0; };
    this.onTick.bind( this );
    this.format = function ( value ) {
        if ( value > 1000000000000000 ) {
            return this.format( value / 1000000000000000 ) + "qi";
        }
        if ( value > 1000000000000 ) {
            return this.format( value / 1000000000000 ) + "qa";
        }
        if ( value > 1000000000 ) {
            return this.format( value / 1000000000 ) + "b";
        }
        if ( value > 1000000 ) {
            return this.format( value / 1000000 ) + "m";
        }
        if ( value > 1000 ) {
            return this.format( value / 1000 ) + "k";
        }
        return Math.floor( value );// + "." + Math.floor( value * 10 ) % 10;
    };

    this.update = function () {
        var ticked = this.onTick();
        this.label.lastChild.previousSibling.innerHTML = this.format( this.value );
        this.progress.value = ( this.value * 100 ) % 100;
        this.progress.setAttribute( 'title', ticked + ' per tick' );
        this.progress.setAttribute( 'class', ticked < 0 ? 'red-bar' : ( ticked === 0 ? 'blue-bar' : 'green-bar' ) );
    };
    this.update.bind( this );
    this.value = startingValue ? startingValue : 0;
    this.increase = function ( amount ) {
        this.value += !Number.isNaN( amount ) ? amount : 1;
    }
    this.decrease = function ( amount ) {
        if ( amount > this.value ) {
            throw "Not enough " + this.name;
        }
        this.value -= amount;
    }
    if ( onClick ) {
        this.button = document.createElement( 'button' );
        this.button.innerHTML = label ? label : name + "-action";
        this.button.onclick = onClick;
        game.buttons.appendChild( this.button );
    }
    this.label = document.createElement( 'div' );
    this.label.setAttribute( 'class', 'resource' );
    this.label.appendChild( document.createElement( 'div' ) );
    this.label.lastChild.innerHTML = this.name;
    this.label.appendChild( document.createElement( 'div' ) );
    this.label.lastChild.innerHTML = this.format( Math.floor( this.value ) );
    game.labels.appendChild( this.label );

    this.progress = document.createElement( 'progress' )
    this.label.appendChild( this.progress );
    this.progress.setAttribute( 'value', 0 );
    this.progress.setAttribute( 'max', 100 );

    game.resources[this.name] = this;
}
game.resources.gold = new game.resource( 'gold', 50,
              function () {
                  var tmp = 0.1 * game.resources.house.value + 0.01 * game.resources.human.value + 0.0001 - game.resources.farm.value*0.01;
                  game.resources["gold"].value += tmp;
                  return tmp;
              },
              function () { game.resources.gold.increase( 1 + game.resources.minecart.value); },
              'Mine gold' );

game.resources.supplies = new game.resource( 'supplies', 25, function () {
    var tmp = game.resources.farm.value * 0.1 - 0.01 * game.resources.human.value
    game.resources.supplies.increase( tmp )
    return tmp;
},
    function () { game.resources.supplies.increase( 1+game.resources.farm.value ) }, 'Gather Supplies' );

game.resources.house = new game.resource( 'house', 0, null, function ( event ) {
    event = event || window.event;
    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.house.value ) ) {
        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.house.value ) );
        game.resources.house.increase( 1 );
    }
}, 'Buy House' );

game.resources.farm = new game.resource( 'farm', 0, null, function ( event ) {
    event = event || window.event;
    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.farm.value ) ) {
        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.farm.value ) );
        game.resources.farm.increase( 1 );
    }
}, 'Buy Farm' );

game.resources.minecart = new game.resource( 'minecart', 0, null, function ( event ) {
    event = event || window.event;
    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.minecart.value ) ) {
        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.minecart.value ) );
        game.resources.minecart.increase( 1 );
    }
}, 'Buy Minecart' );


game.resources.human = new game.resource( 'human', 1, function () {
    if ( game.resources['human'].value * 0.01 > game.resources["supplies"].value && game.resources['human'].value > 1 ) {
        game.resources.human.decrease( 0.01 );
        return -0.01;
    } else if ( game.resources['human'].value < game.resources['house'].value * 10 ) {
        game.resources.human.increase( 0.01 );
        return 0.01;
    }
    return 0;
} );