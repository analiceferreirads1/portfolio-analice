'use client';

import { useEffect, useRef } from 'react';

type DotTrailProps = { step?: number; size?: number; hold?: number; fade?: number; color?: string };

/** Quadrados acendem sob o cursor e apagam em ~2s (hold + fade). */
export function DotTrail({ step = 20, size = 7, hold = 2200, fade = 900, color = '#F4F3EE' }: DotTrailProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    const host = cv?.parentElement;
    if (!cv || !host) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const lit = new Map<string, number>();
    let last: [number, number] | null = null;
    let raf = 0;
    let dpr = 1;
    const clear = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); };
    const fit = () => { dpr = window.devicePixelRatio || 1; cv.width = host.clientWidth * dpr; cv.height = host.clientHeight * dpr; };
    fit();
    window.addEventListener('resize', fit);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    ro?.observe(host);
    const mark = (gx: number, gy: number, t: number) => lit.set(gx + ',' + gy, t);
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const t = performance.now();
      const gx = Math.floor(x / step);
      const gy = Math.floor(y / step);
      if (last) {
        const dx = gx - last[0];
        const dy = gy - last[1];
        const n = Math.max(Math.abs(dx), Math.abs(dy));
        for (let i = 1; i <= n; i++) mark(Math.round(last[0] + (dx * i) / n), Math.round(last[1] + (dy * i) / n), t);
      } else mark(gx, gy, t);
      last = [gx, gy];
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => { last = null; };
    function draw() {
      const now = performance.now();
      clear();
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.fillStyle = color;
      for (const [k, t] of lit) {
        const age = now - t;
        if (age > hold + fade) { lit.delete(k); continue; }
        const [gx, gy] = k.split(',').map(Number);
        ctx!.globalAlpha = age < hold ? 1 : 1 - (age - hold) / fade;
        ctx!.fillRect(gx * step + (step - size) / 2, gy * step + (step - size) / 2, size, size);
      }
      ctx!.globalAlpha = 1;
      if (lit.size) raf = requestAnimationFrame(draw);
      else { clear(); raf = 0; }
    }
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    const onVis = () => { if (!document.hidden && lit.size && !raf) raf = requestAnimationFrame(draw); };
    document.addEventListener('visibilitychange', onVis);
    const sweep = setInterval(() => { if (lit.size && !raf) raf = requestAnimationFrame(draw); }, 500);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', fit);
      document.removeEventListener('visibilitychange', onVis);
      ro?.disconnect();
      clearInterval(sweep);
      cancelAnimationFrame(raf);
      lit.clear();
      clear();
    };
  }, [step, size, hold, fade, color]);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}
