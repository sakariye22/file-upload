const app = require('./server.js'); 
const PORT = process.env.PORT || 3000; 
const mongoose = require ('mongoose');




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
