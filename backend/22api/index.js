require("dotenv").config();
const Express = require("express");
const app = Express();

const job_posts = require('./job_posts');

const router = Express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/job_posts', job_posts);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
app.get('/api/job_posts', (req, res) => {
  res.json({
    message: `api job_posts index Hello WonJob Backend API Works ${port}`,
  });
});
module.exports = router;