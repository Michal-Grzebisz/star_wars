import React, { useState, useEffect} from 'react'
import { useDemoData } from '@material-ui/x-grid-data-generator'
import { DataGrid } from "@material-ui/data-grid";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";


const columns = [
    {field: 'id', headerName: 'ID'},
    {field: 'name', headerName: 'Name'},
    {field: 'height', headerName: 'Height'},
    {field: 'mass', headerName: 'Mass'},
    {field: 'hair_color', headerName: 'Hair Color'},
  ]

  function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  function QuickSearchToolbar(props) {
  
    return (
      <div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          InputProps={{
            startAdornment: <SearchIcon fontSize="small" />,
            endAdornment: (
              <IconButton
                title="Clear"
                aria-label="Clear"
                size="small"
                style={{ visibility: props.value ? "visible" : "hidden" }}
                onClick={props.clearSearch}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            )
          }}
        />
      </div>
    );
  }

const Character = ({people}) => {

    people.forEach((item, i) => {
        item.id = i + 1;
      });

      const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 100,
        maxColumns: 6,
      });

      const [searchText, setSearchText] = useState('');
      const [rows, setRows] = useState(data.rows);

      const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
        const filteredRows = data.rows.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
      };
      
    useEffect(() => {
        setRows(data.rows);
      }, [data.rows]);  

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid 
                rows={people}
                columns={columns}
                pageSize={20}
                components={{ Toolbar: QuickSearchToolbar }}
                checkboxSelection
                componentsProps={{
                    toolbar: {
                      value: searchText,
                      onChange: (event) => requestSearch(event.target.value),
                      clearSearch: () => requestSearch(''),
                    },
                  }}
                rowsPerPageOptions={[5, 10, 20]}
                
            />
        </div>
    )
}

export default Character