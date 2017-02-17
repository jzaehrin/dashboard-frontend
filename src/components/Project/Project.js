import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

export default function App() {
  return (
    <MuiThemeProvider>
      <div>
        <TextField
          hintText="Hint Text"
        />
      </div>
    </MuiThemeProvider>
  );
}
