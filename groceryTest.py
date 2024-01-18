import pymongo
client = pymongo.MongoClient("mongodb+srv://ecomm-user:mongodb@ecommprod.jot9w.mongodb.net/")
db = client.vector_tests

from sentence_transformers import SentenceTransformer, util
model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

docs = [
  "Beet & Citrus Soup.",
  "Skate Board Fresh Roses Bodywash.",
  "BBQ Chips.",
  "Fresh Oranges.",
  "Count Chocula.",
]
print(docs)

result_doc = {}
for doc in docs:
  doc_vector = model.encode(doc).tolist()
  result_doc['sentence'] = doc
  result_doc['vectorEmbedding'] = doc_vector
  result = db.vectors_demo_1.insert_one(result_doc.copy())
  print(result)
