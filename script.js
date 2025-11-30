// particles
const canvas=document.getElementById('particles'),ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
const particles=[];
class Particle{constructor(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*2+1;this.speedX=Math.random()*1-.5;this.speedY=Math.random()*1-.5;this.color='rgba(0,255,128,0.8)';}
update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x>canvas.width||this.x<0)this.speedX*=-1;if(this.y>canvas.height||this.y<0)this.speedY*=-1;}
draw(){ctx.fillStyle=this.color;ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fill();}}
function init(){for(let i=0;i<80;i++)particles.push(new Particle());}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);for(let i=0;i<particles.length;i++){particles[i].update();particles[i].draw();}requestAnimationFrame(animate);}
init();animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});

// year
document.getElementById('year').textContent=new Date().getFullYear();
