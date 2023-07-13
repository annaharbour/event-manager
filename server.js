const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({extended: false}));
app.use(express.static(path.join(__dirname, "/client/build")));


//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/assignments', require('./routes/api/assignments'));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });

// Bind the server to the PORT only when we have successfully connected to the database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(({message}) => {
  console.error('Server failed to start:', message);
});
