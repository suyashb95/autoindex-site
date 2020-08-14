import React, {useCallback} from 'react';
import './App.css';
import {useDropzone } from 'react-dropzone';
import { Grid, Row, Col } from 'react-flexbox-grid';

function App() {

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={(file as any).path}>
      {(file as any).path} - {file.size} bytes
    </li>
  ));

  return (
    <Grid fluid>
      <Row>
        <Col xs={4}></Col>
        <Col xs={4}>
          <h2>autoindex</h2>
          <p>
            automatically add a navigable index to your PDFs
          </p>
          <div className="Dropzone">
              <section className="container">
                <div {...getRootProps({className: 'Dragzone'})}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
                <aside>
                  <h4>Files</h4>
                  <ul>{files}</ul>
                </aside>
              </section>
          </div>
        </Col>
        <Col xs={4}></Col>         
      </Row>        
    </Grid>
  );
}

export default App;
