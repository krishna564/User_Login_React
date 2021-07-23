import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const AddUser = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="addUser">
      <Button color="primary" onClick={toggle}>Add User</Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label htmlFor="username">User Name</Label>
            <Input id="username" type="text" name="username" onChange={(e)=>props.newUserData.username = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">User email</Label>
            <Input id="email" type="email" name="email" onChange={(e)=>props.newUserData.email = e.target.value} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" name="password" onChange={(e)=>props.newUserData.password = e.target.value} />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => props.addNewUser()} toggle={toggle}>Add User</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddUser;