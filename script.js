const featuredRepos = [
  {
    owner: "unnatii14",
    name: "Smart-Chatbot",
    blurb:
      "TinyLlama + RAG chatbot with FAISS retrieval, sentence-transformers, and Gradio UI for document Q&A.",
    tags: ["TinyLlama", "RAG", "Gradio"],
  },
  {
    owner: "Puja-Rachchh",
    name: "MindSprint",
    blurb:
      "Wellness companion built with Flutter & Firebase to track mindful routines and personalized nudges.",
    tags: ["Flutter", "Firebase", "UX"],
  },
  {
    owner: "unnatii14",
    name: "aquavision-flutter",
    blurb:
      "Computer-vision powered assistant for monitoring aquaculture health with on-device inference.",
    tags: ["Flutter", "Computer Vision", "AI"],
  },
  {
    owner: "Hetvi2211",
    name: "Marine-Species-Classifier",
    blurb:
      "Deep learning classifier detecting marine species to support conservation and research efforts.",
    tags: ["Deep Learning", "CNN", "Conservation"],
  },
  {
    owner: "Hetvi2211",
    name: "companion-ai",
    blurb:
      "Conversational AI companion blending NLP, sentiment cues, and calming UI patterns.",
    tags: ["NLP", "Sentiment", "React"],
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
  ];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % labels.length;
    target.textContent = labels[index];
  }, 3500);
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
rotateEyebrow();
initPanels();
