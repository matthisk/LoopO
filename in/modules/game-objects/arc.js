import config from '../config';
import Util from '../util';

export default class Arc {
	constructor( minSize, maxSize ) {
		this.startAngle = Util.getRandomArbitrary(0, Math.PI * 2);
		this.endAngle   = (this.startAngle + Util.getRandomArbitrary( minSize, maxSize ) ) % (Math.PI * 2);

		var arc = new Path2D();

		arc.arc( config.canvas.x / 2, config.canvas.y / 2, config.arc.radius, this.startAngle, this.endAngle );

		this.arc = arc;
	}

	draw( ctx, color ) {
		ctx.strokeStyle = color;
		ctx.lineWidth = config.arc.lineWidth;
		ctx.lineCap = 'round';

		ctx.beginPath();
		ctx.stroke( this.arc );
	}
}

