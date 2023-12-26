const connectDataBase = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary");
const errorMiddleware = require("./middleware/error");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerui = require("swagger-ui-express");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

dotenv.config({ path: "config/config.env" });

// Route Import:
const sell = require("./routes/sellRoute");
const user = require("./routes/userRoute");
const project = require("./routes/projectRoute");
const blog = require("./routes/blogRoute");
const register = require("./routes/registerRoute");

app.use("/api/v1", sell);
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", blog);
app.use("/api/v1", register);

//Connecting to database:
connectDataBase();

// Cloudinary:
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(errorMiddleware);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zameen.com APIs with Swagger",
      version: "0.1.0",
      description:
        "This is a Zameen.com API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
      },
    ],
  },
  apis: ["backend/routes/*.js", "backend/swagger.yaml"],
};

const specs = swaggerjsdoc(options);
app.use("/api-docs", swaggerui.serve, swaggerui.setup(specs));

app.listen(5000, () => {
  console.log("server listening on port ", 5000);
});
