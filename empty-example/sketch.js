
var streams = [];
var symbolSize = 26;

function setup() {
    createCanvas(
         window.innerWidth,
    window.innerHeight
        );
    background(92, 107, 192);

    var x = 0;
    var y = 0;
    for (var i = 0; i <= width / symbolSize ; i++) {
        var stream = new Stream();
        stream.generateSymbols(x, y);
        streams.push(stream);
        x += symbolSize
    }

    textSize(symbolSize);
}

function draw() {
    background(0);
   streams.forEach(function(stream) {
    stream.render();
  });
}


function Symbol(x, y, speed) {
   this.x = x;
   this.y = y; 
   this.value;
   this.speed = speed;
   this.switchInterval = round(random(2, 25));

   this.setToRandomSymbol = function() {
    if (frameCount % this.switchInterval == 0){
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
    }
   }

   this.rain = function() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(5, 35));
    this.speed = random(5, 22);

    this.generateSymbols = function(x, y) {
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    }

    this.render = function() {
        this.symbols.forEach(function(symbol) {
            fill(255, 0, 0);
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}



