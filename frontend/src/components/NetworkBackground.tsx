import { useEffect, useRef } from "react";

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const cx = cv.getContext("2d");
    if (!cx) return;

    let W: number, H: number;
    const resize = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const TEAL = "#00E5A0",
      GOLD = "#F5A623",
      SLATE = "#3A4D66";

    class Particle {
      orbit: boolean;
      x: number = 0;
      y: number = 0;
      tx: number = 0;
      ty: number = 0;
      life: number = 0;
      max: number = 0;
      sz: number = 0;
      ang: number = 0;
      rad: number = 0;
      spd: number = 0;
      col: string = "";
      a: number = 0;

      constructor(orbit: boolean) {
        this.orbit = orbit;
        this.reset();
        this.life = Math.random() * this.max;
      }

      reset() {
        if (!this.orbit) {
          const a = Math.random() * Math.PI * 2,
            d = 200 + Math.random() * 500;
          this.x = W / 2 + Math.cos(a) * d;
          this.y = H / 2 + Math.sin(a) * d;
          const ta = Math.random() * Math.PI * 2,
            td = 40 + Math.random() * 120;
          this.tx = W / 2 + Math.cos(ta) * td;
          this.ty = H / 2 + Math.sin(ta) * td;
          this.life = -(Math.random() * 90) | 0;
          this.max = 100 + Math.random() * 90;
          this.sz = 0.4 + Math.random() * 1.4;
        } else {
          this.ang = Math.random() * Math.PI * 2;
          this.rad = 140 + Math.random() * 240;
          this.spd =
            (0.0006 + Math.random() * 0.0035) * (Math.random() > 0.5 ? 1 : -1);
          this.x = W / 2 + Math.cos(this.ang) * this.rad;
          this.y = H / 2 + Math.sin(this.ang) * this.rad;
          this.life = 0;
          this.max = 220 + Math.random() * 300;
          this.sz = 0.5 + Math.random() * 1.6;
        }
        const r = Math.random();
        this.col = r > 0.6 ? TEAL : r > 0.3 ? GOLD : SLATE;
        this.a = 0;
      }

      tick() {
        this.life++;
        if (this.life < 0) return;
        if (!this.orbit) {
          const t = Math.min(this.life / this.max, 1);
          this.x += (this.tx - this.x) * 0.048;
          this.y += (this.ty - this.y) * 0.048;
          this.a = (t < 0.2 ? t / 0.2 : (1 - t) / 0.8) * 0.8;
          if (this.life > this.max) this.reset();
        } else {
          this.ang += this.spd;
          this.x = W / 2 + Math.cos(this.ang) * this.rad;
          this.y = H / 2 + Math.sin(this.ang) * this.rad;
          const t = (this.life % this.max) / this.max;
          this.a = (t < 0.08 ? t / 0.08 : t > 0.9 ? (1 - t) / 0.1 : 1) * 0.28;
          if (this.life > this.max) {
            this.life = 0;
            this.rad = 140 + Math.random() * 240;
            this.ang = Math.random() * Math.PI * 2;
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.a < 0.005 || this.life < 0) return;
        ctx.save();
        ctx.globalAlpha = this.a;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.col;
        ctx.fillStyle = this.col;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const pts: Particle[] = [];
    for (let i = 0; i < 160; i++) pts.push(new Particle(false));
    setTimeout(() => {
      for (let i = 0; i < 90; i++) pts.push(new Particle(true));
    }, 2800);

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.strokeStyle = "rgba(0,229,160,0.022)";
      ctx.lineWidth = 0.5;
      const gs = 64;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawWeb = (ctx: CanvasRenderingContext2D) => {
      const limit = pts.filter((p) => p.life > 0);
      for (let i = 0; i < limit.length; i++) {
        for (let j = i + 1; j < limit.length; j++) {
          const dx = limit[i].x - limit[j].x,
            dy = limit[i].y - limit[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const alpha =
              (1 - d / 100) * Math.min(limit[i].a, limit[j].a) * 0.4;
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = TEAL;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(limit[i].x, limit[i].y);
            ctx.lineTo(limit[j].x, limit[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    let animationId: number;
    const loop = () => {
      animationId = requestAnimationFrame(loop);
      cx.clearRect(0, 0, W, H);
      drawGrid(cx);

      const cg = cx.createRadialGradient(
        W / 2,
        H / 2,
        0,
        W / 2,
        H / 2,
        Math.min(W, H) * 0.55,
      );
      cg.addColorStop(0, "rgba(0,229,160,0.06)");
      cg.addColorStop(0.5, "rgba(0,100,70,0.02)");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      cx.fillStyle = cg;
      cx.fillRect(0, 0, W, H);

      drawWeb(cx);
      pts.forEach((p) => {
        p.tick();
        p.draw(cx);
      });
    };
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="vignette absolute inset-0" />
      <div className="scanlines absolute inset-0" />
    </div>
  );
}
