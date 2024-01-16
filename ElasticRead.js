const { Client } = require('@elastic/elasticsearch');

// Replace these values with your actual Elasticsearch connection details
const clusterId = 'dbe766fc301b4286b2b74ad8ba303fce';
const username = 'elastic';
const password = 'uQFTxSsR7Kmh72PAGM5mplDv';

// Create an Elasticsearch client with user access
const client = new Client({
  cloud: {
    id: clusterId,
  },
  auth: {
    username,
    password,
  },
});

// Example: Retrieve data from an index
const indexName = 'your_index_name';
const queryBody = {
  query: {
    match_all: {}  // You can customize your query here
  }
};

// Perform a search
async function searchData() {
  const { body } = await client.search({
    index: indexName,
    body: queryBody
  });

  // Process the result
  body.hits.hits.forEach(hit => {
    console.log(hit._source);
  });
}

// Call the function to perform the search
searchData();
