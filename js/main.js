/* PHOTODOCTOR — 공통 스크립트 (의존성 없음) */
(function () {
  'use strict';

  /* ---------- 채널톡 열기 ---------- */
  document.querySelectorAll('[data-channel-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.ChannelIO) { window.ChannelIO('showMessenger'); }
    });
  });


  /* ---------- Before/After 슬라이더 ---------- */
  document.querySelectorAll('.ba').forEach(function (ba) {
    var range = ba.querySelector('input[type=range]');
    function set(v) { v = Math.max(0, Math.min(100, v)); ba.style.setProperty('--pos', v + '%'); range.value = v; }
    range.addEventListener('input', function () { set(+range.value); });
    var dragging = false;
    function fromEvent(e) {
      var r = ba.getBoundingClientRect(); var x = (e.touches ? e.touches[0].clientX : e.clientX) - r.left;
      set(x / r.width * 100);
    }
    ba.addEventListener('pointerdown', function (e) { dragging = true; ba.setPointerCapture(e.pointerId); fromEvent(e); });
    ba.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    ba.addEventListener('pointerup', function () { dragging = false; });
    ba.addEventListener('pointercancel', function () { dragging = false; });
    set(50);
  });

  /* ---------- 갤러리 더보기/접기 ---------- */
  document.querySelectorAll('[data-gallery-toggle]').forEach(function (btn) {
    var target = document.querySelector(btn.getAttribute('data-gallery-toggle'));
    if (!target) return;
    btn.addEventListener('click', function () {
      var open = target.classList.toggle('is-open');
      btn.textContent = open ? btn.getAttribute('data-label-open') : btn.getAttribute('data-label-closed');
      if (!open) { target.closest('section').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ---------- 라이트박스 (열린 갤러리 전체를 하나의 목록으로) ---------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCount = lb.querySelector('.lightbox__count');
    var items = [];
    var idx = 0;

    function visibleItems() {
      return Array.prototype.filter.call(document.querySelectorAll('.gallery .g'), function (it) {
        return it.offsetParent !== null;
      });
    }
    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      lbImg.src = it.getAttribute('data-full') || it.querySelector('img').src;
      lbImg.alt = it.querySelector('img').alt;
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(el) {
      items = visibleItems();
      show(items.indexOf(el));
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }
    document.addEventListener('click', function (e) {
      var it = e.target.closest('.gallery .g');
      if (it) open(it);
    });
    lb.querySelector('.lightbox__close').addEventListener('click', close);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
    // 모바일 스와이프
    var sx = 0;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) show(dx < 0 ? idx + 1 : idx - 1);
    }, { passive: true });
  }

  /* ---------- FAQ 더보기 ---------- */
  document.querySelectorAll('[data-faq-more]').forEach(function (btn) {
    var faq = document.querySelector('.faq');
    btn.addEventListener('click', function () {
      var open = faq.classList.toggle('is-open');
      btn.textContent = open ? btn.getAttribute('data-label-open') : btn.getAttribute('data-label-closed');
    });
  });

  /* ---------- FAQ 아코디언 ---------- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var open = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
