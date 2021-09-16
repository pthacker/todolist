

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
// newNote = {
//     noteId:'noteID-'+Math.random(),
//     todos:[
//         {
//             todoId:'todoID-'+Math.random(),
//             todoItem:notesText
//         }
//     ]

// }


// ]


export const setDataInStore = (key,value)=>{
        localStorage.setItem(key,JSON.stringify(value))
}

export const getDataFromStore = (key)=>{
    const data = localStorage.getItem(key);
    return JSON.parse(data)
}