
import { createSlice } from '@reduxjs/toolkit'

const ROWS = new Array(100).fill(1);
const COLS = new Array(26).fill('a').map((char,index) => String.fromCharCode(char.charCodeAt(0) + index))

function initData() {
    const configData = {}
    ROWS.forEach((_row,index) => {
        COLS.forEach((col, j) => {
            configData[`${col}${index}`] = {
                value: '',
                formula: null,
                propagation: {}
            }
        })
    })
    return configData
}
const firstData = initData()

export const initialState = {
    data: firstData,
    editing: -1,
    rows: ROWS,
    columns: COLS
}
export default createSlice({
    name: 'cells',
    initialState: initialState,
    reducers: {
        editCell: (state, action) => {
            const value = action.payload.value
            console.log('value', value)
            if(typeof value === 'string' && value.match(/Sum of [a-z]\d:[a-z]\d/g)){
                // sum formula
                let formula = value
                let from = value.substr(7,2)
                let to = value.substr(10,2)
                
                try {
                    /// stop propagattion
                    if(state.data[action.payload.cell].formula){
                        let prevFrom = value.substr(7,2)
                        let prevTo = value.substr(10,2)
                        for(let i=0; i <= Number(prevTo[1]) - Number(prevFrom[1]) ; i++)
                            state.data[`${from[0]}${i}`].propagation[action.payload.cell] = false
                    }

                    // summatory
                    let sum = 0
                    for(let i=0; i <= Number(to[1]) - Number(from[1]) ; i++){
                        sum+=Number(state.data[`${from[0]}${i}`].value)

                        // set proppagation
                        state.data[`${from[0]}${i}`].propagation[action.payload.cell] = formula
                    }
                    console.log('set sum', sum)
                    // update sum
                    state.data[action.payload.cell].value =  sum
                } catch (error) {
                    state.data[action.payload.cell].value =  'Invalid'
                }

                // if formula, update formula
                state.data[action.payload.cell].formula =  formula
            }else {
                state.data[action.payload.cell].value = action.payload.value
                state.data[action.payload.cell].formula = null
            }
        }
    }
})