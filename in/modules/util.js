class Util {
	static getRandomArbitrary( min = 0, max = 1 ) {
		return Math.random() * (max - min) + min;
	}

	static getRandomInt( min = 0, max = 1 ) {
		return Math.floor( Math.random() * (max - min) ) + min;
	}

	static getBaseLog( x, y ) {
		return Math.log(y) / Math.log(x);
 	}

 	static DegreeToRadian( d ) {
 		return d * Math.PI / 180;
 	}

 	static HSVtoRGB(h, s, v) {
	    var r, g, b, i, f, p, q, t;
	    if (h && s === undefined && v === undefined) {
	        s = h.s, v = h.v, h = h.h;
	    }
	    i = Math.floor(h * 6);
	    f = h * 6 - i;
	    p = v * (1 - s);
	    q = v * (1 - f * s);
	    t = v * (1 - (1 - f) * s);
	    switch (i % 6) {
	        case 0: r = v, g = t, b = p; break;
	        case 1: r = q, g = v, b = p; break;
	        case 2: r = p, g = v, b = t; break;
	        case 3: r = p, g = q, b = v; break;
	        case 4: r = t, g = p, b = v; break;
	        case 5: r = v, g = p, b = q; break;
	    }	
	    return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
	}

 	static RGBtoString( r, g, b ) {
 		return `rgb(${r},${g},${b})`;
 	}

 	static getOppositeColor( h, s, v ) {
 		return [ (h + .5) % 1, s, v ];
 	}
}

export default Util;