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
  },
  {
    id:'angelus', title:'The Angelus', short:'Angelus', category:'Marian Devotion', source:'EWTN · The Angelus',
    phrases:[
      'The Angel of the Lord declared to Mary:',
      'And she conceived of the Holy Spirit.',
      'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      'Behold the handmaid of the Lord: Be it done unto me according to Thy word.',
      'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      'And the Word was made Flesh: And dwelt among us.',
      'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      'Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ.',
      'Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the incarnation of Christ, Thy Son, was made known by the message of an angel, may by His Passion and Cross be brought to the glory of His Resurrection, through the same Christ Our Lord. Amen.'
    ]
  },
  {
    id:'memorare-mary', title:'The Memorare to the Blessed Virgin Mary', short:'Memorare to Mary', category:'Marian Prayer', source:'EWTN · The Memorare',
    phrases:[
      'Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided.',
      'Inspired by this confidence, I fly unto thee, O Virgin of virgins, my mother; to thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me.',
      'Amen.'
    ]
  },
  {
    id:'memorare-joseph', title:'The Memorare to St. Joseph', short:'Memorare to St. Joseph', category:'St. Joseph Prayer', source:'EWTN · Memorare to St. Joseph',
    phrases:[
      'Remember, O most chaste spouse of the Virgin Mary, that never was it known that anyone who implored your help and sought your intercession were left unassisted.',
      'Full of confidence in your power I fly unto you and beg your protection.',
      'Despise not O Guardian of the Redeemer my humble supplication, but in your bounty, hear and answer me. Amen.'
    ]
  },
  {
    id:'morning-offering', title:'The Morning Offering', short:'Morning Offering', category:'Morning Prayer', source:'EWTN · The Morning Offering',
    phrases:[
      'O Jesus, through the Immaculate Heart of Mary,',
      'I offer You my prayers, works, joys and sufferings of this day for all the intentions of Your Sacred Heart,',
      'in union with the Holy Sacrifice of the Mass throughout the world,',
      'in reparation for my sins,',
      'for the intentions of all my relatives and friends,',
      'and in particular for the intentions of the Holy Father.',
      'Amen.'
    ]
  }
];

const rosaryMysteries = {
  joyful:{name:'Joyful Mysteries', days:'Monday & Saturday', mysteries:[
    {title:'The Annunciation',scripture:'Luke 1:26-38',prompt:'Contemplate Mary receiving God’s call and freely answering with faith.'},
    {title:'The Visitation',scripture:'Luke 1:39-56',prompt:'Contemplate Mary going in haste to serve Elizabeth and the joy of Christ’s presence.'},
    {title:'The Nativity of the Lord',scripture:'Luke 2:1-20',prompt:'Contemplate the humility of Christ’s birth and welcome Him with a quiet heart.'},
    {title:'The Presentation at the Temple',scripture:'Luke 2:22-39',prompt:'Contemplate Mary and Joseph presenting Jesus to the Father and Simeon recognizing the Savior.'},
    {title:'The Finding of Jesus in the Temple',scripture:'Luke 2:41-52',prompt:'Contemplate Mary and Joseph seeking Jesus and His devotion to His Father’s work.'}
  ]},
  sorrowful:{name:'Sorrowful Mysteries', days:'Tuesday & Friday', mysteries:[
    {title:'The Agony in the Garden',scripture:'Matthew 26:36-39',prompt:'Contemplate Jesus in Gethsemane, remaining faithful to the Father’s will in anguish.'},
    {title:'The Scourging at the Pillar',scripture:'Matthew 27:26',prompt:'Contemplate Christ’s suffering and His silent endurance of unjust violence.'},
    {title:'The Crowning with Thorns',scripture:'Matthew 27:27-29',prompt:'Contemplate Christ mocked as King and remain with His humility amid humiliation.'},
    {title:'The Carrying of the Cross',scripture:'Mark 15:21-22',prompt:'Contemplate Jesus carrying the Cross toward Calvary and the cost of faithful love.'},
    {title:'The Crucifixion',scripture:'Luke 23:33-46',prompt:'Contemplate Christ giving Himself on the Cross and entrust your needs to His mercy.'}
  ]},
  glorious:{name:'Glorious Mysteries', days:'Wednesday & Sunday', mysteries:[
    {title:'The Resurrection',scripture:'Luke 24:1-5',prompt:'Contemplate Christ risen from the dead and let His victory renew your hope.'},
    {title:'The Ascension',scripture:'Mark 16:19',prompt:'Contemplate Christ entering into glory and the call to live with heaven before you.'},
    {title:'The Descent of the Holy Spirit',scripture:'Acts 2:1-4',prompt:'Contemplate the Holy Spirit coming upon the Apostles and ask for courage and light.'},
    {title:'The Assumption of the Blessed Virgin Mary',scripture:'Luke 1:48-49',prompt:'Contemplate Mary glorified with Christ and the hope of the destiny promised to His faithful.'},
    {title:'The Coronation of the Blessed Virgin Mary',scripture:'Revelation 12:1',prompt:'Contemplate Mary crowned in glory and turn your heart toward Christ with her.'}
  ]},
  luminous:{name:'Luminous Mysteries', days:'Thursday', mysteries:[
    {title:'The Baptism in the Jordan',scripture:'Matthew 3:16-17',prompt:'Contemplate Christ revealed as the beloved Son and ask to follow Him faithfully.'},
    {title:'The Wedding Feast of Cana',scripture:'John 2:1-5',prompt:'Contemplate Mary’s trustful words: listen to Christ and do what He tells you.'},
    {title:'The Proclamation of the Kingdom of God',scripture:'Mark 1:15',prompt:'Contemplate Christ calling us to conversion and to receive the Gospel with humble trust.'},
    {title:'The Transfiguration',scripture:'Matthew 17:1-2',prompt:'Contemplate Christ’s radiant glory and listen for the Father’s call to listen to Him.'},
    {title:'The Institution of the Eucharist',scripture:'Matthew 26:26',prompt:'Contemplate Christ giving Himself as food and remain quietly with His self-giving love.'}
  ]}
};
const rosaryWeekday = ['glorious','joyful','sorrowful','glorious','luminous','sorrowful','joyful'];
function dateOnly(date){ return new Date(date.getFullYear(),date.getMonth(),date.getDate()); }
function addDays(date,n){ const d=dateOnly(date); d.setDate(d.getDate()+n); return d; }
function easterSunday(year){
  const a=year%19, b=Math.floor(year/100), c=year%100, d=Math.floor(b/4), e=b%4;
  const f=Math.floor((b+8)/25), g=Math.floor((b-f+1)/3);
  const h=(19*a+b-d-g+15)%30, i=Math.floor(c/4), k=c%4;
  const l=(32+2*e+2*i-h-k)%7, m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31), day=((h+l-7*m+114)%31)+1;
  return new Date(year,month-1,day);
}
function firstAdventSunday(year){
  const christmas=new Date(year,11,25);
  const daysBack=christmas.getDay()===0 ? 28 : christmas.getDay()+21;
  return addDays(christmas,-daysBack);
}
function baptismOfTheLord(year){
  const jan6=new Date(year,0,6);
  const daysToSunday=(7-jan6.getDay())%7;
  return addDays(jan6,daysToSunday || 7);
}
function rosaryLiturgicalSeason(date=new Date()){
  const d=dateOnly(date), year=d.getFullYear();
  const easter=easterSunday(year);
  const ashWednesday=addDays(easter,-46);
  const holySaturday=addDays(easter,-1);
  const adventStart=firstAdventSunday(year);
  const christmasEnd=baptismOfTheLord(year);
  if(d>=ashWednesday && d<=holySaturday) return 'Lent';
  if(d>=adventStart && d<new Date(year,11,25)) return 'Advent';
  if(d>=new Date(year,11,25) || d<=christmasEnd) return 'Christmas';
  return 'Ordinary Time';
}

// Feast overrides are deliberately conservative. They cover days for which
// EWTN explicitly gives a Rosary/liturgical adaptation or the feast directly
// celebrates one of the Rosary's mysteries. This avoids pretending to encode
// every local-calendar transfer or every saint's feast.
function rosaryFeastOverride(date=new Date()){
  const d=dateOnly(date), y=d.getFullYear();
  const fixed=(month,day)=>d.getMonth()===month-1 && d.getDate()===day;
  const easter=easterSunday(y);
  const easterDay=d.getTime()===easter.getTime();
  const pentecost=addDays(easter,49);
  const pentecostDay=d.getTime()===pentecost.getTime();
  if(fixed(12,25)) return {key:'joyful',reason:'Solemnity of the Nativity of the Lord',feast:true};
  if(fixed(1,6)) return {key:'joyful',reason:'Solemnity of the Epiphany of the Lord',feast:true};
  if(fixed(3,25)) return {key:'joyful',reason:'Solemnity of the Annunciation',feast:true};
  if(fixed(8,15)) return {key:'glorious',reason:'Solemnity of the Assumption of the Blessed Virgin Mary',feast:true};
  if(easterDay) return {key:'glorious',reason:'Easter Sunday — Resurrection of the Lord',feast:true};
  if(pentecostDay) return {key:'glorious',reason:'Solemnity of Pentecost',feast:true};
  return null;
}
function rosaryMysterySelection(date=new Date()){
  const feast=rosaryFeastOverride(date);
  const weekdaySet=rosaryWeekday[date.getDay()];
  const season=rosaryLiturgicalSeason(date);
  if(feast) return {...feast,season};
  if(date.getDay()===0 && season==='Advent') return {key:'joyful',season,reason:'Sunday of Advent',feast:false};
  if(date.getDay()===0 && season==='Christmas') return {key:'joyful',season,reason:'Sunday of Christmas',feast:false};
  if(date.getDay()===0 && season==='Lent') return {key:'sorrowful',season,reason:'Sunday of Lent',feast:false};
  return {key:weekdaySet,season,reason:'',feast:false};
}
function rosaryMysterySet(date=new Date()){
  const selection=rosaryMysterySelection(date);
  return {...rosaryMysteries[selection.key], key:selection.key, season:selection.season, selectionReason:selection.reason, feastOverride:!!selection.feast};
}
function prayerText(id){
  const p=prayers.find(x=>x.id===id); return p ? p.phrases.join(' ') : '';
}
function buildRosary(date=new Date()){
  const set=rosaryMysterySet(date);
  const steps=[];
  const add=(kind,label,id,text,extra={})=>steps.push({kind,label,id,text,...extra});
  add('prayer','Sign of the Cross','sign-of-cross','In the name of the Father, and of the Son, and of the Holy Spirit. Amen.');
  add('prayer',"The Apostles' Creed",'apostles-creed',prayerText('apostles-creed'));
  add('prayer','The Our Father','our-father',prayerText('our-father'));
  for(let i=1;i<=3;i++) add('prayer',`Hail Mary ${i} of 3`,'hail-mary',prayerText('hail-mary'),{opening:true});
  add('prayer','The Glory Be','glory-be',prayerText('glory-be'));
  set.mysteries.forEach((m,mi)=>{
    add('mystery',`Mystery ${mi+1} of 5 · ${m.title}`,'mystery','',{mysteryIndex:mi,mysteryTitle:m.title,scripture:m.scripture,prompt:m.prompt});
    add('prayer',`Decade ${mi+1} · Our Father`,'our-father',prayerText('our-father'),{decade:mi});
    for(let h=1;h<=10;h++) add('prayer',`Decade ${mi+1} · Hail Mary ${h} of 10`,'hail-mary',prayerText('hail-mary'),{decade:mi,hailMary:h});
    add('prayer',`Decade ${mi+1} · Glory Be`,'glory-be',prayerText('glory-be'),{decade:mi});
    add('prayer',`Decade ${mi+1} · Fátima Prayer`,'fatima',prayerText('fatima'),{decade:mi,optional:true});
  });
  add('prayer','Hail, Holy Queen','hail-holy-queen',prayerText('hail-holy-queen'));
  add('prayer','Sign of the Cross','sign-of-cross','In the name of the Father, and of the Son, and of the Holy Spirit. Amen.');
  return {set,steps};
}
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
  today:{date:'',passages:0,prayers:0,highAccuracy:false,bestCombo:0},
  sound:false,reduceMotion:false,practice:{},themeCounts:{},history:[],
  mode:'scripture', structuredPlayStyle:'typing', prayerPractice:{}, prayerHistory:[], totalPrayers:0, structuredPractice:{rosary:0}, structuredHistory:[], totalStructuredPrayers:0, gardenIndex:0
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
let prayerStartedAt = 0;
let prayerSessionCorrect = 0;
let prayerSessionTyped = 0;
let prayerSessionErrors = 0;
let structuredCurrent = null;
let structuredStepIndex = 0;
let structuredStartedAt = 0;
let structuredSessionCorrect = 0;
let structuredSessionTyped = 0;
let structuredSessionErrors = 0;
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
    today:{...defaultState.today,...(saved.today || {}),prayers:Number(saved.today?.prayers)||0},
    practice:{...(saved.practice || {})},
    themeCounts:{...(saved.themeCounts || {})},
    history:Array.isArray(saved.history) ? saved.history : [],
    prayerPractice:{...(saved.prayerPractice || {})},
    prayerHistory:Array.isArray(saved.prayerHistory) ? saved.prayerHistory : [],
    structuredPractice:{...defaultState.structuredPractice,...(saved.structuredPractice||{})},
    structuredPlayStyle:['typing','meditation'].includes(saved.structuredPlayStyle)?saved.structuredPlayStyle:'typing',
    structuredHistory:Array.isArray(saved.structuredHistory) ? saved.structuredHistory : [],
    mode:['prayer','structured'].includes(saved.mode)?saved.mode:'scripture',
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
  const structuredMode=state.mode==='structured';
  $('scriptureModeBtn').classList.toggle('active',!prayerMode&&!structuredMode);
  $('prayerModeBtn').classList.toggle('active',prayerMode);
  $('structuredModeBtn').classList.toggle('active',structuredMode);
  $('scriptureModeBtn').setAttribute('aria-selected',String(!prayerMode&&!structuredMode));
  $('prayerModeBtn').setAttribute('aria-selected',String(prayerMode));
  $('structuredModeBtn').setAttribute('aria-selected',String(structuredMode));
  $('themePicker').hidden=prayerMode||structuredMode;
  $('prayerPicker').hidden=!prayerMode;
  $('structuredPicker').hidden=!structuredMode;
  if($('structuredStylePicker')) $('structuredStylePicker').hidden=!structuredMode;
  if($('structuredTypingBtn')){ $('structuredTypingBtn').classList.toggle('active',state.structuredPlayStyle==='typing'); $('structuredTypingBtn').setAttribute('aria-pressed',String(state.structuredPlayStyle==='typing')); }
  if($('structuredMeditationBtn')){ $('structuredMeditationBtn').classList.toggle('active',state.structuredPlayStyle==='meditation'); $('structuredMeditationBtn').setAttribute('aria-pressed',String(state.structuredPlayStyle==='meditation')); }
  $('gardenSideNote').hidden=prayerMode||structuredMode;
  $('practiceLabel').textContent=structuredMode?'STRUCTURED PRAYER':prayerMode?'PRAYER PRACTICE':'SCRIPTURE PRACTICE';
  if(structuredMode && structuredCurrent){
    const step=structuredCurrent.steps[structuredStepIndex];
    $('verseTheme').textContent=structuredCurrent.set.name.toUpperCase();
    $('verseRef').textContent=`STEP ${structuredStepIndex+1} / ${structuredCurrent.steps.length}`;
    $('practiceCount').textContent=`Today · ${structuredCurrent.set.name}`;
    const set=structuredCurrent.set;
    $('structuredMeta').textContent=`${set.days} · ${set.season}${set.selectionReason ? ` · ${set.selectionReason}` : ''} · ${set.feastOverride ? 'Feast override · ' : ''}Mysteries selected for today`;
    $('newPromptBtn').textContent='↻ Restart Rosary';
    $('typingInput').placeholder=step?.kind==='mystery'?'Meditate quietly on this mystery…':'Type the prayer here…';
    $('typingLabel').textContent=step?.kind==='mystery'?'Mystery meditation':'Type the prayer';
    if($('typingInput')) $('typingInput').hidden=state.structuredPlayStyle==='meditation';
    if($('gardenLiveStats')) $('gardenLiveStats').hidden=state.structuredPlayStyle==='meditation';
    if($('meditationAction')) $('meditationAction').hidden=state.structuredPlayStyle!=='meditation';
    if($('typingLabel')) $('typingLabel').hidden=state.structuredPlayStyle==='meditation';
  }else{
    $('verseTheme').textContent=prayerMode ? (prayerCurrent?.category || 'PRAYER') : (current?.theme || '').toUpperCase();
    $('verseRef').textContent=prayerMode ? `${prayerPhraseIndex+1} / ${prayerCurrent?.phrases.length || 1}` : (current?.ref || '');
    $('newPromptBtn').textContent=prayerMode?'↻ Next prayer':'↻ New passage';
    $('typingInput').placeholder=prayerMode?'Type the prayer phrase here…':'Type the words here…';
    $('typingLabel').textContent=prayerMode?'Type the prayer phrase':'Type the Scripture passage';
  }
  $('libraryJump').textContent=structuredMode?'☩ Rosary Library ›':prayerMode?'☩ Prayer Library ›':'♧ Scripture Library ›';
  if($('prayerSource')) $('prayerSource').hidden=!(prayerMode||structuredMode);
  if($('structuredMeta')) $('structuredMeta').hidden=!structuredMode;
}
function setStructuredPlayStyle(style,{restart=true}={}){
  if(!['typing','meditation'].includes(style))return;
  state.structuredPlayStyle=style;
  if(restart){chooseStructured({focus:style==='typing'});return;}
  renderModeUI();renderStructuredStep();save();
}
function chooseStructured({focus=true}={}){
  clearTimeout(transitionTimer);
  state.mode='structured';
  structuredCurrent=buildRosary(new Date());
  structuredStepIndex=0;
  structuredStartedAt=0; structuredSessionCorrect=0; structuredSessionTyped=0; structuredSessionErrors=0;
  finished=false; combo=0; startedAt=0; stopTimer();
  $('typingInput').value='';$('typingInput').disabled=false;
  renderModeUI();renderStructuredStep();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  const set=structuredCurrent.set;
  $('prayerSource').textContent=`EWTN · Rosary Prayers · Vatican · Rosarium Virginis Mariae · ${set.name}`;
  const seasonalNote=set.selectionReason ? ` · ${set.selectionReason}` : '';
  $('structuredMeta').textContent=`${set.days} · ${set.season}${seasonalNote} · ${set.feastOverride ? 'Feast override · ' : ''}Mysteries selected for today`;
  $('gameMessage').textContent=`${set.name}${set.selectionReason ? ` · ${set.selectionReason}` : ''} · begin with the Sign of the Cross.`;
  save();
  if(focus) $('typingInput').focus({preventScroll:true});
}
function renderRosaryProgress(){
  const box=$('rosaryProgress');
  const decades=$('rosaryDecades');
  if(!box||!decades||state.mode!=='structured'||!structuredCurrent){ if(box)box.hidden=true; return; }
  box.hidden=false;
  const step=structuredCurrent.steps[structuredStepIndex];
  const currentDecade=Number.isInteger(step?.decade)?step.decade:-1;
  const completed=Array(5).fill(0);
  for(let i=0;i<structuredStepIndex;i++){
    const prior=structuredCurrent.steps[i];
    if(Number.isInteger(prior.decade) && Number.isInteger(prior.hailMary)) completed[prior.decade]=Math.max(completed[prior.decade],prior.hailMary);
  }
  const label=currentDecade<0 ? (step?.kind==='mystery' ? `Mystery ${step.mysteryIndex+1} of 5` : 'Opening prayers') : `Decade ${currentDecade+1} of 5`;
  const detail=currentDecade<0 ? (completed.every(n=>n===10) ? '5 of 5 decades' : 'Prepare for the decades') : `${completed[currentDecade]} of 10 Hail Marys`;
  $('rosaryProgressLabel').textContent=label;
  $('rosaryProgressDetail').textContent=detail;
  decades.innerHTML=structuredCurrent.set.mysteries.map((m,mi)=>{
    const isCurrent=mi===currentDecade || (step?.kind==='mystery'&&step.mysteryIndex===mi);
    const count=completed[mi];
    const beads=Array.from({length:10},(_,n)=>{
      const filled=n<count;
      const currentDot=isCurrent && n===count && count<10;
      const actionable=currentDot && state.structuredPlayStyle==='meditation' && step?.kind==='prayer';
      return actionable
        ? `<button class="rosary-bead current actionable" type="button" data-rosary-advance="true" aria-label="Pray this step aloud, then continue"></button>`
        : `<i class="rosary-bead${filled?' filled':''}${currentDot?' current':''}" aria-hidden="true"></i>`;
    }).join('');
    return `<div class="rosary-decade${isCurrent?' current':''}${count===10?' complete':''}"><span class="rosary-decade-name">${mi+1}</span><span class="rosary-beads">${beads}</span><span class="rosary-decade-count">${count}/10</span></div>`;
  }).join('');
  decades.querySelectorAll('[data-rosary-advance]').forEach(b=>b.addEventListener('click',completeStructuredMeditationStep));
}
function renderStructuredStep(){
  if(!structuredCurrent)return;
  renderRosaryProgress();
  const step=structuredCurrent.steps[structuredStepIndex];
  if(step.kind==='mystery'){
    $('verseText').innerHTML=`<div class="structured-mystery-card">
      <span class="structured-mystery-kicker">MYSTERY ${step.mysteryIndex+1} OF 5</span>
      <span class="structured-mystery-title">${escapeHtml(step.mysteryTitle)}</span>
      <span class="structured-mystery-scripture">${step.scripture ? 'Scripture · '+escapeHtml(step.scripture) : ''}</span>
      <span class="structured-mystery-prompt">${escapeHtml(step.prompt || 'Take a quiet moment to contemplate this mystery.')}</span>
      <span class="structured-mystery-note">Pause. Let the mystery settle before beginning the decade.</span>
    </div>`;
    $('typingInput').value='';
    $('typingInput').disabled=true;
    $('mysteryContinueBtn').hidden=false;
    $('meditationAction').hidden=true;
    $('progressFill').style.width='0%';$('progressLabel').textContent='0%';
    $('practiceCount').textContent=`Mystery ${step.mysteryIndex+1} of 5 · ${structuredCurrent.set.name}`;
    $('gameMessage').textContent=`${step.mysteryTitle} · meditate, then continue.`;
    if($('prayerSource')) $('prayerSource').textContent='EWTN · Rosary Prayers · Vatican · Rosarium Virginis Mariae';
    return;
  }
  $('mysteryContinueBtn').hidden=true;
  if(state.structuredPlayStyle==='meditation'){
    $('typingInput').value='';
    $('typingInput').disabled=true;
    $('verseText').innerHTML=`<div class="meditation-prayer-card"><span class="meditation-prayer-kicker">PRAY ALOUD</span><strong>${escapeHtml(step.label)}</strong><p>${escapeHtml(step.text)}</p><small>When you finish praying this aloud, press the rosary bead to continue.</small></div>`;
    $('meditationAction').hidden=false;
    $('meditationActionLabel').textContent=step.label;
    $('progressFill').style.width='100%';$('progressLabel').textContent='PRAY';
    $('practiceCount').textContent=step.label;
    $('gameMessage').textContent=`Pray aloud · ${step.label} · press the bead when you are ready.`;
    if($('prayerSource')) $('prayerSource').textContent='EWTN · Rosary Prayers · Vatican · Rosarium Virginis Mariae';
    return;
  }
  $('meditationAction').hidden=true;
  $('verseText').innerHTML='';
  const text=step.text, typed=$('typingInput').value;
  let html='';
  for(let i=0;i<text.length;i++){const c=text[i];let cls='';if(i<typed.length)cls=typed[i]===c?'correct':'wrong';else if(i===typed.length)cls='cursor';html+=`<span class="${cls}">${escapeHtml(c)}</span>`;}
  $('verseText').innerHTML=html;
  $('verseRef').textContent=`STEP ${structuredStepIndex+1} / ${structuredCurrent.steps.length}`;
  $('practiceCount').textContent=step.label;
  $('gameMessage').textContent=`${step.label} · stay with the prayer.`;
  if($('prayerSource')) $('prayerSource').textContent='EWTN · Rosary Prayers · Vatican · Rosarium Virginis Mariae';
}
function enterStructuredFromCurrent(){chooseStructured({focus:true});}
function choosePrayer({focus=true}={}){
  clearTimeout(transitionTimer);
  state.mode='prayer';
  prayerCurrent=nextPrayer();
  prayerPhraseIndex=0;
  prayerStartedAt=0; prayerSessionCorrect=0; prayerSessionTyped=0; prayerSessionErrors=0;
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
  prayerCurrent=p; prayerPhraseIndex=0; prayerStartedAt=0; prayerSessionCorrect=0; prayerSessionTyped=0; prayerSessionErrors=0; state.mode='prayer'; finished=false; combo=0; startedAt=0; stopTimer();
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
  state.mode='scripture'; prayerCurrent=null; structuredCurrent=null; prayerPhraseIndex=0; save(); renderModeUI(); choosePrompt();
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

function onStructuredInput(){
  if(finished || !structuredCurrent)return;
  const step=structuredCurrent.steps[structuredStepIndex];
  if(step.kind==='mystery')return;
  const input=$('typingInput');
  if(input.value.length>step.text.length) input.value=input.value.slice(0,step.text.length);
  if(!startedAt && input.value.length){startedAt=Date.now(); if(!structuredStartedAt)structuredStartedAt=Date.now(); startTimer();}
  const typed=input.value;
  let correct=0,errors=0;
  for(let i=0;i<typed.length;i++){if(i<step.text.length&&typed[i]===step.text[i])correct++;else errors++;}
  const ms=startedAt?Math.max(1,Date.now()-startedAt):0;
  const wpm=ms?Math.round((correct/5)/(ms/60000)):0;
  const accuracy=typed.length?Math.round(correct/typed.length*100):100;
  const progress=Math.min(100,Math.round(correct/step.text.length*100));
  renderStructuredStep();updateStats({wpm,accuracy,seconds:ms/1000,errors,combo,progress});
  if(errors===0)$('gameMessage').textContent=`${step.label} · stay with the prayer.`;
  else $('gameMessage').textContent='A missed word is only a breath. Correct it and continue.';
  if(typed===step.text)completeStructuredStep({wpm,accuracy,errors,ms,correct,typed});
}
function continueStructuredMystery(){
  if(!structuredCurrent)return;
  if(structuredCurrent.steps[structuredStepIndex]?.kind!=='mystery')return;
  structuredStepIndex++;finished=false;startedAt=0;combo=0;$('typingInput').disabled=false;$('typingInput').value='';
  renderModeUI();renderStructuredStep();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  $('typingInput').focus({preventScroll:true});
}
function completeStructuredMeditationStep(){
  if(finished || !structuredCurrent)return;
  const step=structuredCurrent.steps[structuredStepIndex];
  if(!step || step.kind!=='prayer' || state.structuredPlayStyle!=='meditation')return;
  completeStructuredStep({wpm:0,accuracy:100,errors:0,ms:0,correct:0,typed:''});
}
function completeStructuredStep(s){
  if(finished)return;
  finished=true;stopTimer();$('typingInput').disabled=true;
  structuredSessionCorrect+=s.correct;structuredSessionTyped+=s.typed.length;structuredSessionErrors+=s.errors;
  state.totalChars+=s.typed.length;save();renderAll();gardenReact(s.accuracy>=95);playTone('complete');
  advanceGarden('Rosary step');
  if(structuredStepIndex<structuredCurrent.steps.length-1){
    structuredStepIndex++;
    const next=structuredCurrent.steps[structuredStepIndex];
    transitionTimer=setTimeout(()=>{
      finished=false;startedAt=0;combo=0;$('typingInput').value='';$('typingInput').disabled=false;renderModeUI();renderStructuredStep();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
      if(state.structuredPlayStyle==='typing') $('typingInput').focus({preventScroll:true});
    },state.reduceMotion?180:550);
    return;
  }
  const totalMs=structuredStartedAt?Math.max(1,Date.now()-structuredStartedAt):Math.max(1,s.ms);
  const aggregateAccuracy=structuredSessionTyped?Math.round(structuredSessionCorrect/structuredSessionTyped*100):100;
  const aggregateWpm=Math.round((structuredSessionCorrect/5)/(totalMs/60000));
  state.structuredPractice.rosary=(state.structuredPractice.rosary||0)+1;
  state.structuredHistory.unshift({type:'rosary',mysterySet:structuredCurrent.set.name,wpm:aggregateWpm,accuracy:aggregateAccuracy,errors:structuredSessionErrors,date:new Date().toISOString()});
  state.structuredHistory=state.structuredHistory.slice(0,60);state.totalStructuredPrayers=(state.totalStructuredPrayers||0)+1;
  prepToday();state.today.prayers=(state.today.prayers||0)+1;updateStreak();
  state.bestWpm=Math.max(state.bestWpm,aggregateWpm);state.bestAccuracy=Math.max(state.bestAccuracy,aggregateAccuracy);state.bestCombo=Math.max(state.bestCombo,combo);state.today.bestCombo=Math.max(state.today.bestCombo,combo);
  save();renderAll();gardenReact(aggregateAccuracy>=95);playTone('level');
  showToast(`✦ Rosary completed · ${structuredCurrent.set.name}`);
  $('gameMessage').textContent=`Rosary complete · ${aggregateAccuracy}% accuracy · the garden has journeyed with you.`;
  transitionTimer=setTimeout(()=>chooseStructured({focus:true}),state.reduceMotion?300:850);
}
function onPrayerInput(){
  if(finished || !prayerCurrent)return;
  const input=$('typingInput');
  const target=prayerCurrent.phrases[prayerPhraseIndex];
  if(input.value.length>target.length) input.value=input.value.slice(0,target.length);
  if(!startedAt && input.value.length){startedAt=Date.now(); if(!prayerStartedAt) prayerStartedAt=Date.now(); startTimer();}
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
  if(typed===target)completePrayerPhrase({wpm,accuracy,errors,ms,correct,typed});
}
function completePrayerPhrase(s){
  if(finished)return;
  finished=true; stopTimer(); $('typingInput').disabled=true;
  prayerSessionCorrect += s.correct;
  prayerSessionTyped += s.typed.length;
  prayerSessionErrors += s.errors;
  state.totalChars += s.typed.length;
  save();
  renderAll();
  gardenReact(s.accuracy>=95);
  playTone('complete');

  if(prayerPhraseIndex < prayerCurrent.phrases.length-1){
    $('gameMessage').textContent=`Phrase complete · ${prayerPhraseIndex+1} of ${prayerCurrent.phrases.length}.`;
    transitionTimer=setTimeout(()=>{
      prayerPhraseIndex++; finished=false; combo=0; startedAt=0;
      $('typingInput').disabled=false; $('typingInput').value=''; stopTimer();
      renderPrayerPhrase();
      updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
      $('gameMessage').textContent=`Phrase ${prayerPhraseIndex+1} of ${prayerCurrent.phrases.length} — continue in order.`;
      $('typingInput').focus({preventScroll:true});
    },state.reduceMotion?250:450);
    return;
  }

  const totalMs=prayerStartedAt?Math.max(1,Date.now()-prayerStartedAt):Math.max(1,s.ms);
  const aggregateAccuracy=prayerSessionTyped?Math.round(prayerSessionCorrect/prayerSessionTyped*100):100;
  const aggregateWpm=Math.round((prayerSessionCorrect/5)/(totalMs/60000));
  completePrayer({wpm:aggregateWpm,accuracy:aggregateAccuracy,errors:prayerSessionErrors,ms:totalMs});
}
function completePrayer(s){
  state.prayerPractice[prayerCurrent.id]=(state.prayerPractice[prayerCurrent.id]||0)+1;
  state.prayerHistory.unshift({id:prayerCurrent.id,wpm:s.wpm,accuracy:s.accuracy,errors:s.errors,date:new Date().toISOString()});
  state.prayerHistory=state.prayerHistory.slice(0,60);
  state.totalPrayers++;
  prepToday();
  state.today.prayers=(state.today.prayers||0)+1;
  updateStreak();
  state.bestWpm=Math.max(state.bestWpm,s.wpm);
  state.bestAccuracy=Math.max(state.bestAccuracy,s.accuracy);
  state.bestCombo=Math.max(state.bestCombo,combo);
  state.today.bestCombo=Math.max(state.today.bestCombo,combo);
  save(); renderAll(); gardenReact(s.accuracy>=95); playTone('complete');

  advanceGarden('Prayer completed');
  showToast(`✦ ${prayerCurrent.title} completed · ${gardenBackgrounds[state.gardenIndex].name}`);
  $('gameMessage').textContent=`Prayer complete · ${s.accuracy}% accuracy · the garden changes with you.`;
  transitionTimer=setTimeout(()=>choosePrayer({focus:true}),state.reduceMotion?300:850);
}
function onInput(){
  if(state.mode==='structured') return onStructuredInput();
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
  if($('goalPrayers')) $('goalPrayers').textContent=Math.min(1,state.today.prayers||0)+' / 1';
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
  const prayerBox=$('prayerLibrary');
  if(prayerBox){
    prayerBox.innerHTML=prayers.map(p=>{const n=state.prayerPractice[p.id]||0; return `<button type="button" class="prayer-library-item" data-prayer-id="${escapeHtml(p.id)}"><span><small>${escapeHtml(p.category)}</small><strong>${escapeHtml(p.title)}</strong></span><b>${n}×</b></button>`;}).join('');
    prayerBox.querySelectorAll('[data-prayer-id]').forEach(b=>b.addEventListener('click',()=>selectPrayer(b.dataset.prayerId)));
  }
  $('librarySummary').textContent=state.mode==='prayer'
    ? `${prayers.filter(p=>state.prayerPractice[p.id]).length} prayers practiced`
    : `${practiced} theme${practiced===1?'':'s'} practiced`;
  $('libraryToggle').querySelector('small').textContent=state.mode==='prayer'?'PRAYER LIBRARY':'SCRIPTURE LIBRARY';
  $('libraryToggle').querySelector('strong').textContent=state.mode==='prayer'?'Your prayers in practice':'Your verses by spiritual theme';
  if($('themeLibrary')) $('themeLibrary').hidden=state.mode==='prayer';
  if($('prayerLibrary')) $('prayerLibrary').hidden=state.mode!=='prayer';
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
  if(state.mode==='prayer' || state.mode==='structured') return;
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
$('structuredModeBtn').addEventListener('click',()=>chooseStructured({focus:true}));
$('structuredSelect').addEventListener('change',()=>chooseStructured({focus:true}));
$('structuredTypingBtn').addEventListener('click',()=>setStructuredPlayStyle('typing'));
$('structuredMeditationBtn').addEventListener('click',()=>setStructuredPlayStyle('meditation'));
$('meditationAction').addEventListener('click',completeStructuredMeditationStep);
$('mysteryContinueBtn').addEventListener('click',continueStructuredMystery);
$('prayerSelect').addEventListener('change',e=>selectPrayer(e.target.value));
$('themeSelect').addEventListener('change',()=>{ decks.delete(DECK_KEY()); choosePrompt(); });
$('newPromptBtn').addEventListener('click',()=>state.mode==='prayer'?choosePrayer({focus:true}):state.mode==='structured'?chooseStructured({focus:true}):choosePrompt());
$('libraryJump').addEventListener('click',()=>{
  if(state.mode==='structured'){showToast('Rosary · today’s mysteries are selected automatically.'); return;}
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
if(state.mode==='prayer') choosePrayer(); else if(state.mode==='structured') chooseStructured(); else choosePrompt();
if('serviceWorker' in navigator && location.protocol.startsWith('http')) window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
