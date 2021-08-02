import React, { useState } from 'react'
import { DataGrid, GridToolbar} from "@material-ui/data-grid";
import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";
import { createTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";

function escapeRegExp(value) {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }


  const defaultTheme = createTheme();
  const useStyles = makeStyles(
    (theme) => ({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: "space-between",
        display: "flex",
        alignItems: "flex-start",
        flexWrap: "wrap"
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%"
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5)
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`
        }
      }
    }),
    { defaultTheme }
  );

  

  const QuickSearchToolbar = (props) => {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <div>
          <GridToolbar />
        </div>
        <TextField
          variant="standard"
          value={props.value}
          onChange={props.onChange}
          placeholder="Search…"
          className={classes.textField}
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

QuickSearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }; 

const Character = ({people, columns }) => {

    people.forEach((item, i) => {
        item.id = i + 1;
      });

      const [searchText, setSearchText] = useState("");
      const [rows, setRows] = useState(people);
     
    
      const requestSearch = (searchValue) => {
        setSearchText(searchValue);
        const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
        const filteredRows = people.filter((row) => {
          return Object.keys(row).some((field) => {
            return searchRegex.test(row[field].toString());
          });
        });
        setRows(filteredRows);
      };

    return (
        <div style={{height: 700, width: '100%'}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={20}
                checkboxSelection
                rowsPerPageOptions={[5, 10, 20]}
                components={{
                    Toolbar: QuickSearchToolbar
                  }}
                componentsProps={{
                    toolbar: {
                      value: searchText,
                      onChange: (event) => requestSearch(event.target.value),
                      clearSearch: () => requestSearch("")
                    }
                  }}
                  
                filterModel={{
                    items: [{ columnField: 'name', operatorValue: 'contains', value: '' }],
                  }}
                
            />
        </div>
    )
}

export default Character