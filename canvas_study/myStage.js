// Javascript name:"myStage.js"
"use strict";

var aLine = function(ctx, startXY, endXY) {
    this.startXY = startXY;
    this.endXY = endXY;
    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.startXY[0], this.startXY[1]);
        ctx.lineTo(this.endXY[0], this.endXY[1]);
        ctx.stroke();
    };
};

var tva = new Object;

window.onload = (function() {
    var myStage = new stage("myCanvas", 60);
    myStage.addEvent("mousedown", mousedown);
    myStage.addEvent("mouseup", mouseup);
    myStage.addEvent("mousemove", mousemove);
    myStage.handler = function() {

    };
    myStage.start();

    function mousedown(event) {
        console.log("mouse down");
        tva.mouseDown = true;
        tva.to = new aLine(
            myStage.ctx, [event.offsetX, event.offsetY], [event.offsetX, event.offsetY]
        );
        myStage.shapes[0].push(tva.to);
    };

    function mousemove(event) {
        if (tva.mouseDown) {
            console.log("mouse move");
            tva.to.endXY = [event.offsetX, event.offsetY];
        };
    };

    function mouseup(event) {
        console.log("mouse up");
        tva.mouseDown = false;
        tva.to.endXY = [event.offsetX, event.offsetY];
        if ((tva.to.endXY.equal(tva.to.startXY)) && (myStage.shapes[0].end() == tva.to)) {
            myStage.shapes[0].pop();
        };
        delete tva.to
        console.log(myStage.shapes);
    };
});


// --------- Tools ------------
Array.prototype.equal = function(arr) {
    if (!(this.length === arr.length)) return false;
    var equalArr = true;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == arr[i]) continue;
        equalArr = false;
        break;
    };
    return equalArr;
};

Array.prototype.end = function() {
    return this[this.length - 1];
};
