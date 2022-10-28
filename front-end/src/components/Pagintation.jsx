import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { styled } from "@mui/system";

export default function TablePaginationDemo({
  setPage,
  setPagination,
  pagination,
  page,
  total,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setPagination({
      ...pagination,
      skip: rowsPerPage * page,
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setPagination({ ...pagination, take: rowsPerPage });
  };

  return (
    <StyledPagination
      component="div"
      count={total}
      width={"100%"}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}

const StyledPagination = styled(TablePagination)`
  overflow: hidden;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;
