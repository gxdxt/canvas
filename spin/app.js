import {Polygon, Polygon2} from "./polygon.js";


class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        //default
        this.isDown = false;
        this.moveX = 0;
        this.offsetX = 0;
          
        //이제 아마 만든 도형 돌리기 시작?
        document.addEventListener('pointerdown', this.onDown.bind(this), false);
        document.addEventListener('pointermove', this.onMove.bind(this), false);
        document.addEventListener('pointerup', this.onUp.bind(this), false);


        window.requestAnimationFrame(this.animate.bind(this))
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * this.pixelRatio
        this.canvas.height = this.stageHeight * this.pixelRatio
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        this.polygon = new Polygon(
            this.stageWidth/2,
            this.stageHeight/2,
            this.stageHeight/3,
            5
        )
    }

    animate(){
        window.requestAnimationFrame(this.animate.bind(this));
        
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        
        //움직임 함수
        this.moveX *= 0.92;

        this.polygon.animate(this.ctx, this.moveX);
    }

    onDown(e){
        this.isDown = true;
        this.moveX = 0;
        this.offsetX = e.clientX;
    }

    onMove(e){
        if(this.isDown){
             this.moveX = e.clientX - this.offsetX;
             this.offsetX = e.clientX
        }

    }

    onUp(e){
        this.isDown = false;

    }
}

window.onload = () => {
    new App();
}