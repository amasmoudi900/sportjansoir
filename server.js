// import app from app.js
const app = require('./backend/app');
// http://localhost:3000
// Express Server is running on PORT 3000
app.listen(3000, () => {
    console.log("Server is Listening on PORT 3000 ...");
});