require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function uploadToPinata(filePath) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const response = await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': process.env.PINATA_API_KEY,
            'pinata_secret_api_key': process.env.PINATA_API_SECRET
        }
    });

    return response.data;
}

async function main() {
    const imagePaths = [
        'images/image_0.jpeg',
        'images/image_1.jpeg',
        'images/image_2.jpeg',
        'images/image_3.jpeg',
        'images/image_4.jpeg'
    ];

    // Select a random image
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    const selectedImagePath = imagePaths[randomIndex];
    console.log(`Selected image: ${selectedImagePath}`);

    // Upload the selected image to IPFS
    const result = await uploadToPinata(selectedImagePath);
    console.log('Image uploaded to IPFS with CID:', result.IpfsHash);

    // Use the CID to mint the NFT
    mintNFT(result.IpfsHash);
}

// Function to mint the NFT (you need to implement the logic to interact with your contract)
function mintNFT(cid) {
    // Here goes the code to interact with your contract and mint the NFT using the CID
    console.log('Minting NFT with CID:', cid);
}

main().catch(console.error);
