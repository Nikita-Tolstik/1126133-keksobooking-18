'use strict';

(function () {

  var Size = {
    MIN_X: -32,
    MIN_Y: 130,
    MAX_X: 1168,
    MAX_Y: 630
  };

  window.Coordinate = function (x, y, offsetLeft, offsetTop) {
    this.x = x;
    this.y = y;

    this._minX = Size.MIN_X;
    this._minY = Size.MIN_Y;
    this._maxX = Size.MAX_X;
    this._maxY = Size.MAX_Y;
    this._offsetLeft = offsetLeft;
    this._offsetTop = offsetTop;
  };

  window.Coordinate.prototype.setX = function (x) {

    this.x = this._offsetLeft - x;
    if (this._offsetLeft - x <= this._minX) {
      this.x = this._minX;
    } else if (this._offsetLeft - x > this._maxX) {
      this.x = this._maxX;
    }
  };

  window.Coordinate.prototype.setY = function (y) {

    this.y = this._offsetTop - y;
    if (this._offsetTop - y <= this._minY) {
      this.y = this._minY;
    } else if (this._offsetTop - y > this._maxY) {
      this.y = this._maxY;
    }
  };

  window.Coordinate.prototype.setStartX = function (x) {
    this.x = x;
  };

  window.Coordinate.prototype.setStartY = function (y) {
    this.y = y;
  };

})();
