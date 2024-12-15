// Import the MongoDB client
import { MongoClient } from 'mongodb';

// Source database connection string
const sourceURI = 'mongodb+srv://shuence:shubham02@travelworld.mj2z7vq.mongodb.net/tours_booking?retryWrites=true&w=majority';

// Target database connection string
const targetURI = 'mongodb+srv://nisha971943:Ashi%401234@nishayadav.ut56rhi.mongodb.net/tours_booking?retryWrites=true&w=majority';

(async () => {
  let sourceClient, targetClient;

  try {
    // Connect to the source database
    sourceClient = new MongoClient(sourceURI);
    await sourceClient.connect();
    console.log('Connected to the source database');

    const sourceDb = sourceClient.db();
    const collections = await sourceDb.listCollections().toArray();

    // Connect to the target database
    targetClient = new MongoClient(targetURI);
    await targetClient.connect();
    console.log('Connected to the target database');

    const targetDb = targetClient.db();

    for (const { name: collectionName } of collections) {
      console.log(`Transferring collection: ${collectionName}`);

      const sourceCollection = sourceDb.collection(collectionName);
      const targetCollection = targetDb.collection(collectionName);

      // Fetch all data from the current collection
      const data = await sourceCollection.find({}).toArray();
      console.log(`Fetched ${data.length} documents from collection: ${collectionName}`);

      if (data.length > 0) {
        const result = await targetCollection.insertMany(data);
        console.log(`Successfully inserted ${result.insertedCount} documents into collection: ${collectionName}`);
      } else {
        console.log(`No data to transfer for collection: ${collectionName}`);
      }
    }
  } catch (error) {
    console.error('Error during data transfer:', error);
  } finally {
    // Close the database connections
    if (sourceClient) await sourceClient.close();
    if (targetClient) await targetClient.close();
    console.log('Database connections closed');
  }
})();
