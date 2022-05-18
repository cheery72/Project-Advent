// Copyright (c) 2022 - by wao816 (https://codepen.io/hy16/pen/QWGNZKZ)

// Permission is hereby granted, free of charge, to any person 
// obtaining a copy of this software and associated documentation 
// files (the "Software"), to deal in the Software without restriction,
//  including without limitation the rights to use, copy, modify, 
// merge, publish, distribute, sublicense, and/or sell copies of 
// the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall 
// be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.

import { useEffect } from "react";
import styles from "../../../styles/animation/smallsnow.module.css"

interface effect {
    effectImage: string
}

export default function SmallSnow({ effectImage }: effect) {

    const snowing = ()  => {

        const canvas: any = document.getElementById("snow_canvas");
        const ctx = canvas.getContext("2d");
    
        const W = 1000; //영역 넓이
        const H = 500; //영역 높이
        canvas.width = W;
        canvas.height = H;
    
        const mp = 100; //밀도 수치
        let particles: any = [];
        for(let i = 0; i < mp; i++)
        {
            particles.push({
                x: Math.random()*W, 
                y: Math.random()*H, 
                r: Math.random()*4+3, //입자 크기 최대치 조절
                d: Math.random()*mp //밀도
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; //눈 입자 색깔
            ctx.beginPath();
            for(let i = 0; i < mp; i++)
            {
                const p = particles[i];
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
        }

        const imageDraw = () => {
            ctx.clearRect(0, 0, W, H);

            const image = new Image()
            image.src = effectImage
            
            ctx.fillStyle = "rgba(255, 255, 255, 0.0)"; //눈 입자 색깔
            ctx.beginPath();
            for(let i = 0; i < mp; i++)
            {
                const p = particles[i];
                ctx.drawImage(image, p.x, p.y, 50, 50)
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
            }
            ctx.fill();
            update();
        }
    
    
        let angle = 0;
        const update = () => {
            angle = 0;
            for(let i = 0; i < mp; i++){
                const p = particles[i];
                p.y += Math.cos(angle+p.d) + 1 + p.r/2;
                p.x += Math.sin(angle);
    
                if(p.x > W+5 || p.x < -5 || p.y > H){
                    if(i%3 > 0) {
                        particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
                    }
                    else{
                        if(Math.sin(angle) > 0){
                            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                        else{
                            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
                        }
                    }
                }
            }
        }

        if (effectImage){
            const interval = setInterval(imageDraw, 33);
            setTimeout(() => {
                clearInterval(interval)
                ctx.clearRect(0, 0, W, H);
            }, 5000)
        }
        else {
            const interval = setInterval(draw, 33);
            setTimeout(() => {
                clearInterval(interval)
                ctx.clearRect(0, 0, W, H);
            }, 5000)
        }
    }

    useEffect(() => {
        snowing()
    }, [effectImage])

    return(
        <>
            <div className={styles.section01}>
                <canvas id="snow_canvas" className={styles.section02}></canvas>
            </div>
        </>
    );
}

// Copyright (c) 2022 - by wao816 (https://codepen.io/hy16/pen/QWGNZKZ)

// Permission is hereby granted, free of charge, to any person 
// obtaining a copy of this software and associated documentation 
// files (the "Software"), to deal in the Software without restriction,
//  including without limitation the rights to use, copy, modify, 
// merge, publish, distribute, sublicense, and/or sell copies of 
// the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall 
// be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
// DEALINGS IN THE SOFTWARE.
