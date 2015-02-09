import config from './config';

export default class UI {

	constructor( game, scoreCounter ) {
		this.game = game;
		this.scoreCounter = scoreCounter;
		
		this.container = document.getElementById( 'score-container' );

		this.startButton = document.getElementById( 'start-btn' );
		this.replayButton = document.getElementById( 'replay-btn' );
		this.level = document.getElementById( 'level' );
		this.score = document.getElementById( 'score' );
		this.scoreIncrease = document.getElementById( 'score-increase' );
		this.multiplier = document.getElementById( 'multiplier' );

		this.center( this.startButton, this.replayButton, this.level, this.score, this.scoreIncrease, this.multiplier );

		UI.move( this.level, -20, "top" );
		UI.move( this.scoreIncrease, 25, "top" );
		UI.move( this.multiplier, config.arc.radius - config.arc.lineWidth - 5, "left" );
		UI.move( this.multiplier, 6, "top" );

		this.hideScore();
		this.createHandlers();
	}

	center( ...els ) {
		for( var element of els ) {
			element.style.left = `${config.canvas.x / 2 - element.offsetWidth / 2}px`; 
			element.style.top = `${config.canvas.y / 2 - element.offsetHeight / 2}px`; 
		}
	}

	setLevel( level, color ) {
		this.level.innerHTML = level;
		this.level.style.color = color;
	}

	setScore( value ) {
		this.score.innerHTML = value;
	}

	setScoreIncrease( value ) {
		if( value !== "" ) {
			this.scoreIncrease.innerHTML = `+${value}`;

			UI.fadeIn( this.scoreIncrease, UI.fadeOut.bind( this, this.scoreIncrease ) );			
		}
	}

	setMultiplier( value ) {
		if( value === 'reset' ) {
			var multiplier = parseFloat( this.multiplier.innerHTML );

			(function decrease() {
				if( multiplier > 1 ) {
					multiplier = Math.floor( (multiplier - .01) * 100 ) / 100;
					this.multiplier.innerHTML = `${multiplier}x`;
					requestAnimationFrame( decrease );
				} else {
					this.multiplier.innerHTML = '';
				}
			}.bind(this))();

		} else {
			this.multiplier.innerHTML = value > 1 ? value + 'x' : '';
		}
	}

	hideStartButton() {
		this.startButton.style.visibility = 'hidden';
	}

	hideReplayButton() {
		this.replayButton.style.visibility = 'hidden';
	}

	showReplayButton() {
		this.replayButton.style.visibility = 'visible';
	}

	createHandlers() {
		this.startButton.addEventListener( 'click', this.game.start.bind( this.game ) );
		this.replayButton.addEventListener( 'click', this.game.restart.bind( this.game ) );

		this.scoreCounter.on( "score", this.setScore.bind( this ) );
		this.scoreCounter.on( "score-increase", this.setScoreIncrease.bind( this ) );
		this.scoreCounter.on( "multiplier", this.setMultiplier.bind( this ) );
	}

	hideScore() {
		this.scoreIncrease.style.display = 'none';
		this.multiplier.style.display = 'none';
		this.level.style.display = 'none';
	}

	showScore() {
		this.scoreIncrease.style.display = 'block';
		this.multiplier.style.display = 'block';
		this.level.style.display = 'block';
	}

	die() {
		UI.move( this.score, -40, "top" );

		this.showReplayButton();

		this.hideScore();
	}

	restart() {
		UI.move( this.score, 40, "top" );

		this.hideReplayButton();

		this.showScore();
	}

	static fadeIn( el, onComplete = undefined ) {
		el.style.display = 'block';
		el.style.opacity = 0;

		(function fade() {
			var val = parseFloat( el.style.opacity );
			if( ( val += .1 ) <= 1 ) {
				el.style.opacity = val;
				requestAnimationFrame( fade );
			} else if( onComplete !== undefined ) {
				onComplete();
			}
		})();
	}

	static fadeOut( el ) {
		el.style.opacity = 1;

		(function fade() {
			if( ( el.style.opacity -= .1 ) < 0 ) {
				el.style.display = 'none';
			} else {
				requestAnimationFrame( fade );
			}
		})();
	}

	static move( el, px, dir = "top" ) {
		el.style[ dir ] = parseInt( el.style[ dir ] ) + px + "px";
	}

}