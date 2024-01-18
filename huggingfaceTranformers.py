import pymongo
from sentence_transformers import SentenceTransformer

# MongoDB connection
client = pymongo.MongoClient("mongodb+srv://ecomm-user:mongodb@ecommprod.jot9w.mongodb.net")
db = client.vector_tests

# Sentence embeddings model
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# MongoDB collection
collection_name = 'your_collection_name'
collection = db[collection_name]

# Find all documents in the collection
documents = collection.find()

for doc in documents:
    # Concatenate values from multiple fields (adjust field names accordingly)
    text_to_encode = f"{doc['field1']} {doc['field2']} {doc['field3']}"

    # Encode the concatenated text to get the vector embedding
    doc_vector = model.encode(text_to_encode).tolist()

    # Update the document in the collection with the vector embedding
    collection.update_one({'_id': doc['_id']}, {'$set': {'vectorEmbedding': doc_vector}})
    print(f"Updated document with _id: {doc['_id']}")

# Close the MongoDB connection
client.close()
