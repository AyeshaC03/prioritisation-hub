import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard, Inbox, SlidersHorizontal, Grid2X2, Map, Workflow,
  Search, Bell, ChevronRight, ArrowUpRight, Info, CheckCircle2, Lightbulb,
  Target, Plus, Download, X, Users, ShieldAlert, BarChart3
} from 'lucide-react';
import './styles.css';

const initialItems = [
  { id: 'OPP-142', title: 'Self-serve workspace templates', team: 'Activation', reach: 8, impact: 3, confidence: 0.8, effort: 2, status: 'Ready', type: 'Growth', owner: 'Activation squad' },
  { id: 'OPP-119', title: 'Bulk import from competitor', team: 'Migration', reach: 6, impact: 3, confidence: 0.7, effort: 3, status: 'Scoring', type: 'Retention', owner: 'Migration squad' },
  { id: 'OPP-087', title: 'Usage-based billing alerts', team: 'Monetisation', reach: 7, impact: 2, confidence: 0.9, effort: 5, status: 'Discovery', type: 'Revenue', owner: 'Monetisation squad' },
  { id: 'OPP-164', title: 'AI-powered brief summary', team: 'Core UX', reach: 9, impact: 2, confidence: 0.6, effort: 8, status: 'Discovery', type: 'Delight', owner: 'Core UX squad' },
  { id: 'OPP-098', title: 'SAML provisioning improvements', team: 'Enterprise', reach: 3, impact: 3, confidence: 0.9, effort: 3, status: 'Ready', type: 'Risk', owner: 'Enterprise squad' }
];
const rice = x => (x.reach * x.impact * x.confidence / Math.max(x.effort, 1));
const wsjf = x => ((x.impact * 2 + x.reach + x.confidence * 10) / Math.max(x.effort, 1));
const valueEffort = x => ((x.impact * 3 + x.reach) / Math.max(x.effort, 1));
const scoreFor = (x, model) => model === 'RICE' ? rice(x) : model === 'WSJF' ? wsjf(x) : valueEffort(x);
const formatScore = n => n.toFixed(1);

function App() {
  const [tab, setTab] = useState('Overview');
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const nav = [['Overview', LayoutDashboard], ['Opportunity backlog', Inbox], ['Scoring workspace', SlidersHorizontal], ['Prioritisation matrix', Grid2X2], ['Roadmap recommendation', Map], ['Tool ecosystem', Workflow]];
  const filtered = items.filter(x => x.title.toLowerCase().includes(query.toLowerCase()) || x.id.toLowerCase().includes(query.toLowerCase()));
  const go = name => { setTab(name); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const flash = message => { setNotice(message); window.setTimeout(() => setNotice(''), 2800); };
  const update = (id, key, value) => setItems(current => current.map(item => item.id === id ? { ...item, [key]: value } : item));
  return <div className="app">
    <aside>
      <div className="brand"><div className="mark">P</div><div><b>Prioritisation<span>Hub</span></b><small>Portfolio simulation</small></div></div>
      <div className="workspace"><div className="avatar">AC</div><div><small>WORKSPACE</small><strong>Northstar Product</strong></div></div>
      <nav>{nav.map(([name, Icon]) => <button className={tab === name ? 'active' : ''} onClick={() => go(name)} key={name}><Icon size={18} />{name}</button>)}</nav>
      <div className="side-note"><Lightbulb size={17} /><p><b>Recruiter lens</b><br />A concise case study in turning evidence into an aligned roadmap.</p></div>
      <div className="user"><div className="avatar purple">AC</div><div><strong>Ayesha C</strong><small>Project Manager / Certified Scrum Master</small></div></div>
    </aside>
    <main>
      <header><div className="crumb"><span>Northstar Product</span><ChevronRight size={14} /><b>{tab}</b></div><div className="head-actions"><div className="search"><Search size={16} /><input aria-label="Search opportunities" placeholder="Search opportunities" value={query} onChange={e => setQuery(e.target.value)} /></div><button className="icon-btn" aria-label="Show simulation note" onClick={() => flash('This portfolio simulation has no live notifications.')}><Bell size={18} /></button><div className="avatar purple">AC</div></div></header>
      <div className="content">
        <div className="simulation"><Info size={16} /><span><b>Illustrative portfolio simulation</b> · Sample data only — no live integrations or client/production data.</span><button onClick={() => go('Tool ecosystem')}>See how the workflow connects <ArrowUpRight size={14} /></button></div>
        {notice && <div className="toast" role="status">{notice}</div>}
        {tab === 'Overview' && <Overview items={items} go={go} />}
        {tab === 'Opportunity backlog' && <Backlog items={filtered} allItems={items} go={go} onAdd={item => { setItems([...items, item]); flash('Opportunity added to the illustrative backlog.'); }} />}
        {tab === 'Scoring workspace' && <Scoring items={items} update={update} />}
        {tab === 'Prioritisation matrix' && <Matrix items={items} />}
        {tab === 'Roadmap recommendation' && <Roadmap items={items} onExport={() => flash('Narrative export is simulated; no file or external system is connected.')} />}
        {tab === 'Tool ecosystem' && <Ecosystem go={go} />}
      </div>
    </main>
  </div>;
}

function PageTitle({ eyebrow, title, desc, action, lens }) {
  return <><div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{desc}</p></div>{action}</div><div className="workflow-lens"><span>Workflow lens</span><b>{lens}</b><em>Simulated view · no live integration</em></div></>;
}
function Overview({ items, go }) {
  const ready = items.filter(x => x.status === 'Ready').length;
  const top = [...items].sort((a, b) => rice(b) - rice(a))[0];
  return <><ProjectOverview /><PageTitle eyebrow="Prioritisation & delivery view · Q3 planning" lens="Cross-tool portfolio review (Jira Product Discovery → Jira Software)" title="Make prioritisation decisions with confidence." desc="A single view of customer signal, delivery reality and measurable outcomes." action={<button className="primary" onClick={() => go('Opportunity backlog')}><Plus size={14} /> Review opportunities</button>} />
    <div className="stats"><Stat label="Opportunities" value={items.length} change="Illustrative ideas in scope" help="Each opportunity is a problem statement, not a promised feature." /><Stat label="Scored & ready" value={ready} change={`${Math.round(ready / items.length * 100)}% of this sample`} help="Ready means the sample has enough evidence to discuss delivery." /><Stat label="Q3 capacity" value="72%" change="14 weeks available" help="A planning assumption: 72 of 100 capacity points are allocated." /><Stat label="Alignment score" value="86%" change="Illustrative pulse" help="A sample confidence measure from stakeholder alignment, not a production KPI." /></div>
    <div className="grid-two"><section className="card pulse"><div className="card-head"><div><h2>Portfolio pulse</h2><p>Share of this sample by customer outcome</p></div><button className="link" onClick={() => go('Prioritisation matrix')}>View matrix <ChevronRight size={15} /></button></div>{[['Growth',42,'#5c50d7'],['Retention',28,'#9b8afb'],['Revenue',18,'#f1a66a'],['Risk / trust',12,'#70c6bb']].map(([label, value, color]) => <div className="bar-row" key={label}><span>{label}</span><div className="bar"><i style={{ width: `${value}%`, background: color }} /></div><b>{value}%</b></div>)}<p className="definition">Percentages show the illustrative share of opportunities tagged to each outcome.</p></section>
      <section className="card signal"><div className="card-head"><div><h2>Signal to action</h2><p>Sample inputs and what they inform</p></div><span className="badge mint">3 signals</span></div>{[['01','Jira Product Discovery','Teams need a faster first win','18 votes · 6 interviews','Opportunity backlog'],['02','Miro','Onboarding friction cluster','12 notes · workshop 14','Prioritisation matrix'],['03','Excel / Sheets','Q3 capacity updated','72% allocated','Scoring workspace']].map(x => <div className="signal-row" key={x[0]}><span className="num">{x[0]}</span><div><b>{x[1]} <em>{x[2]}</em></b><small>{x[3]}</small></div><button className="signal-arrow" aria-label={`Open ${x[1]} view`} onClick={() => go(x[4])}><ChevronRight size={16} /></button></div>)}</section></div>
    <section className="card next"><div className="card-head"><div><h2>Recommended next</h2><p>Highest illustrative RICE score with delivery confidence</p></div><button className="link" onClick={() => go('Scoring workspace')}>Open scoring workspace <ChevronRight size={15} /></button></div><div className="recommend"><div className="rec-icon"><Target /></div><div><h3>{top.title}</h3><p>{top.id} · {top.team} · {top.type}</p></div><div className="score"><small>RICE score</small><strong>{formatScore(rice(top))}</strong></div><button className="outline" onClick={() => go('Roadmap recommendation')}>See rationale <ArrowUpRight size={14} /></button></div></section>
    <section className="card explanation"><h2>Decision guardrails</h2><div className="explanation-grid"><div><b>Evidence first</b><p>Revisit scores when customer evidence or delivery assumptions change.</p></div><div><b>Balanced portfolio</b><p>Protect a visible 20% capacity allocation for enterprise trust and risk work.</p></div><div><b>Transparent trade-offs</b><p>Use the model to support judgement, not to imply false precision.</p></div><div><b>Outcome ownership</b><p>Connect every selected bet to a measurable customer or business outcome.</p></div></div><div className="risk-note"><ShieldAlert size={17} /><span><b>Risks and consequences:</b> prioritising growth alone could delay enterprise safeguards; weak confidence can create rework. The roadmap keeps risk and learning visible.</span></div></section></>;
}
function Stat({ label, value, change, help }) { return <div className="stat"><small>{label}</small><strong>{value}</strong><span>{change}</span><p className="stat-help">{help}</p></div>; }

function ProjectOverview() {
  return <section className="project-overview" aria-labelledby="project-overview-title">
    <div className="overview-kicker"><span className="overview-mark"><Target size={16} /></span><span>PROJECT BRIEF · NORTHSTAR PRODUCT</span><span className="overview-status">Q3 planning cycle</span></div>
    <div className="overview-intro"><div><h2 id="project-overview-title">Project overview</h2><p className="overview-summary">Northstar Product is a fictional B2B product team choosing where to invest limited Q3 delivery capacity. This decision workspace turns customer evidence, strategic outcomes and delivery constraints into a shared, defensible prioritisation view.</p></div><div className="overview-purpose"><span>Purpose</span><strong>Align the next 12 weeks of product investment</strong><small>Balance activation, revenue learning and enterprise trust.</small></div></div>
    <div className="overview-grid">
      <div><span className="overview-label">Goals</span><ul><li>Reduce time-to-first-value for new teams.</li><li>Validate revenue opportunities before scaling.</li><li>Reserve capacity for risk and trust commitments.</li></ul></div>
      <div><span className="overview-label">KPIs</span><ul><li>Activation and time-to-first-value.</li><li>Validated revenue signal and conversion.</li><li>Enterprise blockers closed without regressions.</li></ul></div>
      <div><span className="overview-label">Stakeholder groups</span><ul><li>Customers, prospects and account teams.</li><li>Product, design, engineering and support.</li><li>Leadership, finance and delivery partners.</li></ul></div>
      <div><span className="overview-label">Major risks & consequences</span><p>Scores can create false precision, and growth-only decisions could defer enterprise safeguards. Consequences include rework, lost trust and slower expansion. Assumptions stay editable and trade-offs stay visible.</p></div>
    </div>
  </section>;
}

function Backlog({ items, allItems, onAdd }) {
  const [filter, setFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const visible = items.filter(x => filter === 'All' || filter === 'Needs scoring' && x.status !== 'Ready' || filter === 'Ready' && x.status === 'Ready');
  const [draft, setDraft] = useState({ title: '', team: 'New team', type: 'Growth' });
  const submit = e => { e.preventDefault(); if (!draft.title.trim()) return; onAdd({ ...draft, id: `OPP-${String(170 + allItems.length).padStart(3, '0')}`, reach: 5, impact: 2, confidence: 0.5, effort: 4, status: 'Discovery', owner: draft.team }); setDraft({ title: '', team: 'New team', type: 'Growth' }); setShowForm(false); };
  return <><PageTitle eyebrow="Input layer · Jira Product Discovery" lens="Jira Product Discovery opportunity intake" title="Opportunity backlog" desc="Turn customer evidence into opportunities the whole team can understand." action={<button className="primary" onClick={() => setShowForm(!showForm)}>{showForm ? <X size={14} /> : <Plus size={14} />} {showForm ? 'Close form' : 'New opportunity'}</button>} />
    {showForm && <form className="card add-form" onSubmit={submit}><label>Opportunity title<input required value={draft.title} onChange={e => setDraft({ ...draft, title: e.target.value })} placeholder="e.g. Faster workspace setup" /></label><label>Team<input value={draft.team} onChange={e => setDraft({ ...draft, team: e.target.value })} /></label><label>Value dimension<select value={draft.type} onChange={e => setDraft({ ...draft, type: e.target.value })}><option>Growth</option><option>Retention</option><option>Revenue</option><option>Risk</option><option>Delight</option></select></label><button className="primary" type="submit">Add illustrative opportunity</button></form>}
    <div className="filters">{['All', 'Needs scoring', 'Ready'].map(name => <button key={name} className={`filter ${filter === name ? 'active' : ''}`} onClick={() => setFilter(name)}>{name} <span>{name === 'All' ? items.length : visible.filter(x => name === 'Ready' ? x.status === 'Ready' : x.status !== 'Ready').length}</span></button>)}<div className="filter-space" /><span className="filter-caption">Search applies across this sample</span></div>
    <section className="card table-card"><div className="table-head"><span>OPPORTUNITY</span><span>TEAM</span><span>STATUS</span><span>RICE</span><span>WSJF</span><span /></div>{visible.map(x => <div className="table-row" key={x.id}><div className="opp"><span className="opp-dot" /><div><b>{x.title}</b><small>{x.id} · {x.type} · {x.owner}</small></div></div><span>{x.team}</span><span><i className={`status ${x.status.toLowerCase()}`}>{x.status}</i></span><strong>{formatScore(rice(x))}</strong><strong>{formatScore(wsjf(x))}</strong><span className="row-info" title="Scores update in the Scoring workspace"><Info size={15} /></span></div>)}</section><p className="definition">RICE and WSJF are directional prioritisation scores. Reach is people per quarter; impact is 1–3; confidence is estimated certainty; effort is person-weeks.</p></>;
}

function Scoring({ items, update }) {
  const [model, setModel] = useState('RICE');
  return <><PageTitle eyebrow="Decision layer · editable model" lens="Excel / Google Sheets scoring model" title="Scoring workspace" desc="Edit assumptions, switch methods and see rankings recalculate immediately." />
    <div className="model-switch"><span>Scoring model</span>{['RICE', 'WSJF', 'Value / effort'].map(name => <button className={model === name ? 'selected' : ''} onClick={() => setModel(name)} key={name}>{name}</button>)}<div className="model-help"><Info size={15} /> Directional, not absolute truth</div></div>
    <section className="card score-table"><div className="score-head"><span>OPPORTUNITY</span><span>REACH<small>people / quarter</small></span><span>IMPACT<small>1–3 points</small></span><span>CONFIDENCE<small>0–1 estimate</small></span><span>EFFORT<small>person-weeks</small></span><span>{model} SCORE</span></div>{items.map(x => <div className="score-row" key={x.id}><div className="opp"><span className="opp-dot" /><div><b>{x.title}</b><small>{x.id}</small></div></div>{['reach', 'impact', 'confidence', 'effort'].map(key => <input aria-label={`${x.title} ${key}`} key={key} type="number" min="0" max={key === 'impact' ? 3 : key === 'confidence' ? 1 : undefined} step={key === 'confidence' ? '.1' : '1'} value={x[key]} onChange={e => update(x.id, key, Number(e.target.value))} />)}<strong className="big-score">{formatScore(scoreFor(x, model))}</strong></div>)}</section>
    <div className="formula"><Info size={16} /><span><b>Definitions:</b> RICE = reach × impact × confidence ÷ effort. WSJF = (impact × 2 + reach + confidence × 10) ÷ effort. Value / effort = (impact × 3 + reach) ÷ effort. Higher is better within this illustrative sample.</span></div></>;
}

function Matrix({ items }) {
  return <><PageTitle eyebrow="Synthesis layer · decision visual" lens="Miro prioritisation workshop" title="Prioritisation matrix" desc="See value and effort together; edit inputs in Scoring workspace to move the dots." /><div className="matrix-layout"><section className="card matrix-card"><div className="axis y">VALUE <span>↑</span></div><div className="axis x">EFFORT <span>→</span></div><div className="quadrants"><div className="quad now"><b>DO NOW</b><small>High value · low effort</small></div><div className="quad bet"><b>BIG BETS</b><small>High value · high effort</small></div><div className="quad later"><b>FILL-INS</b><small>Low value · low effort</small></div><div className="quad avoid"><b>DEFER</b><small>Low value · high effort</small></div>{items.map((x, i) => <div key={x.id} className="dot" title={`${x.id}: ${x.title}`} style={{ left: `${20 + (Math.min(x.effort, 10) / 10) * 65}%`, bottom: `${15 + (x.impact / 3) * 65}%`, background: i < 2 ? '#5d50d6' : i === 2 ? '#f09c5f' : '#5ab4a9' }}><span>{x.id.replace('OPP-', '')}</span></div>)}</div></section><section className="card legend"><h2>How to read this</h2><p>Each dot is one illustrative opportunity. Higher value means greater expected customer or business impact; farther right means more person-weeks.</p><div className="legend-item"><i className="purple-dot" /><div><b>Growth and retention</b><small>Sample bets with strongest value signal</small></div></div><div className="legend-item"><i className="orange-dot" /><div><b>Revenue validation</b><small>Potential upside, still needs learning</small></div></div><hr /><b className="muted">Trade-off</b><p className="small">Fund one growth bet, validate revenue and reserve 20% capacity for enterprise risk. Not doing so could delay trust work.</p></section></div></>;
}

function Roadmap({ items, onExport }) {
  const top = [...items].sort((a, b) => rice(b) - rice(a))[0];
  return <><PageTitle eyebrow="Recommendation · Q3" lens="Jira Software delivery handoff" title="A focused, defensible roadmap." desc="Three bets sequenced around evidence, capacity and learning velocity." action={<button className="primary" onClick={onExport}><Download size={14} /> Export narrative</button>} /><section className="card gates"><div><h2>Recommendation gates</h2><p>Commitment and risk are considered before sequencing, not added at the end.</p></div><ol><li><b>Gate 1 · Strategic fit</b><span>Does it serve the Q3 outcome?</span></li><li><b>Gate 2 · Value / confidence</b><span>Is the signal strong enough to learn?</span></li><li><b>Gate 3 · Effort / capacity</b><span>Can the team carry the work?</span></li><li><b>Gate 4 · Risk / dependency readiness</b><span>Are safeguards and commitments ready?</span></li></ol><strong className="gate-result">Then sequence: Now → Next → Later</strong></section><div className="roadmap"><Road number="01" label="Validate" timing="Weeks 1–3 · 20% capacity" tag="DISCOVERY" color="orange" title="Usage-based billing alerts" id="OPP-087" text="Prototype the alert threshold with five monetisation interviews." meta="Confidence 90%" /><Road number="02" label="Build" timing="Weeks 4–9 · 52% capacity" tag="PRIORITY 01" color="purple-tag" title={top.title} id={top.id} text="Reduce time-to-first-value with opinionated starting points." meta={`RICE ${formatScore(rice(top))}`} featured /><Road number="03" label="De-risk" timing="Weeks 6–12 · 20% capacity" tag="COMMITMENT" color="mint-tag" title="SAML provisioning improvements" id="OPP-098" text="Close an enterprise blocker and protect expansion revenue." meta="WSJF 4.3" /></div><div className="road-footer"><CheckCircle2 size={19} /><span><b>Why this sequence?</b> Lead with a fast learning loop, put the highest-scoring bet behind it and keep a deliberate trust investment visible. Weeks and percentages are planning assumptions, not commitments.</span></div></>;
}
function Road({ number, label, timing, tag, color, title, id, text, meta, featured }) { return <div className="road-col"><div className="road-label"><span>{number}</span><b>{label}</b><small>{timing}</small></div><div className={`road-card ${featured ? 'featured' : ''}`}><span className={`tag ${color}`}>{tag}</span><h3>{title}</h3><p>{text}</p><div className="road-meta"><span>{id}</span><b>{meta}</b></div></div></div>; }

function Ecosystem({ go }) {
  const tools = [['Jira Product Discovery', 'Capture opportunities, insights, votes and product evidence.', 'Input layer', 'purple'], ['Miro', 'Cluster interview notes and align on themes in workshops.', 'Sense-making', 'orange'], ['Excel / Google Sheets', 'Make assumptions editable and run transparent what-if models.', 'Scoring layer', 'mint'], ['Jira Software', 'Translate selected bets into epics, stories and delivery signals.', 'Execution layer', 'blue'], ['Power BI', 'Track outcome metrics and close the loop on impact.', 'Feedback loop', 'pink']];
  return <><PageTitle eyebrow="Operating model · connected tools" lens="Power BI executive view and connected workflow" title="From signal to shipped outcome." desc="Each tool has a job; intentional handoffs reduce translation loss." /><div className="ecosystem">{tools.map((t, i) => <div className="tool-card" key={t[0]}><div className={`tool-icon ${t[3]}`}>{i + 1}</div><div><div className="tool-top"><span className="tag">{t[2]}</span><span className="tool-step">STEP {i + 1}</span></div><h2>{t[0]}</h2><p>{t[1]}</p></div>{i < tools.length - 1 && <div className="connector"><ChevronRight /></div>}</div>)}</div><div className="handoff"><Workflow size={20} /><div><b>How the loop connects</b><p>Discovery evidence moves to Miro for themes, then to Sheets for explicit scoring. Selected bets become Jira Software work; Power BI outcome signals return to discovery. These are simulated workflow representations, not integrations.</p></div></div><section className="card explanation"><h2>What success would mean</h2><div className="explanation-grid"><div><b>Measure</b><p>Time-to-first-value, activation rate, validated revenue signal and enterprise blocker closure.</p></div><div><b>Stakeholder view</b><p>Customers get clearer outcomes; delivery teams see trade-offs; leadership sees why capacity is allocated.</p></div><div><b>Risk control</b><p>Revisit scores when evidence changes, avoid treating a model as certainty and protect 20% for trust work.</p></div></div><button className="link" onClick={() => go('Scoring workspace')}>Try the editable assumptions <ArrowUpRight size={14} /></button></section></>;
}

createRoot(document.getElementById('root')).render(<App />);
