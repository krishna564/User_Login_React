import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const UpdateTask = (props) => {

  return (
    <div className="addUser">
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Update Status</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={props.data.title} onChange={(e) => props.onChangeHandler(e)} />            
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <textarea id="description" name="description" className="form-control" rows="5" value={props.data.description} onChange={(e) => props.onChangeHandler(e)}></textarea>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Due_Date</Label>
            <Input type="date" id="date" name="date" value={props.data.due_date} onChange={(e) => props.onChangeHandler(e)} />            
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {props.update(); props.loading()}} toggle={props.toggle}>Update</Button>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdateTask;