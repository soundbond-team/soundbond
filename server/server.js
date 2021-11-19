/* Minimal requiered template for a development server. */

// instanciation des frameworks requis.
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize"); // ORM
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 8080; // Port du serveur de développement.
const checkUser = require("./middleware/auth.middleware");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// On dit au serveur de servir ces pages.
require("./routes/sound.routes")(app);
require("./routes/soundlocation.routes")(app);
require("./routes/post.routes")(app);
require("./routes/User.routes")(app);

// jwt

app.use(checkUser.checkUser); //a chaque requete nous verifions si l'utilisateur est bien connecté
app.get("/jwtid", checkUser.requireAuth, (req, res) => {
  let id = res.locals.user;
  res.status(200).send(id);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Récupération de la base de données
const db = require("./models");
const { response } = require("express");

db.sequelize.sync({ force: true });

module.exports = app;









// Azure

// Azure
const { BlobServiceClient, BaseRequestPolicy, newPipeline, AnonymousCredential } = require("@azure/storage-blob");

// Create a policy factory with create() method provided
class RequestIDPolicyFactory {
  // Constructor to accept parameters
  constructor(prefix) {
    this.prefix = prefix;
  }

  // create() method needs to create a new RequestIDPolicy object
  create(nextPolicy, options) {
    return new RequestIDPolicy(nextPolicy, options, this.prefix);
  }
}

// Create a policy by extending from BaseRequestPolicy
class RequestIDPolicy extends BaseRequestPolicy {
  constructor(nextPolicy, options, prefix) {
    super(nextPolicy, options);
    this.prefix = prefix;
  }

  // Customize HTTP requests and responses by overriding sendRequest
  // Parameter request is WebResource type
  async sendRequest(request) {
    // Customize client request ID header
    request.headers.set(
      "x-ms-version",
      `2020-02-10`
    );

    // response is HttpOperationResponse type
    const response = await this._nextPolicy.sendRequest(request);

    // Modify response here if needed

    return response;
  }
}

const pipeline = newPipeline(new AnonymousCredential());

// Inject customized factory into default pipeline
pipeline.factories.unshift(new RequestIDPolicyFactory("Prefix"));

const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_ACCOUNT_NAME}.blob.core.windows.net${process.env.AZURE_SIGNATURE_ACCES_PARTAGE}`,
  pipeline
);



app.get('/api/containers', async (req, res) => {

  let i = 1;
  const constainers = [];
  try {
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
      console.log(container);
      constainers.push(container.name)
    }
  }catch(err) {
    console.error("err:::", err);
  }
  res.json(constainers);
});