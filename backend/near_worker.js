const nearAPI = require("near-api-js");
const { providers } = require("near-api-js");
const FormData = require('form-data');
const axios = require('axios');
const mergeImages = require("merge-img");
const provider = new providers.JsonRpcProvider("https://rpc.testnet.near.org");

const express = require("express")
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require("dotenv").config()
const port = 3000

app.get("/mint", (req, res) => {
    const { privatekey, ethhash } = req.body;

    const account = KeyPair.fromString(privatekey);
    const config = {
        networkId: "testnet",
        keyStore: account,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


async function getPendingrequests() {
    const { keyStores, WalletConnection, KeyPair, connect } = nearAPI;

    const keyStore = new keyStores.InMemoryKeyStore();

    const aniket_testnet = KeyPair.fromString(process.env.main_testnet)
    const oracle_testnet = KeyPair.fromString(process.env.oracle_testnet)
    const client_testnet = KeyPair.fromString(process.env.client_testnet)
    const near = await connect(config);

    const wallet = new WalletConnection(near);


    var get_request = { "account": "client.aniketdixit.testnet", "max_requests": "10" }

    const rawResult = await provider.query({
        request_type: "call_function",
        account_id: "oracle.aniketdixit.testnet",
        method_name: "get_requests",
        args_base64: "eyJhY2NvdW50IjogImNsaWVudC5hbmlrZXRkaXhpdC50ZXN0bmV0IiwgIm1heF9yZXF1ZXN0cyI6ICIxMCJ9",
        finality: "optimistic",
    });

    // format result
    const res = JSON.parse(Buffer.from(rawResult.result).toString());
    let var_argument = res[0].request.data
    console.log(var_argument);
    let hash_given = makeBlockie(var_argument)
    console.log(hash_given)
}

// getPendingrequests()


const pnglib = require('./pnglib');
const hsl2rgb = require('./hsl2rgb');
const fs = require("fs");
const { runInThisContext } = require("vm");
const { TIMEOUT } = require("dns");

// The random number is a js implementation of the Xorshift PRNG
const randseed = new Array(4); // Xorshift: [x, y, z, w] 32 bit values

function seedrand(seed) {
    for (let i = 0; i < randseed.length; i++) {
        randseed[i] = 0;
    }
    for (let i = 0; i < seed.length; i++) {
        randseed[i % 4] = (randseed[i % 4] << 5) - randseed[i % 4] + seed.charCodeAt(i);
    }
}

function rand() {
    // based on Java's String.hashCode(), expanded to 4 32bit values
    const t = randseed[0] ^ (randseed[0] << 11);

    randseed[0] = randseed[1];
    randseed[1] = randseed[2];
    randseed[2] = randseed[3];
    randseed[3] = randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8);

    return (randseed[3] >>> 0) / (1 << 31 >>> 0);
}

function createColor() {
    //saturation is the whole color spectrum
    const h = Math.floor(rand() * 360);
    //saturation goes from 40 to 100, it avoids greyish colors
    const s = rand() * 60 + 40;
    //lightness can be anything from 0 to 100, but probabilities are a bell curve around 50%
    const l = (rand() + rand() + rand() + rand()) * 25;

    return [h / 360, s / 100, l / 100];
}

function createImageData(size) {
    const width = size; // Only support square icons for now
    const height = size;

    const dataWidth = Math.ceil(width / 2);
    const mirrorWidth = width - dataWidth;

    const data = [];
    for (let y = 0; y < height; y++) {
        let row = [];
        for (let x = 0; x < dataWidth; x++) {
            // this makes foreground and background color to have a 43% (1/2.3) probability
            // spot color has 13% chance
            row[x] = Math.floor(rand() * 2.3);
        }
        const r = row.slice(0, mirrorWidth).reverse();
        row = row.concat(r);

        for (let i = 0; i < row.length; i++) {
            data.push(row[i]);
        }
    }

    return data;
}

// Modifies the passed PNG to fill in a specified rectangle
function fillRect(png, x, y, w, h, color) {
    for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
            png.buffer[png.index(x + i, y + j)] = color;
        }
    }
}

function buildOpts(opts) {
    if (!opts.seed) {
        throw new Error('No seed provided');
    }

    seedrand(opts.seed);

    return Object.assign({
        size: 8,
        scale: 26,
        color: createColor(),
        bgcolor: createColor(),
        spotcolor: createColor(),
    }, opts)
}

function makeBlockie(address) {
    const opts = buildOpts({ seed: address.toLowerCase() });

    const imageData = createImageData(opts.size);
    const width = Math.sqrt(imageData.length);

    const p = new pnglib(opts.size * opts.scale, opts.size * opts.scale, 3);
    const bgcolor = p.color(...hsl2rgb(...opts.bgcolor));
    const color = p.color(...hsl2rgb(...opts.color));
    const spotcolor = p.color(...hsl2rgb(...opts.spotcolor));

    for (let i = 0; i < imageData.length; i++) {
        const row = Math.floor(i / width);
        const col = i % width;
        // if data is 0, leave the background
        if (imageData[i]) {
            // if data is 2, choose spot color, if 1 choose foreground
            const pngColor = imageData[i] == 1 ? color : spotcolor;
            fillRect(p, col * opts.scale, row * opts.scale, opts.scale, opts.scale, pngColor);
        }

    }
    // console.log(p.buffe
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    console.log(imgbase64);

    // var blob = new Blob(imgbase64)
    // var fileobject = fs.readSync(1,imgbase64)
    // console.log(fileobject)
    fs.writeFile("image.png", imgbase64, function (err) {
        console.log(err)
    })

    mergeImages(["./image.png", "./thisone.png"]).then(
        (thisone) => {
            thisone.write("newimage.png", () => console.log("done"))
        }
    )



    // console.log(data)
    // TIMEOUT(5);


    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append("file", fs.createReadStream('./newimage.png'))
    // p.buffer.forEach((item) => data.append("image[]", item))
    // return axios
    axios.post(url, data, {
        maxContentLength: 'Infinity',
        headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            pinata_api_key: '6d9d500a69bc3c95093f',
            pinata_secret_api_key: 'bf2a6bd174993335ee5e82ba8ecc55777895f69cd355b7c97ecaffabdc37e19b'
        }
    })
        .then(function (response) {
            const y = response.data.IpfsHash
            console.log(y);
            return y
        })
        .catch(function (error) {
            console.log(error)
        });
}

// makeBlockie("asdfasdfasdf")