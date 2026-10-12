(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var all = function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};

  // Split name into letters
  var n = 0;
  all('.split').forEach(function(el){
    var t = el.textContent; el.textContent = '';
    t.split('').forEach(function(ch){
      var s = document.createElement('span');
      s.textContent = ch; s.style.setProperty('--i', n++); el.appendChild(s);
    });
  });

  // Highlight current section in the menu
  var links = all('nav a');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting) return;
      links.forEach(function(a){ a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, {rootMargin:'-45% 0px -45% 0px'});
  all('section').forEach(function(s){ io.observe(s); });

  // Typed words in the tagline
  var word = document.getElementById('word');
  if(!reduce){
    var list = ['web development','programming','creative projects','engineering'], w = 0, c = 0, del = false;
    (function tick(){
      var cur = list[w];
      word.textContent = cur.slice(0, c);
      var wait = del ? 55 : 110;
      if(!del && c === cur.length){ del = true; wait = 1400; }
      else if(del && c === 0){ del = false; w = (w + 1) % list.length; wait = 300; }
      else c += del ? -1 : 1;
      setTimeout(tick, wait);
    })();
  }

  // Photo tilts toward the pointer
  var frame = document.getElementById('frame');
  if(!reduce && matchMedia('(hover:hover)').matches){
    document.getElementById('home').addEventListener('mousemove', function(e){
      var r = frame.getBoundingClientRect();
      var x = (e.clientX - (r.left + r.width/2)) / window.innerWidth;
      var y = (e.clientY - (r.top + r.height/2)) / window.innerHeight;
      frame.style.transform = 'perspective(800px) rotateY(' + (x*14) + 'deg) rotateX(' + (-y*14) + 'deg)';
    });
    document.getElementById('home').addEventListener('mouseleave', function(){ frame.style.transform = ''; });
  }

  // Scrolling band
  var track = document.getElementById('track');
  var group = '';
  for(var i = 0; i < 6; i++) group += '<span>Web development</span><span>Programming</span><span>Creative projects</span><span>Engineering</span>';
  track.innerHTML = group + group;

  // Copy email
  var btn = document.getElementById('copy');
  btn.addEventListener('click', function(){
    var done = function(){ btn.textContent = 'Copied'; setTimeout(function(){ btn.textContent = 'Copy'; }, 1600); };
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText('kushalgh667@gmail.com').then(done, function(){ btn.textContent = 'Select email to copy'; setTimeout(function(){ btn.textContent = 'Copy'; }, 1800); }); } else { btn.textContent = 'Copy unavailable'; setTimeout(function(){ btn.textContent = 'Copy'; }, 1800); }
  });

  // Nepal time
  var clock = document.getElementById('clock');
  function setTime(){
    try{ clock.textContent = new Date().toLocaleTimeString('en-GB', {timeZone:'Asia/Kathmandu', hour:'2-digit', minute:'2-digit'}); }catch(err){}
  }
  setTime(); setInterval(setTime, 30000);
})();
