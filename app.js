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
  {ref:'Psalm 18:2 (19:1)',theme:'Light & Creation',text:'The heavens shew forth the glory of God, and the firmament declareth the work of his hands.'},

  // Psalms · expanded library (Douay-Rheims 1899 American Edition)
  {ref:'Psalm 3:6-7',theme:'Peace & Stillness',text:'I have slept and taken my rest: and I have risen up, because the Lord hath protected me. I will not fear thousands of the people, surrounding me: arise, O Lord; save me, O my God.'},
  {ref:'Psalm 15:8-9 (16:8-9)',theme:'Trust & Faith',text:'I set the Lord always in my sight: for he is at my right hand, that I be not moved. Therefore my heart hath been glad, and my tongue hath rejoiced: moreover my flesh also shall rest in hope.'},
  {ref:'Psalm 16:5-8 (17:5-8)',theme:'Protection & Refuge',text:'Thou hast proved my heart, and visited it by night: thou hast tried me by fire, and iniquity hath not been found in me. That my mouth may not speak the works of men: for the words of thy lips I have kept hard ways. Perfect thou my goings in thy paths: that my footsteps be not moved. I have cried to thee, for thou, O God, hast heard me: incline thy ear unto me, and hear my words.'},
  {ref:'Psalm 17:2-3 (18:2-3)',theme:'Strength & Perseverance',text:'I will love thee, O Lord, my strength. The Lord is my firmament, my refuge, and my deliverer. My God is my helper, and in him will I put my trust.'},
  {ref:'Psalm 22 (23)',theme:'Protection & Refuge',text:'A psalm for David. The Lord ruleth me: and I shall want nothing. He hath set me in a place of pasture. He hath brought me up, on the water of refreshment: he hath converted my soul. He hath led me on the paths of justice, for his own name\'s sake. For though I should walk in the midst of the shadow of death, I will fear no evils, for thou art with me. Thy rod and thy staff, they have comforted me. Thou hast prepared a table before me against them that afflict me. Thou hast anointed my head with oil; and my chalice which inebriateth me, how goodly is it! And thy mercy will follow me all the days of my life. And that I may dwell in the house of the Lord unto length of days.'},
  {ref:'Psalm 23:4-5 (24:4-5)',theme:'Humility & Service',text:'He that hath innocent hands, and clean heart, who hath not taken his soul in vain, nor sworn deceitfully to his neighbour. He shall receive a blessing from the Lord, and mercy from God his Saviour.'},
  {ref:'Psalm 24:4-5 (25:4-5)',theme:'Guidance & Wisdom',text:'Shew me, O Lord, thy ways, and teach me thy paths. Direct me in thy truth, and teach me: for thou art God my Saviour; and thee have I waited all the day long.'},
  {ref:'Psalm 26 (27)',theme:'Courage',text:'The Lord is my light and my salvation, whom shall I fear? The Lord is the protector of my life: of whom shall I be afraid? Whilst the wicked draw near against me, to eat my flesh. My enemies that trouble me, have themselves been weakened, and have fallen. If armies in camp should stand together against me, my heart shall not fear. If a battle should rise up against me, in this will I be confident. One thing I have asked of the Lord, this will I seek after; that I may dwell in the house of the Lord all the days of my life. That I may see the delight of the Lord, and may visit his temple. For he hath hidden me in his tabernacle; in the day of evils, he hath protected me in the secret place of his tabernacle. He hath exalted me upon a rock: and now he hath lifted up my head above my enemies. I have gone round, and have offered up in his tabernacle a sacrifice of jubilation: I will sing, and recite a psalm to the Lord. Hear, O Lord, my voice, with which I have cried to thee: have mercy on me and hear me. My heart hath said to thee: My face hath sought thee: thy face, O Lord, will I still seek. Turn not away thy face from me; decline not in thy wrath from thy servant. Be thou my helper, forsake me not; do not thou despise me, O God my Savior. For my father and my mother have left me: but the Lord hath taken me up. Set me, O Lord, a law in thy way, and guide me in the right path, because of my enemies. Deliver me not over to the will of them that trouble me; for unjust witnesses have risen up against me; and iniquity hath lied to itself. I believe to see the good things of the Lord in the land of the living. Expect the Lord, do manfully, and let thy heart take courage, and wait thou for the Lord.'},
  {ref:'Psalm 26:13-14 (27:13-14)',theme:'Hope',text:'I believe to see the good things of the Lord in the land of the living. Expect the Lord, do manfully, and let thy heart take courage, and wait thou for the Lord.'},
  {ref:'Psalm 30:2-3 (31:2-3)',theme:'Trust & Faith',text:'In thee, O Lord, I have hoped, let me never be confounded: deliver me in thy justice. Bow down thy ear to me, make haste to deliver me. Be thou unto me a God, a protector, and a house of refuge, to save me.'},
  {ref:'Psalm 30:24 (31:25)',theme:'Strength & Perseverance',text:'Do ye manfully, and let your heart be strengthened, all ye that hope in the Lord.'},
  {ref:'Psalm 31:7 (32:7)',theme:'Protection & Refuge',text:'Thou art my refuge from the tribulation which hath encompassed me: my joy, deliver me from them that surround me.'},
  {ref:'Psalm 32:4-5 (33:4-5)',theme:'Love & Compassion',text:'For the word of the Lord is right, and all his works are done with faithfulness. He loveth mercy and judgment: the earth is full of the mercy of the Lord.'},
  {ref:'Psalm 33:4 (34:4)',theme:'Anxiety & Worry',text:'I sought the Lord, and he heard me; and he delivered me from all my troubles.'},
  {ref:'Psalm 33:18-19 (34:18-19)',theme:'Comfort & Grief',text:'The Lord is nigh unto them that are of a contrite heart: and he will save the humble of spirit. Many are the afflictions of the just; but out of them all will the Lord deliver them.'},
  {ref:'Psalm 36:5-6 (37:5-6)',theme:'Trust & Faith',text:'Commit thy way to the Lord, and trust in him, and he will do it. And he will bring forth thy justice as the light, and thy judgment as the noonday.'},
  {ref:'Psalm 36:7-8 (37:7-8)',theme:'Patience & Waiting',text:'Be subject to the Lord and pray to him. Envy not him who prospereth in his way; the man who doth unjust things. Cease from anger, and leave rage; have no emulation to do evil.'},
  {ref:'Psalm 38:8-9 (39:8-9)',theme:'Patience & Waiting',text:'And now what is my hope? Is it not the Lord? And thou indeed hast made all my days old; and my substance is as nothing before thee.'},
  {ref:'Psalm 39:2-3 (40:2-3)',theme:'Hope',text:'With expectation I have waited for the Lord, and he was attentive to me. And he brought me out of the pit of misery, and the mire of dregs. And he set my feet upon a rock, and directed my steps.'},
  {ref:'Psalm 41:6 (42:5)',theme:'Hope',text:'Why art thou sad, O my soul? and why dost thou trouble me? Hope in God, for I will still give praise to him: the salvation of my countenance.'},
  {ref:'Psalm 44:11 (45:11)',theme:'Humility & Service',text:'Hearken, O daughter, and see, and incline thy ear: for the king hath greatly desired thy beauty.'},
  {ref:'Psalm 45:11 (46:11)',theme:'Peace & Stillness',text:'Be still and see that I am God: I will be exalted among the nations, and I will be exalted in the earth.'},
  {ref:'Psalm 49:15 (50:15)',theme:'Prayer & Gratitude',text:'And call upon me in the day of trouble: I will deliver thee, and thou shalt glorify me.'},
  {ref:'Psalm 50:12-14 (51:10-12)',theme:'Forgiveness & Mercy',text:'Create a clean heart in me, O God: and renew a right spirit within me. Cast me not away from thy face; and take not thy holy spirit from me. Restore unto me the joy of thy salvation, and strengthen me with a perfect spirit.'},
  {ref:'Psalm 50:17 (51:17)',theme:'Humility & Service',text:'A sacrifice to God is an afflicted spirit: a contrite and humbled heart, O God, thou wilt not despise.'},
  {ref:'Psalm 54:4-5 (55:4-5)',theme:'Anxiety & Worry',text:'My heart is troubled within me: and the fear of death is fallen upon me. Fear and trembling are come upon me: and darkness hath covered me.'},
  {ref:'Psalm 55:4-5 (56:3-4)',theme:'Courage',text:'In God I have hoped, I will not fear what flesh can do to me. All the day long they detracted my words: all their thoughts were against me unto evil.'},
  {ref:'Psalm 60:2-3 (61:2-3)',theme:'Comfort & Grief',text:'Hear, O God, my supplication: be attentive to my prayer. To thee have I cried from the ends of the earth: when my heart was in anguish, thou hast exalted me on a rock.'},
  {ref:'Psalm 61:6-7 (62:6-7)',theme:'Peace & Stillness',text:'But my soul be subject to God: for from him is my patience. For he is my God and my saviour: he is my protector, I shall be moved no more.'},
  {ref:'Psalm 70:5 (71:5)',theme:'Hope',text:'For thou art my patience, O Lord: my hope, O Lord, from my youth.'},
  {ref:'Psalm 85:11 (86:11)',theme:'Guidance & Wisdom',text:'Set thy ways before me, O Lord, and teach me thy paths: and I will walk in thy truth: unite my heart to fear thy name.'},
  {ref:'Psalm 90:1-4 (91:1-4)',theme:'Protection & Refuge',text:'He that dwelleth in the aid of the most High, shall abide under the protection of the God of Jacob. He shall say to the Lord: Thou art my protector, and my refuge: my God I will hope in him. Because he hath delivered me from the snare of the hunters, and from the sharp word. He will overshadow thee with his shoulders: and under his wings thou shalt hope.'},
  {ref:'Psalm 102:8-12 (103:8-12)',theme:'Forgiveness & Mercy',text:'The Lord is compassionate and merciful: longsuffering and plenteous in mercy. He will not always be angry: nor will he threaten for ever. He hath not dealt with us according to our sins: nor rewarded us according to our iniquities. For according to the height of the heaven above the earth: he hath strengthened his mercy towards them that fear him. As far as the east is from the west, so far hath he removed our iniquities from us.'},
  {ref:'Psalm 114:1-2 (116:1-2)',theme:'Prayer & Gratitude',text:'I have loved, because the Lord will hear the voice of my prayer. Because he hath inclined his ear unto me: and in my days I will call upon him.'},
  {ref:'Psalm 117:6 (118:6)',theme:'Courage',text:'The Lord is my helper: I will not fear what man can do unto me.'},
  {ref:'Psalm 120 (121)',theme:'Protection & Refuge',text:'I have lifted up my eyes to the mountains, from whence help shall come to me. My help is from the Lord, who made heaven and earth. May he not suffer thy foot to be moved: neither let him slumber that keepeth thee. Behold he shall neither slumber nor sleep, that keepeth Israel. The Lord is thy keeper, the Lord is thy protection upon thy right hand. The sun shall not burn thee by day: nor the moon by night. The Lord keepeth thee from all evil: may the Lord keep thy soul. May the Lord keep thy coming in and thy going out; from henceforth now and for ever.'},
  {ref:'Psalm 126:1-2 (127:1-2)',theme:'Trust & Faith',text:'Unless the Lord build the house, they labour in vain that build it. Unless the Lord keep the city, he watcheth in vain that keepeth it. It is vain for you, before light, to rise: rise ye after you have sitten, you that eat the bread of sorrow.'},
  {ref:'Psalm 127:1-2 (128:1-2)',theme:'Love & Compassion',text:'Blessed are all they that fear the Lord: that walk in his ways. For thou shalt eat the labours of thy hands: blessed art thou, and it shall be well with thee.'},
  {ref:'Psalm 130:2-3 (131:2-3)',theme:'Peace & Stillness',text:'Surely I have behaved myself quietly, and as one weaned from his mother: my soul is as a weaned child. Let Israel hope in the Lord, from henceforth now and for ever.'},
  {ref:'Psalm 144:18-19 (145:18-19)',theme:'Prayer & Gratitude',text:'The Lord is nigh unto all them that call upon him: to all that call upon him in truth. He will do the will of them that fear him: and he will hear their prayer, and save them.'},
  {ref:'Psalm 145:8-9 (146:8-9)',theme:'Love & Compassion',text:'The Lord looseth them that are fettered: the Lord enlighteneth the blind. The Lord lifteth up them that are cast down: the Lord loveth the just. The Lord keepeth the strangers, he will support the fatherless and the widow.'},
  {ref:'Psalm 146:3-4 (147:3-4)',theme:'Comfort & Grief',text:'Who healeth the broken of heart, and bindeth up their bruises. Who telleth the number of the stars: and calleth them all by their names.'},
  {ref:'Psalm 147:1 (148:1)',theme:'Light & Creation',text:'Praise ye the Lord from the heavens: praise ye him in the high places.'},
  {ref:'Psalm 148:13-14 (149:13-14)',theme:'Prayer & Gratitude',text:'Let them praise the name of the Lord: for his name alone is exalted. The praise of him is above heaven and earth: and he hath exalted the horn of his people.'},

  // Psalms for prayer · Douay-Rheims 1899 American Edition
  {ref:'Psalm 5:2-4',theme:'Prayer & Gratitude',prayerPsalm:true,text:'Give ear, O Lord, to my words, understand my cry. Hearken to the voice of my prayer, O my King and my God. For to thee will I pray: O Lord, in the morning thou shalt hear my voice.'},
  {ref:'Psalm 6:3-5',theme:'Comfort & Grief',prayerPsalm:true,text:'Have mercy on me, O Lord, for I am weak: heal me, O Lord, for my bones are troubled. And my soul is troubled exceedingly: but thou, O Lord, how long? Turn to me, O Lord, and deliver my soul: O save me for thy mercy\'s sake.'},
  {ref:'Psalm 50:3-4',theme:'Forgiveness & Mercy',prayerPsalm:true,text:'Have mercy on me, O God, according to thy great mercy. And according to the multitude of thy tender mercies blot out my iniquity. Wash me yet more from my iniquity, and cleanse me from my sin.'},
  {ref:'Psalm 69:2-6',theme:'Protection & Refuge',prayerPsalm:true,text:'O God, come to my assistance; O Lord, make haste to help me. Let them be confounded and ashamed that seek my soul: Let them be turned backward, and blush for shame that desire evils to me: Let them be presently turned away blushing for shame that say to me: Tis well, tis well. Let all that seek thee rejoice and be glad in thee; and let such as love thy salvation say always: The Lord be magnified. But I am needy and poor; O God, help me. Thou art my helper and my deliverer: O Lord, make no delay.'},
  {ref:'Psalm 85:1-7',theme:'Prayer & Gratitude',prayerPsalm:true,text:'A prayer for David himself. Incline thy ear, O Lord, and hear me: for I am needy and poor. Preserve my soul, for I am holy: save thy servant, O my God, that trusteth in thee. Have mercy on me, O Lord, for I have cried to thee all the day. Give joy to the soul of thy servant, for to thee, O Lord, I have lifted up my soul. For thou, O Lord, art sweet and mild: and plenteous in mercy to all that call upon thee. Give ear, O Lord, to my prayer: and attend to the voice of my petition. I have called upon thee in the day of my trouble: because thou hast heard me.'},
  {ref:'Psalm 101:2-3',theme:'Anxiety & Worry',prayerPsalm:true,text:'Hear, O Lord, my prayer: and let my cry come to thee. Turn not away thy face from me: in the day when I am in trouble, incline thy ear to me. In what day soever I shall call upon thee, hear me speedily.'},
  {ref:'Psalm 129:1-5 (130:1-5)',theme:'Forgiveness & Mercy',prayerPsalm:true,text:'Out of the depths I have cried to thee, O Lord: Lord, hear my voice. Let thy ears be attentive to the voice of my supplication. If thou, O Lord, wilt mark iniquities: Lord, who shall stand it. For with thee there is merciful forgiveness: and by reason of thy law, I have waited for thee, O Lord. My soul hath relied on his word: My soul hath hoped in the Lord.'},
  {ref:'Psalm 142:8-10 (143:8-10)',theme:'Guidance & Wisdom',prayerPsalm:true,text:'Cause me to hear thy mercy in the morning; for in thee have I hoped. Make the way known to me, wherein I should walk: for I have lifted up my soul to thee. Deliver me from my enemies, O Lord, to thee have I fled: Teach me to do thy will, for thou art my God. Thy good spirit shall lead me into the right land:'}
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

const divineMercyChaplet = {
  id:'divine-mercy',
  name:'Divine Mercy Chaplet',
  kind:'divine-mercy',
  days:'Five decades',
  season:'Divine Mercy devotion',
  source:'EWTN · Chaplet of the Divine Mercy',
  decadePrompt:'Pray this decade for mercy for yourself and for the whole world.'
};
const divineMercyNovenaDays = [
  {day:1,title:'All mankind, especially sinners',prompt:'Bring the needs of all people before Divine Mercy, especially those burdened by sin. Ask for trust, compassion, and a merciful heart.'},
  {day:2,title:'Priests and religious',prompt:'Pray for priests and religious, asking that they be strengthened to serve, guide, and witness to God’s mercy.'},
  {day:3,title:'Devout and faithful souls',prompt:'Pray for those striving to remain faithful. Ask that they be protected in faith and strengthened in love.'},
  {day:4,title:'Those who do not believe or do not yet know Jesus',prompt:'Pray for those who do not believe or have not yet come to know Christ. Ask that they encounter the light of the Gospel.'},
  {day:5,title:'Separated brethren',prompt:'Pray for Christians who are separated from full communion with the Catholic Church, asking for grace, unity, and mutual charity.'},
  {day:6,title:'The meek and humble and little children',prompt:'Pray for the meek and humble, and for children. Ask for protection, gentleness, humility, and trust.'},
  {day:7,title:'Those who especially venerate Divine Mercy',prompt:'Pray for those devoted to Divine Mercy, asking that their trust become a living witness through works of mercy.'},
  {day:8,title:'Souls in purgatory',prompt:'Pray for the souls being purified, entrusting them to Divine Mercy and remembering the communion of the Church.'},
  {day:9,title:'Lukewarm souls',prompt:'Pray for those whose faith and love have grown cold. Ask that they be renewed in trust and love.'}
];
function divineMercySunday(year){ return addDays(easterSunday(year),7); }
function divineMercyNovenaDayForDate(date=new Date()){
  const d=dateOnly(date), y=d.getFullYear(), easter=easterSunday(y), start=addDays(easter,-2), end=addDays(easter,6);
  if(d>=start && d<=end) return Math.round((d-start)/86400000)+1;
  return 1;
}
function divineMercyNovenaDay(id){
  const n=Number(id)||divineMercyNovenaDayForDate(new Date());
  return divineMercyNovenaDays[Math.min(9,Math.max(1,n))-1];
}
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
  return {type:'rosary',title:'Holy Rosary',set,steps};
}

function buildDivineMercyChaplet(){
  const set=divineMercyChaplet;
  const steps=[];
  const add=(kind,label,id,text,extra={})=>steps.push({kind,label,id,text,...extra});
  add('prayer','Sign of the Cross','sign-of-cross','In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',{opening:true});
  add('prayer','The Our Father','our-father',prayerText('our-father'),{opening:true});
  add('prayer','Hail Mary','hail-mary',prayerText('hail-mary'),{opening:true});
  add('prayer',"The Apostles' Creed",'apostles-creed',prayerText('apostles-creed'),{opening:true});
  for(let d=0;d<5;d++){
    add('mystery',`Decade ${d+1} of 5 · Divine Mercy`,'divine-mercy-decade','',{decade:d,decadeIndex:d,prompt:set.decadePrompt});
    add('prayer',`Decade ${d+1} · Our Father Bead`,'divine-mercy-large-bead',
      'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.',
      {decade:d,largeBead:true});
    for(let h=1;h<=10;h++) add('prayer',`Decade ${d+1} · Mercy Prayer ${h} of 10`,'divine-mercy-small-bead',
      'For the sake of His sorrowful Passion, have mercy on us and on the whole world.',
      {decade:d,hailMary:h,mercyBead:h});
  }
  for(let n=1;n<=3;n++) add('prayer',`Holy God · ${n} of 3`,'holy-god',
    'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.',
    {closing:true});
  add('prayer','Sign of the Cross','sign-of-cross','In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',{closing:true});
  return {type:'divine-mercy',title:'Divine Mercy Chaplet',set,steps};
}

function buildDivineMercyNovena(day=divineMercyNovenaDayForDate(new Date())){
  const dayInfo=divineMercyNovenaDay(day);
  const chaplet=buildDivineMercyChaplet();
  const steps=[{kind:'novena-intention',label:`Divine Mercy Novena · Day ${dayInfo.day}`,id:'divine-mercy-novena-intention',text:'',novenaDay:dayInfo.day,title:dayInfo.title,prompt:dayInfo.prompt}];
  return {type:'divine-mercy-novena',title:`Divine Mercy Novena · Day ${dayInfo.day}`,set:{...divineMercyChaplet,source:'EWTN · Divine Mercy Novena',novenaDay:dayInfo.day,novenaTitle:dayInfo.title},steps:steps.concat(chaplet.steps)};
}
function buildStructuredPrayer(id='rosary',date=new Date()){
  if(id==='divine-mercy') return buildDivineMercyChaplet();
  if(id==='divine-mercy-novena') return buildDivineMercyNovena(Number(document.getElementById('divineMercyNovenaDay')?.value)||divineMercyNovenaDayForDate(date));
  return buildRosary(date);
}

const gardenBackgrounds = [
  {id:'starter', name:'Starter Garden', file:'./assets/garden/starter-garden.png'},
  {id:'morning', name:'Morning Garden', file:'./assets/garden/morning-garden.png'},
  {id:'afternoon', name:'Afternoon Garden', file:'./assets/garden/afternoon-garden.png'},
  {id:'autumn', name:'Autumn Garden', file:'./assets/garden/autumn-garden.png'},
  {id:'winter', name:'Winter Garden', file:null},
  {id:'summer', name:'Summer Garden', file:null},
  {id:'scottish', name:'Scottish Garden', file:null},
  {id:'mushroom', name:'Mushroom Garden', file:null}
];
const defaultState = {
  bestWpm:0,bestAccuracy:0,bestCombo:0,totalPassages:0,totalChars:0,
  bloom:0,level:1,streak:0,lastPracticeDate:'',perfectPassages:0,perfectBestWpm:0,themeMastery:{},themeMilestones:{},
  today:{date:'',passages:0,prayers:0,highAccuracy:false,bestCombo:0},
  sound:false,reduceMotion:false,practice:{},themeCounts:{},history:[],
  mode:'scripture', practicePlayStyle:'typing', structuredPlayStyle:'typing', prayerPractice:{}, prayerHistory:[], totalPrayers:0, structuredPractice:{rosary:0,'divine-mercy':0}, structuredHistory:[], totalStructuredPrayers:0, gardenIndex:0, gardenStage:'seedling', gardenLevelCelebration:0, gardenMoments:0
};

let state = load();
// Every fresh app opening begins in the quiet Starter Garden. Progress is
// still persistent, but the garden scene itself intentionally starts here
// so changing gardens feels like a meaningful choice.
state.gardenIndex = 0;
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
  const pool=key==='all' ? passages : key==='prayer-psalms' ? passages.filter(p=>p.prayerPsalm) : passages.filter(p=>p.theme===key);
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
    themeMastery:{...(saved.themeMastery || {})},
    themeMilestones:{...(saved.themeMilestones || {})},
    perfectPassages:Number(saved.perfectPassages)||0,
    perfectBestWpm:Number(saved.perfectBestWpm)||0,
    history:Array.isArray(saved.history) ? saved.history : [],
    prayerPractice:{...(saved.prayerPractice || {})},
    prayerHistory:Array.isArray(saved.prayerHistory) ? saved.prayerHistory : [],
    structuredPractice:{...defaultState.structuredPractice,...(saved.structuredPractice||{})},
    practicePlayStyle:['typing','meditation'].includes(saved.practicePlayStyle)?saved.practicePlayStyle:'typing',
    structuredPlayStyle:['typing','meditation'].includes(saved.structuredPlayStyle)?saved.structuredPlayStyle:'typing',
    structuredHistory:Array.isArray(saved.structuredHistory) ? saved.structuredHistory : [],
    mode:['prayer','structured'].includes(saved.mode)?saved.mode:'scripture',
    gardenIndex:Number.isInteger(saved.gardenIndex) ? saved.gardenIndex : 0,
    gardenStage:['seedling','growing','flowering','flourishing','sanctuary'].includes(saved.gardenStage)?saved.gardenStage:'seedling',
    gardenLevelCelebration:Number(saved.gardenLevelCelebration)||0
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

const gardenStages = [
  {min:1,id:'seedling',name:'Seedling',description:'A quiet beginning. Every accurate word takes root.',next:'Reach Level 2 to help the first beds grow.'},
  {min:2,id:'growing',name:'Growing Garden',description:'New growth is taking hold. Keep a steady rhythm.',next:'Reach Level 4 for the first flowers.'},
  {min:4,id:'flowering',name:'Flowering Garden',description:'The garden begins to flower with sustained practice.',next:'Reach Level 7 for a fuller garden.'},
  {min:7,id:'flourishing',name:'Flourishing Garden',description:'Your practice has become a generous, living rhythm.',next:'Reach Level 10 for Sanctuary.'},
  {min:10,id:'sanctuary',name:'Garden Sanctuary',description:'A deeply established garden shaped by faithful practice.',next:'Keep growing — there is no finish line.'}
];
function gardenStageForLevel(level=state.level){
  return [...gardenStages].reverse().find(stage=>level>=stage.min) || gardenStages[0];
}
function updateGardenStage({celebrate=false}={}){
  const stage=gardenStageForLevel(state.level);
  const changed=state.gardenStage!==stage.id;
  state.gardenStage=stage.id;
  const hero=$('gardenHero');
  if(hero){
    hero.dataset.growth=stage.id;
    hero.setAttribute('aria-label',`Scripture Paws garden — ${stage.name}`);
  }
  if($('gardenStageName')) $('gardenStageName').textContent=stage.name;
  if($('gardenStageLevel')) $('gardenStageLevel').textContent=state.level;
  const stageTrack=$('gardenStageTrack');
  if(stageTrack) stageTrack.dataset.stage=stage.id;
  if($('gardenStageDescription')) $('gardenStageDescription').textContent=stage.description;
  if($('gardenStageNext')) $('gardenStageNext').textContent=stage.next;
  if(changed && celebrate && !state.reduceMotion){
    const fx=$('gardenEffects');
    if(fx){
      fx.innerHTML='';
      for(let i=0;i<14;i++){
        const p=document.createElement('i');
        p.textContent=i%3===0?'✿':(i%2?'✦':'❀');
        p.className='growth-particle';
        p.style.left=(10+Math.random()*80)+'%';
        p.style.top=(35+Math.random()*45)+'%';
        p.style.setProperty('--delay',(Math.random()*.45)+'s');
        fx.appendChild(p);
      }
      setTimeout(()=>fx.innerHTML='',2200);
    }
  }
  return {stage,changed};
}
function levelUpCelebration(newLevel,stage){
  state.gardenLevelCelebration=newLevel;
  const hero=$('gardenHero');
  if(hero){
    hero.classList.remove('level-up-celebration');
    void hero.offsetWidth;
    hero.classList.add('level-up-celebration');
    setTimeout(()=>hero.classList.remove('level-up-celebration'),1300);
  }
  showToast(`✦ Garden Level ${newLevel} · ${stage.name}`);
  playTone('level');
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
  const hero=$('gardenHero');
  const same=currentId===target.id;
  if(image) image.style.backgroundImage=`url('${target.file}')`;
  $('gardenMood').textContent=target.name;
  hero.dataset.garden=target.id;
  if(!same){
    hero.classList.remove('garden-changing');
    void hero.offsetWidth;
    hero.classList.add('garden-changing');
  }
  save();
  if(reason && !same) showToast(`✦ ${target.name} · ${reason}`);
}
function advanceGarden(reason){
  const available=gardenBackgrounds.filter(x=>x.file);
  if(available.length<2){ setGardenBackground(state.gardenIndex,reason); return; }
  const nextAvailable=available[(Math.max(0,state.level-1))%available.length];
  const nextIndex=gardenBackgrounds.findIndex(x=>x.id===nextAvailable.id);
  setGardenBackground(nextIndex,reason);
}
function randomGarden(){
  const currentId=gardenBackgrounds[state.gardenIndex]?.id;
  const choices=gardenBackgrounds.filter(x=>x.file && x.id!=='starter' && x.id!==currentId);
  if(!choices.length) return;
  const target=choices[Math.floor(Math.random()*choices.length)];
  const index=gardenBackgrounds.findIndex(x=>x.id===target.id);
  setGardenBackground(index,'a change of scenery');
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
  document.body.classList.toggle('meditation-active', structuredMode && state.structuredPlayStyle==='meditation');
  document.body.classList.toggle('practice-meditation-active', !structuredMode && state.practicePlayStyle==='meditation');
  document.body.classList.toggle('structured-mode', structuredMode);
  $('scriptureModeBtn').classList.toggle('active',!prayerMode&&!structuredMode);
  $('prayerModeBtn').classList.toggle('active',prayerMode);
  $('structuredModeBtn').classList.toggle('active',structuredMode);
  $('scriptureModeBtn').setAttribute('aria-selected',String(!prayerMode&&!structuredMode));
  $('prayerModeBtn').setAttribute('aria-selected',String(prayerMode));
  $('structuredModeBtn').setAttribute('aria-selected',String(structuredMode));
  $('themePicker').hidden=prayerMode||structuredMode;
  $('prayerPicker').hidden=!prayerMode;
  $('structuredPicker').hidden=!structuredMode;
  if($('divineMercyNovenaDayPicker')) $('divineMercyNovenaDayPicker').hidden=!(structuredMode && $('structuredSelect')?.value==='divine-mercy-novena');
  if($('structuredStylePicker')) $('structuredStylePicker').hidden=!structuredMode;
  if($('practiceStylePicker')) $('practiceStylePicker').hidden=structuredMode;
  if($('practiceTypingBtn')){ $('practiceTypingBtn').classList.toggle('active',state.practicePlayStyle==='typing'); $('practiceTypingBtn').setAttribute('aria-pressed',String(state.practicePlayStyle==='typing')); }
  if($('practiceMeditationBtn')){ $('practiceMeditationBtn').classList.toggle('active',state.practicePlayStyle==='meditation'); $('practiceMeditationBtn').setAttribute('aria-pressed',String(state.practicePlayStyle==='meditation')); }
  if($('structuredTypingBtn')){ $('structuredTypingBtn').classList.toggle('active',state.structuredPlayStyle==='typing'); $('structuredTypingBtn').setAttribute('aria-pressed',String(state.structuredPlayStyle==='typing')); }
  if($('structuredMeditationBtn')){ $('structuredMeditationBtn').classList.toggle('active',state.structuredPlayStyle==='meditation'); $('structuredMeditationBtn').setAttribute('aria-pressed',String(state.structuredPlayStyle==='meditation')); }
  $('gardenSideNote').hidden=prayerMode||structuredMode;
  $('practiceLabel').textContent=structuredMode?'STRUCTURED PRAYER':prayerMode?'PRAYER PRACTICE':'SCRIPTURE PRACTICE';
  if(structuredMode && structuredCurrent){
    $('verseText').classList.remove('practice-meditation-card');
    $('verseText').removeAttribute('role');$('verseText').removeAttribute('tabindex');$('verseText').removeAttribute('aria-label');
    const step=structuredCurrent.steps[structuredStepIndex];
    $('verseTheme').textContent=structuredCurrent.title.toUpperCase();
    $('verseRef').textContent=`STEP ${structuredStepIndex+1} / ${structuredCurrent.steps.length}`;
    $('practiceCount').textContent=`Today · ${structuredCurrent.title}`;
    const set=structuredCurrent.set;
    const isRosary=structuredCurrent.type==='rosary';
    const isDivine=structuredCurrent.type==='divine-mercy' || structuredCurrent.type==='divine-mercy-novena';
    const note=isRosary ? `${set.days} · ${set.season}${set.selectionReason ? ` · ${set.selectionReason}` : ''} · ${set.feastOverride ? 'Feast override · ' : ''}Mysteries selected for today` : `${set.days} · ${set.season}`;
    $('structuredMeta').textContent=note;
    $('newPromptBtn').textContent=isRosary?'↻ Restart Rosary':isDivine?'↻ Restart Chaplet':'↻ Restart Structured Prayer';
    $('typingInput').placeholder=step?.kind==='mystery'?'Meditate quietly on this mystery…':'Type the prayer here…';
    $('typingLabel').textContent=step?.kind==='mystery'?'Quiet meditation':'Type the prayer';
    if($('typingInput')) $('typingInput').hidden=state.structuredPlayStyle==='meditation';
    if($('gardenLiveStats')) $('gardenLiveStats').hidden=state.structuredPlayStyle==='meditation';
    if($('meditationAction')) $('meditationAction').hidden=state.structuredPlayStyle!=='meditation';
    if($('typingLabel')) $('typingLabel').hidden=state.structuredPlayStyle==='meditation';
  }else{
    // Structured Prayer controls must never leak into Scripture or regular Prayer mode.
    // This is especially important for Meditation Mode, whose bead action lives
    // alongside the normal typing controls.
    if($('meditationAction')) $('meditationAction').hidden=true;
    if($('mysteryContinueBtn')) $('mysteryContinueBtn').hidden=true;
    $('verseText').classList.remove('structured-long-prayer');
    $('verseTheme').textContent=prayerMode ? (prayerCurrent?.category || 'PRAYER') : (current?.theme || '').toUpperCase();
    $('verseRef').textContent=prayerMode ? `${prayerPhraseIndex+1} / ${prayerCurrent?.phrases.length || 1}` : (current?.ref || '');
    $('newPromptBtn').textContent=prayerMode?'↻ Next prayer':'↻ New passage';
    $('typingInput').placeholder=prayerMode?'Type the prayer phrase here…':'Type the words here…';
    $('typingLabel').textContent=prayerMode?'Type the prayer phrase':'Type the Scripture passage';
    if($('typingInput')) $('typingInput').hidden=false;
    if($('gardenLiveStats')) $('gardenLiveStats').hidden=false;
    if($('typingLabel')) $('typingLabel').hidden=false;
    if(!structuredMode && state.practicePlayStyle==='meditation'){
      if($('typingInput')) $('typingInput').hidden=true;
      if($('gardenLiveStats')) $('gardenLiveStats').hidden=true;
      if($('typingLabel')) $('typingLabel').hidden=true;
    }
  }
  $('libraryJump').textContent=structuredMode?'☩ Structured Prayer Library ›':prayerMode?'☩ Prayer Library ›':'♧ Scripture Library ›';
  if($('prayerSource')) $('prayerSource').hidden=!(prayerMode||structuredMode);
  if($('structuredMeta')) $('structuredMeta').hidden=!structuredMode;
  // Keep the structured-prayer bead tracker synchronized with the mode.
  // This also forces it hidden immediately when returning to Scripture or Prayer.
  renderRosaryProgress();
}
function setPracticePlayStyle(style,{restart=true}={}){
  if(!['typing','meditation'].includes(style))return;
  state.practicePlayStyle=style;
  clearTimeout(transitionTimer);
  finished=false; combo=0; startedAt=0; stopTimer();
  if(state.mode==='scripture'){
    if(restart) choosePrompt({focus:false});
    else { renderModeUI(); renderPrompt(); if(style==='meditation') renderScriptureMeditation(); updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:style==='meditation'?100:0}); }
  }else if(state.mode==='prayer'){
    if(restart) choosePrayer({focus:false});
    else { renderModeUI(); renderPrayerPhrase(); if(style==='meditation') renderPrayerMeditation(); updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:style==='meditation'?100:0}); }
  }else{
    renderModeUI();
  }
  save();
}

function renderScriptureMeditation(){
  if(!current)return;
  const count=state.practice[current.ref]||0;
  $('verseText').classList.add('practice-meditation-card');
  $('verseText').setAttribute('role','button');
  $('verseText').setAttribute('tabindex','0');
  $('verseText').setAttribute('aria-label',`Read ${current.ref}, then tap for another Scripture passage`);
  $('verseText').innerHTML=`<span class="practice-meditation-kicker">READ IN STILLNESS</span><strong>${escapeHtml(current.text)}</strong><small>Tap this passage when you are ready for another verse</small>`;
  $('verseRef').textContent=current.ref;
  $('verseTheme').textContent=current.theme.toUpperCase();
  $('practiceCount').textContent=count ? `Practiced ${count} time${count===1?'':'s'} · meditation is for reading, not speed` : 'Meditation passage · read slowly and receive the words.';
  $('progressFill').style.width='100%';$('progressLabel').textContent='READ';
  $('gameMessage').textContent='Read the passage slowly. Tap the words when you are ready for another verse.';
}

function renderPrayerMeditation(){
  if(!prayerCurrent)return;
  $('verseText').classList.add('practice-meditation-card');
  $('verseText').setAttribute('role','button');
  $('verseText').setAttribute('tabindex','0');
  $('verseText').setAttribute('aria-label',`Read ${prayerCurrent.title}, then tap for another prayer`);
  $('verseText').innerHTML=`<span class="practice-meditation-kicker">PRAY IN STILLNESS</span><strong>${escapeHtml(prayerCurrent.title)}</strong><p>${escapeHtml(prayerText(prayerCurrent.id))}</p><small>Tap this prayer when you are ready for another prayer</small>`;
  $('verseRef').textContent='Meditation';
  $('verseTheme').textContent=(prayerCurrent.category||'PRAYER').toUpperCase();
  $('practiceCount').textContent=`${prayerCurrent.short} · read or pray at your own pace`;
  if($('prayerSource')) $('prayerSource').textContent=prayerCurrent.source;
  $('progressFill').style.width='100%';$('progressLabel').textContent='PRAY';
  $('gameMessage').textContent='Read or pray the passage slowly. Tap the words when you are ready for another prayer.';
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
  const id=$('structuredSelect')?.value || 'rosary';
  structuredCurrent=buildStructuredPrayer(id,new Date());
  structuredStepIndex=0;
  structuredStartedAt=0; structuredSessionCorrect=0; structuredSessionTyped=0; structuredSessionErrors=0;
  finished=false; combo=0; startedAt=0; stopTimer();
  $('typingInput').value='';$('typingInput').disabled=false;
  renderModeUI();renderStructuredStep();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  const set=structuredCurrent.set;
  $('prayerSource').textContent=set.source || 'EWTN · Structured Prayer';
  const seasonalNote=set.selectionReason ? ` · ${set.selectionReason}` : '';
  $('structuredMeta').textContent=structuredCurrent.type==='rosary' ? `${set.days} · ${set.season}${seasonalNote} · ${set.feastOverride ? 'Feast override · ' : ''}Mysteries selected for today` : structuredCurrent.type==='divine-mercy-novena' ? `Day ${set.novenaDay} of 9 · ${set.novenaTitle} · EWTN Novena intention` : `${set.days} · ${set.season}`;
  $('gameMessage').textContent=structuredCurrent.type==='rosary' ? `${set.name}${set.selectionReason ? ` · ${set.selectionReason}` : ''} · begin with the Sign of the Cross.` : structuredCurrent.type==='divine-mercy-novena' ? `Day ${set.novenaDay} · begin with the Novena intention, then pray the Chaplet.` : 'Begin with the Sign of the Cross.';
  save();
  if($('divineMercyNovenaDay')) $('divineMercyNovenaDay').value=String(structuredCurrent.set.novenaDay || divineMercyNovenaDayForDate(new Date()));
  if(focus && state.structuredPlayStyle==='typing') $('typingInput').focus({preventScroll:true});
}
function renderRosaryProgress(){
  const box=$('rosaryProgress');
  const decades=$('rosaryDecades');
  if(!box||!decades||state.mode!=='structured'||!structuredCurrent){ if(box)box.hidden=true; return; }
  box.hidden=false;
  const step=structuredCurrent.steps[structuredStepIndex];
  const isRosary=structuredCurrent.type==='rosary';
  const isDivine=structuredCurrent.type==='divine-mercy' || structuredCurrent.type==='divine-mercy-novena';
  const completed=Array(5).fill(0);
  const largeDone=Array(5).fill(false);
  const holyGodDone=[false,false,false];
  let openingDone=0;
  for(let i=0;i<structuredStepIndex;i++){
    const prior=structuredCurrent.steps[i];
    if(isDivine){
      if(prior.opening) openingDone++;
      if(Number.isInteger(prior.decade) && prior.largeBead) largeDone[prior.decade]=true;
      if(Number.isInteger(prior.decade) && Number.isInteger(prior.mercyBead)) completed[prior.decade]=Math.max(completed[prior.decade],prior.mercyBead);
      if(prior.id==='holy-god' && prior.closing) holyGodDone[Number(prior.label.match(/(\d+) of 3$/)?.[1]||1)-1]=true;
    }else if(Number.isInteger(prior.decade) && Number.isInteger(prior.hailMary)){
      completed[prior.decade]=Math.max(completed[prior.decade],prior.hailMary);
    }
  }
  const currentDecade=Number.isInteger(step?.decade)?step.decade:-1;
  let label='Opening prayers', detail='Prepare for the decades';
  if(isRosary){
    label=currentDecade<0 ? (step?.kind==='mystery' ? `Mystery ${step.mysteryIndex+1} of 5` : 'Opening prayers') : `Decade ${currentDecade+1} of 5`;
    detail=currentDecade<0 ? 'Prepare for the decades' : `${completed[currentDecade]} of 10 Hail Marys`;
  }else if(isDivine){
    if(step?.closing && step.id==='holy-god') { label='Concluding prayer'; detail=`Holy God · ${step.label.match(/(\d+) of 3$/)?.[1]||1} of 3`; }
    else if(step?.closing){ label='Closing'; detail='Sign of the Cross'; }
    else if(currentDecade>=0){ label=`Decade ${currentDecade+1} of 5`; detail=step?.largeBead ? 'Eternal Father · large bead' : `${completed[currentDecade]} of 10 mercy beads`; }
    else { label='Opening prayers'; detail=`${Math.min(openingDone,4)} of 4 prayers`; }
  }
  $('rosaryProgressLabel').textContent=isDivine ? (structuredCurrent.type==='divine-mercy-novena' ? `Novena Day ${structuredCurrent.set.novenaDay}` : 'Divine Mercy Chaplet') : label;
  $('rosaryProgressDetail').textContent=detail;
  box.classList.toggle('divine-mercy-progress',isDivine);
  if(isDivine){
    box.setAttribute('aria-label',structuredCurrent.type==='divine-mercy-novena'?'Divine Mercy Novena and Chaplet progress':'Divine Mercy Chaplet bead and prayer progress');
  }else{
    box.setAttribute('aria-label','Rosary decade and bead progress');
  }
  if(isDivine){
    decades.innerHTML=`
      <div class="divine-mercy-opening">
        ${['Sign of the Cross','Our Father','Hail Mary','Apostles’ Creed'].map((name,i)=>`<span class="divine-mercy-opening-bead ${i<openingDone?'done':''} ${step?.opening&&openingDone===i?'current':''}" title="${name}"><i></i><small>${i+1}</small></span>`).join('')}
      </div>
      <div class="divine-mercy-decade-list">
        ${Array.from({length:5},(_,mi)=>{
          const isCurrent=mi===currentDecade;
          const count=completed[mi];
          const largeCurrent=isCurrent && step?.largeBead;
          const largeAction=largeCurrent && state.structuredPlayStyle==='meditation';
          const large=largeAction
            ? `<button class="divine-mercy-large-bead current actionable" type="button" data-rosary-advance="true" aria-label="Pray the Eternal Father prayer aloud, then continue"><span>+</span></button>`
            : `<i class="divine-mercy-large-bead${largeDone[mi]?' filled':''}${largeCurrent?' current':''}" aria-hidden="true"><span>+</span></i>`;
          const beads=Array.from({length:10},(_,n)=>{
            const filled=n<count;
            const currentDot=isCurrent && !step?.largeBead && step?.mercyBead===n+1;
            const actionable=currentDot && state.structuredPlayStyle==='meditation';
            return actionable
              ? `<button class="divine-mercy-small-bead current actionable" type="button" data-rosary-advance="true" aria-label="Pray mercy prayer ${n+1} aloud, then continue"></button>`
              : `<i class="divine-mercy-small-bead${filled?' filled':''}${currentDot?' current':''}" aria-hidden="true"></i>`;
          }).join('');
          return `<div class="divine-mercy-decade${isCurrent?' current':''}${count===10?' complete':''}"><span class="divine-mercy-decade-label">${mi+1}</span>${large}<span class="divine-mercy-small-beads">${beads}</span><span class="divine-mercy-decade-count">${count}/10</span></div>`;
        }).join('')}
      </div>
      <div class="divine-mercy-conclusion">
        ${[0,1,2].map(i=>`<span class="divine-mercy-conclusion-bead ${holyGodDone[i]?'done':''} ${step?.id==='holy-god' && Number(step.label.match(/(\d+) of 3$/)?.[1]||1)-1===i?'current':''}"><i></i><small>${i+1}</small></span>`).join('')}
        <span class="divine-mercy-cross ${step?.closing&&step.id==='sign-of-cross'?'current':''}>✝</span>
      </div>`;
  }else{
    decades.innerHTML=Array.from({length:5},(_,mi)=>{
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
  }
  decades.querySelectorAll('[data-rosary-advance]').forEach(b=>b.addEventListener('click',completeStructuredMeditationStep));
}
function renderStructuredStep(){
  if(!structuredCurrent)return;
  renderRosaryProgress();
  const step=structuredCurrent.steps[structuredStepIndex];
  if(step.kind==='novena-intention'){
    $('verseText').innerHTML=`<div class="structured-mystery-card divine-mercy-novena-card"><span class="structured-mystery-kicker">DIVINE MERCY NOVENA · DAY ${step.novenaDay} OF 9</span><span class="structured-mystery-title">${escapeHtml(step.title)}</span><span class="structured-mystery-scripture">Pray this intention, then continue with the Divine Mercy Chaplet.</span><span class="structured-mystery-prompt">${escapeHtml(step.prompt)}</span><span class="structured-mystery-note">Pause here. Bring these people and needs to God before beginning the Chaplet.</span></div>`;
    $('typingInput').value='';$('typingInput').disabled=true;$('mysteryContinueBtn').hidden=false;$('meditationAction').hidden=true;$('progressFill').style.width='0%';$('progressLabel').textContent='PRAY';$('practiceCount').textContent=`Divine Mercy Novena · Day ${step.novenaDay}`;$('gameMessage').textContent='Pause with the intention, then continue to the Chaplet.';if($('prayerSource')) $('prayerSource').textContent='EWTN · Divine Mercy Novena';return;
  }
  if(step.kind==='mystery'){
    const divine=structuredCurrent.type==='divine-mercy';
    $('verseText').innerHTML=`<div class="structured-mystery-card">
      <span class="structured-mystery-kicker">${divine ? `DECADE ${step.decade+1} OF 5` : `MYSTERY ${step.mysteryIndex+1} OF 5`}</span>
      <span class="structured-mystery-title">${escapeHtml(divine ? `Divine Mercy · Decade ${step.decade+1}` : step.mysteryTitle)}</span>
      <span class="structured-mystery-scripture">${divine ? 'Chaplet · Five decades' : (step.scripture ? 'Scripture · '+escapeHtml(step.scripture) : '')}</span>
      <span class="structured-mystery-prompt">${escapeHtml(step.prompt || 'Take a quiet moment to contemplate this mystery.')}</span>
      <span class="structured-mystery-note">${divine ? 'Pause. Entrust yourself and the whole world to Divine Mercy, then begin the decade.' : 'Pause. Let the mystery settle before beginning the decade.'}</span>
    </div>`;
    $('typingInput').value='';
    $('typingInput').disabled=true;
    $('mysteryContinueBtn').hidden=false;
    $('meditationAction').hidden=true;
    $('progressFill').style.width='0%';$('progressLabel').textContent='0%';
    $('practiceCount').textContent=divine ? `Decade ${step.decade+1} of 5 · Divine Mercy` : `Mystery ${step.mysteryIndex+1} of 5 · ${structuredCurrent.set.name}`;
    $('gameMessage').textContent=divine ? `Decade ${step.decade+1} · pause, then begin the prayer.` : `${step.mysteryTitle} · meditate, then continue.`;
    if($('prayerSource')) $('prayerSource').textContent=structuredCurrent.set.source || 'EWTN · Structured Prayer';
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
    if($('prayerSource')) $('prayerSource').textContent=structuredCurrent.type==='divine-mercy-novena' ? 'EWTN · Divine Mercy Novena + Divine Mercy Chaplet' : 'EWTN · Rosary Prayers · Vatican · Rosarium Virginis Mariae';
    return;
  }
  $('meditationAction').hidden=true;
  $('verseText').classList.toggle('structured-long-prayer', structuredMode && /apostles.? creed/i.test(step.label||''));
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
  renderModeUI();renderPrayerPhrase();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:state.practicePlayStyle==='meditation'?100:0});
  $('practiceCount').textContent=`${prayerCurrent.short} · ${state.prayerPractice[prayerCurrent.id]||0} completed`;
  if($('prayerSource')) $('prayerSource').textContent=prayerCurrent.source;
  $('gameMessage').textContent=`Phrase 1 of ${prayerCurrent.phrases.length} — stay with the prayer.`;
  if(state.practicePlayStyle==='meditation') renderPrayerMeditation();
  save();
  if(focus && state.practicePlayStyle==='typing') $('typingInput').focus({preventScroll:true});
}
function selectPrayer(id){
  const p=prayers.find(x=>x.id===id); if(!p)return;
  prayerDeck.splice(0,prayerDeck.length,...prayerDeck.filter(x=>x.id!==id));
  prayerCurrent=p; prayerPhraseIndex=0; prayerStartedAt=0; prayerSessionCorrect=0; prayerSessionTyped=0; prayerSessionErrors=0; state.mode='prayer'; finished=false; combo=0; startedAt=0; stopTimer();
  $('prayerSelect').value=id;$('typingInput').value='';$('typingInput').disabled=false;
  renderModeUI();renderPrayerPhrase();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:state.practicePlayStyle==='meditation'?100:0});
  $('practiceCount').textContent=`${p.short} · ${state.prayerPractice[p.id]||0} completed`;
  $('gameMessage').textContent=`Phrase 1 of ${p.phrases.length} — stay with the prayer.`;
  if(state.practicePlayStyle==='meditation') renderPrayerMeditation();
  save();if(state.practicePlayStyle==='typing') $('typingInput').focus({preventScroll:true});
}
function renderPrayerPhrase(){
  if(!prayerCurrent)return;
  $('verseText').classList.remove('practice-meditation-card');
  $('verseText').removeAttribute('role');$('verseText').removeAttribute('tabindex');$('verseText').removeAttribute('aria-label');
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
  updateVerseMeta();
  if(state.practicePlayStyle==='meditation') renderScriptureMeditation();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:state.practicePlayStyle==='meditation'?100:0});
  $('gameMessage').textContent = focus ? 'Next passage — settle in and begin.' : 'Take a breath, then begin.';
  if(state.practicePlayStyle==='meditation') $('gameMessage').textContent='Read the passage slowly. Tap the words when you are ready for another verse.';
  if(state.practicePlayStyle==='typing') $('typingInput').focus({preventScroll:true});
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
  if(state.practicePlayStyle==='meditation') renderScriptureMeditation();
  updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:state.practicePlayStyle==='meditation'?100:0});
  $('gameMessage').textContent = 'Practice this verse again — one careful line at a time.';
  if(state.practicePlayStyle==='meditation') $('gameMessage').textContent='Read the passage slowly. Tap the words when you are ready for another verse.';
  if(state.practicePlayStyle==='typing') $('typingInput').focus({preventScroll:true});
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
  $('verseText').classList.remove('practice-meditation-card');
  $('verseText').removeAttribute('role');$('verseText').removeAttribute('tabindex');$('verseText').removeAttribute('aria-label');
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
function comboMultiplier(value=combo){
  return Math.min(2, 1 + Math.floor(Math.max(0,value)/5)*0.1);
}
function comboLabel(value=combo){
  return `${comboMultiplier(value).toFixed(1)}×`;
}
function updateGardenCombo(value=combo){
  const el=$('combo');
  if(el) el.textContent=value;
  const hero=$('gardenHero');
  if(hero) hero.dataset.combo=value;
}
function gardenComboPulse(value){
  // Intentionally quiet: combo milestones are shown in the HUD/message area
  // rather than spawning floating particles over the garden.
  const hero=$('gardenHero');
  if(hero) hero.dataset.combo=value;
}
function updateStats(s){
  $('liveWpm').textContent=s.wpm;
  $('accuracy').textContent=s.accuracy+'%';
  $('elapsed').textContent=time(s.seconds ?? s.ms/1000);
  $('errors').textContent=s.errors;
  $('liveCombo').textContent=s.combo;
  updateGardenCombo(s.combo);
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
  if(!['mystery','novena-intention'].includes(structuredCurrent.steps[structuredStepIndex]?.kind))return;
  structuredStepIndex++;finished=false;startedAt=0;combo=0;$('typingInput').disabled=false;$('typingInput').value='';
  renderModeUI();renderStructuredStep();updateStats({wpm:0,accuracy:100,seconds:0,errors:0,combo:0,progress:0});
  if(state.structuredPlayStyle==='typing') $('typingInput').focus({preventScroll:true});
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
  const practiceId=structuredCurrent.type==='divine-mercy'?'divine-mercy':structuredCurrent.type==='divine-mercy-novena'?'divine-mercy-novena':'rosary';
  state.structuredPractice[practiceId]=(state.structuredPractice[practiceId]||0)+1;
  state.structuredHistory.unshift({type:practiceId,title:structuredCurrent.title,mysterySet:structuredCurrent.set.name || structuredCurrent.set.novenaTitle,wpm:aggregateWpm,accuracy:aggregateAccuracy,errors:structuredSessionErrors,date:new Date().toISOString()});
  state.structuredHistory=state.structuredHistory.slice(0,60);state.totalStructuredPrayers=(state.totalStructuredPrayers||0)+1;
  prepToday();state.today.prayers=(state.today.prayers||0)+1;updateStreak();
  if(state.structuredPlayStyle==='typing'){
    state.bestWpm=Math.max(state.bestWpm,aggregateWpm);
    state.bestAccuracy=Math.max(state.bestAccuracy,aggregateAccuracy);
    state.bestCombo=Math.max(state.bestCombo,combo);
    state.today.bestCombo=Math.max(state.today.bestCombo,combo);
  }
  save();renderAll();gardenReact(aggregateAccuracy>=95);playTone('level');
  if(aggregateAccuracy>=95 || state.structuredPlayStyle==='meditation') showGardenMoment();
  showToast(`✦ ${structuredCurrent.title} completed`);
  $('gameMessage').textContent=`${structuredCurrent.title} complete · ${state.structuredPlayStyle==='meditation'?'prayer companion session completed':aggregateAccuracy+'% accuracy'} · the garden has journeyed with you.`;
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
  if(state.mode!=='structured' && state.practicePlayStyle==='meditation') return;
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
      const milestone = combo===5 || combo===10 || combo===20 || combo===30 || combo===50 || (combo>50 && combo%25===0);
      if(milestone){
        playTone('combo');
        gardenComboPulse(combo);
      }
    } else {
      combo=0;
      playTone('error');
    }
  }
  const s=calc();
  renderPrompt();
  updateStats({...s,seconds:s.ms/1000,combo});
  if(s.errors===0) $('gameMessage').textContent = combo>=5 ? `✦ ${combo}× flow · Bloom ${comboLabel()} ready — stay with the words.` : 'Keep going — the garden is listening.';
  else {
    let mismatch=-1;
    for(let i=0;i<Math.min(s.typed.length,s.text.length);i++){
      if(s.typed[i]!==s.text[i]){mismatch=i;break;}
    }
    $('gameMessage').textContent = mismatch>=0 && s.text[mismatch]===' '
      ? 'A space was missed. Press Space again and I’ll help place it.'
      : (combo===0 && previousLength>0 ? 'Combo reset — take a breath, correct it, and continue.' : 'A missed letter is only a breath. Correct it and continue.');
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
  const themePool=passages.filter(p=>p.theme===current.theme);
  const masteredBefore=themePool.filter(p=>state.practice[p.ref]).length;
  state.themeMastery[current.theme]=masteredBefore;
  updateStreak();

  const isPerfect=s.accuracy>=98 && s.errors===0;
  if(isPerfect){ state.perfectPassages++; state.perfectBestWpm=Math.max(state.perfectBestWpm,s.wpm); }
  const accuracyBonus = Math.round(s.accuracy/10);
  const comboBonus = Math.min(20,Math.floor(combo/2));
  const cleanBonus = s.errors===0 ? 5 : 0;
  const perfectBonus = isPerfect ? 10 : 0;
  const flowMultiplier = comboMultiplier(combo);
  const bloomGain = Math.max(8, Math.round((accuracyBonus + comboBonus + cleanBonus + perfectBonus) * flowMultiplier));
  const oldBloom=state.bloom;
  state.bloom += bloomGain;
  let levelUps=0;
  while(state.bloom>=100){
    state.level++;
    state.bloom-=100;
    levelUps++;
  }
  const levelUp=levelUps>0;
  const themeComplete=masteredBefore===themePool.length;
  const priorMilestone=state.themeMilestones[current.theme]||0;
  let themeMilestone=null;
  if(themeComplete && priorMilestone<100){ themeMilestone=100; state.themeMilestones[current.theme]=100; }
  else if(masteredBefore>=Math.ceil(themePool.length*.5) && priorMilestone<50){ themeMilestone=50; state.themeMilestones[current.theme]=50; }
  const stageInfo=updateGardenStage({celebrate:levelUp});
  if(levelUp){
    gardenBloom();
    advanceGarden(`Level ${state.level}`);
  }

  state.history.unshift({ref,wpm:s.wpm,accuracy:s.accuracy,combo,date:new Date().toISOString()});
  state.history=state.history.slice(0,60);
  save();
  renderAll();
  gardenReact(s.accuracy>=95);

  if(themeMilestone===100) showToast(`✿ ${current.theme} complete · every verse practiced`);
  else if(themeMilestone===50) showToast(`✦ ${current.theme} · halfway to theme mastery`);
  else if(isPerfect) showToast(`✦ PERFECT PASSAGE · +${bloomGain} Bloom · ${flowMultiplier.toFixed(1)}× flow`);
  else if(s.accuracy>=95) showToast(`Steady practice · +${bloomGain} Bloom · ${flowMultiplier.toFixed(1)}× flow`);
  else showToast(`Passage complete · +${bloomGain} Bloom · ${flowMultiplier.toFixed(1)}× flow`);
  if(levelUp){
    levelUpCelebration(state.level,stageInfo.stage);
  } else playTone('complete');
  if(s.accuracy>=95 && (state.totalPassages % 3 === 0 || levelUp)) showGardenMoment();

  $('gameMessage').textContent = levelUp
    ? `Garden level ${state.level} · ${stageInfo.stage.name}. ${stageInfo.stage.description}`
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
  // Garden response is deliberately non-animated during play.
  // Progression, Bloom, combo, and the garden scene itself provide feedback
  // without floating symbols competing with the Scripture text.
  const hero=$('gardenHero');
  if(hero) hero.dataset.reacted=good?'good':'steady';
}
function showToast(text){
  const t=$('toast');
  t.textContent=text;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),1800);
}

function renderWhatsNew(){
  const box=$('whatsNewList');
  if(!box) return;
  const items=[
    ['Phase 1 · Core garden feedback','Combos now give quiet HUD feedback at key milestones, keeping the Scripture text visually calm.'],
    ['Flow multiplier','Sustained combos increase Bloom rewards, up to 2.0×.'],
    ['Phase 2 · Garden progression','Bloom now drives persistent garden stages, level-up celebrations, and visible growth milestones.'],
    ['Phase 3 · Mastery','Perfect Passage recognition, accuracy rewards, persistent perfect counts, and theme completion milestones.'],
    ['Comfort polish','Typing and prayer text stay visually steady; the subtle garden scene fade remains.'],
    ['Phase 4 · Garden Moments','Occasional garden moments remain separate from the typing line so the Scripture text stays visually calm. They are gentle moments, not collectibles or inventory.'],
    ['Scripture expansion · Psalms','The Scripture library now includes 44 additional Psalm passages, including several longer Psalm challenges, bringing the library to 99 passages across 15 themes.'],
    ['Prayer Psalms','Eight additional Psalm passages are marked as prayer Psalms, with a dedicated Prayer Psalms practice deck for quiet petition, mercy, guidance, protection, and hope.'],
    ['Afternoon Garden','A new Afternoon Garden background joins Morning and Autumn, with the same peaceful GBA-inspired garden world and a cat resting in the scene.'],
    ['Starter Garden','A quieter starting scene now opens every session, with a Virgin Mary statue, one cat, and a vine-covered cottage. Use Change garden when you want a different garden.'],
    ['Scripture + Prayer Meditation','Scripture and Prayer now have their own calm Meditation Mode. Read the full passage or prayer, then tap the words to move to the next shuffled verse or prayer.']
  ];
  box.innerHTML=items.map(([title,body])=>`<article><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></article>`).join('');
}

function showGardenMoment(){
  const moment=$('gardenMoment');
  if(!moment || state.reduceMotion) return;
  const moments=[
    ['🦋','A butterfly pauses','A little visitor rests among the flowers.'],
    ['🐦','A quiet visitor','A garden bird settles nearby for a moment.'],
    ['✦','A soft glimmer','A few fireflies gather as the garden grows quiet.'],
    ['❀','A flower opens','A small flower has opened in the garden.'],
    ['🍃','A gentle breeze','The leaves seem to settle into a calmer rhythm.'],
    ['☀','A warm patch of light','A little sunlight finds its way through the garden.']
  ];
  const [icon,title,text]=moments[Math.floor(Math.random()*moments.length)];
  $('gardenMomentIcon').textContent=icon;
  $('gardenMomentTitle').textContent=title;
  $('gardenMomentText').textContent=text;
  moment.hidden=false;
  moment.classList.remove('show');
  void moment.offsetWidth;
  moment.classList.add('show');
  state.gardenMoments=(state.gardenMoments||0)+1;
  save();
  clearTimeout(window._gardenMomentTimer);
  window._gardenMomentTimer=setTimeout(()=>{ moment.classList.remove('show'); setTimeout(()=>{moment.hidden=true;},350); },3600);
}

function renderMastery(){
  const box=$('themeMastery'); if(!box) return;
  const rows=themes.map(theme=>{
    const items=passages.filter(p=>p.theme===theme);
    const practiced=items.filter(p=>state.practice[p.ref]).length;
    const pct=Math.round(practiced/items.length*100);
    const label=practiced===items.length?'Complete':`${practiced} / ${items.length}`;
    return `<article class=\"mastery-row ${pct===100?'complete':''}\"><div class=\"mastery-row-head\"><span>${escapeHtml(theme)}</span><b>${label}</b></div><div class=\"mastery-track\"><i style=\"width:${pct}%\"></i></div></article>`;
  }).join('');
  box.innerHTML=rows;
  if($('masteryPerfect')) $('masteryPerfect').textContent=`${state.perfectPassages} perfect passage${state.perfectPassages===1?'':'s'}`;
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
  renderMastery();
  $('goalPassages').textContent=Math.min(5,state.today.passages)+' / 5';
  $('goalAccuracy').textContent=(state.today.highAccuracy?'1':'0')+' / 1';
  $('goalCombo').textContent=Math.min(10,state.today.bestCombo)+' / 10';
  if($('goalPrayers')) $('goalPrayers').textContent=Math.min(1,state.today.prayers||0)+' / 1';
  $('bloomMessage').textContent=state.bloom>=80?'Almost there — let the garden bloom.':state.bloom>=50?'The garden is beginning to stir.':'Accurate typing fills the Bloom meter.';
  updateGardenStage();
  renderModeUI();
  setGardenBackground(state.gardenIndex);
  renderLibrary();
  renderWhatsNew();
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
    : `${passages.length} passages · ${practiced} theme${practiced===1?'':'s'} practiced`;
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
  if(state.practicePlayStyle==='meditation') return;
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
$('practiceTypingBtn').addEventListener('click',()=>setPracticePlayStyle('typing'));
$('practiceMeditationBtn').addEventListener('click',()=>setPracticePlayStyle('meditation'));
$('verseText').addEventListener('click',()=>{
  if(state.mode!=='structured' && state.practicePlayStyle==='meditation') advancePracticeMeditation();
});
$('verseText').addEventListener('keydown',e=>{
  if(state.mode==='structured' || state.practicePlayStyle!=='meditation') return;
  if(e.key==='Enter' || e.key===' '){e.preventDefault();advancePracticeMeditation();}
});
$('structuredSelect').addEventListener('change',()=>chooseStructured({focus:true}));
$('divineMercyNovenaDay')?.addEventListener('change',()=>{ if($('structuredSelect').value==='divine-mercy-novena') chooseStructured({focus:true}); });
$('structuredTypingBtn').addEventListener('click',()=>setStructuredPlayStyle('typing'));
$('structuredMeditationBtn').addEventListener('click',()=>setStructuredPlayStyle('meditation'));
$('meditationAction').addEventListener('click',completeStructuredMeditationStep);
$('mysteryContinueBtn').addEventListener('click',continueStructuredMystery);
$('prayerSelect').addEventListener('change',e=>selectPrayer(e.target.value));
$('themeSelect').addEventListener('change',()=>{ decks.delete(DECK_KEY()); choosePrompt(); });
$('newPromptBtn').addEventListener('click',()=>state.mode==='prayer'?choosePrayer({focus:true}):state.mode==='structured'?chooseStructured({focus:true}):choosePrompt());
$('changeGardenBtn').addEventListener('click',randomGarden);
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
$('whatsNewToggle')?.addEventListener('click',()=>{
  const panel=$('whatsNewPanel');
  const btn=$('whatsNewToggle');
  if(!panel||!btn)return;
  const open=panel.hidden;
  panel.hidden=!open;
  btn.setAttribute('aria-expanded',String(open));
  if($('whatsNewChevron')) $('whatsNewChevron').textContent=open?'−':'＋';
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
    state=mergeState({});state.gardenIndex=0;save();renderAll();choosePrompt();showToast('A fresh garden beginning.');
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
