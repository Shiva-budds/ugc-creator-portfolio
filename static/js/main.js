/* ===== WORK DATA — add an object to add a project =====
   size: "lg" | "md" | "sm" | "" controls the asymmetric layout */
const works = [
  { title: "Gold Chain Editorial", category: "Jewellery", brand: "Brand Placeholder", image: "assets/images/work-1.svg", size: "lg" },
  { title: "Daily Glow Routine", category: "Beauty & Skincare", brand: "Brand Placeholder", image: "assets/images/work-2.svg", size: "md" },
  { title: "Streetwear Capsule", category: "Fashion", brand: "Brand Placeholder", image: "assets/images/work-3.svg", size: "sm" },
  { title: "Chronograph Detail", category: "Watches", brand: "Brand Placeholder", image: "assets/images/work-4.svg", size: "sm" },
  { title: "Weekend Carry", category: "Lifestyle", brand: "Brand Placeholder", image: "assets/images/work-5.svg", size: "" },
  { title: "Wireless Audio", category: "Technology", brand: "Brand Placeholder", image: "assets/images/work-6.svg", size: "md" },
  { title: "Training Essentials", category: "Fitness", brand: "Brand Placeholder", image: "assets/images/work-7.svg", size: "lg" },
  { title: "Leather & Helmet", category: "Automotive", brand: "Brand Placeholder", image: "assets/images/work-8.svg", size: "md" },
  { title: "Desk Objects", category: "Other Products", brand: "Brand Placeholder", image: "assets/images/work-9.svg", size: "" }
];

(function () {
  const $ = s => document.querySelector(s);
  $("#year").textContent = new Date().getFullYear();

  $("#gallery").innerHTML = works.map((w, i) => `
    <figure class="work rv w-${w.size || "std"} ${w.size ? "w-" + w.size : ""}" style="--d:${(i % 3) * .1}s">
      <img loading="lazy" src="${w.image}" alt="${w.title}: ${w.category} content by the creator">
      <figcaption><span class="cat">${w.category}</span><span class="ttl">${w.title}</span><span class="brd">${w.brand}</span></figcaption>
    </figure>`).join("");

  // hero name: shrink the font until the longest line fits, whatever the name or font
  const name = $(".hero-name"), copy = $(".hero-copy");
  const fitName = () => {
    name.style.fontSize = "";
    const room = copy.clientWidth - parseFloat(getComputedStyle(copy).paddingLeft) * 2;
    const widest = Math.max(...[...name.children].map(s => s.scrollWidth));
    if (widest > room) name.style.fontSize = (parseFloat(getComputedStyle(name).fontSize) * room / widest * 0.97) + "px";
  };
  // where the middle photo starts, measured inside each name line (100% when the photo is hidden, e.g. on phones)
  const photo = $(".hero-img-a");
  const setCut = () => {
    const shown = getComputedStyle(photo).display !== "none";
    [...name.children].forEach(s => s.style.setProperty("--cut", shown ? (photo.getBoundingClientRect().left - s.getBoundingClientRect().left) + "px" : "100%"));
  };
  const layoutName = () => { fitName(); setCut(); };
  layoutName(); addEventListener("resize", layoutName);
  if (document.fonts) document.fonts.ready.then(layoutName);

  // nav: appears after leaving the hero
  const nav = $("#nav"), toggle = $("#navToggle"), links = $("#navLinks"), hero = $("#home");
  const onScroll = () => {
    nav.classList.toggle("show", scrollY > hero.offsetHeight * 0.6);
    document.querySelectorAll("[data-parallax]").forEach(el => {
      if (scrollY < innerHeight) el.style.transform = `translateY(${scrollY * el.dataset.parallax * -1}px)`;
    });
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  toggle.addEventListener("click", () => {
    const o = links.classList.toggle("open"); toggle.setAttribute("aria-expanded", o);
  });
  links.addEventListener("click", e => { if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", false); } });

  // active section indicator
  const anchors = [...links.querySelectorAll("a")];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) anchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("[data-section]").forEach(s => spy.observe(s));

  // reveal on scroll
  const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); rv.unobserve(e.target); } }), { threshold: .12 });
  document.querySelectorAll(".rv").forEach(el => rv.observe(el));

  // contact form: honest mailto fallback (edit CONTACT_EMAIL)
  const CONTACT_EMAIL = "hello@yourdomain.com";
  const form = $("#contactForm"), note = $("#formNote");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = new FormData(form); let ok = true;
    form.querySelectorAll("[required]").forEach(el => { const bad = !el.value.trim() || (el.type === "email" && !el.checkValidity()); el.classList.toggle("invalid", bad); ok = ok && !bad; });
    if (!ok) { note.textContent = "Please fill in your name, a valid email, and the project details."; return; }
    const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nBrand: ${f.get("brand") || "-"}\n\n${f.get("details")}`;
    location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Collaboration enquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    note.textContent = "Your email app should open with the message ready. Press send there to deliver it.";
  });
})();