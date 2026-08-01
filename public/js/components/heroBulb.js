/**
 * PLANIX HERO LIGHT BULB CANVAS ENGINE
 * Interactive glowing light bulb with floating micro-particles and cursor light tracking
 */

class HeroBulbCanvas {
  init(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = canvas.offsetWidth || 600;
    let height = canvas.height = canvas.offsetHeight || 600;

    let mouseX = width / 2;
    let mouseY = height / 2;

    // Floating micro-particles
    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4 - 0.2,
      alpha: Math.random() * 0.7 + 0.3
    }));

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Update global cursor glow element
      const glow = document.getElementById('cursor-glow');
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    });

    function draw() {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 - 20;

      // 1. Outer Ambient Glow
      const ambientGlow = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 280);
      ambientGlow.addColorStop(0, 'rgba(255, 184, 0, 0.25)');
      ambientGlow.addColorStop(0.4, 'rgba(255, 42, 95, 0.15)');
      ambientGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = ambientGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 280, 0, Math.PI * 2);
      ctx.fill();

      // 2. Cursor Interactive Follow Glow Layer
      const mouseGlow = ctx.createRadialGradient(mouseX, mouseY, 5, mouseX, mouseY, 140);
      mouseGlow.addColorStop(0, 'rgba(255, 214, 0, 0.3)');
      mouseGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 140, 0, Math.PI * 2);
      ctx.fill();

      // 3. Glowing Light Bulb Silhouette
      ctx.save();
      ctx.translate(centerX, centerY);

      // Bulb Outer Shadow
      ctx.shadowColor = 'rgba(255, 184, 0, 0.6)';
      ctx.shadowBlur = 40;

      // Bulb Glass Shape
      ctx.beginPath();
      ctx.arc(0, -20, 75, 0.25 * Math.PI, 0.75 * Math.PI, true);
      ctx.bezierCurveTo(45, 55, 35, 80, 30, 95);
      ctx.lineTo(-30, 95);
      ctx.bezierCurveTo(-35, 80, -45, 55, -75, -20);
      ctx.closePath();

      const bulbGradient = ctx.createLinearGradient(0, -90, 0, 95);
      bulbGradient.addColorStop(0, 'rgba(255, 214, 0, 0.22)');
      bulbGradient.addColorStop(0.7, 'rgba(255, 42, 95, 0.18)');
      bulbGradient.addColorStop(1, 'rgba(255, 184, 0, 0.05)');

      ctx.fillStyle = bulbGradient;
      ctx.strokeStyle = 'rgba(255, 184, 0, 0.6)';
      ctx.lineWidth = 3;
      ctx.fill();
      ctx.stroke();

      // Inner Filament Glow
      ctx.beginPath();
      ctx.moveTo(-20, 40);
      ctx.lineTo(-12, -20);
      ctx.lineTo(0, -40);
      ctx.lineTo(12, -20);
      ctx.lineTo(20, 40);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 15;
      ctx.stroke();

      // Bulb Base Metal Rings
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#1e2338';
      ctx.fillRect(-28, 96, 56, 12);
      ctx.fillRect(-24, 110, 48, 10);
      ctx.fillRect(-18, 122, 36, 10);

      ctx.restore();

      // 4. Render & Update Floating Micro-Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 214, 0, ${p.alpha})`;
        ctx.shadowColor = 'rgba(255, 214, 0, 0.8)';
        ctx.shadowBlur = 8;
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    draw();
  }
}

window.heroBulbCanvas = new HeroBulbCanvas();
