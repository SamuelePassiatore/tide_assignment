require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Web3} = require('web3');  // Importa web3
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_API_SECRET;

// ABI del contratto
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "uri",
                "type": "string"
            }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

async function uploadToPinata(filePath) {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append('file', fs.createReadStream(filePath));

    const response = await axios.post(url, data, {
        maxBodyLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            'pinata_api_key': pinataApiKey,
            'pinata_secret_api_key': pinataSecretApiKey
        }
    });

    return response.data;
}

async function mintNFT(to, tokenURI) {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

        if (!web3.utils.isHex(privateKey) || privateKey.length !== 64) {
            throw new Error('Invalid Private Key');
        }

        const account = web3.eth.accounts.privateKeyToAccount(`0x${privateKey}`);
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;

        const contract = new web3.eth.Contract(contractABI, contractAddress);

        console.log('Attempting to mint NFT...');
        const tx = await contract.methods.safeMint(to, tokenURI).send({ from: web3.eth.defaultAccount });

        console.log('NFT Minted Successfully:', tx.transactionHash);
        return tx.transactionHash;
    } catch (error) {
        console.error('Error minting NFT:', error);
        throw error;
    }
}


app.post('/api/mint', async (req, res) => {
    const userAddress = req.body.address;

    try {
        const imagePaths = [
            'images/image_0.jpeg',
            'images/image_1.jpeg',
            'images/image_2.jpeg',
            'images/image_3.jpeg',
            'images/image_4.jpeg'
        ];

        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        const selectedImagePath = imagePaths[randomIndex];
        console.log(`Selected image: ${selectedImagePath}`);

        const result = await uploadToPinata(selectedImagePath);
        console.log('Image uploaded to IPFS with CID:', result.IpfsHash);

        const txHash = await mintNFT(userAddress, result.IpfsHash);

        res.status(200).send({ message: 'NFT Minted Successfully', transactionHash: txHash });
    } catch (error) {
        console.error('Error minting NFT:', error);
        res.status(500).send({ message: 'Error minting NFT', error });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
