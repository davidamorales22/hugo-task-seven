import { TableCell, TextField } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import cellSlice from 'src/redux/slices/cells'
import { useDispatch } from 'react-redux'

export const Cell = ({cell}) => {
    const dispatch = useDispatch()
    const cellData = useSelector(state => state.cells.data[cell])
    const [value,setValue] = React.useState('')
    const [editing,setEditing] = React.useState(false)
    const handleDblClick = () => {
        setEditing(true)
        if(cellData.formula)setValue(cellData.formula)
        else setValue(cellData.value)
    }
    const cancelEdit = () => {
        setEditing(false)
    }
    const handleChange = ev => {
        setValue(ev.target.value)
    }
    const handleKeyUp = ev => {
        if(ev.keyCode === 13){
            setEditing(false)
            dispatch(cellSlice.actions.editCell({cell,value}))
            const propagation = Object.keys(cellData.propagation)
            if( propagation.length > 0){
                propagation.forEach(key => {
                    if(cellData.propagation[key])
                        dispatch(cellSlice.actions.editCell({cell: key,value: cellData.propagation[key]}))
                    
                })
            }
        }
    }
    React.useMemo(() => {
        setValue(cellData.value)
    }, [cellData])
    return (
        <TableCell onDoubleClick={handleDblClick} style={{minWidth: 140, border: '1px solid #ccc'}}>
            {
                !editing && cellData.value
            }
            {
                editing && (
                    <TextField autoFocus fullWidth value={value} onChange={handleChange} onKeyUp={handleKeyUp} onBlur={cancelEdit}/>
                )
            }
        </TableCell>
    )
}
