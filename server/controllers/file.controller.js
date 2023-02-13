const { BlobServiceClient } = require("@azure/storage-blob");
const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.AZURE_CONTAINER_NAME
);

// Enregistrement d'un fichier.
exports.upload = async (req, res) => {
  // Récupérer le nom généré dans React.
  const blobName = req.files.file.name;

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Upload data to the blob
  await blockBlobClient.upload(req.files.file.data, req.files.file.size);
  res.status(200).send({ message: "File Uploaded", code: 200 });
};

exports.uploadML = async (req, res) => {
  //envoie ce son au model machine learning fastapi pour qu'il le traite et qu'il renvoie un json avec les infos
  const data = new FormData();
  data.append("file", req.files.file.data);

  // Envoi de la requête POST du fichier.
  return axios({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "post",
    url: "http://localhost:8000/guess_tags/",
    data,
  }).then((response) => {
    res.status(200).send({
      message: "File Uploaded for ml",
      code: 200,
      response: response.data,
    });
  });
};
