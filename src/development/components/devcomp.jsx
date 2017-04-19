import React from 'react';
import ReactDOM from 'react-dom';

import EditorComponent from './edicomp';
import TreeComponent from './treecomp';
import DashboardComponent from './dboardcomp';

import EditorEvents from '../events/editorEvents'
import DashboardEvents from '../events/dashboardEvents'

import { saveFile, openFile } from '../helpers/fsyshelper';

class DevelopmentComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorValue: "",
            isFileOpened: false,
            openedFilePath: "",
            treeData: null,
            isProjectOpened: false
        };

        this.onTreeComponentToggle = this.onTreeComponentToggle.bind(this);

        this.editorEvents = new EditorEvents(this);
        this.dashboardEvents = new DashboardEvents(this);
    }

    onTreeComponentToggle(node, toggled) {
        // Toggle node
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({ cursor: node });
        // If node is a folder, return 
        if (node.children) {
            return;
        }
        // If the user has opened file, save this file
        if (this.state.isFileOpened) {
            saveFile(this.state.openedFilePath, this.state.editorValue);
        }
        // Open file
        openFile(node.path, (filePath, fileContent) => {
            this.setState({
                openedFilePath: filePath,
                editorValue: fileContent,
                isFileOpened: true
            });
        });
    }

    render() {
        let treeComponent = null;

        if (this.state.treeData) {
            treeComponent =
                <TreeComponent
                    data={this.state.treeData}
                    onToggle={this.onTreeComponentToggle}
                />;
        } else {
            treeComponent = <div></div>;
        }

        const dashboardComponent =
            <DashboardComponent
                onOpenButtonClick={this.dashboardEvents.onOpenButtonClick}
                isProjectOpened={this.state.isProjectOpened}
            />;

        const editorComponent =
            <EditorComponent
                value={this.state.editorValue}
                isFileOpened={this.state.isFileOpened}
                onChange={this.editorEvents.onChange}
                onLoad={this.editorEvents.onLoad}
            />;

        return (
            <section id="layout">
                <aside id="left-side">
                    <section id="dashboard">{dashboardComponent}</section>
                    <section id="tree">{treeComponent}</section>
                </aside>
                <section id="right-side">
                    <section id="editor">{editorComponent}</section>
                    <section id="airline"></section>
                </section>
            </section>
        );
    }
}

const content = document.getElementById('devcomp');
ReactDOM.render(<DevelopmentComponent />, content);
