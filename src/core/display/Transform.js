var math = require('../math');


/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 *
 * @class
 * @memberof PIXI
 * @param [x=0] {number} position of the point on the x axis
 * @param [y=0] {number} position of the point on the y axis
 */
function Transform()
{
    this.worldTransform = new math.Matrix();
    this.localTransform = new math.Matrix();

    this.position = new math.Point(0.0);
    this.scale = new math.Point(1,1);
    this.pivot = new math.Point(0.0);
    this.skew = new math.Point(0.0);
    
    this.rotation = 0;
    this._sr = Math.sin(0);
    this._cr = Math.cos(0);
    

    this.dirty = true;
}

Transform.prototype.constructor = Transform;

Transform.prototype.updateTransform = function (parentTransform)
{
    var pt = parentTransform.worldTransform;
    var wt = this.worldTransform;
    var lt = this.localTransform;

    // get the matrix values of the displayobject based on its transform properties..
    lt.a  =  this._cr * this.scale.x;
    lt.b  =  this._sr * this.scale.x;
    lt.c  = -this._sr * this.scale.y;
    lt.d  =  this._cr * this.scale.y;
    lt.tx =  this.position.x - (this.pivot.x * lt.a + this.pivot.y * lt.c);
    lt.ty =  this.position.y - (this.pivot.x * lt.b + this.pivot.y * lt.d);
    // concat the parent matrix with the objects transform.
    wt.a  = lt.a  * pt.a + lt.b  * pt.c;
    wt.b  = lt.a  * pt.b + lt.b  * pt.d;
    wt.c  = lt.c  * pt.a + lt.d  * pt.c;
    wt.d  = lt.c  * pt.b + lt.d  * pt.d;
    wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
    wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;       

}

module.exports = Transform;


