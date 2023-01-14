import tweepy
import pandas as pd
from dotenv import load_dotenv
import os

load_dotenv()

# Clés et jetons
consumer_key = os.getenv("CONSUMER_KEY")
consumer_secret = os.getenv("CONSUMER_SECRET")
access_token = os.getenv("ACCESS_TOKEN")
access_token_secret = os.getenv("ACCESS_TOKEN_SECRET")

# paramètres pour initialiser l’API
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)

# liste des abonnés de l'utilisateur(1210627806).
user_list = ["1210627806"]
follower_list = []
for user in user_list:
    followers = []
    try:
        for page in tweepy.Cursor(api.followers_ids, user_id=user).pages():
            followers.extend(page)
            print(len(followers))
    except tweepy.TweepError:
        print("error")
        continue
    follower_list.append(followers)

df = pd.DataFrame(columns=["source", "target"])  # DataFrame
df["target"] = follower_list[0]  # Colonne cible
df["source"] = 1210627806  # Id utilisateur en tant que source

# On utilise la liste des abonnés déja extraite dans le code ci-dessus(450 abonnés)
user_list2 = list(df["target"])
for userID in user_list2:
    print(userID)
    followers2 = []
    follower_list2 = []

    # On récupére l'utilisateur
    user = api.get_user(userID)

    # nombre de followers de l'utilisateur
    followers_count = user.followers_count

    try:
        for page in tweepy.Cursor(api.followers_ids, user_id=userID).pages():
            followers2.extend(page)
            print(len(followers2))
            if followers_count >= 5000:  # On prend que les 5000 premiers abonnés
                break
    except tweepy.TweepError:
        print("error")
        continue
    follower_list2.append(followers2)
    temp = pd.DataFrame(columns=["source", "target"])
    temp["target"] = follower_list2[0]
    temp["source"] = userID
    df = df.append(temp)
    df.to_csv("networkOfFollowers.csv")
