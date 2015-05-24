if (typeof Ants === "undefined") {
  window.Ants = {};
}

var Board = Ants.Board = function () {
  this.cellsize = 4;
  this.fps = 120;
  this.canvasWidth = parseInt(window.innerWidth/this.cellsize)*this.cellsize;
  this.canvasHeight = parseInt(window.innerHeight/this.cellsize)*this.cellsize;

  this.ants = [];
  this.todraw = [];
  this.clicks = [];
  this.grid = [];

  var canvasElement = $("#canvas");
  canvasElement.attr('width', this.canvasWidth);
  canvasElement.attr('height', this.canvasHeight);

  this.canvas = document.getElementById('canvas').getContext("2d");
  // this.canvas.fillStyle = "#000000";
  // this.canvas.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  this.cols = Math.floor(this.canvasWidth / this.cellsize);
  this.rows = Math.floor(this.canvasHeight/ this.cellsize);

  for (var i = 0, n = this.rows; i < n; i++) {
    this.grid[i] = [];
    for (var j = 0, m = this.cols; j < m; j++ ) {
      this.grid[i][j] = new Cell(i,j, 0);
    }
  }

};


Board.prototype.tick = function() {
  if (this.clicks.length > 0) {
    for (var i = 0; i < this.clicks.length; i++) {
      var x = Math.floor(this.clicks[i][0] / this.cellsize);
      var y = Math.floor(this.clicks[i][1] / this.cellsize);
    }

    this.addAnt(x,y,Math.round(Math.random()*3))
    this.clicks = [];
  }

  for (var j = 0; j < this.ants.length; j++) {
    this.update(this.ants[j]);
  }

  this.draw();
  this.counter++;

}

Board.prototype.start = function(){
  var that = this;
  this.interval = setInterval(function() {
    that.tick();
  }, 1000/this.fps)
}

Board.prototype.addCell = function(x,y,c, dir) {
  var swapX = {
    0: 0,
    1: 1,
    2: 0,
    3: -1
  };

  var swapY = {
    0: -1,
    1: 0,
    2: 1,
    3: 0
  };

  var rgba = this.canvas.getImageData((x+(swapX[dir]*2)) * this.cellsize, (y+(swapY[dir]*2)) * this.cellsize, 1, 1).data;
  var rgba2 = this.canvas.getImageData((x-(swapX[dir]*2)) * this.cellsize, (y-(swapY[dir]*2)) * this.cellsize, 1, 1).data;
  var r = rgba[0],
      g = rgba[1],
      b = rgba[2],
      r2 = rgba2[0],
      g2 = rgba2[1],
      b2 = rgba2[2];

  this.grid[y][x].color = c;
  this.grid[y][x].visits++;
  // c = this.grid[y][x].visits
  c = 'rgb('+r+','+g+','+b+')';
  c2 = 'rgb('+r2+','+g2+','+b2+')';

  this.todraw.push([x-(swapX[dir]*2),y -(swapY[dir]*2),c]);
  this.todraw.push([x + (swapX[dir]*2), y + (swapY[dir]*2), c2]);
}

Board.prototype.addAnt = function(x,y,dir) {
  this.ants.push(new Ant(x,y,dir));
  this.todraw.push([x,y,2]);
}


Board.prototype.draw = function() {

  for (var i = 0, n = this.todraw.length; i < n; i++) {
    var color = this.todraw[i][2];

    this.canvas.fillStyle = color;
    this.canvas.fillRect((this.todraw[i][0] * this.cellsize), (this.todraw[i][1]*this.cellsize), this.cellsize, this.cellsize);
  }

  this.todraw = [];
}


Board.prototype.update = function(ant) {

  if (this.grid[ant.y][ant.x].visits % 9 === 0) {

    this.addCell(ant.x, ant.y, 0, ant.dir);
    ant.dir = (ant.dir === 0) ? 3 : (ant.dir - 1)

  } else if (this.grid[ant.y][ant.x].visits % 9 ===1) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  } else if (this.grid[ant.y][ant.x].visits % 9 ===2) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  }else if (this.grid[ant.y][ant.x].visits % 9 ===3) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  }else if (this.grid[ant.y][ant.x].visits % 9===4) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  }else if (this.grid[ant.y][ant.x].visits % 9===5) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  }else if (this.grid[ant.y][ant.x].visits % 9 ===6) {

    this.addCell(ant.x, ant.y, 0, ant.dir);
    ant.dir = (ant.dir === 0) ? 3 : (ant.dir - 1)

  }else if (this.grid[ant.y][ant.x].visits % 9 ===7) {

    this.addCell(ant.x, ant.y, 0, ant.dir);
    ant.dir = (ant.dir === 0) ? 3 : (ant.dir - 1)

  }else if (this.grid[ant.y][ant.x].visits % 9 ===8) {

    this.addCell(ant.x, ant.y, 1, ant.dir);
    ant.dir = (ant.dir === 3) ? 0 : (ant.dir + 1);

  }

  ant.move();
  this.overflow(ant);

  this.todraw.push([ant.x, ant.y, 2])
}

Board.prototype.overflow = function(ant) {

  if (ant.x >= this.cols){
    ant.x = 0;
  }
  if (ant.x < 0){
    ant.x = (this.cols-1);
  }
  if (ant.y >= this.rows){
    ant.y = 0;
  }
  if (ant.y < 0){
    ant.y = (this.rows-1);
  }

}


var Ant = Ants.Ant = function(x,y,dir) {
  this.x = x;
  this.y = y;
  this.dir = dir;
}

Ant.prototype.move = function() {
  switch(this.dir) {
    case 0:
      this.y--;
      break;
    case 1:
      this.x++;
      break;
    case 2:
      this.y++;
      break;
    case 3:
      this.x--;
      break;
  }
}



var Cell = Ants.Cell = function(x,y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.visits = 0;
}
