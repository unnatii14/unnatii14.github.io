/* =====================================================
   Unnati Tank — Portfolio · scripts
   ===================================================== */

/* ---------- 1. Featured Projects (top 6 from resume + SleepyTales) ---------- */
const featuredRepos = [
  {
    owner: "unnatii14",
    name: "MeetFlow",
    title: "MeetFlow · AI Meeting-to-Task SaaS",
    blurb:
      "Three-stage LangChain pipeline (clean → extract → validate) that turns meeting transcripts into structured tasks and auto-syncs them to Slack. Role-based dashboards on Next.js + Supabase, load-tested to 500 concurrent users.",
    tags: ["Next.js", "LangChain", "Supabase", "Node.js", "SaaS"],
    demo: "https://meetflow-demo.vercel.app/",
    repo: "https://github.com/unnatii14",
    language: "Next.js · LangChain",
    badge: "🏆 Top 100 / 502 — CHARUSAT Hacks 2026",
  },
  {
    owner: "unnatii14",
    name: "Smart-Chatbot",
    title: "SmartChat · RAG Document Q&A",
    blurb:
      "Production-ready RAG chatbot with TinyLlama + FAISS vector search. Embedding generation, similarity search, and context-aware response synthesis through a Gradio UI. Cut document query latency 30% vs. baseline at Infynno Solutions.",
    tags: ["TinyLlama", "RAG", "FAISS", "Gradio", "FastAPI"],
    repo: "https://github.com/unnatii14/Smart-Chatbot",
    language: "Python · NLP",
    badge: "💼 Built during Infynno internship",
  },
  {
    owner: "unnatii14",
    name: "Myopia-Risk-Prediction",
    title: "Myopia Risk Prediction System",
    blurb:
      "Three-stage ML pipeline on 5,000 pediatric records: refractive error detection (XGBoost, AUC 0.943), risk progression (81.2% accuracy), and diopter estimation (MAE 1.75 D). 35 domain-engineered features with permutation-importance explainability.",
    tags: ["XGBoost", "React", "TypeScript", "Tailwind", "Healthcare"],
    demo: "https://health-decode.vercel.app/",
    repo: "https://github.com/unnatii14/Myopia-Risk-Prediction",
    language: "Python · React",
    badge: "🏥 Production healthcare ML",
  },
  {
    owner: "unnatii14",
    name: "aquavision-flutter",
    title: "AquaVision · Fish Species Classifier",
    blurb:
      "Cross-platform Flutter app with FastAPI backend serving a fine-tuned EfficientNet-B0 for real-time fish species classification from camera input. Similarity search and confidence-scored predictions with sub-second inference latency.",
    tags: ["Flutter", "FastAPI", "EfficientNet", "Computer Vision"],
    repo: "https://github.com/unnatii14/aquavision-flutter",
    language: "Flutter · CV",
    badge: "📱 Real-time on-device",
  },
  {
    owner: "unnatii14",
    name: "Indian-Constitution-Vault",
    title: "Indian Constitution Vault",
    blurb:
      "Offline Flutter app on Google Play providing access to 2,000+ legal sections (BNS, BNSS, BSA, Constitution) with Law Finder, bookmarks, and text-to-speech. Smart search with legal abbreviation expansion for everyday citizens.",
    tags: ["Flutter", "Riverpod", "GoRouter", "Legal-Tech"],
    demo: "https://play.google.com/store/apps/details?id=com.indianlaw.indian_constitution_vault",
    repo: "https://github.com/unnatii14/Indian-Constitution-Vault",
    language: "Flutter · Mobile",
    badge: "🌐 Live on Google Play",
  },
  {
    owner: "unnatii14",
    name: "sleepytales-App",
    title: "SleepyTales · Bedtime Stories & Lullabies 🌙",
    blurb:
      "Flutter mobile app helping kids drift to sleep with 42 bedtime stories across 7 categories and 14 classic nursery rhymes. AI-powered TTS narration with customizable speed, pitch, and volume. 100% offline with favorites, mini-player, and dark theme tuned for nighttime use.",
    tags: ["Flutter", "AI TTS", "Offline-First", "Kids", "Audio"],
    demo: "https://play.google.com/store/apps/details?id=com.sleepytales.app",
    repo: "https://github.com/unnatii14/sleepytales-App",
    language: "Flutter · Mobile",
    badge: "🌙 Live on Google Play",
  },
];

async function hydrateRepo(repo) {
  const endpoint = `https://api.github.com/repos/${repo.owner}/${repo.name}`;
  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Failed to fetch ${repo.name}`);
    const data = await res.json();
    return {
      ...repo,
      url: data.html_url,
      stars: data.stargazers_count ?? 0,
      ghLanguage: data.language ?? "",
    };
  } catch (error) {
    console.warn(error.message);
    return { ...repo, url: repo.repo, stars: "—", ghLanguage: "" };
  }
}

async function renderProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  const hydrated = await Promise.all(featuredRepos.map(hydrateRepo));
  grid.innerHTML = "";

  hydrated.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card tilt-card";

    const demoLink = repo.demo
      ? `<a class="project-link demo" href="${repo.demo}" target="_blank" rel="noopener">Live demo →</a>`
      : "";
    const repoUrl = repo.url || repo.repo;

    card.innerHTML = `
      <div class="project-meta">
        <span class="lang">${repo.language}</span>
        <span>★ ${repo.stars}</span>
      </div>
      <h3>${repo.title}</h3>
      ${repo.badge ? `<div class="project-badge" style="font-family:var(--font-mono);font-size:0.72rem;color:var(--c-violet);background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.25);padding:0.3rem 0.65rem;border-radius:999px;width:fit-content;">${repo.badge}</div>` : ""}
      <p>${repo.blurb}</p>
      <div class="tag-list">
        ${repo.tags.map((t) => `<span>${t}</span>`).join("")}
      </div>
      <div class="project-links">
        ${demoLink}
        <a class="project-link" href="${repoUrl}" target="_blank" rel="noopener">View code ↗</a>
      </div>
    `;
    grid.appendChild(card);
  });

  initTilt();
}

/* ---------- 2. Scroll-reveal observer ---------- */
function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -80px 0px" }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
}

/* ---------- 3. Smooth scroll nav ---------- */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll("[data-panel-target]");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const target = link.dataset.panelTarget;
      if (target === "none") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const section = document.getElementById(target);
      if (section) {
        const offsetTop = section.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
}

/* ---------- 4. Scroll spy ---------- */
function initScrollSpy() {
  const sections = document.querySelectorAll("[data-panel]");
  const navLinks = document.querySelectorAll("[data-panel-target]");
  let ticking = false;

  function update() {
    let current = "";
    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top - 200 <= 0) current = section.getAttribute("data-panel");
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.panelTarget === current) link.classList.add("active");
    });

    if (window.pageYOffset < 300) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.panelTarget === "none") link.classList.add("active");
      });
    }
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ---------- 5. Particles ---------- */
function createParticles() {
  const container = document.getElementById("particles");
  if (!container) return;
  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 8}s`;
    p.style.animationDuration = `${8 + Math.random() * 4}s`;
    container.appendChild(p);
  }
}

/* ---------- 6. Typing effect ---------- */
function initTypingEffect() {
  const el = document.querySelector(".typing-text");
  if (!el) return;

  const phrases = [
    "AI/ML Engineer in training",
    "Building RAG systems with LangChain",
    "Computer Vision researcher",
    "Full-stack ML deployer",
    "Flutter & FastAPI shipper",
    "Hackathon nerd · paper reader",
  ];

  let phraseIndex = 0, charIndex = 0, isDeleting = false, speed = 90;

  function type() {
    const phrase = phrases[phraseIndex];
    if (isDeleting) {
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      speed = 40;
    } else {
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      speed = 80;
    }

    if (!isDeleting && charIndex === phrase.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
}

/* ---------- 7. Stat counter animation ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10) || 0;
        const duration = 1500;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

/* ---------- 8. Scroll-to-top button ---------- */
function initScrollTopButton() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.pageYOffset > 400);
  }, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* ---------- 9. Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = `${(window.pageYOffset / h) * 100}%`;
  }, { passive: true });
}

/* ---------- 10. Mobile nav ---------- */
function initMobileMenu() {
  const toggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;
  const links = nav.querySelectorAll("a");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
  });
  links.forEach((l) =>
    l.addEventListener("click", () => {
      toggle.classList.remove("active");
      nav.classList.remove("active");
    })
  );
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove("active");
      nav.classList.remove("active");
    }
  });
}

/* ---------- 11. 3D Tilt on cards ---------- */
function initTilt() {
  const cards = document.querySelectorAll(".tilt-card");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  cards.forEach((card) => {
    if (card.dataset.tiltBound === "true") return;
    card.dataset.tiltBound = "true";

    let rafId = null;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 6;
      const rotateX = -((y - cy) / cy) * 6;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      });
    });

    card.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    });
  });
}

/* ---------- 12. Cursor glow follower (desktop) ---------- */
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.matchMedia("(max-width: 900px)").matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX, glowY = mouseY;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function loop() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();
}

/* ---------- 13. Contact form (EmailJS + mailto fallback) ---------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = submitBtn.querySelector("span");
  const statusMsg = form.querySelector(".form-status");
  const originalText = submitText ? submitText.textContent : submitBtn.textContent;

  function setBtn(text, color) {
    if (submitText) submitText.textContent = text;
    else submitBtn.textContent = text;
    if (color) submitBtn.style.background = color;
  }
  function resetBtn() {
    setBtn(originalText, "");
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    if (statusMsg) statusMsg.style.display = "none";
  }

  function mailtoFallback(form) {
    const fd = new FormData(form);
    const name = fd.get("from_name");
    const email = fd.get("reply_to");
    const message = fd.get("message");
    const subj = encodeURIComponent("Portfolio contact from " + name);
    const body = encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message);
    window.location.href = "mailto:unnatitank14@gmail.com?subject=" + subj + "&body=" + body;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.75";
    setBtn("Sending…");

    if (statusMsg) {
      statusMsg.textContent = "Sending your message…";
      statusMsg.style.color = "var(--c-cyan)";
      statusMsg.style.display = "block";
    }

    if (typeof emailjs === "undefined") {
      mailtoFallback(form);
      setBtn("✓ Email opened", "#10b981");
      setTimeout(() => { form.reset(); resetBtn(); }, 3000);
      return;
    }

    emailjs.sendForm("service_mq0tuzq", "template_bkh40xu", form).then(
      () => {
        setBtn("✓ Sent!", "#10b981");
        if (statusMsg) {
          statusMsg.textContent = "Thanks — I'll reply within 24h.";
          statusMsg.style.color = "#10b981";
        }
        form.reset();
        setTimeout(resetBtn, 3500);
      },
      (err) => {
        console.error("EmailJS error", err);
        mailtoFallback(form);
        setBtn("✓ Email opened", "#f59e0b");
        if (statusMsg) {
          statusMsg.textContent = "Opened your email client as backup.";
          statusMsg.style.color = "#f59e0b";
        }
        setTimeout(() => { form.reset(); resetBtn(); }, 3000);
      }
    );
  });
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("js-enabled");
  renderProjects();
  initAnimations();
  initSmoothScroll();
  initScrollSpy();
  createParticles();
  initTypingEffect();
  initCounters();
  initScrollTopButton();
  initScrollProgress();
  initMobileMenu();
  initTilt();
  initCursorGlow();
  initContactForm();
});

