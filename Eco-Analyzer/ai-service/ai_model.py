import sys
import json
import pandas as pd
from sklearn.externals import joblib
from transformers import pipeline

# Load pre-trained models
sentiment_analyzer = pipeline("sentiment-analysis")
ner_pipeline = pipeline("ner", grouped_entities=True)
clf = joblib.load('carbon_footprint_model.pkl')

def calculate_impact_score(text):
    # NLP feature extraction
    sentiment = sentiment_analyzer(text)[0]['score']
    entities = ner_pipeline(text)
    
    # Material keywords
    eco_keywords = ['recycled', 'organic', 'sustainable', 'renewable']
    keyword_count = sum([1 for word in text.split() if word in eco_keywords])
    
    # Predict with ML model
    features = pd.DataFrame({
        'sentiment': [sentiment],
        'entities': [len(entities)],
        'keyword_count': [keyword_count]
    })
    score = clf.predict(features)[0]
    
    return min(max(score, 0), 100)

if __name__ == "__main__":
    data = json.loads(sys.stdin.read())
    text = f"{data['description']} {data.get('manufacturingDetails', '')} {data.get('supplyChainInfo', '')}"
    
    impact_score = calculate_impact_score(text)
    recommendations = generate_recommendations(impact_score)
    
    print(json.dumps({
        "impactScore": impact_score,
        "recommendations": recommendations
    }))