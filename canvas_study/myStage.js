// Javascript name:"myStage.js"
"use strict";

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

var lineObj = function(ctx, startXY, endXY) {
    this.ctx = ctx;
    this.startXY = startXY;
    this.endXY = endXY;
    this.draw = function() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.startXY[0], this.startXY[1]);
        this.ctx.lineTo(this.endXY[0], this.endXY[1]);
        this.ctx.stroke();
    };
};

var drawLine = function(stage) {
    this.stage = stage;
    this.mouseDown = false;
    this.mouseClick = false;
    this.mouseDownXY = new Array(2);
    this.mouseUpXY = new Array(2);
    this.mouseOverXY = new Array(2);
};

drawLine.prototype.pushArr = function() {
    if (this.mouseDown) {
        this.stage.shapes[0].push(
            new lineObj(
                this.stage.ctx, [this.mouseDownXY[0], this.mouseDownXY[1]], [this.mouseOverXY[0], this.mouseOverXY[1]]
            )
        );
    } else if (this.mouseClick) {
        if (!this.mouseDownXY.equal(this.mouseUpXY)) {
            this.stage.shapes[1].push(
                new lineObj(
                    this.stage.ctx, [this.mouseDownXY[0], this.mouseDownXY[1]], [this.mouseUpXY[0], this.mouseUpXY[1]]
                )
            );
        };
        this.mouseClick = false;
    };
};

window.onload = (function() {
    var myStage = new stage("myCanvas", 60, 2);
    myStage.addEvent("mousedown", mousedown);
    myStage.addEvent("mouseup", mouseup);
    myStage.addEvent("mousemove", mousemove);
    var dl = new drawLine(myStage);
    myStage.handler = function() {
        // 写为一个obj变 endXY
        myStage.shapes[0] = new Array;
        dl.pushArr();
    };
    myStage.start();

    function print_dots(x, y, name, dotSize, color) {
        var dotSize = dotSize || 5; // px;
        myStage.ctx.fillStyle = color || "black";
        myStage.ctx.fillRect(
            x - dotSize / 2, y - dotSize / 2,
            dotSize, dotSize
        );
        myStage.ctx.font = '2pt Arial bold';
        myStage.ctx.fillText(
            name + " (" + x + ", " + y + ")",
            x + dotSize, y - dotSize
        );
    };

    function mouseup(event) {
        console.log("mouse up");
        print_dots(event.offsetX, event.offsetY, "mouseup");
        dl.mouseUpXY = [event.offsetX, event.offsetY];
        dl.mouseClick = true;
        dl.mouseDown = false;
    };

    function mousedown(evnet) {
        console.log("mouse down");
        print_dots(event.offsetX, event.offsetY, "mousedown");
        dl.mouseDownXY = [event.offsetX, event.offsetY];
        dl.mouseDown = true;
    };

    function mousemove(event) {
        if (dl.mouseDown) {
            console.log("mouse move");
            print_dots(event.offsetX, event.offsetY, "mousemove");
            dl.mouseOverXY = [event.offsetX, event.offsetY];
        }
    };
});
