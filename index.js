import path from 'path';
import fs from 'fs';
import * as IPFS from 'ipfs-core';
import { uploadImage } from './upload-image.js'
import { uploadJson } from './upload-json.js'
import relation from './assets/metadata/NFTs-image-relation.json' assert { type: "json" };
import NFTs from './assets/metadata/NFTs.json' assert { type: "json" };

const _ipfs_ = await IPFS.create();

const uploadImageRelation = async ({ imageSrc, nftName }) => {
    const imageIpfsUri = await uploadImage(
        _ipfs_,
        path.resolve(`./assets/images/${imageSrc}`)
    );

    const itemFound = NFTs.find(item => item.name == nftName);
    itemFound.image = "ipfs://" + imageIpfsUri;
    itemFound.image_mimetype = `image/${imageSrc.split(".")[1]}`;

    return await uploadJson(_ipfs_, itemFound);
}

(async () => {
    const result = {};

    const placeholderIpfs = await uploadImageRelation(relation.placeholder)
    console.log("PLACEHOLDER IPFS ~> ", placeholderIpfs);

    result.placeholder = {
        ipfs_uri: placeholderIpfs,
    };
    result.others = [];

    for (let imageRelation of relation.others) {
        const jsonIpfs = await uploadImageRelation(imageRelation)
        result.others.push({
            ipfs_uri: jsonIpfs
        });
    }
    fs.writeFileSync(path.resolve("./assets/metadata/result.json"), JSON.stringify(result));
    console.log("### DONE ###");
})()
