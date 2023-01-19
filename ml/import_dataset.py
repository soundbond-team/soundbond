# Client to the Node server
# Used to import a dataset into the database

import requests
import json
import os
import random
import time
from scipy.io import wavfile
from typing import List, Any
import pandas as pd
import xml.etree.ElementTree as ET
from datetime import datetime

BACK_URL = "http://localhost:8080/api/v1/"
FOLDER_PATH = "C:\\Users\\flake\\Downloads\\FSDKaggle2019.audio_test\\"
CSVS_PATH = "C:\\Users\\flake\\Downloads\\FSDKaggle2019.meta\\"
USER_IDS = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
USER_UPLOAD_WEIGHTS = [0.1, 0.2, 0.3, 0.2, 0.1, 0.05, 0.025, 0.0125, 0.00625, 0.003125, 0.0015625]

def get_random_string():
    """
    Returns 9 random string with modern crypto solution.
    """
    import secrets
    return secrets.token_hex(9)

# Now to upload the sound file to the file API
def post_file(file_path, file_name):
    """
    Post a file to the Node server.
    """
    # file : file
    # headers : Content-Type: multipart/form-data

    # Create a file object with file_name as name and file_path as date
    files = {"file": (file_name, open(file_path, "rb"))}

    # Send the request
    r = requests.post(BACK_URL + "file/", files=files)

    # Print the response
    return file_name


def post_sound(file_path, user_id, sound_location_id, createdAt):
    """
    Post a sound to the Node server.
    """
    # Get the file name
    # filename = user_id + "_" + get_random_string() + ".wav";
    file_name = f"{user_id}_{get_random_string()}.wav"

    # Get the file size
    file_size = os.path.getsize(file_path)

    # Get the file type
    file_type = "audio/wav"

    # Get the start time
    start_time = 0

    # Get the stop time
    # open the file and get the duration
    sample_rate, audio_data = wavfile.read(file_path)
    duration = audio_data.shape[0] / sample_rate
    stop_time = duration

    # Create the data to send
    data = {
        "url": file_name,
        "size": file_size,
        "codec": file_type,
        "startTime": start_time,
        "stopTime": int(stop_time),
        "duration": int(duration),
        "uploader_user_id": user_id,
        "soundlocation_id": sound_location_id,
        "createdAt": createdAt,
        "updatedAt": createdAt,
    }

    # Post the file
    file_name = post_file(file_path, file_name)

    # Send the request
    r = requests.post(BACK_URL+"sound/", data=data)
    try:
        return r.json()["id"]  # We return the id of the sound so we can use it later
    except KeyError:
        print(r.json())
        return post_sound(file_path, user_id, sound_location_id, createdAt)

def post_soundlocation(user_id, latitude, longitude, createdAt):
    """
    Post a sound location to the Node server.
    """
    # Create the data to send
    data = {
        "latitude": latitude,
        "longitude": longitude,
        "user_id": user_id,
        "createdAt": createdAt,
        "updatedAt": createdAt,
    }

    # Send the request
    r = requests.post(BACK_URL + "soundlocation/", data=data)

    # Print the response
    print(r.json())
    return r.json()["id"]  # We return the id of the sound location so we can use it later


def post_post(user_id, description, file_path, latitude, longitude, tags:List[Any], createdAt):
    """
    Post a post to the Node server.
    """
    soundlocation_id = post_soundlocation(user_id, latitude, longitude, createdAt)
    sound_id = post_sound(file_path, user_id, soundlocation_id, createdAt)
    
    """
    Post :
        description: description,
        publisher_user_id: uid,
        sound_id: sound_id,
        tags: tag,
    """

    # Create the data to send
    data = {
        "description": description,
        "publisher_user_id": user_id,
        "sound_id": sound_id,
        "tags": tags,
        "createdAt": createdAt,
        "updatedAt": createdAt,
    }

    # Send the request
    r = requests.post(BACK_URL + "post/", data=data)

    # Print the response
    print(r.json())


def return_random_user_id():
    """
    Returns a random user id, with these probabilities:
    2: 0.1
    3: 0.2
    4: 0.3
    5: 0.2
    6: 0.1
    7: 0.05
    8: 0.025
    9: 0.0125

    Users:
        1 IGNORER
        2 Guilhem Guilhem
        3 Mohamed 
        4 Paul Paul
        5 Maguette Maguette
        6 Cathy Cathy
        7 Hajar Hajar
        8 Rizlane
        9 Raphael
    """
    
    return random.choices(USER_IDS, weights=USER_UPLOAD_WEIGHTS)[0]



def return_random_lat_long():
    """
    Returns a random latitude and longitude, based in France.
    Extreme points:
    nord : Bray-Dunes, Nord (51° 04′ 18″ N, 2° 31′ 42″ E) ;
    est : plage de Fiorentine, San-Giuliano, Haute-Corse (42° 16′ 56″ N, 9° 33′ 36″ E) ;
    sud : écueil de Lavezzi, îles Lavezzi, Bonifacio, Corse-du-Sud (41° 19′ N, 9° 15′ E) ;
    ouest : phare de Nividic, Ouessant, Finistère (48° 26′ 45″ N, 5° 09′ 04″ O).

    We can use 3geonames to get the coordinates of somewhere.
    """
    
    # API call to https://api.3geonames.org/?randomland=FR
    xml = requests.get("https://api.3geonames.org/?randomland=FR").text
    try:
        root = ET.fromstring(xml)
    except ET.ParseError:
        print("Error with the XML from 3geonames.")
        # wait 1 second
        time.sleep(1)
        return return_random_lat_long()
    latitude = root[0][0].text
    longitude = root[0][1].text
    return latitude, longitude


print("Generating points...")

lat_long_list = []
# Extreme Ile-De-France points:
# nord : Saint-clair-sur-Epte, Epte, Eure-et-Loir 49.2063895,1.678966
# est : Louan-Villegruis-Fontaine 48.6097764,3.4857351
# sud : Beaumont-du-Gâtinais 48.1365394,2.4763389
# ouest : Blaru 49.0490725,1.4784398
# while len(lat_long_list) < 50: 
# get a random latitude and longitude from return_random_lat_long()
# if in the Ile-De-France region, add it to the list

while len(lat_long_list) < 5:
    lat, lon = return_random_lat_long()
    if 48.1365394 <= float(lat) <= 49.2063895 and 1.4784398 <= float(lon) <= 3.4857351:
        print(f"Added {lat}, {lon} to the list.")
        lat_long_list.append((lat, lon))

# generate 20 random points in the Ile-De-France region
for i in range(25):
    lat = random.uniform(48.1365394, 49.2063895)
    lon = random.uniform(1.4784398, 3.4857351)
    print(f"Added {lat}, {lon} to the list.")
    lat_long_list.append((lat, lon))


def return_idf_lat_long():
    """
    Returns a random latitude and longitude, based in Ile-De-France.
    """

    # pick one of the points in the list and add a small random offset
    lat, lon = random.choice(lat_long_list)
    lat = float(lat) + random.uniform(-0.01, 0.01)
    lon = float(lon) + random.uniform(-0.01, 0.01)

    return lat, lon


def return_random_date():
    """
    Returns a random date between le 20 septembre 2021 and now.
    We want a higher probability of recent dates.
    """

    date1 = datetime.strftime(datetime.fromtimestamp(random.randint(1632134400, int(datetime.now().timestamp()))), "%Y-%m-%d %H:%M:%S")
    date2 = datetime.strftime(datetime.fromtimestamp(random.randint(1632134400, int(datetime.now().timestamp()))), "%Y-%m-%d %H:%M:%S")
    date3 = datetime.strftime(datetime.fromtimestamp(random.randint(1632134400, int(datetime.now().timestamp()))), "%Y-%m-%d %H:%M:%S")
    # We return the most recent date
    return max(date1, date2, date3)

# Get the list of files in the folder
files = os.listdir(FOLDER_PATH)

# Get the test_post_competition.csv file
test_post_competition = pd.read_csv(os.path.join(CSVS_PATH, "test_post_competition.csv"))
print(test_post_competition.head())
"""
fname                    labels    usage  freesound_id   license
0  d527f12d.wav   Chewing_and_mastication  Private        327681  CC-BY-NC
1  4030a4f2.wav    Cupboard_open_or_close   Public        180226     CC-BY
2  e106401c.wav                      Purr  Private        155651       CC0
3  8d22f633.wav            Waves_and_surf  Private        360450       CC0
4  2d5dcc5d.wav  Tap,Drawer_open_or_close   Public        245765       CC0
"""

# We need to associate each file to a user, lat and long, and data from the csv files
continuer = False
iterations = 0
for file in files:
    if continuer:
        print(f"Processing {file}...")
        user_id = return_random_user_id()
        latitude, longitude = return_idf_lat_long()
        print(f"User id: {user_id}, latitude: {latitude}, longitude: {longitude}")
        description = test_post_competition[test_post_competition["fname"] == file]["labels"].values[0]
        license = test_post_competition[test_post_competition["fname"] == file]["license"].values[0]
        description = description + " License: " + license
        createdAt = return_random_date()
        print(createdAt)
        
        # We post the post
        post_post(user_id, description, FOLDER_PATH + file, latitude, longitude, [""], createdAt)
        iterations += 1
    if file == "64514aaf.wav":
        continuer = True
    if iterations == 1000:
        break
