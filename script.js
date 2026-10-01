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
const chapterRail = document.getElementById('chapterRail');
const learnPanel = document.getElementById('learnPanel');
const soundToggle = document.getElementById('soundToggle');
const ambientAudio = document.getElementById('ambientAudio');

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

const stageWrap = document.querySelector('.stage-wrap');

let soundEnabled = false;
if(ambientAudio){
  ambientAudio.volume = 0.24;
}

async function setSoundEnabled(enabled){
  if(!ambientAudio){
    soundToggle.textContent = 'Sound unavailable';
    soundToggle.disabled = true;
    return;
  }
  soundEnabled = enabled;
  try{
    if(enabled){
      ambientAudio.volume = 0.24;
      await ambientAudio.play();
    } else {
      ambientAudio.pause();
    }
    soundToggle.textContent = enabled ? 'Mute sound' : 'Enable sound';
    soundToggle.setAttribute('aria-pressed', String(enabled));
    soundToggle.classList.toggle('active', enabled);
  } catch(error){
    soundEnabled = false;
    soundToggle.textContent = 'Sound blocked';
    soundToggle.setAttribute('aria-pressed','false');
    soundToggle.classList.remove('active');
  }
}

function updateChapterSound(index, chapterProgress=0){
  if(!ambientAudio || !soundEnabled) return;
  // Keep it quiet and stable: only a tiny volume breathing by chapter/scroll.
  const target = 0.20 + ((index % 3) * 0.015) + chapterProgress * 0.012;
  ambientAudio.volume = Math.max(0.16, Math.min(0.28, target));
}

soundToggle.addEventListener('click', () => setSoundEnabled(!soundEnabled));

chapters.forEach((ch,i)=>{
  const a=document.createElement('a');
  a.href=`#${ch.id}`;
  a.dataset.chapterIndex = String(i);
  a.textContent=String(i+1).padStart(2,'0');
  nav.appendChild(a);
  const marker=document.createElement('button');
  marker.type='button';
  marker.className='rail-marker';
  marker.dataset.chapterIndex=String(i);
  marker.title=`${ch.act || ''}: ${ch.title}`;
  marker.innerHTML=`<span>${String(i+1).padStart(2,'0')}</span><b>${ch.title}</b>`;
  chapterRail.appendChild(marker);
  const panel=document.createElement('section');
  panel.id=ch.id;
  panel.className='chapter-anchor chapter-panel';
  panel.dataset.index=i+1;
  panel.style.cssText='height:100svh; position:relative; pointer-events:none;';
  stageWrap.appendChild(panel);
  const staticCard=document.createElement('article'); staticCard.className='static-card'; staticCard.innerHTML=`<p class="eyebrow">${ch.kicker} · ${ch.period}</p><h2>${ch.title}</h2><p class="meta">${ch.place}</p><p>${ch.text}</p>`; staticStory.appendChild(staticCard);
});

function chapterScrollY(index){
  const scrollable = Math.max(1, stageWrap.offsetHeight - innerHeight);
  // Use the middle of each chapter's scroll segment instead of native anchors.
  // Native #anchors inside a sticky scroll section can land on the boundary and
  // skip chapter 1 in Firefox/desktop after smooth scrolling.
  const segmentProgress = (index + 0.12) / chapters.length;
  return Math.round(stageWrap.offsetTop + scrollable * segmentProgress);
}

function goToChapter(index, behavior='smooth'){
  const safeIndex = Math.max(0, Math.min(chapters.length - 1, Number(index) || 0));
  history.replaceState(null, '', `#${chapters[safeIndex].id}`);
  window.scrollTo({ top: chapterScrollY(safeIndex), behavior });
}

function goToIntro(behavior='smooth'){
  history.replaceState(null, '', '#intro');
  window.scrollTo({ top: 0, behavior });
}

nav.addEventListener('click', (event) => {
  const link = event.target.closest('a[data-chapter-index]');
  if(!link) return;
  event.preventDefault();
  goToChapter(Number(link.dataset.chapterIndex));
});

chapterRail.addEventListener('click', (event) => {
  const marker = event.target.closest('.rail-marker[data-chapter-index]');
  if(!marker) return;
  goToChapter(Number(marker.dataset.chapterIndex));
});

document.querySelectorAll('.start').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    goToChapter(0);
  });
});

document.querySelector('.brand')?.addEventListener('click', (event) => {
  event.preventDefault();
  goToIntro();
});

card.addEventListener('click', (event) => {
  const button = event.target.closest('.learn-toggle');
  if(!button) return;
  const isOpen = learnPanel.classList.toggle('open');
  card.classList.toggle('learn-open', isOpen);
  learnPanel.setAttribute('aria-hidden', String(!isOpen));
  button.setAttribute('aria-expanded', String(isOpen));
});

learnPanel.addEventListener('click', (event) => {
  if(!event.target.closest('.learn-close')) return;
  learnPanel.classList.remove('open');
  card.classList.remove('learn-open');
  learnPanel.setAttribute('aria-hidden','true');
  card.querySelector('.learn-toggle')?.setAttribute('aria-expanded','false');
});

addEventListener('keydown', (event) => {
  if(event.key !== 'Escape') return;
  learnPanel.classList.remove('open');
  card.classList.remove('learn-open');
  learnPanel.setAttribute('aria-hidden','true');
  card.querySelector('.learn-toggle')?.setAttribute('aria-expanded','false');
});

function renderChapter(i){
  const ch=chapters[i];
  learnPanel.classList.remove('open');
  card.classList.remove('learn-open');
  learnPanel.setAttribute('aria-hidden','true');
  document.documentElement.style.setProperty('--scene-a', ch.palette[0]);
  document.documentElement.style.setProperty('--scene-b', ch.palette[1]);
  document.documentElement.style.setProperty('--scene-c', ch.palette[2]);
  const imageMarkup = ch.mobile_image ? `<picture><source media="(max-width: 760px)" srcset="${ch.mobile_image}"><img class="scene-image" src="${ch.image}" alt="${ch.image_alt || ch.title}" loading="eager" onerror="this.closest('picture')?.remove(); document.querySelector('.svg-fallback')?.classList.add('revealed');"></picture>` : `<img class="scene-image" src="${ch.image}" alt="${ch.image_alt || ch.title}" loading="eager" onerror="this.remove(); this.nextElementSibling?.classList.add('revealed');">`;
  const art = ch.image ? `${imageMarkup}<div class="svg-fallback">${sceneSvg(ch,i)}</div>` : sceneSvg(ch,i);
  const layer=document.createElement('div');
  layer.className='scene-layer is-entering';
  layer.dataset.chapter=ch.id;
  layer.innerHTML=`<div class="scene">${art}</div>`;
  orbit.appendChild(layer);
  requestAnimationFrame(() => layer.classList.remove('is-entering'));
  [...orbit.querySelectorAll('.scene-layer')].forEach(existing => {
    if(existing === layer) return;
    existing.classList.add('is-leaving');
    setTimeout(() => existing.remove(), 900);
  });
  card.className=`chapter-card ${ch.side} is-changing`;
  card.innerHTML=`<div class="act-label"><span>${ch.act || ''}</span><b>${ch.act_title || ''}</b></div><div class="kicker">${ch.kicker} · ${ch.period}</div><h2>${ch.title}</h2><div class="meta">${ch.place} · ${ch.focus}</div><p>${ch.text}</p><p class="transition-line">${ch.transition || ''}</p><button class="learn-toggle" type="button" aria-expanded="false">Learn more</button>`;
  const details=ch.learn_more || {};
  learnPanel.innerHTML=`<button class="learn-close" type="button" aria-label="Close details">×</button><p class="kicker">Deeper note</p><h3>${ch.title}</h3><dl><dt>What to notice</dt><dd>${details.look || ''}</dd><dt>Why it mattered</dt><dd>${details.matter || ''}</dd><dt>Small detail</dt><dd>${details.detail || ''}</dd><dt>Legacy</dt><dd>${details.legacy || ''}</dd></dl>`;
  requestAnimationFrame(() => card.classList.remove('is-changing'));
  count.textContent=`${String(i+1).padStart(2,'0')} / ${String(chapters.length).padStart(2,'0')}`;
  [...nav.children].forEach((a,n)=>a.classList.toggle('active',n===i));
  [...chapterRail.children].forEach((m,n)=>m.classList.toggle('active',n===i));
  updateChapterSound(i, 0);
}
let active=-1;
function update(){
  const max=document.documentElement.scrollHeight-innerHeight;
  const total=max?scrollY/max:0;
  document.documentElement.style.setProperty('--progress', total.toFixed(4));
  const wrap=stageWrap;
  const rect=wrap.getBoundingClientRect();
  const scrollable=wrap.offsetHeight-innerHeight;
  const local=Math.min(1,Math.max(0,-rect.top/scrollable));
  const raw=local*chapters.length;
  const idx=Math.min(chapters.length-1,Math.max(0,Math.floor(raw)));
  const cp=raw-idx;
  document.documentElement.style.setProperty('--chapter-progress', cp.toFixed(4));
  updateChapterSound(idx, cp);
  if(idx!==active){
    active=idx; renderChapter(idx);
    const next=chapters[idx+1];
    if(next?.image){ const img=new Image(); img.src=next.image; }
    if(next?.mobile_image){ const mobileImg=new Image(); mobileImg.src=next.mobile_image; }
  }  
}
let ticking=false;
addEventListener('scroll',()=>{
  if(ticking) return;
  ticking=true;
  requestAnimationFrame(()=>{ update(); ticking=false; });
},{passive:true});
addEventListener('resize',update);
renderChapter(0);
update();

const hashIndex = chapters.findIndex(ch => `#${ch.id}` === location.hash);
if(hashIndex >= 0){
  // Normalize direct loads such as /#cave to the stable scroll segment.
  requestAnimationFrame(() => goToChapter(hashIndex, 'auto'));
}
