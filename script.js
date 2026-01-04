const featuredRepos = [
  {
    owner: "unnatii14",
    name: "Smart-Chatbot",
    blurb:
      "Document-aware AI chatbot using TinyLlama with RAG. Features real-time document upload, FAISS vector search, and dynamic responses via Gradio UI. Built during Infynno Solutions internship.",
    tags: ["TinyLlama", "RAG", "FAISS", "Gradio", "FastAPI"],
  },
  {
    owner: "unnatii14",
    name: "Indian-Constitution-Vault",
    blurb:
      "Cross-platform mobile & web app with Flutter + FastAPI, making 2000+ Indian law sections accessible. Features Law Finder across 11 legal domains including Criminal Law, Property Rights, and Cyber Crime.",
    tags: ["Flutter", "FastAPI", "REST API", "Netlify", "Legal Tech"],
  },
  {
    owner: "unnatii14",
    name: "aquavision-flutter",
    blurb:
      "Cross-platform Flutter app with FastAPI backend serving EfficientNet-B0 model for fish species identification. Features camera integration, real-time classification, and similarity search with confidence scores.",
    tags: ["Flutter", "FastAPI", "EfficientNet", "Computer Vision"],
  },
  {
    owner: "Puja-Rachchh",
    name: "MindSprint",
    blurb:
      "Wellness companion app built with Flutter & Firebase. Tracks mindful routines, wellness habits, and provides personalized wellness nudges and insights.",
    tags: ["Flutter", "Firebase", "UX", "Wellness"],
  },
  {
    owner: "Hetvi2211",
    name: "Marine-Species-Classifier",
    blurb:
      "Deep learning CNN classifier for detecting and classifying marine species. Supports conservation research and biodiversity monitoring efforts.",
    tags: ["TensorFlow", "CNN", "Deep Learning", "Conservation"],
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
      language: data.language ?? "",
    };
  } catch (error) {
    console.warn(error.message);
    return {
      ...repo,
      url: endpoint.replace("api.github.com/repos", "github.com"),
      stars: "—",
      language: repo.tags?.[0] ?? "",
    };
  }
}

async function renderProjects() {
  const grid = document.querySelector("[data-project-grid]");
  if (!grid) return;

  const hydrated = await Promise.all(featuredRepos.map(hydrateRepo));
  grid.innerHTML = "";

  hydrated.forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-meta">
        <span>${repo.language || "Multi-stack"}</span>
        <span>★ ${repo.stars}</span>
      </div>
      <h3>${repo.name.replace(/-/g, " ")}</h3>
      <p>${repo.blurb}</p>
      <div class="tag-list">
        ${repo.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <a href="${repo.url}" target="_blank" rel="noopener">View repo ↗</a>
    `;
    grid.appendChild(card);
  });
}

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
    { threshold: 0.15 }
  );

  document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
}

function rotateEyebrow() {
  const target = document.querySelector(".hero-copy .eyebrow");
  if (!target) return;
  const labels = [
    "AI & ML Explorer",
    "Computer Vision Enthusiast",
    "NLP Learner",
    "AI for Healthcare",
    "Full-Stack Developer",
  ];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % labels.length;
    target.textContent = labels[index];
  }, 3500);
}

function animateSkillBars() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll(".skill-fill");
          fills.forEach((fill) => {
            const width = fill.style.width;
            fill.style.width = "0";
            setTimeout(() => {
              fill.style.width = width;
            }, 100);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const resumeSection = document.querySelector("#resume");
  if (resumeSection) {
    observer.observe(resumeSection);
  }
}

function initPanels() {
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const navLinks = Array.from(document.querySelectorAll("[data-panel-target]"));
  if (!panels.length || !navLinks.length) return;

  document.body.classList.add("js-enabled");

  const collapseAll = () => {
    panels.forEach((panel) => panel.classList.remove("active"));
    navLinks.forEach((link) => link.classList.remove("active"));
  };

  const activatePanel = (panelId) => {
    let found = false;
    panels.forEach((panel) => {
      if (panel.dataset.panel === panelId) {
        panel.classList.add("active");
        panel.scrollIntoView({ behavior: "smooth", block: "start" });
        found = true;
      } else {
        panel.classList.remove("active");
      }
    });

    navLinks.forEach((link) => {
      const isMatch = link.dataset.panelTarget === panelId;
      link.classList.toggle("active", isMatch);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const { panelTarget } = link.dataset;
      if (!panelTarget || panelTarget === "none") {
        collapseAll();
        link.classList.add("active");
        return;
      }

      event.preventDefault();
      activatePanel(panelTarget);
    });
  });
}

renderProjects();
initAnimations();
animateSkillBars();
rotateEyebrow();
initPanels();
