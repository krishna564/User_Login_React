import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const EditUser = (props) => {

  return (
    <div className="addUser">
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Update User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="username">User Name</Label>
            <Input id="username" type="text" name="username" onChange={(e)=>props.data.username = e.target.value} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.EditUser()} toggle={props.toggle}>Update</Button>
          <Button color="secondary" onClick={props.toggleEdit}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditUser;