const express = require('express');

const job_posts = require('./job_posts');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/job_posts', job_posts);

module.exports = router;