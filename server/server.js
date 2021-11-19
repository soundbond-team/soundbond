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

const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient("soundcontainer");



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

app.get('/api/blob/create', async (req, res) => {
  // Charger des objets sur un BLOB
  // Create a unique name for the blob
  const blobName = 'quickstart.txt';

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log('\nUploading to Azure storage as blob:\n\t', blobName);

  // Upload data to the blob
  const data = 'Hello, World!';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
});

app.get('/api/blob/list', async (req, res) => {
  // Lister les BLOBS
  console.log('\nListing blobs...');

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
      console.log('\t', blob.name);
  }});
  


  // A helper function used to read a Node.js readable stream into a string
async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}

app.get('/api/blob/get', async (req, res) => {
    // Charger des objets sur un BLOB
  // Create a unique name for the blob
  const blobName = 'quickstart.txt';

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log(blockBlobClient);
  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  console.log('\nDownloaded blob content...');
  console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
});
