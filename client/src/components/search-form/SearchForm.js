import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Form, Row } from 'react-bootstrap'
import { filterSerachTicket } from '../../page/ticket-listing/TicketAction';

export const SearchForm = () => {
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { value } = e.target;

        dispatch(filterSerachTicket(value));
    };
    
  return (
    <div>
        <Form>
            <Form.Group as = {Row}>
                <Form.Label column sm="2">
                Search:{" "}
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                    name= "SearchStr"
                    onChange={handleOnChange}
                    placeholder="Search..."
                    />
                </Col>
            </Form.Group>
        </Form>
    </div>
  )
}

