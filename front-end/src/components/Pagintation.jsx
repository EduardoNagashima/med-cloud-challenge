import * as React from "react";
import TablePagination from "@mui/material/TablePagination";

export default function TablePaginationDemo(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.setPagination({ ...pagination, skip: rowsPerPage * page });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPagination({ ...props.pagination, take: rowsPerPage });
  };

  return (
    <TablePagination
      component="div"
      count={props.total}
      width={"100%"}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
