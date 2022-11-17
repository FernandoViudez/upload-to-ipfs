
export const uploadJson = async (_ipfs_, jsObject) => {
    const result = await _ipfs_.add(JSON.stringify(jsObject));
    return result.path;
}

