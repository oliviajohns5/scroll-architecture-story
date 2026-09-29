const response = await fetch('/content/story.json');
const story = await response.json();
const chapters = story.chapters;
const stage = document.getElementById('stage');
const orbit = document.getElementById('sceneOrbit');
const card = document.getElementById('chapterCard');
const count = document.getElementById('chapterCount');
const nav = document.getElementById('chapterNav');
const staticStory = document.getElementById('staticStory');
const progressBar = document.getElementById('progressBar');

const sceneSvg = (ch, i) => {
  const [a,b,c] = ch.palette;
  const common = `<defs><linearGradient id="g${i}" x1="0" x2="1"><stop stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient><filter id="grain${i}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .12"/></feComponentTransfer></filter></defs><rect width="1200" height="760" fill="transparent"/><rect width="1200" height="760" filter="url(#grain${i})" opacity=".55"/>`;
  if(ch.id==='cave') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<path d="M120 570 C190 220 470 80 710 150 C910 210 1070 360 1100 570Z" fill="${a}" stroke="${b}" stroke-width="7"/><path d="M310 390 C405 325 520 330 610 390 C545 430 400 448 310 390Z" fill="url(#g${i})" opacity=".95"/><circle cx="396" cy="378" r="13" fill="${a}"/><path d="M610 390 l70 -36 l-38 72Z" fill="${b}"/><path d="M365 436 C455 486 535 475 625 430" fill="none" stroke="${c}" stroke-width="7" opacity=".8"/></svg>`;
  if(ch.id==='parthenon') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<polygon points="210,250 600,110 990,250" fill="url(#g${i})"/><rect x="230" y="260" width="740" height="54" fill="${c}"/><g fill="${b}">${[0,1,2,3,4,5,6].map(n=>`<rect x="${280+n*100}" y="315" width="42" height="285" rx="18"/>`).join('')}</g><rect x="205" y="600" width="790" height="42" fill="${c}"/><path d="M260 260 Q600 232 940 260" stroke="${a}" stroke-width="8" fill="none" opacity=".5"/></svg>`;
  if(ch.id==='pantheon') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<circle cx="600" cy="420" r="310" fill="${a}" stroke="${b}" stroke-width="28"/><circle cx="600" cy="260" r="76" fill="#fff4c8"/><path d="M600 260 L810 720 L500 720Z" fill="${c}" opacity=".2"/><g stroke="${b}" opacity=".55">${[120,180,240,300].map(r=>`<circle cx="600" cy="420" r="${r}" fill="none"/>`).join('')}</g></svg>`;
  if(ch.id==='hagia') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<path d="M260 470 Q600 130 940 470Z" fill="url(#g${i})"/><rect x="235" y="470" width="730" height="120" fill="${a}"/><g fill="${c}" opacity=".95">${[300,420,540,660,780].map(x=>`<circle cx="${x}" cy="430" r="20"/>`).join('')}</g><g stroke="${c}" stroke-width="5" opacity=".55"><path d="M330 590 V710"/><path d="M870 590 V710"/><path d="M600 225 V585"/></g></svg>`;
  if(ch.id==='david') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<ellipse cx="600" cy="695" rx="210" ry="30" fill="${b}" opacity=".45"/><path d="M610 170 C545 180 528 255 565 312 C520 405 505 548 468 670 L540 670 C580 560 592 476 620 392 C660 486 720 555 765 670 L840 670 C805 540 735 448 693 330 C738 260 695 168 610 170Z" fill="url(#g${i})"/><circle cx="612" cy="126" r="62" fill="${c}"/><path d="M650 122 C682 140 697 170 710 208" stroke="${c}" stroke-width="28" fill="none" stroke-linecap="round"/></svg>`;
  if(ch.id==='taj') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<rect x="210" y="510" width="780" height="70" fill="${c}"/><path d="M400 505 Q600 210 800 505Z" fill="url(#g${i})"/><circle cx="600" cy="305" r="98" fill="${c}"/><g fill="${b}"><rect x="300" y="330" width="74" height="180"/><rect x="826" y="330" width="74" height="180"/><rect x="480" y="405" width="240" height="105"/></g><path d="M240 640 H960" stroke="${c}" stroke-width="10"/><path d="M370 675 C510 640 690 640 830 675" stroke="${b}" stroke-width="5" fill="none" opacity=".8"/></svg>`;
  if(ch.id==='bauhaus') return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<rect x="220" y="220" width="760" height="380" fill="${c}"/><g stroke="${a}" stroke-width="7">${[0,1,2,3,4,5].map(n=>`<path d="M${300+n*110} 220 V600"/>`).join('')}${[0,1,2].map(n=>`<path d="M220 ${315+n*95} H980"/>`).join('')}</g><rect x="220" y="220" width="190" height="380" fill="${a}" opacity=".9"/><circle cx="820" cy="170" r="60" fill="${b}"/><rect x="470" y="145" width="210" height="52" fill="${b}"/></svg>`;
  return `<svg viewBox="0 0 1200 760" role="img"><title>${ch.title}</title>${common}<path d="M0 640 C220 580 300 700 470 625 C640 545 780 605 1200 520 V760 H0Z" fill="${a}"/><g fill="url(#g${i})"><rect x="310" y="270" width="590" height="44"/><rect x="390" y="360" width="560" height="44"/><rect x="470" y="450" width="440" height="44"/></g><path d="M540 494 C520 570 460 600 360 650" stroke="${c}" stroke-width="9" fill="none"/><path d="M650 494 C690 570 760 600 860 660" stroke="${c}" stroke-width="9" fill="none"/><path d="M190 700 C450 590 760 745 1040 600" stroke="${b}" stroke-width="12" fill="none" opacity=".7"/></svg>`;
};

chapters.forEach((ch,i)=>{
  const a=document.createElement('a'); a.href=`#${ch.id}`; a.textContent=String(i+1).padStart(2,'0'); nav.appendChild(a);
  const panel=document.createElement('section'); panel.id=ch.id; panel.className='chapter-anchor chapter-panel'; panel.dataset.index=i+1; panel.style.cssText='height:100svh; position:relative; pointer-events:none;'; document.querySelector('.stage-wrap').appendChild(panel);
  const staticCard=document.createElement('article'); staticCard.className='static-card'; staticCard.innerHTML=`<p class="eyebrow">${ch.kicker} · ${ch.period}</p><h2>${ch.title}</h2><p class="meta">${ch.place}</p><p>${ch.text}</p>`; staticStory.appendChild(staticCard);
});

function renderChapter(i){
  const ch=chapters[i];
  document.documentElement.style.setProperty('--scene-a', ch.palette[0]);
  document.documentElement.style.setProperty('--scene-b', ch.palette[1]);
  document.documentElement.style.setProperty('--scene-c', ch.palette[2]);
  orbit.innerHTML=`<div class="scene">${sceneSvg(ch,i)}</div>`;
  card.className=`chapter-card ${ch.side}`;
  card.innerHTML=`<div class="kicker">${ch.kicker} · ${ch.period}</div><h2>${ch.title}</h2><div class="meta">${ch.place} · ${ch.focus}</div><p>${ch.text}</p>`;
  count.textContent=`${String(i+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`;
  [...nav.children].forEach((a,n)=>a.classList.toggle('active',n===i));
}
let active=-1;
function update(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const total=max?scrollY/max:0;
  document.documentElement.style.setProperty('--progress', total.toFixed(4));
  const wrap=document.querySelector('.stage-wrap');
  const rect=wrap.getBoundingClientRect();
  const scrollable=wrap.offsetHeight-innerHeight;
  const local=Math.min(1,Math.max(0,-rect.top/scrollable));
  const raw=local*chapters.length;
  const idx=Math.min(chapters.length-1,Math.max(0,Math.floor(raw)));
  const cp=raw-idx;
  document.documentElement.style.setProperty('--chapter-progress', cp.toFixed(4));
  if(idx!==active){active=idx; renderChapter(idx);}  
}
addEventListener('scroll',()=>requestAnimationFrame(update),{passive:true});
addEventListener('resize',update);
renderChapter(0); update();
