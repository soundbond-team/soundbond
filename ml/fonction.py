#Récupération des données 
import random
import pymssql
import pandas as pd
import numpy as np


def connexion():
    cursor = conn.cursor()
    return cursor

#Récupération des posts écoutés par les utilisateurs 
def get_listened_post(cursor):
  listened_posts = []
  cursor.execute("SELECT u.id AS user_id, SUBSTRING(description, 0, CHARINDEX('License', description, 0)) AS tags, p.id AS post_id FROM Visits v, Posts p, Users u \
  WHERE v.sound_id = p.sound_id AND v.user_id = u.id ORDER BY user_id")
  for row in cursor:
    if(row['tags'] != ''):
      listened_posts.append([row['post_id'], row['user_id'], row['tags'], 1])
  return listened_posts


#Récupération des posts likés par les utilisateurs
def get_liked_post(cursor):  
  liked_post = []
  cursor.execute("SELECT p.id as post_id ,l.user_id, SUBSTRING(description, 0, CHARINDEX('License', description, 0)) AS tags FROM posts p,likes l WHERE l.post_id=p.id ORDER BY user_id")
  for row in cursor:
    if(row['tags'] != ''):
      liked_post.append([row['post_id'], row['user_id'], row['tags'], 1.75])
  return liked_post


#Récupération des posts partagés par les utilisateurs  
def get_shared_post(cursor):
  shared_post = []
  cursor.execute("SELECT p.id as post_id ,s.user_id, SUBSTRING(description, 0, CHARINDEX('License', description, 0)) AS tags FROM posts p,shares s WHERE s.post_id=p.id ORDER BY user_id")
  for row in cursor:
    if(row['tags'] != ''):
      shared_post.append([row['post_id'], row['user_id'], row['tags'], 2.25])
  return shared_post


#Regrouper les posts afin de calculer la valeur réelle du "rate"
  #Initialisation d'un DF avec les post_id et les user_id et dans chaque case on ajoute la somme des rates
def concat_all_posts(listened_posts, liked_post, shared_post):
  for i in listened_posts : 
    for y in liked_post : 
      if i[0] == y[0] and i[1] == y[1] : 
        i[3] = i[3] + y[3]
        liked_post.remove(y)
  listened_posts = np.concatenate((listened_posts, liked_post))

  x=0
  y=0
  for i in listened_posts : 
    for y in shared_post : 
      if i[0] == y[0] and i[1] == y[1] : 
        i[3] = i[3] + y[3]
        shared_post.remove(y)
  listened_posts = np.concatenate((listened_posts, shared_post))
  listened_posts = pd.DataFrame(listened_posts, columns=['post_id', 'user_id', 'tags', 'rating'])
  return listened_posts


# Extraction des tags
def extract_all_tags(listened_posts):
  tags = listened_posts['tags'].str.split(",", expand=True)
  all_tags = set()
  for c in tags.columns:
    distinct_tags = tags[c].str.replace('(', '').str.replace(')', '').str.lower().str.strip().unique()
    all_tags.update(distinct_tags)
  all_tags.remove(None)
  return all_tags

# Calcul des "rates" moyens par utilisateur et par tag
def ratings_mean_ny_user_tags(all_posts, all_tags):
  tags_ratings = pd.DataFrame()
  column_names = []
  for tag in all_tags:    
    column_names.append("avg_"+tag+"_rating")
    tags_post = all_posts[all_posts['tags'].str.replace('(', '').str.replace(')', '').str.contains(tag, case=False)]
    tags_post['rating'] = pd.to_numeric(tags_post['rating'], downcast="float")
    avg_tags_votes_per_user = tags_post.groupby('user_id')['rating'].mean()
    tags_ratings = pd.concat([tags_ratings, avg_tags_votes_per_user], axis=1)
  tags_ratings.columns = column_names
  return tags_ratings

# NaN values 
def correct_nan_values(tags_ratings):
  for c in tags_ratings.columns : 
    if tags_ratings.columns.get_loc(c)%2==1:
      for x in range(len(tags_ratings)):
        if x <= 28 : 
          valeur = random.uniform(0.5,1.00)
        elif x > 28 and x <= 56 : 
          valeur = random.uniform(1.00,2.00)
        elif x > 56 and x <= 84: 
          valeur = random.uniform(2.00,3.00)
        else : 
          valeur = random.uniform(3.00,4.00)
        if pd.isna(tags_ratings[c][x]):
          tags_ratings[c][x] = valeur
    else:
      for x in range(len(tags_ratings)):
        if x <= 28 : 
          valeur = random.uniform(3.00,4.00)
        elif x > 28 and x <= 56 : 
          valeur = random.uniform(2.00,3.00)
        elif x > 56 and x <= 84: 
          valeur = random.uniform(1.00,2.00)
        else : 
          valeur = random.uniform(0.5,1.00)
        if pd.isna(tags_ratings[c][x]):
          tags_ratings[c][x] = valeur
  return tags_ratings