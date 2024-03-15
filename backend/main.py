from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import json
from pydantic import BaseModel
from typing import Optional, Dict


app = FastAPI() #creates instance of FastAPI class that will contain all API routes and configs


origins = [
    "http://localhost:5173",
]
class Comment(BaseModel):
    id: int
    parent_id: Optional[int] = None  # Use Optional since parent_id can be null
    display_name: str
    text: str
    created_at: str

class Post(BaseModel):
    post_url: str
    title: str
    created_at: str
    num_hugs: int
    patient_description: str
    assessment: str
    question: Optional[str] = None
    comments: Dict[str, Comment]

class HugUpdate(BaseModel):
    num_hugs: int

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# read mock data
@app.get("/")
def read_data(): #defines read_data method
    with open("./backend/data.json", 'r') as file:
        data = json.load(file)
        return data

# update data
@app.put("/posts/{key}")
def update_hugs(key: int, hug_update: HugUpdate):

    #update data.json first
    post_updated = False
    with open("./backend/data.json", 'r+') as file:
        posts = json.load(file)
        if key >= len(posts):
            raise HTTPException(status_code=404, detail="Post not found")
        posts[key]["num_hugs"] = hug_update.num_hugs
        file.seek(0)
        json.dump(posts, file, indent=4)
        file.truncate()
        post_updated = True
    # return data[key]

    if post_updated:
        with open("./backend/user.json", "r+") as user_file:
            user_data = json.load(user_file)  # Corrected to use user_file
            # Toggle liked status
            current_hug_status = user_data["likedPostsUrls"].get(str(key), False)  # Ensure the key is the correct type
            user_data["likedPostsUrls"][str(key)] = not current_hug_status
            user_file.seek(0)
            json.dump(user_data, user_file, indent=4)
            user_file.truncate()
        #update user.json data

        return {
            "message": "Post and user data updated",
            "user_data": user_data
        }
