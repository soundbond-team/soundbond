const { BlobServiceClient } = require('@azure/storage-blob');
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);


exports.containers = async (req, res) => {
  // Obtenir la liste des containers.
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
};

exports.create = async (req, res) => {
  // Charger "hello world" sur un BLOB
  // Create a unique name for the blob
  const blobName = 'quickstart.txt';

  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log('\nUploading to Azure storage as blob:\n\t', blobName);

  // Upload data to the blob
  const data = 'Hello, World!';
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);
};

exports.list_blobs = async (req, res) => {
  // Lister les BLOBS
  console.log('\nListing blobs...');

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
  }
};

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

exports.get_blob = async (req, res) => {
  // Obtenir un blob.

  const blobName = 'quickstart.txt';
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const downloadBlockBlobResponse = await blockBlobClient.download(0);
  console.log('\nDownloaded blob content...');
  console.log('\t', await streamToString(downloadBlockBlobResponse.readableStreamBody));
};