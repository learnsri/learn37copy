
/* =========================================
   LEARN37 - WEBSITE INTERACTIONS
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* =====================================
       MOBILE NAVIGATION
       ===================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        document.addEventListener("click", event => {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

    }


    /* =====================================
       LIVE EVENT COUNTDOWN
       Sri Lanka Standard Time
       ===================================== */

    const eventStart = new Date(
        "2026-11-30T08:30:00+05:30"
    ).getTime();

    const eventEnd = new Date(
        "2026-12-02T00:00:00+05:30"
    ).getTime();


    function updateCountdown() {

        const now = Date.now();

        const distance = Math.max(
            0,
            eventStart - now
        );

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (distance / 1000) % 60
        );

        const values = {
            days,
            hours,
            minutes,
            seconds
        };

        Object.entries(values).forEach(([id, value]) => {

            const element = document.getElementById(id);

            if (element) {

                element.textContent = String(value)
                    .padStart(2, "0");

            }

        });

        const label = document.getElementById(
            "countdownLabel"
        );

        if (label) {

            if (now >= eventEnd) {

                label.textContent =
                    "THANK YOU FOR JOINING LEARN37";

            } else if (now >= eventStart) {

                label.textContent =
                    "WELCOME TO LEARN37";

            } else {

                label.textContent =
                    "COUNTDOWN TO LEARN37";

            }

        }

        const countdown = document.querySelector(
            ".countdown"
        );

        if (countdown) {

            countdown.hidden = now >= eventStart;

        }

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* =====================================
       INTERACTIVE PROGRAMME TABS
       ===================================== */

    const tabButtons = document.querySelectorAll(
        ".tab-button"
    );

    const programmeContents = document.querySelectorAll(
        ".programme-content"
    );

    tabButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedDay = button.dataset.day;

            tabButtons.forEach(tab => {

                tab.classList.remove("active");

                tab.setAttribute(
                    "aria-pressed",
                    "false"
                );

            });

            programmeContents.forEach(content => {

                content.classList.remove("active");

                content.hidden = true;

            });

            button.classList.add("active");

            button.setAttribute(
                "aria-pressed",
                "true"
            );

            const selectedContent = document.getElementById(
                selectedDay
            );

            if (selectedContent) {

                selectedContent.hidden = false;

                selectedContent.classList.add("active");

            }

        });

    });


    /* =====================================
       SCROLL REVEAL ANIMATIONS
       ===================================== */

    const revealElements = document.querySelectorAll(
        ".reveal"
    );

    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {

        document.body.classList.add("js-ready");

        const revealObserver = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0
            }

        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================
       ACTIVE NAVIGATION ON SCROLL
       ===================================== */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(section => {

            if (
                section.getBoundingClientRect().top <= 180
            ) {

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(link => {

            const isActive =
                link.getAttribute("href") ===
                "#" + currentSection;

            link.classList.toggle(
                "active",
                isActive
            );

            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "location"
                );

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================
       ANIMATED DIGITAL NETWORK GLOBE
       ===================================== */

    const canvas = document.getElementById(
        "networkCanvas"
    );

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;


    let width = 0;
    let height = 0;

    let radius = 0;

    let centerX = 0;
    let centerY = 0;

    const particles = [];
    const stars = [];

    const particleCount = 160;

    let rotation = 0;
    let animationId = null;


    /* GENERATE SPHERICAL NETWORK POINTS */

    for (let i = 0; i < particleCount; i++) {

        const y = 1 -
            (i / (particleCount - 1)) * 2;

        const sphereRadius = Math.sqrt(
            1 - y * y
        );

        const theta = Math.PI *
            (3 - Math.sqrt(5)) * i;

        particles.push({

            x: Math.cos(theta) * sphereRadius,

            y: y,

            z: Math.sin(theta) * sphereRadius

        });

    }


    /* GENERATE BACKGROUND PARTICLES */

    for (let i = 0; i < 75; i++) {

        stars.push({

            x: Math.random(),

            y: Math.random(),

            size: Math.random() * 1.7 + 0.3,

            opacity: Math.random() * 0.6 + 0.1,

            phase: Math.random() * Math.PI * 2

        });

    }


    /* =====================================
       RESPONSIVE CANVAS
       ===================================== */

    function resizeCanvas() {

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        width = canvas.clientWidth;
        height = canvas.clientHeight;

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        ctx.setTransform(
            dpr, 0, 0, dpr, 0, 0
        );

        if (width <= 768) {

            radius = Math.min(
                width * 0.36,
                170
            );

            centerX = width * 0.65;

            centerY = height * 0.73;

        } else {

            radius = Math.min(
                width * 0.24,
                height * 0.34
            );

            centerX = width * 0.76;

            centerY = height * 0.46;

        }

        if (reducedMotion) {

            drawScene(0);

        }

    }


    /* =====================================
       BACKGROUND GLOWING PARTICLES
       ===================================== */

    function drawStars(time) {

        stars.forEach(star => {

            const opacity = reducedMotion
                ? star.opacity
                : star.opacity *
                  (
                    0.65 +
                    0.35 * Math.sin(
                        time * 0.001 + star.phase
                    )
                  );

            ctx.beginPath();

            ctx.arc(
                star.x * width,
                star.y * height,
                star.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(160, 240, 255, ${opacity})`;

            ctx.fill();

        });

    }


    /* =====================================
       GLOBE GLOW
       ===================================== */

    function drawGlow() {

        const gradient = ctx.createRadialGradient(

            centerX,
            centerY,
            0,

            centerX,
            centerY,
            radius * 1.5

        );

        gradient.addColorStop(
            0,
            "rgba(0, 203, 232, 0.12)"
        );

        gradient.addColorStop(
            0.6,
            "rgba(0, 125, 197, 0.08)"
        );

        gradient.addColorStop(
            1,
            "rgba(0, 203, 232, 0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

    }


    /* =====================================
       PROJECT 3D POINTS INTO 2D
       ===================================== */

    function projectPoints() {

        const cos = Math.cos(rotation);

        const sin = Math.sin(rotation);

        return particles.map(point => {

            const x =
                point.x * cos +
                point.z * sin;

            const z =
                -point.x * sin +
                point.z * cos;

            const perspective = 3 / (3 - z);

            return {

                x: centerX +
                    x * radius * perspective,

                y: centerY +
                    point.y * radius * perspective,

                z: z,

                scale: perspective

            };

        });

    }


    /* =====================================
       NETWORK CONNECTIONS
       ===================================== */

    function drawConnections(points) {

        const maxDistance = radius * 0.32;

        for (let i = 0; i < points.length; i++) {

            for (
                let j = i + 1;
                j < points.length;
                j++
            ) {

                const a = points[i];

                const b = points[j];

                if (
                    a.z < -0.25 ||
                    b.z < -0.25
                ) continue;

                const dx = a.x - b.x;

                const dy = a.y - b.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < maxDistance) {

                    const opacity =
                        (
                            1 -
                            distance / maxDistance
                        ) * 0.5;

                    ctx.beginPath();

                    ctx.moveTo(
                        a.x,
                        a.y
                    );

                    ctx.lineTo(
                        b.x,
                        b.y
                    );

                    ctx.strokeStyle =
                        `rgba(0, 220, 255, ${opacity})`;

                    ctx.lineWidth = 0.8;

                    ctx.stroke();

                }

            }

        }

    }


    /* =====================================
       GLOWING NETWORK NODES
       ===================================== */

    function drawNodes(points) {

        points.sort(
            (a, b) => a.z - b.z
        );

        points.forEach(point => {

            const opacity =
                (point.z + 1) / 2;

            const size =
                1.5 * point.scale;

            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(155, 250, 255, ${0.2 + opacity * 0.8})`;

            ctx.fill();

        });

    }


    /* =====================================
       DECORATIVE ORBITAL RINGS
       ===================================== */

    function drawOrbitRings() {

        ctx.save();

        ctx.translate(
            centerX,
            centerY
        );

        ctx.rotate(-0.35);

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            radius * 1.45,
            radius * 0.45,
            0,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            "rgba(0, 203, 232, 0.16)";

        ctx.lineWidth = 1;

        ctx.stroke();


        ctx.rotate(0.9);

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            radius * 1.35,
            radius * 0.55,
            0,
            0,
            Math.PI * 2
        );

        ctx.strokeStyle =
            "rgba(229, 0, 135, 0.13)";

        ctx.stroke();

        ctx.restore();

    }


    /* =====================================
       RENDER THE GLOBE
       ===================================== */

    function drawScene(time) {

        if (!width || !height) return;

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        rotation = reducedMotion
            ? 0.5
            : time * 0.00015;

        drawStars(time);

        drawGlow();

        drawOrbitRings();

        const projectedPoints =
            projectPoints();

        drawConnections(
            projectedPoints
        );

        drawNodes(
            projectedPoints
        );

    }


    /* =====================================
       ANIMATION LOOP
       ===================================== */

    function animate(time) {

        drawScene(time);

        animationId =
            requestAnimationFrame(animate);

    }

    function startAnimation() {

        if (
            animationId === null &&
            !reducedMotion
        ) {

            animationId =
                requestAnimationFrame(animate);

        }

    }

    function stopAnimation() {

        if (animationId !== null) {

            cancelAnimationFrame(
                animationId
            );

            animationId = null;

        }

    }


    /* =====================================
       PAUSE ANIMATION WHEN NOT VISIBLE
       ===================================== */

    if ("IntersectionObserver" in window) {

        const canvasObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !document.hidden
                        ) {

                            startAnimation();

                        } else {

                            stopAnimation();

                        }

                    });

                }

            );

        canvasObserver.observe(canvas);

    } else {

        startAnimation();

    }


    /* PAUSE WHEN BROWSER TAB IS INACTIVE */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stopAnimation();

            } else if (

                canvas.getBoundingClientRect().bottom > 0 &&

                canvas.getBoundingClientRect().top <
                    window.innerHeight

            ) {

                startAnimation();

            }

        }

    );


    /* HANDLE WINDOW RESIZING */

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    resizeCanvas();

    if (reducedMotion) {

        drawScene(0);

    }

});
