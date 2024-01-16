const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');

// Replace 'your_connection_string' with your actual Elasticsearch connection string
const elasticsearchConnectionString = 'https://test-deployment-01564d.es.eastus2.azure.elastic-cloud.com';

// Replace 'your_openai_api_key' with your actual OpenAI API key
const openaiApiKey = 'your_openai_api_key';
const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions'; // Adjust the endpoint as needed
# I hope this part works - 
// Create an Elasticsearch client
const elasticsearchClient = new Client({ node: elasticsearchConnectionString });

// Example: Get the index definition
const indexName = 'your_index_name'; // Replace with the actual index name

async function getIndexDefinition() {
  try {
    const { body } = await elasticsearchClient.indices.get({ index: indexName });
    console.log(body[indexName]);
  } catch (error) {
    console.error(`Error getting index definition: ${error.message}`);
  }
}

// Example: Make a request to OpenAI API
async function makeOpenAIRequest() {
  try {
    const prompt = 'Your input prompt here...'; // Customize your input prompt
    const response = await axios.post(
      openaiEndpoint,
      {
        prompt: prompt,
        max_tokens: 150, // Customize based on your requirements
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`,
        },
      }
    );

    console.log(response.data.choices[0].text); // Output the generated text
  } catch (error) {
    console.error(`Error making OpenAI API request: ${error.message}`);
  }
}

// Call the functions
getIndexDefinition();
makeOpenAIRequest();
