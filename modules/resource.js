exports = function ( element, name, startingValue, onTick, onClick, label ) {
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
        return Math.floor( value );
    };

    this.update = function () {
        var ticked = this.onTick();
        this.label.lastChild.innerHTML = this.format( this.value );
        this.progress.value = ( this.value * 100 ) % 100;
        this.progress.setAttribute( 'title', this.format(ticked*10) + '/s'+"\n"+ticked+"/tick" );
        this.progress.setAttribute( 'class', ticked < 0 ? 'red-bar' : ( ticked === 0 ? 'blue-bar' : 'green-bar' ) );
    };
    this.update.bind( this );
    this.value = startingValue ? startingValue : 0;

    this.baseValue = this.value;
    this.mods = [];
    this.max = 0;
    this.addMod = function ( mod ) {
        this.mods[mod.priority] = this.mods[mod.priority] ? this.mods[mod.priority] : [];
        if ( mod.early ) {
            this.mods[mod.priority].push( mod );
        } else {
            this.mods[mod.priority].unshift( mod );
        }
        this.max = Math.max( this.max, mod.priority );
    }
    this.get = function () {
        var value = this.baseValue;
        for ( var c = this.max; c >= 0; c-- ) {
            if ( this.mods[c] ) {
                for ( var d = 0; d < this.mods[c].length; d++ ) {
                    value = this.mods[c][d].modify( value, this.baseValue );
                }
            }
        }
        return value;
    }

    this.increase = function ( amount ) {
        this.value += !Number.isNaN( amount ) ? amount : 1;
    }
    this.decrease = function ( amount ) {
        if ( amount > this.value ) {
            throw "Not enough " + this.name;
        }
        this.value -= amount;
    }
    
    this.element = document.createElement('div');
    this.element.setAttribute('class','resource-wrapper');
    
    if ( onClick ) {
        this.button = document.createElement( 'button' );
        this.button.innerHTML = label ? label : name + "-action";
        this.button.onclick = onClick;
    }  else {
        this.button = document.createElement( 'div' );
    }
    this.button.setAttribute('class','button');
    this.element.appendChild( this.button );
    
    this.label = document.createElement( 'div' );
    this.label.setAttribute( 'class', 'resource' );
    this.label.appendChild( document.createElement( 'div' ) );
    this.label.lastChild.innerHTML = this.name.charAt(0).toUpperCase()+this.name.substr(1);
    this.label.appendChild( document.createElement( 'div' ) );
    this.label.lastChild.innerHTML = this.format( Math.floor( this.value ) );
    this.element.appendChild(this.label);
    
    this.progress = document.createElement( 'progress' );
    this.progress.setAttribute( 'value', 0 );
    this.progress.setAttribute( 'max', 100 );
    this.element.appendChild( this.progress );

    element.appendChild( this.element );
    return this;
}
