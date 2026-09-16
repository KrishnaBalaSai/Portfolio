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
    github: '#'
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
