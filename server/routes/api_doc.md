# API Documentation

## Post

### **Post creation**
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
  `{"description":"Train sounds are great", "publisher_user_id": 15, "sound_id": 65}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
        "id": 1,
        "description": "Train sounds are great",
        "publisher_user_id": 15,
        "sound_id": 65,
        "updatedAt": "2021-10-12T20:45:45.381Z",
        "createdAt": "2021-10-12T20:45:45.381Z"
    }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Some error occurred while creating the post." }`

### **Get all posts**
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
    **Content:** `[
        {
            "id": 1,
            "description": "Train sounds are great",
            "like": null,
            "createdAt": "2021-10-12T20:58:52.000Z",
            "updatedAt": "2021-10-12T20:58:52.000Z",
            "publisher_user_id": 15,
            "sound_id": 65
        }
    ]`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Some error occurred while retrieving the post." }`

### **Get Post**
----
  Get everything about a single post.

* **URL**

  /api/v1/post/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Payload**
  
  `{"description":"Train sounds are great !", "publisher_user_id": 15, "sound_id": 65}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{"message": "Post was updated successfully."}`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Error retrieving Post with id=1" }`

### **Update Post**
----
  Change something about a Post.

* **URL**

  /api/v1/post/:id

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Payload**
  
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Post was updated successfully." }`

  * **Code:** 200 <br />
    **Content:** `{ Cannot update Post with id=:id. Maybe Post was not found or req.body is empty!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Error updating Post with id=1" }`

### **Delete Post**
----
  Delete a Post.

* **URL**

  /api/v1/post/:id

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Payload**
  
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "Post was deleted successfully!" }`

  * **Code:** 200 <br />
    **Content:** `{ Cannot delete Post with id=:id. Maybe Post was not found!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Could not delete Post with id=1" }`

### **Delete all Posts**
----
  Delete every single Post (WARNING !).

* **URL**

  /api/v1/post/

* **Method:**

  `DELETE`
  
*  **URL Params**

   **Required:**
 
   None

* **Payload**
  
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ "message": "[Numner of deleted Posts] Posts were deleted successfully!" }`
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "Some error occurred while removing all post." }`
