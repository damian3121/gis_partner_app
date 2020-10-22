import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  Button,
  makeStyles,
  TableFooter,
  TablePagination
} from '@material-ui/core';
import { Setter } from '../utils/TypeUtils';
import { radioValueBinding, radioChangeBinding } from '../utils/bindings';
import { TableHeader } from '../component/table/TableHeader';
import AddIcon from '@material-ui/icons/Add';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { UserDetails } from '../service/userService';

interface Props {
  setSelectedUser: Setter<Props['selectedUser']>;
  selectedUser: UserDetails | null;
  onDelete(user: UserDetails): void;
  users: Array<UserDetails>;
}

const useStyle = makeStyles(() => ({
  buttonCenter: {
    textAlign: 'center',
  }
}));

export function SelectUser({
  users: users,
  setSelectedUser: setSelectedUser,
  selectedUser: selectedUser
}: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Paper>
      <TableHeader
        actions={
          <Button
            color='primary'
            variant='contained'
            onClick={() => setSelectedUser({
              id: 0,
              email: '',
              name: '',
              surname: ''
            })}
          >
            <AddIcon />
          nowy
        </Button>
        }
      >
        Użytkownicy
      </TableHeader>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding='checkbox'></TableCell>
            <TableCell>Imię</TableCell>
            <TableCell>Nazwisko</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          ).map(user =>
            <TableRow key={user.id}>
              <TableCell>
                <Radio
                  checked={
                    radioValueBinding(user, selectedUser)
                  }
                  onChange={radioChangeBinding(user, setSelectedUser)}
                />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.surname}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            colSpan={3}
            count={users.length}
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
    </Paper>
  )
}
