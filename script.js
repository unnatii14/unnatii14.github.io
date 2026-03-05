const featuredRepos = [
  {
    owner: "unnatii14",
    name: "Myopia-Risk-Prediction",
    blurb:
      "3-stage ML pipeline (refractive error detection → risk classification → diopter prediction) on 5,000 pediatric records using XGBoost and Gradient Boosting. Achieved ROC-AUC 0.88 and 81.2% accuracy with full-stack React web app.",
    tags: ["XGBoost", "React", "TypeScript", "Tailwind", "ML Pipeline"],
  },
  {
    owner: "unnatii14",
    name: "sleepytales-App",
    blurb:
      "Flutter Android app featuring 30+ illustrated bedtime stories with AI-powered Text-to-Speech narration, 8 procedurally generated sleep music tracks, and nursery rhymes — all playable offline. Built with Provider state management.",
    tags: ["Flutter", "AI TTS", "Provider", "Offline-First", "Audio"],
  },
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

// Smooth Scroll Navigation
function initSmoothScroll() {
  const navLinks = document.querySelectorAll("[data-panel-target]");
  
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      
      const target = link.dataset.panelTarget;
      
      // Handle home link
      if (target === "none") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      
      // Scroll to section
      const section = document.getElementById(target);
      if (section) {
        const offsetTop = section.offsetTop - 100; // 100px offset for spacing
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    });
  });
}

// Scroll Spy - highlight active section in nav
function initScrollSpy() {
  const sections = document.querySelectorAll("[data-panel]");
  const navLinks = document.querySelectorAll("[data-panel-target]");
  
  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("data-panel");
      }
    });
    
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.dataset.panelTarget === current) {
        link.classList.add("active");
      }
    });
    
    // Highlight home when at top
    if (window.pageYOffset < 300) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.dataset.panelTarget === "none") {
          link.classList.add("active");
        }
      });
    }
  });
}

// Particle System
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  if (!particlesContainer) return;

  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 8;
    const randomDuration = 8 + Math.random() * 4;
    
    particle.style.left = `${randomX}%`;
    particle.style.animationDelay = `${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Smooth scroll parallax effect (only for background orbs)
function initParallax() {
  let ticking = false;
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".background-orbs");
        
        parallaxElements.forEach((el) => {
          const speed = 0.3;
          el.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Typing effect for tagline
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const phrases = [
    "Aspiring Developer",
    "Python Expert",
    "Flutter Developer",
    "Machine Learning Engineer",
    "AI Enthusiast",
    "Full-Stack Developer"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// Scroll to Top Button
function initScrollTopButton() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Scroll Progress Bar
function initScrollProgress() {
  const progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("mainNav");
  const navLinks = nav.querySelectorAll("a");

  if (!menuToggle) return;

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Close menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
      menuToggle.classList.remove("active");
      nav.classList.remove("active");
    }
  });
}

// Contact Form Handler with EmailJS
function initContactForm() {
  const form = document.getElementById("contactForm");
  const submitBtn = form?.querySelector('button[type="submit"]');
  const statusMsg = form?.querySelector('.form-status');
  
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Disable submit button
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';
      
      if (statusMsg) {
        statusMsg.textContent = 'Sending your message...';
        statusMsg.style.color = 'var(--accent)';
        statusMsg.style.display = 'block';
      }
      
      // Check if EmailJS is configured
      if (typeof emailjs === 'undefined') {
        // EmailJS not loaded, use mailto fallback
        const formData = new FormData(form);
        const name = formData.get('from_name') || formData.get('name');
        const email = formData.get('reply_to') || formData.get('email');
        const message = formData.get('message');
        
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:unnatitank14@gmail.com?subject=${subject}&body=${body}`;
        
        submitBtn.textContent = '✓ Email Client Opened!';
        submitBtn.style.background = '#10b981';
        if (statusMsg) {
          statusMsg.textContent = 'Your email client has been opened.';
          statusMsg.style.color = '#10b981';
        }
        
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          if (statusMsg) statusMsg.style.display = 'none';
        }, 3000);
        return;
      }
      
      // Send email using EmailJS
      emailjs.sendForm('service_portfolio', 'template_contact', form)
        .then(() => {
          // Success
          submitBtn.textContent = '✓ Message Sent!';
          submitBtn.style.background = '#10b981';
          
          if (statusMsg) {
            statusMsg.textContent = 'Thanks! Your message has been sent successfully.';
            statusMsg.style.color = '#10b981';
          }
          
          // Reset form
          form.reset();
          
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            if (statusMsg) statusMsg.style.display = 'none';
          }, 3000);
        }, (error) => {
          // Error - use mailto fallback
          console.error('EmailJS Error:', error);
          
          const formData = new FormData(form);
          const name = formData.get('from_name');
          const email = formData.get('reply_to');
          const message = formData.get('message');
          
          const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
          window.location.href = `mailto:unnatitank14@gmail.com?subject=${subject}&body=${body}`;
          
          submitBtn.textContent = '✓ Email Client Opened';
          submitBtn.style.background = '#f59e0b';
          
          if (statusMsg) {
            statusMsg.textContent = 'Opened your email client as backup.';
            statusMsg.style.color = '#f59e0b';
          }
          
          setTimeout(() => {
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            if (statusMsg) statusMsg.style.display = 'none';
          }, 3000);
        });
    });
  }
}

renderProjects();
initAnimations();
rotateEyebrow();
initSmoothScroll();
initScrollSpy();
createParticles();
initParallax();
initTypingEffect();
initScrollTopButton();
initScrollProgress();
initMobileMenu();
initContactForm();
