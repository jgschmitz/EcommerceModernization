const { Client } = require('@elastic/elasticsearch');

// Replace 'your_connection_string' with your actual Elasticsearch connection string
const connection_string = 'https://test-deployment-01564d.es.eastus2.azure.elastic-cloud.com';

// Create an Elasticsearch client
const client = new Client({ node: connection_string });

// Example: Get the index definition
const indexName = 'your_index_name'; // Replace with the actual index name

async function getIndexDefinition() {
  try {
    const { body } = await client.indices.get({ index: indexName });
    console.log(body[indexName]);
  } catch (error) {
    console.error(`Error getting index definition: ${error.message}`);
  }
}

// Call the function to get the index definition
getIndexDefinition();
