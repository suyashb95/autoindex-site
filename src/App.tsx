import React, {useCallback} from 'react';
import './App.css';
import {useDropzone } from 'react-dropzone';
import { Grid, Row, Col } from 'react-flexbox-grid';


function App() {

  const prettyBytes = (num: number, precision = 3, addSpace = true) => {
    const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    if (Math.abs(num) < 1) return num + (addSpace ? ' ' : '') + UNITS[0];
    const exponent = Math.min(Math.floor(Math.log10(num < 0 ? -num : num) / 3), UNITS.length - 1);
    const n = Number(((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision));
    return (num < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + UNITS[exponent];
  };

  const handleUpload = () => {
    if (acceptedFiles.length) {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={(file as any).path}>
      {(file as any).path.substring(0, 60) + '... '} - {prettyBytes(file.size)}
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
          <button className="button-black" type="button">
              Upload
          </button>          
        </Col>
        <Col xs={4}></Col>  
      </Row>        
    </Grid>
  );
}

export default App;
