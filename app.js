(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const STORE_KEY = "scripture-paws-release1-v1";
  // Douay-Rheims (Challoner revision) passages. The historical translation is public domain;
  // see README.md for edition/source notes.
  const prompts = {
    phrase: [
      {ref:"Psalm 22:1 (23:1)", category:"PSALM · DOUAY-RHEIMS", text:"The Lord ruleth me: and I shall want nothing."},
      {ref:"Philippians 4:13", category:"COURAGE · DOUAY-RHEIMS", text:"I can do all things in him who strengtheneth me."},
      {ref:"John 14:27", category:"PEACE · DOUAY-RHEIMS", text:"Peace I leave with you, my peace I give unto you."},
      {ref:"1 John 4:19", category:"LOVE · DOUAY-RHEIMS", text:"Let us therefore love God, because God first hath loved us."},
      {ref:"Psalm 118:105 (119:105)", category:"WISDOM · DOUAY-RHEIMS", text:"Thy word is a lamp to my feet, and a light to my paths."}
    ],
    verse: [
      {ref:"Matthew 11:28", category:"REST · DOUAY-RHEIMS", text:"Come to me, all you that labour, and are burdened, and I will refresh you."},
      {ref:"Philippians 4:6", category:"TRUST · DOUAY-RHEIMS", text:"Be nothing solicitous; but in every thing, by prayer and supplication, with thanksgiving, let your petitions be made known to God."},
      {ref:"1 Corinthians 13:4", category:"LOVE · DOUAY-RHEIMS", text:"Charity is patient, is kind: charity envieth not, dealeth not perversely; is not puffed up;"}
    ]
  };
  const botanicals = [
    {name:"Cosmos",file:"cosmos",group:"Flower",folder:"flowers"},{name:"Daisy",file:"daisy",group:"Flower",folder:"flowers"},
    {name:"Tulip",file:"tulip",group:"Flower",folder:"flowers"},{name:"Rose",file:"rose",group:"Flower",folder:"flowers"},
    {name:"Sunflower",file:"sunflower",group:"Flower",folder:"flowers"},{name:"Lavender",file:"lavender",group:"Flower",folder:"flowers"},
    {name:"Lily",file:"lily",group:"Flower",folder:"flowers"},{name:"Marigold",file:"marigold",group:"Flower",folder:"flowers"},
    {name:"Bluebells",file:"bluebells",group:"Flower",folder:"flowers"},{name:"Poppy",file:"poppy",group:"Flower",folder:"flowers"},{name:"Stargazer Lily",file:"stargazer-lily",group:"Flower",folder:"flowers"},{name:"Petunia",file:"petunia",group:"Flower",folder:"flowers"},{name:"Dandelion",file:"dandelion",group:"Flower",folder:"flowers"},
    {name:"Oak Tree",file:"oak-tree",group:"Tree",folder:"botanicals"},{name:"Cherry Tree",file:"cherry-tree",group:"Tree",folder:"botanicals"},
    {name:"Willow Tree",file:"willow-tree",group:"Tree",folder:"botanicals"},{name:"Apple Tree",file:"apple-tree",group:"Fruit Tree",folder:"botanicals"},{name:"Orange Tree",file:"orange-tree",group:"Fruit Tree",folder:"botanicals"},{name:"Pear Tree",file:"pear-tree",group:"Fruit Tree",folder:"botanicals"},{name:"Peach Tree",file:"peach-tree",group:"Fruit Tree",folder:"botanicals"},{name:"Ivy Vine",file:"ivy-vine",group:"Vine",folder:"botanicals"},
    {name:"Flowering Vine",file:"flowering-vine",group:"Vine",folder:"botanicals"},{name:"Grapevine",file:"grapevine",group:"Vine",folder:"botanicals"}
  ];
  const flowers = botanicals.map(item=>item.file);
  const flowerNames = botanicals.map(item=>item.name);
  let collectionView = "recent";
  function flowerAsset(name){const item=botanicals.find(entry=>entry.name===name);return item?"./assets/"+item.folder+"/"+item.file+".svg":"./assets/flowers/cosmos.svg";}
  const cats = [
    {name:"Miso",kind:"Curious tabby",sprite:"miso",unlock:0,quote:"I'm here for moral support."},
    {name:"Luna",kind:"Moonlit tuxedo",sprite:"luna",unlock:3,quote:"A little moonlight for your garden."},
    {name:"Clover",kind:"Garden calico",sprite:"clover",unlock:6,quote:"Let's help another flower grow."},
    {name:"Pip",kind:"Tiny ginger kitten",sprite:"pip",unlock:10,quote:"Tiny paws, big encouragement!"}
  ];
  let state = loadState();
  let current = null, startTime = null, timer = null, completed = false, errorsCount = 0, promptIndex = 0;

  function defaultState(){ return {bestWpm:0,bestAccuracy:0,versesCompleted:0,flowers:[],scores:[],sound:false,reduceMotion:false,unlockedCats:["Miso"],inventory:[],gardens:[],activeGardenId:null}; }
  function loadState(){
    try { const saved = JSON.parse(localStorage.getItem(STORE_KEY)); const loaded=saved && typeof saved==="object" ? {...defaultState(),...saved} : defaultState(); if(!Array.isArray(loaded.inventory))loaded.inventory=[]; if(!Array.isArray(loaded.gardens))loaded.gardens=[]; return loaded; }
    catch (_) { return defaultState(); }
  }
  function saveState(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (_) { setMessage("Progress could not be saved in this browser."); } }
  function setMessage(msg){ $("gameMessage").textContent = msg; }
  function activePrompts(){ return prompts[$("modeSelect").value]; }
  function choosePrompt(){
    const list=activePrompts();
    current=list[promptIndex % list.length]; promptIndex++;
    startTime=null; completed=false; errorsCount=0;
    if(timer){clearInterval(timer);timer=null;}
    $("typingInput").disabled=false; $("typingInput").value="";
    $("verseRef").textContent=current.ref; $("verseCategory").textContent=current.category;
    $("licensingNote").textContent="Douay-Rheims (Challoner revision) · public-domain Scripture text.";
    renderPrompt(0); updateStats(0,100,0,0); setPlantGrowth(0); setMessage("Your plant is ready when you are.");
    $("typingInput").focus({preventScroll:true});
  }
  function renderPrompt(position){
    const text=current.text, typed=$("typingInput").value;
    $("verseText").innerHTML="";
    for(let i=0;i<text.length;i++){
      const span=document.createElement("span"); span.textContent=text[i];
      if(i<typed.length) span.className=typed[i]===text[i]?"correct":"incorrect";
      else if(i===typed.length) span.className="current";
      $("verseText").appendChild(span);
    }
  }
  function stats(){
    const typed=$("typingInput").value, target=current.text;
    let correct=0, errors=0;
    for(let i=0;i<typed.length;i++){ if(i<target.length && typed[i]===target[i]) correct++; else errors++; }
    const elapsedMs=startTime?Math.max(1,Date.now()-startTime):0;
    const mins=elapsedMs/60000;
    const wpm=mins>0?Math.round((correct/5)/mins):0;
    const accuracy=typed.length?Math.round(correct/typed.length*100):100;
    const progress=Math.min(100,Math.round(correct/target.length*100));
    return {typed,target,correct,errors,elapsedMs,wpm,accuracy,progress};
  }
  function updateStats(wpm,accuracy,elapsed,errors){
    $("liveWpm").textContent=wpm; $("accuracy").textContent=accuracy+"%";
    $("elapsed").textContent=formatTime(elapsed/1000); $("errors").textContent=errors;
  }
  function formatTime(seconds){ seconds=Math.floor(seconds||0); return Math.floor(seconds/60)+":"+String(seconds%60).padStart(2,"0"); }
  function setPlantGrowth(percent){
    $("growthBar").style.width=percent+"%"; $("growthPercent").textContent=percent+"%";
    const stage=$("plantStage");
    stage.style.setProperty("--stem-height",(8+percent*0.85)+"px");
    stage.style.setProperty("--leaf-bottom",(18+percent*.45)+"px");
    stage.style.setProperty("--leaf-opacity",String(Math.min(1,percent/22)));
    stage.style.setProperty("--bloom-size",percent>=100?"34px":percent>=75?"18px":"0px");
    stage.style.setProperty("--bloom-bottom",(35+percent*.5)+"px");
    stage.dataset.stage = percent>=100 ? "bloom" : percent>=65 ? "bud" : percent>=25 ? "sprout" : "seed";
    if(percent>=100) stage.classList.add("blooming","toast"); else stage.classList.remove("blooming","toast");
  }
  function onInput(){
    if(completed || !current) return;
    const input=$("typingInput"), typed=input.value;
    if(typed.length && startTime===null){ startTime=Date.now(); timer=setInterval(tick,250); }
    // Don't allow text beyond the target; a completed exact match should be unambiguous.
    if(typed.length>current.text.length){input.value=typed.slice(0,current.text.length);}
    const s=stats(); errorsCount=s.errors;
    if(s.errors>0) setCatReaction("cat-react-oops");
    else if(s.progress>0 && s.progress<100) setCatReaction("cat-react-typing");
    renderPrompt(input.value.length); updateStats(s.wpm,s.accuracy,s.elapsedMs/1000,s.errors); setPlantGrowth(s.progress);
    if(s.errors===0 && s.typed.length===s.target.length && s.typed===s.target) completeRound(s);
    else if(s.errors>0) setMessage("A few letters need tending — you can correct them.");
    else setMessage("Lovely progress. Keep growing!");
  }
  function tick(){
    if(!startTime||completed)return;
    const s=stats(); updateStats(s.wpm,s.accuracy,s.elapsedMs/1000,s.errors);
  }
  function setCatReaction(reaction){
    [$("gardenCat"),$("buddyCat")].forEach(el=>{
      if(!el) return;
      el.classList.remove("cat-react-typing","cat-react-cheer","cat-react-oops");
      if(reaction) { void el.offsetWidth; el.classList.add(reaction); }
    });
  }
  function showCompanion(cat){
    const src="./assets/cats/"+cat.sprite+".svg";
    [$("gardenCat"),$("buddyCat")].forEach(el=>{const img=el&&el.querySelector("img");if(img) img.src=src;});
    const pillImg=document.querySelector(".pill-cat-sprite img"); if(pillImg) pillImg.src=src;
    const details=document.querySelector(".cat-details");
    if(details){details.querySelector("strong").textContent=cat.name;details.querySelector("small").textContent=cat.kind+" · Garden companion";}
    setCatReaction("");
  }
  function completeRound(s){
    completed=true; if(timer){clearInterval(timer);timer=null;}
    const elapsed=Math.max(1,s.elapsedMs), finalWpm=Math.round((s.correct/5)/(elapsed/60000));
    const result={ref:current.ref,wpm:finalWpm,accuracy:s.accuracy,time:formatTime(elapsed/1000),date:new Date().toISOString()};
    state.versesCompleted++; state.bestWpm=Math.max(state.bestWpm,finalWpm); state.bestAccuracy=Math.max(state.bestAccuracy,s.accuracy);
    const discovery=rollDiscovery();
    state.inventory.unshift({...discovery,id:makeId(),foundAt:new Date().toISOString(),source:current.ref});
    if(discovery.kind==="flower"||discovery.kind==="tree"||discovery.kind==="fruit-tree"||discovery.kind==="vine")state.flowers.unshift({symbol:discovery.file,name:discovery.name,ref:current.ref,wpm:finalWpm,accuracy:s.accuracy,group:discovery.kind});
    if(discovery.kind==="cat"&&!state.unlockedCats.includes(discovery.name))state.unlockedCats.push(discovery.name);
    state.scores.unshift(result); state.scores=state.scores.slice(0,10); ensureGarden(); saveState(); renderSaved(); renderBuilder();
    $("typingInput").disabled=true; setMessage("A new "+discovery.rarity.toLowerCase()+" discovery: "+discovery.name+"! Add it to your garden.");
    $("builderMessage").textContent="New discovery: "+discovery.name+" · "+discovery.rarity+". Tap it in your collection to place it.";
    const companion=discovery.kind==="cat"?(cats.find(c=>c.name===discovery.name)||cats[0]):([...cats].reverse().find(cat=>state.unlockedCats.includes(cat.name))||cats[0]);
    showCompanion(companion); setCatReaction("cat-react-cheer");
    $("catSpeech").textContent="“"+companion.quote+"”";
    $("finalWpm").textContent=finalWpm; $("finalAccuracy").textContent=s.accuracy+"%"; $("finalTime").textContent=result.time;
    $("completionText").textContent="You finished "+current.ref+" and discovered "+discovery.name+" ("+discovery.rarity+"). Add your new find to an isometric garden, then save your world to the gallery.";
    $("completionModal").hidden=false; $("continueBtn").focus();
  }
  function renderSaved(){
    $("bestWpm").textContent=state.bestWpm||"—"; $("flowerCount").textContent=state.flowers.length;
    $("recordWpm").textContent=state.bestWpm; $("recordAccuracy").textContent=state.bestAccuracy?state.bestAccuracy+"%":"—";
    $("recordVerses").textContent=state.versesCompleted; $("versesCompleted").textContent=state.versesCompleted+" verses completed";
    $("collectionCount").textContent=state.flowers.length+" botanical find"+(state.flowers.length===1?"":"s");
    const collection=$("flowerCollection"); collection.innerHTML="";
    collection.classList.toggle("variety-view",collectionView==="varieties");
    document.querySelectorAll("[data-collection-view]").forEach(btn=>{const active=btn.dataset.collectionView===collectionView;btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));});
    if(collectionView==="varieties"){
      botanicals.forEach((item,index)=>{
        const name=item.name; const count=state.flowers.filter(f=>f.name===name).length;
        const tile=document.createElement("div");tile.className="flower-variety botanical-variety "+item.group.toLowerCase()+(count?" collected":"");
        const img=document.createElement("img");img.src=flowerAsset(name);img.alt="";img.loading="lazy";
        const label=document.createElement("b");label.textContent=name;
        const type=document.createElement("small");type.textContent=item.group;
        const number=document.createElement("small");number.textContent=count?count+" collected":"Not found yet";
        tile.append(img,label,type,number);tile.title=name+" ("+item.group+"): "+(count?count+" collected":"not collected yet");collection.appendChild(tile);
      });
    } else if(!state.flowers.length){collection.innerHTML='<div class="empty-flower">✿</div><div class="empty-copy"><b>Your first botanical find awaits.</b><small>Finish a prompt to discover flowers, fruit trees, vines, and other botanical treasures.</small></div>';}
    else state.flowers.slice(0,8).forEach((f,index)=>{
      const el=document.createElement("div");el.className="flower-tile";el.title=(f.name||"Flower")+" · "+f.ref+" · "+f.wpm+" WPM";
      const img=document.createElement("img");img.src=flowerAsset(f.name);img.alt=f.name||"Flower";img.loading="lazy";
      const small=document.createElement("small");small.textContent="#"+(index+1);el.append(img,small);collection.appendChild(el);
    });
    const catGrid=$("catCollection"); catGrid.innerHTML="";
    cats.forEach(cat=>{
      const unlocked=state.unlockedCats.includes(cat.name);
      const tile=document.createElement("div"); tile.className="cat-collect-tile"+(unlocked?"":" locked-cat");
      const icon=document.createElement("span"); icon.className="cat-collect-icon";
      if(unlocked){const img=document.createElement("img");img.src="./assets/cats/"+cat.sprite+".svg";img.alt="";img.loading="lazy";icon.appendChild(img);}else{icon.textContent="?";}
      const name=document.createElement("b"); name.textContent=unlocked?cat.name:"???";
      const note=document.createElement("small"); note.textContent=unlocked?cat.kind:"Find through random discoveries";
      if(unlocked){tile.title=cat.name+" — "+cat.kind;tile.setAttribute("aria-label",cat.name+", "+cat.kind);}
      tile.append(icon,name,note); catGrid.appendChild(tile);
    });
    $("catUnlockCount").textContent=state.unlockedCats.length+" / "+cats.length+" found";
    const rows=$("scoreRows"); rows.innerHTML="";
    if(!state.scores.length){rows.innerHTML='<tr><td colspan="3" class="empty-row">Your completed rounds will appear here.</td></tr>';}
    else state.scores.slice(0,5).forEach(s=>{const tr=document.createElement("tr");[s.ref,s.wpm+" WPM",s.accuracy+"%"].forEach(v=>{const td=document.createElement("td");td.textContent=v;tr.appendChild(td);});rows.appendChild(tr);});
  }
  const creatureDefs=[
    {name:"Songbird",file:"songbird",folder:"creatures",kind:"creature",rarity:"Common",note:"A bright little singer"},
    {name:"Rabbit",file:"rabbit",folder:"creatures",kind:"creature",rarity:"Common",note:"A shy garden hopper"},
    {name:"Turtle",file:"turtle",folder:"creatures",kind:"creature",rarity:"Uncommon",note:"A slow and steady friend"},
    {name:"Skunk",file:"skunk",folder:"creatures",kind:"creature",rarity:"Rare",note:"A sweet-natured night visitor"},
    {name:"Squirrel",file:"squirrel",folder:"creatures",kind:"creature",rarity:"Uncommon",note:"A nimble acorn collector"},
    {name:"Chipmunk",file:"chipmunk",folder:"creatures",kind:"creature",rarity:"Rare",note:"A tiny seed stasher"},
    {name:"Unicorn",file:"unicorn",folder:"creatures",kind:"creature",rarity:"Legendary",note:"A moonlit mythical visitor"},
    {name:"Phoenix",file:"phoenix",folder:"creatures",kind:"creature",rarity:"Legendary",note:"A bright-hearted firebird"},
    {name:"Horse",file:"horse",folder:"creatures",kind:"creature",rarity:"Uncommon",note:"A gentle meadow friend"},
    {name:"Fox",file:"fox",folder:"creatures",kind:"creature",rarity:"Uncommon",note:"A clever dusk wanderer"},
    {name:"Wolf",file:"wolf",folder:"creatures",kind:"creature",rarity:"Rare",note:"A quiet woodland guardian"},
    {name:"Deer / Fawn",file:"deer",folder:"creatures",kind:"creature",rarity:"Rare",note:"A gentle forest visitor"},
    {name:"Owl",file:"owl",folder:"creatures",kind:"creature",rarity:"Very Rare",note:"A wise night watcher"}
  ];
  const allElements=[
    ...botanicals.map((b,i)=>({...b,kind:b.group==="Flower"?"flower":b.group==="Tree"?"tree":b.group==="Fruit Tree"?"fruit-tree":"vine",rarity:["Common","Common","Uncommon","Uncommon","Rare","Common","Uncommon","Common","Rare","Very Rare","Uncommon","Uncommon","Rare","Very Rare","Common","Rare","Uncommon","Rare"][i],note:b.group})),
    ...cats.map((c,i)=>({name:c.name,file:c.sprite,folder:"cats",kind:"cat",rarity:["Common","Rare","Very Rare","Uncommon"][i],note:c.kind})),
    ...creatureDefs,
    {name:"Golden Sunflower",file:"sunflower",folder:"flowers",kind:"flower",rarity:"Legendary",group:"Flower",note:"A radiant golden bloom",special:"golden"}
  ];
  const rarityWeight={Common:55,Uncommon:27,Rare:13,"Very Rare":4,Legendary:1};
  const gridCols=10,gridRows=8;
  function makeId(){return "g"+Date.now().toString(36)+Math.random().toString(36).slice(2,8);}
  function assetFor(item){return "./assets/"+item.folder+"/"+item.file+".svg";}
  function rollDiscovery(){
    const roll=Math.random()*100;let sum=0,rarity="Common";
    for(const [tier,weight] of Object.entries(rarityWeight)){sum+=weight;if(roll<sum){rarity=tier;break;}}
    let eligible=allElements.filter(e=>e.rarity===rarity);
    if(!eligible.length)eligible=allElements.filter(e=>e.rarity==="Common");
    const item=eligible[Math.floor(Math.random()*eligible.length)];
    return {...item,rarity};
  }
  function ensureGarden(){
    if(!state.gardens.length){const garden={id:makeId(),name:"My Scripture Garden",elements:[],updatedAt:new Date().toISOString()};state.gardens.push(garden);state.activeGardenId=garden.id;}
    if(!state.gardens.some(g=>g.id===state.activeGardenId))state.activeGardenId=state.gardens[0].id;
    if(!Array.isArray(state.inventory))state.inventory=[];
  }
  function activeGarden(){ensureGarden();return state.gardens.find(g=>g.id===state.activeGardenId)||state.gardens[0];}
  function footprint(item){return item.kind==="tree"||item.kind==="fruit-tree"?{w:2,h:3}:item.kind==="cat"?{w:2,h:2}:item.kind==="vine"?{w:2,h:1}:{w:1,h:1};}
  function occupiedCells(elements){const cells=new Set();elements.forEach(e=>{const f=footprint(e);for(let x=e.gx;x<e.gx+f.w;x++)for(let y=e.gy;y<e.gy+f.h;y++)cells.add(x+","+y);});return cells;}
  function findRandomPosition(item,elements){const f=footprint(item),occupied=occupiedCells(elements),spots=[];for(let y=0;y<=gridRows-f.h;y++)for(let x=0;x<=gridCols-f.w;x++){let free=true;for(let dx=0;dx<f.w;dx++)for(let dy=0;dy<f.h;dy++)if(occupied.has((x+dx)+","+(y+dy)))free=false;if(free)spots.push({gx:x,gy:y});}if(!spots.length)return null;return spots[Math.floor(Math.random()*spots.length)];}
  function addToGarden(inventoryId){
    const garden=activeGarden(),item=state.inventory.find(i=>i.id===inventoryId);if(!item)return;
    if(garden.elements.length>=50){$("builderMessage").textContent="This garden has reached its 50-element limit. Start or open another garden to keep building.";return;}
    const pos=findRandomPosition(item,garden.elements);if(!pos){$("builderMessage").textContent="This garden is full. Remove an element or start a new garden.";return;}
    garden.elements.push({...item,placedId:makeId(),...pos});garden.updatedAt=new Date().toISOString();saveState();renderBuilder();
    $("builderMessage").textContent=item.name+" placed at a random isometric grid position. Its footprint is reserved so other elements won't overlap it.";
  }
  function renderBuilder(){
    if(!$("isometricGarden"))return;ensureGarden();const garden=activeGarden();
    $("gardenNameInput").value=garden.name;$("gardenElementCount").textContent=garden.elements.length+" / 50 elements";
    const board=$("isometricGarden");board.querySelectorAll(".iso-item").forEach(n=>n.remove());$("isoEmptyNote").hidden=garden.elements.length>0;
    const ordered=[...garden.elements].sort((a,b)=>(a.gy+footprint(a).h)-(b.gy+footprint(b).h));
    ordered.forEach(item=>{const btn=document.createElement("button");btn.type="button";btn.className="iso-item "+item.kind;btn.title=item.name+" · "+item.rarity+" — tap to remove";btn.setAttribute("aria-label",btn.title);const f=footprint(item);btn.style.left=((item.gx+f.w/2)/gridCols*100)+"%";btn.style.top=((item.gy+f.h*.68)/gridRows*100)+"%";btn.style.zIndex=String(10+item.gy*10+f.h);const img=document.createElement("img");img.src=assetFor(item);img.alt="";if(item.special)img.classList.add(item.special);btn.appendChild(img);btn.addEventListener("click",()=>{if(confirm("Remove "+item.name+" from this garden? It will remain in your discoveries.")){garden.elements=garden.elements.filter(e=>e.placedId!==item.placedId);saveState();renderBuilder();}});board.appendChild(btn);});
    $("inventoryCount").textContent=state.inventory.length+" discoveries";const inv=$("gardenInventory");inv.innerHTML="";
    if(!state.inventory.length){inv.innerHTML='<p class="small-copy">No discoveries yet. Finish a passage to receive your first random plant, cat, or creature.</p>';}
    state.inventory.forEach(item=>{const btn=document.createElement("button");btn.type="button";btn.className="inventory-item rarity-"+item.rarity.toLowerCase().replace(/\s+/g,"-");btn.disabled=garden.elements.length>=50;btn.title="Place "+item.name+" at a random open position";const img=document.createElement("img");img.src=assetFor(item);img.alt="";if(item.special)img.classList.add(item.special);const name=document.createElement("b");name.textContent=item.name;const rarity=document.createElement("small");rarity.textContent=item.rarity;btn.append(img,name,rarity);btn.addEventListener("click",()=>addToGarden(item.id));inv.appendChild(btn);});
    const gallery=$("gardenGallery");gallery.innerHTML="";state.gardens.forEach(g=>{const card=document.createElement("article");card.className="gallery-card";const preview=document.createElement("div");preview.className="gallery-preview";g.elements.slice(0,8).forEach((it,index)=>{const im=document.createElement("img");im.src=assetFor(it);im.alt="";im.style.left=(10+(index%4)*22)+"%";im.style.top=(10+Math.floor(index/4)*40)+"%";preview.appendChild(im);});const title=document.createElement("h4");title.textContent=g.name;const meta=document.createElement("p");meta.textContent=g.elements.length+" / 50 elements"+(g.id===state.activeGardenId?" · Current garden":"");const actions=document.createElement("div");actions.className="gallery-actions";const open=document.createElement("button");open.className="secondary-button";open.type="button";open.textContent=g.id===state.activeGardenId?"Current":"Open";open.disabled=g.id===state.activeGardenId;open.addEventListener("click",()=>{state.activeGardenId=g.id;saveState();renderBuilder();});const rename=document.createElement("button");rename.className="secondary-button";rename.type="button";rename.textContent="Rename";rename.addEventListener("click",()=>{const next=prompt("Name this garden",g.name);if(next&&next.trim()){g.name=next.trim().slice(0,32);saveState();renderBuilder();}});actions.append(open,rename);card.append(preview,title,meta,actions);gallery.appendChild(card);});
  }
  $("saveGardenBtn").addEventListener("click",()=>{const garden=activeGarden(),name=$("gardenNameInput").value.trim();garden.name=name||"Untitled Garden";garden.updatedAt=new Date().toISOString();saveState();renderBuilder();$("builderMessage").textContent="Garden saved to your local gallery.";});
  $("newGardenBtn").addEventListener("click",()=>{if(state.gardens.length>=20){$("builderMessage").textContent="You can save up to 20 gardens on this device.";return;}const garden={id:makeId(),name:"Garden "+(state.gardens.length+1),elements:[],updatedAt:new Date().toISOString()};state.gardens.push(garden);state.activeGardenId=garden.id;saveState();renderBuilder();$("builderMessage").textContent="A new garden is ready to decorate.";});

  const whatsNewPanel = $("whatsNewPanel");
  $("whatsNewBtn").addEventListener("click", () => {
    whatsNewPanel.hidden = !whatsNewPanel.hidden;
    if (!whatsNewPanel.hidden) whatsNewPanel.scrollIntoView({behavior: state.reduceMotion ? "auto" : "smooth", block:"start"});
  });
  $("closeWhatsNewBtn").addEventListener("click", () => {
    whatsNewPanel.hidden = true;
    $("whatsNewBtn").focus();
  });
  document.querySelectorAll("[data-collection-view]").forEach(btn=>btn.addEventListener("click",()=>{collectionView=btn.dataset.collectionView;renderSaved();}));
  $("typingInput").addEventListener("input",onInput);
  $("modeSelect").addEventListener("change",()=>{promptIndex=0;choosePrompt();});
  $("newPromptBtn").addEventListener("click",choosePrompt);
  $("resetBtn").addEventListener("click",()=>choosePrompt());
  $("continueBtn").addEventListener("click",()=>{$("completionModal").hidden=true;choosePrompt();});
  $("soundToggle").addEventListener("change",e=>{state.sound=e.target.checked;saveState();});
  $("motionToggle").addEventListener("change",e=>{state.reduceMotion=e.target.checked;document.body.classList.toggle("reduce-motion",state.reduceMotion);saveState();});
  $("exportBtn").addEventListener("click",()=>{
    const blob=new Blob([JSON.stringify({app:"Scripture Paws",version:1,exportedAt:new Date().toISOString(),state},null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="scripture-paws-garden.json";a.click();URL.revokeObjectURL(url);
    setMessage("Garden data exported.");
  });
  $("clearBtn").addEventListener("click",()=>{
    if(confirm("Reset all Scripture Paws progress on this device? This cannot be undone.")){state=defaultState();ensureGarden();saveState();renderSaved();renderBuilder();choosePrompt();setMessage("Your garden has a fresh start.");}
  });
  if(state.reduceMotion){document.body.classList.add("reduce-motion");$("motionToggle").checked=true;}
  $("soundToggle").checked=!!state.sound; ensureGarden(); renderSaved(); renderBuilder(); showCompanion(cats[0]); choosePrompt();
  if("serviceWorker" in navigator && location.protocol.startsWith("http")) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
})();