const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://rhythmgoel9:hjIIaC3iwRadR7pl@cluster0.qgdtyex.mongodb.net/campusbuzz?appName=Cluster0';
async function run() {
  const client = new MongoClient(uri);
  await client.connect();
  const col = client.db('campusbuzz').collection('events');

  // Tryst - Instagram confirmed: 27 Feb - 1 Mar 2026
  await col.updateOne({slug:'tryst-iit-delhi-2026'},{$set:{date:'27 Feb - 1 Mar 2026',dateStart:'2026-02-27',dateEnd:'2026-03-01'}});
  console.log('Tryst updated: 27 Feb - 1 Mar 2026');

  // Spandhan - part of Engifest, same dates
  await col.updateOne({slug:'spandhan-2026'},{$set:{date:'21-23 Mar 2026'}});
  console.log('Spandhan updated');

  // Engifest BOB - part of Engifest, same dates
  await col.updateOne({slug:'engifest-bob-2026'},{$set:{date:'21-23 Mar 2026'}});
  console.log('Engifest BOB updated');

  await client.close();
  console.log('All done!');
}
run().catch(console.error);
