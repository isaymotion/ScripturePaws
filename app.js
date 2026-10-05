(() => {
'use strict';

const $ = id => document.getElementById(id);
const STORE = 'scripture-paws-v2';
const TRANSITION_MS = 850;

const passages = [
  // Peace & Stillness
  {ref:'John 14:27',theme:'Peace & Stillness',text:'Peace I leave with you, my peace I give unto you.'},
  {ref:'John 16:33',theme:'Peace & Stillness',text:'These things I have spoken to you, that in me you may have peace. In the world you shall have distress: but have confidence, I have overcome the world.'},
  {ref:'Philippians 4:7',theme:'Peace & Stillness',text:'And the peace of God, which surpasseth all understanding, keep your hearts and minds in Christ Jesus.'},
  {ref:'Psalm 4:9',theme:'Peace & Stillness',text:'In peace in the selfsame I will sleep, and I will rest.'},

  // Comfort & Grief
  {ref:'Matthew 11:28',theme:'Comfort & Grief',text:'Come to me, all you that labour, and are burdened, and I will refresh you.'},
  {ref:'Matthew 5:4',theme:'Comfort & Grief',text:'Blessed are they that mourn: for they shall be comforted.'},
  {ref:'Psalm 33:19 (34:18)',theme:'Comfort & Grief',text:'The Lord is nigh unto them that are of a contrite heart: and he will save the humble of spirit.'},

  // Hope
  {ref:'Romans 15:13',theme:'Hope',text:'Now the God of hope fill you with all joy and peace in believing.'},
  {ref:'Isaiah 40:31',theme:'Hope',text:'But they that hope in the Lord shall renew their strength, they shall take wings as eagles, they shall run and not be weary, they shall walk and not faint.'},
  {ref:'Jeremiah 29:11',theme:'Hope',text:'For I know the thoughts that I think towards you, saith the Lord, thoughts of peace, and not of affliction, to give you an end and patience.'},
  {ref:'Psalm 129:5 (130:5)',theme:'Hope',text:'I have hoped in the Lord, my soul hath hoped in his word.'},

  // Trust & Faith
  {ref:'Proverbs 3:5',theme:'Trust & Faith',text:'Have confidence in the Lord with all thy heart, and lean not upon thy own prudence.'},
  {ref:'Romans 8:31',theme:'Trust & Faith',text:'If God be for us, who is against us?'},
  {ref:'Hebrews 13:5',theme:'Trust & Faith',text:'Let your manners be without covetousness, contented with such things as you have: for he hath said: I will not leave thee, neither will I forsake thee.'},
  {ref:'Mark 10:27',theme:'Trust & Faith',text:'With men it is impossible; but not with God: for all things are possible with God.'},

  // Strength & Perseverance
  {ref:'Philippians 4:13',theme:'Strength & Perseverance',text:'I can do all things in him who strengtheneth me.'},
  {ref:'2 Timothy 4:7',theme:'Strength & Perseverance',text:'I have fought a good fight: I have finished my course: I have kept the faith.'},
  {ref:'Galatians 6:9',theme:'Strength & Perseverance',text:'And in doing good, let us not fail: for in due time we shall reap, not failing.'},
  {ref:'2 Corinthians 12:9',theme:'Strength & Perseverance',text:'And he said to me: My grace is sufficient for thee: for power is made perfect in infirmity.'},

  // Guidance & Wisdom
  {ref:'Psalm 118:105 (119:105)',theme:'Guidance & Wisdom',text:'Thy word is a lamp to my feet, and a light to my paths.'},
  {ref:'Proverbs 16:3',theme:'Guidance & Wisdom',text:'Commit thy works to the Lord, and thy thoughts shall be directed.'},
  {ref:'Proverbs 16:9',theme:'Guidance & Wisdom',text:'The heart of man disposeth his way: but the Lord must direct his steps.'},
  {ref:'Jeremiah 33:3',theme:'Guidance & Wisdom',text:'Cry to me and I will hear thee: and I will shew thee great things, and sure things which thou knowest not.'},
  {ref:'James 1:5',theme:'Guidance & Wisdom',text:'But if any of you want wisdom, let him ask of God, who giveth to all abundantly, and upbraideth not: and it shall be given him.'},

  // Love & Compassion
  {ref:'1 John 4:19',theme:'Love & Compassion',text:'Let us therefore love God, because God first hath loved us.'},
  {ref:'1 Corinthians 13:4',theme:'Love & Compassion',text:'Charity is patient, is kind: charity envieth not, dealeth not perversely; is not puffed up.'},
  {ref:'John 15:13',theme:'Love & Compassion',text:'Greater love hath no man than this, that a man lay down his life for his friends.'},
  {ref:'Ephesians 4:32',theme:'Love & Compassion',text:'And be ye kind one to another: merciful, forgiving one another, even as God hath forgiven you in Christ.'},

  // Prayer & Gratitude
  {ref:'Philippians 4:6',theme:'Prayer & Gratitude',text:'Be nothing solicitous; but in every thing, by prayer and supplication, with thanksgiving, let your petitions be made known to God.'},
  {ref:'1 Thessalonians 5:18',theme:'Prayer & Gratitude',text:'In all things give thanks; for this is the will of God in Christ Jesus concerning all.'},
  {ref:'Luke 11:9',theme:'Prayer & Gratitude',text:'And I say to you: Ask, and it shall be given you: seek, and you shall find: knock, and it shall be opened to you.'},
  {ref:'Mark 11:24',theme:'Prayer & Gratitude',text:'Therefore I say unto you, all things, whatsoever you ask when you pray, believe that you shall receive; and they shall come unto you.'},

  // Anxiety & Worry
  {ref:'Matthew 6:34',theme:'Anxiety & Worry',text:'Be not therefore solicitous for to morrow; for the morrow will be solicitous for itself.'},
  {ref:'1 Peter 5:7',theme:'Anxiety & Worry',text:'Casting all your care upon him, for he hath care of you.'},
  {ref:'Matthew 6:33',theme:'Anxiety & Worry',text:'Seek ye therefore first the kingdom of God, and his justice, and all these things shall be added unto you.'},
  {ref:'Psalm 54:23 (55:22)',theme:'Anxiety & Worry',text:'Cast thy care upon the Lord, and he shall sustain thee: he shall not suffer the just to waver for ever.'},

  // Forgiveness & Mercy
  {ref:'Luke 6:36',theme:'Forgiveness & Mercy',text:'Be ye therefore merciful, as your Father also is merciful.'},
  {ref:'Matthew 6:14',theme:'Forgiveness & Mercy',text:'For if you will forgive men their offences, your heavenly Father will forgive you also your offences.'},
  {ref:'Micah 7:18',theme:'Forgiveness & Mercy',text:'Who is a God like to thee, who takest away iniquity, and passest by the sin of the remnant of thy inheritance? he will send his fury no more, because he delighteth in mercy.'},

  // Courage
  {ref:'Joshua 1:9',theme:'Courage',text:'Take courage, and be valiant. Fear not, nor be ye dismayed: because the Lord thy God is with thee in all things whatsoever thou shalt go to.'},
  {ref:'Isaiah 41:10',theme:'Courage',text:'Fear not, for I am with thee: turn not aside, for I am thy God: I have strengthened thee, and have helped thee, and the right hand of my just one hath upheld thee.'},
  {ref:'Isaiah 43:2',theme:'Courage',text:'When thou shalt pass through the waters, I will be with thee, and the rivers shall not cover thee: when thou shalt walk in the fire, thou shalt not be burnt, and the flames shall not burn in thee.'},

  // Protection & Refuge
  {ref:'Psalm 22:1 (23:1)',theme:'Protection & Refuge',text:'The Lord ruleth me: and I shall want nothing.'},
  {ref:'Psalm 45:2 (46:1)',theme:'Protection & Refuge',text:'Our God is our refuge and strength: a helper in troubles, which have found us exceedingly.'},
  {ref:'Psalm 90:1 (91:1)',theme:'Protection & Refuge',text:'He that dwelleth in the aid of the most High, shall abide under the protection of the God of Jacob.'},
  {ref:'Psalm 120:7 (121:7)',theme:'Protection & Refuge',text:'The Lord keepeth thee from all evil: the Lord keep thy soul.'},

  // Patience & Waiting
  {ref:'Lamentations 3:22-23',theme:'Patience & Waiting',text:'The mercies of the Lord that we are not consumed: because his commiserations have not failed. They are new every morning, great is thy faithfulness.'},
  {ref:'Romans 12:12',theme:'Patience & Waiting',text:'Rejoicing in hope. Patient in tribulation. Instant in prayer.'},
  {ref:'James 1:4',theme:'Patience & Waiting',text:'And patience hath a perfect work; that you may be perfect and entire, failing in nothing.'},

  // Humility & Service
  {ref:'Matthew 11:29',theme:'Humility & Service',text:'Take up my yoke upon you, and learn of me, because I am meek, and humble of heart: and you shall find rest to your souls.'},
  {ref:'Micah 6:8',theme:'Humility & Service',text:'I will shew thee, O man, what is good, and what the Lord requireth of thee: Verily to do judgment, and to love mercy, and to walk solicitous with thy God.'},
  {ref:'Philippians 2:3',theme:'Humility & Service',text:'Let nothing be done through contention, neither by vainglory: but in humility, let each esteem others better than themselves.'},

  // Light & Creation
  {ref:'John 8:12',theme:'Light & Creation',text:'I am the light of the world: he that followeth me, walketh not in darkness, but shall have the light of life.'},
  {ref:'Matthew 5:14',theme:'Light & Creation',text:'You are the light of the world. A city seated on a mountain cannot be hid.'},
  {ref:'Psalm 18:2 (19:1)',theme:'Light & Creation',text:'The heavens shew forth the glory of God, and the firmament declareth the work of his hands.'}
];
const themes = [...new Set(passages.map(p => p.theme))];
const prayers = [
  {
    id:'our-father', title:'The Our Father', short:'Our Father', category:'The Lord’s Prayer', source:'EWTN · Basic Catholic Prayers',
    phrases:[
      'Our Father, Who art in heaven, hallowed be Thy Name.',
      'Thy Kingdom come; Thy Will be done, on earth as it is in Heaven.',
      'Give us this day, our daily bread, and forgive us our trespasses as we forgive those who trespass against us.',
      'And lead us not into temptation, but deliver us from evil. Amen.'
    ]
  },
  {
    id:'hail-mary', title:'Hail Mary', short:'Hail Mary', category:'Marian Prayer', source:'EWTN · Basic Catholic Prayers',
    phrases:[
      'Hail Mary, full of grace; the Lord is with thee.',
      'Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.',
      'Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.'
    ]
  },
  {
    id:'glory-be', title:'Glory Be', short:'Glory Be', category:'Doxology', source:'EWTN · Basic Catholic Prayers',
    phrases:[
      'Glory be to the Father, and to the Son, and to the Holy Spirit.',
      'As it was in the beginning, is now, and ever shall be, world without end. Amen.'
    ]
  },
  {
    id:'fatima', title:'The Fátima Prayer', short:'Fátima Prayer', category:'Rosary Prayer', source:'EWTN · Prayers of the Rosary',
    phrases:[
      'O my Jesus, forgive us our sins, save us from the fires of hell.',
      'Lead all souls to heaven, especially those most in need of Thy mercy.'
    ]
  },
  {
    id:'st-michael', title:'Prayer to St. Michael the Archangel', short:'St. Michael', category:'Prayer for Protection', source:'EWTN · Basic Catholic Prayers',
    phrases:[
      'St. Michael the Archangel, defend us in battle.',
      'Be our defense against the wickedness and snares of the Devil.',
      'May God rebuke him, we humbly pray, and do thou, O Prince of the heavenly hosts,',
      'by the power of God, cast into hell Satan and all the evil spirits,',
      'who prowl about the world seeking the ruin of souls. Amen.'
    ]
  },
  {
    id:'hail-holy-queen', title:'Hail, Holy Queen', short:'Hail, Holy Queen', category:'Marian Antiphon', source:'EWTN · Salve Regina',
    phrases:[
      'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope.',
      'To thee do we cry, poor banished children of Eve.',
      'To thee do we send up our sighs, mourning and weeping in this valley of tears.',
      'Turn, then, most gracious advocate, thine eyes of mercy towards us,',
      'and after this our exile, show unto us the blessed fruit of thy womb, Jesus.',
      'O clement, O loving, O sweet Virgin Mary.'
    ]
  },
  {
    id:'apostles-creed', title:"The Apostles' Creed", short:"Apostles' Creed", category:'Profession of Faith', source:'EWTN · Prayers of the Rosary',
    phrases:[
      'I believe in God, the Father almighty, Creator of heaven and earth;',
      'and in Jesus Christ, His only Son, our Lord.',
      'He was conceived by the Holy Spirit, and born of the Virgin Mary.',
      'He suffered under Pontius Pilate, was crucified, died and was buried.',
      'He descended into hell. On the third day He rose again from the dead.',
      'He ascended into heaven, and is seated at the right hand of God the Father Almighty.',
      'He will come again to judge the living and the dead.',
      'I believe in the Holy Spirit, the holy Catholic Church, the communion of saints,',
      'the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.'
    ]
  }
];
const gardenBackgrounds = [
  {id:'morning', name:'Morning Garden', file:'./assets/garden/morning-garden.png'},
  {id:'autumn', name:'Autumn Garden', file:'./assets/garden/autumn-garden.png'},
  {id:'winter', name:'Winter Garden', file:null},
  {id:'summer', name:'Summer Garden', file:null},
  {id:'scottish', name:'Scottish Garden', file:null},
  {id:'mushroom', name:'Mushroom Garden', file:null}
];
const defaultState = {
  bestWpm:0,bestAccuracy:0,bestCombo:0,totalPassages:0,totalChars:0,
  bloom:0,level:1,streak:0,lastPracticeDate:'',
  today:{date:'',passages:0,highAccuracy:false,bestCombo:0},
  sound:false,reduceMotion:false,practice:{},themeCounts:{},history:[],
  mode:'scripture', prayerPractice:{}, prayerHistory:[], gardenIndex:0
};

let state = load();
let current = null;
let startedAt = 0;
let timer = null;
let finished = false;
let combo = 0;
let transitionTimer = null;
let audioContext = null;
let prayerCurrent = null;
let prayerPhraseIndex = 0;
const prayerDeck = [];
const decks = new Map();
const DECK_KEY = () => $('themeSelect')?.value || 'all';

function shuffle(list){
  const a=[...list];
  for(let i=a.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}
function recentRefs(limit=8){
  return state.history.slice(0,limit).map(x=>x.ref);
}
function refillDeck(key){
  const pool=key==='all'?passages:passages.filter(p=>p.theme===key);
  if(!pool.length) return [];
  const recent=new Set(recentRefs());
  const fresh=pool.filter(p=>!recent.has(p.ref));
  const warm=pool.filter(p=>recent.has(p.ref));
  // Prefer verses not seen recently, then shuffle within each group.
  return shuffle(fresh).concat(shuffle(warm));
}
function nextFromDeck(){
  const key=DECK_KEY();
  let deck=decks.get(key)||[];
  if(!deck.length) deck=refillDeck(key);
  let next=deck.shift();
  // Avoid an immediate repeat when a small theme has only one or two verses.
  if(next && current && next.ref===current.ref && deck.length){
    const alternate=deck.shift();
    deck.push(next);
    next=alternate;
  }
  decks.set(key,deck);
  return next;
}
function invalidateDeckRef(ref){
  for(const [key,deck] of decks){
    decks.set(key,deck.filter(p=>p.ref!==ref));
  }
}

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
    history:Array.isArray(saved.history) ? saved.history : [],
    prayerPractice:{...(saved.prayerPractice || {})},
    prayerHistory:Array.isArray(saved.prayerHistory) ? saved.prayerHistory : [],
    mode:saved.mode==='prayer'?'prayer':'scripture',
    gardenIndex:Number.isInteger(saved.gardenIndex) ? saved.gardenIndex : 0
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

function setGardenBackground(index, reason=''){
  const available = gardenBackgrounds.filter(x=>x.file);
  if(!available.length) return;
  const currentId = gardenBackgrounds[state.gardenIndex]?.id;
  let target = gardenBackgrounds[index % gardenBackgrounds.length];
  if(!target.file){
    const start = gardenBackgrounds.findIndex(x=>x.id===currentId);
    for(let i=1;i<=gardenBackgrounds.length;i++){
      const candidate=gardenBackgrounds[(start+i+gardenBackgrounds.length)%gardenBackgrounds.length];
      if(candidate.file){target=candidate;break;}
    }
  }
  const actualIndex=gardenBackgrounds.findIndex(x=>x.id===target.id);
  state.gardenIndex=actualIndex;
  const image=$('gardenImage');
  if(image) image.style.backgroundImage=`url('${target.file}')`;
  $('gardenMood').textContent=target.name;
  $('gardenHero').dataset.garden=target.id;
  const hero=$('gardenHero');
  hero.classList.remove('garden-changing');
  void hero.offsetWidth;
  hero.classList.add('garden-changing');
  save();
  if(reason) showToast(`✦ ${target.name} · ${reason}`);
}
function advanceGarden(reason){
  const next=(state.gardenIndex+1)%gardenBackgrounds.length;
  setGardenBackground(next,reason);
}
function resetBloomForGarden(){
  state.bloom=0;
  renderAll();
}
function refillPrayerDeck(){
  const recent=new Set(state.prayerHistory.slice(0,4).map(x=>x.id));
  const fresh=prayers.filter(p=>!recent.has(p.id));
  const warm=prayers.filter(p=>recent.has(p.id));
  prayerDeck.splice(0,prayerDeck.length,...shuffle(fresh).concat(shuffle(warm)));
}
function nextPrayer(){
  if(!prayerDeck.length) refillPrayerDeck();
  let p=prayerDeck.shift();
  if(p && prayerCurrent && p.id===prayerCurrent.id && prayerDeck.length){
    const alt=prayerDeck.shift(); prayerDeck.push(p); p=alt;
  }
  return p || prayers[0];
}
function renderModeUI(){
  const prayerMode=state.mode==='prayer';
  $('scriptureModeBtn').classList.toggle('active',!prayerMode);
  $('prayerModeBtn').classList.toggle('active',prayerMode);
  $('themePicker').hidden=prayerMode;
  $('prayerPicker').hidden=!prayerMode;
  $('gardenSideNote').hidden=prayerMode;
  $('practiceLabel').textContent=prayerMode?'PRAYER PRACTICE':'SCRIPTURE PRACTICE';
  $('verseTheme').textContent=prayerMode ? (prayerCurrent?.category || 'PRAYER') : (current?.theme || '').toUpperCase();
  $('verseRef').textContent=prayerMode ? `${prayerPhraseIndex+1} / ${prayerCurrent?.phrases.length || 1}` : (current?.ref || '');
  $('libraryJump').textContent=prayerMode?'☩ Prayer Library ›':'♧ Scripture Library ›';
  if($('prayerSource')) $('prayerSource').hidden=!prayerMode;
  $('typingInput').placeholder=prayerMode?'Type the prayer phrase here…':'Type the words here…';
}
function choosePrayer({focus=true}={}){
  clearTimeout(transitionTimer);
  state.mode='prayer';
  prayerCurrent=nextPrayer();
  prayerPhraseIndex=0;
  finished=false; combo=0; startedAt=0; stopTimer();
  $('typingInput').value='';$('typingInput').disabled=false;
  $('prayerSelect').value=prayerCurrent.id;
  renderModeUI();renderPrayerPhrase();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  $('practiceCount').textContent=`${prayerCurrent.short} · ${state.prayerPractice[prayerCurrent.id]||0} completed`;
  if($('prayerSource')) $('prayerSource').textContent=prayerCurrent.source;
  $('gameMessage').textContent=`Phrase 1 of ${prayerCurrent.phrases.length} — stay with the prayer.`;
  save();
  if(focus) $('typingInput').focus({preventScroll:true});
}
function selectPrayer(id){
  const p=prayers.find(x=>x.id===id); if(!p)return;
  prayerDeck.splice(0,prayerDeck.length,...prayerDeck.filter(x=>x.id!==id));
  prayerCurrent=p; prayerPhraseIndex=0; state.mode='prayer'; finished=false; combo=0; startedAt=0; stopTimer();
  $('prayerSelect').value=id;$('typingInput').value='';$('typingInput').disabled=false;
  renderModeUI();renderPrayerPhrase();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  $('practiceCount').textContent=`${p.short} · ${state.prayerPractice[p.id]||0} completed`;
  $('gameMessage').textContent=`Phrase 1 of ${p.phrases.length} — stay with the prayer.`;
  save();$('typingInput').focus({preventScroll:true});
}
function renderPrayerPhrase(){
  if(!prayerCurrent)return;
  const text=prayerCurrent.phrases[prayerPhraseIndex];
  const typed=$('typingInput').value; let html='';
  for(let i=0;i<text.length;i++){
    const c=text[i]; let cls='';
    if(i<typed.length) cls=typed[i]===c?'correct':'wrong'; else if(i===typed.length) cls='cursor';
    html+=`<span class="${cls}">${escapeHtml(c)}</span>`;
  }
  $('verseText').innerHTML=html;
  $('verseRef').textContent=`${prayerPhraseIndex+1} / ${prayerCurrent.phrases.length}`;
  $('practiceCount').textContent=`${prayerCurrent.short} · ${state.prayerPractice[prayerCurrent.id]||0} completed`;
  if($('prayerSource')) $('prayerSource').textContent=prayerCurrent.source;
}
function enterScriptureMode(){
  state.mode='scripture'; prayerCurrent=null; prayerPhraseIndex=0; save(); renderModeUI(); choosePrompt();
}

function choosePrompt({focus=false} = {}){
  prepToday();
  state.mode='scripture';
  prayerCurrent=null;
  clearTimeout(transitionTimer);
  current = nextFromDeck() || passages[Math.floor(Math.random()*passages.length)];
  invalidateDeckRef(current.ref);
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
  invalidateDeckRef(p.ref);
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

function onPrayerInput(){
  if(finished || !prayerCurrent)return;
  const input=$('typingInput');
  const target=prayerCurrent.phrases[prayerPhraseIndex];
  if(input.value.length>target.length) input.value=input.value.slice(0,target.length);
  if(!startedAt && input.value.length){startedAt=Date.now();startTimer();}
  const typed=input.value;
  const previousLength=Math.max(0,typed.length-1);
  const newChar=typed[typed.length-1];
  const expected=target[previousLength];
  if(newChar!==undefined){
    if(newChar===expected){combo++;if(combo===5||combo===10||combo%15===0)playTone('combo');}
    else{combo=0;playTone('error');}
  }
  let correct=0,errors=0;
  for(let i=0;i<typed.length;i++){if(i<target.length&&typed[i]===target[i])correct++;else errors++;}
  const ms=startedAt?Math.max(1,Date.now()-startedAt):0;
  const wpm=ms?Math.round((correct/5)/(ms/60000)):0;
  const accuracy=typed.length?Math.round(correct/typed.length*100):100;
  const progress=Math.min(100,Math.round(correct/target.length*100));
  renderPrayerPhrase();updateStats({wpm,accuracy,seconds:ms/1000,errors,combo,progress});
  $('gameMessage').textContent=errors===0?`Phrase ${prayerPhraseIndex+1} of ${prayerCurrent.phrases.length} — stay with the prayer.`:'A missed word is only a breath. Correct it and continue.';
  if(typed===target)completePrayer({wpm,accuracy,errors,ms});
}
function completePrayer(s){
  if(finished)return;
  finished=true;stopTimer();$('typingInput').disabled=true;
  const id=prayerCurrent.id;
  state.prayerPractice[id]=(state.prayerPractice[id]||0)+1;
  state.prayerHistory.unshift({id,wpm:s.wpm,accuracy:s.accuracy,date:new Date().toISOString()});
  state.prayerHistory=state.prayerHistory.slice(0,40);
  state.totalChars+=prayerCurrent.phrases[prayerPhraseIndex].length;
  state.bestWpm=Math.max(state.bestWpm,s.wpm);state.bestAccuracy=Math.max(state.bestAccuracy,s.accuracy);state.bestCombo=Math.max(state.bestCombo,combo);
  state.today.bestCombo=Math.max(state.today.bestCombo,combo);
  save();renderAll();gardenReact(s.accuracy>=95);playTone('complete');
  if(prayerPhraseIndex<prayerCurrent.phrases.length-1){
    $('gameMessage').textContent=`Phrase complete · ${prayerPhraseIndex+1} of ${prayerCurrent.phrases.length}.`;
    transitionTimer=setTimeout(()=>{
      prayerPhraseIndex++;finished=false;combo=0;startedAt=0;$('typingInput').disabled=false;$('typingInput').value='';stopTimer();renderPrayerPhrase();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});$('gameMessage').textContent=`Phrase ${prayerPhraseIndex+1} of ${prayerCurrent.phrases.length} — continue in order.`;$('typingInput').focus({preventScroll:true});
    },state.reduceMotion?250:450);
  }else{
    advanceGarden('Prayer completed');
    showToast(`✦ ${prayerCurrent.title} completed · ${gardenBackgrounds[state.gardenIndex].name}`);
    $('gameMessage').textContent='Prayer complete. The garden changes with you.';
    transitionTimer=setTimeout(()=>choosePrayer({focus:true}),state.reduceMotion?300:850);
  }
}
function onInput(){
  if(state.mode==='prayer') return onPrayerInput();
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
  if(levelUp){
    state.level++;
    state.bloom=state.bloom%100;
    gardenBloom();
    advanceGarden('Bloom 100%');
  }

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
  renderModeUI();
  setGardenBackground(state.gardenIndex);
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
  if(state.mode==='prayer') return;
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
$('scriptureModeBtn').addEventListener('click',()=>enterScriptureMode());
$('prayerModeBtn').addEventListener('click',()=>choosePrayer({focus:true}));
$('prayerSelect').addEventListener('change',e=>selectPrayer(e.target.value));
$('themeSelect').addEventListener('change',()=>{ decks.delete(DECK_KEY()); choosePrompt(); });
$('newPromptBtn').addEventListener('click',()=>choosePrompt());
$('libraryJump').addEventListener('click',()=>{
  if(state.mode==='prayer'){ $('prayerSelect').focus(); showToast('Choose a prayer to practice in order.'); return; }
  const panel=$('libraryPanel');
  panel.hidden=false;
  $('libraryToggle').setAttribute('aria-expanded','true');
  $('libraryToggle').querySelector('b').textContent='−';
  $('scriptureLibrary').scrollIntoView({behavior: state.reduceMotion ? 'auto' : 'smooth', block:'start'});
});
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
if(state.mode==='prayer') choosePrayer(); else choosePrompt();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
