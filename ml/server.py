# 1. Library imports
import pickle

import uvicorn
from fastapi import FastAPI

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
    return = LoadPickle().table[user_id]

# 5. Run the API with uvicorn
#    Will run on http://127.0.0.1:8000
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
