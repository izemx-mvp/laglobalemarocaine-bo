export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral" | "ai";

export const clients = ["Atlas Packaging","AgroMaroc","Seafood Export","GreenFarm","Pack Solutions","Maroc Fresh","Casa Food Industries","Souss Agrumes","Oceanic Export","BioTerra","Nord Emballage","Fès Conserves","Marrakech Délices","Tanger Logistics","Rif Agro","Dakhla Seafood","Meknès Fruits","Oriental Pack","Sahara Foods","Kenitra Dairy"].map((name,i)=>({id:`CL-${String(i+1).padStart(3,"0")}`,name,contact:["Yassine Amrani","Salma Idrissi","Mehdi Alaoui","Nadia Benjelloun"][i%4],email:`contact@${name.toLowerCase().replaceAll(" ","")}.ma`,phone:`+212 6 ${41+i} 28 ${30+i} ${10+i}`,status:i%7===0?"À relancer":"Actif",orders:3+(i%12),revenue:18000+i*4150}));

export const conversations = Array.from({length:30},(_,i)=>({id:i+1,client:clients[i%clients.length].name,company:clients[i%clients.length].name,message:["Bonjour, quel est le délai pour 5 000 sacs personnalisés ?","Pouvez-vous me transmettre le devis actualisé ?","La commande sera-t-elle livrée cette semaine ?","Nous souhaitons modifier les dimensions du sachet."][i%4],time:`${String(9+(i%9)).padStart(2,"0")}:${i%2?"15":"40"}`,unread:i%4===0?2:0,status:i%5===0?"Résolue":i%3===0?"En attente":"En cours",priority:i%7===0?"Haute":"Normale"}));

export const salesReps = ["Yassine Amrani","Salma Idrissi","Mehdi Alaoui","Nadia Benjelloun"];

export const productCatalog = [
 {name:"Sachet PE transparent",ref:"PRD-SAC-001",material:"Film PE basse densité",dims:"40 × 60 cm — 80 μ",price:1.88},
 {name:"Sac personnalisé imprimé",ref:"PRD-SAC-002",material:"Granulé PEBD recyclé",dims:"30 × 50 cm — 60 μ",price:2.35},
 {name:"Film étirable industriel",ref:"PRD-FIL-003",material:"Film BOPP",dims:"120 cm × 300 m",price:14.6},
 {name:"Housse industrielle",ref:"PRD-HOU-004",material:"Granulé PEHD naturel",dims:"180 × 120 cm",price:6.4},
 {name:"Gaine PE",ref:"PRD-GAI-005",material:"Granulé PP",dims:"80 cm — 100 μ",price:3.1},
];

const requestStatuses = ["Nouvelle","En analyse","Devis en préparation","Devis envoyé","Traitée"];

export const requests = Array.from({length:24},(_,i)=>{
 const c=clients[i%clients.length]; const p=productCatalog[i%productCatalog.length];
 return {
  id:`REQ-2026-${String(i+21).padStart(3,"0")}`,
  client:c.contact, company:c.name, email:c.email, phone:c.phone,
  product:p.name, ref:p.ref, qty:2500+(i%8)*2500, dimensions:p.dims, material:p.material,
  customization:i%3===0?"Impression 2 couleurs — logo client":i%3===1?"Impression 4 couleurs recto":"Sans impression",
  date:`${String(1+(i%22)).padStart(2,"0")}/09/2026`,
  desired:`${String(5+(i%20)).padStart(2,"0")}/10/2026`,
  source:["WhatsApp","Email","Téléphone","Commercial"][i%4],
  status:requestStatuses[i%5],
  message:`Bonjour, nous souhaitons un chiffrage pour ${(2500+(i%8)*2500).toLocaleString("fr-FR")} unités de ${p.name.toLowerCase()} (${p.dims}). Merci de préciser le délai et les conditions de règlement.`,
  notes:i%2===0?"Client fidèle — appliquer la grille tarifaire négociée.":"Vérifier la disponibilité matière avant engagement de délai.",
  attachments:i%4===0?["Cahier des charges.pdf"]:i%4===2?["Visuel impression.png"]:[],
 };
});

const quoteStatuses = ["Brouillon","En validation","Envoyé au client","En attente","Validé","Refusé","Expiré"];

export const quotes = requests.filter((_,i)=>i%4!==0).map((r,i)=>{
 const p=productCatalog.find(x=>x.name===r.product)??productCatalog[0];
 const unitPrice=+(p.price*(1-(i%3)*.03)).toFixed(2);
 const discount=(i%4)*2;
 const totalHt=Math.round(unitPrice*r.qty*(1-discount/100));
 return {
  id:`DEV-2026-${String(i+1).padStart(3,"0")}`, requestId:r.id, client:r.company, contact:r.client,
  product:r.product, ref:r.ref, qty:r.qty, unitPrice, discount, tva:20, totalHt, total:Math.round(totalHt*1.2),
  date:r.date, validity:"30 jours", validUntil:`${String(1+(i%20)).padStart(2,"0")}/10/2026`,
  delay:`${5+(i%6)} jours ouvrables`,
  payment:["30% à la commande, solde à 30 jours","Virement à 45 jours fin de mois","Règlement comptant à la livraison"][i%3],
  conditions:"Prix HT départ usine Casablanca. Tolérance quantité ±3%. BAT à valider avant production.",
  status:quoteStatuses[i%7], source:r.source, rep:salesReps[i%4],
  scenario:`Scénario ${1+(i%3)} — ${["Équilibré","Volume","Délai court"][i%3]}`,
 };
});

const orderStatuses = ["Nouvelle","À valider","Confirmée","En production","Expédiée","Livrée","Annulée"];

export const orders = [
 ...quotes.filter((_,i)=>i%2===0).map((q,i)=>({
  id:`CMD-2026-${String(i+21).padStart(3,"0")}`, quoteId:q.id, requestId:q.requestId, client:q.client, contact:q.contact,
  product:q.product, qty:q.qty, unitPrice:q.unitPrice, amount:q.total,
  date:`${String(2+(i%25)).padStart(2,"0")}/09/2026`, delivery:`${String(5+(i%23)).padStart(2,"0")}/10/2026`,
  payment:q.payment, status:orderStatuses[i%7], source:q.source,
 })),
 ...Array.from({length:12},(_,i)=>{
  const c=clients[(i+5)%clients.length]; const p=productCatalog[(i+1)%productCatalog.length];
  return {id:`CMD-2026-${String(i+31).padStart(3,"0")}`, quoteId:"—", requestId:"—", client:c.name, contact:c.contact,
   product:p.name, qty:2500+(i%8)*1500, unitPrice:p.price, amount:8200+i*970,
   date:`${String(2+(i%25)).padStart(2,"0")}/09/2026`, delivery:`${String(6+(i%20)).padStart(2,"0")}/10/2026`,
   payment:"Virement à 45 jours fin de mois", status:orderStatuses[(i+3)%7], source:i%3===0?"WhatsApp":"Commercial"};
 }),
];

export const quoteScenarios = (r:{product:string;qty:number}) => {
 const p=productCatalog.find(x=>x.name===r.product)??productCatalog[0];
 return [0,1,2].map(j=>{
  const unitPrice=+(p.price*[1,.94,1.08][j]).toFixed(2);
  return {
   id:`SCN-${j+1}`, label:["Scénario 1 — Équilibré","Scénario 2 — Volume","Scénario 3 — Délai court"][j],
   product:p.name, qty:r.qty, unitPrice, total:Math.round(unitPrice*r.qty),
   delay:[`${6} jours ouvrables`,"9 jours ouvrables","4 jours ouvrables"][j],
   payment:["30% à la commande, solde à 30 jours","Virement à 45 jours fin de mois","Règlement comptant à la livraison"][j],
   margin:[24,19,28][j], similarity:[92,86,79][j], validity:"30 jours", discount:[0,4,0][j], tva:20,
   conditions:"Prix HT départ usine Casablanca. Tolérance quantité ±3%.",
   reason:["Meilleur équilibre entre marge, délai et historique tarifaire du client.","Remise volume appliquée, marge réduite mais délai allongé de 3 jours.","Production prioritaire, coût majoré pour respecter un délai court."][j],
   recommended:j===0,
  };
 });
};

export const materials = ["Film PE basse densité","Granulé PEHD naturel","Granulé PEBD recyclé","Masterbatch blanc","Masterbatch bleu","Additif anti-UV","Encre flexographique","Solvant industriel","Mandrin carton","Film BOPP","Granulé PP","Colle lamination","Pigment vert","Résine EVA","Agent glissant"].map((name,i)=>({ref:`MP-${String(i+1).padStart(3,"0")}`,name,category:i<10?"Matière première":"Consommable",current:[450,2400,0,780,320,95,640,180,1200,870,1560,210,430,510,75][i],min:[500,800,400,300,250,120,200,150,500,400,700,180,200,250,100][i],max:3000,unit:i===5||i===14?"L":"kg",updated:"Aujourd’hui, 14:32"}));

export const suppliers = ["Plastique Maroc","Polymeris Afrique","Casaplast Trading","Maghreb Polymères","Resinex Maroc","Atlas Chimie","Tanger Polymers","Souss Matières","ColorTech Maroc","PackSource","Industrie Résines","Maroc Additifs"].map((name,i)=>({id:`FR-${i+1}`,name,material:materials[i%materials.length].name,price:11.2+(i%4)*.3,delay:2+(i%6),reliability:88+(i%11),last:`${String(2+i).padStart(2,"0")}/08/2026`,status:i===0?"Sous surveillance":"Actif"}));

export const alerts = Array.from({length:15},(_,i)=>({id:i+1,title:i===0?"Stock critique : Film PE basse densité":i===1?"Retard fournisseur : Plastique Maroc":i===2?"5 demandes clients sans réponse":i===3?"3 devis nécessitent une validation":`Seuil de vigilance — ${materials[i%materials.length].name}`,module:i<2?"Stock & Achats":i<4?"Commercial":"Stock",priority:i%4===0?"Critique":i%3===0?"Haute":"Moyenne",date:`Aujourd’hui, ${9+i}:20`,handled:false}));

export const activities = ["Devis DEV-2026-018 validé","Commande CMD-2026-041 créée","Agent Service Client a répondu à AgroMaroc","Alerte stock Film PEBD déclenchée","BDC-2026-012 généré","Plastique Maroc sélectionné","DEV-2026-017 envoyé par email","Commande CMD-2026-038 expédiée","Document Catalogue produits indexé","Conversation Atlas Packaging escaladée","Seuil Masterbatch modifié","Nouveau client BioTerra créé","Paiement CMD-2026-036 confirmé","Scénario d’achat validé","Rapport mensuel exporté"].map((action,i)=>({date:`22/09/2026 · ${String(16-Math.floor(i/2)).padStart(2,"0")}:${i%2?"15":"42"}`,actor:i%3===0?"Admin":i%3===1?"Agent IA":"Système",action,module:["Devis","Commandes","Service Client","Stock","Achats"][i%5],object:action.match(/[A-Z]{3}-2026-\d+/)?.[0]||"—",status:"Succès"}));

export const documents = ["Catalogue produits.pdf","Fiches techniques.pdf","Conditions commerciales.pdf","Procédure SAV.pdf","Politique livraison.pdf","Conditions fournisseurs.pdf",...Array.from({length:14},(_,i)=>`Fiche matière ${String(i+1).padStart(2,"0")}.pdf`)].map((name,i)=>({id:i+1,name,type:"PDF",size:`${(1.2+i*.17).toFixed(1)} Mo`,date:`${String(2+(i%20)).padStart(2,"0")}/09/2026`,category:["Produits","Technique","Commercial","SAV","Logistique","Achats"][i%6],indexed:i%7!==0}));

export const faqs = Array.from({length:20},(_,i)=>({id:i+1,question:["Quels sont les délais de production ?","Quelle quantité minimale commander ?","Proposez-vous l’impression personnalisée ?","Comment suivre une commande ?","Quels moyens de paiement acceptez-vous ?"][i%5],answer:["Le délai standard varie de 5 à 10 jours ouvrables selon le produit.","La quantité minimale est généralement de 2 500 unités.","Oui, jusqu’à 6 couleurs selon le support.","Votre commercial partage le suivi à chaque étape.","Virement bancaire et règlement selon conditions contractuelles."][i%5],category:["Production","Commande","Personnalisation","Livraison","Paiement"][i%5],active:i%6!==0,updated:`${String(2+i%20).padStart(2,"0")}/09/2026`}));

export const chartData = [
 {m:"Avr",commandes:54,ca:680,stock:89,demandes:106},{m:"Mai",commandes:62,ca:735,stock:82,demandes:118},{m:"Juin",commandes:58,ca:710,stock:76,demandes:130},{m:"Juil",commandes:71,ca:840,stock:72,demandes:142},{m:"Août",commandes:68,ca:805,stock:69,demandes:136},{m:"Sep",commandes:86,ca:960,stock:74,demandes:168},
];

export const finishedProducts = [
 {ref:"PF-SAC-4060",name:"Sac PE 40×60 transparent",category:"Sacs industriels",available:12800,reserved:6500,min:5000,orders:4,status:"Normal",updated:"22/09/2026 · 15:10"},
 {ref:"PF-SAC-3050",name:"Sac PE 30×50 imprimé",category:"Sacs personnalisés",available:3200,reserved:2800,min:3500,orders:6,status:"Faible",updated:"22/09/2026 · 14:48"},
 {ref:"PF-FIL-120",name:"Film étirable 120 cm",category:"Films",available:0,reserved:1200,min:2000,orders:3,status:"Rupture",updated:"22/09/2026 · 13:20"},
 {ref:"PF-GAI-080",name:"Gaine PEBD 80 cm",category:"Gaines",available:7400,reserved:2100,min:3000,orders:2,status:"Normal",updated:"22/09/2026 · 11:42"},
 {ref:"PF-HOU-180",name:"Housse industrielle 180×120",category:"Housses",available:1550,reserved:900,min:1200,orders:5,status:"Faible",updated:"21/09/2026 · 17:25"},
 {ref:"PF-SAC-BIO",name:"Sac PE recyclé BioTerra",category:"Sacs personnalisés",available:8900,reserved:4000,min:3000,orders:3,status:"Normal",updated:"21/09/2026 · 15:05"},
 {ref:"PF-FIL-050",name:"Film rétractable 50 μ",category:"Films",available:4600,reserved:3100,min:2500,orders:7,status:"Normal",updated:"20/09/2026 · 16:18"},
 {ref:"PF-SAC-6080",name:"Sac renforcé 60×80",category:"Sacs industriels",available:980,reserved:600,min:1500,orders:2,status:"Critique",updated:"20/09/2026 · 10:12"},
];

export const stockHistory = Array.from({length:24},(_,i)=>({date:`${String(22-(i%18)).padStart(2,"0")}/09/2026 · ${String(8+(i%9)).padStart(2,"0")}:${i%2?"15":"40"}`,ref:materials[i%materials.length].ref,material:materials[i%materials.length].name,type:["Entrée de stock","Sortie de stock","Ajustement","Inventaire","Alerte déclenchée","Seuil modifié"][i%6],qty:[2500,-850,120,0,0,0][i%6],user:["Yassine Amrani","Salma Idrissi","Agent Stock","Admin"][i%4],comment:["Réception fournisseur contrôlée","Affectation production CMD-2026-041","Correction après comptage","Inventaire hebdomadaire validé","Seuil minimum atteint","Paramètre ajusté selon consommation"][i%6]}));

export const purchaseOrders = Array.from({length:15},(_,i)=>({id:`BDC-2026-${String(i+1).padStart(3,"0")}`,supplier:suppliers[i%suppliers.length].name,material:materials[i%materials.length].name,qty:1500+(i%6)*750,amount:18200+i*2450,date:`${String(2+(i%20)).padStart(2,"0")}/09/2026`,delivery:`${String(24+(i%6)).padStart(2,"0")}/09/2026`,status:["Brouillon","À valider","Validé","Envoyé","Confirmé","Partiellement livré","Livré","Annulé"][i%8]}));

export const purchaseHistory = Array.from({length:20},(_,i)=>({date:`${String(22-(i%18)).padStart(2,"0")}/09/2026 · ${String(9+(i%8)).padStart(2,"0")}:${i%2?"20":"45"}`,action:["Scénario fournisseur créé","Scénario modifié","Fournisseur sélectionné","BDC généré","BDC validé","BDC envoyé","Fournisseur confirmé","Livraison reçue","Prix mis à jour"][i%9],actor:["Agent Achats","Yassine Amrani","Admin"][i%3],supplier:suppliers[i%suppliers.length].name,reference:i%3===0?`SC-2026-${String(14+i).padStart(3,"0")}`:`BDC-2026-${String(1+i%15).padStart(3,"0")}`,status:["Succès","Validé","Envoyé","Confirmé"][i%4]}));

export const purchaseScenarios = [0,1,2].map((i)=>({id:`SC-2026-${14+i}`,material:materials[i].name,qty:5000-i*750,created:`${20+i}/09/2026`,options:suppliers.filter(s=>s.material===materials[i].name||i===0).slice(0,3).map((s,j)=>({...s,total:Math.round((5000-i*750)*s.price),score:96-j*4,reason:j===0?"Meilleur équilibre entre coût, délai et fiabilité historique.":j===1?"Prix compétitif avec délai compatible avec la production.":"Fiabilité élevée, recommandée pour sécuriser la continuité."}))}));

export const conversationMessages = (client:string) => [
 {side:"client",text:`Bonjour, je souhaite obtenir vos conditions pour une nouvelle commande chez ${client}.`,time:"09:42"},
 {side:"company",text:"Bonjour, merci pour votre demande. Pouvez-vous préciser le produit et la quantité souhaitée ?",time:"09:45"},
 {side:"client",text:"Nous avons besoin de 5 000 sacs PE 40×60 cm, imprimés en deux couleurs.",time:"09:51"},
 {side:"ai",text:"D’après vos commandes précédentes, le PE basse densité 80 microns correspond à cette utilisation. Le délai estimé est de 5 à 7 jours ouvrables après validation du BAT.",time:"09:53",confidence:94},
 {side:"client",text:"Très bien. Pouvez-vous aussi confirmer la livraison sur Casablanca avant la fin du mois ?",time:"10:02"},
 {side:"company",text:"Oui, la capacité actuelle permet une livraison le 29 septembre. Nous préparons le devis détaillé.",time:"10:06"},
];
