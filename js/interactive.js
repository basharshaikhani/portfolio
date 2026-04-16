// ── Active nav indicator ──
document.querySelectorAll('.nav-link').forEach(link => {
    if (link.href === window.location.href) link.classList.add('active-page');
});

// ── Split-text entrance ──
document.querySelectorAll('.split-word').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    }, 300 + i * 150);
});

// ── Magnetic buttons ──
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.25;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0,0)';
        btn.style.transition = 'transform 0.4s ease';
    });
});

// ── Cursor trail ──
(function () {
    const canvas = document.getElementById('trailCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    let trail = [];
    window.addEventListener('mousemove', e => {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (trail.length > 20) trail.shift();
    });
    function drawTrail() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        trail.forEach((p, i) => {
            p.life -= 0.04;
            if (p.life <= 0) return;
            const r = (i / trail.length) * 5;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(40,233,140,${p.life * 0.6})`;
            ctx.shadowColor = '#28e98c';
            ctx.shadowBlur = 8;
            ctx.fill();
        });
        trail = trail.filter(p => p.life > 0);
        requestAnimationFrame(drawTrail);
    }
    drawTrail();
})();
