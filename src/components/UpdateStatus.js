import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const UpdateStatus = (props) => {

  return (
    <div className="addUser">
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Update Status</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="method">Status</Label> {" "}
            <select id="method" name="method" onChange={(e)=>props.data.status = e.target.value}>
              <option value="">Select</option>
              <option value="assigned">Assigned</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.update()} toggle={props.toggle}>Update</Button>
          <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default UpdateStatus;