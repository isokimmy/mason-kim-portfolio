(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if('scrollRestoration' in history){ history.scrollRestoration='manual'; }
  var yr = document.getElementById('yr'); if(yr) yr.textContent = new Date().getFullYear();

  /* ---- Split headline stagger ---- */
  document.querySelectorAll('.display .w > i').forEach(function(i, idx){
    if(reduce){ i.style.transform='none'; return; }
    i.style.animationDelay = (0.12 + idx*0.07)+'s';
  });

  /* ---- Reveal on scroll (with masked headings) ---- */
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .mask').forEach(function(el,i){
    el.style.transitionDelay = Math.min((i%8)*40,300)+'ms'; io.observe(el);
  });

  /* ---- Count-up (rapid 0 -> target) ---- */
  function animateNum(el){
    if(el.dataset.done) return; el.dataset.done='1';
    var target=parseFloat(el.dataset.count), pre=el.dataset.prefix||'', suf=el.dataset.suffix||'';
    /* count-up always runs (brief, non-vestibular) even under reduced-motion */
    var start=performance.now(), dur=1200;
    (function step(now){
      var p=Math.min((now-start)/dur,1), e=1-Math.pow(1-p,4); /* snappy ease-out */
      el.textContent=pre+Math.round(target*e)+suf;
      if(p<1) requestAnimationFrame(step);
    })(start);
  }
  var numIO=new IntersectionObserver(function(es,ob){
    es.forEach(function(e){ if(e.isIntersecting){ animateNum(e.target); ob.unobserve(e.target); } });
  },{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(n){ numIO.observe(n); });

  /* ---- Unified scroll: progress + header + prism drift ---- */
  var prog=document.getElementById('progress'), hdr=document.getElementById('hdr'),
      pr=document.querySelector('.prism .parallax');
  function onScroll(){
    var y=window.scrollY, h=document.documentElement.scrollHeight-window.innerHeight;
    if(prog) prog.style.width=(h>0 ? y/h*100 : 0)+'%';
    if(hdr) hdr.classList.toggle('scrolled', y>8);
    if(pr && !reduce){ pr.style.setProperty('--sy',(y*0.05)+'px'); pr.style.setProperty('--srot',(y*0.012)+'deg'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});

  /* ---- Prism pointer parallax ---- */
  if(!reduce){
    var hero=document.querySelector('.hero');
    if(pr && hero){
      hero.addEventListener('pointermove', function(ev){
        var r=hero.getBoundingClientRect();
        var dx=(ev.clientX-r.left)/r.width-.5, dy=(ev.clientY-r.top)/r.height-.5;
        pr.style.setProperty('--px',(dx*26).toFixed(1)+'px');
        pr.style.setProperty('--py',(dy*26).toFixed(1)+'px');
      });
      hero.addEventListener('pointerleave', function(){ pr.style.setProperty('--px','0px'); pr.style.setProperty('--py','0px'); });
    }
  }

  /* ---- Magnetic focal elements (clamped, lerped) ---- */
  if(fine && !reduce){
    document.querySelectorAll('.magnetic').forEach(function(el){
      var cx=0,cy=0,tx=0,ty=0,raf=null;
      function loop(){
        cx+=(tx-cx)*.18; cy+=(ty-cy)*.18;
        el.style.transform='translate('+cx.toFixed(2)+'px,'+cy.toFixed(2)+'px)';
        if(Math.abs(tx-cx)>.1||Math.abs(ty-cy)>.1){ raf=requestAnimationFrame(loop); } else { raf=null; }
      }
      function kick(){ if(!raf) raf=requestAnimationFrame(loop); }
      el.addEventListener('pointermove', function(e){
        var r=el.getBoundingClientRect();
        tx=(e.clientX-r.left-r.width/2)*.3; ty=(e.clientY-r.top-r.height/2)*.4; kick();
      });
      el.addEventListener('pointerleave', function(){ tx=0; ty=0; kick(); });
    });
  }

  /* ---- Custom chromatic cursor (desktop only) ---- */
  if(fine){
    var ring=document.querySelector('.cur-ring'), dot=document.querySelector('.cur-dot');
    if(ring && dot){
      document.body.classList.add('has-cursor');
      var mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
      document.addEventListener('pointermove', function(e){
        mx=e.clientX; my=e.clientY;
        dot.style.transform='translate('+mx+'px,'+my+'px) translate(-50%,-50%)';
      });
      (function ring_loop(){
        rx+=(mx-rx)*(reduce?1:.2); ry+=(my-ry)*(reduce?1:.2);
        ring.style.transform='translate('+rx+'px,'+ry+'px) translate(-50%,-50%)';
        requestAnimationFrame(ring_loop);
      })();
      document.querySelectorAll('a,button,.tag').forEach(function(el){
        el.addEventListener('pointerenter', function(){ ring.classList.add('hot'); });
        el.addEventListener('pointerleave', function(){ ring.classList.remove('hot'); });
      });
      document.addEventListener('mouseleave', function(){ ring.classList.add('hide'); dot.classList.add('hide'); });
      document.addEventListener('mouseenter', function(){ ring.classList.remove('hide'); dot.classList.remove('hide'); });
    }
  }
})();
