## Upload to IPFS

#### architecture overview

###### metadata folder
- NFTs.json
NFTs metadata that will be uploaded to IPFS.
"image" & "image_mimetype" are set automatically during runtime.

- NFTs-image-relation.json
MUST save relations between NFTs.json and the images corresponding the NFT.
Placeholder is an exception.

imageSrc:
  - MUST be a file name
  - MUST have the extension of the file
  - MUST be inside /assets/images/
nftName: 
  - MUST be the same than the name of the NFTs.json

- result.json
Has all the IPFS cid's

#### How to run

IMPORTANT: before running commands, check all JSON's and relations between them

1. ```npm i```
2. ```npm run upload```



