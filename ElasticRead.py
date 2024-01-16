from elasticsearch import Elasticsearch
#requires Elasticsearch module - pip install elasticsearch 
# Replace 'your_connection_string' with your actual Elasticsearch connection string
connection_string = 'your_connection_string'

# Create an Elasticsearch client
es = Elasticsearch(connection_string)

# Example: Retrieve data from an index
index_name = 'your_index_name'
query_body = {
    "query": {
        "match_all": {}  # You can customize your query here
    }
}

# Perform a search
result = es.search(index=index_name, body=query_body)

# Process the result
for hit in result['hits']['hits']:
    print(hit['_source'])
