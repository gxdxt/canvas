const PI2 = Math.PI * 2;

export class Polygon{ //도형 모양
    constructor(x, y, radius, sides){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotate = 0;

    }

    animate(ctx, moveX){ //움직임 관리
        ctx.save();
        ctx.fillStyle = "grey"; //도형 색상
        //ctx.beginPath();

        const angle = PI2 / this.sides;

        ctx.translate(this.x, this.y);

         //moveX는 이후에 추가(가만히 있는 형태에는 필요 없어)
         this.rotate -= moveX * 0.008;
         ctx.rotate(this.rotate);

        for (let i = 0; i < this.sides; i++){
            const x = this.radius * Math.cos(angle * i);
            const y = this.radius * Math.sin(angle * i);
            
            //(i == 0) ? ctx.moveTo(x, y) : ctx.lineTo(x, y); //점과 점을 연결해주는 선 생성

            //꼭지점만 출력되게끔 만드는 코드
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, PI2, false);
            ctx.fill();
        }

        ctx.fill();
        ctx.closePath();
        ctx.restore();

    }

}