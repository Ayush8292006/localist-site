/* ===== helpers ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const inr=n=>'₹'+Number(n).toLocaleString('en-IN');
function hash(s){let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h)}
function rng(seed){let s=(seed%2147483646)+1;return()=>(s=s*16807%2147483647)/2147483647}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),3000)}
const ini=n=>n.replace(/[^A-Za-z ]/g,'').split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
function rel(ts){const m=Math.round((Date.now()-ts)/60000);if(m<1)return'Just now';if(m<60)return m+' min ago';const h=Math.round(m/60);if(h<24)return h+' hr ago';const d=Math.round(h/24);return d===1?'Yesterday':d+' days ago'}
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ===== icons ===== */
const I={
 arrow:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 star:'<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z"/></svg>',
 check:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 12 5 5 9-10"/></svg>',
 shield:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
 pin:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
 grid:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
 search:'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
 verify:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
 local:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8" fill="currentColor"/></svg>',
 chat:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/></svg>',
 users:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14c2 .8 3.5 3 3.5 6"/></svg>',
 bell:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 0 0 4 0"/></svg>',
 cal:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
 dot:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>'
};

/* ===== data ===== */
const LM={Jaipur:'palace',Delhi:'arch',Mumbai:'gate',Lucknow:'dome',Agra:'dome',Varanasi:'temple',Madurai:'temple',Bhubaneswar:'temple',Noida:'towers',Gurugram:'towers',Pune:'towers',Bengaluru:'towers',Hyderabad:'charminar',Indore:'palace',Udaipur:'palace',Kochi:'bridge',Patna:'dome',Chandigarh:'towers',Surat:'bridge',Bhopal:'dome',Dehradun:'hills',Guwahati:'hills',Mysuru:'palace',Vadodara:'palace'};
const CITIES=[
 ['Jaipur','Rajasthan','live','Pink walls, bazaars and block-print ateliers'],['Delhi','Delhi NCR','live','Old lanes, new markets, endless food'],
 ['Noida','Uttar Pradesh','live','Planned sectors and growing startups'],['Gurugram','Haryana','live','Towers, cafés and corporate parks'],
 ['Lucknow','Uttar Pradesh','live','Chikankari, kebabs and old-world courtesy'],['Mumbai','Maharashtra','live','The city that never stops working'],
 ['Pune','Maharashtra','live','Colleges, IT parks and weekend hills'],['Indore','Madhya Pradesh','live','Clean streets and famous street food'],
 ['Patna','Bihar','live','River ghats and a fast-growing market'],['Bengaluru','Karnataka','live','Gardens, tech and filter coffee'],
 ['Hyderabad','Telangana','opening','Pearls, biryani and HITEC City'],['Varanasi','Uttar Pradesh','opening','Ghats, silk and morning aarti'],
 ['Chandigarh','Punjab','live','Sectors, gardens and calm roads'],['Surat','Gujarat','opening','Diamonds, textiles and snacks'],
 ['Kochi','Kerala','opening','Backwaters, spice markets and ports'],['Udaipur','Rajasthan','opening','Lakes, palaces and wedding venues'],
 ['Agra','Uttar Pradesh','available','Marble, leather and petha'],['Bhopal','Madhya Pradesh','available','Lakes and a calm old city'],
 ['Dehradun','Uttarakhand','available','Schools, hills and cafés'],['Guwahati','Assam','available','Gateway to the Northeast'],
 ['Madurai','Tamil Nadu','available','Temple town, jasmine markets'],['Mysuru','Karnataka','available','Silk, sandalwood and palaces'],
 ['Bhubaneswar','Odisha','available','Temple city and new campuses'],['Vadodara','Gujarat','available','Garba, palaces and industry']
].map(([n,s,st,line])=>({n,s,st,st0:st,line,d:n.toLowerCase()+'.localist.in',lm:LM[n]||'towers'}));
const AREAS=['Malviya Nagar','Station Road','Civil Lines','Vaishali Nagar','Sadar Bazaar','Gandhi Nagar','Shastri Nagar','MG Road','Old City','Ring Road','Mansarovar','Raja Park'];

const GROUPS=[{id:'daily',n:'Daily needs'},{id:'health',n:'Health & beauty'},{id:'learn',n:'Learning'},{id:'work',n:'Work & money'},{id:'home',n:'Property & vehicles'},{id:'travel',n:'Travel & events'},{id:'family',n:'Family & community'}];
const MODE={enquiry:'Enquiry',booking:'Booking',order:'Order online',donate:'Donate'};
const CATS=[
 {id:'food',n:'Online Food',g:'daily',m:'order',ph:3,d:'Order from local kitchens, dhabas and cafés',was:'Online Food',names:['Rasoi Ghar','Baati Junction','Chai Sutta Point','Annapurna Bhojnalaya','Spice Lane Kitchen','Momo Mahal']},
 {id:'grocery',n:'Online Grocery',g:'daily',m:'order',ph:3,d:'Grocery stores and fresh produce, delivered the same day',was:'Online Grocery',names:['Gupta Kirana Store','Fresh Basket Mart','Daily Needs Supermart','Organic Mandi','Bansal General Store']},
 {id:'shopping',n:'Shopping',g:'daily',m:'order',ph:2,d:'Local boutiques, electronics and handicrafts',was:'Shopping',names:['Libas Boutique','Sharma Electronics','Footprint Shoes','Kala Handicrafts','Rang Bandhej House']},
 {id:'pickup',n:'Pick Up & Drop',g:'daily',m:'booking',ph:3,d:'Parcels, laundry and errands picked from your door',was:'Pick Up',names:['QuickDrop Couriers','Laundry Pickup Co.','Errand Bhai','Parcel Point']},
 {id:'doctor',n:'Doctors & Labs',g:'health',m:'booking',ph:1,d:'Book clinic visits and home sample collection',was:'Search Doctor & Lab',names:['Dr. Mehta Dental Clinic','Arogya Diagnostics','Shanti Child Care','City Path Lab','Dr. Rao Skin Clinic','Jeevan Physiotherapy']},
 {id:'spa',n:'Spa & Beauty',g:'health',m:'booking',ph:1,d:'Salons, spas, mehendi and bridal makeup',was:'SPA and Beauty',names:['Glow Salon & Spa','Kesh Kala Unisex Salon','Mehendi by Ritu','Tranquil Ayurveda Spa']},
 {id:'school',n:'Schools',g:'learn',m:'enquiry',ph:1,d:'Compare schools, fees and admission dates',was:'School',names:['St. Xavier Sr. Sec. School','Little Steps Play School','Vidya Niketan','Bloom International School']},
 {id:'tutor',n:'Tutors & Coaching',g:'learn',m:'enquiry',ph:1,d:'Home tutors, coaching centres and hobby classes',was:'Tutor',names:['Sharma Maths Classes','Target IIT Academy','Spoken English Hub','Ms. Kapoor Piano Lessons','Saraswati Tuition Centre']},
 {id:'books',n:'Books',g:'learn',m:'order',ph:2,d:'School sets, exam guides and novels from local stores',was:'Online Book',names:['Pustak Mahal','Exam Guide Store','Readers Corner','Second Chapter Books']},
 {id:'intern',n:'Internships',g:'learn',m:'enquiry',ph:1,d:'Paid and unpaid internships at local firms',was:'Internships',names:['PixelCraft Studio','GreenLeaf NGO','Bharat Fintech Labs','Local Media House']},
 {id:'job',n:'Jobs',g:'work',m:'enquiry',ph:1,d:'Local openings, apply in one tap',was:'Job',names:['Accountant · Agarwal & Co.','Delivery Partner · QuickDrop','Sales Executive · AutoHub','Receptionist · Arogya Clinic','Teacher · Vidya Niketan']},
 {id:'loan',n:'Loans',g:'work',m:'enquiry',ph:1,d:'Home, business, gold and vehicle loan advisors',was:'Loan',names:['Shree Finance','HomeFirst Loan Desk','Gold Loan Point','Vyapar Credit Advisors']},
 {id:'company',n:'Companies & B2B',g:'work',m:'enquiry',ph:1,d:'Manufacturers, suppliers and service firms',was:'Company',names:['Mehra Packaging Pvt Ltd','Sunrise Textiles','Nexa IT Services','Royal Marble Exports']},
 {id:'franchise',n:'Franchise Opportunities',g:'work',m:'enquiry',ph:1,d:'Start a franchise of a proven local brand',was:'Franchise',names:['Momo Station Franchise','Smart Kids Preschool','PrintHub Xerox Centre','FitZone Gym']},
 {id:'property',n:'Property',g:'home',m:'enquiry',ph:1,d:'Buy, sell and rent homes, shops and plots',was:'Property',names:['2 BHK Flat · Malviya Nagar','Shop for rent · Station Road','Plot 200 sq yd · Ajmer Road','Shubh Properties','1 RK for students · Raja Park']},
 {id:'vehicle',n:'Used Vehicles',g:'home',m:'enquiry',ph:1,d:'Second-hand cars, bikes and scooters',was:'Old Vehicle Sell',names:['Swift VXi 2019 · 42,000 km','Activa 6G · 2021','Bolero 2017 · Diesel','Classic 350 · 2020']},
 {id:'buysell',n:'Buy & Sell',g:'home',m:'enquiry',ph:1,d:'Furniture, appliances and anything second-hand',was:'Buysell',names:['Sofa set · 5 seater','Study table with chair','Refrigerator 190 L','Office chairs (10)']},
 {id:'cab',n:'Cab Booking',g:'travel',m:'booking',ph:3,d:'Local taxis, airport drops and outstation trips',was:'Cab Booking',names:['Shree Ram Travels','City Cabs 24x7','Airport Taxi Seva','Tempo Traveller Hire']},
 {id:'tourism',n:'Tourism',g:'travel',m:'booking',ph:2,d:'City walks, day trips and weekend packages',was:'Tourism',names:['Heritage Walk, Old City','Desert Camp Weekend','Pink City Tours','Hill Fort Day Trip']},
 {id:'event',n:'Events',g:'travel',m:'booking',ph:2,d:'Melas, concerts, workshops and meetups',was:'Event',names:['Sufi Night at Town Hall','Diwali Mela 2026','Startup Meetup','Kids Art Workshop']},
 {id:'matrimony',n:'Matrimony',g:'family',m:'enquiry',ph:1,d:'Verified profiles from your community',was:'Matrimony',names:['Samaj Rishte Bureau','Vivah Bandhan','Second Innings Matrimony','Professional Matches']},
 {id:'marriage',n:'Wedding Services',g:'family',m:'enquiry',ph:1,d:'Caterers, decorators, banquets and photographers',was:'Marriage Services',names:['Shubh Mangal Caterers','Rangoli Decorators','Royal Garden Banquet','Click Moments Photography','Dhol Baaje Band']},
 {id:'fundraiser',n:'Fundraisers',g:'family',m:'donate',ph:2,d:'Verified local causes you can support',was:'Fundraiser',names:['Help Riya’s heart surgery','Library for Govt. School','Gaushala Shelter Fund','Flood Relief, Ward 12']}
];
const CAT=Object.fromEntries(CATS.map(c=>[c.id,c]));
const PLATFORM=[
 {was:'Coupon',n:'Deals & coupons',ph:1,d:'Any listing can carry an offer, shown on cards and in a city deals strip.'},
 {was:'News',n:'City news',ph:2,d:'A light local news feed written by the city team. Brings people back daily.'},
 {was:'Mybusiness',n:'Business dashboard',ph:1,d:'The owner’s panel to edit the listing, reply to enquiries, add offers and see results.'},
 {was:'Partners',n:'Partner program',ph:2,d:'Folded into the franchise and channel-partner flow, not a public listing category.'}
];
const ITEMS={
 food:[['Dal Baati Churma',220],['Paneer Butter Masala',260],['Veg Thali',180],['Masala Chai (2)',40],['Gulab Jamun (4)',90]],
 grocery:[['Wheat Atta 5 kg',245],['Toor Dal 1 kg',165],['Basmati Rice 5 kg',540],['Mustard Oil 1 L',185],['Fresh Paneer 200 g',90]],
 shopping:[['Cotton Kurta',899],['Block-print Dupatta',650],['Bluetooth Speaker',1499],['Leather Juttis',1199]],
 books:[['NCERT Set, Class 10',1450],['UPSC Polity Guide',520],['Hindi Novel Collection',399],['Kids Story Pack',299]]
};
const HL={
 food:['Pure veg kitchen','Delivery in 35 min','Thali under ₹200','Party orders'],grocery:['Same-day delivery','Pay on delivery','Loose grains and pulses','Monthly grocery list'],
 shopping:['Try at store','Easy exchange','Festive collection','Card and UPI'],pickup:['Doorstep pickup','Live tracking','Same-city delivery','From ₹49'],
 doctor:['Walk-in and booked visits','Home sample collection','Reports on WhatsApp','Cashless for 12 insurers'],spa:['Women and men','Bridal packages','Hygiene certified','Home service'],
 school:['CBSE affiliated','Transport facility','Smart classrooms','Admissions open'],tutor:['Free demo class','Small batches','Home and online','Weekly tests'],
 books:['New and used books','School sets','Delivery in 2 days','Buyback on old books'],intern:['Stipend offered','Certificate','Work from office','2 to 3 months'],
 job:['Full time','Salary ₹15k to ₹25k','Freshers can apply','Interview this week'],loan:['Quick approval','Low documentation','Doorstep KYC','Compare banks'],
 company:['GST registered','Bulk orders','Pan-India supply','Since 2006'],franchise:['Low investment','Training included','Marketing support','Payback in 18 months'],
 property:['RERA listed','Owner listed','Visit this week','Bank loan available'],vehicle:['Single owner','Insurance valid','Service record','Test drive at home'],
 buysell:['Seller verified','Pickup from seller','Price negotiable','Good condition'],cab:['AC cars','Airport transfers','Outstation trips','Driver verified'],
 tourism:['Local guide','Hotel pickup','Small groups','Hindi and English'],event:['Family friendly','Parking available','Food stalls','Limited seats'],
 matrimony:['Profiles verified','Community wise','Privacy controls','Family manager'],marriage:['100 to 1,000 guests','Tasting on request','Decor themes','Since 2001'],
 fundraiser:['Documents verified','Weekly updates','80G tax receipt','Funds go to hospital']
};

const _lc={};
function listings(catId,city){
 city=city||state.city; const k=catId+city; if(_lc[k])return _lc[k];
 const c=CAT[catId], r=rng(hash(k));
 return _lc[k]=c.names.map((nm,i)=>({id:catId+'-'+i,name:nm,cat:catId,area:AREAS[Math.floor(r()*AREAS.length)],rating:(3.9+r()*1.0).toFixed(1),reviews:18+Math.floor(r()*620),
   verified:r()>.28,open:r()>.22,years:1+Math.floor(r()*19),deal:r()>.6?['10% off','Free delivery','₹100 off','Buy 1 get 1'][Math.floor(r()*4)]:null}));
}
const allListings=()=>CATS.flatMap(c=>listings(c.id));
function biz(id){const b=allListings().find(x=>x.id===id);if(!b)return null;const e=db.edits[id]||{};return {...b,deal:e.offer||b.deal,about:e.about,phone:e.phone,hours:e.hours}}
const modeOf=c=>db.catModes[c]||CAT[c].m;

const KEYS={doctor:['doctor','dentist','daant','clinic','lab','test','hospital','dawai','skin'],cab:['cab','taxi','airport','outstation'],
 food:['food','khana','tiffin','thali','restaurant','biryani','momos','chai'],grocery:['grocery','kirana','ration','sabzi','atta'],
 property:['flat','room','kiraya','rent','plot','house','ghar','bhk'],job:['job','naukri','vacancy','hiring'],tutor:['tuition','tutor','coaching','classes','teacher'],
 marriage:['shaadi','wedding','caterer','banquet','decorator','photographer'],matrimony:['rishta','matrimony','bride','groom'],spa:['salon','parlour','spa','mehendi','haircut','makeup'],
 vehicle:['bike','car','scooter','gaadi','used car'],loan:['loan','karz','finance','emi'],school:['school','admission','play school'],
 buysell:['sofa','fridge','furniture','purana'],event:['event','mela','concert','show','workshop'],tourism:['tour','trip','ghoomna','travel'],pickup:['courier','parcel','laundry','pickup'],books:['book','kitaab','ncert']};
function interpret(q){
 const s=(q||'').toLowerCase(); let best=null;
 for(const [cat,words] of Object.entries(KEYS)) for(const w of words) if(s.includes(w)&&(!best||w.length>best.w.length)) best={cat,w};
 if(!best) return null;
 return {cat:best.cat,cheap:/(sasta|cheap|kam|budget|affordable)/.test(s),area:AREAS.find(a=>s.includes(a.toLowerCase().split(' ')[0])),open:/(abhi|now|open)/.test(s)};
}

/* ===== demo store, shared by every view and saved in this browser ===== */
const DBK='haat-demo-v2';
function seed(){
 const now=Date.now(), m=60000;
 const E=(id,name,need,cat,i,ago,st,who,kind='enquiry')=>({id,name,phone:'9'+(hash(id)%9000+1000)+' ••• '+(hash(name)%90+10),need,cat,bizId:cat+'-'+i,biz:CAT[cat].names[i],city:'Jaipur',t:now-ago*m,st,who,kind});
 return {
  enq:[E('E-2041','Rohit Sharma','Root canal, this week','doctor',0,10,'new','Pooja'),E('E-2040','Kavita Jain','2 BHK on rent under ₹15k','property',3,24,'new','Imran'),
   E('E-2039','Amit Saini','Maths tuition, Class 10','tutor',0,62,'called','Pooja'),E('E-2038','Farah Khan','Wedding catering, 400 guests','marriage',0,130,'won','Imran'),
   E('E-2037','Deepak Yadav','Home loan, ₹30 lakh','loan',1,190,'called','Pooja'),E('E-2036','Sneha Gupta','Play school admission','school',1,300,'new','Imran'),
   E('E-2035','Vikas Meena','Test drive on Sunday','vehicle',0,1500,'lost','Pooja'),E('E-2034','Pallavi Rathore','Bridal makeup, 14 Dec','spa',0,1600,'won','Imran','booking'),
   E('E-2033','Harish Soni','5,000 printed boxes','company',0,1700,'called','Pooja'),E('E-2032','Meera Iyer','Cleaning for 2 people','doctor',0,2900,'won','Imran','booking')],
  pending:[{id:1,n:'Kesar Sweets',c:'food',a:'Malviya Nagar',by:'Ravi',t:now-40*m,st:'pending',dupe:null},{id:2,n:'Bright Future Coaching',c:'tutor',a:'Gandhi Nagar',by:'Ravi',t:now-90*m,st:'pending',dupe:null},{id:3,n:'Dr Mehta Dental',c:'doctor',a:'Malviya Nagar',by:'Seema',t:now-1400*m,st:'pending',dupe:'Dr. Mehta Dental Clinic'}],
  edits:{},catModes:{},stage:{Hyderabad:3,Varanasi:2,Surat:2,Kochi:1,Udaipur:4},site:{},calls:{},subs:0,sessions:[{name:'P0, sample participant',role:'Customer',res:{0:'ok',1:'ok',2:'help'},note:'Took a while to find the city switch.',t:now-3*1440*m,example:true}],
  promos:[{n:'Diwali deals push',type:'WhatsApp broadcast',aud:'Everyone in Jaipur',st:'Running',reach:'12,400 people'},{n:'Featured: Doctors & Labs',type:'Featured slot',aud:'People who searched Doctors & Labs',st:'Running',reach:'38 businesses'},{n:'Wedding season',type:'Home page banner',aud:'Everyone in Jaipur',st:'Scheduled',reach:'Starts 1 Nov'}]
 };
}
let db=(()=>{try{const s=localStorage.getItem(DBK);if(s)return Object.assign(seed(),JSON.parse(s))}catch(e){}return seed()})();
function save(){ls.set(DBK,JSON.stringify(db))}
function applyStages(){CITIES.forEach(c=>{c.st=c.st0;const s=db.stage[c.n];if(c.st0!=='live'&&s>=5)c.st='live'})}

/* ===== state ===== */
const state={city:ls.get('haat-city')||'Jaipur',cat:null,group:'all',q:'',biz:null,f:{verified:false,open:false,sort:'rating',mode:'all',area:'all'},
 cart:{},slot:null,date:0,people:2,amount:500,sent:false,lb:{step:0,plan:'featured'},
 more:{},role:'admin',tab:null,otab:'overview',atab:'overview',ownerBiz:null,loginAs:'customer',otp:false,cityTab:'Jaipur',enqBiz:null};
if(!CITIES.find(c=>c.n===state.city)) state.city='Jaipur';
const cityObj=()=>CITIES.find(c=>c.n===state.city)||CITIES[0];

/* ===== drawn imagery (no stock photos; every picture is painted on canvas) ===== */
const PALS=[['#49382B','#80634C','#E8DDCE'],['#2A2824','#80634C','#E8DDCE'],['#80634C','#B2A18D','#F2ECE1'],['#5A4535','#B2A18D','#F8F5EF'],['#191815','#49382B','#B2A18D'],['#6B5140','#C9B79F','#F2ECE1']];
function lgrad(x,h,a,b){const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,a);g.addColorStop(1,b);return g}
function grain(x,w,h,r,a=.05){const n=Math.min(9000,w*h/22);for(let i=0;i<n;i++){x.fillStyle=r()>.5?`rgba(255,255,255,${a})`:`rgba(0,0,0,${a})`;x.fillRect(r()*w,r()*h,1,1)}}
function archPath(x,cx,by,w,h){x.beginPath();x.moveTo(cx-w/2,by);x.lineTo(cx-w/2,by-h+w/2);x.arc(cx,by-h+w/2,w/2,Math.PI,0);x.lineTo(cx+w/2,by);x.closePath()}
function landmark(x,kind,cx,by,s,col){
 x.fillStyle=col;
 if(kind==='arch'){x.fillRect(cx-60*s,by-150*s,120*s,26*s);x.fillRect(cx-50*s,by-124*s,30*s,124*s);x.fillRect(cx+20*s,by-124*s,30*s,124*s);x.fillRect(cx-40*s,by-170*s,80*s,22*s)}
 else if(kind==='gate'){x.fillRect(cx-80*s,by-120*s,160*s,120*s);[-72,-30,30,72].forEach(o=>x.fillRect(cx+o*s-7*s,by-150*s,14*s,32*s));x.fillStyle='rgba(232,207,166,.55)';archPath(x,cx,by,52*s,90*s);x.fill()}
 else if(kind==='dome'){x.beginPath();x.ellipse(cx,by-110*s,46*s,52*s,0,Math.PI,0);x.fill();x.fillRect(cx-60*s,by-110*s,120*s,110*s);x.fillRect(cx-2*s,by-182*s,4*s,22*s);[-92,92].forEach(o=>{x.fillRect(cx+o*s-6*s,by-170*s,12*s,170*s);x.beginPath();x.arc(cx+o*s,by-170*s,8*s,Math.PI,0);x.fill()});x.fillStyle='rgba(232,207,166,.45)';archPath(x,cx,by,36*s,70*s);x.fill()}
 else if(kind==='palace'){for(let i=0;i<6;i++){const w=(170-i*26)*s;x.fillRect(cx-w/2,by-(i+1)*26*s,w,27*s)}x.fillStyle='rgba(248,220,170,.55)';for(let i=0;i<5;i++){const w=(170-i*26)*s;for(let j=-w/2+10*s;j<w/2-6*s;j+=14*s){archPath(x,cx+j,by-i*26*s-6*s,7*s,14*s);x.fill()}}}
 else if(kind==='temple'){x.beginPath();x.moveTo(cx-55*s,by);x.lineTo(cx-55*s,by-60*s);x.quadraticCurveTo(cx-40*s,by-170*s,cx,by-200*s);x.quadraticCurveTo(cx+40*s,by-170*s,cx+55*s,by-60*s);x.lineTo(cx+55*s,by);x.fill();x.fillRect(cx-1.5*s,by-222*s,3*s,24*s)}
 else if(kind==='charminar'){x.fillRect(cx-60*s,by-110*s,120*s,110*s);[-60,60].forEach(o=>{x.fillRect(cx+o*s-8*s,by-200*s,16*s,200*s);x.beginPath();x.arc(cx+o*s,by-200*s,10*s,Math.PI,0);x.fill()});x.fillStyle='rgba(232,207,166,.5)';archPath(x,cx,by,60*s,80*s);x.fill()}
 else if(kind==='bridge'){x.lineWidth=2*s;x.strokeStyle=col;x.fillRect(cx-220*s,by-40*s,440*s,8*s);[-90,90].forEach(o=>{x.fillRect(cx+o*s-8*s,by-170*s,16*s,170*s);x.beginPath();for(let k=1;k<6;k++){x.moveTo(cx+o*s,by-160*s);x.lineTo(cx+o*s+k*18*s,by-40*s);x.moveTo(cx+o*s,by-160*s);x.lineTo(cx+o*s-k*18*s,by-40*s)}x.stroke()})}
 else if(kind==='hills'){x.beginPath();x.moveTo(cx-280*s,by);x.quadraticCurveTo(cx-120*s,by-200*s,cx,by-90*s);x.quadraticCurveTo(cx+120*s,by-230*s,cx+280*s,by);x.fill()}
 else {const T=[[-70,170],[-30,220],[10,190],[50,250],[90,160]];T.forEach(([o,hh])=>x.fillRect(cx+o*s-17*s,by-hh*s,34*s,hh*s));x.fillStyle='rgba(248,220,170,.5)';T.forEach(([o,hh])=>{for(let yy=by-hh*s+12*s;yy<by-8*s;yy+=14*s)for(let xx=-11;xx<11;xx+=9)if(((xx+20)*7+Math.round(yy))%3>0)x.fillRect(cx+o*s+xx*s,yy,4*s,6*s)})}
}
function drawCity(x,w,h,r,lm){
 const pal=[['#2B2420','#80634C','#D9B98F'],['#1E1B19','#5A4535','#C9A578'],['#3A2C22','#9A7656','#E8CFA6']][Math.floor(r()*3)];
 const g=x.createLinearGradient(0,0,0,h);g.addColorStop(0,pal[0]);g.addColorStop(.62,pal[1]);g.addColorStop(1,pal[2]);x.fillStyle=g;x.fillRect(0,0,w,h);
 const sx=w*(.25+r()*.5);
 x.fillStyle='rgba(255,236,200,.12)';x.beginPath();x.arc(sx,h*.6,Math.min(w,h)*.3,0,7);x.fill();
 x.fillStyle='rgba(255,236,200,.5)';x.beginPath();x.arc(sx,h*.6,Math.min(w,h)*.12,0,7);x.fill();
 const base=h*.86, s=Math.min(w/520,h/300)*1.05;
 x.fillStyle='rgba(73,56,43,.55)';for(let X=0;X<w;){const bw=20+r()*40,bh=30+r()*90;x.fillRect(X,base-bh*s,bw,bh*s);X+=bw+2}
 landmark(x,lm,w*.5,base,s,'#211C18');
 for(let X=0;X<w;){const bw=18+r()*36,bh=12+r()*46;if(Math.abs(X+bw/2-w*.5)>120*s){x.fillStyle='#191815';x.fillRect(X,base-bh*s,bw,bh*s);x.fillStyle='rgba(248,210,150,.6)';for(let k=0;k<3;k++)if(r()>.4)x.fillRect(X+4+r()*(bw-8),base-bh*s+4+r()*Math.max(2,bh*s-10),2.5,3)}X+=bw}
 x.fillStyle='#191815';x.fillRect(0,base,w,h-base);
}
function drawStill(x,w,h,r){
 const p=PALS[Math.floor(r()*PALS.length)];
 x.fillStyle=lgrad(x,h,p[2],p[1]);x.fillRect(0,0,w,h);
 x.fillStyle=p[0];x.globalAlpha=.92;x.fillRect(0,h*.72,w,h*.28);x.globalAlpha=1;
 const n=1+Math.floor(r()*2);
 for(let i=0;i<n;i++){const aw=w*(.18+r()*.14),cx=w*(.2+r()*.6);x.fillStyle=`rgba(255,255,255,${.18+r()*.2})`;archPath(x,cx,h*.72,aw,h*(.45+r()*.2));x.fill()}
 x.fillStyle=`rgba(255,240,215,${.35+r()*.3})`;x.beginPath();x.arc(w*(.15+r()*.7),h*(.2+r()*.2),Math.min(w,h)*(.05+r()*.06),0,7);x.fill();
 let X=w*(.08+r()*.2);const cnt=3+Math.floor(r()*4);
 for(let i=0;i<cnt&&X<w*.92;i++){const ow=w*(.05+r()*.08),oh=h*(.1+r()*.22);x.fillStyle=[p[0],p[1],'#F8F5EF','#191815','#B2A18D'][Math.floor(r()*5)];
  const t=Math.floor(r()*3);if(t===0){x.beginPath();x.ellipse(X+ow/2,h*.72-oh/2,ow/2,oh/2,0,0,7);x.fill()}else if(t===1){x.fillRect(X,h*.72-oh,ow,oh)}else{archPath(x,X+ow/2,h*.72,ow,oh);x.fill()}
  X+=ow+w*(.02+r()*.05)}
 x.fillStyle='rgba(0,0,0,.18)';x.fillRect(0,h*.72,w,3);
 const vg=x.createRadialGradient(w/2,h/2,Math.min(w,h)*.3,w/2,h/2,Math.max(w,h)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.25)');x.fillStyle=vg;x.fillRect(0,0,w,h);
}
function paintAll(force){
 $$('canvas[data-art]').forEach(c=>{
  const w=c.clientWidth,h=c.clientHeight; if(!w||!h) return;
  if(!force&&c._w===w&&c._h===h) return; c._w=w;c._h=h;
  const d=Math.min(2,window.devicePixelRatio||1); c.width=Math.round(w*d); c.height=Math.round(h*d);
  const x=c.getContext('2d'); x.setTransform(d,0,0,d,0,0);
  const r=rng(hash(c.dataset.seed||'x'));
  if(c.dataset.art==='city') drawCity(x,w,h,r,c.dataset.lm); else drawStill(x,w,h,r);
  grain(x,w,h,r);
 });
}
let _rz;window.addEventListener('resize',()=>{clearTimeout(_rz);_rz=setTimeout(()=>paintAll(),180)});
const art=(seed,kind='still',lm='')=>`<canvas data-art="${kind}" data-seed="${esc(seed)}" ${lm?`data-lm="${lm}"`:''} aria-hidden="true"></canvas>`;

/* ===== components ===== */
const modeTag=m=>`<span class="mode m-${m}">${MODE[m]}</span>`;
const stTag=s=>`<span class="pill st-${s}">${{live:'Live',opening:'Launching',available:'Franchise open'}[s]}</span>`;
const eb=t=>`<span class="eyebrow">${t}</span>`;
const mbtn=(k,label)=>`<button class="more-btn" data-act="more" data-v="${k}">${state.more[k]?'Show less':label}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="transform:rotate(${state.more[k]?180:0}deg)"><path d="m6 9 6 6 6-6"/></svg></button>`;
const mw=k=>`morewrap ${state.more[k]?'open-more':''}`;
const TILE=[['#191815','#F8F5EF'],['#49382B','#F2ECE1'],['#E8DDCE','#49382B'],['#F2ECE1','#80634C'],['#80634C','#FFFFFF']];
const tile=(name,id,cls='')=>{const [bg,fg]=TILE[hash(id)%TILE.length];return `<span class="logo-tile ${cls}" style="background:${bg};color:${fg}" aria-hidden="true">${ini(name)}</span>`};
const CI={
 food:'<path d="M3 11h18a9 9 0 0 1-18 0z"/><path d="M8 7c0-1.5 1-2 1-3M12 7c0-1.5 1-2 1-3M16 7c0-1.5 1-2 1-3"/>',
 grocery:'<path d="M3 9h18l-2 11H5z"/><path d="M8 9l4-6 4 6M9 13v4M15 13v4"/>',
 shopping:'<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 pickup:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
 doctor:'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 8v8M8 12h8"/>',
 spa:'<path d="M5 19C5 10 11 5 20 4c-1 9-6 15-15 15z"/><path d="M5 19l8-8"/>',
 school:'<path d="M3 10l9-6 9 6"/><path d="M5 10v10h14V10M10 20v-5h4v5"/>',
 tutor:'<path d="M4 5h6a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4z"/><path d="M20 5h-6a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6z"/>',
 books:'<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="m15.5 5 3.4-.9 3.1 15-3.4.9z"/>',
 intern:'<rect x="4" y="3" width="16" height="18" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17c1-2 7-2 8 0"/>',
 job:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 13h18"/>',
 loan:'<circle cx="12" cy="12" r="9"/><path d="M9 8h6M9 11h6M10.5 8c2.5 0 2.5 3 0 3H9l5 5"/>',
 company:'<path d="M3 21V10l6 4V10l6 4V6h6v15z"/><path d="M3 21h18"/>',
 franchise:'<path d="M4 9l1-5h14l1 5"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5 11v10h14V11M10 21v-6h4v6"/>',
 property:'<path d="M4 11 12 4l8 7v9H4z"/><path d="M10 20v-5h4v5"/>',
 vehicle:'<path d="M3 15l2-6a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 6v4H3z"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/>',
 buysell:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
 cab:'<path d="M3 15l2-6a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 6v4H3z"/><path d="M10 8V5h4v3"/><circle cx="7.5" cy="15.5" r="1.5"/><circle cx="16.5" cy="15.5" r="1.5"/>',
 tourism:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
 event:'<path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z"/><path d="M14 7v10"/>',
 matrimony:'<circle cx="9" cy="14" r="5"/><circle cx="15" cy="14" r="5"/><path d="m10 4 2 2 2-2"/>',
 marriage:'<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
 fundraiser:'<path d="M12 8s-3-4-5.5-2S6 11 12 15c6-4 8-7 5.5-9S12 8 12 8z"/><path d="M4 19h16"/>'
};
const cicon=id=>`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${CI[id]||''}</svg>`;
function bcard(b0,i=0){
 const b=biz(b0.id)||b0, c=CAT[b.cat], m=modeOf(b.cat);
 const cta={enquiry:'Enquire',booking:'Book',order:'Order',donate:'Donate'}[m];
 return `<article class="bcard rv" style="--d:${(i%4)*60}ms">
  <div class="bc-top">${tile(b.name,b.id)}<div class="bc-id"><span class="bc-cat">${c.n}</span><h3 data-act="biz" data-id="${b.id}">${esc(b.name)}</h3></div></div>
  <div class="bc-meta"><span class="star">${I.star} ${b.rating}</span><span>${b.reviews} reviews</span><span>${b.area}</span></div>
  <div class="bc-tags">${modeTag(m)}${b.verified?`<span class="vbadge">${I.shield} Verified</span>`:''}${b.open?'<span class="open">Open now</span>':'<span class="closed">Closed now</span>'}${b.deal?`<span class="dealtag">${esc(b.deal)}</span>`:''}</div>
  <div class="bc-act"><button class="btn btn-line btn-sm" data-act="biz" data-id="${b.id}">View details</button><button class="btn btn-ink btn-sm" data-act="${m==='enquiry'?'enq':'biz'}" data-id="${b.id}">${cta}</button></div>
 </article>`;
}
function head(crumbs,title,lede,extra=''){
 return `<section class="phead"><div class="wrap">
  <div class="crumb rv">${crumbs.map(([l,h])=>h?`<a href="#${h}">${l}</a><span>/</span>`:`<span>${l}</span>`).join('')}</div>
  <h1 class="rv" style="--d:60ms">${title}</h1>${lede?`<p class="lede rv" style="--d:120ms">${lede}</p>`:''}${extra}</div></section>`;
}

/* ===== phone screens ===== */
function phoneHome(){
 const c=cityObj();
 return `<div class="phone"><div class="screen"><div class="s-bar"><span>9:41</span><span>5G</span></div>
  <div class="s-head"><small>${c.n} · Localist</small><b>Good evening, Aman</b></div>
  <div class="s-search">Search doctors, groceries, cabs…</div>
  <div class="s-cats">${[['Fd','Food'],['Dr','Doctor'],['Tu','Tutor'],['Pr','Property'],['Cb','Cab'],['Gr','Grocery'],['Sp','Salon'],['Jb','Jobs']].map(([a,b])=>`<div><span>${a}</span>${b}</div>`).join('')}</div>
  <div class="s-row">${tile('Rasoi Ghar','food-0','sm')}<div><b>Rasoi Ghar</b><small>★ 4.8 · Restaurant · 1.2 km</small></div></div><div class="s-row">${tile('Glow Salon','spa-0','sm')}<div><b>Glow Salon &amp; Spa</b><small>★ 4.7 · Salon · 0.8 km</small></div></div>
  <div class="s-tab"><b>Home</b><span>Explore</span><span>Activity</span><span>Profile</span></div></div></div>`;
}
function phoneBiz(small){
 return `<div class="phone ${small?'small':''}"><div class="screen"><div class="s-bar"><span>9:41</span><span>5G</span></div>
  <div style="height:110px;margin-bottom:10px;flex:none;background:var(--alab);display:grid;place-items:center">${tile('Dr. Mehta Dental Clinic','doctor-0')}</div>
  <div class="s-head" style="padding-top:0"><small>Doctors &amp; Labs</small><b>Dr. Mehta Dental Clinic</b><span style="color:var(--brown);font-size:10px">★ 4.8 · 214 reviews · Open now</span></div>
  <div class="s-btns"><span>Call</span><span class="k">Book slot</span></div>
  <div style="padding:12px 14px 0"><div style="font-size:9.5px;letter-spacing:.14em;color:var(--brown);font-weight:700">TOMORROW</div>
  <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:6px">${['10:00','11:30','4:00','5:30'].map((t,i)=>`<span style="border:1px solid var(--line);border-radius:999px;padding:4px 9px;font-size:9.5px;${i===3?'background:#191815;color:#F8F5EF':''}">${t}</span>`).join('')}</div></div>
  <div class="s-tab"><span>Home</span><b>Explore</b><span>Activity</span><span>Profile</span></div></div></div>`;
}
function phoneList(){
 return `<div class="phone"><div class="screen"><div class="s-bar"><span>9:41</span><span>5G</span></div>
  <div class="s-head"><small>Search</small><b>“cheap dentist”</b></div>
  <div style="margin:0 14px 10px;font-size:9.5px;background:var(--alab);border-radius:10px;padding:7px 9px"><b style="font-size:9px">AI</b> Showing Doctors &amp; Labs, budget first</div>
  ${listings('doctor').slice(0,5).map(b=>`<div class="s-row"><i>${ini(b.name)}</i><div><b>${esc(b.name)}</b><small>★ ${b.rating} · ${b.area}</small></div></div>`).join('')}
  <div class="s-tab"><span>Home</span><b>Explore</b><span>Activity</span><span>Profile</span></div></div></div>`;
}
function phoneActivity(){
 return `<div class="phone"><div class="screen"><div class="s-bar"><span>9:41</span><span>5G</span></div>
  <div class="s-head"><small>Your activity</small><b>Bookings and enquiries</b></div>
  ${[['Glow Salon & Spa','Sat · 5:30 pm','s-won','Confirmed'],['Sharma Maths Classes','Demo class asked','s-called','Called you'],['2 BHK · Malviya Nagar','Owner will call','s-new','Sent'],['Rasoi Ghar','Order ₹480','s-won','Delivered']].map(([a,b,c,d])=>`<div class="s-row"><i>${ini(a)}</i><div><b>${a}</b><small>${b}</small></div><span class="pill ${c}">${d}</span></div>`).join('')}
  <div class="s-tab"><span>Home</span><span>Explore</span><b>Activity</b><span>Profile</span></div></div></div>`;
}
function phoneOwner(){
 return `<div class="phone"><div class="screen" style="background:#191815;color:#F8F5EF"><div class="s-bar"><span>9:41</span><span>5G</span></div>
  <div class="s-head"><small style="color:#B2A18D">Localist for Business</small><b>Today’s leads</b></div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;padding:0 14px 10px">${[['148','Views'],['23','Leads'],['9','Booked']].map(([a,b])=>`<div style="background:#2A2824;border-radius:10px;padding:8px"><b style="font-family:var(--serif);font-size:17px;display:block">${a}</b><small style="color:#B2A18D;font-size:9px">${b}</small></div>`).join('')}</div>
  ${[['Neha Joshi','Root canal cost'],['Rahul Verma','Braces for son'],['Sunita Devi','Booked Sat 11:30']].map(([a,b])=>`<div class="s-row" style="background:#22201D;border-color:#2A2824"><i style="background:#2A2824;color:#B2A18D">${ini(a)}</i><div><b>${a}</b><small style="color:#B2A18D">${b}</small></div><span class="pill s-new">New</span></div>`).join('')}
  <div class="s-tab" style="background:#22201D;border-color:#2A2824;color:#B2A18D"><b style="color:#F8F5EF">Leads</b><span>Listing</span><span>Offers</span><span>Account</span></div></div></div>`;
}

/* ===== views ===== */
const V={};
V.home=()=>{
 const c=cityObj(), site=db.site[c.n]||{}, pickCity=state.cityTab;
 const featured=['doctor','food','tutor','property','spa','marriage','cab','grocery'].map(id=>[...listings(id,pickCity)].sort((a,b)=>b.rating-a.rating)[0]);
 const cats=CATS.filter(x=>state.group==='all'||x.g===state.group);
 const tabs=[{id:'all',n:'All services'},...GROUPS];
 const featCats=site.feat&&site.feat.length?site.feat:null;
 return `
 <section class="hero"><div class="wrap hero-grid">
  <div>
   <div class="rv">${eb('Local business discovery · India')}</div>
   <h1 class="rv" style="--d:60ms">${esc(site.headline||'Find trusted local businesses')} <em>${esc(site.accent||'in your city.')}</em></h1>
   <p class="lede rv" style="--d:120ms">Doctors, tutors, grocery stores, cabs, homes and wedding vendors in ${c.n}, verified by our local team. Send an enquiry, book a slot or order online.</p>
   <div class="hero-cta rv" style="--d:180ms"><a class="btn btn-ink" href="#explore" data-act="explore-all">Explore ${c.n} <span class="ar">${I.arrow}</span></a><a class="btn btn-line" href="#list-business">List your business</a></div>
   <div class="hstats rv" style="--d:240ms"><div><b>${(hash(c.n)%9000+3000).toLocaleString('en-IN')}+</b><span>verified listings in ${c.n}</span></div><div><b>${CATS.length}</b><span>service categories</span></div><div><b>18 min</b><span>average reply time</span></div></div>
  </div>
  <div class="preview rv" style="--d:120ms">
   <div class="pv-search">${I.search}<span>Dentist near Station Road</span><span class="pv-city">${c.n}</span></div>
   <div class="pv-meta"><span>Showing 3 of 42 results</span><span>Sorted by rating</span></div>
   ${[...listings('doctor')].sort((a,b)=>b.rating-a.rating).slice(0,3).map(b=>`<div class="pv-row">${tile(b.name,b.id)}<div class="pv-id"><b>${esc(b.name)}</b><small>★ ${b.rating} · ${b.reviews} reviews · ${b.area}</small></div>${modeTag(modeOf('doctor'))}</div>`).join('')}
   <div class="pv-foot">${I.shield}<span>Every listing is visited and phone-verified</span></div>
  </div>
 </div></section>
 ${site.banner?`<div class="notice"><div class="wrap"><b>${c.n} update</b><span>${esc(site.banner)}</span></div></div>`:''}

 <section class="sec white"><div class="wrap center">
  <div class="rv">${eb('Search')}</div>
  <h2 class="rv" style="--d:80ms;margin-top:16px">One search for every service</h2>
  <p class="lede rv" style="--d:140ms;margin:18px auto 0">Doctors, tutors, grocery stores, property, cabs and more. Filter by area, rating and what you want to do.</p>
  <form class="spanel rv" style="--d:200ms;text-align:left" data-form="search">
   <div class="sp-f"><label for="hsCity">${I.pin} City</label><select id="hsCity">${CITIES.map(x=>`<option ${x.n===c.n?'selected':''}>${x.n}</option>`).join('')}</select></div>
   <div class="sp-f"><label for="hsCat">${I.grid} Category</label><select id="hsCat"><option value="">All categories</option>${CATS.map(x=>`<option value="${x.id}">${x.n}</option>`).join('')}</select></div>
   <div class="sp-f sp-wide"><label for="hsQ">${I.search} Search</label><input id="hsQ" type="search" placeholder="Try “affordable dentist near Station Road”"></div>
   <button class="btn btn-ink" type="submit">Find places <span class="ar">${I.arrow}</span></button>
  </form>
  <div class="ai-hint rv"><span class="ai">AI</span>Smart search understands everyday phrases and local area names</div>
  <div class="sugg rv">${['Dentist near station','Grocery delivery','2 BHK on rent','Home tutor for maths','Wedding caterers','Airport taxi'].map((s,i)=>`<button type="button" class="${i>=3?'mh':''}" data-act="try" data-q="${s}">${s}</button>`).join('')}</div>
 </div></section>

 <section class="sec"><div class="wrap">
  <div class="sec-head"><div><div class="rv">${eb('Categories')}</div><h2 class="rv" style="--d:80ms">Browse by category</h2>
   <p class="lede rv" style="--d:140ms">${CATS.length} categories across daily needs, health, learning, work, property, travel and family. Each one tells you up front if you can enquire, book or order.</p></div>
   <a class="pillbtn rv" href="#services">How every service works ${I.arrow}</a></div>
  <div class="chiprow rv">${tabs.map(t=>`<button class="chip ${state.group===t.id?'on':''}" data-act="group" data-v="${t.id}">${t.n}</button>`).join('')}</div>
  <div class="${mw('cats')}"><div class="cgrid">${cats.sort((a,b)=>featCats?(featCats.includes(b.id)-featCats.includes(a.id)):0).map((x,i)=>`<button class="ccard rv ${i>=8?'mx':''}" style="--d:${(i%4)*50}ms" data-act="cat" data-id="${x.id}">
    <span class="cicon">${cicon(x.id)}</span><h3>${x.n}</h3><p>${x.d}</p>
    <span class="cc-f">${modeTag(modeOf(x.id))}<span class="cc-go">${(listings(x.id).length*230+hash(x.id+c.n)%180).toLocaleString('en-IN')} listings ${I.arrow}</span></span></button>`).join('')}
   ${state.group==='all'?`<a href="#services" class="ccard darkc rv mx" style="text-decoration:none"><div>${eb('Directory')}<h3 style="font-size:28px;margin-top:14px;color:var(--bg)">Complete service directory</h3><p style="margin-top:10px">See how the 27 services in the brief map to ${CATS.length} categories and 4 platform features.</p></div><span class="cc-go" style="color:var(--bg)">Open directory ${I.arrow}</span></a>`:''}
  </div>${cats.length>8?mbtn('cats',`Show all ${cats.length} categories`):''}</div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div><div class="rv">${eb('Deals')}</div><h2 class="rv" style="--d:80ms">Offers from businesses in ${c.n}</h2></div><a class="pillbtn rv" href="#deals">All deals ${I.arrow}</a></div>
  <div class="dstrip rv">${dealsList().slice(0,6).map(dealCard).join('')}</div>
 </div></section>
 <section class="sec white"><div class="wrap">
  <div class="sec-head"><div><div class="rv">${eb('Top rated')}</div><h2 class="rv" style="--d:80ms">Highly rated businesses near you</h2>
   <p class="lede rv" style="--d:140ms">Every listing is visited, photographed and phone-verified by the local team before it gets the verified badge.</p></div>
   <a class="pillbtn rv" href="#explore" data-act="explore-all">Open full explorer ${I.arrow}</a></div>
  <div class="chiprow rv" style="margin-bottom:22px">${CITIES.filter(x=>x.st==='live').map(x=>`<button class="chip brown ${pickCity===x.n?'on':''}" data-act="citytab" data-v="${x.n}">${x.n}</button>`).join('')}</div>
  <p class="muted rv" style="font-size:14px;margin-bottom:18px">Showing ${featured.length} top-rated places in ${pickCity}</p>
  <div class="${mw('biz')}"><div class="bgrid">${featured.map((b,i)=>bcard(b,i).replace('class="bcard rv','class="bcard rv '+(i>=4?'mx':''))).join('')}</div>${mbtn('biz','Show 4 more places')}</div>
 </div></section>

 <section class="sec white" style="padding-top:0"><div class="wrap">
  <div class="sec-head"><div><div class="rv">${eb('City news')}</div><h2 class="rv" style="--d:80ms">What’s happening in ${c.n}</h2></div><a class="pillbtn rv" href="#news">All city news ${I.arrow}</a></div>
  <div class="${mw('news')}"><div class="nlist">${newsItems().slice(0,3).map((n,i)=>nart(n,i===0).replace('class="nart rv','class="nart rv '+(i>=1?'mx':''))).join('')}</div>${mbtn('news','Show more news')}</div>
 </div></section>
 <section class="sec dark"><div class="wrap">
  <div class="center"><div class="rv">${eb('How it works')}</div><h2 class="rv" style="--d:80ms;margin-top:16px;color:var(--bg)">One platform for customers and businesses</h2>
   <p class="lede rv" style="--d:140ms;margin:18px auto 0">Residents looking for someone they can trust, and local businesses who want to be found by them.</p></div>
  <div class="two">
   <div class="rv"><span class="lab">For customers</span><h3>Find the right people.<br>Decide with confidence.</h3>
    ${[['Discover','Search by need, area or just the way you talk. Filters for verified, open now and budget.'],['Compare','Ratings, timings, prices and photos side by side, with a short summary of what reviewers say.'],['Connect','Send an enquiry, book a slot or order online. The business calls you back, usually within 30 minutes.']].map(([t,d],i)=>`<div class="st"><span class="n">0${i+1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
   <div class="rv" style="--d:120ms"><span class="lab">For businesses</span><h3>Be discovered.<br>Grow in your area.</h3>
    ${[['Get listed','Free listing set up by the city team, or add it yourself in 3 steps.'],['Reach customers','Featured slots, offers and WhatsApp campaigns for people in your area.'],['Manage enquiries','Every lead in one dashboard and on your phone. Reply, book and track results.']].map(([t,d],i)=>`<div class="st"><span class="n">0${i+1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
  </div>
 </div></section>

 <section class="sec"><div class="wrap">
  <div class="sec-head"><div><div class="rv">${eb('City network')}</div><h2 class="rv" style="--d:80ms">A dedicated site for every city</h2>
   <p class="lede rv" style="--d:140ms">One shared platform, a separate site for each city. ${CITIES.filter(x=>x.st==='live').length} live in this demo, more launching every month.</p></div>
   <button class="pillbtn rv" data-act="city-open">View all cities ${I.arrow}</button></div>
  <div class="${mw('cities')}"><div class="citygrid">${CITIES.slice(0,6).map((x,i)=>`<button class="citycard rv ${i>=2?'mx':''}" style="--d:${(i%2)*100}ms" data-act="city" data-v="${x.n}">${art('city-'+x.n,'city',x.lm)}<span class="cst">${stTag(x.st)}</span>
   <div class="cc-t"><h3>${x.n}</h3><p>${x.line}</p><small>${(hash(x.n)%9000+3000).toLocaleString('en-IN')}+ verified listings · ${x.d}</small></div></button>`).join('')}</div>${mbtn('cities','Show more cities')}</div>
 </div></section>

 <section class="sec white"><div class="wrap">
  <div class="center" style="margin-bottom:48px"><div class="rv">${eb('Trust and safety')}</div><h2 class="rv" style="--d:80ms;margin-top:16px">Why people trust Localist</h2></div>
  <div class="trust">
   <div class="tr rv"><span class="ic">${I.verify}</span><h3>Business verification</h3><p>A team member visits, checks the phone number and address, and takes real photos before a listing is marked verified.</p></div>
   <div class="tr rv" style="--d:100ms"><span class="ic">${I.local}</span><h3>Relevant local results</h3><p>Results are ranked by distance, ratings and how quickly the business replies. Paid listings are always labelled.</p></div>
   <div class="tr rv" style="--d:200ms"><span class="ic">${I.chat}</span><h3>Direct enquiries</h3><p>Your request goes straight to the business. Your number is shared only with them and never sold.</p></div>
  </div>
 </div></section>

 <section class="sec"><div class="wrap appb">
  <div><div class="rv">${eb('Android & iOS')}</div><h2 class="rv" style="--d:80ms;margin-top:14px">The Localist mobile app</h2>
   <p class="lede rv" style="--d:140ms;margin-top:16px">Save favourite shops, track bookings and orders, and get call-backs without posting your number anywhere. Business owners get their own mode for leads.</p>
   <div class="stores rv" style="--d:200ms"><button class="store" data-act="soon"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3.5v17l9.5-8.5zM15 13.5l2.6 2.4-11 6.2zM15 10.5 6.6 1.9l11 6.2zM18.8 9l3 1.7c.8.5.8 1.6 0 2.1l-3 1.7-2.8-2.5z"/></svg><span><small>Get it on</small><b>Google Play</b></span></button>
   <button class="store" data-act="soon"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.8 1.2 1.8 2.6 3.1 2.5 1.3-.1 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.300-2.7 1.3-2.8-.1 0-2.6-1-2.6-3.9zM13.9 4.9c.7-.8 1.2-2 1-3.1-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.9-1.4z"/></svg><span><small>Download on the</small><b>App Store</b></span></button></div>
   <div class="rv" style="margin-top:22px"><a class="pillbtn" href="#app">See all app screens ${I.arrow}</a></div></div>
  <div class="phones rv" style="--d:120ms">${phoneHome()}${phoneBiz(true)}</div>
 </div></section>

 <section class="sec" style="padding-top:0"><div class="wrap">
  <div class="news-b rv"><span class="ring"></span><span class="ring"></span>
   <div><h2>New places and offers, every week</h2><p>A short weekly letter from the ${c.n} team: new places, offers and city news.</p></div>
   <form class="nform" data-form="sub"><input id="subEmail" type="email" required placeholder="Your email" aria-label="Email"><button class="btn btn-ink btn-sm" type="submit">Subscribe</button></form>
  </div>
 </div></section>`;
};

V.explore=()=>{
 let items, title, crumbs, und='';
 const f=state.f, it=state.q?interpret(state.q):null;
 if(state.cat){const c=CAT[state.cat];items=listings(c.id);title=`${c.n} <em>in ${state.city}</em>`;crumbs=[['Home','home'],['Explore','explore'],[c.n]]}
 else{
  const q=state.q.trim(), ql=q.toLowerCase();
  items=q?allListings().filter(b=>b.name.toLowerCase().includes(ql)||CAT[b.cat].n.toLowerCase().includes(ql)):allListings();
  if(it){items=[...listings(it.cat).filter(b=>!items.includes(b)),...items];
   und=`<div class="understood rv"><span class="ai">AI</span><span>We read this as <b>${CAT[it.cat].n}</b>${it.area?` near <b>${it.area}</b>`:''}${it.cheap?', <b>budget options first</b>':''}${it.open?', <b>open now</b>':''}.</span><button class="pillbtn" data-act="cat" data-id="${it.cat}" style="margin-left:auto">Only ${CAT[it.cat].n}</button></div>`}
  title=q?`Results for <em>“${esc(q)}”</em>`:`Explore <em>${state.city}</em>`; crumbs=[['Home','home'],['Explore']];
 }
 let list=items.filter(b=>(!f.verified||b.verified)&&(!f.open||b.open||false)&&(f.mode==='all'||modeOf(b.cat)===f.mode)&&(f.area==='all'||b.area===f.area));
 if(it&&it.open) list=list.filter(b=>b.open);
 list=[...list].sort((a,b)=>it&&it.cheap?(a.cat===it.cat?-1:0)-(b.cat===it.cat?-1:0)||a.reviews-b.reviews:f.sort==='rating'?b.rating-a.rating:f.sort==='reviews'?b.reviews-a.reviews:a.name.localeCompare(b.name));
 if(it&&it.area) list.sort((a,b)=>(b.area===it.area)-(a.area===it.area));
 const sib=state.cat?CATS.filter(x=>x.g===CAT[state.cat].g):[];
 return head(crumbs,title,state.cat?CAT[state.cat].d+'.':`${(allListings().length*230).toLocaleString('en-IN')} businesses across ${CATS.length} categories in ${state.city}.`,
  `<form class="ex-search rv" style="--d:160ms" data-form="exsearch"><input id="exQ" type="search" value="${esc(state.q)}" placeholder="Search anything, in any language" aria-label="Search"><button class="btn btn-ink btn-sm" type="submit">Search</button></form>
   ${sib.length?`<div class="chiprow rv" style="--d:200ms;margin-top:22px">${sib.map(x=>`<button class="chip ${x.id===state.cat?'on':''}" data-act="cat" data-id="${x.id}">${x.n}</button>`).join('')}<button class="chip" data-act="allcats">All categories</button></div>`:''}`)+`
 <div class="wrap lay">
  <aside class="filters">
   <div class="fg"><h4>Sort by</h4><select id="fSort" aria-label="Sort"><option value="rating" ${f.sort==='rating'?'selected':''}>Highest rated</option><option value="reviews" ${f.sort==='reviews'?'selected':''}>Most reviewed</option><option value="name" ${f.sort==='name'?'selected':''}>Name A to Z</option></select></div>
   <div class="fg"><h4>Area</h4><select id="fArea" aria-label="Area"><option value="all">All of ${state.city}</option>${AREAS.map(a=>`<option ${f.area===a?'selected':''}>${a}</option>`).join('')}</select></div>
   <div class="fg"><h4>What you can do</h4><select id="fMode" aria-label="Mode"><option value="all">Anything</option>${Object.entries(MODE).map(([k,v])=>`<option value="${k}" ${f.mode===k?'selected':''}>${v}</option>`).join('')}</select></div>
   <div class="fg"><h4>Show only</h4><label class="check"><input type="checkbox" id="fVer" ${f.verified?'checked':''}>Verified by Localist</label><label class="check"><input type="checkbox" id="fOpen" ${f.open?'checked':''}>Open now</label></div>
  </aside>
  <div style="min-width:0">${und}
   <div class="res-bar"><span>${list.length} ${list.length===1?'place':'places'} found${list.length>24?', showing 24':''}</span>${state.cat?modeTag(modeOf(state.cat)):''}</div>
   ${list.length?`<div class="bgrid">${list.slice(0,24).map(bcard).join('')}</div>`:`<div class="empty"><h3 style="margin-bottom:8px">Nothing matches yet</h3><p>Try fewer filters, or a word like “doctor”, “tiffin” or “flat”.</p></div>`}
  </div></div>`;
};

function actionCard(b){
 const m=modeOf(b.cat);
 if(state.sent) return `<div class="action"><div class="done"><div class="tick">${I.check}</div><h3>${state.sent}</h3><p>${esc(b.name)} usually replies within 30 minutes. It now shows in their dashboard and in the ${state.city} team’s queue.</p><a class="btn btn-line btn-block" href="#owner" data-act="owner-of" data-id="${b.id}">See it as the business owner</a><button class="btn btn-ink btn-block" style="margin-top:10px" data-act="reset-action">Done</button></div></div>`;
 const dates=[...Array(5)].map((_,i)=>{const d=new Date();d.setDate(d.getDate()+i);return i===0?'Today':i===1?'Tomorrow':d.toLocaleDateString('en-IN',{weekday:'short',day:'numeric'})});
 if(m==='order'){
  const items=ITEMS[b.cat]||ITEMS.shopping, total=items.reduce((s,[n,p])=>s+(state.cart[n]||0)*p,0);
  return `<div class="action"><h3>Order online</h3><p class="sub">From ${b.area} · UPI, card or cash on delivery</p>
   ${items.map(([n,p])=>`<div class="menu-i"><div>${n}<small>${inr(p)}</small></div><div class="qty"><button data-act="dec" data-n="${n}" aria-label="Remove one ${n}">−</button><span>${state.cart[n]||0}</span><button data-act="inc" data-n="${n}" aria-label="Add one ${n}">+</button></div></div>`).join('')}
   <div class="total"><span>Total</span><span>${inr(total)}</span></div>
   <button class="btn btn-ink btn-block" data-act="place" ${total?'':'disabled'}>${total?'Place order · '+inr(total):'Add items to order'}</button><p class="note">Delivered by the shop or a local delivery partner</p></div>`;
 }
 if(m==='booking'){
  const isCab=b.cat==='cab'||b.cat==='pickup', slots=['10:00 am','11:30 am','1:00 pm','4:00 pm','5:30 pm','7:00 pm'], tix=b.cat==='event'||b.cat==='tourism';
  return `<form class="action" data-form="book"><h3>${isCab?(b.cat==='cab'?'Book a ride':'Book a pickup'):tix?'Book tickets':'Book a slot'}</h3><p class="sub">Confirmation on SMS and WhatsApp</p>
   ${isCab?`<div class="field"><label for="bFrom">Pickup</label><input id="bFrom" value="${b.area}, ${state.city}" required></div><div class="field"><label for="bTo">Drop</label><input id="bTo" placeholder="Airport, railway station…" required></div>`:''}
   ${b.cat==='cab'?`<div class="field"><span class="flabel">Car</span><div class="chips">${['Hatchback · ₹12/km','Sedan · ₹14/km','SUV · ₹18/km'].map(x=>`<button type="button" class="chip ${(state.slot||'Hatchback · ₹12/km')===x?'on':''}" data-act="slot" data-v="${x}">${x}</button>`).join('')}</div></div>`:''}
   <div class="field"><span class="flabel">Date</span><div class="chips">${dates.map((d,i)=>`<button type="button" class="chip ${state.date===i?'on':''}" data-act="date" data-i="${i}">${d}</button>`).join('')}</div></div>
   ${isCab?'':`<div class="field"><span class="flabel">Time</span><div class="chips">${slots.map((s,i)=>`<button type="button" class="chip ${state.slot===s?'on':''}" data-act="slot" data-v="${s}" ${i===2?'disabled style="opacity:.35;text-decoration:line-through"':''}>${s}</button>`).join('')}</div></div>`}
   <div class="field"><span class="flabel">${tix?'Tickets':'People'}</span><div class="qty"><button type="button" data-act="pdec" aria-label="Fewer">−</button><span>${state.people}</span><button type="button" data-act="pinc" aria-label="More">+</button></div></div>
   <div class="row2"><div class="field"><label for="bName">Name</label><input id="bName" required></div><div class="field"><label for="bPhone">Mobile</label><input id="bPhone" required inputmode="numeric" pattern="[0-9 ]{10,12}" placeholder="10 digits"></div></div>
   <button class="btn btn-ink btn-block" type="submit">${tix?'Pay and book':'Confirm booking'}</button><p class="note">Free cancellation up to 2 hours before</p></form>`;
 }
 if(m==='donate'){
  return `<form class="action" data-form="donate"><h3>Support this cause</h3><p class="sub">₹3,42,000 raised of ₹5,00,000 · 418 donors</p><div class="progress"><i style="width:68%"></i></div>
   <div class="field" style="margin-top:18px"><span class="flabel">Amount</span><div class="chips">${[250,500,1000,2500].map(a=>`<button type="button" class="chip ${state.amount===a?'on':''}" data-act="amt" data-v="${a}">${inr(a)}</button>`).join('')}</div></div>
   <div class="field"><label for="dName">Name (optional)</label><input id="dName" placeholder="Shown as Anonymous if empty"></div>
   <button class="btn btn-ink btn-block" type="submit">Donate ${inr(state.amount)}</button><p class="note">80G tax receipt sent by email</p></form>`;
 }
 const lbl={job:'Apply for this job',intern:'Apply for internship',matrimony:'Request contact',property:'Ask the owner',vehicle:'Contact seller',buysell:'Contact seller',loan:'Check eligibility'}[b.cat]||'Send enquiry';
 return `<form class="action" data-form="enquiry"><h3>${lbl}</h3><p class="sub">Your number is shared only with ${esc(b.name)}</p>
  <div class="field"><label for="eName">Name</label><input id="eName" required></div>
  <div class="field"><label for="ePhone">Mobile</label><input id="ePhone" required inputmode="numeric" pattern="[0-9 ]{10,12}" placeholder="10 digits"></div>
  <div class="field"><label for="eNeed">What do you need?</label><textarea id="eNeed" placeholder="${b.cat==='school'?'Admission for Class 3, 2027 session':b.cat==='tutor'?'Maths tuition for Class 10, evenings':'A short note helps them reply faster'}"></textarea></div>
  <label class="check" style="font-size:14px;margin-bottom:14px"><input type="checkbox" id="eWa" checked>Reply on WhatsApp</label>
  <button class="btn btn-ink btn-block" type="submit">${lbl}</button></form>`;
}

V.business=()=>{
 const b=biz(state.biz)||biz('doctor-0'); state.biz=b.id; const c=CAT[b.cat], m=modeOf(b.cat);
 const sim=listings(b.cat).filter(x=>x.id!==b.id).slice(0,3), r=rng(hash(b.id));
 const hours=b.hours||'9:30 am to 8:30 pm';
 return `<section class="phead"><div class="wrap">
   <div class="crumb rv"><a href="#home">Home</a><span>/</span><a href="#explore" data-act="cat" data-id="${c.id}">${c.n}</a><span>/</span><span>${esc(b.name)}</span></div>
   <div class="dh-row rv">${tile(b.name,b.id,'xl')}<div style="min-width:0"><h1 style="margin-top:0">${esc(b.name)}</h1>
   <div class="dtags">${modeTag(m)}${b.verified?`<span class="vbadge">${I.shield} Verified by Localist</span>`:''}${b.deal?`<span class="dealtag">${esc(b.deal)}</span>`:''}<span class="t">★ ${b.rating} · ${b.reviews} reviews</span><span class="t">${b.area}, ${state.city}</span><span class="t">${b.open?'Open now':'Closed now'}</span></div></div></div>
 </div></section>
 <div class="wrap dgrid">
  <div style="min-width:0">
   <div class="blk rv"><h3>About</h3><p class="lede" style="max-width:62ch">${esc(b.about||`${b.name} serves families across ${b.area} and nearby areas of ${state.city}. ${c.d}. Listed and checked in person by the Localist ${state.city} team, who verified the phone number and address.`)}</p></div>
   <div class="blk rv"><h3>Highlights</h3><div class="hl">${(HL[b.cat]||[]).map(h=>`<div>${I.dot}${h}</div>`).join('')}</div></div>
   <div class="blk rv"><h3>Timings</h3><table class="times"><tbody>${[['Monday to Friday',hours],['Saturday','10:00 am to 6:00 pm'],['Sunday','Closed']].map(([d,t])=>`<tr><td>${d}</td><td>${esc(t)}</td></tr>`).join('')}</tbody></table>${b.phone?`<p style="margin-top:12px">Phone: <b>${esc(b.phone)}</b></p>`:''}</div>
   <div class="blk rv"><h3>Location</h3><div class="map"><svg viewBox="0 0 600 220" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Map of ${b.area}">
     <rect width="600" height="220" fill="#F2ECE1"/><path d="M0 130 L600 96" stroke="#FFFFFF" stroke-width="18"/><path d="M220 0 L262 220" stroke="#FFFFFF" stroke-width="12"/><path d="M430 0 L410 220" stroke="#FFFFFF" stroke-width="8"/>
     <path d="M0 44 Q150 66 300 34 T600 54" stroke="#E8DDCE" stroke-width="7" fill="none"/><rect x="40" y="150" width="130" height="50" rx="10" fill="#E8DDCE"/><rect x="460" y="120" width="112" height="76" rx="10" fill="#E8DDCE"/>
     <text x="30" y="122" font-size="11" fill="#80634C" font-family="Plus Jakarta Sans, sans-serif" letter-spacing="2">${b.area.toUpperCase()}</text>
     <circle cx="330" cy="110" r="26" fill="#80634C" opacity=".18"></circle><circle cx="330" cy="110" r="9" fill="#191815"/></svg></div>
    <p class="muted" style="margin-top:12px">Shop ${12+Math.floor(r()*80)}, ${b.area}, ${state.city}</p></div>
   <div class="blk rv"><h3>Reviews</h3>
    <div class="aisum"><span class="ai">AI</span> <b style="font-size:14px">Review summary</b><p>Most of the ${b.reviews} reviewers mention ${['on-time service','clean premises','fair prices','polite staff'][Math.floor(r()*4)]} and ${['quick call-backs','clear explanations','good value','friendly owners'][Math.floor(r()*4)]}. A few mention waiting times on weekends.</p></div>
    ${[['Priya S.',5,'Very clean and on time. Explained everything before starting.'],['Mohit K.',4,'Good service. Had to wait 15 minutes but the staff was polite.'],['Anjali R.',5,'Found them on Localist and got a call back in 10 minutes.']].map(([n,s,t])=>`<div class="rev"><div class="rev-h"><b>${n}</b><span style="color:var(--brown)">${'★'.repeat(s)}${'☆'.repeat(5-s)}</span></div><p>${t}</p></div>`).join('')}</div>
  </div>
  <div class="rv" style="--d:120ms">${actionCard(b)}</div>
 </div>
 ${sim.length?`<section class="sec white"><div class="wrap"><div class="sec-head"><div>${eb('Similar places')}<h2 style="font-size:36px">More ${c.n.toLowerCase()} <em>in ${state.city}</em></h2></div></div><div class="bgrid">${sim.map(bcard).join('')}</div></div></section>`:''}`;
};

V.services=()=>{
 return head([['Home','home'],['Services']],'Every service, <em>and how it works.</em>',`The brief lists 27 services. We turned them into ${CATS.length} public categories and 4 platform features, and marked what a customer can do in each one.`)+`
 <section class="sec" style="padding-top:44px"><div class="wrap">
  <div class="legend rv"><span>${modeTag('enquiry')} Listing and enquiry, business calls back</span><span>${modeTag('booking')} Pick a date and slot</span><span>${modeTag('order')} Cart, payment and delivery</span><span>${modeTag('donate')} Online payment to a cause</span></div>
  <div class="box rv"><div class="tscroll"><table class="tbl"><thead><tr><th>Final name</th><th>Reference name</th><th>Group</th><th>Customer can</th><th>Phase</th><th></th></tr></thead><tbody>
   ${CATS.map(c=>`<tr><td><b>${c.n}</b><small>${c.d}</small></td><td>${c.was}</td><td>${GROUPS.find(g=>g.id===c.g).n}</td><td>${modeTag(modeOf(c.id))}</td><td>Phase ${c.ph}</td><td><button class="pillbtn" data-act="cat" data-id="${c.id}">Browse</button></td></tr>`).join('')}
   ${PLATFORM.map(p=>`<tr><td><b>${p.n}</b><small>${p.d}</small></td><td>${p.was}</td><td>Platform feature</td><td>–</td><td>Phase ${p.ph}</td><td></td></tr>`).join('')}
  </tbody></table></div></div>
  <div class="sec-head" style="margin-top:80px"><div>${eb('Suggested rollout')}<h2>Suggested rollout in three phases</h2><p class="lede">Enquiry categories need only listings and lead handling. Ordering, delivery and dispatch need payments, partners and support, so they come later.</p></div></div>
  <div class="phase">
   <div class="rv"><span class="lab">Phase 1</span><h3>Discovery and leads</h3><ul><li>All listing and enquiry categories</li><li>Slot booking for doctors and salons</li><li>Business owner dashboard and deals</li><li>City team dashboard with 4 roles</li><li>Superadmin, city sites, seeding tools</li></ul></div>
   <div class="rv" style="--d:100ms"><span class="lab">Phase 2</span><h3>Payments</h3><ul><li>Event and tour tickets</li><li>Shopping and books with online payment</li><li>Fundraisers with 80G receipts</li><li>City news and campaigns</li><li>Paid featured plans</li></ul></div>
   <div class="rv" style="--d:200ms"><span class="lab">Phase 3</span><h3>Fulfilment</h3><ul><li>Food and grocery delivery</li><li>Cab booking with driver dispatch</li><li>Pick up and drop</li><li>Delivery partner app</li></ul></div>
  </div>
 </div></section>
 <section class="sec dark"><div class="wrap">
  <div class="sec-head"><div>${eb('AI, only where it helps')}<h2 style="color:var(--bg)">Where we use AI</h2><p class="lede">Each one saves real time for a customer or a staff member. Everything else stays simple.</p></div></div>
  <div class="aigrid">${[['Search in your own words','Understands everyday phrases, local area names and spelling mistakes, such as “cheap dentist near station”.','Customers'],['Review summary','A two-line summary of what reviewers say, so people don’t have to read fifty reviews.','Customers'],['Fill from visiting card','Data entry staff photograph a card or shop board and the listing form fills itself.','Data entry'],['Duplicate check','Flags a new listing that looks like one already on the site before it is approved.','City admin'],['Lead priority','Ranks the call queue by how ready each customer looks to buy.','Telecallers']].map(([t,d,w],i)=>`<div class="aif rv" style="--d:${(i%3)*80}ms"><span class="ai" style="background:var(--bg);color:var(--ink);align-self:flex-start">AI</span><h3>${t}</h3><p>${d}</p><span class="who">Used by: ${w}</span></div>`).join('')}</div>
 </div></section>`;
};

V['list-business']=()=>{
 const s=state.lb.step, steps=['Business details','Contact and location','Choose a plan'];
 const plans=[['free','Free','₹0',['Basic listing','Enquiries by SMS','Edit any time']],['featured','Featured','₹999/mo',['Top of your category','Deal badge','WhatsApp enquiries','Monthly report']],['premium','Premium','₹2,499/mo',['Everything in Featured','Home page slot','Online booking or ordering','Account manager']]];
 if(s===3) return head([['Home','home'],['For business']],'You’re <em>almost live.</em>')+`<div class="wrap form-wrap"><div class="panel rv done"><div class="tick">${I.check}</div><h3>Listing submitted</h3><p>Our ${state.city} team will call you within one working day to verify details and take photos. It is now waiting in the city team’s approval list.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="btn btn-line" href="#team" data-act="see-approvals">See it in the team dashboard</a><a class="btn btn-ink" href="#home" data-act="lb-reset">Back to home</a></div></div></div>`;
 const body=[
  `<div class="field"><label for="lbName">Business name</label><input id="lbName" required placeholder="e.g. Gupta Kirana Store"></div>
   <div class="field"><label for="lbCat">Category</label><select id="lbCat">${CATS.map(c=>`<option value="${c.id}">${c.n}</option>`).join('')}</select></div>
   <div class="field"><label for="lbAbout">What do you offer?</label><textarea id="lbAbout" placeholder="Products, services, price range"></textarea></div>`,
  `<div class="row2"><div class="field"><label for="lbOwner">Owner name</label><input id="lbOwner" required></div><div class="field"><label for="lbPhone">Mobile</label><input id="lbPhone" required inputmode="numeric" placeholder="10 digits"></div></div>
   <div class="row2"><div class="field"><label for="lbArea">Area</label><select id="lbArea">${AREAS.map(a=>`<option>${a}</option>`).join('')}</select></div><div class="field"><label for="lbCity">City</label><input id="lbCity" value="${state.city}" readonly></div></div>
   <div class="field"><label for="lbAddr">Full address</label><input id="lbAddr" placeholder="Shop number, street, landmark"></div>`,
  `<div class="plans">${plans.map(([id,n,p,f])=>`<button type="button" class="plan ${state.lb.plan===id?'on':''}" data-act="plan" data-v="${id}"><span class="eyebrow">${n}</span><b>${p}</b><ul>${f.map(x=>`<li>${x}</li>`).join('')}</ul></button>`).join('')}</div><p class="muted" style="margin-top:16px;font-size:13.5px">Sample prices for the prototype. A ${state.city} team member calls to verify every business before it goes live.</p>`
 ];
 return head([['Home','home'],['For business']],'Get found by customers near you',`Free to start. Reach people in ${state.city} who are already searching for what you sell.`)+`
 <div class="wrap form-wrap"><div class="stepper rv">${steps.map((t,i)=>`<div class="${i===s?'on':i<s?'ok':''}">${i+1}. ${t}</div>`).join('')}</div>
  <form class="panel rv" style="--d:80ms" data-form="lb">${body[s]}
   <div class="form-nav">${s?'<button type="button" class="btn btn-line" data-act="lb-back">Back</button>':'<span></span>'}<button class="btn btn-ink" type="submit">${s===2?'Submit listing':'Continue'} <span class="ar">${I.arrow}</span></button></div>
  </form></div>`;
};

V.franchise=()=>{
 const live=CITIES.filter(c=>c.st==='live').length;
 const steps=(arr)=>arr.map(([t,d],i)=>`<div class="st"><span class="n">0${i+1}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('');
 return head([['Home','home'],['Franchise']],'Run Localist <em>in your city.</em>','One shared platform, your own city site. The central team sets it up and adds the first listings; your local team grows it from there.')+`
 <section class="sec" style="padding-top:48px"><div class="wrap">
  <div class="statrow rv"><div><b>100+</b><span>city domains reserved</span></div><div><b>500</b><span>cities planned</span></div><div><b>${live}</b><span>cities live in this demo</span></div><div><b>4</b><span>local team roles</span></div></div>
  <p class="muted rv" style="font-size:13px;margin-top:10px">Domain and city counts come from the brief and are still to be verified.</p>
  <div class="sec-head" style="margin-top:80px"><div>${eb('Who does what')}<h2>Central sets up. <em>Local grows.</em></h2></div></div>
  <div class="two light">
   <div class="rv"><span class="eyebrow">Before launch · Central team</span><div style="margin-top:20px">${steps([['Domain and site','Maps the city domain, sets the city name, banners and featured categories.'],['Seed listings','Adds the first 1,500 to 3,000 verified listings so the site is useful on day one.'],['Train the team','Gives logins to the admin, data entry, marketing and telecalling staff.']])}</div></div>
   <div class="rv" style="--d:100ms"><span class="eyebrow">After launch · Local team</span><div style="margin-top:20px">${steps([['Maintain listings','Adds new businesses, updates details and visits shops to verify them.'],['Promote','Sells featured plans and runs offers, banners and WhatsApp campaigns.'],['Handle enquiries','Telecallers call customers back and connect them to businesses.']])}</div></div>
  </div>
  <div class="sec-head" style="margin-top:80px"><div>${eb('Team roles')}<h2>A login <em>for every job.</em></h2></div><a class="pillbtn rv" href="#team">Open the team dashboard ${I.arrow}</a></div>
  <div class="roles">${[['Superadmin','Central team. All cities, domains, categories, pricing and franchise accounts.','#admin','super'],['City admin','Owns one city. Approves listings, manages staff and sees every report.','#team','admin'],['Data entry','Adds and edits listings, fills from visiting cards, sends for approval.','#team','data'],['Marketing','Runs offers, featured slots, banners and campaigns.','#team','mkt'],['Telecaller','Works the call queue, updates each lead, books visits.','#team','tele']].map(([n,d,h,k],i)=>`<a href="${h}" class="role rv" style="--d:${i*60}ms;text-decoration:none" data-act="role-go" data-v="${k}"><span class="ic">${I.users}</span><h3>${n}</h3><p>${d}</p></a>`).join('')}</div>
  <div class="sec-head" style="margin-top:80px"><div>${eb('Cities')}<h2>Where Localist <em>is live.</em></h2></div><div class="legend" style="margin:0">${stTag('live')}${stTag('opening')}${stTag('available')}</div></div>
  <div class="ccity">${CITIES.map((c,i)=>`<button class="rv" style="--d:${(i%6)*40}ms" data-act="city" data-v="${c.n}"><div><b>${c.n}</b><small>${c.d}</small></div>${stTag(c.st)}</button>`).join('')}</div>
 </div></section>
 <section class="sec dark"><div class="wrap apply">
  <div>${eb('Apply')}<h2 style="color:var(--bg);margin-top:14px">Tell us about <em>your city.</em></h2><p class="lede" style="margin-top:16px">We reply within 3 working days with the territory, investment and launch timeline.</p></div>
  <form class="panel" data-form="fr" style="color:var(--ink)">
   <div class="row2"><div class="field"><label for="frName">Your name</label><input id="frName" required></div><div class="field"><label for="frPhone">Mobile</label><input id="frPhone" required inputmode="numeric"></div></div>
   <div class="field"><label for="frCity">City you want</label><select id="frCity">${CITIES.filter(c=>c.st!=='live').map(c=>`<option>${c.n}</option>`).join('')}<option>Other city</option></select></div>
   <div class="field"><label for="frBg">Your background</label><select id="frBg"><option>Local business owner</option><option>Media or advertising</option><option>Sales or telecalling agency</option><option>Other</option></select></div>
   <button class="btn btn-ink btn-block" type="submit">Send application</button></form>
 </div></section>`;
};

V.app=()=>head([['Home','home'],['Mobile app']],'Localist on <em>Android and iOS.</em>','One app for customers, with a business mode for owners. Same account and same data as the website.')+`
 <section class="sec white" style="padding-top:60px"><div class="wrap">
  <div class="phrow rv">${phoneHome()}${phoneList()}${phoneBiz()}${phoneActivity()}${phoneOwner()}</div>
  <div class="journey rv" style="margin-top:30px">${[['Open','Home','City picked from location, categories and nearby picks.'],['Search','Results','Plain-language search with AI reading.'],['Decide','Business','Ratings, photos, slots and a review summary.'],['Track','Activity','Bookings, orders and enquiry status.'],['Business','Owner mode','Leads, listing edits and offers on the go.']].map(([s,t,d])=>`<div><small>${s}</small><b>${t}</b><p>${d}</p></div>`).join('')}</div>
 </div></section>`;

V.design=()=>{
 const sw=[['Ivory','#F8F5EF','Page background'],['White','#FFFFFF','Cards, panels'],['Alabaster','#F2ECE1','Soft fills'],['Beige','#E8DDCE','Lines, chips'],['Taupe','#B2A18D','Muted on dark'],['Brown','#80634C','Accent, labels'],['Chocolate','#49382B','Body on light'],['Charcoal','#191815','Text, buttons']];
 return head([['Home','home'],['Design system']],'The Localist <em>design system.</em>','Colours, type and components shared by the website, the apps and every dashboard.')+`
 <section class="sec" style="padding-top:50px"><div class="wrap" style="display:flex;flex-direction:column;gap:70px">
  <div><h2 style="font-size:34px;margin-bottom:24px">Colour</h2><div class="sw">${sw.map(([n,h,u])=>`<div class="rv"><i style="background:${h}"></i><span><b>${n}</b><small>${h} · ${u}</small></span></div>`).join('')}</div></div>
  <div><h2 style="font-size:34px;margin-bottom:10px">Type</h2><div class="typo">
   <div class="rv"><small>Display · Playfair</small><h1 style="font-size:clamp(36px,5vw,56px)">Trusted local businesses</h1></div>
   <div class="rv"><small>Heading</small><h3 style="font-size:28px">Good businesses, right around you</h3></div>
   <div class="rv"><small>Body · Jakarta</small><p class="lede">Find trusted doctors, tutors and grocery stores. Talk to them directly, book a slot or order online.</p></div>
   <div class="rv"><small>Label</small><span class="eyebrow">Verified local discovery</span></div></div></div>
  <div><h2 style="font-size:34px;margin-bottom:24px">Components</h2>
   <div class="box rv" style="display:flex;flex-direction:column;gap:22px">
    <div class="dsrow"><button class="btn btn-ink">Primary <span class="ar">${I.arrow}</span></button><button class="btn btn-line">Secondary</button><button class="btn btn-ink btn-sm">Small</button><button class="pillbtn">Link pill ${I.arrow}</button></div>
    <div class="dsrow">${Object.keys(MODE).map(modeTag).join('')}<span class="vbadge" style="box-shadow:inset 0 0 0 1px var(--line)">${I.shield} Verified</span><span class="ai">AI</span></div>
    <div class="dsrow">${['new','called','won','lost'].map(k=>`<span class="pill s-${k}">${ST[k]}</span>`).join('')}${stTag('live')}${stTag('opening')}${stTag('available')}</div>
    <div class="dsrow"><button class="chip on">Selected</button><button class="chip">Chip</button><button class="toggle on" aria-label="Toggle on example"></button><button class="toggle" aria-label="Toggle off example"></button></div>
    <div class="row2" style="max-width:640px"><div class="field"><label for="dsIn">Input</label><input id="dsIn" placeholder="Your name"></div><div class="field"><label for="dsSel">Select</label><select id="dsSel"><option>Jaipur</option></select></div></div>
   </div>
   <div class="bgrid" style="margin-top:22px">${bcard(listings('doctor')[0])}${bcard(listings('food')[1],1)}${bcard(listings('marriage')[0],2)}</div></div>
  <div><h2 style="font-size:34px">Motion</h2><p class="lede" style="margin-top:12px">An opening intro once per visit, a soft rise as sections scroll in, a gentle lift on cards. Reduced-motion settings turn all of it off.</p></div>
 </div></section>`;
};

V.login=()=>{
 const as=state.loginAs;
 return `<div class="login"><div class="login-art">${art('login-'+state.city,'city',cityObj().lm)}<div class="rv"><span class="eyebrow" style="color:var(--beige)">${state.city} · ${cityObj().d}</span><h2 style="margin-top:14px">Welcome back.</h2></div></div>
  <div class="login-f"><h2 class="rv" style="font-size:40px">Sign in</h2><p class="muted rv" style="margin-top:8px">One login for customers, business owners and franchise teams.</p>
   <div class="seg rv" role="tablist">${[['customer','Customer'],['business','Business'],['team','City team'],['super','Superadmin']].map(([k,l])=>`<button role="tab" class="${as===k?'on':''}" data-act="login-as" data-v="${k}">${l}</button>`).join('')}</div>
   <form data-form="login" class="rv" style="--d:80ms">
    ${state.otp?`<div class="field"><span class="flabel">Enter the 6-digit code</span><div class="otp">${[0,1,2,3,4,5].map(i=>`<input id="otp${i}" maxlength="1" inputmode="numeric" aria-label="Digit ${i+1}">`).join('')}</div></div><p class="muted" style="font-size:13.5px;margin-bottom:18px">Prototype: any 6 digits work.</p><button class="btn btn-ink btn-block" type="submit">Verify and continue</button><button type="button" class="pillbtn" style="margin-top:14px" data-act="otp-back">Change number</button>`
    :`<div class="field"><label for="lgPhone">Mobile number</label><input id="lgPhone" required inputmode="numeric" placeholder="98290 12345" pattern="[0-9 ]{10,12}"></div><button class="btn btn-ink btn-block" type="submit">Send code</button><p class="muted" style="font-size:13.5px;margin-top:14px">${as==='team'||as==='super'?'Team accounts are created by your admin.':'New here? Your account is created on first sign-in.'}</p>`}
   </form></div></div>`;
};

/* ===== news and deals ===== */
function newsItems(){const c=state.city;return [
 {tag:'Civic',t:'New feeder bus route links the railway station to the industrial area',d:'Twelve buses will run every 15 minutes from Monday with a flat ₹10 fare. The route stops at Station Road, Civil Lines and Ring Road.',ago:2},
 {tag:'Markets',t:`Diwali fair opens at the ${c} town ground`,d:'More than 300 stalls, open 4 pm to 11 pm until 3 November. Parking is available at the stadium gate.',ago:5},
 {tag:'Health',t:'Free dental check-up camp this Sunday',d:'Children under 14 can get a free check-up at four clinics listed on Localist. No appointment needed.',ago:20},
 {tag:'Education',t:'School admissions for the 2027 session open next month',d:'Most CBSE schools in the city will accept forms from 1 December. Compare fees and dates on the Schools page.',ago:28},
 {tag:'Business',t:`146 new businesses joined Localist ${c} this week`,d:'Most new listings came from tutors, salons and home services.',ago:50},
 {tag:'Traffic',t:'MG Road one-way trial extended by two weeks',d:'The traffic police say peak-hour delays fell during the trial period.',ago:70}
]}
const hrs=h=>h<24?h+' hr ago':Math.round(h/24)+' days ago';
const nart=(n,big)=>`<article class="nart rv ${big?'big':''}"><span class="tag">${n.tag}</span><h3>${esc(n.t)}</h3><p>${esc(n.d)}</p><small>${hrs(n.ago)} · Localist ${state.city} desk</small></article>`;
V.news=()=>{const N=newsItems();return head([['Home','home'],['City news']],`${state.city} news`,'Short local updates written by the city team: civic news, markets, events, health camps and admissions.')+`
 <section class="sec" style="padding-top:48px"><div class="wrap"><div class="nlist" style="margin-bottom:48px">${nart(N[0],true)}${nart(N[1])}${nart(N[2])}</div><div class="nfull">${N.slice(3).map(n=>nart(n)).join('')}</div>
 <p class="muted rv" style="margin-top:40px;font-size:13px">City teams publish news from the City site tab in their dashboard. Sample stories for the prototype.</p></div></section>`};

const dcode=b=>'LOC'+(hash(b.id)%900+100);
function dealsList(){return allListings().map(b=>biz(b.id)).filter(b=>b&&b.deal)}
function dealCard(b,i=0){return `<article class="dealc rv" style="--d:${(i%3)*60}ms"><div class="dl-l"><b>${esc(b.deal)}</b><small>${CAT[b.cat].n}</small></div>
 <div class="dl-r"><div class="bc-top">${tile(b.name,b.id,'sm')}<div class="bc-id"><h3 data-act="biz" data-id="${b.id}">${esc(b.name)}</h3><small class="muted">${b.area} · Valid till 30 Nov</small></div></div>
 <div class="dl-a"><button class="code" data-act="copy" data-code="${dcode(b)}" aria-label="Copy code ${dcode(b)}">${dcode(b)}</button><button class="pillbtn" data-act="biz" data-id="${b.id}">View business</button></div></div></article>`}
V.deals=()=>{const g=state.dgroup||'all';const L=dealsList().filter(b=>g==='all'||CAT[b.cat].g===g);
 return head([['Home','home'],['Deals']],`Deals in ${state.city}`,'Offers from verified local businesses. Show the code at the shop or mention it when they call you back.',
 `<div class="chiprow rv" style="margin-top:24px">${[{id:'all',n:'All deals'},...GROUPS].map(t=>`<button class="chip ${g===t.id?'on':''}" data-act="dgroup" data-v="${t.id}">${t.n}</button>`).join('')}</div>`)+`
 <section class="sec" style="padding-top:40px"><div class="wrap"><p class="muted" style="font-size:14px;margin-bottom:18px">${L.length} active offers</p>
 ${L.length?`<div class="dgrid2">${L.map(dealCard).join('')}</div>`:'<div class="empty">No offers in this group right now.</div>'}
 <p class="muted" style="margin-top:32px;font-size:13px">Business owners add offers from their dashboard. The marketing team can feature them in campaigns.</p></div></section>`};

/* ===== user journeys ===== */
const JOURNEYS=[
 {k:'customer',n:'Customer books a dentist',who:'Resident, 34, mostly on phone',route:'business',steps:[
  ['Need','Has a toothache, wants a dentist near home tomorrow','Is there someone good close by?','Home, search','Search must work with plain words','#B2A18D'],
  ['Search','Types “dentist near station”','Which of these can I trust?','Search results','Show verified badge and reply time first','#B2A18D'],
  ['Compare','Opens two clinics and reads reviews','What do people say? What will it cost?','Business page','A short review summary saves time','#A3641B'],
  ['Book','Picks tomorrow, 5:30 pm','Will they actually confirm?','Booking card','Instant SMS and WhatsApp confirmation','#3A6945'],
  ['Visit','Gets a reminder and visits','That was easy.','App activity','Ask for a review after the visit','#3A6945']]},
 {k:'owner',n:'Business owner gets more customers',who:'Salon owner, 41, busy in the shop',route:'owner',steps:[
  ['Join','A city team member visits the salon','Is this another paid scam?','List your business','Free plan and a real person build trust','#A3641B'],
  ['Verify','Team takes photos and checks the phone','Will my listing look good?','Team: add listing','Fill from visiting card saves time','#B2A18D'],
  ['Receive','Gets an enquiry on WhatsApp','A new customer, nice.','Owner: enquiries','Show the lead in one tap','#3A6945'],
  ['Reply','Calls back and books the slot','I should reply faster.','Owner: enquiries','Show reply-time ranking','#B2A18D'],
  ['Grow','Adds a festive offer','Will more people see me?','Owner: offers','Suggest featured plan with real numbers','#3A6945']]},
 {k:'tele',n:'Telecaller closes leads',who:'Telecaller, 24, 60 calls a day',route:'team',steps:[
  ['Start','Opens the call queue at 10 am','Who do I call first?','Team: call queue','Rank leads by readiness','#B2A18D'],
  ['Prepare','Reads the customer’s need','What exactly did they ask?','Call card','Show need and business on one line','#B2A18D'],
  ['Call','Calls and connects to the business','Hope they pick up.','Phone','Click to call from the dashboard','#A3641B'],
  ['Update','Marks Interested or Call later','I must not forget this one.','Team: call queue','One-tap status, auto follow-up','#3A6945'],
  ['Report','Admin checks conversions','Did my calls count?','Team: overview','Per-person conversion on overview','#3A6945']]},
 {k:'super',n:'Central team launches a city',who:'Operations lead at head office',route:'admin',steps:[
  ['Reserve','Confirms the domain is registered','Do we really own this one?','Superadmin: domains','Validate all 100+ domains first','#A3641B'],
  ['Configure','Sets city name, banner and categories','Same setup again for each city.','Superadmin: launch','Copy settings from a similar city','#B2A18D'],
  ['Seed','Imports the first 1,500+ listings','Is the data clean?','Superadmin: launch','Duplicate check before import','#B2A18D'],
  ['Train','Creates logins for the local team','Who can see what?','Roles & access','Clear permissions by role','#B2A18D'],
  ['Go live','Hands over to the franchise','Will it grow without us?','City team dashboard','Weekly city health report','#3A6945']]}
];
V.journeys=()=>{const j=JOURNEYS.find(x=>x.k===(state.jk||'customer'));
 const rows=[['Stage',0],['Doing',1],['Thinking',2],['Screen',3],['Opportunity',4]];
 return head([['Home','home'],['User journeys']],'User journeys','How each type of user moves through Localist, what they worry about at each step, and what the design does about it.',
 `<div class="chiprow rv jtabs" style="margin-top:24px">${JOURNEYS.map(x=>`<button class="chip ${x.k===j.k?'on':''}" data-act="jk" data-v="${x.k}">${x.n}</button>`).join('')}</div>`)+`
 <section class="sec" style="padding-top:40px"><div class="wrap">
  <div class="jmeta rv"><div><h2 style="font-size:32px">${j.n}</h2><p class="muted" style="margin-top:6px">${j.who}</p></div><a class="pillbtn" href="#${j.route}">Open these screens ${I.arrow}</a></div>
  <div class="tscroll rv"><div class="jmap">
   ${rows.map(([lab,ix])=>`<div class="jl">${lab}</div>${j.steps.map((s,i)=>ix===0?`<div class="jh"><small>STEP ${i+1}</small>${s[0]}</div>`:ix===2?`<div class="think"><span class="emo"><i style="background:${s[5]}"></i>“${s[2]}”</span></div>`:ix===4?`<div class="opp">${s[4]}</div>`:`<div>${s[ix]}</div>`).join('')}`).join('')}
  </div></div>
  <p class="muted" style="font-size:13px;margin-top:14px">Dot colour shows how the user feels at that step: green is confident, amber is unsure, taupe is neutral.</p>
 </div></section>`};

/* ===== wireframes ===== */
const ln=(w,d)=>`<div class="ln ${d?'d':''}" style="width:${w}%"></div>`;
const bx=(h,x=1,st='')=>`<div class="bx ${x?'x':''}" style="height:${h}px;${st}"></div>`;
const num=(n,t,l)=>`<span class="n" style="top:${t}px;left:${l}px">${n}</span>`;
const nav=`<div class="r" style="justify-content:space-between"><div class="r">${bx(18,0,'width:18px')}${ln(18,1).replace('width:18%','width:60px')}</div><div class="r"><div class="bt o" style="width:44px"></div><div class="bt" style="width:60px"></div></div></div>`;
const WFS=[
 {n:'Home',r:'home',html:`${nav}<div class="g" style="grid-template-columns:1.1fr 1fr;margin-top:6px"><div style="display:flex;flex-direction:column;gap:7px">${ln(40)}${ln(90,1)}${ln(70,1)}${ln(85)}${ln(60)}<div class="r" style="margin-top:4px"><div class="bt" style="width:70px"></div><div class="bt o" style="width:70px"></div></div></div><div class="bx" style="height:110px;padding:8px;display:flex;flex-direction:column;gap:6px;background:#F4F3F0;border:1px solid #D9D6D0"><div class="ip"></div>${[0,1,2].map(()=>`<div class="r">${bx(16,0,'width:16px')}${ln(60)}</div>`).join('')}</div></div>
   <div class="ip" style="margin-top:6px"></div><div class="g" style="grid-template-columns:repeat(4,1fr)">${[0,1,2,3,4,5,6,7].map(()=>bx(40,0)).join('')}</div>${num(1,46,10)}${num(2,50,180)}${num(3,182,10)}${num(4,214,10)}`,
  notes:['Headline and two main actions','Live preview of real results builds trust','Search with city, category and free text','Categories grouped, each shows enquiry, booking or order']},
 {n:'Search results',r:'explore',html:`${nav}${ln(50,1)}<div class="ip"></div><div class="g" style="grid-template-columns:90px 1fr;flex:1"><div style="display:flex;flex-direction:column;gap:6px">${[0,1,2,3].map(()=>`${ln(60)}<div class="ip" style="height:18px"></div>`).join('')}</div><div style="display:flex;flex-direction:column;gap:6px"><div class="bx" style="height:24px;background:#F4F3F0;border:1px dashed #C9C5BE"></div><div class="g" style="grid-template-columns:1fr 1fr">${[0,1,2,3].map(()=>`<div style="border:1px solid #D9D6D0;border-radius:6px;padding:6px;display:flex;flex-direction:column;gap:5px"><div class="r">${bx(18,0,'width:18px')}${ln(60,1)}</div>${ln(80)}<div class="r"><div class="bt o" style="width:40%"></div><div class="bt" style="width:40%"></div></div></div>`).join('')}</div></div></div>${num(1,72,10)}${num(2,92,10)}${num(3,96,120)}`,
  notes:['Search keeps the typed words','Filters: sort, area, action type, verified, open now','Smart search explains how it read the query']},
 {n:'Business page',r:'business',html:`${nav}<div class="r" style="margin-top:4px">${bx(46,0,'width:46px')}<div style="flex:1;display:flex;flex-direction:column;gap:6px">${ln(70,1)}<div class="r">${[0,1,2,3].map(()=>'<div class="bt o" style="width:44px;height:14px"></div>').join('')}</div></div></div><div class="g" style="grid-template-columns:1.3fr 1fr;flex:1"><div style="display:flex;flex-direction:column;gap:6px">${ln(30,1)}${ln(95)}${ln(85)}${ln(30,1)}<div class="g" style="grid-template-columns:1fr 1fr">${[0,1,2,3].map(()=>bx(16,0)).join('')}</div>${ln(30,1)}${bx(50)}</div><div style="border:1.5px solid #9C9890;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px">${ln(60,1)}${ln(40)}<div class="r">${[0,1,2].map(()=>'<div class="bt o" style="width:30%;height:16px"></div>').join('')}</div><div class="r">${[0,1,2].map(()=>'<div class="bt o" style="width:30%;height:16px"></div>').join('')}</div><div class="ip"></div><div class="ip"></div><div class="bt"></div></div></div>${num(1,52,10)}${num(2,112,220)}${num(3,200,10)}`,
  notes:['Name, rating, area and status in one line','Action card changes with the service: enquiry, booking, order or donate','Highlights, timings, map and a review summary']},
 {n:'Enquiry form',r:'home',html:`<div style="flex:1;background:#ECEAE6;border-radius:8px;display:grid;place-items:center;padding:10px"><div style="background:#fff;border-radius:10px;padding:12px;width:85%;display:flex;flex-direction:column;gap:7px">${ln(30)}${ln(70,1)}${ln(50)}<div class="ip"></div><div class="g" style="grid-template-columns:1fr 1fr"><div class="ip"></div><div class="ip"></div></div><div class="ip"></div><div class="ip" style="height:48px"></div><div class="r" style="justify-content:flex-end"><div class="bt o" style="width:60px"></div><div class="bt" style="width:80px"></div></div></div></div>${num(1,40,30)}${num(2,108,30)}${num(3,262,250)}`,
  notes:['Shows who the enquiry goes to','Only name and phone are required','Clear submit; the lead reaches owner, team and admin']},
 {n:'City team dashboard',r:'team',html:`<div class="g" style="grid-template-columns:70px 1fr;flex:1"><div style="background:#9C9890;border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:7px">${[0,1,2,3,4,5].map(()=>'<div style="height:7px;border-radius:4px;background:#ECEAE6;width:80%"></div>').join('')}</div><div style="display:flex;flex-direction:column;gap:8px">${ln(40,1)}<div class="g" style="grid-template-columns:repeat(4,1fr)">${[0,1,2,3].map(()=>`<div style="border:1px solid #D9D6D0;border-radius:6px;padding:6px;display:flex;flex-direction:column;gap:5px">${ln(70)}${ln(40,1)}</div>`).join('')}</div><div class="g" style="grid-template-columns:1.4fr 1fr">${bx(90,0,'display:flex;align-items:flex-end;gap:5px;padding:6px')}${bx(90,0)}</div>${[0,1,2].map(()=>`<div class="r">${ln(25)}${ln(30)}${ln(20)}<div class="bt o" style="width:40px;height:14px"></div></div>`).join('')}</div></div>${num(1,20,20)}${num(2,40,100)}${num(3,190,100)}`,
  notes:['Menu changes by role: admin, data entry, marketing, telecaller','Key numbers first','Enquiry table with status anyone on the team can update']},
 {n:'App home',r:'app',phone:1,html:`${ln(30)}${ln(70,1)}<div class="ip" style="border-radius:999px"></div><div class="g" style="grid-template-columns:repeat(4,1fr)">${[0,1,2,3,4,5,6,7].map(()=>bx(30,0)).join('')}</div>${[0,1,2].map(()=>`<div class="r" style="border:1px solid #D9D6D0;border-radius:8px;padding:6px">${bx(26,0,'width:26px')}<div style="flex:1;display:flex;flex-direction:column;gap:4px">${ln(70,1)}${ln(50)}</div></div>`).join('')}<div class="r" style="margin-top:auto;justify-content:space-around;border-top:1px solid #D9D6D0;padding-top:8px">${[0,1,2,3].map(()=>bx(14,0,'width:14px')).join('')}</div>${num(1,60,170)}${num(2,100,170)}${num(3,370,170)}`,
  notes:['Greeting and search always on top','Eight most-used categories','Tab bar: home, explore, activity, profile']}
];
V.wireframes=()=>head([['Home','home'],['Wireframes']],'Wireframes','Low-fidelity layouts for the key screens, used to agree structure before visual design. Numbers point to the notes under each frame.')+`
 <section class="sec" style="padding-top:48px"><div class="wrap"><div class="wfgrid">${WFS.map((w,i)=>`<div class="wfc rv" style="--d:${(i%3)*60}ms"><h3>${i+1}. ${w.n}<a class="pillbtn" href="#${w.r}">See final design ${I.arrow}</a></h3><div class="wf ${w.phone?'phone':''}">${w.html}</div><ol>${w.notes.map(n=>`<li>${n}</li>`).join('')}</ol></div>`).join('')}</div></div></section>`;

/* ===== usability testing ===== */
const TASKS=[
 ['Find a dentist near Station Road and book a slot for tomorrow','Customer','Booked in under 2 minutes without help'],
 ['Send an enquiry to a wedding caterer','Customer','Enquiry sent without help'],
 ['Change the city to Pune','Customer','Done in under 20 seconds'],
 ['Add a festive offer to your listing','Business owner','Offer shows on the public page'],
 ['Call the top lead and record the result','Telecaller','Status updated correctly'],
 ['Approve a new listing and spot the duplicate','City admin','Duplicate noticed before approving']];
V.testing=()=>{
 const S=db.sessions||[], cur=state.ts||{};
 const rate=i=>{const r=S.map(s=>s.res[i]).filter(Boolean);return r.length?Math.round(r.filter(x=>x==='ok').length/r.length*100):null};
 return head([['Home','home'],['Usability testing']],'Usability testing','Two rounds with 8 real users: one on the clickable prototype before development, one on the beta before launch. Record each session below.')+`
 <section class="sec" style="padding-top:48px"><div class="wrap" style="display:flex;flex-direction:column;gap:48px">
  <div class="tplan">
   <div class="box rv"><small class="eyebrow">Participants</small><b>8</b><p>3 customers, 2 business owners, 2 telecallers, 1 city admin, recruited in two cities.</p></div>
   <div class="box rv" style="--d:60ms"><small class="eyebrow">Format</small><b>30 min</b><p>Moderated, in person or on video. Think aloud, no help unless stuck.</p></div>
   <div class="box rv" style="--d:120ms"><small class="eyebrow">Rounds</small><b>2</b><p>Round 1 on this prototype, round 2 on the beta build before launch.</p></div>
   <div class="box rv" style="--d:180ms"><small class="eyebrow">Pass mark</small><b>80%</b><p>Of participants finish each task without help. Below that, we redesign.</p></div>
  </div>
  <div class="d2">
   <form class="box rv" data-form="tsession"><h3>Record a session</h3>
    <div class="row2"><div class="field"><label for="tsName">Participant</label><input id="tsName" required placeholder="e.g. P4, salon owner"></div><div class="field"><label for="tsRole">Type</label><select id="tsRole"><option>Customer</option><option>Business owner</option><option>Telecaller</option><option>City admin</option></select></div></div>
    ${TASKS.map((t,i)=>`<div class="task"><span class="no">${i+1}</span><div>${t[0]}<small>${t[1]} · Pass: ${t[2]}</small></div><div class="res">${[['ok','Done'],['help','Needed help'],['fail','Failed']].map(([k,l])=>`<button type="button" class="${k} ${cur[i]===k?'on':''}" data-act="tres" data-i="${i}" data-v="${k}">${l}</button>`).join('')}</div></div>`).join('')}
    <div class="field" style="margin-top:14px"><label for="tsNote">Notes</label><textarea id="tsNote" placeholder="Where did they hesitate? What did they say?"></textarea></div>
    <button class="btn btn-ink" type="submit">Save session</button></form>
   <div style="display:flex;flex-direction:column;gap:16px;min-width:0">
    <div class="box rv"><h3>Task success so far <span class="muted" style="font-weight:500;font-size:13px">${S.length} ${S.length===1?'session':'sessions'}</span></h3>
     ${TASKS.map((t,i)=>{const r=rate(i);return `<div class="rate"><span>${i+1}. ${t[0].split(' ').slice(0,5).join(' ')}…</span><i><span style="width:${r||0}%;${r!==null&&r<80?'background:var(--warn)':''}"></span></i><b style="text-align:right">${r===null?'–':r+'%'}</b></div>`}).join('')}</div>
    <div class="box rv"><h3>Sessions</h3>${S.length?S.map(s=>`<div class="lrow"><div><b>${esc(s.name)}</b>${s.example?' <span class="pill s-called">Example</span>':''}<br><small class="muted">${esc(s.role)} · ${esc(s.note||'No notes')}</small></div><small class="muted">${rel(s.t)}</small></div>`).join(''):'<p class="muted">No sessions yet.</p>'}</div>
   </div>
  </div>
 </div></section>`};

/* ===== proposal ===== */
const PRICE0=[['UX research, user journeys and wireframes',6000],['Custom design system',4000],['UI design: website and dashboards',8000],['UI design: Android and iOS apps',5000],['Interactive prototype',5000],['Usability testing, 2 rounds',4000],['Frontend handover: HTML, CSS and JS',8000]];
const SUP0=[['Basic',3000,['Bug fixes and security updates','Response within 2 working days','Up to 4 hours of work a month']],['Standard',6000,['Everything in Basic','Small changes and new content','Response within 1 working day','Up to 10 hours a month','Monthly health report']],['Priority',12000,['Everything in Standard','Critical issues answered within 4 hours','Up to 25 hours a month','Uptime monitoring and backups check']]];
const GANTT=[['Discovery and UX','Research, journeys, wireframes',1,3,1],['Design system and UI','Web, app and dashboard screens',3,4,1],['Usability testing round 1','8 participants on the prototype',6,2,1],['Phase 1 build: web and admin','Customer site, owner, team, superadmin',7,9,1],['Phase 1 build: Android and iOS','Customer app with owner mode',9,8,1],['Testing round 2 and launch','Beta test, seeding, training, go-live',16,3,1],['Phase 2: payments','Tickets, shopping, donations, paid plans',19,8,2],['Phase 3: fulfilment','Food, grocery, cab and pickup',27,10,3]];
V.proposal=()=>{
 const P=db.price||PRICE0.map(x=>x[1]), SP=db.sup||SUP0.map(x=>x[1]), tot=P.reduce((a,b)=>a+(+b||0),0);
 return head([['Home','home'],['Proposal']],'Scope, plan and estimate','What we recommend building, in what order, what it costs and how we support it after launch. Amounts can be edited on this page before sharing.',
 `<div class="toc rv">${[['p-feat','Features'],['p-time','Phases and timeline'],['p-price','Itemized price'],['p-ass','Assumptions'],['p-sup','Support and maintenance']].map(([id,l])=>`<a class="pillbtn" href="#proposal" data-act="jump" data-v="${id}">${l}</a>`).join('')}</div>`)+`
 <section class="sec" style="padding-top:56px"><div class="wrap" style="display:flex;flex-direction:column;gap:80px">
  <div id="p-feat"><div class="sec-head" style="margin-bottom:28px"><div>${eb('Recommended features')}<h2>Features by user</h2><p class="lede">Final list after reconciling the 27 services into ${CATS.length} categories and 4 platform features.</p></div><a class="pillbtn" href="#services">Service list and modes ${I.arrow}</a></div>
   <div class="feat4">${[['Customers',['City selection by domain or location','Smart search with area and category filters','Business pages with reviews and summary','Enquiry, booking, order and donation flows','Deals, city news, saved places','Activity: bookings, orders, enquiries','OTP sign-in, SMS and WhatsApp updates']],['Business owners',['Free listing or self sign-up','Edit details, timings and photos','Enquiries inbox with status','Offers and coupons','Views, calls and leads report','Featured and premium plans','Owner mode in the app']],['City franchise team',['Role-based logins: admin, data entry, marketing, telecaller','Add listings, fill from visiting card','Approval queue with duplicate check','Call queue ranked by lead readiness','Campaigns and featured slots','City site editor: headline, banner, news','Team and permission management']],['Central superadmin',['All cities and domain status','City launch pipeline and seeding','Category list and customer action per category','Franchise partners and revenue share','Roles and permissions','All-India enquiries and reports','Pricing and plan settings']]].map(([t,l],i)=>`<div class="box rv" style="--d:${i*60}ms"><h3>${t}</h3><ul>${l.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div></div>

  <div id="p-time"><div class="sec-head" style="margin-bottom:28px"><div>${eb('Phases and timeline')}<h2>36 weeks in three phases</h2><p class="lede">Phase 1 covers discovery, design, testing and the listing and enquiry platform. Payments and fulfilment follow once the network is live.</p></div></div>
   <div class="box rv tscroll"><div class="gantt"><div class="gscale"><div></div><div>${[1,5,9,13,17,21,25,29,33].map(w=>`<span>Wk ${w}</span>`).join('')}</div></div>
    ${GANTT.map(([n,d,s,l,p])=>`<div class="gw"><div class="gl"><b>${n}</b><small>${d}</small></div><div class="gtrack"><span class="gbar ${p>1?'p'+p:''}" style="left:${(s-1)/36*100}%;width:${l/36*100}%">${l} wk</span></div></div>`).join('')}</div></div>
   <div class="legend" style="margin-top:14px"><span><i style="width:14px;height:8px;border-radius:3px;background:var(--ink);display:inline-block"></i>Phase 1</span><span><i style="width:14px;height:8px;border-radius:3px;background:var(--brown);display:inline-block"></i>Phase 2</span><span><i style="width:14px;height:8px;border-radius:3px;background:var(--taupe);display:inline-block"></i>Phase 3</span></div></div>

  <div id="p-price"><div class="sec-head" style="margin-bottom:28px"><div>${eb('Itemized price')}<h2>Design and frontend estimate</h2><p class="lede">This estimate covers UX, design, prototype, testing and frontend handover. Backend, app development and Phases 2 and 3 are quoted after the final scope is signed off.</p></div></div>
   <div class="box rv"><div class="tscroll"><table class="tbl ptable" style="min-width:520px"><thead><tr><th>Item</th><th style="text-align:right">Amount (₹)</th></tr></thead><tbody>
    ${PRICE0.map(([n],i)=>`<tr><td>${n}</td><td><input type="number" min="0" step="500" value="${P[i]}" data-price="${i}" aria-label="Amount for ${n}"></td></tr>`).join('')}
   </tbody><tfoot><tr><td>Total, excluding GST</td><td id="pTotal">${inr(tot)}</td></tr></tfoot></table></div>
   <p class="muted" style="font-size:13px;margin-top:12px">Payment: 40% to start, 30% after design sign-off, 30% on handover. Edits are saved in this browser.</p></div></div>

  <div id="p-ass"><div class="sec-head" style="margin-bottom:28px"><div>${eb('Assumptions')}<h2>What this plan assumes</h2></div></div>
   <div class="box rv"><ul class="alist">${['The client confirms the final list of cities and validates the 100+ domains before launch','The client provides logos, brand guidelines (if any), and content for seed listings or a data source','Third-party costs are billed at actual cost: SMS, WhatsApp API, payment gateway, maps, hosting and app store fees','Two rounds of revisions are included per design stage','The website and apps launch in English; more languages can be added later','Usability test participants are recruited with the client’s help','Delivery and cab dispatch in Phase 3 use partner services, not an in-house fleet','Amounts exclude GST','Timeline starts after the advance payment and kickoff meeting','The client gives feedback within 3 working days at each review'].map(x=>`<li>${x}</li>`).join('')}</ul></div></div>

  <div id="p-sup"><div class="sec-head" style="margin-bottom:28px"><div>${eb('Support and maintenance')}<h2>After launch</h2><p class="lede">The first 30 days after launch are covered at no cost for bugs. After that, choose a monthly plan. Plans can be changed with one month’s notice.</p></div></div>
   <div class="splans">${SUP0.map(([n,_,f],i)=>`<div class="splan rv ${i===1?'rec':''}" style="--d:${i*60}ms"><span class="eyebrow">${n}${i===1?' · Recommended':''}</span><div class="fee">₹<input type="number" min="0" step="500" value="${SP[i]}" data-sup="${i}" aria-label="${n} monthly fee"><small style="font-family:var(--sans);font-size:13px;font-weight:500;color:var(--brown)">/ month</small></div><ul>${f.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
   <div class="box rv" style="margin-top:16px"><h3>Not included in support</h3><p class="muted" style="font-size:14.5px">New features, new categories or new modules, design changes beyond small tweaks, and third-party outages. These are quoted separately.</p></div></div>
 </div></section>`};

/* ===== dashboards ===== */
const ROLES={admin:{n:'City admin',tabs:['overview','enquiries','listings','approvals','team','site']},data:{n:'Data entry',tabs:['add','listings','approvals']},mkt:{n:'Marketing',tabs:['overview','promos','site']},tele:{n:'Telecaller',tabs:['calls','enquiries']}};
const TABS={overview:'Overview',enquiries:'Enquiries',listings:'Listings',approvals:'Approvals',team:'Team & access',site:'City site',promos:'Promotions',add:'Add listing',calls:'Call queue'};
const ST={new:'New',called:'Called',won:'Converted',lost:'Not interested'};
const cityEnq=()=>db.enq.filter(e=>e.city===state.city);
function chart(vals,labels,max){
 const W=560,H=220,pl=40,pb=26,pt=10,bw=(W-pl-10)/vals.length,y=v=>pt+(H-pt-pb)*(1-v/max);
 const ticks=[0,max/4,max/2,max*3/4,max];
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart from ${Math.min(...vals)} to ${Math.max(...vals)}">${ticks.map(v=>`<line x1="${pl}" x2="${W}" y1="${y(v)}" y2="${y(v)}" stroke="#E8DDCE"/><text x="${pl-8}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="#80634C">${v.toLocaleString('en-IN')}</text>`).join('')}
 ${vals.map((v,i)=>`<rect x="${pl+i*bw+bw*.22}" y="${y(v)}" width="${bw*.56}" height="${H-pb-y(v)}" rx="5" fill="${i===vals.length-1?'#191815':'#B2A18D'}"></rect><text x="${pl+i*bw+bw/2}" y="${H-8}" text-anchor="middle" font-size="11" fill="#80634C">${labels[i]}</text>`).join('')}</svg>`;
}
function enqTable(rows,edit,showCity){
 if(!rows.length) return `<div class="empty">No enquiries yet. Send one from any business page and it appears here.</div>`;
 return `<div class="tscroll"><table class="tbl"><thead><tr><th>Customer</th><th>Need</th><th>Business</th>${showCity?'<th>City</th>':''}<th>Type</th><th>Received</th><th>Assigned</th><th>Status</th></tr></thead><tbody>
 ${rows.map(e=>`<tr><td><b>${esc(e.name)}</b><small>${esc(e.phone)}</small></td><td>${esc(e.need)}<small>${CAT[e.cat].n}</small></td><td>${esc(e.biz)}</td>${showCity?`<td>${e.city}</td>`:''}<td>${{enquiry:'Enquiry',booking:'Booking',order:'Order',donation:'Donation'}[e.kind]||'Enquiry'}</td><td>${rel(e.t)}</td><td>${e.who}</td><td>${edit?`<select data-enq="${e.id}" aria-label="Status for ${esc(e.name)}">${Object.entries(ST).map(([k,v])=>`<option value="${k}" ${e.st===k?'selected':''}>${v}</option>`).join('')}</select>`:`<span class="pill s-${e.st}">${ST[e.st]}</span>`}</td></tr>`).join('')}</tbody></table></div>`;
}
function permMatrix(){
 const perms=[['View enquiries',[1,1,0,1,1]],['Call and update leads',[1,1,0,0,1]],['Add and edit listings',[1,1,1,0,0]],['Approve listings',[1,1,0,0,0]],['Run promotions',[1,1,0,1,0]],['Edit city site',[1,1,0,1,0]],['Manage city team',[1,1,0,0,0]],['All cities, domains, pricing',[1,0,0,0,0]]];
 const cols=['Superadmin','City admin','Data entry','Marketing','Telecaller'];
 return `<h3>Permissions by role</h3><div class="tscroll"><table class="tbl matrix" style="min-width:560px"><thead><tr><th>Permission</th>${cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${perms.map(([p,v])=>`<tr><td>${p}</td>${v.map(x=>`<td class="${x?'yes':'no'}">${x?'✓':'–'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
function teamTab(t){
 const E=cityEnq();
 if(t==='overview'){
  const won=E.filter(e=>e.st==='won').length, conv=E.length?Math.round(won/E.length*100):0;
  const counts={};E.forEach(e=>counts[e.cat]=(counts[e.cat]||0)+1);
  const top=Object.entries(counts).sort((a,b)=>b[1]-a[1]).slice(0,5), mx=top[0]?top[0][1]:1;
  return `<div class="kpis">${[['Enquiries',E.length,'+18% vs last week','up'],['Live listings','12,418','+146 this week','up'],['Pending approvals',db.pending.filter(p=>p.st==='pending').length,'Review today',''],['Converted',conv+'%',won+' leads won','up']].map(([l,v,d,c],i)=>`<div class="kpi rv" style="--d:${i*60}ms"><small>${l}</small><b>${v}</b><span class="dl ${c}">${d}</span></div>`).join('')}</div>
  <div class="d2"><div class="box chart rv"><h3>Enquiries per day <span class="muted" style="font-weight:500;font-size:13px">${state.city}, last 7 days</span></h3>${chart([18,24,21,30,27,35,32],['Wed','Thu','Fri','Sat','Sun','Mon','Tue'],40)}</div>
  <div class="box rv" style="--d:100ms"><h3>Top categories</h3>${top.length?top.map(([c,v],i)=>`<div class="hbar"><span>${CAT[c].n}</span><i style="width:${v/mx*100}%;animation-delay:${i*90}ms"></i><span>${v}</span></div>`).join(''):'<p class="muted">No enquiries yet in this city.</p>'}</div></div>
  <div class="box rv" style="margin-top:16px"><h3>Latest enquiries <button class="pillbtn" data-act="ttab" data-v="enquiries">View all</button></h3>${enqTable(E.slice(0,4),false)}</div>`;
 }
 if(t==='enquiries') return `<div class="box rv"><h3>${E.length} enquiries <span class="muted" style="font-weight:500;font-size:13px">Change the status to update the business and the call queue</span></h3>${enqTable(E,true)}</div>`;
 if(t==='calls'){
  const q=E.filter(e=>e.st==='new'||e.st==='called').map(e=>({...e,score:(e.st==='new'?40:20)+(/this week|today|sunday|urgent|\d/i.test(e.need)?30:0)+(e.kind!=='enquiry'?20:0)+hash(e.id)%10})).sort((a,b)=>b.score-a.score);
  const why=e=>e.st==='new'?(/this week|today|\d/i.test(e.need)?'New lead with a clear need and timing':'New lead, not called yet'):'Called once, follow up today';
  return `<div class="ai-note rv"><span class="ai">AI</span><span><b>Suggested call order.</b> Ranked by how ready each customer looks, using what they wrote and how fresh the lead is. You can call in any order.</span></div>
   <p class="muted rv" style="margin-bottom:14px;font-size:14px">${q.filter(e=>!db.calls[e.id]).length} calls left today</p>
   ${q.length?q.map((c,i)=>{const d=db.calls[c.id];return `<div class="call rv ${d?'done-c':''}" style="--d:${i*50}ms"><span class="pr">${i+1}</span><div style="min-width:0"><b>${esc(c.name)}</b> <span class="muted">· ${esc(c.phone)}</span><div style="font-size:14px;color:var(--choc)">${esc(c.need)} · ${esc(c.biz)}</div><div class="why">${why(c)}</div></div>
    <div class="call-a">${d?`<span class="pill s-called">${d}</span>`:`<button class="btn btn-ink btn-xs" data-act="call" data-id="${c.id}" data-v="Interested">Interested</button><button class="btn btn-line btn-xs" data-act="call" data-id="${c.id}" data-v="Call later">Call later</button><button class="btn btn-line btn-xs" data-act="call" data-id="${c.id}" data-v="Not reachable">Not reachable</button>`}</div></div>`}).join(''):'<div class="empty">Queue is clear. New enquiries land here automatically.</div>'}`;
 }
 if(t==='listings'){
  const rows=allListings().slice(0,14);
  return `<div class="box rv"><h3>Showing 14 of 12,418 listings ${ROLES[state.role].tabs.includes('add')?`<button class="btn btn-ink btn-sm" data-act="ttab" data-v="add">Add listing</button>`:''}</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Business</th><th>Category</th><th>Area</th><th>Rating</th><th>Plan</th><th>Status</th></tr></thead><tbody>
   ${rows.map(b=>`<tr><td><b>${esc(b.name)}</b><small>ID ${b.id.toUpperCase()}</small></td><td>${CAT[b.cat].n}</td><td>${b.area}</td><td>★ ${b.rating}</td><td>${['Free','Featured','Premium','Free'][hash(b.id)%4]}</td><td><span class="pill ${b.verified?'s-won':'s-new'}">${b.verified?'Verified':'Needs visit'}</span></td></tr>`).join('')}</tbody></table></div></div>`;
 }
 if(t==='approvals'){
  return `<div class="box rv"><h3>Waiting for approval</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Business</th><th>Category</th><th>Area</th><th>Added by</th><th>When</th><th></th></tr></thead><tbody>
   ${db.pending.map(p=>`<tr><td><b>${esc(p.n)}</b>${p.dupe?`<br><span class="dupe"><span class="ai" style="font-size:9px">AI</span> Looks like “${esc(p.dupe)}”</span>`:''}</td><td>${CAT[p.c]?CAT[p.c].n:esc(p.c)}</td><td>${esc(p.a)}</td><td>${esc(p.by)}</td><td>${rel(p.t)}</td><td>${p.st==='pending'?(state.role==='data'?'<span class="pill s-new">With admin</span>':`<div style="display:flex;gap:8px"><button class="btn btn-ink btn-xs" data-act="appr" data-id="${p.id}" data-v="approved">Approve</button><button class="btn btn-line btn-xs" data-act="appr" data-id="${p.id}" data-v="returned">Send back</button></div>`):`<span class="pill ${p.st==='approved'?'s-won':'s-lost'}">${p.st==='approved'?'Approved':'Sent back'}</span>`}</td></tr>`).join('')}</tbody></table></div></div>`;
 }
 if(t==='add'){
  return `<div class="ai-note rv"><span class="ai">AI</span><span><b>Fill from visiting card.</b> Upload a photo of the card or shop board and the form fills itself. Check before sending.</span></div>
  <form class="box rv" data-form="add" style="max-width:760px">
   <div class="field"><label for="adCard">Visiting card photo</label><input type="file" id="adCard" accept="image/*"></div>
   <div class="row2"><div class="field"><label for="adName">Business name</label><input id="adName" required></div><div class="field"><label for="adCat">Category</label><select id="adCat">${CATS.map(c=>`<option value="${c.id}">${c.n}</option>`).join('')}</select></div></div>
   <div class="row2"><div class="field"><label for="adPhone">Phone</label><input id="adPhone" required></div><div class="field"><label for="adArea">Area</label><select id="adArea">${AREAS.map(a=>`<option>${a}</option>`).join('')}</select></div></div>
   <div class="field"><label for="adAddr">Address</label><input id="adAddr"></div>
   <div class="field"><label for="adNote">Services offered</label><textarea id="adNote"></textarea></div>
   <button class="btn btn-ink" type="submit">Send for approval</button></form>`;
 }
 if(t==='team'){
  const team=[['Neha Bhatia','City admin'],['Ravi Kumar','Data entry'],['Seema Choudhary','Data entry'],['Arjun Mathur','Marketing'],['Pooja Sharma','Telecaller'],['Imran Ali','Telecaller']];
  return `<div class="d2"><div class="box rv">${permMatrix()}</div>
   <div class="box rv" style="--d:100ms"><h3>${state.city} team <button class="btn btn-ink btn-sm" data-act="soon">Invite</button></h3>${team.map(([n,r])=>`<div class="lrow"><div><b>${n}</b><br><small class="muted">${r}</small></div><span class="pill s-won">Active</span></div>`).join('')}</div></div>`;
 }
 if(t==='site'){
  const s=db.site[state.city]||{}, feat=s.feat||['doctor','food','property','tutor'];
  return `<form class="box rv" data-form="site" style="max-width:820px"><h3>${cityObj().d} home page</h3>
   <div class="row2"><div class="field"><label for="siH">Headline</label><input id="siH" value="${esc(s.headline||'Find trusted local businesses')}"></div><div class="field"><label for="siA">Headline accent</label><input id="siA" value="${esc(s.accent||'in your city.')}"></div></div>
   <div class="field"><label for="siB">Announcement strip</label><input id="siB" value="${esc(s.banner||'')}" placeholder="e.g. Diwali fair at the town ground, 300+ stalls till 3 Nov"></div>
   <div class="field"><span class="flabel">Show these categories first on the home page</span>${['doctor','food','property','tutor','marriage','cab'].map(c=>`<div class="lrow"><span>${CAT[c].n}</span><button type="button" class="toggle ${feat.includes(c)?'on':''}" data-act="feat" data-v="${c}" aria-label="Feature ${CAT[c].n}"></button></div>`).join('')}</div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-ink" type="submit">Publish to ${cityObj().d}</button><a class="btn btn-line" href="#home">View site</a></div></form>`;
 }
 if(t==='promos'){
  return `<div class="camp">${db.promos.map((p,i)=>`<div class="box rv" style="--d:${i*60}ms"><h3>${esc(p.n)}<span class="pill ${p.st==='Running'?'s-won':'s-new'}">${esc(p.st)}</span></h3><p class="muted">${esc(p.type)} · ${esc(p.aud)}</p><p style="margin-top:8px"><b>${esc(p.reach)}</b></p></div>`).join('')}</div>
   <form class="box rv" data-form="promo" style="max-width:760px"><h3>New campaign</h3>
    <div class="row2"><div class="field"><label for="pmName">Name</label><input id="pmName" required placeholder="e.g. Winter wedding offers"></div><div class="field"><label for="pmType">Type</label><select id="pmType"><option>WhatsApp broadcast</option><option>SMS</option><option>Home page banner</option><option>Featured slot</option></select></div></div>
    <div class="field"><label for="pmAud">Audience</label><select id="pmAud"><option>Everyone in ${state.city}</option>${CATS.slice(0,10).map(c=>`<option>People who searched ${c.n}</option>`).join('')}</select></div>
    <button class="btn btn-ink" type="submit">Schedule campaign</button></form>`;
 }
 return '';
}
function dashShell(who,title,selHtml,tabs,cur,act,counts,body,foot){
 return `<div class="dash"><aside class="side"><div class="side-who"><small>${who}</small><b>${title}</b></div>${selHtml}
  <nav>${tabs.map(t=>`<button class="${t[0]===cur?'on':''}" data-act="${act}" data-v="${t[0]}">${t[1]}${counts[t[0]]?`<span class="ct">${counts[t[0]]}</span>`:''}</button>`).join('')}</nav>
  <div class="side-foot">${foot}</div></aside><section class="dmain">${body}</section></div>`;
}
V.team=()=>{
 const R=ROLES[state.role]; if(!state.tab||!R.tabs.includes(state.tab)) state.tab=R.tabs[0];
 const E=cityEnq(), counts={enquiries:E.filter(e=>e.st==='new').length,calls:E.filter(e=>(e.st==='new'||e.st==='called')&&!db.calls[e.id]).length,approvals:db.pending.filter(p=>p.st==='pending').length};
 const sel=`<label><small>View as</small><select id="roleSel" aria-label="Role">${Object.entries(ROLES).map(([k,r])=>`<option value="${k}" ${k===state.role?'selected':''}>${r.n}</option>`).join('')}</select></label>`;
 const body=`<div class="dhead"><div>${eb(state.city+' franchise')}<h2>${TABS[state.tab]}</h2></div><span class="muted" style="font-size:13px">Sample data, saved in this browser</span></div>${teamTab(state.tab)}`;
 return dashShell(`Localist ${state.city} · ${cityObj().d}`,R.n,sel,R.tabs.map(t=>[t,TABS[t]]),state.tab,'ttab',counts,body,`Signed in as ${{admin:'Neha Bhatia',data:'Ravi Kumar',mkt:'Arjun Mathur',tele:'Pooja Sharma'}[state.role]}<br>${cityObj().d}/team`);
};
V.owner=()=>{
 const opts=[...new Set([state.ownerBiz,...db.enq.map(e=>e.bizId),'doctor-0','food-0','spa-0'].filter(Boolean))].slice(0,8);
 if(!state.ownerBiz||!biz(state.ownerBiz)) state.ownerBiz=opts[0];
 const b=biz(state.ownerBiz), E=db.enq.filter(e=>e.bizId===b.id), t=state.otab, ed=db.edits[b.id]||{};
 const sel=`<label><small>Your business</small><select id="ownSel" aria-label="Business">${opts.map(id=>{const x=biz(id);return x?`<option value="${id}" ${id===b.id?'selected':''}>${esc(x.name)}</option>`:''}).join('')}</select></label>`;
 let body='';
 if(t==='overview'){
  body=`<div class="kpis">${[['Profile views','148','+22% this week','up'],['Enquiries',E.length,'All time',''],['Calls from Localist','31','+6 this week','up'],['Rating','★ '+b.rating,b.reviews+' reviews','']].map(([l,v,d,c],i)=>`<div class="kpi rv" style="--d:${i*60}ms"><small>${l}</small><b>${v}</b><span class="dl ${c}">${d}</span></div>`).join('')}</div>
   <div class="d2"><div class="box chart rv"><h3>Profile views, last 7 days</h3>${chart([14,22,19,27,24,31,26],['Wed','Thu','Fri','Sat','Sun','Mon','Tue'],40)}</div>
   <div class="box rv"><h3>Your plan <span class="pill s-won">Featured</span></h3><p class="muted">Top of ${CAT[b.cat].n} in ${b.area}. Renews 12 Nov.</p><div class="lrow" style="margin-top:10px"><span>Search position</span><b>#2</b></div><div class="lrow"><span>Replies within 30 min</span><b>86%</b></div><div class="lrow"><span>Listing complete</span><b>${ed.about?'100%':'80%'}</b></div>
   ${ed.about?'':`<button class="btn btn-ink btn-sm" style="margin-top:14px" data-act="otab" data-v="listing">Complete your listing</button>`}</div></div>
   <div class="box rv" style="margin-top:16px"><h3>Latest enquiries <button class="pillbtn" data-act="otab" data-v="leads">View all</button></h3>${enqTable(E.slice(0,4),false)}</div>`;
 }
 if(t==='leads') body=`<div class="box rv"><h3>${E.length} enquiries, bookings and orders</h3>${enqTable(E,true)}</div><p class="muted" style="font-size:13px;margin-top:12px">Tip: open any business page, send an enquiry, then pick that business here.</p>`;
 if(t==='listing') body=`<form class="box rv" data-form="ownedit" style="max-width:820px"><h3>Edit your listing <a class="pillbtn" href="#business" data-act="biz" data-id="${b.id}">View live page ${I.arrow}</a></h3>
   <div class="field"><label for="owAbout">About your business</label><textarea id="owAbout" placeholder="What you offer, since when, what makes you different">${esc(ed.about||'')}</textarea></div>
   <div class="row2"><div class="field"><label for="owPhone">Phone shown to customers</label><input id="owPhone" value="${esc(ed.phone||'')}" placeholder="98290 12345"></div><div class="field"><label for="owHours">Weekday timings</label><input id="owHours" value="${esc(ed.hours||'9:30 am to 8:30 pm')}"></div></div>
   <button class="btn btn-ink" type="submit">Save changes</button></form>`;
 if(t==='offers') body=`<form class="box rv" data-form="owoffer" style="max-width:760px"><h3>Offer on your listing</h3><p class="muted" style="margin-bottom:16px">Shown on your card, your page and the city deals strip.</p>
   <div class="field"><label for="owOffer">Offer</label><input id="owOffer" required value="${esc(ed.offer||'')}" placeholder="e.g. 10% off first visit"></div>
   <div class="row2"><div class="field"><label for="owFrom">Starts</label><input id="owFrom" type="date"></div><div class="field"><label for="owTo">Ends</label><input id="owTo" type="date"></div></div>
   <div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-ink" type="submit">Publish offer</button>${ed.offer?'<button type="button" class="btn btn-line" data-act="offer-off">Remove offer</button>':''}</div></form>`;
 if(t==='plan') body=`<div class="plans rv">${[['Free','₹0',['Basic listing','Enquiries by SMS']],['Featured','₹999/mo',['Top of category','Deal badge','WhatsApp leads']],['Premium','₹2,499/mo',['Home page slot','Online booking','Account manager']]].map(([n,p,f],i)=>`<div class="plan ${i===1?'on':''}"><span class="eyebrow">${n}</span><b>${p}</b><ul>${f.map(x=>`<li>${x}</li>`).join('')}</ul>${i===1?'<span class="pill s-won" style="margin-top:10px;align-self:flex-start">Current plan</span>':`<button class="btn btn-line btn-sm" style="margin-top:10px" data-act="soon">Switch</button>`}</div>`).join('')}</div>
   <div class="box rv" style="margin-top:16px"><h3>Invoices</h3>${['Oct 2026','Sep 2026','Aug 2026'].map(m=>`<div class="lrow"><span>${m} · Featured plan</span><b>₹999 · Paid</b></div>`).join('')}</div>`;
 const tabs=[['overview','Overview'],['leads','Enquiries'],['listing','My listing'],['offers','Offers'],['plan','Plan & billing']];
 return dashShell('Localist for Business','My business',sel,tabs,t,'otab',{leads:E.filter(e=>e.st==='new').length},
  `<div class="dhead"><div>${eb(CAT[b.cat].n+' · '+b.area)}<h2>${esc(b.name)}</h2></div><a class="pillbtn" href="#business" data-act="biz" data-id="${b.id}">View public page ${I.arrow}</a></div>${body}`,'Owner account<br>Also in the Localist app');
};
const STAGES=['Domain reserved','Site configured','Listings seeded','Team trained','Live'];
const stageOf=c=>c.st==='live'?5:(db.stage[c.n]||0);
V.admin=()=>{
 const t=state.atab, live=CITIES.filter(c=>stageOf(c)>=5).length;
 let body='';
 if(t==='overview'){
  const byCity=CITIES.filter(c=>stageOf(c)>=5).map(c=>[c.n,(hash(c.n)%60)+20+db.enq.filter(e=>e.city===c.n).length]).sort((a,b)=>b[1]-a[1]).slice(0,6), mx=byCity[0][1];
  body=`<div class="kpis">${[['Cities live',live,'of '+CITIES.length+' in this demo',''],['Domains reserved','104','Target 500',''],['Listings, all cities','2,41,860','+3,920 this week','up'],['Enquiries today','1,284','+11% vs last Tue','up']].map(([l,v,d,c],i)=>`<div class="kpi rv" style="--d:${i*60}ms"><small>${l}</small><b>${v}</b><span class="dl ${c}">${d}</span></div>`).join('')}</div>
   <div class="d2"><div class="box chart rv"><h3>Enquiries across India, last 7 days</h3>${chart([920,1040,980,1210,1130,1320,1284],['Wed','Thu','Fri','Sat','Sun','Mon','Tue'],1600)}</div>
   <div class="box rv"><h3>Busiest cities today</h3>${byCity.map(([n,v],i)=>`<div class="hbar"><span>${n}</span><i style="width:${v/mx*100}%;animation-delay:${i*80}ms"></i><span>${v}</span></div>`).join('')}</div></div>
   <div class="box rv" style="margin-top:16px"><h3>Network growth</h3><div style="display:flex;justify-content:space-between;font-size:14px;gap:10px;flex-wrap:wrap"><span>104 domains reserved</span><span class="muted">Target 500 · figures from the brief, to be verified</span></div><div class="progress"><i style="width:20.8%"></i></div></div>`;
 }
 if(t==='cities'){
  body=`<div class="box rv"><h3>City sites and domains <button class="btn btn-ink btn-sm" data-act="soon">Add city</button></h3><div class="tscroll"><table class="tbl"><thead><tr><th>City</th><th>Domain</th><th>Domain status</th><th>Site</th><th>Listings</th><th>Franchise partner</th></tr></thead><tbody>
   ${CITIES.map(c=>{const s=stageOf(c);return `<tr><td><b>${c.n}</b><small>${c.s}</small></td><td>${c.d}</td><td><span class="pill ${s>=1?'s-won':'s-new'}">${s>=1?'Registered':['Reserved','DNS pending'][hash(c.n)%2]}</span></td><td>${stTag(s>=5?'live':s>0?'opening':'available')}</td><td style="font-variant-numeric:tabular-nums">${s>=5?(hash(c.n)%9000+3000).toLocaleString('en-IN'):s>=3?(hash(c.n)%900+1500).toLocaleString('en-IN')+' seeded':'–'}</td><td>${s>=1?['Sharma Ventures','Local Reach LLP','Patel Media','Singh & Sons','City Connect'][hash(c.n)%5]:'<button class="pillbtn" data-act="soon">Assign</button>'}</td></tr>`}).join('')}</tbody></table></div></div>`;
 }
 if(t==='launch'){
  const pipe=CITIES.filter(c=>c.st0!=='live');
  body=`<p class="lede rv" style="margin-bottom:20px">The central team prepares each city before handing it to the local franchise. Move a city forward when a stage is done.</p>
  <div class="camp">${pipe.map((c,i)=>{const s=stageOf(c);return `<div class="box rv" style="--d:${(i%3)*60}ms"><h3>${c.n}<span class="pill ${s>=5?'s-won':s>0?'s-new':'s-called'}">${s>=5?'Live':s?STAGES[s-1]:'Not started'}</span></h3><p class="muted" style="font-size:13px">${c.d}</p>
   <div class="pipe">${STAGES.map((_,k)=>`<i class="${k<s?'on':''}"></i>`).join('')}</div>
   <p style="font-size:13px;margin-top:10px">${s>=5?'Handed to the local team':'Next: '+STAGES[s]}</p>
   ${s<5?`<button class="btn btn-ink btn-xs" style="margin-top:12px" data-act="stage" data-v="${c.n}">${s===4?'Go live':'Mark “'+STAGES[s]+'” done'}</button>`:''}</div>`}).join('')}</div>`;
 }
 if(t==='cats'){
  body=`<div class="box rv"><h3>Categories and what customers can do <span class="muted" style="font-weight:500;font-size:13px">Applies to every city</span></h3><div class="tscroll"><table class="tbl"><thead><tr><th>Category</th><th>Reference name</th><th>Mode</th><th>Phase</th><th>Live listings</th></tr></thead><tbody>
   ${CATS.map(c=>`<tr><td><b>${c.n}</b></td><td>${c.was}</td><td><select data-catmode="${c.id}" aria-label="Mode for ${c.n}">${Object.entries(MODE).map(([k,v])=>`<option value="${k}" ${modeOf(c.id)===k?'selected':''}>${v}</option>`).join('')}</select></td><td>Phase ${c.ph}</td><td style="font-variant-numeric:tabular-nums">${(hash(c.id)%9000+1200).toLocaleString('en-IN')}</td></tr>`).join('')}</tbody></table></div></div>`;
 }
 if(t==='partners'){
  body=`<div class="box rv"><h3>Franchise partners</h3><div class="tscroll"><table class="tbl"><thead><tr><th>Partner</th><th>Cities</th><th>Team</th><th>Revenue share</th><th>Status</th></tr></thead><tbody>
   ${['Sharma Ventures','Local Reach LLP','Patel Media','Singh & Sons','City Connect'].map((p,i)=>{const cs=CITIES.filter(c=>stageOf(c)>=1&&hash(c.n)%5===i).map(c=>c.n);return `<tr><td><b>${p}</b></td><td>${cs.join(', ')||'–'}</td><td>${4+i*2} people</td><td>${[60,60,55,65,60][i]}%</td><td><span class="pill s-won">Active</span></td></tr>`}).join('')}</tbody></table></div></div>
   <div class="box rv" style="margin-top:16px"><h3>New applications</h3>${[['Rakesh Agarwal','Agra','Local business owner'],['Fatima Sheikh','Bhopal','Media or advertising'],['Joseph Mathew','Kochi','Sales or telecalling agency']].map(([n,c,b])=>`<div class="lrow"><div><b>${n}</b><br><small class="muted">${c} · ${b}</small></div><button class="btn btn-line btn-xs" data-act="soon">Review</button></div>`).join('')}</div>`;
 }
 if(t==='roles') body=`<div class="box rv">${permMatrix()}</div>`;
 if(t==='enquiries') body=`<div class="box rv"><h3>All cities</h3>${enqTable(db.enq,false,true)}</div>`;
 const tabs=[['overview','Overview'],['cities','City sites & domains'],['launch','Launch pipeline'],['cats','Categories'],['partners','Franchise partners'],['roles','Roles & access'],['enquiries','All enquiries']];
 return dashShell('Central team · localist.in/admin','Superadmin','',tabs,t,'atab',{launch:CITIES.filter(c=>c.st0!=='live'&&stageOf(c)<5).length},
  `<div class="dhead"><div>${eb('All cities')}<h2>${tabs.find(x=>x[0]===t)[1]}</h2></div><span class="muted" style="font-size:13px">Sample data, saved in this browser</span></div>${body}`,'Signed in as Vikram (HQ)');
};

/* ===== router ===== */
const app=$('#app'); let io;
function reveal(){
 if(!('IntersectionObserver' in window)){$$('.rv').forEach(e=>e.classList.add('in'));return}
 io&&io.disconnect();
 io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -6% 0px',threshold:.05});
 $$('.rv:not(.in)').forEach(e=>io.observe(e));
}
const route=()=>(location.hash||'#home').slice(1);
function render(keep){
 let r=route(); if(!V[r]) r='home';
 app.innerHTML=V[r]();
 app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
 if(!keep) window.scrollTo({top:0,behavior:'instant'});
 $$('.nav a[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===r||(r==='business'&&a.dataset.nav==='explore')));
 $$('.pbar a[data-pv]').forEach(a=>a.classList.toggle('on',a.dataset.pv===r));
 $$('.bnav a').forEach(a=>a.classList.toggle('on',a.dataset.bn===r||(r==='business'&&a.dataset.bn==='explore')));
 app.dataset.route=r;
 $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false');
 requestAnimationFrame(()=>paintAll(true));
 reveal();
}
function rerender(){const y=scrollY;render(true);window.scrollTo({top:y,behavior:'instant'});$$('.rv').forEach(e=>e.classList.add('in'))}
function go(r){if(route()===r)render();else location.hash=r}
window.addEventListener('hashchange',()=>render());

/* ===== city + modals ===== */
function setCityUI(){const c=cityObj();$('#cityName').textContent=c.n;$('#logoDomain').textContent=c.d;$('#footDomain').textContent=c.d}
function cityList(q=''){const s=q.toLowerCase();$('#cityList').innerHTML=CITIES.filter(c=>(c.n+c.s).toLowerCase().includes(s)).map(c=>`<button data-act="city" data-v="${c.n}"><div><b>${c.n}</b><small>${c.s}</small></div>${stTag(c.st)}</button>`).join('')||'<p class="muted">No city found yet. Localist is planned for 500 cities.</p>'}
function openModal(id){$('#'+id).classList.add('open')}
function closeModals(){$$('.modal').forEach(m=>m.classList.remove('open'));$('#cityQ').value=''}
$('#cityQ').addEventListener('input',e=>cityList(e.target.value));
$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModals()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
function openEnq(id){
 const b=biz(id); state.enqBiz=id;
 $('#enqTo').textContent=`To ${b.name} · ${b.area}, ${state.city}`;
 $('#mService').innerHTML=[CAT[b.cat].n,...(HL[b.cat]||[]).slice(0,3),'Something else'].map(x=>`<option>${esc(x)}</option>`).join('');
 $('#enqForm').reset(); openModal('enqModal'); setTimeout(()=>$('#mName').focus(),80);
}
function addEnq(b,name,phone,need,kind){
 const id='E-'+(3000+Math.floor(Math.random()*6999));
 const ph=(phone||'').replace(/\s/g,'');
 db.enq.unshift({id,name:name||'Guest',phone:ph.length>=7?ph.slice(0,5)+' ••• '+ph.slice(-2):'—',need:need||CAT[b.cat].n,cat:b.cat,bizId:b.id,biz:b.name,city:state.city,t:Date.now(),st:'new',who:['Pooja','Imran'][db.enq.length%2],kind});
 save();
}

/* ===== events ===== */
$('#menuBtn').addEventListener('click',()=>{const o=$('#nav').classList.toggle('open');$('#menuBtn').setAttribute('aria-expanded',o)});
window.addEventListener('scroll',()=>{$('#top').classList.toggle('scrolled',scrollY>20);$('#totop').classList.toggle('show',scrollY>900)},{passive:true});
$('#totop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-act]'); if(!a) return;
 const act=a.dataset.act, id=a.dataset.id, v=a.dataset.v;
 const resetAction=()=>{state.cart={};state.slot=null;state.date=0;state.people=2;state.sent=false};
 switch(act){
  case 'city-open': cityList(); openModal('cityModal'); setTimeout(()=>$('#cityQ').focus(),80); break;
  case 'modal-close': closeModals(); break;
  case 'city': e.preventDefault(); state.city=v; if(cityObj().st==='live') state.cityTab=v; ls.set('haat-city',v); setCityUI(); closeModals(); render(); toast(`Now on ${cityObj().d}`); break;
  case 'citytab': state.cityTab=v; rerender(); break;
  case 'group': state.group=v; rerender(); break;
  case 'cat': e.preventDefault(); state.cat=id; state.q=''; go('explore'); break;
  case 'explore-all': e.preventDefault(); state.cat=null; state.q=''; go('explore'); break;
  case 'allcats': state.cat=null; state.q=''; render(); break;
  case 'biz': e.preventDefault(); state.biz=id; resetAction(); go('business'); break;
  case 'enq': openEnq(id); break;
  case 'try': state.q=a.dataset.q; state.cat=null; go('explore'); break;
  case 'inc': state.cart[a.dataset.n]=(state.cart[a.dataset.n]||0)+1; rerender(); break;
  case 'dec': state.cart[a.dataset.n]=Math.max(0,(state.cart[a.dataset.n]||0)-1); rerender(); break;
  case 'place': { const b=biz(state.biz), items=Object.entries(state.cart).filter(([,q])=>q); addEnq(b,'You (demo)','9829000011',items.map(([n,q])=>q+' × '+n).join(', '),'order'); state.sent='Order placed'; rerender(); break; }
  case 'slot': state.slot=v; rerender(); break;
  case 'date': state.date=+a.dataset.i; rerender(); break;
  case 'pinc': state.people=Math.min(20,state.people+1); rerender(); break;
  case 'pdec': state.people=Math.max(1,state.people-1); rerender(); break;
  case 'amt': state.amount=+v; rerender(); break;
  case 'reset-action': resetAction(); rerender(); break;
  case 'owner-of': state.ownerBiz=id; state.otab='leads'; break;
  case 'plan': state.lb.plan=v; rerender(); break;
  case 'lb-back': state.lb.step=Math.max(0,state.lb.step-1); rerender(); break;
  case 'lb-reset': state.lb={step:0,plan:'featured'}; break;
  case 'see-approvals': state.role='admin'; state.tab='approvals'; state.lb={step:0,plan:'featured'}; break;
  case 'login-as': state.loginAs=v; state.otp=false; rerender(); break;
  case 'otp-back': state.otp=false; rerender(); break;
  case 'ttab': e.preventDefault(); state.tab=v; rerender(); break;
  case 'otab': e.preventDefault(); state.otab=v; rerender(); break;
  case 'atab': e.preventDefault(); state.atab=v; rerender(); break;
  case 'role-go': if(v==='super'){state.atab='overview'}else{state.role=v;state.tab=null} break;
  case 'call': { db.calls[id]=v; const en=db.enq.find(x=>x.id===id); if(en&&en.st==='new') en.st='called'; save(); rerender(); toast(`${en?en.name:'Lead'}: ${v}`); break; }
  case 'appr': { const p=db.pending.find(x=>x.id==id); p.st=v; save(); rerender(); toast(v==='approved'?`${p.n} is now live`:`${p.n} sent back to ${p.by}`); break; }
  case 'feat': a.classList.toggle('on'); break;
  case 'stage': { db.stage[v]=(db.stage[v]||0)+1; applyStages(); save(); toast(db.stage[v]>=5?`${v} is live at ${v.toLowerCase()}.localist.in`:`${v}: ${STAGES[db.stage[v]-1]} done`); rerender(); break; }
  case 'offer-off': { const ed=db.edits[state.ownerBiz]||{}; delete ed.offer; db.edits[state.ownerBiz]=ed; save(); rerender(); toast('Offer removed'); break; }
  case 'reset': ls.del(DBK); db=seed(); applyStages(); state.ownerBiz=null; render(true); toast('Demo data reset'); break;
  case 'replay': playIntro(true); break;
  case 'soon': toast('Available in the full build'); break;
  case 'more': state.more[v]=!state.more[v]; rerender(); if(!state.more[v]){const w=a.closest('section');w&&window.scrollTo({top:w.getBoundingClientRect().top+scrollY-90,behavior:'instant'})} break;
  case 'copy': { const c=a.dataset.code; try{navigator.clipboard.writeText(c).then(()=>toast(`Code ${c} copied`),()=>toast(`Your code: ${c}`))}catch(err){toast(`Your code: ${c}`)} break; }
  case 'dgroup': state.dgroup=v; rerender(); break;
  case 'jk': state.jk=v; rerender(); break;
  case 'tres': { state.ts=state.ts||{}; state.ts[a.dataset.i]=v; a.parentNode.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===a)); break; }
  case 'jump': e.preventDefault(); { const t=document.getElementById(v); if(t) window.scrollTo({top:t.getBoundingClientRect().top+scrollY-100,behavior:'smooth'}); } break;
 }
});
document.addEventListener('change',e=>{
 const t=e.target;
 if(t.id==='fSort'){state.f.sort=t.value;rerender()}
 if(t.id==='fVer'){state.f.verified=t.checked;rerender()}
 if(t.id==='fOpen'){state.f.open=t.checked;rerender()}
 if(t.id==='fMode'){state.f.mode=t.value;rerender()}
 if(t.id==='fArea'){state.f.area=t.value;rerender()}
 if(t.id==='roleSel'){state.role=t.value;state.tab=null;rerender();toast(`Viewing as ${ROLES[t.value].n}`)}
 if(t.id==='ownSel'){state.ownerBiz=t.value;rerender()}
 if(t.dataset.enq){const en=db.enq.find(x=>x.id===t.dataset.enq);en.st=t.value;save();toast(`${en.name}: ${ST[t.value]}`)}
 if(t.dataset.catmode){db.catModes[t.dataset.catmode]=t.value;save();toast(`${CAT[t.dataset.catmode].n} is now “${MODE[t.value]}” in every city`)}
 if(t.id==='adCard'&&t.files&&t.files[0]){
  const set=(i,val)=>{const el=$('#'+i);if(el)el.value=val};
  set('adName','Kesar Sweets & Namkeen');set('adCat','food');set('adPhone','98290 45 671');set('adArea','Malviya Nagar');set('adAddr','Shop 14, Gaurav Tower, Malviya Nagar');set('adNote','Sweets, namkeen, party orders, home delivery');
  toast('Filled from the card. Check before sending.');
 }
});
document.addEventListener('input',e=>{
 const t=e.target;
 if(t.dataset&&t.dataset.price!==undefined){db.price=db.price||PRICE0.map(x=>x[1]);db.price[+t.dataset.price]=+t.value||0;save();const el=$('#pTotal');if(el)el.textContent=inr(db.price.reduce((a,b)=>a+b,0))}
 if(t.dataset&&t.dataset.sup!==undefined){db.sup=db.sup||SUP0.map(x=>x[1]);db.sup[+t.dataset.sup]=+t.value||0;save()}
if(e.target.id&&/^otp\d$/.test(e.target.id)&&e.target.value){const n=$('#otp'+(+e.target.id.slice(3)+1));n&&n.focus()}});
document.addEventListener('submit',e=>{
 const f=e.target.closest('[data-form]'); if(!f) return; e.preventDefault();
 const k=f.dataset.form, val=id=>($('#'+id)||{}).value||'';
 const dupeOf=nm=>{const w=(nm||'').toLowerCase().replace(/[^a-z ]/g,'').split(' ').filter(x=>x.length>2&&x!=='the');return w.length?(allListings().find(b=>b.name.toLowerCase().includes(w[0]))||{}).name||null:null};
 if(k==='search'){const cty=val('hsCity');if(cty&&cty!==state.city){state.city=cty;ls.set('haat-city',cty);setCityUI()}state.cat=val('hsCat')||null;state.q=val('hsQ');go('explore')}
 if(k==='exsearch'){state.q=val('exQ');state.cat=null;render(true)}
 if(k==='enqmodal'){const b=biz(state.enqBiz);addEnq(b,val('mName'),val('mPhone'),(val('mService')+(val('mMsg')?': '+val('mMsg'):'')),'enquiry');closeModals();toast(`Enquiry sent to ${b.name}`);if(['team','owner','admin'].includes(route()))rerender()}
 if(k==='enquiry'){const b=biz(state.biz);addEnq(b,val('eName'),val('ePhone'),val('eNeed'),'enquiry');state.sent='Enquiry sent';rerender()}
 if(k==='book'){const b=biz(state.biz);if(!['cab','pickup'].includes(b.cat)&&!state.slot){toast('Pick a time slot first');return}addEnq(b,val('bName'),val('bPhone'),`${state.people} ${b.cat==='event'||b.cat==='tourism'?'tickets':'people'}${state.slot?', '+state.slot:''}`,'booking');state.sent='Booking confirmed';rerender()}
 if(k==='donate'){const b=biz(state.biz);addEnq(b,val('dName')||'Anonymous','',inr(state.amount)+' donation','donation');state.sent=`Thank you for ${inr(state.amount)}`;rerender()}
 if(k==='lb'){if(state.lb.step===0){state.lb.name=val('lbName');state.lb.cat=val('lbCat')}if(state.lb.step===1){state.lb.area=val('lbArea');state.lb.by=val('lbOwner')}
  if(state.lb.step===2){db.pending.unshift({id:Date.now(),n:state.lb.name||'New business',c:state.lb.cat||'food',a:state.lb.area||AREAS[0],by:(state.lb.by||'Owner')+' (self)',t:Date.now(),st:'pending',dupe:dupeOf(state.lb.name)});save()}
  state.lb.step++;rerender()}
 if(k==='fr'){f.innerHTML=`<div class="done"><div class="tick">${I.check}</div><h3>Application received</h3><p>In the full build the franchise team calls you within 3 working days.</p></div>`}
 if(k==='login'){if(!state.otp){state.otp=true;rerender();setTimeout(()=>$('#otp0')&&$('#otp0').focus(),60)}else{state.otp=false;toast('Signed in (prototype)');go({customer:'home',business:'owner',team:'team',super:'admin'}[state.loginAs])}}
 if(k==='add'){const nm=val('adName');db.pending.unshift({id:Date.now(),n:nm,c:val('adCat'),a:val('adArea'),by:'Ravi',t:Date.now(),st:'pending',dupe:dupeOf(nm)});save();toast('Sent to the city admin for approval');state.tab='approvals';rerender()}
 if(k==='promo'){db.promos.unshift({n:val('pmName'),type:val('pmType'),aud:val('pmAud'),st:'Scheduled',reach:'Starts tomorrow'});save();rerender();toast('Campaign scheduled')}
 if(k==='site'){db.site[state.city]={headline:val('siH'),accent:val('siA'),banner:val('siB'),feat:$$('[data-act="feat"].on').map(x=>x.dataset.v)};save();toast(`Published to ${cityObj().d}`)}
 if(k==='ownedit'){db.edits[state.ownerBiz]={...(db.edits[state.ownerBiz]||{}),about:val('owAbout'),phone:val('owPhone'),hours:val('owHours')};save();toast('Listing updated. It’s live on your page.');rerender()}
 if(k==='owoffer'){db.edits[state.ownerBiz]={...(db.edits[state.ownerBiz]||{}),offer:val('owOffer')};save();toast('Offer is live on your listing');rerender()}
 if(k==='tsession'){const res=state.ts||{};if(!Object.keys(res).length){toast('Mark at least one task first');return}db.sessions=db.sessions||[];db.sessions.unshift({name:val('tsName'),role:val('tsRole'),res,note:val('tsNote'),t:Date.now()});state.ts={};save();rerender();toast('Session saved')}
 if(k==='sub'){db.subs++;save();f.innerHTML=`<p style="color:var(--ink);padding:10px 16px;font-weight:600">Subscribed. The first letter arrives on Sunday.</p>`}
});

/* ===== intro ===== */
function playIntro(force){
 const el=$('#intro'); if(!el) return;
 let seen=null; if(!force){try{seen=sessionStorage.getItem('haat-intro')}catch(e){seen='skip'}}
 if(!force&&(seen||matchMedia('(prefers-reduced-motion: reduce)').matches)){el.style.display='none';return}
 try{sessionStorage.setItem('haat-intro','1')}catch(e){}
 const fresh=el.cloneNode(true);fresh.style.display='';fresh.classList.remove('out');el.replaceWith(fresh);
 document.documentElement.classList.add('intro-on');
 if(force){window.scrollTo({top:0});if(route()!=='home')location.hash='home';else render()}
 setTimeout(()=>{fresh.classList.add('out');setTimeout(()=>{fresh.style.display='none';document.documentElement.classList.remove('intro-on')},500)},1300);
}

/* ===== boot ===== */
applyStages();
if(cityObj().st==='live') state.cityTab=state.city;
setCityUI();
playIntro(false);
render();
