const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const EventSchema = new mongoose.Schema({
  slug: String, cat: String, name: String, college: String,
  date: String, time: String, venue: String, prize: String,
  free: Boolean, hot: Boolean, tags: [String], deadline: Number,
  registrations: Number, description: String, regLink: String,
  verified: Boolean, submittedBy: String, __v: Number
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  // UPDATE PURANE EVENTS
  const updates = [
    { slug: 'rendezvous-2026', date: 'Oct 1-4, 2026', deadline: new Date('2026-09-20').getTime(), regLink: 'https://unstop.com/college-fests/rendezvous-25-indian-institute-of-technology-iit-delhi-385378' },
    { slug: 'engifest-2026', date: 'Feb 20-22, 2026', deadline: new Date('2026-02-15').getTime(), regLink: 'https://unstop.com/college-fests/engifest-2026-delhi-technological-university-dtu-new-delhi' },
    { slug: 'crossroads-2026', date: 'Mar 14-16, 2026', deadline: new Date('2026-03-10').getTime(), regLink: 'https://unstop.com/college-fests/crossroads-2026-shri-ram-college-of-commerce-srcc-delhi' },
    { slug: 'mecca-2026', date: 'Mar 28-29, 2026', deadline: new Date('2026-03-25').getTime(), regLink: 'https://unstop.com/college-fests/mecca-2026-hindu-college-du-new-delhi' },
    { slug: 'hackdtu-2026', date: 'Apr 18-19, 2026', deadline: new Date('2026-04-10').getTime(), regLink: 'https://unstop.com/hackathons/hackdtu-2026-delhi-technological-university-dtu-new-delhi' },
    { slug: 'spandhan-2026', date: 'Mar 21, 2026', deadline: new Date('2026-03-18').getTime(), regLink: 'https://unstop.com/competitions/spandhan-dtu-dance-competition-2026' },
    { slug: 'robowars-2026', date: 'Apr 25, 2026', deadline: new Date('2026-04-20').getTime(), regLink: 'https://unstop.com/competitions/robowars-delhi-2026-nit-narela' },
    { slug: 'engifest-bob-2026', date: 'Feb 22, 2026', deadline: new Date('2026-02-18').getTime(), regLink: 'https://unstop.com/competitions/engifest-battle-of-bands-2026-dtu' },
    { slug: 'dumun-2026', date: 'Mar 10-12, 2026', deadline: new Date('2026-03-05').getTime(), regLink: 'https://unstop.com/college-fests/dumun-2026-hindu-college-delhi-university-delhi' }
  ];

  for (const u of updates) {
    const res = await Event.updateOne({ slug: u.slug }, { $set: u });
    console.log('Updated ' + u.slug + ':', res.modifiedCount ? 'OK' : 'not found');
  }

  // 15 NAYE UNSTOP EVENTS
  const newEvents = [
    {
      slug: 'national-space-hackathon-2026',
      cat: 'tech',
      name: 'National Space Hackathon — Tryst IIT Delhi',
      college: 'IIT Delhi',
      date: 'Mar 21-22, 2026',
      time: '9:00 AM',
      venue: 'IIT Delhi Campus, Hauz Khas',
      prize: '₹1,00,000',
      free: true,
      hot: true,
      tags: ['Space Tech', 'Hackathon', 'ISRO', 'AI', 'IIT Delhi'],
      deadline: new Date('2026-03-15').getTime(),
      registrations: 2200,
      description: 'National Space Hackathon organized as part of Tryst 2026, IIT Delhi. Build solutions for space exploration, satellite tech, and earth observation. Mentored by ISRO scientists. Open to all Indian college students.',
      regLink: 'https://unstop.com/hackathons/national-space-hackathon-tryst26-iit-delhi-1641554',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'invictus-dtu-2026',
      cat: 'fest',
      name: 'Invictus 2026 — DTU Annual Tech Fest',
      college: 'Delhi Technological University',
      date: 'Apr 4-5, 2026',
      time: '9:00 AM',
      venue: 'DTU Campus, Rohini',
      prize: '₹5,00,000',
      free: false,
      hot: true,
      tags: ['Tech Fest', 'Hackathon', 'Robotics', 'Coding', 'DTU'],
      deadline: new Date('2026-03-28').getTime(),
      registrations: 3500,
      description: "DTU's flagship annual tech fest with 30+ events including hackathons, robotics, coding contests, and project expo. One of Delhi NCR's biggest technical festivals with participants from 200+ colleges nationwide.",
      regLink: 'https://unstop.com/college-fests/invictus-2026-delhi-technological-university-dtu-new-delhi-440722',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'hindu-stock-exchange-2026',
      cat: 'literary',
      name: "Hindu Stock Exchange — L'Economiste 2026",
      college: 'Hindu College, DU',
      date: 'Mar 20, 2026',
      time: '11:00 AM',
      venue: 'Hindu College Campus, North Campus DU',
      prize: '₹15,000',
      free: true,
      hot: true,
      tags: ['Finance', 'Stock Market', 'Economics', 'Case Study', 'DU'],
      deadline: new Date('2026-03-15').getTime(),
      registrations: 850,
      description: "Stock market simulation competition by Dept. of Economics, Hindu College DU. 3 rounds: Finance Quiz, Case Study, and Live Stock Market Simulation. Part of L'Economiste 2026 annual departmental fest. Register as individual or team.",
      regLink: 'https://unstop.com/competitions/hindu-stock-exchange-hindu-college-du-new-delhi-1638542',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'reconovate-gargi-2026',
      cat: 'literary',
      name: 'Reconovate 2026 — Gargi College Quiz',
      college: 'Gargi College, DU',
      date: 'Mar 18, 2026',
      time: '2:00 PM',
      venue: 'Online + Gargi College Campus, DU',
      prize: '₹10,000',
      free: true,
      hot: false,
      tags: ['Quiz', 'General Knowledge', 'Team', 'DU', 'Delhi NCR'],
      deadline: new Date('2026-03-16').getTime(),
      registrations: 420,
      description: '3-round competition: Online Quiz on Unstop, Group Discussion on Google Meet, and Final Round on campus. Open exclusively to Delhi NCR undergraduate teams of 2-4 members. Certificates for all participants.',
      regLink: 'https://unstop.com/competitions/reconovate-gargi-college-delhi-university-delhi-1650285',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'hindu-policy-case-2026',
      cat: 'literary',
      name: 'Hindu Policy Case Competition 2026',
      college: 'Hindu College, DU',
      date: 'Mar 22, 2026',
      time: '10:00 AM',
      venue: 'Hindu College Campus, North Campus DU',
      prize: '₹20,000',
      free: true,
      hot: true,
      tags: ['Policy', 'Case Study', 'Economics', 'Debate', 'DU'],
      deadline: new Date('2026-03-18').getTime(),
      registrations: 700,
      description: "Policy analysis and case competition organized by Hindu College, University of Delhi. Teams analyze real-world policy problems and present solutions to a panel of experts. Part of L'Economiste 2026.",
      regLink: 'https://unstop.com/competitions/hindu-policy-case-competition-2026-hindu-college-du-new-delhi-1639869',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'synergy-dse-2026',
      cat: 'fest',
      name: 'Synergy 2026 — Delhi School of Economics Fest',
      college: 'Delhi School of Economics',
      date: 'Mar 25-26, 2026',
      time: '10:00 AM',
      venue: 'Delhi School of Economics, North Campus DU',
      prize: '₹75,000',
      free: false,
      hot: true,
      tags: ['Economics', 'Finance', 'Case Study', 'MUN', 'DU'],
      deadline: new Date('2026-03-20').getTime(),
      registrations: 1800,
      description: "DSE's prestigious annual fest Synergy 2026 — one of India's top economics and business fests. Events include trading simulation, case studies, policy debate, quiz, and cultural performances. Attended by students from top colleges pan India.",
      regLink: 'https://unstop.com/college-fests/synergy-2026-delhi-school-of-economics-dse-new-delhi-446556',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'enactopia-aryabhatta-2026',
      cat: 'literary',
      name: 'Enactopia — Sustainable B-Plan Competition',
      college: 'Aryabhatta College, DU',
      date: 'Mar 19, 2026',
      time: '11:00 AM',
      venue: 'Online + Aryabhatta College, DU',
      prize: '₹12,000',
      free: true,
      hot: false,
      tags: ['Business Plan', 'Sustainability', 'SDGs', 'Entrepreneurship', 'DU'],
      deadline: new Date('2026-03-16').getTime(),
      registrations: 380,
      description: 'Sustainable business plan competition by Aryabhatta College DU. Teams present innovative business models aligned with UN Sustainable Development Goals. 3 rounds including online quiz, ideation, and final presentation.',
      regLink: 'https://unstop.com/competitions/enactopia-sustainable-b-plan-competition-aryabhatta-college-du-delhi-1649110',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'sustainathon-christ-2026',
      cat: 'literary',
      name: "Sustainathon '26 — Christ University Delhi NCR",
      college: 'Christ University, Delhi NCR',
      date: 'Mar 24, 2026',
      time: '10:00 AM',
      venue: 'Christ University Delhi NCR Campus, Ghaziabad',
      prize: '₹8,000',
      free: false,
      hot: false,
      tags: ['Sustainability', 'SDGs', 'Social Entrepreneurship', 'ENACTUS', 'Delhi NCR'],
      deadline: new Date('2026-03-20').getTime(),
      registrations: 290,
      description: 'Inter-university sustainability and social entrepreneurship challenge by ENACTUS Christ. Teams design innovative business models aligned with UN SDGs. 3 rounds: online quiz, ideation, and business plan presentation. Registration fee Rs.200/team.',
      regLink: 'https://unstop.com/competitions/sustainathon26-sustainathon25-christ-university-delhi-ncr-1647469',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'hackcbs-du-2026',
      cat: 'tech',
      name: "hackCBS 3.0 — India's Largest Student Hackathon",
      college: 'Shaheed Sukhdev College of Business Studies, DU',
      date: 'Apr 12-13, 2026',
      time: '9:00 AM',
      venue: 'SSCBS Campus, Rohini, Delhi',
      prize: '₹2,00,000',
      free: true,
      hot: true,
      tags: ['Hackathon', 'Coding', 'Startup', 'Innovation', 'DU'],
      deadline: new Date('2026-04-05').getTime(),
      registrations: 4500,
      description: "India's largest student-run hackathon organized by SSCBS, University of Delhi. 36-hour hackathon with tracks in FinTech, HealthTech, EdTech, and Social Impact. Mentors from top startups and companies. Open to all Indian college students.",
      regLink: 'https://unstop.com/hackathons/hackcbs-30-indias-largest-student-run-hackathon-shaheed-sukhdev-college-of-business-studies-sscbs-university-of-delhi--127818',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'aurexis-gargi-2026',
      cat: 'literary',
      name: 'Aurexis 26 — Sustainable Case Competition',
      college: 'Gargi College, DU',
      date: 'Mar 15, 2026',
      time: '11:00 AM',
      venue: 'Online + Gargi College Campus, DU',
      prize: '₹10,000',
      free: true,
      hot: false,
      tags: ['Sustainability', 'Case Study', 'Environment', 'Solutions', 'DU'],
      deadline: new Date('2026-03-12').getTime(),
      registrations: 350,
      description: 'Sustainable case-to-solutions competition by Gargi College DU. Teams identify real-world sustainability challenges and propose actionable, innovative solutions. Open to all undergraduate students in Delhi NCR.',
      regLink: 'https://unstop.com/competitions/aurexis-26-a-sustainable-case-to-solutions-competition-gargi-college-delhi-university-delhi-1636174',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'e-raksha-iit-delhi-2026',
      cat: 'tech',
      name: 'E-Raksha Hackathon 2026 — IIT Delhi',
      college: 'IIT Delhi',
      date: 'Apr 5-6, 2026',
      time: '10:00 AM',
      venue: 'IIT Delhi Campus, Hauz Khas',
      prize: '₹1,50,000',
      free: true,
      hot: true,
      tags: ['Cybersecurity', 'Hackathon', 'Ethical Hacking', 'AI Security', 'IIT Delhi'],
      deadline: new Date('2026-03-25').getTime(),
      registrations: 1600,
      description: 'Cybersecurity hackathon at IIT Delhi. Participants solve real-world cybersecurity challenges across domains: network security, cryptography, web security, and AI-based threat detection. Teams of 2-4 members. Cash prizes + internship opportunities.',
      regLink: 'https://unstop.com/competitions/e-raksha-hackathon-2026-iit-delhi-1613454',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'voices-today-daulat-ram-2026',
      cat: 'literary',
      name: 'Voices of Today — Debate Competition 2026',
      college: 'Daulat Ram College, DU',
      date: 'Mar 17, 2026',
      time: '12:00 PM',
      venue: 'Daulat Ram College Campus, North Campus DU',
      prize: '₹8,000',
      free: true,
      hot: false,
      tags: ['Debate', 'Public Speaking', 'Current Affairs', 'DU', 'Women'],
      deadline: new Date('2026-03-14').getTime(),
      registrations: 280,
      description: "Debate competition organized by Daulat Ram College, DU on contemporary issues. Open to all undergraduate students. Individual participation. Topics cover social, political, and economic current affairs. Certificate of participation for all.",
      regLink: 'https://unstop.com/competitions/voices-of-today-debate-competition-2026-daulat-ram-college-du-delhi-1637470',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'potentate-2026',
      cat: 'mun',
      name: "Potentate 2026 — L'Economiste World Politics",
      college: 'Hindu College, DU',
      date: 'Mar 22, 2026',
      time: '10:00 AM',
      venue: 'Hindu College Campus, North Campus DU',
      prize: '₹12,000',
      free: true,
      hot: false,
      tags: ['World Politics', 'Economics', 'Debate', 'Diplomacy', 'DU'],
      deadline: new Date('2026-03-18').getTime(),
      registrations: 600,
      description: "World Economy and Politics simulation — auctions, negotiations, crises, and policy formulation. Part of L'Economiste 2026 Annual Departmental Fest at Hindu College DU. Note: Register in only one L'Economiste event.",
      regLink: 'https://unstop.com/competitions/potentate-hindu-college-du-new-delhi-1638535',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'tryst-iit-delhi-2026',
      cat: 'fest',
      name: 'Tryst 2026 — IIT Delhi Annual Tech Fest',
      college: 'IIT Delhi',
      date: 'Mar 20-22, 2026',
      time: '9:00 AM',
      venue: 'IIT Delhi Campus, Hauz Khas',
      prize: '₹10,00,000',
      free: false,
      hot: true,
      tags: ['Tech Fest', 'IIT Delhi', 'Hackathon', 'Robotics', 'Space Tech'],
      deadline: new Date('2026-03-15').getTime(),
      registrations: 8000,
      description: "IIT Delhi's iconic annual technical festival. 50+ events including hackathons, robotics, space tech, AI competitions, and cultural nights. One of India's biggest college tech fests attracting participants from 500+ colleges and international teams.",
      regLink: 'https://unstop.com/college-fests/tryst-2026-indian-institute-of-technology-iit-delhi-441745',
      verified: true, submittedBy: 'unstop', __v: 0
    },
    {
      slug: 'alma-fiesta-jmi-2026',
      cat: 'fest',
      name: 'Alma Fiesta 2026 — Jamia Millia Islamia',
      college: 'Jamia Millia Islamia',
      date: 'Mar 27-29, 2026',
      time: '10:00 AM',
      venue: 'JMI Campus, Jamia Nagar, New Delhi',
      prize: '₹3,00,000',
      free: false,
      hot: true,
      tags: ['Cultural Fest', 'Dance', 'Music', 'Art', 'JMI'],
      deadline: new Date('2026-03-22').getTime(),
      registrations: 5000,
      description: "Jamia Millia Islamia's biggest annual cultural and technical fest. Events across music, dance, drama, photography, design, coding, and robotics. Pro nights with top Bollywood artists. One of Delhi's most vibrant campus festivals.",
      regLink: 'https://unstop.com/college-fests/alma-fiesta-2026-jamia-millia-islamia-new-delhi',
      verified: true, submittedBy: 'unstop', __v: 0
    }
  ];

  for (const ev of newEvents) {
    const exists = await Event.findOne({ slug: ev.slug });
    if (!exists) {
      await Event.create(ev);
      console.log('Added: ' + ev.name);
    } else {
      console.log('Exists: ' + ev.name);
    }
  }

  const total = await Event.countDocuments();
  console.log('\nTotal events in DB:', total);
  await mongoose.disconnect();
}

run().catch(console.error);
