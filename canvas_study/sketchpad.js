//Javascript name:"sketchpad.js"
"use strict";

var stage = function(canvasID, timeFrame, layersNum) {
    if (!window.onload) throw new Error("Window not readly.");
    this.myCanvas = document.getElementById(canvasID);
    this.ctx = this.myCanvas.getContext("2d");

    // -- frames --
    this.timerID = undefined;
    this.timeFrame = timeFrame || 60; // ms
    this.handler = undefined;

    // -- shapes ---
    this.layersNum = layersNum || 1;
    this._init();
};

stage.prototype._init = function() {
    this.shapes = new Object;
    for (var i = 0; i < this.layersNum; i++) {
        this.shapes[i] = new Array; // 1º first layer canvas.
    };
};

stage.prototype.setLayers = function(layersNum) {
    this.layersNum = layersNum;
    this._init();
};

stage.prototype.setFrame = function(newFrame) {
    this.timeFrame = newFrame;
    this.stop();
    this.start();
};

stage.prototype.addEvent = function(eventName, eventHandler, phase) {
    var phase = phase || false;
    document.addEventListener(eventName,
        function(event) {
            eventHandler(event);
        }, phase);
};

stage.prototype.start = function() {
    if (!this.handler) throw new Error("hander is undefined");
    var self = this;
    this.timerID = window.setInterval(
        function() {
            self._render();
        }, this.timeFrame);
};

stage.prototype.stop = function() {
    window.clearInterval(this.timerID);
};

stage.prototype.draw = function() {
    var self = this;
    var keysArray = self.shapes.keys().sort();
    keysArray.forEach(function(x) {
        if (!self.shapes[x].length == 0) {
            self.shapes[x].forEach(function(xx) {
                if (xx.hasOwnProperty('draw')) {xx.draw();};
            });
        };
    });
};

stage.prototype._render = function() {
    this.handler();
    this.clean();
    this.draw();
};

stage.prototype.clear = function() {
    console.log('Here');
    if (!delete this.shapes) {
        console.log('sketchpad ->stage -> clean: clean shapes fail.');
    };
    this._init();
};

stage.prototype.clean = function() {
    this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
};


// -----------Tools ------------
Object.prototype.keys = function() {
    var result = new Array;
    for (var name in this) {
        if (this.hasOwnProperty(name)) {
            result.push(name);
        };
    };
    return result;
};
