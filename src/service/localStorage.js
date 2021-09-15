

// notesArr = [
// {
//     noteID:'12wedfc',
//     todos:[
//         {
//             todoId:'1234rm',
//             totoItem:'msnxasnnvnsd'
//         }
//     ]
// },
// {
//     noteID:'12wedfc',
//     todos:[
//         {
//             todoId:'1234rm',
//             totoItem:'msnxasnnvnsd'
//         }
//     ]
// }


// ]


export const setDataInStore = (key,value)=>{
    // const existingData =JSON.parse(localStorage.getItem(key));
    // if(existingData){
    //     // pull exiting data
    //     const oldData = [...existingData];

    //     // create a new copy
    //     // store the data
    // }else{
        localStorage.setItem(key,JSON.stringify(value))
    // }
}

export const getDataFromStore = (key)=>{
    const data = localStorage.getItem(key);
    return JSON.parse(data)
}