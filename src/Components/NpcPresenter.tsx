import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { NPC } from "../Types/TNpc";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  width: '16.66%', // 100% divisé par 6 colonnes
  padding: '12px 16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(
//   gender: string,
//   firstName: string,
//   lastName: string,
//   height: number,
//   weight: number,
//   age: number,
// ) {
//   return { gender, firstName, lastName, height, weight, age };
// }

const NpcPresenter = (props: { npcs: NPC[] }) => {

  return (<TableContainer
    component={Paper}
    className="gen-table"
    sx={{
      width: '800px',
      maxWidth: '100%',
      margin: 'auto',
      overflowX: 'auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#ffffff',
    }}>
    <Table
      sx={{
        minWidth: '100%',
        tableLayout: 'fixed',
      }}
      aria-label="Generations table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Gender</StyledTableCell>
          <StyledTableCell align="left">First Name</StyledTableCell>
          <StyledTableCell align="left">Last Name</StyledTableCell>
          <StyledTableCell align="left">Height&nbsp;(m)</StyledTableCell>
          <StyledTableCell align="left">Weight&nbsp;(Kg)</StyledTableCell>
          <StyledTableCell align="left">Age</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.npcs.map(npc =>
          <StyledTableRow key={npc.age}>
            <StyledTableCell align="left">{npc.gender}</StyledTableCell>
            <StyledTableCell align="left">{npc.firstName}</StyledTableCell>
            <StyledTableCell align="left">{npc.lastName}</StyledTableCell>
            <StyledTableCell align="left">{npc.height}</StyledTableCell>
            <StyledTableCell align="left">{npc.weight}</StyledTableCell>
            <StyledTableCell align="left">{npc.age}</StyledTableCell>
          </StyledTableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default NpcPresenter;
