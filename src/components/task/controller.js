import React from 'react'


const ROWS = new Array(100).fill(1);
const COLS = new Array(26).fill('a').map((char,index) => String.fromCharCode(char.charCodeAt(0) + index))

export default function useController() {
    const [data,setData] = React.useState({})
    React.useEffect(() => {
        console.log('RENDER')
    })
    React.useEffect(() => {
        const configData = {}
        ROWS.forEach((_row,index) => {
            COLS.forEach((col, j) => {
                configData[`${col}${index}`] = ''
            })
        })
        setData(configData)
    },[])
    return {
        COLS,
        ROWS,
        data
    }
}