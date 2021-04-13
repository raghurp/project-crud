import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DynamicTable(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [keys, setKeys] = useState([]);
  const [loop, setLoop] = useState([]);

  useEffect(() => {
    axios.get(props.url)
      .then(res => {
        setRows(res.data);
        setKeys(res.data[0])
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
   }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
      {
        Object.keys(keys).map((key, index)=>{
            loop.push(key)
            return <th key={key}>{key.toUpperCase()}</th>
            })
      }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
              
            <TableRow >

                {
                    Object.keys(keys).map((value, index)=>{
                        return <TableCell >{row[value]}</TableCell>
                        })
                } 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}