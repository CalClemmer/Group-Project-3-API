# Group-Project-3-API

To Do List:

- [ ] Create a `videogameSchema`

| Attribute        | Type               | Validations & Constraints |
| ---------------- | ------------------ | ------------------------- |
| name             | String             | required: true            |
| image            | String             |                           |
| desc             | String             |                           |
| ignReview        | Number             |                           |
| metacriticReview | Number             |                           |
| polygonReview    | Number             |                           |
| googleReview     | Number             |                           |
| steamReview      | Number             |                           |
| userReviews      | [userReviewSchema] |                           |

- Example of returned API data for a videogame

---

{  
"id": 1030,

"cover": {  
"id": 172745,  
"url": "images.igdb.com/igdb/image/upload/t_cover_big/co3pah.jpg"  
},  
"genres": [
{
"id": 31,
"name": "Adventure"
}
],  
"name": "The Legend of Zelda: Majora's Mask",  
"rating": 87.4819300810487,  
"summary": "After the events of The Legend of Zelda: Ocarina of Time (1998), Link is assaulted by an imp named Skull Kid under the control of the evil Majora's Mask and gets stuck in a troubled land called Termina. Link must repeat the same 3 days, take on the identities of deceased people from other races, collect numerous masks and rid the land of evil to stop Majora from destroying the world in this third-person action/adventure game.",  
"total_rating_count": 524  
},

- [ ] Create a `favoritesSchema`

| Attribute | Type            | Validations & Constraints |
| --------- | --------------- | ------------------------- |
| user      | userId          | required: true            |
| game      | videogameSchema | required: true            |

- [ ] Create a `userSchema`

TBD

- [ ] Create a `userReviewSchema`

| Attribute     | Type   | Validations & Constraints |
| ------------- | ------ | ------------------------- |
| userId        | userId | required: true            |
| userFirstName | String |                           |
| rating        | Number |                           |
| desc          | String |                           |

- [] Create a `topReviewsSchema`

TBD
