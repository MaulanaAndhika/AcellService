// ============================================================
// Electric Lightning Animation for Home Section
// ============================================================
(function() {
    const canvas = document.getElementById('electricCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const homeSection = document.getElementById('home');
    const PRIMARY = '#00c853';
    const PRIMARY_GLOW = 'rgba(0, 200, 83,';

    function resize() {
        canvas.width = homeSection.offsetWidth || window.innerWidth;
        canvas.height = homeSection.offsetHeight || window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // --- Lightning bolt generator ---
    function createLightningPath(x1, y1, x2, y2, roughness) {
    const points = [{ x: x1, y: y1 }];

  function subdivide(ax, ay, bx, by, depth) {
    if (depth <= 0) {
      points.push({ x: bx, y: by });
      return;
    }

    const mx = (ax + bx) / 2 + (Math.random() - 0.5) * roughness * depth * 18;
    const my = (ay + by) / 2 + (Math.random() - 0.5) * roughness * depth * 18;

    subdivide(ax, ay, mx, my, depth - 1);
    subdivide(mx, my, bx, by, depth - 1);
  }

  subdivide(x1, y1, x2, y2, 4);
  return points;
}

    function drawLightning(points, alpha, width, color) {
        if (points.length < 2) return;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color || PRIMARY;
        ctx.lineWidth = width;
        ctx.shadowBlur = 18;
        ctx.shadowColor = PRIMARY;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        // Inner bright core
        ctx.globalAlpha = alpha * 0.6;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = width * 0.3;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
    }

    // --- Bolt objects ---
    const bolts = [];

    function spawnBolt() {
        const w = canvas.width, h = canvas.height;
        // Random start from edges or top
        const side = Math.random();
        let x1, y1, x2, y2;
        if (side < 0.4) {
            // Top to somewhere
            x1 = Math.random() * w;
            y1 = 0;
            x2 = x1 + (Math.random() - 0.5) * 300;
            y2 = Math.random() * h * 0.7;
        } else if (side < 0.7) {
            // Left edge
            x1 = 0;
            y1 = Math.random() * h;
            x2 = Math.random() * w * 0.6;
            y2 = y1 + (Math.random() - 0.5) * 250;
        } else {
            // Right edge
            x1 = w;
            y1 = Math.random() * h;
            x2 = w - Math.random() * w * 0.6;
            y2 = y1 + (Math.random() - 0.5) * 250;
        }

        const roughness = 0.6 + Math.random() * 0.6;
        const mainPoints = createLightningPath(x1, y1, x2, y2, roughness, 4);

        // Branches
        const branchList = [];
        const numBranches = Math.floor(Math.random() * 3) + 1;
        for (let b = 0; b < numBranches; b++) {
            const idx = Math.floor(Math.random() * (mainPoints.length - 2)) + 1;
            const bp = mainPoints[idx];
            const bx2 = bp.x + (Math.random() - 0.5) * 120;
            const by2 = bp.y + Math.random() * 80;
            branchList.push(createLightningPath(bp.x, bp.y, bx2, by2, roughness * 0.8, 3));
        }

        bolts.push({
            main: mainPoints,
            branches: branchList,
            alpha: 0,
            maxAlpha: 0.4 + Math.random() * 0.45,
            phase: 'in', // 'in', 'hold', 'out'
            holdFrames: Math.floor(Math.random() * 6) + 2,
            holdCount: 0,
            fadeSpeed: 0.06 + Math.random() * 0.05,
            width: 1.2 + Math.random() * 1.8,
        });
    }

    // --- Particles ---
    const particles = [];
    function spawnParticles(x, y) {
        const count = Math.floor(Math.random() * 5) + 3;
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 0.8,
                radius: 1 + Math.random() * 2,
            });
        }
    }

    // --- Floating nodes (connection points) ---
    const nodes = [];
    function initNodes() {
        nodes.length = 0;
        const count = Math.floor(canvas.width / 120) + 3;
        for (let i = 0; i < count; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                pulse: Math.random() * Math.PI * 2,
            });
        }
    }
    initNodes();
    window.addEventListener('resize', initNodes);

    let frame = 0;
    let nextBolt = 30;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        // Spawn bolts
        if (frame >= nextBolt) {
            spawnBolt();
            // Occasionally spawn a second bolt simultaneously
            if (Math.random() < 0.3) spawnBolt();
            nextBolt = frame + Math.floor(Math.random() * 60) + 25;
        }

        // Draw & update bolts
        for (let i = bolts.length - 1; i >= 0; i--) {
            const b = bolts[i];
            if (b.phase === 'in') {
                b.alpha = Math.min(b.alpha + b.fadeSpeed * 2, b.maxAlpha);
                if (b.alpha >= b.maxAlpha) b.phase = 'hold';
            } else if (b.phase === 'hold') {
                b.holdCount++;
                // Flicker effect
                b.alpha = b.maxAlpha * (0.7 + Math.random() * 0.3);
                if (b.holdCount >= b.holdFrames) b.phase = 'out';
            } else {
                b.alpha -= b.fadeSpeed;
                if (b.alpha <= 0) { bolts.splice(i, 1); continue; }
            }

            drawLightning(b.main, b.alpha, b.width, PRIMARY);
            for (const br of b.branches) {
                drawLightning(br, b.alpha * 0.6, b.width * 0.5, PRIMARY);
            }

            // Spawn particles at tip on first hold frame
            if (b.phase === 'hold' && b.holdCount === 1) {
                const tip = b.main[b.main.length - 1];
                spawnParticles(tip.x, tip.y);
            }
        }

        // Update & draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.025;
            if (p.alpha <= 0) { particles.splice(i, 1); continue; }
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = PRIMARY;
            ctx.shadowBlur = 6;
            ctx.shadowColor = PRIMARY;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Update & draw floating nodes
        for (const n of nodes) {
            n.x += n.vx;
            n.y += n.vy;
            n.pulse += 0.04;
            if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
            if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

            const pulseAlpha = 0.08 + Math.sin(n.pulse) * 0.05;
            ctx.save();
            ctx.globalAlpha = pulseAlpha;
            ctx.fillStyle = PRIMARY;
            ctx.shadowBlur = 12;
            ctx.shadowColor = PRIMARY;
            ctx.beginPath();
            ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        // Draw faint connecting lines between nearby nodes
        ctx.save();
        for (let a = 0; a < nodes.length; a++) {
            for (let b = a + 1; b < nodes.length; b++) {
                const dx = nodes[a].x - nodes[b].x;
                const dy = nodes[a].y - nodes[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    ctx.globalAlpha = (1 - dist / 200) * 0.06;
                    ctx.strokeStyle = PRIMARY;
                    ctx.lineWidth = 0.8;
                    ctx.shadowBlur = 0;
                    ctx.beginPath();
                    ctx.moveTo(nodes[a].x, nodes[a].y);
                    ctx.lineTo(nodes[b].x, nodes[b].y);
                    ctx.stroke();
                }
            }
        }
        ctx.restore();

        requestAnimationFrame(animate);
    }

    window.addEventListener('load', function() {
        resize();
        initNodes();
        animate();
    });
})();

// INI BAGIAN UNTUK KOLOM SEND MESSAGE LANGSUNG KE WA!
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Nomor WA tujuan: format internasional TANPA "+" dan TANPA spasi
  // contoh Indonesia: 6285604493782
  const WA_NUMBER = "6285604493782";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = (document.getElementById("name")?.value || "").trim();
    const phoneNumber = document.getElementById("phoneNumber")?.value?.trim() || "";
   const brand = document.getElementById("brand")?.value?.trim() || "";
    const subject = (document.getElementById("subject")?.value || "").trim();
    const message = (document.getElementById("message")?.value || "").trim();

    // Validasi minimal (biar nggak kosong semua)
    if (!fullName || !message) {
      alert("Mohon isi Full Name dan Your Message terlebih dahulu.");
      return;
    }

    // Bikin label subject agar lebih manusiawi (opsional)
    const subjectLabelMap = {
      repair: "Screen Repair",
      battery: "Battery Replacement",
      water: "Water Damage",
      other: "Other Inquiry",
    };
    const subjectLabel = subjectLabelMap[subject] || subject || "-";

    const text =
      `Halo Mincell, saya mau konsultasi.\n\n` +
      `Nama: ${fullName}\n` +
      `No HP: ${phoneNumber || "-"}\n` +
      `Merk Handphone: ${brand || "-"}\n` +
      `Subject: ${subjectLabel}\n\n` +
      `Pesan:\n${message}`;

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

    // Buka tab baru (lebih aman daripada langsung replace halaman)
    window.open(waUrl, "_blank", "noopener,noreferrer");
  });
});