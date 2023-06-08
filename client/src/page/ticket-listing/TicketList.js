import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb';
import { SearchForm } from '../../components/search-form/SearchForm';
import { TicketTable } from "../../components/ticket-table/TicketTable";
import { Link } from 'react-router-dom';
import { fetchAllTickets } from './TicketAction';

export const TicketList = () => {
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(fetchAllTickets());
    }, [dispatch]);
    
     
  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Token List" />
            </Col>
        </Row>
        <Row className="mt-4">
            <Col>
            <Link to="/add-token">
                <Button variant="info">Add New Token</Button>
            </Link>    
            </Col>
            <Col className='text-right'>
                <SearchForm />
            </Col>
        </Row>
        <hr />
        <Row>
            <Col>
                  <TicketTable />
            </Col>
        </Row>
    </Container>
  )
}
