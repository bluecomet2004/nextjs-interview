import { useState } from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Grow,
  Box,
  IconButton,
  InputAdornment,
  TextField
} from "@mui/material";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { User } from "../utils/types";
import { formatDate } from "../utils/functions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.secondary.main,
  },
  "&:hover": {
    cursor: 'pointer',
    backgroundColor: theme.palette.action.hover
  }
}));

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function ProfileTable(props: any) {
  const { profiles } = props;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - profiles.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className='w-full container text-right'>
        <TextField
          label="Search"
          variant="outlined"
          className='m-4 text-right'
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          value={search}
          onChange={({target:{value}}) => setSearch(value)}
        />
      </div>
      
      <Grow in={true}>
        <TableContainer component={Paper} className="relative mb-12 container">

          <Table className="shadow-md rounded-md">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>Nation</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>DOB</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                (rowsPerPage > 0
                  ? profiles
                      .filter((profile: User) => JSON.stringify(profile).includes(search))
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : profiles
                  .filter((profile: User) => JSON.stringify(profile).includes(search))
                ).map((profile: User, index: number) => (
                <StyledTableRow key={profile.login.uuid}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>
                    {profile.name.first} {profile.name.last}
                  </StyledTableCell>
                  <StyledTableCell>{profile.gender}</StyledTableCell>
                  <StyledTableCell>{profile.nat}</StyledTableCell>
                  <StyledTableCell>{profile.email}</StyledTableCell>
                  <StyledTableCell>{formatDate(profile.dob.date)}</StyledTableCell>
                </StyledTableRow>
              ))}
              
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </StyledTableRow>
              )}
            </TableBody>

            <TableFooter>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                count={profiles.filter((profile: User) => JSON.stringify(profile).includes(search)).length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </Grow>
    </>
  );
}
