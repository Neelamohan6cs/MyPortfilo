# Neelamohan R — Portfolio

## Project Structure

portfolio_final/
├── frontend/                  React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Navbar.css
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.jsx
│   │   │   │   └── Hero.css
│   │   │   ├── About/
│   │   │   │   ├── About.jsx
│   │   │   │   └── About.css
│   │   │   ├── Skills/
│   │   │   │   ├── Skills.jsx
│   │   │   │   └── Skills.css
│   │   │   ├── Projects/
│   │   │   │   ├── Projects.jsx
│   │   │   │   └── Projects.css
│   │   │   ├── Internships/
│   │   │   │   ├── Internships.jsx
│   │   │   │   └── Internships.css
│   │   │   ├── Education/
│   │   │   │   ├── Education.jsx
│   │   │   │   └── Education.css
│   │   │   ├── Certifications/
│   │   │   │   ├── Certifications.jsx
│   │   │   │   └── Certifications.css
│   │   │   ├── Workshops/
│   │   │   │   ├── Workshops.jsx
│   │   │   │   └── Workshops.css
│   │   │   ├── Contact/
│   │   │   │   ├── Contact.jsx
│   │   │   │   └── Contact.css
│   │   │   └── Footer/
│   │   │       └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin/
│   │   │       ├── AdminLogin.jsx
│   │   │       ├── AdminLogin.css
│   │   │       ├── AdminDashboard.jsx
│   │   │       ├── AdminDashboard.css
│   │   │       └── tabs/
│   │   │           ├── HeroTab.jsx
│   │   │           ├── SkillsTab.jsx
│   │   │           ├── ProjectsTab.jsx
│   │   │           ├── InternshipsTab.jsx
│   │   │           ├── CertsTab.jsx
│   │   │           ├── WorkshopsTab.jsx
│   │   │           └── MessagesTab.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── hooks/
│   │   │   └── useFadeIn.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   ├── .env
│   └── package.json
│
└── backend/                   Django App
    ├── config/
    │   ├── __init__.py
    │   ├── settings.py
    │   ├── urls.py
    │   └── wsgi.py
    ├── apps/
    │   ├── portfolio/
    │   │   ├── migrations/
    │   │   ├── __init__.py
    │   │   ├── models.py
    │   │   ├── serializers.py
    │   │   ├── views.py
    │   │   ├── urls.py
    │   │   └── admin.py
    │   └── users/
    │       ├── migrations/
    │       ├── __init__.py
    │       ├── views.py
    │       └── urls.py
    ├── media/
    ├── manage.py
    ├── seed.py
    ├── .env
    └── requirements.txt

## Run Backend
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python seed.py
    python manage.py runserver

## Run Frontend
    cd frontend
    npm install
    npm start

## Admin
    URL:      http://localhost:3000/admin
    Username: Neelamohan
    Password: 1234
