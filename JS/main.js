const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = '#ff8';

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;

        this.dx = 1 * this.speed;
        this.dy = 1 * this.speed;
    }

    update(Context) {
        this.draw(Context);

        if ((this.posX + this.radius) > window_width) {
            this.dx = -this.dx;
        }
        if ((this.posX - this.radius) < 0) {
            this.dx = -this.dx;
        }
        if ((this.posY + this.radius) > window_height) {
            this.dy = -this.dy;
        }
        if ((this.posY - this.radius) < 0) {
            this.dy = -this.dy;
        }

        this.posX += this.dx;
        this.posY += this.dy;
    }

    draw(Context) {
        Context.beginPath();
        Context.strokeStyle = this.color;
        Context.textAlign = "center";
        Context.textBaseline = "middle"; // Corregido a "textBaseline"
        Context.font = "15px Arial";
        Context.fillText(this.text, this.posX, this.posY);
        Context.lineWidth = 4;
        Context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        Context.stroke();
        Context.closePath();
    }
}

let arrayCircle = [];
let NumeroCirculos = 10;

for (let i = 0; i < NumeroCirculos; i++) {

    let randomX = Math.random() * (window_width-200)+100;
    let randomY = Math.random() * (window_height-200)+100;
    let randomRadius = Math.floor(Math.random() * 60 + 35);
    let randomSpeed = Math.floor(Math.random() * 8) + 1;

    let miCirculo = new Circle(randomX, randomY, randomRadius, 'Blue', i + 1, randomSpeed);

    arrayCircle.push(miCirculo);
}

function updateCircle() {
    ctx.clearRect(0, 0, window_width, window_height);

    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });

    requestAnimationFrame(updateCircle);
}

updateCircle();
