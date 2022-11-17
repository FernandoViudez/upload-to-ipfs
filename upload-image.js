import fs from 'fs';
export const uploadImage = async (_ipfs_, filePath) => {
    const result = await _ipfs_.add(fs.readFileSync(filePath));
    return result.path;
}
