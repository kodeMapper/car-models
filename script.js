document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section");
    const navLinks = document.querySelectorAll(".nav-link");
    const scrollProgress = document.getElementById("scroll-progress");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // ScrollSpy Functionality
    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 50;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => link.classList.remove("active"));
                document
                    .querySelector(`.nav-link[href='#${section.id}']`)
                    .classList.add("active");
            }
        });

        // Scroll Progress Bar
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // Smooth Scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        });
    });

    // Reveal Sections on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => observer.observe(section));

    // Dark Mode Toggle
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        themeToggle.innerHTML = body.classList.contains("dark-mode") ? 
            '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // Hamburger Menu
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Load saved theme preference
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        if (body.classList.contains("dark-mode")) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("dark-mode", "enabled");
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});
