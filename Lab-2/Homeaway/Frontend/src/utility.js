//Convert a String to First char capital and rest lower

export const capitalizeFirstLetter = (str) => {
    if(str === null){
        return str;
    }
    return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

export const indianDateFormat = (str) => {
    if(str === null){
        return str;
    }
    var str1 = new Date(str);
    var dd = str1.getDate()+1;
    var mm = str1.getMonth()+1;
    var yyyy = str1.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    }
    str1 = dd+'/'+mm+'/'+yyyy;
    return str1;
}

export const usaDateFormat = (str) => {
    if(str === null){
        return str;
    }
    var str1 = new Date(str);
    var dd = str1.getDate()+1;
    var mm = str1.getMonth()+1;
    var yyyy = str1.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 

    if(mm<10) 
    {
        mm='0'+mm;
    }
    str1 = mm+'/'+dd+'/'+yyyy;
    return str1;
}

export const userProfileDateFormat = (str) => {
    if(str === null){
        return str;
    }
    var str1 = new Date(str);
    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    
    var day = str1.getDate();
    var monthIndex = str1.getMonth();
    var year = str1.getFullYear();
    if(day<10) 
    {
        day='0'+day;
    } 
    str1 = monthNames[monthIndex] + ' ' + day + ',' + ' ' + year;
    // day + ' ' + monthNames[monthIndex] + ' ' + year;
    return str1;
    
}