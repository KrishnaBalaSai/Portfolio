const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const topButton = document.getElementById('topButton');
const progress = document.getElementById('progress');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'dark' || savedTheme === 'light') root.setAttribute('data-theme', savedTheme);
updateThemeIcon();

function updateThemeIcon(){
  const dark = root.getAttribute('data-theme') === 'dark';
  themeIcon.textContent = dark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
}

themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon();
});

menuToggle.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => header.classList.remove('menu-open')));

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header.classList.toggle('scrolled', y > 20);
  topButton.classList.toggle('show', y > 500);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max ? (y / max) * 100 : 0}%`;
});

topButton.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, {threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const typed = document.getElementById('typedRole');

// Hero role typewriter: type a role, pause, delete it, then show the next role.
if (typed) {
  const roles = ['Python Developer', 'Frontend Developer', 'Full Stack Developer'];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeRole() {
    const role = roles[roleIndex];
    typed.textContent = deleting
      ? role.slice(0, charIndex - 1)
      : role.slice(0, charIndex + 1);

    charIndex += deleting ? -1 : 1;

    let delay = deleting ? 55 : 85;

    if (!deleting && charIndex === role.length) {
      deleting = true;
      delay = 1400;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    window.setTimeout(typeRole, delay);
  }

  typeRole();
}

const projectData = {
  railway: {
    number: '01.', date: 'JULY 2025', title: 'Smart Railway Navigation System',
    intro: 'A responsive indoor railway navigation web application designed to help passengers move from station entrances to platforms and train coaches through an interactive map-based experience.',
    idea: 'The idea came from a simple real-world problem: railway stations can be large and confusing, especially for first-time visitors. The project focuses on making indoor navigation easier by turning the station layout into a clear digital route that a user can follow.',
    problem: 'Passengers may not immediately know which entrance, corridor, platform or coach direction to take. A normal map often does not provide enough station-specific detail, so the application needed a more focused indoor navigation experience.',
    solution: 'I built the interface with React.js and Vite, created station layouts and interactive map views, connected application data with Firebase, and used Leaflet.js for map interaction. The UI was styled to remain responsive and usable on both desktop and mobile screens.',
    features: ['Interactive station map experience', 'Shortest-path navigation between locations', 'Custom station layouts', 'Entrance-to-platform navigation', 'Mobile-friendly responsive interface'],
    tech: ['React.js','Vite','Firebase','Leaflet.js','Tailwind CSS'],
    learning: 'This project strengthened my understanding of React component structure, responsive UI development, map-based interfaces, application data handling and turning a practical user problem into a working product.',
    github: 'https://github.com/KrishnaBalaSai/railway-navigation-app'
  },
  recommendation: {
    number: '02.', date: 'JANUARY 2026', title: 'Service Recommendation System',
    intro: 'An AI-powered recommendation application built with Python and Streamlit to provide personalized book and service recommendations using retrieval and ranking techniques.',
    idea: 'The idea was to make recommendations more useful than a simple keyword search by combining user preferences with relevant information retrieved from a knowledge source and then ranking the results for the user.',
    problem: 'Generic recommendations can ignore a user’s context and preferences. The project explores how retrieval, user profiling and ranking can work together to produce more relevant recommendations.',
    solution: 'The application combines RAG, vector search, transformer-based ranking, user profiling and Gemini API integration. Streamlit provides the user-facing application while Python handles the recommendation workflow.',
    features: ['Personalized recommendations', 'RAG-based information retrieval', 'Vector search', 'Transformer-based ranking', 'Gemini API integration', 'User profiling'],
    tech: ['Python','Streamlit','RAG','Vector Search','Gemini API','Machine Learning'],
    learning: 'This project helped me explore practical AI application architecture, retrieval-augmented generation, ranking concepts and how a user-facing application can connect multiple AI components.',
    github: 'https://github.com/KrishnaBalaSai/Service-Recommendation-System'
  }
  ,
  interview: {
    number: '03.', date: 'OCTOBER 2026', title: 'AI Interview Simulator',
    intro: 'A full-stack AI-powered interview preparation platform that helps candidates practice technical and HR interviews, solve coding problems, analyze resumes and review performance.',
    idea: 'The goal was to bring interview preparation tools into one platform, allowing candidates to practice questions, take adaptive mock interviews and receive actionable feedback.',
    problem: 'Interview preparation is often spread across separate tools for questions, coding, resume feedback and progress tracking. Candidates also need structured feedback to understand where to improve.',
    solution: 'The application uses a React and TypeScript frontend with a FastAPI backend. It integrates Gemini-powered interview and resume analysis, PostgreSQL data storage, a Monaco coding editor, analytics dashboards and PDF report generation.',
    features: ['JWT-based authentication and protected pages', 'Adaptive AI mock interviews', 'Resume analysis and tailored questions', 'Question bank and coding practice', 'Communication analysis and mistake timeline', 'Analytics dashboard and downloadable PDF reports'],
    tech: ['React.js','TypeScript','Vite','Tailwind CSS','FastAPI','Python','PostgreSQL','SQLAlchemy','Gemini API','Monaco Editor','ReportLab'],
    learning: 'This project strengthened my understanding of full-stack integration, API design, authentication, database-backed applications and integrating AI features into a practical product.',
    github: 'https://github.com/KrishnaBalaSai/AI-Interview-Simulator'
  },
  evolution: {
    number: '04.', date: 'OCTOBER 2026', title: 'Codebase Evolution Intelligence System',
    intro: 'A software engineering analytics platform that turns Git repository history into insights about code changes, contributor activity, complexity and potential maintenance hotspots.',
    idea: 'The project aims to help developers and engineering teams understand how a codebase changes over time and identify areas that may need closer review or refactoring.',
    problem: 'Repository history can be difficult to interpret manually. Commit logs alone do not easily reveal files with frequent changes, complex Python code, possible bug-fix activity or concentrated maintenance risk.',
    solution: 'The system uses GitPython to inspect repository history, stores analysis data in MySQL through SQLAlchemy, uses Pandas to process metrics and Radon to calculate Python cyclomatic complexity. Streamlit and Plotly present the results in an interactive dashboard.',
    features: ['Analyze public Git/GitHub repositories', 'Explore commits, authors and file changes', 'Measure lines of code and file churn', 'Calculate Python cyclomatic complexity with Radon', 'Identify possible bug-fix commits using keywords', 'Rank code hotspots using multiple metrics', 'Visualize repository trends and contributor activity'],
    tech: ['Python','Streamlit','MySQL','SQLAlchemy','GitPython','Pandas','Radon','Plotly'],
    learning: 'This project helped me work with repository mining, relational data modeling, code-quality metrics, data analysis and interactive dashboards for software engineering insights.',
    github: 'https://github.com/KrishnaBalaSai/Codebase-Evolution-Intelligence-System'
  }
};

const projectModal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalIntro = document.getElementById('modalIntro');
const modalIdea = document.getElementById('modalIdea');
const modalProblem = document.getElementById('modalProblem');
const modalSolution = document.getElementById('modalSolution');
const modalFeatures = document.getElementById('modalFeatures');
const modalTech = document.getElementById('modalTech');
const modalLearning = document.getElementById('modalLearning');
const modalGithub = document.getElementById('modalGithub');
const modalNumber = document.getElementById('modalNumber');
const modalDate = document.getElementById('modalDate');

function openProject(key){
  const p = projectData[key];
  if(!p || !projectModal) return;
  modalNumber.textContent = p.number;
  modalDate.textContent = p.date;
  modalTitle.textContent = p.title;
  modalIntro.textContent = p.intro;
  modalIdea.textContent = p.idea;
  modalProblem.textContent = p.problem;
  modalSolution.textContent = p.solution;
  modalLearning.textContent = p.learning;
  modalFeatures.innerHTML = p.features.map(item => `<li>${item}</li>`).join('');
  modalTech.innerHTML = p.tech.map(item => `<span>${item}</span>`).join('');
  if(p.github === '#'){
    modalGithub.style.display='none';
  }else{
    modalGithub.style.display='inline-flex';
    modalGithub.href=p.github;
  }
  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
function closeProject(){
  if(!projectModal) return;
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden','true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.project-card[data-project]').forEach(card => {
  card.addEventListener('click', e => {
    if(e.target.closest('a')) return;
    openProject(card.dataset.project);
  });
  card.addEventListener('keydown', e => {
    if((e.key === 'Enter' || e.key === ' ') && !e.target.closest('a')){
      e.preventDefault();
      openProject(card.dataset.project);
    }
  });
});
document.querySelectorAll('[data-close-project]').forEach(el => el.addEventListener('click', closeProject));
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeProject(); });


const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const status = document.getElementById("form-status");

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: new FormData(contactForm)
                }
            );

            const result = await response.json();

            if (response.ok && result.success) {
                status.textContent = "Message sent successfully!";
                contactForm.reset();
            } else {
                status.textContent =
                    result.message || "Unable to send your message.";
            }
        } catch (error) {
            status.textContent =
                "Network error. Please try again.";
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    });
}
