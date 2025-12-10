:root{
  --bg:#0d0d0d;
  --accent:#00ff80;
  --text:#e0e0e0;
  --card:#1a1a1a;
}
* {box-sizing:border-box;margin:0;padding:0;font-family:'Roboto',sans-serif;}
body{background:var(--bg);color:var(--text);line-height:1.6;overflow-x:hidden;}
a{color:var(--accent);text-decoration:none;}
.container{width:90%;max-width:1000px;margin:auto;}
.section{padding:80px 0;}
h2{font-family:'Orbitron',sans-serif;font-size:2rem;margin-bottom:1.5rem;text-align:center;letter-spacing:2px;}

/* Hero */
.hero{height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;position:relative;}
.glitch{font-family:'Orbitron',sans-serif;font-size:4rem;color:#fff;text-transform:uppercase;position:relative;}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;}
.glitch::before{animation:glitch-1 .5s infinite;color:#00ff80;z-index:-1;}
.glitch::after{animation:glitch-2 .5s infinite;color:#ff0080;z-index:-2;}
@keyframes glitch-1{0%,100%{clip-path:inset(0 0 0 0);transform:translate(0);}20%{clip-path:inset(20% 0 60% 0);transform:translate(-2px,2px);}}
@keyframes glitch-2{0%,100%{clip-path:inset(0 0 0 0);transform:translate(0);}20%{clip-path:inset(70% 0 10% 0);transform:translate(2px,-2px);}}
.tagline{margin:1rem 0 2rem;font-size:1.2rem;opacity:.8;}
.btn{background:var(--accent);color:#000;padding:.75rem 2rem;border:none;font-weight:bold;letter-spacing:1px;cursor:pointer;transition:.3s;}
.btn:hover{filter:brightness(1.2);}

/* Skills */
.skills-list{display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;}
.skills-list li{background:var(--card);border:1px solid var(--accent);padding:.5rem 1rem;list-style:none;font-size:.9rem;border-radius:4px;}

/* Timeline */
.timeline{position:relative;padding:2rem 0;}
.timeline::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:var(--accent);}
.event{position:relative;width:45%;padding:1rem;background:var(--card);border-radius:6px;margin-bottom:2rem;}
.event:nth-child(odd){margin-left:0;text-align:right;}
.event:nth-child(even){margin-left:55%;}
.event::before{content:attr(data-year);position:absolute;top:1rem;font-weight:bold;font-size:.8rem;color:var(--accent);}
.event:nth-child(odd)::before{right:-120px;}
.event:nth-child(even)::before{left:-120px;}
.event h3{margin-bottom:.5rem;font-family:'Orbitron';}

/* Contact */
form{display:flex;flex-direction:column;gap:1rem;max-width:500px;margin:auto;}
input,textarea{background:var(--card);border:1px solid #333;padding:1rem;color:var(--text);border-radius:4px;}
.contact-badges{margin-top:2rem;display:flex;flex-wrap:wrap;gap:1rem;justify-content:center;font-size:.9rem;}

/* Footer */
footer{text-align:center;padding:2rem 0;font-size:.8rem;opacity:.5;}

/* Particle bg */
#particles{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;}
