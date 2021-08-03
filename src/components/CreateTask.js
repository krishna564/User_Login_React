import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const UpdateTask = (props) => {

  return (
    <div className="addUser">
      <button className="btn btn-primary" onClick={()=>props.toggle()}>Create Task</button>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Update Status</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" onChange={(e)=>props.data.title = e.target.value} />            
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <textarea id="description" name="description" className="form-control" rows="5" onChange={(e)=>props.data.description = e.target.value}></textarea>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="date">Due_Date</Label>
            <Input type="date" id="date" name="date" onChange={(e)=>props.data.due_date = e.target.value} />            
          </FormGroup>
          <FormGroup>
            <Label htmlFor="assignee">Assignee</Label>
            <Input type="text" id="assignee" name="assignee" onChange={(e)=>props.data.assignee = e.target.value} />            
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.create()} toggle={props.toggle}>Create</Button>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdateTask;