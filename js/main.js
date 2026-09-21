/* PHOTODOCTOR — 공통 스크립트 (의존성 없음) */
(function () {
  'use strict';

  /* ---------- 모바일 메뉴 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- 채널톡 열기 버튼 ---------- */
  document.querySelectorAll('[data-channel-open]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      if (window.ChannelIO) { window.ChannelIO('showMessenger'); }
    });
  });

  /* ---------- 갤러리 더보기 ---------- */
  document.querySelectorAll('[data-gallery-more]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-gallery-more'));
      if (!target) return;
      target.querySelectorAll('.gallery__item.is-hidden').forEach(function (it) { it.classList.remove('is-hidden'); });
      btn.parentNode.removeChild(btn);
    });
  });

  /* ---------- 라이트박스 ---------- */
  var lb = document.querySelector('.lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var lbCount = lb.querySelector('.lightbox__count');
    var items = [];
    var idx = 0;

    function collect(gallery) {
      return Array.prototype.map.call(gallery.querySelectorAll('.gallery__item'), function (it) {
        return { full: it.getAttribute('data-full') || it.querySelector('img').src, alt: it.querySelector('img').alt };
      });
    }
    function show(i) {
      idx = (i + items.length) % items.length;
      lbImg.src = items[idx].full;
      lbImg.alt = items[idx].alt;
      if (lbCount) lbCount.textContent = (idx + 1) + ' / ' + items.length;
    }
    function open(gallery, i) {
      items = collect(gallery);
      show(i);
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    document.querySelectorAll('.gallery').forEach(function (gallery) {
      gallery.addEventListener('click', function (e) {
        var it = e.target.closest('.gallery__item');
        if (!it) return;
        var all = Array.prototype.slice.call(gallery.querySelectorAll('.gallery__item'));
        open(gallery, all.indexOf(it));
      });
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
  }

  /* ---------- FAQ 아코디언 ---------- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var open = item.classList.toggle('is-open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
