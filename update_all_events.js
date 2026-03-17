const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://rhythmgoel9:hjIIaC3iwRadR7pl@cluster0.qgdtyex.mongodb.net/campusbuzz?appName=Cluster0';

async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db('campusbuzz').collection('events');

  // Step 1: Delete events on or before 23 March 2026
  const toDelete = [
    'crossroads-mun-2026',   // Mar 16
    'dumun-2026',             // Mar 10-12
    'aurexis-gargi-2026',    // Mar 15
    'voices-today-daulat-ram-2026', // Mar 17
    'reconovate-gargi-2026', // Mar 18
    'enactopia-aryabhatta-2026', // Mar 19
    'hindu-stock-exchange-2026', // Mar 20
    'engifest-2026',          // Mar 21-23
    'spandhan-2026',          // Mar 21-23
    'engifest-bob-2026',      // Mar 21-23
    'national-space-hackathon-2026', // Mar 21-22
    'hindu-policy-case-2026', // Mar 22
    'potentate-2026',         // Mar 22
    'tryst-iit-delhi-2026',  // Feb 27 - Mar 1
    'crossroads-2026',        // Mar 2026 (general)
    'mecca-2026',             // Mar 2026 (general)
    'hackdtu-2026',           // Mar 2026 (general)
    'invictus-dtu-2026',      // Mar 2026 (general)
  ];
  const del = await col.deleteMany({ slug: { $in: toDelete } });
  console.log('Deleted:', del.deletedCount, 'events');

  // Step 2: Add 15+ new real events (late March & April 2026)
  const newEvents = [
    // ── FESTS ──
    {
      slug: 'tempest-miranda-2026',
      name: 'Tempest 2026 — Miranda House Annual Fest',
      college: 'Miranda House, University of Delhi',
      cat: 'fest',
      date: 'Mar 29, 2026',
      dateStart: '2026-03-29',
      desc: 'Annual cultural extravaganza of Miranda House featuring dance, music, drama, DJ night and star performances. One of DU\'s most celebrated fests.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['dance', 'music', 'drama', 'dj'],
      prize: null,
      location: 'Miranda House, North Campus, Delhi'
    },
    {
      slug: 'synergy-dse-2026',
      name: 'Synergy 2026 — Delhi School of Economics Annual Fest',
      college: 'Delhi School of Economics, DU',
      cat: 'fest',
      date: 'Mar 25-26, 2026',
      dateStart: '2026-03-25',
      desc: 'DSE\'s flagship annual fest featuring case competitions, cultural events, debates and guest lectures by leading economists.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['economics', 'debate', 'case study'],
      prize: null,
      location: 'DSE, North Campus, Delhi'
    },
    {
      slug: 'alma-fiesta-jmi-2026',
      name: 'Alma Fiesta 2026 — Jamia Millia Islamia',
      college: 'Jamia Millia Islamia',
      cat: 'fest',
      date: 'Mar 27-29, 2026',
      dateStart: '2026-03-27',
      desc: 'JMI\'s mega annual cultural fest with 3 days of performances, competitions, celebrity appearances and events across all genres.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['cultural', 'music', 'dance', 'celebrity'],
      prize: null,
      location: 'Jamia Millia Islamia, Okhla, Delhi'
    },
    {
      slug: 'sustainathon-christ-2026',
      name: "Sustainathon '26 — Christ University Social Entrepreneurship",
      college: 'Christ University, Delhi NCR',
      cat: 'tech',
      date: 'Mar 24, 2026',
      dateStart: '2026-03-24',
      desc: 'Inter-university sustainability and social entrepreneurship challenge by Enactus Christ. Teams present SDG-aligned business models. Prizes worth ₹10K+.',
      regLink: 'https://unstop.com/competitions/sustainathon26-sustainathon25-christ-university-delhi-ncr-1647469',
      hot: false,
      tags: ['entrepreneurship', 'sustainability', 'SDG'],
      prize: '₹10,000+',
      location: 'Christ University, Ghaziabad'
    },
    // ── TECH / HACKATHONS ──
    {
      slug: 'hackcbs-2026',
      name: 'hackCBS 3.0 — India\'s Largest Student Hackathon',
      college: 'Shaheed Sukhdev College of Business Studies, DU',
      cat: 'tech',
      date: 'Apr 12-13, 2026',
      dateStart: '2026-04-12',
      desc: '24-hour hackathon by SSCBS — India\'s largest student-run hackathon. MLH member event. 1000+ hackers, $220K+ in prizes, mentorship from industry leaders.',
      regLink: 'https://unstop.com/hackathons/hackcbs-30-indias-largest-student-run-hackathon-shaheed-sukhdev-college-of-business-studies-sscbs-university-of-delhi--127818',
      hot: true,
      tags: ['hackathon', '24hr', 'MLH', 'coding'],
      prize: '$220,000+',
      location: 'SSCBS, Rohini, Delhi'
    },
    {
      slug: 'e-raksha-iit-2026',
      name: 'E-Raksha Hackathon 2026 — IIT Delhi',
      college: 'IIT Delhi',
      cat: 'tech',
      date: 'Apr 5-6, 2026',
      dateStart: '2026-04-05',
      desc: 'Cybersecurity-focused hackathon by IIT Delhi. Build innovative solutions in digital security, ethical hacking and data protection.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['cybersecurity', 'hackathon', 'IIT'],
      prize: '₹1,00,000+',
      location: 'IIT Delhi, Hauz Khas'
    },
    {
      slug: 'robowars-nit-2026',
      name: 'Robowars Delhi 2026 — NIT Delhi',
      college: 'NIT Delhi',
      cat: 'tech',
      date: 'Apr 25, 2026',
      dateStart: '2026-04-25',
      desc: 'Combat robotics championship where student-built robots battle it out. Open to all engineering colleges. Prizes worth ₹50K+.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['robotics', 'combat', 'engineering'],
      prize: '₹50,000+',
      location: 'NIT Delhi, Narela'
    },
    // ── MUN ──
    {
      slug: 'hansraj-mun-2026',
      name: 'Hansraj College MUN 2026 — Statecraft',
      college: 'Hansraj College, University of Delhi',
      cat: 'mun',
      date: 'Apr 11-12, 2026',
      dateStart: '2026-04-11',
      desc: 'Two-day MUN conference by Statecraft Hansraj. Committees include UNSC, UNHRC and historical crisis. Open to school and college students.',
      regLink: 'https://www.dublieu.com/mun-tracker/hansraj-college-mun-2026',
      hot: true,
      tags: ['UNSC', 'UNHRC', 'diplomacy'],
      prize: null,
      location: 'Hansraj College, North Campus, Delhi'
    },
    {
      slug: 'nsut-mun-2026',
      name: 'NSUT MUN 2026 — MUNSOC NSUT',
      college: 'Netaji Subhas University of Technology',
      cat: 'mun',
      date: 'Apr 11-12, 2026',
      dateStart: '2026-04-11',
      desc: 'Annual MUN conference by MUNSOC NSUT. Multiple committees, crisis simulations and best delegate awards.',
      regLink: 'https://www.dublieu.com/mun-tracker',
      hot: false,
      tags: ['MUN', 'diplomacy', 'debate'],
      prize: null,
      location: 'NSUT, Dwarka, Delhi'
    },
    {
      slug: 'confero-mun-2026',
      name: 'Confero MUN 2026 — SGTB Khalsa',
      college: 'Shri Guru Teg Bahadur Khalsa College, DU',
      cat: 'mun',
      date: 'Apr 4-5, 2026',
      dateStart: '2026-04-04',
      desc: 'Flagship MUN by MUNSOC SGTB Khalsa. Features UNGA, UNHRC and press corps committees with experienced chairs.',
      regLink: 'https://www.dublieu.com/mun-tracker',
      hot: false,
      tags: ['UNGA', 'UNHRC', 'press corps'],
      prize: null,
      location: 'SGTB Khalsa College, North Campus, Delhi'
    },
    {
      slug: 'delhi-youth-dialogue-2026',
      name: 'Delhi Youth Dialogue 2026',
      college: 'Delhi NCR',
      cat: 'mun',
      date: 'Apr 30 - May 1, 2026',
      dateStart: '2026-04-30',
      desc: 'Inaugural MUN conference featuring NATO and HUNSC committees. Focus on Ukraine-Russia conflict and nuclear proliferation. Open to all students.',
      regLink: 'https://www.dublieu.com/muns/delhi-youth-dialogue-2026',
      hot: true,
      tags: ['NATO', 'HUNSC', 'crisis'],
      prize: null,
      location: 'Delhi NCR'
    },
    // ── LITERARY / DEBATE ──
    {
      slug: 'munsophical-du-2026',
      name: 'Mushaira 2026 — Hindu College Literary Fest',
      college: 'Hindu College, University of Delhi',
      cat: 'literary',
      date: 'Apr 7, 2026',
      dateStart: '2026-04-07',
      desc: 'Annual Urdu poetry festival by Hindu College. Features renowned poets, spoken word artists and open mic sessions.',
      regLink: 'https://unstop.com',
      hot: false,
      tags: ['poetry', 'urdu', 'spoken word'],
      prize: null,
      location: 'Hindu College, North Campus, Delhi'
    },
    // ── MUSIC / CONCERT ──
    {
      slug: 'rendezvous-iit-2026',
      name: 'Rendezvous 2026 — IIT Delhi Cultural Fest',
      college: 'IIT Delhi',
      cat: 'concert',
      date: 'Oct 2026',
      dateStart: '2026-10-01',
      desc: 'North India\'s largest college cultural festival by IIT Delhi. 4 days of concerts, competitions, celebrity shows and 50,000+ footfall.',
      regLink: 'https://rendezvous.iitd.ac.in',
      hot: false,
      tags: ['concert', 'celebrity', 'cultural'],
      prize: null,
      location: 'IIT Delhi, Hauz Khas'
    },
    // ── DANCE ──
    {
      slug: 'nextgen-mun-delhi-2026',
      name: 'Aaveg 2026 — DTU Annual Dance Fest',
      college: 'Delhi Technological University',
      cat: 'dance',
      date: 'Apr 18-19, 2026',
      dateStart: '2026-04-18',
      desc: 'DTU\'s flagship inter-college dance competition. Solo, duet and group categories across classical, western and fusion forms. Prizes worth ₹75K.',
      regLink: 'https://unstop.com',
      hot: true,
      tags: ['classical', 'western', 'fusion', 'competition'],
      prize: '₹75,000',
      location: 'DTU, Rohini, Delhi'
    },
    // ── SPORTS ──
    {
      slug: 'sportech-nsut-2026',
      name: 'Sportech 2026 — NSUT Annual Sports Meet',
      college: 'Netaji Subhas University of Technology',
      cat: 'fest',
      date: 'Apr 8-10, 2026',
      dateStart: '2026-04-08',
      desc: 'NSUT\'s annual inter-college sports tournament featuring cricket, football, basketball, badminton and esports. Open to all Delhi NCR colleges.',
      regLink: 'https://unstop.com',
      hot: false,
      tags: ['cricket', 'football', 'esports', 'basketball'],
      prize: '₹30,000+',
      location: 'NSUT, Dwarka, Delhi'
    },
    // ── EXTRA ──
    {
      slug: 'kiet-mun-2026',
      name: 'KIET MUN 2026',
      college: 'KIET Group of Institutions, Ghaziabad',
      cat: 'mun',
      date: 'Mar 28-29, 2026',
      dateStart: '2026-03-28',
      desc: 'Two-day MUN conference by MUNSOC KIET. Committees include UNSC, WHO and All India Political Parties Meet. Open to school and college students.',
      regLink: 'https://www.dublieu.com/mun-tracker',
      hot: false,
      tags: ['UNSC', 'WHO', 'diplomacy'],
      prize: null,
      location: 'KIET, Ghaziabad, UP'
    }
  ];

  const ins = await col.insertMany(newEvents);
  console.log('Inserted:', ins.insertedCount, 'new events');

  // Print final list
  const all = await col.find({}, {projection:{slug:1,name:1,date:1,cat:1}}).sort({dateStart:1}).toArray();
  console.log('\n=== FINAL EVENTS LIST ===');
  all.forEach(e => console.log(e.cat.padEnd(12), e.date.padEnd(20), e.name));

  await client.close();
}
run().catch(console.error);
