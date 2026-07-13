// DraftKings outright winner / top 5 / top 10 odds for the 2026 Open
// Championship, captured 13 July 2026. American odds format (e.g. "+630").
// Update this file with a fresh screenshot/PDF as odds move during the week.
const RAW_ODDS = [
  ["Scottie Scheffler", "+630", "+134", "-144"],
  ["Rory McIlroy", "+860", "+186", "-102"],
  ["Jon Rahm", "+1800", "+335", "+168"],
  ["Tommy Fleetwood", "+1850", "+330", "+162"],
  ["Matt Fitzpatrick", "+1900", "+340", "+168"],
  ["Xander Schauffele", "+2500", "+450", "+220"],
  ["Chris Gotterup", "+3100", "+540", "+265"],
  ["Cameron Young", "+3200", "+540", "+260"],
  ["Viktor Hovland", "+3300", "+580", "+290"],
  ["Ludvig Aberg", "+3400", "+570", "+270"],
  ["Collin Morikawa", "+3400", "+580", "+280"],
  ["Tyrrell Hatton", "+3600", "+600", "+290"],
  ["Robert MacIntyre", "+3700", "+610", "+295"],
  ["Justin Rose", "+4000", "+670", "+325"],
  ["Wyndham Clark", "+4200", "+670", "+325"],
  ["Si Woo Kim", "+4300", "+670", "+315"],
  ["Sam Burns", "+4900", "+760", "+360"],
  ["Russell Henley", "+5300", "+760", "+350"],
  ["Bryson DeChambeau", "+5400", "+890", "+435"],
  ["Justin Thomas", "+5400", "+830", "+390"],
  ["Min Woo Lee", "+5400", "+820", "+380"],
  ["Patrick Cantlay", "+5600", "+830", "+390"],
  ["Joaquin Niemann", "+5700", "+880", "+415"],
  ["Tom Kim", "+6000", "+890", "+415"],
  ["Brooks Koepka", "+6100", "+970", "+460"],
  ["Shane Lowry", "+6100", "+890", "+410"],
  ["Alex Fitzpatrick", "+6800", "+970", "+440"],
  ["Patrick Reed", "+6800", "+960", "+440"],
  ["Aaron Rai", "+7200", "+990", "+445"],
  ["J.J. Spaun", "+7400", "+1050", "+475"],
  ["Jordan Spieth", "+7800", "+1150", "+540"],
  ["Ben Griffin", "+8600", "+1175", "+520"],
  ["Kurt Kitayama", "+8600", "+1200", "+540"],
  ["Nicolai Hojgaard", "+9000", "+1275", "+580"],
  ["Hideki Matsuyama", "+9400", "+1275", "+570"],
  ["Rickie Fowler", "+9800", "+1300", "+580"],
  ["Maverick McNealy", "+10000", "+1375", "+620"],
  ["Harris English", "+10500", "+1375", "+600"],
  ["Alex Noren", "+11000", "+1450", "+630"],
  ["Adam Scott", "+11000", "+1450", "+650"],
  ["Kristoffer Reitan", "+11500", "+1500", "+680"],
  ["Brian Harman", "+11500", "+1475", "+650"],
  ["Akshay Bhatia", "+12000", "+1550", "+700"],
  ["Michael Thorbjornsen", "+12500", "+1600", "+710"],
  ["Ryan Gerard", "+14000", "+1750", "+760"],
  ["Victor Perez", "+14500", "+1850", "+800"],
  ["Keegan Bradley", "+14500", "+1800", "+790"],
  ["Jason Day", "+14500", "+1800", "+770"],
  ["Corey Conners", "+14500", "+1800", "+770"],
  ["Gary Woodland", "+14500", "+1850", "+800"],
  ["Cameron Smith", "+14500", "+1850", "+800"],
  ["Jake Knapp", "+15000", "+1950", "+850"],
  ["Max Homa", "+15500", "+1900", "+820"],
  ["Eugenio Chacarra", "+16000", "+2000", "+850"],
  ["Tom McKibbin", "+16000", "+1900", "+810"],
  ["Keith Mitchell", "+16000", "+2000", "+870"],
  ["David Puig", "+16500", "+2100", "+910"],
  ["Ryan Fox", "+16500", "+2050", "+900"],
  ["Ryo Hisatsune", "+17500", "+2100", "+890"],
  ["Matt Wallace", "+18000", "+2150", "+920"],
  ["Eric Cole", "+18000", "+2150", "+910"],
  ["J.T. Poston", "+19000", "+2200", "+930"],
  ["Bud Cauley", "+19000", "+2200", "+920"],
  ["Angel Ayora", "+19000", "+2300", "+980"],
  ["Jordan Smith", "+19500", "+2250", "+950"],
  ["Harry Hall", "+20000", "+2450", "+1025"],
  ["Alex Smalley", "+20000", "+2350", "+990"],
  ["Haotong Li", "+21000", "+2500", "+1050"],
  ["Sepp Straka", "+21000", "+2450", "+1025"],
  ["Sahith Theegala", "+21000", "+2450", "+1025"],
  ["Michael Brennan", "+21000", "+2500", "+1075"],
  ["Max Greyserman", "+21000", "+2500", "+1075"],
  ["Sungjae Im", "+22000", "+2500", "+1075"],
  ["Jackson Suber", "+22500", "+2600", "+1075"],
  ["Jacob Bridgeman", "+22500", "+2600", "+1075"],
  ["Marco Penge", "+23000", "+2800", "+1175"],
  ["Rasmus Hojgaard", "+23000", "+2700", "+1150"],
  ["Nick Taylor", "+23000", "+2600", "+1050"],
  ["John Keefer", "+24000", "+2800", "+1200"],
  ["Thomas Detry", "+24000", "+2700", "+1150"],
  ["Andrew Novak", "+25000", "+2800", "+1150"],
  ["Daniel Berger", "+27000", "+2900", "+1200"],
  ["Jayden Schaper", "+27500", "+3000", "+1225"],
  ["Lucas Herbert", "+28000", "+3200", "+1325"],
  ["Pierceson Coody", "+28000", "+3100", "+1300"],
  ["Sam Stevens", "+30000", "+3300", "+1325"],
  ["Michael Kim", "+33000", "+3600", "+1425"],
  ["Jesper Svensson", "+34000", "+3700", "+1500"],
  ["Rasmus Neergaard-Petersen", "+34000", "+3600", "+1450"],
  ["Scott Vincent", "+34000", "+3500", "+1400"],
  ["Sami Valimaki", "+34000", "+3500", "+1425"],
  ["Bernd Wiesberger", "+34000", "+3500", "+1375"],
  ["Casey Jarvis", "+34000", "+3600", "+1475"],
  ["Matt McCarty", "+35000", "+3700", "+1475"],
  ["Keita Nakajima", "+35000", "+3700", "+1475"],
  ["Daniel Hillier", "+38000", "+4100", "+1600"],
  ["Matthew Jordan", "+39000", "+4100", "+1600"],
  ["Nicolas Echavarria", "+42500", "+4300", "+1650"],
  ["John Parry", "+44000", "+4300", "+1650"],
  ["Laurie Canter", "+47000", "+4600", "+1800"],
  ["Daniel Brown", "+49000", "+4900", "+1900"],
  ["Jose Luis Ballester", "+49000", "+5000", "+1950"],
  ["Hennie du Plessis", "+50000", "+5000", "+1950"],
  ["Antoine Rozner", "+52500", "+5200", "+2000"],
  ["Francesco Molinari", "+55000", "+5600", "+2150"],
  ["Kota Kaneko", "+55000", "+5200", "+1950"],
  ["Billy Horschel", "+55000", "+5400", "+2100"],
  ["Stewart Cink", "+57500", "+5500", "+2050"],
  ["Andy Sullivan", "+60000", "+5600", "+2100"],
  ["Adrien Saddier", "+62500", "+5800", "+2200"],
  ["Martin Couvra", "+77500", "+7000", "+2600"],
  ["Padraig Harrington", "+87500", "+7600", "+2800"],
  ["Dan Bradbury", "+87500", "+7800", "+2900"],
  ["Joe Dean", "+100000", "+8800", "+3200"],
  ["Shaun Norris", "+115000", "+10000", "+3500"],
  ["Caleb Surratt", "+115000", "+10000", "+3700"],
  ["M.J. Daffue", "+115000", "+10000", "+3600"],
  ["Francesco Laporta", "+125000", "+10000", "+3600"],
  ["Kazuma Kobori", "+125000", "+10000", "+3500"],
  ["Henrik Stenson", "+130000", "+10000", "+3600"],
  ["Joakim Lagergren", "+145000", "+12500", "+4500"],
  ["Frederic Lacroix", "+145000", "+12000", "+4100"],
  ["Alistair Docherty", "+145000", "+12000", "+4200"],
  ["Peter Uihlein", "+170000", "+14500", "+5100"],
  ["Sam Bairstow", "+190000", "+15000", "+5200"],
  ["Travis Smyth", "+225000", "+18000", "+6100"],
  ["Ren Yonezawa", "+225000", "+16500", "+5600"],
  ["James Nicholas", "+225000", "+18000", "+6200"],
  ["Michael Hollick", "+225000", "+17000", "+5800"],
  ["Matthew Southgate", "+250000", "+19000", "+6300"],
  ["Kazuki Higa", "+250000", "+18000", "+5900"],
  ["Tim Wiedemeyer", "+275000", "+21000", "+7000"],
  ["Jeongwoo Ham", "+275000", "+20000", "+6600"],
  ["Stuart Grehan", "+325000", "+24000", "+7600"],
  ["Alejandro De Castro Piera", "+350000", "+26000", "+8600"],
  ["Ryutaro Nagano", "+350000", "+25000", "+8200"],
  ["Jack McDonald", "+350000", "+24000", "+7800"],
  ["Matthew Baldwin", "+350000", "+25000", "+8000"],
  ["Fifa Laopakdee", "+400000", "+33000", "+11000"],
  ["Darren Clarke", "+400000", "+28000", "+8800"],
  ["Austen Truslow", "+400000", "+27500", "+8600"],
  ["Jiho Yang", "+450000", "+37000", "+11500"],
  ["Naoyuki Kataoka", "+450000", "+37000", "+11500"],
  ["Mason Howell", "+450000", "+32500", "+10000"],
  ["Lev Grinberg", "+450000", "+33000", "+10500"],
  ["Jack Buchanan", "+450000", "+33000", "+10500"],
  ["David Howard", "+500000", "+49000", "+24000"],
  ["Baard Skogen", "+500000", "+47000", "+15000"],
  ["Tom Sloman", "+500000", "+49000", "+20000"],
  ["Nevill Ruiter", "+500000", "+49000", "+23000"],
  ["Mateo Pulcini", "+500000", "+43000", "+13500"],
  ["Marcus Plunkett", "+500000", "+49000", "+19000"],
  ["Tiger Christensen", "+500000", "+49000", "+19000"],
  ["David Duval", "+500000", "+50000", "+28000"],
  ["Cameron John", "+500000", "+49000", "+17500"],
  // Note: Aldrich Potgieter was runner-up (by one shot to Joe Dean) in the
  // 13 July Last Chance Qualifier, so he did not make the field — omitted here.
];

// Aliases for cases where DraftKings' name spelling doesn't match
// theopen.com's spelling in lib/field.js.
const ALIASES = {
  "nicolas echavarria": "nico echavarria",
  "john keefer": "johnny keefer",
  "baard skogen": "baard bjoernevik skogen",
  "rasmus neergaard-petersen": "rasmus neergaard petersen",
};

function normalize(name) {
  const stripped = name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining accent marks
    .replace(/ø/gi, "o") // Højgaard etc. — ø doesn't decompose under NFD
    .toLowerCase()
    .replace(/[.']/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return ALIASES[stripped] || stripped;
}

function parseOddsNum(odds) {
  if (!odds) return null;
  const n = parseInt(odds.replace("+", ""), 10);
  return odds.startsWith("-") ? -Math.abs(n) : n;
}

// Map of normalized name -> { winner, winnerNum, top5, top10 }
export const ODDS_BY_NAME = Object.fromEntries(
  RAW_ODDS.map(([name, winner, top5, top10]) => [
    normalize(name),
    { winner, winnerNum: parseOddsNum(winner), top5, top10 },
  ])
);

export function getOdds(golferName) {
  return ODDS_BY_NAME[normalize(golferName)] || null;
}
