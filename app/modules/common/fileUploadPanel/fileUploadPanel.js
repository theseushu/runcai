import React, { Component, PropTypes } from 'react';
import loadImage from 'blueimp-load-image';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Icon from 'react-mdl/lib/Icon';
import DragItem from './dragItem';
import DropItem from './dropItem';
import FileUpload from './fileUploadContainer';

function asyncLoadImage(file) {
  return new Promise((resolve, reject) => {
    const loadingCanvas = loadImage(
      file,
      (canvas) => {
        resolve(canvas);
      },
      { contain: true, maxWidth: 1024, minWidth: 1024, canvas: true, downsamplingRatio: 0.2 }
    );
    loadingCanvas.onerror = (error) => { reject(error); };
  });
}

class FileUploadPanel extends Component {
  static propTypes = {
    files: PropTypes.array.isRequired, // { key: {process, upload, rawFile} }
    onProcessed: PropTypes.func.isRequired,
    onUploaded: PropTypes.func.isRequired,
    onSwitch: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
    onImageClick: PropTypes.func,
  }
  componentDidMount() {
    const { files } = this.props;
    this.processFiles(files);
  }
  componentWillReceiveProps(newProps) {
    const { files } = newProps;
    this.processFiles(files);
  }
  onImageClick = (e, i) => {
    const { onImageClick } = this.props;
    e.preventDefault();
    if (typeof onImageClick === 'function') {
      onImageClick(i);
    }
  }
  processFiles = (files) => {
    files
      .filter((file) => !file.upload.file && !file.process.rejected && !file.process.dataUrl)
      .forEach((file) => {
        asyncLoadImage(file.rawFile)
          .then((canvas) => this.props.onProcessed(files.indexOf(file), canvas.toDataURL(), Number(canvas.getAttribute('width')), Number(canvas.getAttribute('height'))))
          .catch((error) => this.props.onProcessed(files.indexOf(file), null, null, null, error));
      });
  }
  render() {
    const { files, onUploaded } = this.props;

    if (files.length === 0) {
      return null;
    }
    const items = files.filter((file) => !!file.upload.file || !!file.process.dataUrl).map((file, i) => {
      const index = files.indexOf(file);
      return (
        <DragItem key={i} index={index}>
          <DropItem index={index} onDrop={this.props.onSwitch}>
            <a href="#_non_existing_anchor_" onClick={(e) => this.onImageClick(e, i)}>
              <FileUpload
                file={file}
                onUploaded={(uploadedFile, err) => onUploaded(index, uploadedFile, err)}
              />
            </a>
          </DropItem>
        </DragItem>
      );
    });
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {items}
        {items.length > 0 && (
          <DropItem onDrop={this.props.onDrop}>
            <Icon name="delete_sweep" style={{ fontSize: 50 }} />
          </DropItem>
        )}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(FileUploadPanel);