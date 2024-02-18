require("dotenv").config();
const Express = require("express");
const app = Express();

const router = Express.Router();





const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
});
app.use('/', (req, res) => {
    res.json({
        message: `job_posts Hello WonJob Backend API Works ${port}`,
    });
});
// `app.get('/', (req, res) => {
//     res.json({
//         message: `job_posts Hello WonJob Backend API Works ${port}`,
//     });
// });

// router.get('/', (req, res) => {
//     res.json(['😀', '😳', '🙄']);
// });
module.exports = router;