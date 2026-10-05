(() => {
'use strict';

const $ = id => document.getElementById(id);
const STORE = 'scripture-paws-v2';
const TRANSITION_MS = 850;

const passages = [
  {ref:'John 14:27',theme:'Peace & Stillness',text:'Peace I leave with you, my peace I give unto you.'},
  {ref:'Matthew 11:28',theme:'Comfort & Grief',text:'Come to me, all you that labour, and are burdened, and I will refresh you.'},
  {ref:'Romans 15:13',theme:'Hope',text:'Now the God of hope fill you with all joy and peace in believing.'},
  {ref:'Philippians 4:13',theme:'Strength & Perseverance',text:'I can do all things in him who strengtheneth me.'},
  {ref:'Proverbs 3:5',theme:'Trust & Faith',text:'Have confidence in the Lord with all thy heart, and lean not upon thy own prudence.'},
  {ref:'Psalm 118:105 (119:105)',theme:'Guidance & Wisdom',text:'Thy word is a lamp to my feet, and a light to my paths.'},
  {ref:'1 John 4:19',theme:'Love & Compassion',text:'Let us therefore love God, because God first hath loved us.'},
  {ref:'Philippians 4:6',theme:'Prayer & Gratitude',text:'Be nothing solicitous; but in every thing, by prayer and supplication, with thanksgiving, let your petitions be made known to God.'},
  {ref:'Matthew 6:34',theme:'Anxiety & Worry',text:'Be not therefore solicitous for to morrow; for the morrow will be solicitous for itself.'},
  {ref:'Luke 6:36',theme:'Forgiveness & Mercy',text:'Be ye therefore merciful, as your Father also is merciful.'},
  {ref:'Joshua 1:9',theme:'Courage',text:'Take courage, and be valiant. Fear not, nor be ye dismayed.'}
];
const themes = [...new Set(passages.map(p => p.theme))];
const defaultState = {
  bestWpm:0,bestAccuracy:0,bestCombo:0,totalPassages:0,totalChars:0,
  bloom:0,level:1,streak:0,lastPracticeDate:'',
  today:{date:'',passages:0,highAccuracy:false,bestCombo:0},
  sound:false,reduceMotion:false,practice:{},themeCounts:{},history:[]
};

let state = load();
let current = null;
let startedAt = 0;
let timer = null;
let finished = false;
let combo = 0;
let transitionTimer = null;
let audioContext = null;

function load(){
  try {
    const saved = JSON.parse(localStorage.getItem(STORE) || '{}');
    return mergeState(saved);
  } catch { return mergeState({}); }
}
function mergeState(saved){
  return {
    ...defaultState,
    ...saved,
    today:{...defaultState.today,...(saved.today || {})},
    practice:{...(saved.practice || {})},
    themeCounts:{...(saved.themeCounts || {})},
    history:Array.isArray(saved.history) ? saved.history : []
  };
}
function save(){localStorage.setItem(STORE, JSON.stringify(state));}
function todayKey(date = new Date()){
  const y = date.getFullYear(), m = String(date.getMonth()+1).padStart(2,'0'), d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function yesterdayKey(){
  const d = new Date(); d.setDate(d.getDate()-1); return todayKey(d);
}
function prepToday(){
  const d = todayKey();
  if(state.today.date !== d) state.today = {date:d,passages:0,highAccuracy:false,bestCombo:0};
}
function updateStreak(){
  const today = todayKey();
  if(state.lastPracticeDate === today) return;
  state.streak = state.lastPracticeDate === yesterdayKey() ? state.streak + 1 : 1;
  state.lastPracticeDate = today;
}

function choosePrompt({focus=false} = {}){
  prepToday();
  clearTimeout(transitionTimer);
  const wanted = $('themeSelect').value;
  let pool = wanted === 'all' ? passages : passages.filter(p => p.theme === wanted);
  if(!pool.length) pool = passages;
  const recent = current?.ref;
  let choices = pool.filter(p => p.ref !== recent);
  if(!choices.length) choices = pool;
  current = choices[Math.floor(Math.random()*choices.length)];
  finished = false;
  combo = 0;
  startedAt = 0;
  stopTimer();
  $('typingInput').value = '';
  $('typingInput').disabled = false;
  renderPrompt();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  updateVerseMeta();
  $('gameMessage').textContent = focus ? 'Next passage — settle in and begin.' : 'Take a breath, then begin.';
  $('typingInput').focus({preventScroll:true});
}
function selectPassage(p){
  clearTimeout(transitionTimer);
  current = p;
  finished = false;
  combo = 0;
  startedAt = 0;
  stopTimer();
  $('themeSelect').value = p.theme;
  $('typingInput').value = '';
  $('typingInput').disabled = false;
  updateVerseMeta(); renderPrompt();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  $('gameMessage').textContent = 'Practice this verse again — one careful line at a time.';
  $('typingInput').focus({preventScroll:true});
}
function updateVerseMeta(){
  const count = state.practice[current.ref] || 0;
  $('verseTheme').textContent = current.theme.toUpperCase();
  $('verseRef').textContent = current.ref;
  $('practiceCount').textContent = count
    ? `Practiced ${count} time${count===1?'':'s'} · ${practiceBest(current.ref)}`
    : 'First practice — make this one yours.';
}
function practiceBest(ref){
  const rows = state.history.filter(x => x.ref === ref);
  if(!rows.length) return 'building your best';
  const bestWpm = Math.max(...rows.map(x=>x.wpm||0));
  const bestAcc = Math.max(...rows.map(x=>x.accuracy||0));
  return `best ${bestWpm} WPM · ${bestAcc}% accuracy`;
}
function renderPrompt(){
  if(!current) return;
  const typed = $('typingInput').value;
  const text = current.text;
  let html = '';
  for(let i=0;i<text.length;i++){
    const c=text[i];
    let cls='';
    if(i < typed.length) cls = typed[i] === c ? 'correct' : 'wrong';
    else if(i === typed.length) cls='cursor';
    html += `<span class="${cls}">${escapeHtml(c)}</span>`;
  }
  $('verseText').innerHTML = html;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function calc(){
  const typed = $('typingInput').value;
  const text = current.text;
  let correct=0, errors=0;
  for(let i=0;i<typed.length;i++){
    if(i<text.length && typed[i]===text[i]) correct++; else errors++;
  }
  const ms = startedAt ? Math.max(1,Date.now()-startedAt) : 0;
  const wpm = ms ? Math.round((correct/5)/(ms/60000)) : 0;
  const accuracy = typed.length ? Math.round(correct/typed.length*100) : 100;
  const progress = Math.min(100, Math.round(correct/text.length*100));
  return {typed,text,correct,errors,ms,wpm,accuracy,progress};
}
function updateStats(s){
  $('liveWpm').textContent=s.wpm;
  $('accuracy').textContent=s.accuracy+'%';
  $('elapsed').textContent=time(s.seconds ?? s.ms/1000);
  $('errors').textContent=s.errors;
  $('liveCombo').textContent=s.combo;
  $('progressFill').style.width=s.progress+'%';
  $('progressLabel').textContent=s.progress+'%';
}
function time(s){s=Math.floor(s||0);return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function stopTimer(){if(timer){clearInterval(timer);timer=null;}}
function startTimer(){
  if(timer) return;
  timer=setInterval(()=>{
    if(finished || !startedAt) return;
    const s=calc();
    updateStats({...s,seconds:s.ms/1000,combo});
  },250);
}

function onInput(){
  if(finished || !current) return;
  const input=$('typingInput');
  // Never let pasted/held input run beyond the target passage.
  if(input.value.length > current.text.length) input.value=input.value.slice(0,current.text.length);
  if(!startedAt && input.value.length){startedAt=Date.now();startTimer();}

  const typed=input.value;
  const previousLength=Math.max(0,typed.length-1);
  const newChar=typed[typed.length-1];
  const expected=current.text[previousLength];
  if(newChar !== undefined){
    if(newChar === expected){
      combo++;
      if(combo===5 || combo===10 || combo===20 || combo%25===0) playTone('combo');
    } else {
      combo=0;
      playTone('error');
    }
  }
  const s=calc();
  renderPrompt();
  updateStats({...s,seconds:s.ms/1000,combo});
  if(s.errors===0) $('gameMessage').textContent = combo>=10 ? `✦ ${combo}× flow — stay with the words.` : 'Keep going — the garden is listening.';
  else {
    let mismatch=-1;
    for(let i=0;i<Math.min(s.typed.length,s.text.length);i++){
      if(s.typed[i]!==s.text[i]){mismatch=i;break;}
    }
    $('gameMessage').textContent = mismatch>=0 && s.text[mismatch]===' '
      ? 'A space was missed. Press Space again and I’ll help place it.'
      : 'A missed letter is only a breath. Correct it and continue.';
  }
  if(typed===current.text) complete(s);
}

function complete(s){
  if(finished) return;
  finished=true;
  stopTimer();
  $('typingInput').disabled=true;

  const ref=current.ref;
  state.totalPassages++;
  state.totalChars+=current.text.length;
  state.bestWpm=Math.max(state.bestWpm,s.wpm);
  state.bestAccuracy=Math.max(state.bestAccuracy,s.accuracy);
  state.bestCombo=Math.max(state.bestCombo,combo);
  state.today.passages++;
  state.today.bestCombo=Math.max(state.today.bestCombo,combo);
  if(s.accuracy>=95) state.today.highAccuracy=true;
  state.practice[ref]=(state.practice[ref]||0)+1;
  state.themeCounts[current.theme]=(state.themeCounts[current.theme]||0)+1;
  updateStreak();

  const accuracyBonus = Math.round(s.accuracy/10);
  const comboBonus = Math.min(20,Math.floor(combo/2));
  const cleanBonus = s.errors===0 ? 5 : 0;
  const bloomGain = Math.max(8,accuracyBonus+comboBonus+cleanBonus);
  const oldBloom=state.bloom;
  state.bloom += bloomGain;
  const levelUp=state.bloom>=100;
  if(levelUp){state.level++;state.bloom=state.bloom%100;gardenBloom();}

  state.history.unshift({ref,wpm:s.wpm,accuracy:s.accuracy,combo,date:new Date().toISOString()});
  state.history=state.history.slice(0,60);
  save();
  renderAll();
  gardenReact(s.accuracy>=95);

  if(s.accuracy>=98) showToast(`✦ Beautifully typed · +${bloomGain} Bloom`);
  else if(s.accuracy>=95) showToast(`Steady practice · +${bloomGain} Bloom`);
  else showToast(`Passage complete · +${bloomGain} Bloom`);
  if(levelUp) playTone('level'); else playTone('complete');

  $('gameMessage').textContent = levelUp
    ? `Garden level ${state.level}! The next passage is ready.`
    : `${ref} practiced ${state.practice[ref]}× · best ${practiceBest(ref)}. Next passage loading…`;

  transitionTimer=setTimeout(()=>{
    if(finished) choosePrompt({focus:true});
  }, state.reduceMotion ? 350 : TRANSITION_MS);
}

function gardenBloom(){
  if(state.reduceMotion)return;
  const hero=$('gardenHero');
  hero.classList.remove('full-bloom');
  void hero.offsetWidth;
  hero.classList.add('full-bloom');
}
function gardenReact(good){
  const fx=$('gardenEffects');
  if(state.reduceMotion||!good)return;
  fx.innerHTML='';
  for(let i=0;i<9;i++){
    const p=document.createElement('i');
    p.textContent=i%2?'✦':'✿';
    p.style.left=(12+Math.random()*76)+'%';
    p.style.top=(48+Math.random()*34)+'%';
    p.style.setProperty('--delay',(Math.random()*.35)+'s');
    fx.appendChild(p);
  }
  setTimeout(()=>fx.innerHTML='',1800);
}
function showToast(text){
  const t=$('toast');
  t.textContent=text;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1800);
}

function renderAll(){
  prepToday();
  $('bestWpm').textContent=state.bestWpm;
  $('todayCount').textContent=state.today.passages;
  $('level').textContent=state.level;
  $('combo').textContent=state.bestCombo;
  $('bloomPercent').textContent=state.bloom+'%';
  $('bloomBar').style.width=state.bloom+'%';
  $('bloomBig').textContent=state.bloom+'%';
  $('recordWpm').textContent=state.bestWpm;
  $('recordAccuracy').textContent=state.bestAccuracy?state.bestAccuracy+'%':'—';
  $('recordCombo').textContent=state.bestCombo;
  $('recordPassages').textContent=state.totalPassages;
  $('goalPassages').textContent=Math.min(5,state.today.passages)+' / 5';
  $('goalAccuracy').textContent=(state.today.highAccuracy?'1':'0')+' / 1';
  $('goalCombo').textContent=Math.min(10,state.today.bestCombo)+' / 10';
  $('bloomMessage').textContent=state.bloom>=80?'Almost there — let the garden bloom.':state.bloom>=50?'The garden is beginning to stir.':'Accurate typing fills the Bloom meter.';
  renderLibrary();
}
function renderLibrary(){
  const box=$('themeLibrary');box.innerHTML='';
  let practiced=0;
  themes.forEach(theme=>{
    const items=passages.filter(p=>p.theme===theme);
    const count=items.reduce((n,p)=>n+(state.practice[p.ref]||0),0);
    if(count)practiced++;
    const el=document.createElement('article');el.className='theme-card';
    el.innerHTML=`<div class="theme-head"><div><small>${escapeHtml(theme)}</small><strong>${count} practice${count===1?'':'s'}</strong></div><span>${items.length} verse${items.length===1?'':'s'}</span></div><div class="theme-verses">${items.map(p=>`<button type="button" data-ref="${escapeHtml(p.ref)}"><span>${escapeHtml(p.ref)}</span><b>${state.practice[p.ref]||0}×</b></button>`).join('')}</div>`;
    box.appendChild(el);
  });
  box.querySelectorAll('[data-ref]').forEach(b=>b.addEventListener('click',()=>{
    const p=passages.find(x=>x.ref===b.dataset.ref);if(p)selectPassage(p);
  }));
  $('librarySummary').textContent=`${practiced} theme${practiced===1?'':'s'} practiced`;
}

function playTone(kind){
  if(!state.sound) return;
  try{
    audioContext ||= new (window.AudioContext||window.webkitAudioContext)();
    const osc=audioContext.createOscillator();
    const gain=audioContext.createGain();
    const now=audioContext.currentTime;
    const freq=kind==='error'?180:kind==='level'?660:kind==='combo'?520:440;
    osc.frequency.value=freq;osc.type='sine';
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.exponentialRampToValueAtTime(0.045,now+0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001,now+(kind==='level'?0.35:0.12));
    osc.connect(gain);gain.connect(audioContext.destination);osc.start(now);osc.stop(now+(kind==='level'?0.36:0.13));
  }catch{}
}

$('typingInput').addEventListener('input',onInput);

// Keep ordinary typing behavior intact, but explicitly preserve the Space key.
// This prevents a lost focus / browser scroll interaction from making a verse
// appear impossible to finish, especially when the next expected character
// is a space. We still require the exact Scripture text before completion.
$('typingInput').addEventListener('keydown',e=>{
  if(e.key !== ' ') return;
  if(finished || !current) return;

  const el=e.currentTarget;
  const startPos=el.selectionStart ?? el.value.length;
  const endPos=el.selectionEnd ?? startPos;

  // If focus has somehow moved away from the textarea, keep Space from
  // scrolling the page and restore focus before inserting it normally.
  if(document.activeElement !== el){
    e.preventDefault();
    el.focus({preventScroll:true});
    if(el.value.length < current.text.length) el.setRangeText(' ',startPos,endPos,'end');
    onInput();
    return;
  }

  // Friendly recovery for a very common typing mistake: the player misses
  // a required space, keeps typing, then presses Space to recover. If the
  // first mismatch is a space, repair that missing space at the mismatch
  // instead of adding another space at the end.
  if(startPos === el.value.length && startPos === endPos){
    const typed=el.value;
    const target=current.text;
    let mismatch=-1;
    const limit=Math.min(typed.length,target.length);
    for(let i=0;i<limit;i++){
      if(typed[i]!==target[i]){mismatch=i;break;}
    }
    if(mismatch>=0 && target[mismatch]===' ' && typed[mismatch]!==' '){
      e.preventDefault();
      const before=typed.slice(0,mismatch);
      const after=typed.slice(mismatch+1);
      // If the omitted-space character was otherwise duplicated into the
      // correct suffix, replacing it is enough (e.g. "lamptto" -> "lamp to").
      const shiftedSuffix=target.slice(mismatch+1);
      if(after === shiftedSuffix) el.value=before+' '+after;
      else el.value=before+' '+typed.slice(mismatch);
      el.selectionStart=el.selectionEnd=el.value.length;
      onInput();
    }
  }
});
$('themeSelect').addEventListener('change',()=>choosePrompt());
$('newPromptBtn').addEventListener('click',()=>choosePrompt());
$('libraryToggle').addEventListener('click',()=>{
  const open=$('libraryPanel').hidden;
  $('libraryPanel').hidden=!open;
  $('libraryToggle').setAttribute('aria-expanded',String(open));
  $('libraryToggle').querySelector('b').textContent=open?'−':'＋';
});
$('settingsBtn').addEventListener('click',()=>{$('settingsPanel').hidden=false});
$('closeSettings').addEventListener('click',()=>{$('settingsPanel').hidden=true});
$('soundToggle').addEventListener('change',e=>{state.sound=e.target.checked;save();if(state.sound)playTone('complete');});
$('motionToggle').addEventListener('change',e=>{state.reduceMotion=e.target.checked;document.body.classList.toggle('reduce-motion',state.reduceMotion);save();});
$('exportBtn').addEventListener('click',()=>{
  const blob=new Blob([JSON.stringify({app:'Scripture Paws',version:2,exportedAt:new Date().toISOString(),state},null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='scripture-paws-progress.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),0);
});
$('clearBtn').addEventListener('click',()=>{
  if(confirm('Reset all Scripture Paws progress on this device?')){
    state=mergeState({});save();renderAll();choosePrompt();showToast('A fresh garden beginning.');
  }
});

document.addEventListener('visibilitychange',()=>{
  if(document.hidden) stopTimer();
  else if(startedAt&&!finished) startTimer();
});

prepToday();
$('soundToggle').checked=state.sound;
$('motionToggle').checked=state.reduceMotion;
document.body.classList.toggle('reduce-motion',state.reduceMotion);
renderAll();
choosePrompt();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
