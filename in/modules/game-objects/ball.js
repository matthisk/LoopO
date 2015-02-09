import config from '../config';

class Ball {

	constructor() {
		this.start = -1;
		this.offset = 0;
		this.color = config.ball.color;
		this.radius = config.ball.radius;
		this._speed =  config.ball.initialSpeed;
	}

	draw( ctx, timestamp ) {
		if( this.start < 0 ) {
			this.start = timestamp
		}

		var progress = (timestamp - this.start) / 1000;
		this.rotation = (this.offset + progress * this._speed * Math.PI * 2) % (Math.PI * 2);
		ctx.save();

		ctx.translate( config.canvas.x / 2, config.canvas.y / 2 );
		ctx.rotate( this.rotation );
		ctx.translate( config.arc.radius, 0 );

		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc( 0, 0, config.ball.radius, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
	}

	set speed( value ) {
		this.start = -1;
		this.offset = this.rotation;
		this._speed = value;
	}

}

export default Ball;