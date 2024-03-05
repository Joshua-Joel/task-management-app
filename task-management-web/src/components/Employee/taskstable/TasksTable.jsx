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
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { saveAs } from 'file-saver'; 
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


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
    id: "Assigner",
    numeric: false,
    disablePadding: false,
    label: "Assigner",
  },
  {
    id: "Assigner id",
    numeric: false,
    disablePadding: false,
    label: "Assigner id",
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

function EnhancedTableHead(props) {
  
  


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

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
        My tasks
      </Typography>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const MyBarChart = ({ data }) => {
  const transformedData = data.map((item) => ({
    name: item.task_name,
    effort: item.effort,
  }));

  return (
    <BarChart width={600} height={300} data={transformedData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis />
      <YAxis />
      <Tooltip content={<CustomTooltip data={transformedData} />} />
      <Legend />
      <Bar dataKey="effort" fill="#8884d8" />
    </BarChart>
  );
};

const CustomTooltip = ({ active, payload, label, data }) => {
  if (active && payload && payload.length) {
    const taskName = payload[0]?.payload.name || "";
    const effort = payload[0]?.payload.effort || "";
    return (
      <div className="custom-tooltip">
        <p className="label">{`Task: ${taskName}`}</p>
        <p className="label">{`Effort: ${effort}`}</p>
      </div>
    );
  }

  return null;
};


const MyPieChart = ({ data }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  return (
    <PieChart width={400} height={300}>
      <Pie
        data={data}
        cx={200}
        cy={150}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        label={(entry) => entry.name}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};
const MyScatterChart = ({ data }) => {
  return (
    <ScatterChart
      width={600}
      height={300}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        type="category"
        dataKey="formatted_deadline"
        name="Deadline"
        tick={{ fontSize: 12 }}
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter name="Tasks" data={data} fill="#8884d8">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} />
        ))}
      </Scatter>
    </ScatterChart>
  );
};
export default function EnhancedTable() {
  const [data, setData] = useState([]);
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  // const transformedData = data.map((item) => ({
  //   name: item.task_name,
  //   formatted_deadline: formatDate(item.dead_line),
  //   deadline: item.dead_line,
  // }));
  const transformedData = data.map((item) => ({
    name: item.task_name,
    formatted_deadline: formatDate(item.dead_line),
    deadline: item.dead_line,
  })).sort((a, b) => a.deadline - b.deadline);

  function sortByStatus(a,b)  {
        if(a.status === 'P' ||  a.status === 'W')
        return -1;
        // if(a.status == 'W')
        // return 0;
        if(a.status === 'C' )
        return 1;
      // return 0;
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
  },[]);
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

  const handleComplete = async (task_id, index) => {
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/task/request-approval?task_id=${task_id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedData = [...data];
        updatedData[index].status = "W"; 
        
        setData(updatedData);
        console.log(data);
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
    console.log("Current Page:", rowsPerPage);
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const visibleRows = React.useMemo(
      () =>
        [...data].slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        ),
      [page, rowsPerPage,data],
    );
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
        row.assigner_name,
        row.assigner_id,
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
    saveAs(blob, 'my_tasks.csv');
  };

    

    
    

  return (

    
    
    <Box sx={{ width: "100%" }}>
     
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <Button sx={{left:"90%"}} onClick={exportToCSV}>Export to CSV</Button>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
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
                    <TableCell align="left">{row.assigner_name}</TableCell>
                    <TableCell align="left">{row.assigner_id}</TableCell>
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
                      {

                       
                        row.status === 'P'?
                        <Button
                        variant="contained"
                        onClick={() => handleComplete(row._id, index)}
                      >
                        Complete
                      </Button>
                      :
                      row.status === 'C'?
                      <Button
                          variant="contained"
                          disabled={true}
                        >
                          Completed
                        </Button>
                        :
                        <Button
                          variant="contained"
                          disabled={true}
                        >
                          Pending
                        </Button>
                  
                      
                      }
                        
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
        <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" , gap: "20%"}}>
        <Box sx={{ width: "33%", marginRight: "2%" }}>
          <MyBarChart data={data} />
        </Box>
        <Box sx={{ width: "40", marginRight: "2%" }}>
          <MyPieChart
            data={[
              { name: "Complete", value: data.filter((item) => item.status === "C").length },
              { name: "Pending", value: data.filter((item) => item.status === "P").length },
              { name: "Approve", value: data.filter((item) => item.status === "A").length },
            ]}
          />
        </Box>
        {/* <MyScatterChart data={data.map((item) => ({ name: item.task_name, deadline: item.dead_line }))} /> */}
        <Box sx={{ width: "33%" }}>
          <MyScatterChart data={transformedData} />
        </Box>
        </Box>
      </Paper>
    </Box>
  );
}



