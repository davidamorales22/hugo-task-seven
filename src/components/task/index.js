import {
  Box,
  colors,
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { Cell } from './components/Cell'
const Task = () => {
  const columns = useSelector(state => state.cells.columns)
  const rows = useSelector(state => state.cells.rows)
  return (
    <Container>
      <Box minHeight={600}>
        <Typography variant='h5' color='primary' align='center'>
          Cells
        </Typography>
        <Divider />
        <Divider />
        <Box overflow='auto' maxHeight='calc(100vh - 160px)'>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((col, i) =>
                  <TableCell key={`head-${i}`} style={{ border: '1px solid #ccc', background: colors.grey[200] }}>
                    <Typography align='center'>
                      {col}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
              {rows.map((row, i) =>
                <TableRow key={`row-${i}`}>
                  <TableCell>
                    {i}
                  </TableCell>
                  {columns.map(col =>
                    <Cell key={`row-${i}-col-${col}`} cell={`${col}${i}`} />
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Container>
  )
}

export default Task
