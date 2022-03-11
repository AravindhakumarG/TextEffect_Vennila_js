const canvas = document.getElementById('canvas01')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 10;
let adjustY = 10;
//handle mousemove
const mouse = { x: null, y: null, radius: 150 }
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse.x, mouse.y);
});
ctx.fillStyle = "white";
ctx.font = "30px verdana" // fontstyles
ctx.filltext = ('Aa,0,30'); // text front banner
const data = ctx.getimagedata(0, 0, 100, 100); // text coordinates
class particle {
    constrctor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginpath();
        ctx.arc(this.x, this.y, this.size, 0, math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
            this.x = directionX;
            this.y = directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10; // particle
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y = dy / 5;
            }
        }
    }
}

function init() {
    particleArray = [];
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textcoordinates.width; x < x2; x++) {
            if (textCoordinates.data[1] > 128) { // 128=color of particle with alpha value ; 1 replace with (y*4*data.width)+(x*4)+3
                let positionX = x;
                let positionY = y;
                particleArray.push(new particle(positionX, positionY)); // (positionX*20,positionY*20)  ; hover spreading position with directional
            }
        }
    }
}
init();
console.log(particleArray);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    // calling the function class ; connect();
    requestAnimationFrame(animate);
}
animate();

function connect() {
    let opacityvalue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; bparticleArray[b].length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particle[a].y - particle[b].y;
            let distance = math.sqrt(dx.dx + dy * dy);
            opacityvalue = 1 - (distance / 50);
            ctx.strokestyle = 'rgba(255,255,255' + opacityvalue + ')';
            if (distance < 100) {
                ctx.strokestyle = 'white';
                ctx.linewidth = 2;
                ctx.beginpath();
                ctx.moveto(particleArray[a].x, particleArray[a].y);
                ctx.lineto(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }

    }
}