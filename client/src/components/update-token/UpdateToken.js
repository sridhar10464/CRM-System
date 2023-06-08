import PropTypes from "prop-types";
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { replyOnTicket } from '../../page/ticket-listing/TicketAction';

export const UpdateToken = ({_id}) => {
  const dispatch = useDispatch();
  const {user:{name}} = useSelector(state => state.user)
  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  }

  const handleOnSubmit = (e) => {
   const msgObj = {
      message,
      sender: name,
    }
    dispatch(replyOnTicket(_id, msgObj));
    setMessage("");
  }

  return (
    <div>      
    <Form onSubmit={handleOnSubmit}>
        <Form.Label>Reply: </Form.Label>
        <Form.Text className="ms-2">
            Please reply your message here or 
            update the status 
        </Form.Text>
        <Form.Control 
        value={message}
        onChange={handleOnChange}
        as="textarea" 
        row="5"
        name="detail" />
        <div className='text-right mt-3 mb-3 ' >
        <Button variant="info" type="submit">
            Reply
        </Button>
        </div>
    </Form>
    </div> 
  )
}

UpdateToken.prototypes = {
    _id: PropTypes.string.isRequired
}