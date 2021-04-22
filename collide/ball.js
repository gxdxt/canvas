export class Ball {
    //움직이는 공을 정의한다.
    constructor(stageWidth, stageHeight, radius, speed){
        //반지름
        this.radius = radius;
        //속도 (X, Y)좌표값을 움직이는 속도
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        //스테이지에 랜덤으로 위치할 수 있게 함수를 정의
        this.x = this.radius + (Math.random() * (stageWidth - diameter));
        this.y = this.radius + (Math.random() * (stageHeight - diameter));
    }

    //canvas context에 그림을 그릴 수 있는 함수 //벽돌 튕기는 거 넣으려고 param에 block 추가
    draw(ctx, stageWidth, stageHeight, block) {
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        //ball의 위치를 파악해서 반사값을 구해준다.
        this.bounceBlock(block);

        //공의 색
        ctx.fillStyle= '#fdd700';
        //공 그림 그리기
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    //공이 벽에 '어디에'닿았는 지 판단하고, 반대로 튕기는 함수
    bounceWindow(stageWidth, stageHeight){
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if(this.x <= minX || this.x >= maxX){
            this.vx *= -1;
            this.x += this.vx;
        } else if (this.y <= minY || this.y >= maxY){
            this.vy *= -1;
            this.y += this.vy; //이거 vx로 두고있어서 움직이는 모양이 엄청 이상했어
        }
    }

    bounceBlock(block){
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        //여기도 마찬가지로 닿았으면 vx, vy값에 -1를 곱하는 방식으로 튕겨준다.
        if(this.x > minX && this.x < maxX && this.y > minY && this.y < maxY){
            //공이 블록의 위에 부딪혔는지, 옆에 부딪혔는지, 아래 부딪혔는지 알기 위해선 어느값이 가장 근접한지 알아야 한다.
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);

            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);

            const min = Math.min(min1, min2);

            if(min == min1){
                this.vx *= -1;
                this.x += this.vx;
            } else if(min == min2){
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }

}