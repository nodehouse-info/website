(()=>{
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const yr=$('#yr');if(yr)yr.textContent=new Date().getFullYear();
  const nav=$('#nav');const onNav=()=>nav.classList.toggle('solid',scrollY>40);addEventListener('scroll',onNav,{passive:true});onNav();
  const mb=$('#menu-btn');if(mb)mb.addEventListener('click',()=>{const o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'Sluiten':'Menu';document.body.style.overflow=o?'hidden':''});
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
  $$('.reveal').forEach(el=>io.observe(el));
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // stagger reveals in grids
  $$('.cards,.process,.facts,.people,.builds').forEach(g=>[...g.children].forEach((c,i)=>{c.classList.add('reveal','d'+Math.min(3,i%4));io.observe(c)}));
  // scroll progress
  const bar=document.createElement('div');bar.className='progress';document.body.appendChild(bar);
  const onP=()=>{const h=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${h>0?scrollY/h:0})`};addEventListener('scroll',onP,{passive:true});onP();
  // spotlight on cards
  $$('.card,.person').forEach(c=>c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')}));
  if(!RM&&matchMedia('(pointer:fine)').matches){
    // magnetic buttons
    $$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.18}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
    // tilt
    $$('.tilt').forEach(t=>{t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(900px) rotateY(${x*6}deg) rotateX(${-y*6}deg)`});t.addEventListener('pointerleave',()=>t.style.transform='')});
  }
  // typing rotator
  const rot=$('#rot');
  if(rot&&!RM){const w='meewerkt.';rot.textContent='';let i=0;const t=()=>{i++;rot.textContent=w.slice(0,i);if(i<w.length)setTimeout(t,85)};setTimeout(t,1100)}
  // path fill on scroll
  const path=$('#path');
  if(path){const pf=$('#pfill'),st=$$('.pstep');const upd=()=>{const r=path.getBoundingClientRect(),c=innerHeight*.6;const k=Math.min(1,Math.max(0,(c-r.top)/r.height));pf.style.height=(k*100)+'%';st.forEach(li=>{const d=li.querySelector('.pdot').getBoundingClientRect();li.classList.toggle('past',d.top<c)})};addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});upd()}
  const form=$('#form'),msg=$('#msg');
  if(form)form.addEventListener('submit',async e=>{
    e.preventDefault();msg.className='form-msg';
    if(!form.checkValidity()){const bad=form.querySelector(':invalid');
      msg.textContent=bad.type==='checkbox'?'Vink de toestemming aan om te versturen.':bad.type==='email'?'Vul een geldig e-mailadres in.':'Vul alle verplichte velden in.';
      msg.classList.add('err');bad.focus();return}
    const btn=form.querySelector('button');btn.disabled=true;msg.textContent='Bezig met versturen…';
    try{const res=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(form)).toString()});
      if(!res.ok)throw 0;form.reset();msg.textContent='Bedankt! We nemen binnen twee werkdagen contact met je op.';msg.classList.add('ok');
    }catch{msg.textContent='Versturen lukte niet. Mail ons rechtstreeks via info@nodehouse.be.';msg.classList.add('err')}
    finally{btn.disabled=false}});
})();
