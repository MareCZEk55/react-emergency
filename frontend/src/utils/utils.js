
const getCapitalizeFirstLetter = (text) => {
    const str = text.charAt(0).toUpperCase() + text.slice(1);
    return str;
}

export {
    getCapitalizeFirstLetter
};