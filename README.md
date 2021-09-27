# Group-Project-3-API

To Do List:

- [ ] Create a `videogameSchema`

| Attribute        | Type               | Validations & Constraints    |
| ---------------- | ------------------ | ---------------------------- |
| name             | String             | required: true, unique: true |
| image            | String             |                              |
| desc             | String             |                              |
| ignReview        | Number             |                              |
| metacriticReview | Number             |                              |
| polygonReview    | Number             |                              |
| googleReview     | Number             |                              |
| steamReview      | Number             |                              |
| userReviews      | [userReviewSchema] |                              |

- [ ] Create a `trendingNowSchema`

| Attribute | Type            | Validations & Constraints    |
| --------- | --------------- | ---------------------------- |
| rank      | Number          | required: true, unique: true |
| game      | videogameSchema | required: true               |

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
