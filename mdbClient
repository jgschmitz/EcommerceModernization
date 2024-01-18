import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$vectorSearch': {
      'queryVector': [], 
      'path': 'items_embedding', 
      'numCandidates': 100, 
      'limit': 10, 
      'index': 'vector_index'
    }
  }
];

const client = await MongoClient.connect(
  'mongodb+srv://<credentials>@ecommprod.jot9w.mongodb.net/?retryWrites=true&w=majority'
);
const coll = client.db('grocery').collection('items');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
