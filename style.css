
document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* ======================================
       MOBILE NAVIGATION
       ====================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {

        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    }

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.textContent = isOpen ? "✕" : "☰";

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        });

        document.addEventListener("click", function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMenu();

            }

        });

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {

                closeMenu();

            }

        });

    }


    /* ======================================
       COUNTDOWN
       ====================================== */

    const eventStart = new Date(
        "2026-11-30T08:30:00+05:30"
    ).getTime();

    const eventEnd = new Date(
        "2026-12-02T00:00:00+05:30"
    ).getTime();

    const countdownLabel = document.getElementById("countdownLabel");

    const countdown = document.querySelector(".countdown");

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    function formatNumber(number) {

        return String(number).padStart(2, "0");

    }

    function updateCountdown() {

        if (!countdownLabel || !countdown) return;

        const now = Date.now();

        const difference = eventStart - now;

        if (now >= eventEnd) {

            countdownLabel.textContent =
                "THANK YOU FOR BEING PART OF LEARN37";

            countdown.hidden = true;

            return;

        }

        if (difference <= 0) {

            countdownLabel.textContent = "WELCOME TO LEARN37";

            countdown.hidden = true;

            return;

        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        if (daysElement) {

            daysElement.textContent = formatNumber(days);

        }

        if (hoursElement) {

            hoursElement.textContent = formatNumber(hours);

        }

        if (minutesElement) {

            minutesElement.textContent = formatNumber(minutes);

        }

        if (secondsElement) {

            secondsElement.textContent = formatNumber(seconds);

        }

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* ======================================
       DAY 01 AND DAY 02 PROGRAMME TABS
       ====================================== */

    const tabButtons = document.querySelectorAll(".tab-button");

    const programmeContents = document.querySelectorAll(
        ".programme-content"
    );

    tabButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedDay = button.dataset.day;

            const selectedProgramme = document.getElementById(
                selectedDay
            );

            if (!selectedProgramme) return;

            tabButtons.forEach(function (tab) {

                tab.classList.remove("active");

                tab.setAttribute("aria-pressed", "false");

            });

            programmeContents.forEach(function (content) {

                content.classList.remove("active");

                content.hidden = true;

            });

            button.classList.add("active");

            button.setAttribute("aria-pressed", "true");

            selectedProgramme.hidden = false;

            selectedProgramme.classList.add("active");

        });

    });


    /* ======================================
       SCROLL REVEAL ANIMATION
       ====================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !reducedMotion
    ) {

        document.body.classList.add("js-ready");

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.05
            }

        );

        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* ======================================
       ACTIVE NAVIGATION LINK
       ====================================== */

    const sections = document.querySelectorAll("section[id]");

    const navigationLinks = document.querySelectorAll(
        ".nav-links a"
    );

    let scrollScheduled = false;

    function updateActiveNavigation() {

        let currentSection = "home";

        sections.forEach(function (section) {

            if (section.getBoundingClientRect().top <= 180) {

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(function (link) {

            const isActive =
                link.getAttribute("href") === "#" + currentSection;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "location");

            } else {

                link.removeAttribute("aria-current");

            }

        });

        scrollScheduled = false;

    }

    window.addEventListener(

        "scroll",

        function () {

            if (!scrollScheduled) {

                requestAnimationFrame(updateActiveNavigation);

                scrollScheduled = true;

            }

        },

        {
            passive: true
        }

    );

    updateActiveNavigation();


    /* ======================================
       ANIMATED NETWORK GLOBE
       ====================================== */

    const canvas = document.getElementById("networkCanvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;

    let centerX = 0;
    let centerY = 0;

    let radius = 0;

    let animationFrame = null;

    let canvasVisible = true;

    const pointCount = 160;

    const points = [];

    const stars = [];

    const goldenAngle = Math.PI * (3 - Math.sqrt(5));


    /* Create evenly distributed sphere points */

    for (let i = 0; i < pointCount; i++) {

        const y = 1 - (i / (pointCount - 1)) * 2;

        const sphereRadius = Math.sqrt(1 - y * y);

        const theta = goldenAngle * i;

        points.push({

            x: Math.cos(theta) * sphereRadius,

            y: y,

            z: Math.sin(theta) * sphereRadius

        });

    }


    /* Create background stars */

    for (let i = 0; i < 75; i++) {

        stars.push({

            x: Math.random(),

            y: Math.random(),

            size: 0.3 + Math.random() * 1.7,

            opacity: 0.1 + Math.random() * 0.6,

            phase: Math.random() * Math.PI * 2

        });

    }


    /* Resize canvas */

    function resizeCanvas() {

        const rect = canvas.getBoundingClientRect();

        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        width = rect.width;

        height = rect.height;

        canvas.width = Math.round(width * dpr);

        canvas.height = Math.round(height * dpr);

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        if (window.innerWidth <= 768) {

            radius = Math.min(width * 0.36, 170);

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

        if (reducedMotion || !canvasVisible) {

            drawScene(0);

        }

    }


    /* Background stars */

    function drawStars(time) {

        stars.forEach(function (star) {

            const pulse = reducedMotion

                ? 1

                : 0.7 + 0.3 * Math.sin(
                    time * 0.001 + star.phase
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
                "rgba(180,235,255," +
                star.opacity * pulse +
                ")";

            ctx.fill();

        });

    }


    /* Globe glow */

    function drawGlobeGlow() {

        if (radius <= 0) return;

        const gradient = ctx.createRadialGradient(

            centerX,

            centerY,

            radius * 0.2,

            centerX,

            centerY,

            radius * 1.5

        );

        gradient.addColorStop(
            0,
            "rgba(0,190,255,0.10)"
        );

        gradient.addColorStop(
            0.5,
            "rgba(0,190,255,0.07)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,190,255,0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(0, 0, width, height);

    }


    /* Rotate and project sphere points */

    function projectPoints(rotation) {

        const cos = Math.cos(rotation);

        const sin = Math.sin(rotation);

        const tilt = 0.2;

        const cosTilt = Math.cos(tilt);

        const sinTilt = Math.sin(tilt);

        return points.map(function (point) {

            const x = point.x * cos - point.z * sin;

            const rotatedZ =
                point.x * sin + point.z * cos;

            const y =
                point.y * cosTilt - rotatedZ * sinTilt;

            const z =
                point.y * sinTilt + rotatedZ * cosTilt;

            const perspective = 3 / (3 - z);

            return {

                x: centerX + x * radius * perspective,

                y: centerY + y * radius * perspective,

                z: z,

                scale: perspective

            };

        });

    }


    /* Draw network connections */

    function drawConnections(projected) {

        const maxDistance = radius * 0.32;

        for (let i = 0; i < projected.length; i++) {

            for (let j = i + 1; j < projected.length; j++) {

                const a = projected[i];

                const b = projected[j];

                if (a.z < -0.25 || b.z < -0.25) {

                    continue;

                }

                const dx = a.x - b.x;

                const dy = a.y - b.y;

                const distance = Math.sqrt(
                    dx * dx + dy * dy
                );

                if (distance < maxDistance) {

                    const opacity =
                        (1 - distance / maxDistance) * 0.5;

                    ctx.beginPath();

                    ctx.moveTo(a.x, a.y);

                    ctx.lineTo(b.x, b.y);

                    ctx.strokeStyle =
                        "rgba(0,220,255," +
                        opacity +
                        ")";

                    ctx.lineWidth = 0.8;

                    ctx.stroke();

                }

            }

        }

    }


    /* Draw network nodes */

    function drawNodes(projected) {

        const sortedPoints = projected.slice().sort(

            function (a, b) {

                return a.z - b.z;

            }

        );

        sortedPoints.forEach(function (point) {

            const opacity =
                0.2 + 0.8 * ((point.z + 1) / 2);

            const size = 1.5 * point.scale;

            ctx.beginPath();

            ctx.arc(

                point.x,

                point.y,

                size,

                0,

                Math.PI * 2

            );

            ctx.fillStyle =
                "rgba(135,245,255," +
                opacity +
                ")";

            ctx.fill();

            if (point.z > 0.75) {

                ctx.beginPath();

                ctx.arc(

                    point.x,

                    point.y,

                    size * 2.5,

                    0,

                    Math.PI * 2

                );

                ctx.fillStyle = "rgba(0,224,191,0.08)";

                ctx.fill();

            }

        });

    }


    /* Draw orbital rings */

    function drawOrbitalRings() {

        if (radius <= 0) return;

        ctx.save();

        ctx.translate(centerX, centerY);

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

        ctx.strokeStyle = "rgba(0,224,191,0.23)";

        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();


        ctx.save();

        ctx.translate(centerX, centerY);

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

        ctx.strokeStyle = "rgba(229,0,135,0.17)";

        ctx.lineWidth = 1;

        ctx.stroke();

        ctx.restore();

    }


    /* Draw entire scene */

    function drawScene(time) {

        if (width <= 0 || height <= 0) return;

        ctx.clearRect(0, 0, width, height);

        drawStars(time);

        drawGlobeGlow();

        const rotation = reducedMotion

            ? 0.5

            : time * 0.00015;

        const projected = projectPoints(rotation);

        drawConnections(projected);

        drawNodes(projected);

        drawOrbitalRings();

    }


    /* Animation loop */

    function animate(time) {

        animationFrame = null;

        if (
            document.hidden ||
            !canvasVisible ||
            reducedMotion
        ) {

            return;

        }

        drawScene(time);

        animationFrame = requestAnimationFrame(animate);

    }


    function startAnimation() {

        if (reducedMotion) {

            drawScene(0);

            return;

        }

        if (
            animationFrame === null &&
            canvasVisible &&
            !document.hidden
        ) {

            animationFrame = requestAnimationFrame(animate);

        }

    }


    function stopAnimation() {

        if (animationFrame !== null) {

            cancelAnimationFrame(animationFrame);

            animationFrame = null;

        }

    }


    /* Pause globe when it is not visible */

    if ("IntersectionObserver" in window) {

        const canvasObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    canvasVisible = entry.isIntersecting;

                    if (canvasVisible) {

                        startAnimation();

                    } else {

                        stopAnimation();

                    }

                });

            },

            {
                threshold: 0
            }

        );

        canvasObserver.observe(canvas);

    }


    /* Pause globe when browser tab is inactive */

    document.addEventListener(

        "visibilitychange",

        function () {

            if (document.hidden) {

                stopAnimation();

            } else {

                startAnimation();

            }

        }

    );


    /* Responsive canvas */

    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    startAnimation();

});
