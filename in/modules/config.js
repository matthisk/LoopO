import Util from './util';

var startColor = Util.getRandomArbitrary();

var config = {
	font : "'Droid Sans', sans-serif",

	canvas : {
		x : 400,
		y : 400,
	},

	arc : {
		radius : 100,
		lineWidth : 30,
		allowedOffset : 0.09,
		startColor : [startColor, .8, 1]
	},

	ball : {
		radius : 10,
		initialSpeed : 0.8, // Initial speed of the ball in rotations per second,
		color : Util.RGBtoString( ...Util.HSVtoRGB( ...Util.getOppositeColor( ...[ startColor, .8, 1 ] ) ) )
	},

	levels : {
		levels     : [0,1,2,3,4,5,6,7,8,9],
		speedIncrease : 0.1,
		hits : 3,
		score : 50
	},

	multiplier : {
		timeout : 1000
	}
};

export default config;