exports = function (wrapper){
    var modifier = require('modifier');
    var resource = require('resource');
    return {
        resources: {
            gold: new resource(wrapper, 'gold', 50,
                              function () {
                                  var tmp = 0.1 * Math.floor(game.resources.house.value) +
                                      0.01 * Math.floor(game.resources.human.value)*(100000000+Math.floor(game.resources.minecart.value))/100000000 +
                                      0.0001 - Math.ceil(game.resources.farm.value) * 0.01 -
                                      Math.ceil(game.resources.minecart.value) * 0.025;
                                  game.resources["gold"].value += tmp;
                                  return tmp;
                              },
                              function () { game.resources.gold.increase( 1 + game.resources.minecart.value); },
                              'Mine' ),
            supplies: new resource(wrapper, 'supplies', 25, function () {
                    var tmp = Math.floor(game.resources.farm.value) * 0.1 - 0.01 * Math.ceil(game.resources.human.value)
                    game.resources.supplies.increase( tmp )
                    return tmp;
                },
                    function () { game.resources.supplies.increase( 1+game.resources.farm.value ) }, 'Gather' ),
            house: new resource( wrapper, 'house', 0, function(event){
                    game.resources.house.increase( 0.00001 * Math.floor(game.resources.human.value-1) );
                    return 0.00001 * Math.floor(game.resources.human.value-1);
                }, function ( event ) {
                    event = event || window.event;
                    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.house.value ) ) {
                        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.house.value ) );
                        game.resources.house.increase( 1 );
                    }
                }, 'Buy' ),
            farm: new resource(wrapper, 'farm', 0, function(event){
                    game.resources.farm.increase( 0.00001 * Math.floor(game.resources.human.value-1) );
                    return 0.00001 * Math.floor(game.resources.human.value-1);
                }, function ( event ) {
                    event = event || window.event;
                    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.farm.value ) ) {
                        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.farm.value ) );
                        game.resources.farm.increase( 1 );
                    }
                }, 'Buy' ),
            minecart: new resource(wrapper, 'minecart', 0, function(event){
                    game.resources.minecart.increase( 0.000001 * Math.floor(game.resources.human.value-1) );
                    return 0.000001 * Math.floor(game.resources.human.value-1);
                }, function ( event ) {
                    event = event || window.event;
                    if ( game.resources.gold.value > 100 * Math.pow( 1.1, game.resources.minecart.value ) ) {
                        game.resources.gold.decrease( 100 * Math.pow( 1.1, game.resources.minecart.value ) );
                        game.resources.minecart.increase( 1 );
                    }
                }, 'Buy' ),
            human: new resource(wrapper, 'human', 1, function () {
                    if ( game.resources['human'].value * 0.01 > game.resources["supplies"].value && game.resources['human'].value > 1 ) {
                        game.resources.human.decrease( 0.01 * Math.ceil(game.resources['human'].value)*0.1 );
                        return -0.01* game.resources['human'].value*0.1;
                    } else if ( game.resources['human'].value < game.resources['house'].value * 10 && game.resources['human'].value >= 2 ) {
                        game.resources.human.increase( 0.01 * Math.floor(game.resources['human'].value)*0.1 );
                        return 0.01* game.resources['human'].value*0.1;
                    }
                    return 0;
                },function(event){
                    game.resources.human.increase( 0.0001 * game.resources.supplies.value );
                    game.resources.supplies.decrease( 0.0001 * game.resources.supplies.value );
                }, 'Hire/Sacrifice' )
        },
        tick: function () {
            for ( var res in game.resources ) {
                game.resources[res].update();
            }
        },
        interval: null
    };
};
