/* ===== VIDEO DATA — add an object to add a video =====
   video: local MP4 path OR a full https:// URL (e.g. hosted on Cloudinary/Bunny/R2)
   Replace placeholder thumbnails (.svg) with your own .jpg files. */
const videos = [
  { title: "Exfoliating Cream Ad", category: "Skincare", thumbnail: "assets/thumbnails/exfoliating-cream-thumb.jpeg", video: "assets/videos/Exfoliate-cream-ad.mp4", brand: "" },
  { title: "Lip Repair Stick Ad", category: "Lip Care", thumbnail: "assets/thumbnails/lip-repairstick-thumb.jpeg", video: "assets/videos/lip-repair-stick-ad.mp4", brand: "" },
  { title: "Men's Facewash Ad", category: "Men's Grooming", thumbnail: "assets/thumbnails/mens-facewash-thumb.jpeg", video: "assets/videos/Mens-facewash-ad.mp4", brand: "" },
  { title: "Sunscreen Ad", category: "Skincare", thumbnail: "assets/thumbnails/sunscreen-thumb.jpeg", video: "assets/videos/Sunscreen-ad.mp4", brand: "" }
];

(function () {
  const grid = document.getElementById("phones"), modal = document.getElementById("modal"),
    player = document.getElementById("player"), box = modal.querySelector(".modal-box"),
    cap = document.getElementById("modalCap"), playBtn = document.getElementById("modalPlay");
  let opener = null;

  grid.innerHTML = videos.map((v, i) => `
    <button class="phone rv" style="--d:${(i % 4) * .08}s" data-i="${i}" aria-label="Play ${v.title}">
      <div class="phone-frame"><img loading="lazy" src="${v.thumbnail}" alt="${v.title} thumbnail"><i class="play"></i></div>
      <div class="phone-meta"><b>${v.title}</b><span>${[v.category, v.brand].filter(Boolean).join(" · ")}</span></div>
    </button>`).join("");

  const sync = () => box.classList.toggle("paused", player.paused);
  const toggle = () => (player.paused ? player.play().catch(() => {}) : player.pause());

  function open(i) {
    const v = videos[i]; opener = document.activeElement;
    player.src = v.video; player.poster = v.thumbnail;  // video loads only now
    cap.textContent = `${v.title} · ${v.category}`;
    modal.hidden = false; document.body.style.overflow = "hidden";
    requestAnimationFrame(() => modal.classList.add("open"));
    player.play().catch(() => {}); sync(); document.getElementById("modalClose").focus();
  }
  function close() {
    player.pause(); player.removeAttribute("src"); player.load();
    modal.classList.remove("open"); document.body.style.overflow = "";
    setTimeout(() => { modal.hidden = true; }, 350); opener && opener.focus();
  }
  grid.addEventListener("click", e => { const b = e.target.closest(".phone"); b && open(+b.dataset.i); });
  playBtn.addEventListener("click", toggle); player.addEventListener("click", toggle);
  ["play", "pause", "ended"].forEach(ev => player.addEventListener(ev, sync));
  document.getElementById("modalClose").addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
})();