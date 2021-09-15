import React from 'react'

const inputBox = ({
    value,
    name,
    onChangeInput
})=>{
    return (
<input  value={value} name={name} onChange={onChangeInput} />
    )
}

export default inputBox;
