const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://rhythmgoel9:hjIIaC3iwRadR7pl@cluster0.qgdtyex.mongodb.net/campusbuzz?appName=Cluster0';
async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('campusbuzz');
  const col = db.collection('events');

  const updates = [
    // Engifest DTU - official site engifest.in - 21-23 March 2026
    { slug: 'engifest-2026', data: { date: '21-23 Mar 2026', dateStart: '2026-03-21', dateEnd: '2026-03-23' } },
    // Rendezvous IIT Delhi - Oct 2026 (annual fest, usually Oct)
    { slug: 'rendezvous-2026', data: { date: 'Oct 2026' } },
    // Crossroads SRCC - March 2026
    { slug: 'crossroads-2026', data: { date: 'Mar 2026' } },
    // Mecca Hindu College - Mar 2026
    { slug: 'mecca-2026', data: { date: 'Mar 2026' } },
    // HackDTU - Mar 2026
    { slug: 'hackdtu-2026', data: { date: 'Mar 2026' } },
    // Tryst IIT Delhi - Feb 28 - Mar 2 2026 (official)
    { slug: 'tryst-iit-delhi-2026', data: { date: '28 Feb - 2 Mar 2026' } },
    // Invictus DTU - Mar 2026
    { slug: 'invictus-dtu-2026', data: { date: 'Mar 2026' } },
  ];

  for(const u of updates) {
    const r = await col.updateOne({ slug: u.slug }, { $set: u.data });
    console.log(u.slug+':', r.modifiedCount ? 'Updated' : 'Not found/unchanged');
  }

  // Print all events for verification
  const all = await col.find({}, {projection:{slug:1,name:1,date:1,college:1}}).toArray();
  console.log('\n=== ALL EVENTS ===');
  all.forEach(e => console.log(e.slug+' | '+e.name+' | '+e.date+' | '+e.college));

  await client.close();
}
run().catch(console.error);
