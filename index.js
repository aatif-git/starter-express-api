const express = require("express");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const categoryRoutes = require("./routes//categoryRoutes");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorHandler");
require("dotenv").config();

//create app
const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })

  .catch((error) => {
    console.log(error);
  });
