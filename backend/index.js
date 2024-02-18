require("dotenv").config();
const Express = require("express");
const app = Express();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.json({
    message: `Hello WonJob Backend API Works ${port}`,
  });
});
app.get('/api', (req, res) => {
  res.json({
    api_routes: ["/api/job_posts", "/api/job_posts2"],
  });
});
app.get('/api/job_posts', (req, res) => {
  res.json({
    message: `job_posts from index Hello WonJob Backend API Works ${port}`,
  });
});
module.exports = app;