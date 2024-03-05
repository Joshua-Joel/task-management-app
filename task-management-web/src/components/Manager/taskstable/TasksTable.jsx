import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EditWizard from "../EditWizard/EditWizard";
import { saveAs } from 'file-saver';
import { ButtonGroup } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
const headCells = [
  {
    id: "Task",
    numeric: false,
    disablePadding: false,
    label: "Task",
  },
  {
    id: "Description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  {
    id: "Employee",
    numeric: false,
    disablePadding: false,
    label: "Employee",
  },
  {
    id: "Employee id",
    numeric: false,
    disablePadding: false,
    label: "Employee id",
  },
  {
    id: "Created on",
    numeric: false,
    disablePadding: false,
    label: "Created on",
  },
  {
    id: "Dead line",
    numeric: false,
    disablePadding: false,
    label: "Dead line",
  },
  {
    id: "Effort",
    numeric: true,
    disablePadding: false,
    label: "Effort",
  },
  {
    id: "Status",
    numeric: false,
    disablePadding: false,
    label: "status",
  },
  {
    id: "Action",
    numeric: false,
    disablePadding: false,
    label: "   Action",
  },
];

function TasksTable(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
}

TasksTable.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const statusList = ["Completed", "Pending"];
  const [isStatus,setIsStatus]=useState('')
  const { numSelected } = props;
  const [type, setType] = useState("");
  const [state,setStatus]=useState("");
  const [fromDate,setFromDate]=useState(new Date());
  const [toDate,setToDate]=useState(new Date());

  const handleChangeType = (e) => {
    setType(e.target.value);
    setIsStatus(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    console.log(state);
    
  };

  const handleDateFilter=()=>{
    props.sendFilter({
      type,
      from: fromDate,
      to:toDate
    });
  }

  const handleStatusFilter=()=>{
    props.sendFilter({
      type,
      value: state
    });
  }

  const handleClearFilter=()=>{
    props.reset();
    setIsStatus('');
    setType('');
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        <div style={{display: "flex", flexDirection: "row" }}>
          <div style={{marginTop:'10px', marginRight: '15px'}}>
            All tasks
          </div>
          
          <FormControl
          sx={{ m: 1, width: "15ch", height: '20px'}}
          size="small"
          fullWidth
        >
          <InputLabel id="role">Filter</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="role"
            label="Filter"
            value={type}
            
            onChange={handleChangeType}
          >
            <MenuItem value="Deadline">Deadline</MenuItem>
            <MenuItem value="Status">Status</MenuItem>
          </Select>
        </FormControl>
        {isStatus==''?<></>:
         isStatus=="Status"?(
          <>
          <FormControl
          sx={{ m: 1, width: "15ch", height: '10px'}}
          size="small"
          fullWidth
        >
          <InputLabel id="role1">Filter Data</InputLabel>
          <Select
            sx={{ width: "100%" }}
            labelId="role1"
            label="Filter Data"
            value={state}
            onChange={handleChangeStatus}
          >
            <MenuItem value="P">Pending</MenuItem>
            <MenuItem value="C">Completed</MenuItem>
            <MenuItem value="O">Overdue</MenuItem>
            <MenuItem value="W">Waiting For Approval</MenuItem>
          </Select>
                
        </FormControl>
        <Button variant="contained" sx={{marginTop:"10px", marginLeft:"15px"}} onClick={handleStatusFilter}>Apply</Button>
        
        <Button variant="contained" sx={{marginTop:"10px", marginLeft:"15px"}} onClick={handleClearFilter}>Clear Filter</Button>
        </>
        ):(
          <>
          <TextField
                sx={{m: 1, width: "15ch",height:"5px" }}
                label="From date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="from"
                value={fromDate}
                onChange={(e)=>{setFromDate(e.target.value)}}
              />
        <TextField
                sx={{m: 1, width: "15ch",height:"5px" }}
                style={{ margin: " 10px 0 10px 0" }}
                label="To date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                 name="to"
                value={toDate}
                onChange={(e)=>{setToDate(e.target.value)}}
              />
        <Button variant="contained" sx={{marginTop:"15px", marginLeft:"15px"}} onClick={handleDateFilter}>Apply</Button>      
        
        <Button variant="contained" sx={{marginTop:"10px", marginLeft:"15px"}} onClick={handleClearFilter}>Clear Filter</Button>
        </>
        )}
        </div>
        
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function AllTasksTable() {
  const [data, setData] = useState([]);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);

    // Extracting day, month, and year
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Creating the formatted date string
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  function sortByStatus(a,b)  {
    if(a.status === 'P' ||  a.status === 'W')
    return -1;
    // if(a.status == 'W')
    // return 0;
    if(a.status === 'C' )
    return 1;
  // return 0;
}


    const [Filttype, setType] = useState("");
  const [state,setStatus]=useState("");
  const [fromDate,setFromDate]=useState(new Date());
  const [toDate,setToDate]=useState(new Date());

  const handleFilter=(data)=>{
    setType(data.type);
    console.log(data);
    if(Filttype=='Status'){
      setStatus(data.value);
    }else{
      setFromDate(data.from)
      setToDate(data.to)
    }
  }

  const handleReset=()=>{
      setType('')
      console.log("Reset");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/task/tasks", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const result = await response.json();
        result.sort(sortByStatus);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [Filttype]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDelete = async (task_id, index) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/delete-task?task_id=${task_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        const newData = [...data];
        newData.splice(index, 1);

        // Updating the state with the new array
        setData(newData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  


  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  
    const exportToCSV = () => {
    const csvData = [];

    // Adding CSV header
    const header = headCells.slice(0, -1).map((headCell) => headCell.label);
    console.log(header);
    csvData.push(header);

    // Adding rows
    data.forEach((row) => {
      const rowData = [
        row.task_name,
        row.task_desc,
        row.assignee_name,
        row.assignee_id,
        formatDate(row.created_at),
        formatDate(row.dead_line),
        row.effort,
        row.status,
      ];

      csvData.push(rowData);
    });
    // Convert to CSV string
    const csvString = csvData.map((row) => row.join(",")).join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'tasks.csv');
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} reset={handleReset} sendFilter={handleFilter}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TasksTable
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data.filter((item)=>{
                if(Filttype==''){
                  return item;
                }
                if(Filttype=='Status'){
                  return item.status==state;
                }else if(Filttype=='Deadline'){
                  const userDeadline = new Date(item.dead_line);
                  return userDeadline >= new Date(fromDate) && userDeadline<= new Date(toDate);
                }else{
                  return item;
                }
              }).map((row, index) => {
                const isItemSelected = isSelected(index);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    // onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.task_name}</TableCell>
                    <TableCell align="left">{row.task_desc}</TableCell>
                    <TableCell align="left">{row.assignee_name}</TableCell>
                    <TableCell align="left">{row.assignee_id}</TableCell>
                    <TableCell align="left">
                      {formatDate(row.created_at)}
                    </TableCell>
                    <TableCell align="left">
                      {formatDate(row.dead_line)}
                    </TableCell>
                    <TableCell align="right">{row.effort}</TableCell>
                    <TableCell align="left">
                      {row.status === "C" ? (
                        <CheckCircleOutlineIcon style={{ color: "green" }} />
                      ) : row.status === "P" ? (
                        <AutorenewIcon style={{ color: "yellow" }} />
                      ) : (
                        <ReportProblemIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <EditWizard values={row} />
                        <Button onClick={() => handleDelete(row._id, index)}>
                          <DeleteIcon
                            style={{ color: "red", padding: "4px" }}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Button onClick={exportToCSV}>Export to CSV</Button>
      </Paper>
    </Box>
  );
}
