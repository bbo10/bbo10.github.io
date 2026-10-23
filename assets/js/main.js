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
  var items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
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
