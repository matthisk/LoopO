import Util from './modules/util';
import Shim from './modules/shim';

import Ball from './modules/game-objects/ball';
import Arc from './modules/game-objects/arc';
import ScoreCounter from './modules/game-objects/score';

import UI from './modules/ui';

import config from './modules/config';

class Game {

	constructor() {
		this.canvas = document.getElementById( 'game-canvas' );
		this.ctx    = this.canvas.getContext( '2d' );	

		this.scoreCounter = new ScoreCounter();
		this.ui     = new UI( this, this.scoreCounter );

		this.init();
	}

	init() {
		this.levelIterator = Game.getNextLevel();
		this.level = this.levelIterator.next().value;

		this.hits = 0;
		this.arc = new Arc( this.level.arc.minSize, this.level.arc.maxSize );
		this.ball = new Ball();

		this.ui.setLevel( this.level.level, this.level.arc.color );
		this.arc.draw( this.ctx, this.level.arc.color );
	}

	start() {
		this.ui.hideStartButton();
		this.ui.showScore();

		window.requestAnimationFrame( this.draw.bind( this, this.ctx ) );
		this.listeners( this.canvas );
	}

	restart() {
		this.scoreCounter.reset();
		this.init();

		this.ui.restart();

		window.requestAnimationFrame( this.draw.bind( this, this.ctx ) );
	}

	listeners( canvas ) {
		canvas.addEventListener( 'click', this.play.bind( this ) );
	}

	play( event ) {
		if( Game.ballInsideArc( this.ball, this.arc ) ) {
			this.hits += 1;
			// config.arc.radius += 10;
			this.scoreCounter.increaseScore( config.levels.score );

			if( this.hits >= config.levels.hits ) {
				this.level = this.levelIterator.next().value;
				this.hits = 0;

				this.ui.setLevel( this.level.level, this.level.arc.color );
			}

			this.arc = new Arc( this.level.arc.minSize, this.level.arc.maxSize );
			this.ball.speed = this.level.ball.speed;
			this.ball.color = this.level.ball.color;

		} else {

			this.ui.die();

			window.cancelAnimationFrame( this.animationRequest );
		}
	}

	draw( ctx, timestamp ) {
		ctx.clearRect( 0, 0, config.canvas.x, config.canvas.y );

		this.arc.draw( ctx, this.level.arc.color );
		this.ball.draw( ctx, timestamp );

		this.animationRequest = window.requestAnimationFrame( this.draw.bind( this, ctx ) );
	}

	static ballInsideArc( ball, arc ) {
		return  ball.rotation >= arc.startAngle - config.arc.allowedOffset && 
				ball.rotation <= arc.endAngle + config.arc.allowedOffset 
				||
				arc.startAngle > arc.endAngle &&
				Math.PI * 2 + ball.rotation >= arc.startAngle - config.arc.allowedOffset &&
				ball.rotation <= arc.endAngle + config.arc.allowedOffset
				||
				arc.startAngle > arc.endAngle &&
				ball.rotation >= arc.startAngle - config.arc.allowedOffset &&
				ball.rotation <= Math.PI * 2 + arc.endAngle + config.arc.allowedOffset;
	} 

	static *getNextLevel() {
		var level = 0;
		var color = config.arc.startColor;

		while(true) {
			level++;
			color[0] = (color[0] + (20 / 360)) % 1;

			yield {
				level : level,
				arc : {
					color : Util.RGBtoString( ...Util.HSVtoRGB(...color) ),
					minSize : 1,
					maxSize : 2
				},
				ball : {
					speed : config.ball.initialSpeed + level * config.levels.speedIncrease,
					color : Util.RGBtoString( ...Util.HSVtoRGB( ...Util.getOppositeColor( ...color ) ) )
				}
			};	
		}
	}

}

var game = new Game();