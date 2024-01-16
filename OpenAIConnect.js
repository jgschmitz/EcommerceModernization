const { Client } = require('@elastic/elasticsearch');
const axios = require('axios');
const mongoose = require('mongoose');

// Replace 'your_connection_string' with your actual Elasticsearch connection string
const elasticsearchConnectionString = 'https://test-deployment-01564d.es.eastus2.azure.elastic-cloud.com';

// Replace 'your_openai_api_key' with your actual OpenAI API key
const openaiApiKey = 'a7e225a5012c45a4bd2a530360e00507';

const openaiEndpoint = 'https://api.openai.com/v1/engines/davinci/completions'; // Adjust the endpoint as needed

// Replace 'your_mongodb_connection_string' with your actual MongoDB connection string
const mongodbConnectionString = 'mongodb+srv://<username>:<password>@ecommprod.jot9w.mongodb.net/?retryWrites=true&w=majority';

// Create an Elasticsearch client
const elasticsearchClient = new Client({ node: elasticsearchConnectionString });

// MongoDB Schema
const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  image_url: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  price_special: {
    type: Number
  }
});

const ProductModel = mongoose.model('Product', productSchema);

// Example: Get the index definition from Elasticsearch
const indexName = 'your_index_name'; // Replace with the actual index name

async function getIndexDefinition() {
  try {
    // OpenAI request
    const openAIResponse = await axios.post(
      openaiEndpoint,
      {
        prompt: 'Your input prompt here...',
        max_tokens: 150 // Customize based on your requirements
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiApiKey}`
        }
      }
    );

    const generatedText = openAIResponse.data.choices[0].text;

    // Elasticsearch request
    const { body } = await elasticsearchClient.indices.get({ index: indexName });
    console.log('Elasticsearch Index Definition:', body[indexName]);

    // Save data to MongoDB
    const productData = {
      _id: mongoose.Types.ObjectId('624c64e7102ffcabac4dabde'),
      category: 'Home Meal Replacement',
      tags: ['Home Meal Replacement', 'Soups', 'Chilled Soup'],
      image_url: 'http://mdb-store.com/images/0062813210011.jpg',
      brand: 'Soupesoup',
      name: 'Beet & Citrus Soup',
      format: '625 ml',
      price: 6.99,
      price_special: 5.99,
      generatedText: generatedText
    };

    const productDocument = new ProductModel(productData);
    await productDocument.save();
    console.log('Saved product to MongoDB:', productData);
  } catch (error) {
    console.error(`Error getting index definition, making OpenAI request, or saving to MongoDB: ${error.message}`);
  }
}

// Connect to MongoDB
mongoose.connect(mongodbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Call the function to get the index definition, make OpenAI request, and save to MongoDB
getIndexDefinition();
