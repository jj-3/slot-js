const CORE = {
    setup: function(w, h) {
        this.engine = new Engine(w, h);
    }
}

class Engine {
    constructor(w, h) {
        const canvas = document.getElementById("canvas");
        canvas.Width = w;
        canvas.height = h;
        canvas.style.backgroundColor = "#000000";
        CORE.canvas = canvas;
        CORE.ctx = canvas.getContext("2d");

        window.addEventListener('resize', () => {this.resizeCanvas();});
        this.resizeCanvas();
    }

    _requestFrame(){
        this.update();
        requestAnimationFrame(() => {this._requestFrame();});
    }
    resizeCanvas() {
        const canvas = CORE.canvas;
        const canvasHeightRatio = canvas.height / canvas.Width;
        const windowHeightRatio = window.innerHeight / window.innerWidth;

        let width;
        let height;
        if (windowHeightRatio > canvasHeightRatio) {
            width = window.innerWidth;
            height = window.innerWidth * (canvas.height / canvas.width);
        } else {
            width = window.innerHeight * (canvas.width / canvas.height);
            height = window.innerHeight;
        }

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        CORE.resolutionRatio = height / canvas.height;
        }
        preload(data){
            const length = Object.keys(data).length;
            let count = 0;
            const assets = [];
            for(let key in data){
                assets[key] = new Image();
                assets[key].src = data[key];
                assets[key].onload = () => {
                    if(++count == length) {
                        this.onload();
                    }
                }
            }
            CORE.assets = assets;
        }
        clearCanvas(){
            CORE.cts.clearRect(0, 0, CORE.canvas.width, CORE.canvas.height);
        }
        start(){
            this.init();
            requestAnimationFrame(()=> {this._requestFrame();});
        }
        onload(){}
        init(){}
        update(){}
    }
    function rectFill(x, y, w, h, color) {
        const ctx = CORE.ctx;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    /***********************
    ここからライツアウトのプログラム
    ************************/

    const CANVAS_HEIGHT = 550;
    const CANVAS_WIDTH = 550;

    const table = [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ];
    const tileSize = 100;
    const margin = 10;
    const tiles = [];
    window.onload = function() {
        CORE.setup(CANVAS_WIDTH, CANVAS_HEIGHT);
    

    for(let i = 0, len = table.length, id = 0; i < len; i++) {
        tiles[i] = [];
        for(let j = 0, len2 = table[i].length; j < len2; j++) {
            const tile = new tile();
            tile.x = j * tileSize + j * margin + margin * 0.5;
            tile.y = i * tileSize + i * margin + margin * 0.5;
            tile.row = i;
            tile.col = j;
            if(table[i][j] ) {
                tile.color = "cc0000";
                tile.draw();
                } else {
                    tile.coler = "#000088";
                    tile.draw();
            }
            tiles[i][j] = tile;
        }
    }
    CORE.canvas.addEventListener("pointerdown", (e) => {
        checkTiles(e);
        if(isClear()){
            const ctx = CORE.ctx;
            ctx.front = '96px serif';
            ctx.fillStyle = 'rgba(255, 255, 0, 1)'
            ctx.fillText("CLEAR", 110, 300);
        }
    });
  }
  function isClear(){
    for()
  }