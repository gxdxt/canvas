//ball import
import {
    Ball
} from './ball.js';
//block import
import {
    Block
} from './block.js';

class App {
    constructor(){
        //canvas를 script로 하나 만든다.
        this.canvas = document.createElement('canvas');
        //context를 가지고 온다.
        this.ctx = this.canvas.getContext('2d'); //와 이거 2D로 하니까 오류뜨네!

        document.body.appendChild(this.canvas); //이건 무슨 작업인지 생각해보자.

        //항상 윈도우에 resize 이벤트를 걸어주신다 ? - 현재 내가 만들고자 하는 애니메이션의 크기를 아는 것이 굉장히 중요하다.
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15); //위치는 왜 여기로 잡았을까?
        this.block = new Block(700, 30, 300, 450); 
    
        //애니메이션 프레임을 걸어주고, 실제로 구동시키는 함수를 만든다.
        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        //이 이벤트를 걸어주고, 스크린 사이즈를 가지고 와서 애니메이션을 정의해준다.
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        //시중의 예제들은 스크린 사이즈를 미리 정해 놓고 시작하는 경우가 많은데, 
        //가변적인 브라우저에는 적절치 않을 수 있다.
        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2); //이건 무엇을 의미하는 것일까?
    }

    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        //생성하기 전에 이전 자취 지우기
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
        //공보다 먼저 그려야 하나? 아니야 공 그리는 데에 block을 추가해야해
        this.block.draw(this.ctx);
        //공 그리기
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);
    }
}

window.onload = () => {
    new App();
}