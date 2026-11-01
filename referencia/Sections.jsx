const { Button, IconButton, Input, Select, Card, Badge, Tag, Icon, WorkflowNode, WorkflowCanvas, Tabs, Dialog, Toast } = window.AFDesignSystem_9ea63f;

const siteW = { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,40px)', boxSizing: 'border-box' };
const H = (size, extra) => ({ font: size > 26 ? `600 clamp(${Math.round(size * 0.66)}px, ${(size / 14).toFixed(2)}vw + 12px, ${size}px)/1.08 var(--font-display)` : `600 ${size}px/1.15 var(--font-display)`, letterSpacing: '-0.035em', ...extra });

function Lockup({ inverse, sub = true }) {
  const c = inverse ? 'var(--areia-50)' : 'var(--fg-1)';
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
      <img src={inverse ? '../../assets/logo-inverse.svg' : '../../assets/logo.svg'} width="36" height="24" alt="" />
      <span style={{ font: '600 19px/1 var(--font-display)', letterSpacing: '-0.035em', color: c, whiteSpace: 'nowrap' }}>Analice Ferreira</span>
      {sub && <span className="af-lockup-sub" style={{ font: '500 12px var(--font-mono)', color: inverse ? 'var(--grafite-300)' : 'var(--fg-2)', whiteSpace: 'nowrap' }}>| AI Automation Engineer</span>}
    </a>
  );
}

const NAV = [['O que faço', 'servicos'], ['Projetos', 'projetos'], ['Como construo', 'metodo'], ['Sobre', 'sobre'], ['FAQ', 'faq']];
function SiteNav({ onCta }) {
  const [act, setAct] = React.useState('');
  const [menu, setMenu] = React.useState(false);
  React.useEffect(() => {
    const els = NAV.map(([, id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) setAct(e.target.id); }); }, { rootMargin: '-45% 0px -50% 0px' });
    els.forEach(el => io.observe(el)); return () => io.disconnect();
  }, []);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(244,243,238,.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ ...siteW, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Lockup />
        <nav className="nv-desk" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <style>{'.nv{position:relative;padding:6px 0;transition:color .25s}.nv::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;border-radius:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.2,.7,.2,1)}.nv:hover{color:var(--fg-1)!important}.nv:hover::after,.nv.on::after{transform:scaleX(1)}.nv.on{color:var(--fg-1)!important}.nv-cta{transition:transform .25s cubic-bezier(.3,1.5,.5,1)}.nv-cta:hover{transform:translateY(-1px)}@media (prefers-reduced-motion:reduce){.nv,.nv::after,.nv-cta{transition:none!important}}'}</style>
          {NAV.map(([l, id]) => (
            <a key={id} href={'#' + id} className={'nv' + (act === id ? ' on' : '')} aria-current={act === id ? 'true' : undefined} style={{ font: '500 14px var(--font-sans)', color: 'var(--fg-2)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{l}</a>
          ))}
          <span className="nv-cta" style={{ display: 'inline-flex' }}><Button size="sm" variant="inverse" onClick={onCta}>Contato</Button></span>
        </nav>
        <span className="nv-mob" style={{ display: 'none' }}><IconButton icon={menu ? 'x' : 'menu'} label={menu ? 'Fechar menu' : 'Abrir menu'} variant="ghost" size="lg" aria-expanded={menu} onClick={() => setMenu(m => !m)} /></span>
      </div>
      {menu && <nav className="nv-panel" style={{ borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)', padding: '8px clamp(20px,5vw,40px) 20px', display: 'flex', flexDirection: 'column' }}>
        {NAV.map(([l, id]) => <a key={id} href={'#' + id} onClick={() => setMenu(false)} style={{ font: '500 17px var(--font-sans)', color: act === id ? 'var(--fg-1)' : 'var(--fg-2)', textDecoration: 'none', padding: '14px 0', borderBottom: '1px solid var(--border-1)' }}>{l}</a>)}
        <div style={{ paddingTop: 16 }}><Button size="lg" variant="inverse" onClick={() => { setMenu(false); onCta(); }} style={{ width: '100%' }}>Contato</Button></div>
      </nav>}
    </header>
  );
}

const N8N_GREEN = '#35B86A';
const SI = (n, c) => 'https://cdn.simpleicons.org/' + n + '/' + c;
const rrPath = (x, y, w, h, r) => 'M ' + x + ' ' + (y + h / 2) + ' V ' + (y + r) + ' Q ' + x + ' ' + y + ' ' + (x + r) + ' ' + y + ' H ' + (x + w - r) + ' Q ' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' V ' + (y + h - r) + ' Q ' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' H ' + (x + r) + ' Q ' + x + ' ' + (y + h) + ' ' + x + ' ' + (y + h - r) + ' Z';
const dPath = (x, y, w, h, r) => { const R = h / 2; return 'M ' + x + ' ' + (y + R) + ' A ' + R + ' ' + R + ' 0 0 1 ' + (x + R) + ' ' + y + ' H ' + (x + w - r) + ' Q ' + (x + w) + ' ' + y + ' ' + (x + w) + ' ' + (y + r) + ' V ' + (y + h - r) + ' Q ' + (x + w) + ' ' + (y + h) + ' ' + (x + w - r) + ' ' + (y + h) + ' H ' + (x + R) + ' A ' + R + ' ' + R + ' 0 0 1 ' + x + ' ' + (y + R) + ' Z'; };
const cPath = (cx, cy, r) => 'M ' + cx + ' ' + (cy - r) + ' A ' + r + ' ' + r + ' 0 1 1 ' + cx + ' ' + (cy + r) + ' A ' + r + ' ' + r + ' 0 1 1 ' + cx + ' ' + (cy - r);
const WF = {
  w: 760, h: 470,
  boxes: { trigger: [24, 40, 84, 84, 'd'], agent: [196, 40, 236, 84, 'r'], reply: [530, 40, 84, 84, 'r'] },
  tools: [
    { cx: 56, t: 'Claude', t2: 'Sonnet 4.6', icon: SI('anthropic', 'F4F3EE'), o: 0 },
    { cx: 186, t: 'Remember the', t2: 'conversation', lucide: 'database', o: 1 },
    { cx: 316, t: 'Read pricing', t2: 'and FAQ', m: 'search: page', icon: SI('notion', 'F4F3EE'), o: 2 },
    { cx: 446, t: 'Book a', t2: 'demo call', m: 'create: event', icon: SI('googlecalendar', '4285F4'), o: 2 },
    { cx: 576, t: 'Hand off to', t2: 'sales rep', m: 'post: message', lucide: 'slack', o: 2 },
    { cx: 706, t: 'Update lead', t2: 'in HubSpot', m: 'upsert: contact', icon: SI('hubspot', 'FF7A59'), o: 2 },
  ],
  cy: 318, r: 32,
  ports: [[236, 124, 'Chat Model'], [314, 124, 'Memory'], [392, 124, 'Tool']],
};
WF.main = ['M 108 82 C 150 82, 154 82, 196 82', 'M 432 82 C 480 82, 482 82, 530 82'];
WF.subs = WF.tools.map(tl => { const [ox, oy] = WF.ports[tl.o]; const ty = WF.cy - WF.r; return 'M ' + ox + ' ' + (oy + 26) + ' C ' + ox + ' ' + (oy + 90) + ', ' + tl.cx + ' ' + (ty - 70) + ', ' + tl.cx + ' ' + ty; });
const WF_D = { node: 520, line: 420, circle: 480, hold: 2000 };
const WF_SEG = (() => { const seg = []; let t = 0; const add = (k, d) => { seg.push({ k, s: t, d }); t += d; };
  add('trigger', WF_D.node); add('m0', WF_D.line); add('agent', WF_D.node);
  WF.tools.forEach((_, i) => { add('s' + i, WF_D.line); add('c' + i, WF_D.circle); });
  add('m1', WF_D.line); add('reply', WF_D.node); return { seg, total: t + WF_D.hold }; })();
function LiveWorkflow({ maxWidth = 760 }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setT(WF_SEG.total - 1); return; }
    let raf, t0 = performance.now(); const loop = (now) => { setT((now - t0) % WF_SEG.total); raf = requestAnimationFrame(loop); }; raf = requestAnimationFrame(loop); return () => cancelAnimationFrame(raf);
  }, []);
  const P = {}, END = {}; WF_SEG.seg.forEach(g => { P[g.k] = Math.max(0, Math.min(1, (t - g.s) / g.d)); END[g.k] = g.s + g.d; });
  const showCheck = (k) => t >= END[k];
  const ease = (p) => 1 - Math.pow(1 - p, 2);
  const G = { stroke: N8N_GREEN, fill: 'none', strokeLinecap: 'round', style: { filter: 'drop-shadow(0 0 4px rgba(53,184,106,.6))' } };
  const prog = (k, d, w = 2.5) => (P[k] <= 0 || P[k] >= 1) ? null : <path d={d} pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - ease(P[k])} strokeWidth={w} {...G} />;
  const check = (x, y, k) => showCheck(k) ? <path d={'M ' + (x - 5) + ' ' + y + ' l 3.5 3.5 l 7 -7'} fill="none" stroke={N8N_GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> : null;
  const txt = { fontFamily: 'var(--font-sans)', fill: '#E3E0D5' };
  const mono = { fontFamily: 'var(--font-mono)', fill: '#8F8B80' };
  const NODE = { fill: '#262523', stroke: '#3E3C38', strokeWidth: 1.5 };
  const box = (k, extra) => { const [x, y, w, h, sh] = WF.boxes[k]; const d = sh === 'd' ? dPath(x, y, w, h, 10) : rrPath(x, y, w, h, 10); 
    return <g key={k}><path d={d} {...NODE} />{extra}{prog(k, d)}{check(x + w - 14, y + h - 14, k)}</g>; };
  const icon = (href, x, y, sz) => <image href={href} x={x} y={y} width={sz} height={sz} />;
  const dot = (x, y) => <circle cx={x} cy={y} r="4" fill="#6B6860" />;
  return (
    <div style={{ width: '100%', maxWidth, margin: '0 auto' }}>
      <svg viewBox={'0 0 ' + WF.w + ' ' + WF.h} width="100%" role="img" aria-label="Workflow no n8n: agente de IA que qualifica e responde leads no WhatsApp" style={{ display: 'block', overflow: 'visible' }}>
        {WF.main.map((d, i) => <path key={'mb' + i} d={d} stroke="#55534D" strokeWidth="1.5" fill="none" />)}
        {WF.subs.map((d, i) => <path key={'sb' + i} d={d} stroke="#55534D" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />)}
        {WF.main.map((d, i) => <g key={'mp' + i}>{prog('m' + i, d)}</g>)}
        {WF.subs.map((d, i) => <g key={'sp' + i}>{prog('s' + i, d, 2.2)}</g>)}
        {box('trigger', icon(SI('whatsapp', '25D366'), 48, 64, 40))}
        {box('agent', <g><svg x="214" y="63" width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#F4F3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" /></svg><text x="264" y="78" style={txt} fontSize="17" fontWeight="600">AI Agent</text><text x="264" y="99" style={mono} fontSize="13">Qualify and answer lead</text></g>)}
        {box('reply', icon(SI('whatsapp', '25D366'), 552, 62, 40))}
        {dot(108, 82)}{dot(196, 82)}{dot(432, 82)}{dot(530, 82)}{dot(614, 82)}
        <text x="66" y="150" textAnchor="middle" style={txt} fontSize="15">New message</text>
        <text x="572" y="150" textAnchor="middle" style={txt} fontSize="15">Reply on WhatsApp</text>
        <text x="572" y="169" textAnchor="middle" style={mono} fontSize="12.5">message: send</text>
        {WF.ports.map(([x, y, l]) => <g key={l}><rect x={x - 4.5} y={y - 4.5} width="9" height="9" transform={'rotate(45 ' + x + ' ' + y + ')'} fill="#6B6860" /><text x={x} y={y + 22} textAnchor="middle" style={mono} fontSize="12.5">{l}</text></g>)}
        {WF.tools.map((tl, i) => (
          <g key={'t' + i}>
            <circle cx={tl.cx} cy={WF.cy} r={WF.r} {...NODE} />
            {tl.icon ? icon(tl.icon, tl.cx - 15, WF.cy - 15, 30) : <Icon name={tl.lucide} size={28} color="#F4F3EE" strokeWidth={1.6} x={tl.cx - 14} y={WF.cy - 14} />}
            {prog('c' + i, cPath(tl.cx, WF.cy, WF.r))}
            {check(tl.cx + 24, WF.cy + 24, 'c' + i)}
            <text x={tl.cx} y={WF.cy + 58} textAnchor="middle" style={txt} fontSize="14.5">{tl.t}</text>
            <text x={tl.cx} y={WF.cy + 77} textAnchor="middle" style={txt} fontSize="14.5">{tl.t2}</text>
            {tl.m && <text x={tl.cx} y={WF.cy + 96} textAnchor="middle" style={mono} fontSize="12">{tl.m}</text>}
          </g>
        ))}
      </svg>
    </div>
  );
}

function DotTrail({ step = 20, size = 7, hold = 2200, fade = 900, color = '#F4F3EE' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const cv = ref.current, host = cv && cv.parentElement; if (!cv || !host) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d'), lit = new Map(); let last = null, raf = 0, dpr = 1;
    const clear = () => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); };
    const fit = () => { dpr = window.devicePixelRatio || 1; cv.width = host.clientWidth * dpr; cv.height = host.clientHeight * dpr; };
    fit(); window.addEventListener('resize', fit);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null; if (ro) ro.observe(host);
    const mark = (gx, gy, t) => lit.set(gx + ',' + gy, t);
    const onMove = (e) => {
      const r = host.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, t = performance.now();
      const gx = Math.floor(x / step), gy = Math.floor(y / step);
      if (last) { const dx = gx - last[0], dy = gy - last[1], n = Math.max(Math.abs(dx), Math.abs(dy)); for (let i = 1; i <= n; i++) mark(Math.round(last[0] + dx * i / n), Math.round(last[1] + dy * i / n), t); }
      else mark(gx, gy, t);
      last = [gx, gy]; if (!raf) raf = requestAnimationFrame(draw);
    };
    const onLeave = () => { last = null; };
    function draw() {
      const now = performance.now(); clear(); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.fillStyle = color;
      for (const [k, t] of lit) { const age = now - t; if (age > hold + fade) { lit.delete(k); continue; } const [gx, gy] = k.split(',').map(Number);
        ctx.globalAlpha = age < hold ? 1 : 1 - (age - hold) / fade; ctx.fillRect(gx * step + (step - size) / 2, gy * step + (step - size) / 2, size, size); }
      ctx.globalAlpha = 1;
      if (lit.size) raf = requestAnimationFrame(draw); else { clear(); raf = 0; }
    }
    host.addEventListener('pointermove', onMove); host.addEventListener('pointerleave', onLeave);
    const onVis = () => { if (!document.hidden && lit.size && !raf) raf = requestAnimationFrame(draw); };
    document.addEventListener('visibilitychange', onVis);
    const sweep = setInterval(() => { if (lit.size && !raf) raf = requestAnimationFrame(draw); }, 500);
    return () => { host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave); window.removeEventListener('resize', fit); document.removeEventListener('visibilitychange', onVis); if (ro) ro.disconnect(); clearInterval(sweep); cancelAnimationFrame(raf); lit.clear(); clear(); };
  }, [step, size, hold, fade, color]);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

const MobileWorkflow = (() => {
const G = '#35B86A';
const SI = (n, c) => 'https://cdn.simpleicons.org/' + n + '/' + c;
const rr = (x, y, w, h, r) => `M ${x} ${y + h / 2} V ${y + r} Q ${x} ${y} ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} Z`;
const dp = (x, y, w, h, r) => { const R = h / 2; return `M ${x} ${y + R} A ${R} ${R} 0 0 1 ${x + R} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + R} A ${R} ${R} 0 0 1 ${x} ${y + R} Z`; };
const cp = (cx, cy, r) => `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
const M = {
  w: 340, h: 440,
  trigger: [138, 10, 64, 64], agent: [16, 124, 308, 72], reply: [138, 352, 64, 64],
  cy: 258, r: 21,
  tools: [['Claude', SI('anthropic', 'F4F3EE')], ['Memória', 'db'], ['Notion', SI('notion', 'F4F3EE')], ['Agenda', SI('googlecalendar', '4285F4')], ['Slack', 'slack'], ['HubSpot', SI('hubspot', 'FF7A59')]].map(([t, ic], i) => ({ t, ic, cx: 34 + i * 54.4 })),
};
M.m0 = 'M 170 74 L 170 124';
M.m1 = 'M 324 160 C 334 160, 334 166, 334 176 L 334 370 Q 334 384 320 384 L 202 384';
M.subs = M.tools.map(tl => `M ${tl.cx} 196 L ${tl.cx} ${M.cy - M.r}`);
const D = { node: 520, line: 360, circle: 420, hold: 2000 };
const SEG = (() => { const s = []; let t = 0; const a = (k, d) => { s.push({ k, s: t, d }); t += d; };
  a('trigger', D.node); a('m0', D.line); a('agent', D.node); M.tools.forEach((_, i) => { a('s' + i, D.line * .6); a('c' + i, D.circle); }); a('m1', D.line * 1.6); a('reply', D.node); return { s, total: t + D.hold }; })();
function MobileWorkflow() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => { let raf, t0 = performance.now(); const f = (n) => { setT((n - t0) % SEG.total); raf = requestAnimationFrame(f); }; raf = requestAnimationFrame(f); return () => cancelAnimationFrame(raf); }, []);
  const P = {}, END = {}; SEG.s.forEach(g => { P[g.k] = Math.max(0, Math.min(1, (t - g.s) / g.d)); END[g.k] = g.s + g.d; });
  const ease = (p) => 1 - Math.pow(1 - p, 2);
  const prog = (k, d, w = 2.5) => (P[k] <= 0 || P[k] >= 1) ? null : <path d={d} pathLength="1" strokeDasharray="1 1" strokeDashoffset={1 - ease(P[k])} stroke={G} strokeWidth={w} fill="none" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 4px rgba(53,184,106,.6))' }} />;
  const chk = (x, y, k) => t >= END[k] ? <path d={`M ${x - 5} ${y} l 3.5 3.5 l 7 -7`} fill="none" stroke={G} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /> : null;
  const N = { fill: '#262523', stroke: '#3E3C38', strokeWidth: 1.5 };
  const txt = { fontFamily: 'var(--font-sans)', fill: '#E3E0D5' }, mono = { fontFamily: 'var(--font-mono)', fill: '#8F8B80' };
  const [tx, ty, tw, th] = M.trigger, [ax, ay, aw, ah] = M.agent, [rx, ry, rw, rh] = M.reply;
  return (
    <svg viewBox={`0 0 ${M.w} ${M.h}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <path d={M.m0} stroke="#55534D" strokeWidth="1.5" fill="none" />
      <path d={M.m1} stroke="#55534D" strokeWidth="1.5" fill="none" />
      {M.subs.map((d, i) => <path key={i} d={d} stroke="#55534D" strokeWidth="1.5" strokeDasharray="5 5" fill="none" />)}
      {prog('m0', M.m0)}{prog('m1', M.m1)}{M.subs.map((d, i) => <g key={'p' + i}>{prog('s' + i, d, 2.2)}</g>)}
      <path d={dp(tx, ty, tw, th, 10)} {...N} /><image href={SI('whatsapp', '25D366')} x={tx + 14} y={ty + 14} width="36" height="36" />{prog('trigger', dp(tx, ty, tw, th, 10))}{chk(tx + tw - 13, ty + th - 13, 'trigger')}
      <text x={tx + tw + 14} y={ty + 30} style={txt} fontSize="14">New message</text><text x={tx + tw + 14} y={ty + 48} style={mono} fontSize="11.5">WhatsApp</text>
      <path d={rr(ax, ay, aw, ah, 10)} {...N} />
      <svg x={ax + 16} y={ay + 18} width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#F4F3EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2M20 14h2M15 13v2M9 13v2" /></svg>
      <text x={ax + 64} y={ay + 32} style={txt} fontSize="17" fontWeight="600">AI Agent</text><text x={ax + 64} y={ay + 52} style={mono} fontSize="12">Qualify and answer lead</text>
      {prog('agent', rr(ax, ay, aw, ah, 10))}{chk(ax + aw - 14, ay + ah - 14, 'agent')}
      {M.tools.map((tl, i) => <g key={'t' + i}>
        <circle cx={tl.cx} cy={M.cy} r={M.r} {...N} />
        {tl.ic === 'db' ? <svg x={tl.cx - 11} y={M.cy - 11} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4F3EE" strokeWidth="1.7"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5V19A9 3 0 0 0 21 19V5" /><path d="M3 12A9 3 0 0 0 21 12" /></svg>
          : tl.ic === 'slack' ? <svg x={tl.cx - 11} y={M.cy - 11} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F4F3EE" strokeWidth="1.7" strokeLinecap="round"><rect width="3" height="8" x="13" y="2" rx="1.5" /><path d="M19 8.5V10h1.5A1.5 1.5 0 1 0 19 8.5" /><rect width="3" height="8" x="8" y="14" rx="1.5" /><path d="M5 15.5V14H3.5A1.5 1.5 0 1 0 5 15.5" /><rect width="8" height="3" x="14" y="13" rx="1.5" /><path d="M15.5 19H14v1.5a1.5 1.5 0 1 0 1.5-1.5" /><rect width="8" height="3" x="2" y="8" rx="1.5" /><path d="M8.5 5H10V3.5A1.5 1.5 0 1 0 8.5 5" /></svg>
          : <image href={tl.ic} x={tl.cx - 11} y={M.cy - 11} width="22" height="22" />}
        {prog('c' + i, cp(tl.cx, M.cy, M.r), 2.2)}
        {t >= END['c' + i] ? <circle cx={tl.cx + 16} cy={M.cy + 16} r="7" fill="#1A1915" /> : null}{chk(tl.cx + 16, M.cy + 16, 'c' + i)}
        <text x={tl.cx} y={M.cy + 40} textAnchor="middle" style={txt} fontSize="11.5">{tl.t}</text>
      </g>)}
      <path d={rr(rx, ry, rw, rh, 10)} {...N} /><image href={SI('whatsapp', '25D366')} x={rx + 14} y={ry + 14} width="36" height="36" />{prog('reply', rr(rx, ry, rw, rh, 10))}{chk(rx + rw - 13, ry + rh - 13, 'reply')}
      <text x={rx - 14} y={ry + 30} textAnchor="end" style={txt} fontSize="14">Reply</text><text x={rx - 14} y={ry + 48} textAnchor="end" style={mono} fontSize="11.5">message: send</text>
    </svg>
  );
}
return MobileWorkflow;
})();

function Hero({ onCta }) {
  const go = (id) => window.scrollTo({ top: document.getElementById(id).offsetTop - 68, behavior: 'smooth' });
  return (
    <section id="top" className="af-canvas-inverse" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--grafite-700)' }}>
      <style>{'@keyframes heroIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion:reduce){.hero-anim{animation:none!important}}'}</style>
      <div className="ct" style={{ ...siteW, display: 'grid', gridTemplateColumns: 'minmax(0,5fr) minmax(0,7fr)', gap: 48, alignItems: 'center', padding: 'clamp(40px,8vw,64px) clamp(20px,5vw,40px)' }}>
        <div className="hero-anim" style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'heroIn .8s cubic-bezier(.2,.7,.2,1) both' }}>
          <span className="af-eyebrow" style={{ color: 'var(--grafite-300)' }}>AI Automation Engineer</span>
          <h1 style={H(52, { color: 'var(--areia-50)' })}>Não apenas uso IA. Eu <em style={{ color: '#F0668B' }}>construo</em> com IA.</h1>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--grafite-300)' }}>Construo aplicações e automações com inteligência artificial, conectando ferramentas, agentes e sistemas para resolver problemas reais.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            <Button size="lg" iconRight="arrow-right" onClick={() => go('projetos')}>Ver projetos</Button>
            <Button size="lg" variant="secondary" iconRight="arrow-down" onClick={onCta}>Fale comigo</Button>
          </div>
        </div>
        <div className="hero-anim" style={{ minWidth: 0, animation: 'heroIn .9s .2s cubic-bezier(.2,.7,.2,1) both' }}><div className="wf-desk"><LiveWorkflow /></div><div className="wf-mob" style={{ display: 'none' }}><MobileWorkflow /></div></div>
      </div>
    </section>
  );
}

const DIFS = [
  ['layout-dashboard', 'Sistemas e aplicações web', 'Aplicações sob medida para organizar informações e tarefas que ferramentas prontas não atendem bem.'],
  ['bot', 'Agentes de IA', 'Agentes que leem, classificam, resumem e respondem, com regras claras e revisão humana onde precisa.'],
  ['workflow', 'Automações com n8n', 'Fluxos que tiram o trabalho repetitivo das pessoas e mantêm cada etapa andando sozinha.'],
  ['webhook', 'APIs e integrações', 'Sistemas, planilhas e plataformas conversando entre si, sem copiar e colar dados.'],
];
function Differentials() {
  return (
    <section id="servicos" style={{ ...siteW, padding: '0 clamp(20px,5vw,40px) clamp(64px,10vw,96px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680, paddingTop: 'clamp(64px,10vw,96px)' }}>
        <span className="af-eyebrow">O que eu faço</span>
        <h2 style={H(44)}>Tecnologia que se adapta ao processo, não o contrário.</h2>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)' }}>Cada solução pode ser uma aplicação, uma automação, uma integração, IA ou uma combinação delas. O problema decide.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
        <style>{'.dif{position:relative!important;transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s,border-color .35s}.dif:hover{transform:translateY(-6px)!important;box-shadow:var(--shadow-3)!important;border-color:var(--coral-300)!important}.dif .dif-ic{transition:transform .45s cubic-bezier(.3,1.5,.5,1),background .3s,color .3s}.dif:hover .dif-ic{transform:rotate(-8deg) scale(1.12);background:var(--accent)!important;color:#fff!important}.dif .dif-ln{position:absolute;left:24px;right:24px;bottom:0;height:2px;background:var(--accent);transform:scaleX(0);transform-origin:left;transition:transform .45s cubic-bezier(.2,.7,.2,1)}.dif:hover .dif-ln{transform:scaleX(1)}@media (prefers-reduced-motion:reduce){.dif,.dif *{transition:none!important}.dif:hover{transform:none}}'}</style>
        {DIFS.map(([ic, t, d]) => (
          <Card key={t} padding="lg" className="dif" style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
            <span className="dif-ic" style={{ width: 40, height: 40, borderRadius: 'var(--radius-md)', background: 'var(--accent-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-accent)' }}><Icon name={ic} size={20} /></span>
            <h3 style={H(22)}>{t}</h3>
            <p style={{ font: 'var(--type-body-sm)', color: 'var(--fg-2)' }}>{d}</p>
            <span className="dif-ln" />
          </Card>
        ))}
      </div>
    </section>
  );
}

const PROJECTS = [
  { t: 'SDR Virtual com IA', p: 'IA + Automação', d: 'Atende e qualifica leads automaticamente, para o time comercial falar com quem está pronto para conversar.' },
  { t: 'Cadência comercial automatizada', p: 'Automação n8n', d: 'Acompanha cada lead no tempo certo, sem depender de lembrete manual ou planilha.' },
  { t: 'IA e automação para o jurídico', p: 'IA + Automação', d: 'Organiza documentos e demandas e tira tarefas operacionais da equipe, que fica com a análise.' },
  { t: 'Automação para RH', p: 'IA + Automação', d: 'Recebe, organiza e acompanha candidatos, acelerando a triagem no recrutamento.' },
];
function Projects() {
  return (
    <section id="projetos" className="af-canvas-inverse" style={{ color: 'var(--fg-inverse)' }}>
      <div style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 680 }}>
          <span className="af-eyebrow" style={{ color: 'var(--argila-400)' }}>Projetos</span>
          <h2 style={H(44, { color: 'var(--areia-50)' })}>Menos demonstração mágica. Mais solução funcionando.</h2>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--grafite-300)' }}>Cada projeto começou com um problema específico de uma área do negócio.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20 }}>
          <style>{'.prj{position:relative!important;overflow:hidden;transition:transform .35s cubic-bezier(.2,.7,.2,1),border-color .35s,box-shadow .35s}.prj:hover{transform:translateY(-6px)!important;border-color:rgba(217,119,87,.65)!important;box-shadow:0 18px 40px -16px rgba(0,0,0,.6),0 0 0 1px rgba(217,119,87,.3)!important}.prj .prj-bd{position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(420px circle at var(--mx,50%) var(--my,0%),rgba(217,119,87,.16),transparent 60%);opacity:0;transition:opacity .35s}.prj:hover .prj-bd{opacity:1}.prj .prj-tag{transition:color .3s,letter-spacing .35s}.prj:hover .prj-tag{color:#E49B7E!important;letter-spacing:.14em!important}.prj .prj-go{position:absolute;right:24px;top:24px;width:32px;height:32px;border-radius:99px;border:1px solid var(--grafite-700);display:flex;align-items:center;justify-content:center;color:var(--areia-50);opacity:0;transform:translate(-6px,6px);transition:opacity .3s,transform .4s cubic-bezier(.3,1.5,.5,1),background .3s,border-color .3s}.prj:hover .prj-go{opacity:1;transform:none;background:#D97757;border-color:#D97757;color:#1A1915}@media (prefers-reduced-motion:reduce){.prj,.prj *{transition:none!important}.prj:hover{transform:none!important}}'}</style>
          {PROJECTS.map(p => (
            <Card key={p.t} variant="inverse" padding="lg" className="prj" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px'); e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px'); }} style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220 }}>
              <span className="prj-bd" />
              <span className="prj-go"><Icon name="arrow-up-right" size={16} /></span>
              <span className="prj-tag" style={{ position: 'relative', font: '500 11px var(--font-mono)', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--grafite-300)' }}>{p.p}</span>
              <h3 style={H(22, { position: 'relative', color: 'var(--areia-50)', paddingRight: 40 })}>{p.t}</h3>
              <p style={{ position: 'relative', font: 'var(--type-body-sm)', color: 'var(--fg-inverse-2)' }}>{p.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const STEPS = {
  dor: { n: '01', t: 'Entender o problema', d: 'Começo pela dor e pelo processo real: quem faz, quanto se repete, onde trava. Não automatizo algo só porque é possível.', items: ['Mapear o processo', 'Definir entrada e saída', 'Escolher a ferramenta'], kind: 'trigger' },
  construir: { n: '02', t: 'Construir e testar', d: 'Monto o workflow com n8n, agentes e integrações, e testo com dados reais antes de chamar de solução.', items: ['Workflow no n8n', 'Agente com Claude', 'Testes com dados reais'], kind: 'ai' },
  documentar: { n: '03', t: 'Validar e documentar', d: 'Explico o que melhorou, o que não resolve e os riscos. Diferencio protótipo, demonstração e produção.', items: ['Diagrama do fluxo', 'Limitações conhecidas', 'Próximos passos'], kind: 'action' },
};
function Method() {
  const [tab, setTab] = React.useState('dor');
  const s = STEPS[tab];
  return (
    <section id="metodo" style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
          <span className="af-eyebrow">Como construo</span>
          <h2 style={H(44)}>Da ideia ao workflow.</h2>
        </div>
        <div style={{ overflowX: 'auto', scrollbarWidth: 'none', margin: '0 -4px', padding: '0 4px' }}><div style={{ minWidth: 'max-content' }}><Tabs value={tab} onChange={setTab} items={[{ id: 'dor', label: '01 · Problema' }, { id: 'construir', label: '02 · Construção' }, { id: 'documentar', label: '03 · Validação' }]} /></div></div>
        <div className="ct" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <span style={{ font: '600 clamp(44px,8vw,64px)/1 var(--font-mono)', color: 'var(--coral-200)' }}>{s.n}</span>
            <h3 style={H(32)}>{s.t}</h3>
            <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)' }}>{s.d}</p>
          </div>
          <Card variant="canvas" padding="md" style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
            {s.items.map((it, i) => <WorkflowNode key={it} kind={s.kind} title={it} runTone="claude" status={i === 0 ? 'success' : i === 1 ? 'running' : 'idle'} subtitle={'etapa ' + s.n + '.' + (i + 1)} width={'min(320px, calc(100% - ' + i * 20 + 'px))'} style={{ marginLeft: i * 20 }} />)}
          </Card>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'grid', gridTemplateColumns: 'minmax(0,400px) minmax(0,1fr)', gap: 64, alignItems: 'center' }} className="ct">
      <div style={{ width: '100%', maxWidth: 400, aspectRatio: '5 / 6' }}><image-slot id="site-retrato" shape="rounded" radius="16" src="../../assets/photos/analice-perfil-grafite.png" placeholder="Foto real da Analice"></image-slot></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span className="af-eyebrow">Sobre</span>
        <h2 style={H(44)}>Visão de negócio. Mão na tecnologia.</h2>
        <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-1)' }}>Sou Analice Ferreira, AI Automation Engineer.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Minha trajetória começou nos negócios, com vendas, processos e desenvolvimento comercial. Foi nesse contexto que aprendi a olhar além das tarefas: entender o problema, identificar oportunidades e buscar formas melhores de fazer as coisas.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Hoje, levo essa visão para a tecnologia. Construo aplicações, agentes de IA e automações combinando ferramentas, integrações e inteligência artificial para transformar problemas reais em soluções práticas.</p>
        <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)' }}>Também compartilho o que construo e aprendo, mostrando como a IA pode sair do campo das possibilidades e ganhar aplicação no dia a dia.</p>
        <p style={{ font: '600 18px/1.5 var(--font-sans)', color: 'var(--fg-1)', paddingLeft: 16, borderLeft: '3px solid var(--accent)' }}>Meu foco é simples: entender o problema, construir a solução e demonstrar o que a tecnologia pode fazer.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}><Tag icon="workflow">n8n</Tag><Tag icon="sparkles">claude</Tag><Tag icon="bot">agentes</Tag><Tag icon="webhook">apis</Tag><Tag icon="database">dados</Tag></div>
      </div>
    </section>
  );
}

const FAQS = [
  ['O que é o n8n?', 'Uma ferramenta para montar automações conectando aplicativos, APIs e IA em um fluxo visual. É onde eu desenho e coloco para rodar boa parte dos workflows.'],
  ['Preciso trocar as ferramentas que já uso?', 'Normalmente não. O caminho mais comum é conectar o que já existe, como planilhas, CRM e e-mail, e automatizar entre eles.'],
  ['Onde a IA realmente faz sentido?', 'Em tarefas que exigem ler, classificar, resumir ou responder com base em contexto. Para regras fixas, uma automação simples costuma resolver melhor.'],
  ['Como funciona um projeto?', 'Entendo o processo, desenho o fluxo, construo e testo com dados reais. No fim, explico o que melhorou, o que ainda não resolve e os próximos passos.'],
  ['E a segurança dos dados?', 'Os dados ficam nas ferramentas que você já controla, com acesso restrito ao necessário. Cada integração é definida com você antes de entrar em uso.'],
];
function Faq() {
  return (
    <section id="faq" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-1)', borderBottom: '1px solid var(--border-1)' }}>
      <div style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.6fr)', gap: 64 }} className="ct">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="af-eyebrow">FAQ</span>
          <h2 style={H(44)}>Perguntas frequentes.</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {FAQS.map(([q, a], i) => (
            <details key={q} className="af-faq" open={i === 0} style={{ borderTop: '1px solid var(--border-1)', padding: '20px 0' }}>
              <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, font: '600 18px/1.3 var(--font-sans)', color: 'var(--fg-1)' }}>{q}<Icon name="plus" size={18} className="af-faq-ic" /></summary>
              <p style={{ font: 'var(--type-body)', color: 'var(--fg-2)', marginTop: 12, maxWidth: 620 }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

const CONTACT = { webhook: '', email: 'contato@analiceferreira.com.br', wa: 'https://wa.me/5511939443029?text=' + encodeURIComponent('Olá, Analice! Vim pelo seu site e gostaria de conversar.'),
  social: [['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/analiceferreirads/'], ['instagram', 'Instagram', 'https://www.instagram.com/analiceferreira_tech/']] };
const open = (u) => window.open(u, '_blank', 'noopener');
const taStyle = { width: '100%', boxSizing: 'border-box', minHeight: 120, resize: 'vertical', padding: '10px 12px', font: 'var(--type-body)', color: 'var(--fg-1)', background: 'var(--bg-surface)', border: '1px solid var(--border-2)', borderRadius: 'var(--radius-md)' };

function Contact({ onSent }) {
  const [busy, setBusy] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault(); const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const payload = { ...data, origem: 'site', pagina: window.location.href, enviado_em: new Date().toISOString() };
    if (!CONTACT.webhook) { onSent('off'); return; }
    setBusy(true);
    try { const r = await fetch(CONTACT.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }); if (!r.ok) throw new Error(r.status); onSent(true); form.reset(); }
    catch (err) { onSent(false); } finally { setBusy(false); }
  };
  return (
    <section id="contato" style={{ ...siteW, padding: 'clamp(64px,10vw,96px) clamp(20px,5vw,40px)' }}>
      <div className="ct" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <span className="af-eyebrow">Contato</span>
          <h2 style={H(44)}>Vamos conversar sobre o que você quer construir.</h2>
          <p style={{ font: 'var(--type-body-lg)', color: 'var(--fg-2)', maxWidth: 480 }}>Conte a dor, a ideia ou a oportunidade. Respondo com o que dá para construir e o que não dá.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button size="lg" iconLeft="message-circle" onClick={() => open(CONTACT.wa)}>Falar no WhatsApp</Button>
          </div>
        </div>
        <Card padding="lg" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h3 style={H(22)}>Envie uma mensagem</h3>
            <Input label="Nome" name="nome" placeholder="Seu nome" required />
            <Input label="E-mail" name="email" type="email" placeholder="voce@empresa.com" iconLeft="mail" required />
            <Select label="Assunto" name="assunto" placeholder="Selecione" defaultValue="" options={['Automação para minha empresa', 'Oportunidade de trabalho', 'Conteúdo e parceria', 'Outro']} />
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, font: '500 13px var(--font-sans)', color: 'var(--fg-1)' }}>Mensagem<textarea className="af-ta" name="mensagem" required placeholder="Descreva o processo, a dor ou a ideia." style={taStyle}></textarea></label>
            <Button type="submit" size="lg" iconRight="send" disabled={busy}>{busy ? 'Enviando…' : 'Enviar mensagem'}</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}

function WhatsAppFab() {
  return (
    <button onClick={() => open(CONTACT.wa)} aria-label="Falar no WhatsApp" title="Falar no WhatsApp" className="af-fab" style={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1000, width: 60, height: 60, borderRadius: 99, border: 0, cursor: 'pointer', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px rgba(26,25,21,.9), 0 10px 28px -8px rgba(0,0,0,.5)', transition: 'transform .25s cubic-bezier(.3,1.5,.5,1)' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}>
      <img src="https://cdn.simpleicons.org/whatsapp/ffffff" width="32" height="32" alt="" />
    </button>
  );
}

function SiteFooter() {
  return (
    <footer style={{ background: 'var(--grafite-900)', color: 'var(--fg-inverse-2)' }}>
      <div className="af-canvas-inverse" style={{ position: 'relative', height: 'clamp(240px,45vw,400px)', overflow: 'hidden', borderBottom: '1px solid var(--grafite-700)', cursor: 'crosshair', touchAction: 'pan-y' }}>
        <DotTrail size={14} hold={1200} fade={800} />
      </div>
      <div style={{ ...siteW, padding: '36px clamp(20px,5vw,40px)', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <Lockup inverse />
        <a href="mailto:contato@analiceferreira.com.br" style={{ font: '500 13px var(--font-mono)', color: 'var(--areia-50)', textDecoration: 'none' }}>contato@analiceferreira.com.br</a>
        <div style={{ display: 'flex', gap: 8 }}>{CONTACT.social.map(([ic, l, u]) => <IconButton key={l} icon={ic} label={l} variant="inverse" size="md" onClick={() => open(u)} />)}</div>
      </div>
    </footer>
  );
}

Object.assign(window, { Faq, DotTrail, SiteNav, Hero, Differentials, Projects, Method, About, Contact, WhatsAppFab, SiteFooter, Toast });
