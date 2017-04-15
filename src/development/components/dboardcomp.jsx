import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';

import injectTapEventPlugin from 'react-tap-event-plugin';

class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        injectTapEventPlugin();
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <FlatButton onClick={this.props.onOpenButtonClick} label="OPEN" icon={<FileFolderOpen />} />
                </MuiThemeProvider>
            </div>
        );
    }
}

export default DashboardComponent;

