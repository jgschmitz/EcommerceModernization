const { Client } = require('@elastic/elasticsearch');
# requires npm install elasticsearch
// Replace 'your_connection_string' with your actual Elasticsearch connection string
const connection_string = 'your_connection_string';

// Create an Elasticsearch client
const client = new Client({ node: connection_string });

// Example: Retrieve data from an index
const index_name = 'your_index_name';
const query_body = {
  query: {
    match_all: {}  // You can customize your query here
  }
};

// Perform a search
async function searchData() {
  const { body } = await client.search({
    index: index_name,
    body: query_body
  });

  // Process the result
  body.hits.hits.forEach(hit => {
    console.log(hit._source);
  });
}

// Call the function to perform the search
searchData();
