const express = require('express');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));



//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/assignments', require('./routes/api/assignments'));

// Bind the server to the PORT only when we have successfully connected to the database
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}).catch(({message}) => {
  console.error('Server failed to start:', message);
});
