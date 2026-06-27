/* ===== CONFIG ===== */
var WEDDING = new Date("2026-09-12T17:40:00+09:00");
var GALLERY_COUNT = 9; // images/gallery-1.jpg ... gallery-9.jpg

/* ===== PETALS (꽃잎 흩날림) ===== */
(function petals() {
  var box = document.getElementById("coverPetals");
  if (!box) return;
  var glyphs = ["❀", "✿", "❁", "♥"];
  var N = 14;
  for (var i = 0; i < N; i++) {
    var s = document.createElement("span");
    s.className = "petal";
    s.textContent = glyphs[i % glyphs.length];
    s.style.left = Math.round((i / N) * 100 + (i % 3) * 4) + "%";
    var dur = 7 + (i % 5) * 1.6;            // 7~13s
    var delay = -(i * 0.9);                  // 흩어진 시작
    s.style.animationDuration = dur + "s";
    s.style.animationDelay = delay + "s";
    s.style.fontSize = (0.7 + (i % 4) * 0.22) + "rem";
    s.style.color = (i % 2 === 0) ? "rgba(255,255,255,0.9)" : "rgba(245,205,212,0.95)";
    box.appendChild(s);
  }
})();

/* ===== CALENDAR (September 2026) ===== */
(function buildCalendar() {
  var grid = document.getElementById("calendarGrid");
  if (!grid) return;
  var year = 2026, month = 8; // 8 = September
  var first = new Date(year, month, 1).getDay();
  var days = new Date(year, month + 1, 0).getDate();
  for (var i = 0; i < first; i++) {
    var e = document.createElement("div");
    e.className = "cal__day empty";
    grid.appendChild(e);
  }
  for (var d = 1; d <= days; d++) {
    var cell = document.createElement("div");
    cell.className = "cal__day";
    if (d === 12) cell.classList.add("is-wedding");
    cell.textContent = d;
    grid.appendChild(cell);
  }
})();

/* ===== D-DAY ===== */
(function dday() {
  var el = document.getElementById("dday");
  if (!el) return;
  var b = el.querySelector("b");
  var today = new Date();
  var t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  var w0 = new Date(WEDDING.getFullYear(), WEDDING.getMonth(), WEDDING.getDate());
  var diff = Math.round((w0 - t0) / 86400000);
  if (diff > 0) b.textContent = "D-" + diff;
  else if (diff === 0) { b.textContent = "D-DAY"; el.lastChild.textContent = " 입니다 💒"; }
  else b.textContent = "D+" + Math.abs(diff);
})();

/* ===== GALLERY ===== */
var lbImages = [], lbIndex = 0;
(function gallery() {
  var grid = document.getElementById("galleryGrid");
  if (!grid) return;
  for (var i = 1; i <= GALLERY_COUNT; i++) {
    var src = "images/gallery-" + i + ".jpg";
    lbImages.push(src);
    var item = document.createElement("div");
    item.className = "gallery__item";
    item.style.transitionDelay = ((i - 1) % 3) * 0.08 + "s";
    var img = document.createElement("img");
    img.src = src;
    img.alt = "갤러리 사진 " + i;
    img.loading = "lazy";
    (function (s) { item.addEventListener("click", function () { openLightbox(s); }); })(src);
    item.appendChild(img);
    grid.appendChild(item);
  }
})();

/* ===== LIGHTBOX ===== */
function openLightbox(src) {
  lbIndex = lbImages.indexOf(src);
  if (lbIndex < 0) lbIndex = 0;
  showLb();
  document.getElementById("lightbox").classList.add("open");
}
function showLb() { document.getElementById("lbImg").src = lbImages[lbIndex]; }
(function lightboxControls() {
  var box = document.getElementById("lightbox");
  if (!box) return;
  document.getElementById("lbClose").addEventListener("click", function () { box.classList.remove("open"); });
  document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; showLb(); });
  document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); lbIndex = (lbIndex + 1) % lbImages.length; showLb(); });
  box.addEventListener("click", function (e) { if (e.target === box) box.classList.remove("open"); });
})();

/* ===== ACCOUNT ACCORDION ===== */
document.querySelectorAll(".account__toggle").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var list = document.getElementById(btn.getAttribute("data-target"));
    btn.classList.toggle("open");
    if (list.style.maxHeight && list.style.maxHeight !== "0px") list.style.maxHeight = "0px";
    else list.style.maxHeight = list.scrollHeight + "px";
  });
});

/* ===== COPY ===== */
document.querySelectorAll(".account__copy").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var text = btn.getAttribute("data-copy");
    var done = function () { var o = btn.textContent; btn.textContent = "복사됨"; setTimeout(function () { btn.textContent = o; }, 1200); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    function fallback() { var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta); done(); }
  });
});

/* ===== SHARE ===== */
(function share() {
  var btn = document.getElementById("shareBtn");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var data = { title: "최인범 ♥ 김보현 결혼합니다", text: "2026년 9월 12일 토요일 오후 5시 40분, 월드컵 컨벤션", url: location.href };
    if (navigator.share) navigator.share(data).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () {
      btn.textContent = "링크가 복사되었어요"; setTimeout(function () { btn.textContent = "청첩장 공유하기"; }, 1500);
    });
  });
})();

/* ===== SCROLL REVEAL ===== */
(function reveal() {
  var els = document.querySelectorAll(".reveal, .gallery__item");
  if (!("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
})();
