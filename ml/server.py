# 1. Library imports
import pickle
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import random
import uvicorn
from fastapi import FastAPI
from fonction import *

# 2. Create the app object
app = FastAPI()

# 3. Index route, opens automatically on http://127.0.0.1:8000
@app.get("/")
def index():
    return {"message": "Hello, stranger"}


# 4. Route with a single parameter, returns the parameter within a message
#    Located at: http://127.0.0.1:8000/AnyNameHere
@app.get("/{name}")
def get_name(name: str):
    return {"message": f"Hello, {name}"}


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


# load pickle file
class LoadPickle(metaclass=Singleton):
    def __init__(self):
        print("Loading pickle file...")
        with open("./table.pickle", "rb") as f:
            self.table = pickle.load(f)

@app.get("/recommend/{user_id}")
def get_recommendations(user_id: int):
    
    cursor = connexion()

    # Récupération du dataframe
    all_posts = concat_all_posts(get_listened_post(cursor), get_liked_post(cursor), get_shared_post(cursor))
    all_tags = extract_all_tags(all_posts)
    tags_ratings1 = ratings_mean_ny_user_tags(all_posts, all_tags)
    tags_ratings = correct_nan_values(tags_ratings1)

    # Create an instance of KMeans to find two clusters
    kmeans_1 = KMeans(n_clusters=5)
    # Apprentissage
    kmeans_1.fit(tags_ratings)
    # Prédiction et qualité du modèle 
    pred_kmeans = kmeans_1.predict(tags_ratings)

    #Df des ratings de tags par user
    #On récupère l'index du user dans le df
    index_user_id = np.where(tags_ratings.index == user_id)

    #On récupère les users faisant partie du même cluster que user_id
    num_cluster = pred_kmeans[index_user_id[0][0]]
    similar_user_index = np.where(pred_kmeans == num_cluster)


    list_user_id = []
    for x in similar_user_index[0]: 
        list_user_id.append(tags_ratings.index[x])

    print("Liste des users similaires: ", list_user_id)  

    recommanded_sounds = []
    for u in list_user_id : 
        for c in all_posts.columns : 
            for x in range(len(all_posts)):
                if all_posts['user_id'][x] == u : 
                    recommanded_sounds.append({"post_id":all_posts['post_id'][x], "tags": all_posts['tags'][x]})

    return recommanded_sounds

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
