//Convert a String to First char capital and rest lower

export const capitalizeFirstLetter = (str) => {
    if(str === null){
        return str;
    }
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

