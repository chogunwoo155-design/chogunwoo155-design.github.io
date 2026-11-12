(function () {
  var root = document.documentElement;

  // 테마 전환 (시스템 설정 기본, 선택 시 기억)
  var toggle = document.querySelector('.theme-toggle');
  function isDark() {
    var t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // PDF로 저장
  document.querySelectorAll('[data-print]').forEach(function (btn) {
    btn.addEventListener('click', function () { window.print(); });
  });

  // 기록 필터
  var buttons = document.querySelectorAll('.filters button');
  var items = document.querySelectorAll('.timeline > li');
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      items.forEach(function (li) {
        var cats = (li.getAttribute('data-cat') || '').split(/\s+/);
        li.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
      });
    });
  });
})();
