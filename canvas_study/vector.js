// Javascript name:"vector.js"

var vector = function vector(x, y) {
    this.x = x;
    this.y = y;
}

vector.prototype.abs = function() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

vector.prototype.angle = function() {
    return (1 - this.x/Math.abs(this.x)) * (Math.PI/2) + Math.atan(this.y/this.x);
};

vector.prototype.minus = function() {
    return new this.constructor(-this.x, -this.y);
};

vector.prototype.length = function() {
    return this.abs();
};

vector.prototype.toString = function() {
    return this.x + ' + j * ' + this.y;
};

vector.prototype.moveTo = function(v) {
    if (!this.constructor.is_vector(v)) throw new Error('Not Vector.');
    return this.constructor.sum(v, this);
};

vector.prototype._draw_vector = function(ctx, sx, sy, fragment_len) {
    var fragment_len = fragment_len || 5;
    var count = Math.floor(this.length() / (fragment_len * 2));
    var ang = this.angle();
    var dx = fragment_len * Math.cos(ang);
    var dy = fragment_len * Math.sin(ang);
    // draw
    ctx.beginPath();
    for (var i=0; i<count; i++) {
        even = 2*i;
        ctx.moveTo(sx + even*dx, sy+even*dy);
        ctx.lineTo(sx + (even+1)*dx, sy + (even+1)*dy);
    }
    ctx.stroke();
};

vector.prototype.draw = function (ctx, sx, sy) {
    var sx = sx || 0;
    var sy = sy || 0;

    // arrow variables:
    var sideLen = 10;
    var angleOffset = 30 * Math.PI / 180;
    var xymto = this.moveTo(new this.constructor(sx, sy));
    var side_left_vector  = this.constructor.complex2vector(sideLen, Math.PI + this.angle() + angleOffset);
    var side_right_vector = this.constructor.complex2vector(sideLen, Math.PI + this.angle() - angleOffset);
    var leftmto = side_left_vector.moveTo(xymto);
    var rightmto = side_right_vector.moveTo(xymto);

    // draw lines:
    this._draw_vector(ctx, sx, sy);

    //draw arrow:
        // right:
    ctx.beginPath();
    ctx.moveTo(xymto.x, xymto.y);
    ctx.lineTo(rightmto.x, rightmto.y);
        //left:
    ctx.moveTo(xymto.x, xymto.y);
    ctx.lineTo(leftmto.x, leftmto.y);
    ctx.stroke();

    ctx.font = 'Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillText(this.toString(), xymto.x+5, xymto.y-5);
};

// A*exp(j*theta) = A*cos(theta) + j*A*sin(theta);
vector.complex2vector = function (A, theta) {
    return new this(A*Math.cos(theta), A*Math.sin(theta));
};

vector.magnitude = function(av, bv) {
    if (!(this.is_vector(av) && this.is_vector(bv))) throw new Error('Not vector');
    var rv = this.sum(av, bv.minus());
    return rv.abs();
};

vector.is_vector = function(x) {
    return x instanceof this;
};

vector.sum = function(av, bv) {
    if (!(this.is_vector(av) && this.is_vector(bv))) throw new Error('Not vector');
    return new this(av.x + bv.x, av.y + bv.y);
};

vector.minus = function(av, bv) {
    return this.sum(av, bv.minus());
};
