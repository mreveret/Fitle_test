import { useEffect, useState } from "react"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import './Tab.css'
// Pagination action

function TablePaginationActions(props) {
    const { count, page, rowsPerPage, onChangePage } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onChangePage(event, 0);
    }
  
    const handleBackButtonClick = (event) => {
      onChangePage(event, page - 1);
    }
  
    const handleNextButtonClick = (event) => {
      onChangePage(event, page + 1);
    }
  
    const handleLastPageButtonClick = (event) => {
      onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }
  
    return (
      <div className='pagination'>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
        <FirstPageIcon />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPageIcon />
        </IconButton>
      </div>
    )
  }
  //Table

const Tab = (props) => {
  const [tableValue, setTableValue] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0);
  };

  useEffect(() => {
      if(props.sqlData !== undefined){
        const data = props.sqlData
        setTableValue(data.data)
      }
  },[props.sqlData]);
  return (
    <div className = 'Datatable'>
        <h1 className='Title'>FITLE</h1>
        <Table className='table' aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className ='head'>{capitalizeFirstLetter(props.selectedValue.label)}</TableCell>
              <TableCell className ='head'>Iteration</TableCell>
              <TableCell className ='head'>Average age</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                    ? tableValue.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : tableValue)
              .map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell className='body'>
                      {item.Value}
                    </TableCell>
                    <TableCell className='body'>
                      {item.Iteration}
                    </TableCell>
                    <TableCell className='body'>
                      {item.Average_age}
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
          <TableFooter>
          <TableRow>
            <TablePagination
            className="footer"
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={tableValue.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        </Table>
    </div>
  )
}

export default Tab
