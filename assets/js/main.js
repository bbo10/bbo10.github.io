(function () {
  document.documentElement.classList.remove('no-js');

  // 스크롤 시 헤더 경계선 표시
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 화면에 들어올 때 짧은 페이드인 (동작 줄이기 설정 시 생략)
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 첫 화면 인트로: 이름이 나타난 뒤 위로 걷히고, 첫 화면 문구가 순서대로 등장
  var root = document.documentElement;
  var intro = document.querySelector('.intro');
  var heroItems = document.querySelectorAll('.hero-item');
  function showHero() {
    heroItems.forEach(function (el) { el.classList.add('is-visible'); });
  }
  if (intro && root.classList.contains('has-intro')) {
    var finished = false;
    var finishIntro = function () {
      if (finished) return;
      finished = true;
      intro.classList.add('is-done');
      try { sessionStorage.setItem('introSeen', '1'); } catch (e) {}
      setTimeout(showHero, 250);
      setTimeout(function () { root.classList.remove('has-intro'); }, 650);
    };
    setTimeout(finishIntro, 1400);
    // 클릭하거나 키를 누르면 바로 건너뛰기
    intro.addEventListener('click', finishIntro);
    window.addEventListener('keydown', finishIntro, { once: true });
  } else {
    requestAnimationFrame(showHero);
  }

  // 같은 묶음 안의 카드는 0.08초 간격으로 차례로 등장
  document.querySelectorAll('.project-grid, .skill-grid').forEach(function (grid) {
    grid.querySelectorAll('.reveal').forEach(function (el, i) {
      el.style.setProperty('--d', (i * 0.08) + 's');
    });
  });

  var items = document.querySelectorAll('.reveal, .line-reveal:not(.hero-item)');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add('is-visible');
          io.unobserve(el);
          // 등장이 끝나면 지연값을 지워 호버 반응이 늦어지지 않게 함
          setTimeout(function () { el.style.removeProperty('--d'); }, 900);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // 상세 페이지 목차: 현재 읽는 항목 표시
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          tocLinks.forEach(function (a) { a.classList.remove('active'); });
          map[entry.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.block[id]').forEach(function (s) { spy.observe(s); });
  }
})();
