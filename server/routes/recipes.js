const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      username: 'Mike',
      age: 34,
    },
    {
      username: 'Beth',
      age: 35,
    },
    {
      username: 'Bob',
      age: 40,
    },
  ]);
});

module.exports = router;
//hi
