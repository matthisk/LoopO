import Event from '../event';
import config from '../config';

export default class ScoreCounter extends Event {
	constructor() {
		super();

		this.reset();
	}

	increaseScore( value ) {
		if( Date.now() - this.lastIncrease < config.multiplier.timeout ) {
			this.multiplier = Math.floor( (this.multiplier + .1) * 10 ) / 10;
		}

		var increase = Math.round( value * this.multiplier );
		this.score += increase;

		this.trigger( "multiplier", this.multiplier );
		this.trigger( "score-increase", increase );
		this.trigger( "score", this.score );

		this.lastIncrease = Date.now();
		this.controlMultiplier();
	}

	controlMultiplier() {
		if( Date.now() - this.lastIncrease > config.multiplier.timeout ) {
			this.multiplier = 1.0;
			this.trigger( "multiplier", "reset" );
		}

		requestAnimationFrame( this.controlMultiplier.bind( this ) );
	}

	reset() {
		this.score = 0;
		this.increasing = -1;
		this.multiplier = 1.0;
		this.lastIncrease = -Infinity;

		this.trigger( "score", this.score );
		this.trigger( "score-increase", "" );
	}
}