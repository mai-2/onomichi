"use strict";

function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
//375px 未満は JS で viewport を固定する
// =============================
(function () {
  var viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    var value = window.outerWidth > 375 ? "width=device-width,initial-scale=1" : "width=375";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

// ドロワーメニュー
// =============================
var drawerIcon = jQuery("#js-drawer-icon");
var drawerContents = jQuery("#js-drawer-content");
drawerIcon.on("click", function (e) {
  e.preventDefault();
  drawerIcon.toggleClass("is-checked");
  drawerContents.slideToggle(300);
  jQuery("body").toggleClass("is-fixed");
});
drawerContents.find("a").on("click", function (e) {
  e.preventDefault();
  drawerIcon.trigger("click");
});

// キャンペーンについてスライダー
// =============================
var aboutSwiperWrap = document.querySelector("#js-about-swiper-wrap");
var aboutSwiperSlides = aboutSwiperWrap.querySelectorAll(".swiper-slide");

// 動きを滑らかにするCSS
aboutSwiperWrap.style.transitionTimingFunction = "linear";

// 無限ループのためスライドを複製する処理
function cloneAndAppend(element, swiperWrap) {
  var clonedElement = element.cloneNode(true);
  swiperWrap.appendChild(clonedElement);
}
var _iterator = _createForOfIteratorHelper(aboutSwiperSlides),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var aboutSwiperSlide = _step.value;
    cloneAndAppend(aboutSwiperSlide, aboutSwiperWrap);
  }

  // スライダーオプション
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
var aboutSwiper = new Swiper('#js-about-swiper', {
  loop: true,
  // 無限ループ
  width: 100,
  // スライドの横幅
  spaceBetween: 10,
  // スライド間の余白
  speed: 3000,
  // スピード
  simulateTouch: false,
  // タッチイベントを無効

  autoplay: {
    delay: 0,
    // スライドが止まる時間
    disableOnInteraction: false // 自動再生を止めない
  },
  virtual: {
    enabled: true,
    // バーチャルスライドを有効にする
    addSlidesAfter: 10 // 事前レンダリングする枚数、スライドの表示枚数
  },
  breakpoints: {
    // 900px以上のオプション
    900: {
      spaceBetween: 20,
      // スライド間の余白
      width: 200 // スライドの横幅
    }
  }
});

// おすすめスポットスライダー
// =============================
var spotsSwiper = new Swiper("#js-spots-swiper", {
  loop: true,
  // ループ
  spaceBetween: 16,
  // スライド間余白
  slidesPerView: 1.5273,
  // 表示スライド枚数
  centeredSlides: true,
  // アクティブなスライドを中央
  keyboard: true,
  // キーボード操作
  navigation: {
    nextEl: "#js-spots-next",
    prevEl: "#js-spots-prev"
  },
  breakpoints: {
    // 600px以上のオプション
    600: {
      slidesPerView: 2,
      // 表示スライド枚数
      centeredSlides: true // アクティブなスライドを中央
    },
    // 900px以上のオプション
    900: {
      slidesPerView: 2.2,
      // 表示スライド枚数
      centeredSlides: false // アクティブなスライドを中央
    },
    // 1200px以上のオプション
    1200: {
      slidesPerView: 3.2234,
      spaceBetween: 32,
      // スライド間余白
      centeredSlides: false // アクティブなスライドを中央
    }
  }
});

// モーダル
// =============================
jQuery(".js-modal-open").on("click", function (e) {
  e.preventDefault();
  var target = jQuery(this).data("target");
  jQuery("#" + target)[0].showModal();
  jQuery("html, body").css("overflow", "hidden");
});
jQuery(".js-modal-close").on("click", function (e) {
  e.preventDefault();
  jQuery(this).parents(".js-prizes-modal")[0].close();
  jQuery("html, body").css("overflow", "auto");
  jQuery(document.activeElement).blur();
});

// アコーディオン
// =============================
jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();
  if (jQuery(this).hasClass("is-open")) {
    jQuery(this).removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).addClass("is-open");
    jQuery(this).next().slideDown();
  }
});

// フォームバリデーション
// =============================
var form = jQuery("#js-form");
var inputElements = form.find(".js-form-input");
form.on("submit", function (e) {
  e.preventDefault();
  inputElements.removeClass("is-error");
  var isValid = form[0].checkValidity();
  if (isValid) {
    alert("送信完了");
    form[0].reset();
  }
});
inputElements.on("invalid", function () {
  jQuery(this).addClass("is-error");
});
inputElements.on("input", function () {
  if (this.checkValidity()) {
    jQuery(this).removeClass("is-error");
  }
});

// トップへ戻るボタン
//=============================
var pagetop = jQuery("#js-pagetop-button");
jQuery(window).on("scroll", function () {
  if (jQuery(window).scrollTop() > 300) {
    pagetop.fadeIn();
  } else {
    pagetop.fadeOut();
  }
});
pagetop.on("click", function () {
  var speed = 500;
  jQuery("body, html").animate({
    scrollTop: 0
  }, speed, "swing");
});

// スムーススクロール
//=============================
jQuery('a[href^="#"]').on("click", function () {
  var header = jQuery("#js-header");
  var headerHeight = header.innerHeight();
  var speed = 500;
  var id = jQuery(this).attr("href");
  var target = jQuery("#" == id ? "html" : id);
  var position = jQuery(target).offset().top - headerHeight;
  if ("fixed" !== header.css("position")) {
    jQuery(target).offset().top, _readOnlyError("position");
  }
  if (0 > position) {
    0, _readOnlyError("position");
  }
  jQuery("html, body").animate({
    scrollTop: position
  }, speed, "swing");
});