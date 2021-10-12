# API Documentation

## Post

**Post creation**
----
  Create a single Post.

* **URL**

  /api/v1/post/

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Payload**
  `{ "description" : "A small description of what's posted, "publisher_user_id" : "The ID of the posting user", "sound_id" : "The ID of the posted sound" }`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "description": "Train sounds are great",
    "publisher_user_id": 15,
    "sound_id": 65,
    "updatedAt": "2021-10-12T20:45:45.381Z",
    "createdAt": "2021-10-12T20:45:45.381Z"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Some error occurred while creating the post." }`

**Get all posts**
----
  Get every Posts ever posted.

* **URL**

  /api/v1/post/

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Payload**
  
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
    "id": 2,
    "description": "Train sounds are great",
    "publisher_user_id": 15,
    "sound_id": 65,
    "updatedAt": "2021-10-12T20:45:45.381Z",
    "createdAt": "2021-10-12T20:45:45.381Z"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Some error occurred while retrieving the post." }`
