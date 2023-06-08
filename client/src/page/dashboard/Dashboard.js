import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { TicketTable } from '../../components/ticket-table/TicketTable'
import tickets from "../../assets/data/dummy-tickets.json";
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTickets } from '../ticket-listing/TicketAction';

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { tickets } = useSelector(state => state.tickets)
    
    useEffect (() => {
        if (!tickets.length) {
            dispatch(fetchAllTickets());
        }
    }, [tickets, dispatch]);
    const pendingTickets = tickets.filter((row) => row.status !== "Closed");
    const totalTickets = tickets.length;

  return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="Dashboard" />
            </Col>
        </Row>
        <Row>
            <Col className='text-center mt-5 mb-2'>
            <Link to="/add-token">
                <Button 
                variant="info" 
                style={{fontSize: "2rem", padding: "10px 30px"}}
                >
                Add New Token
                </Button>
            </Link>    
            </Col>
        </Row>
        <Row>
            <Col className='text-center mt-5 mb-2'>
                <div>Total Tokens: {totalTickets}</div>
                <div>Pending Tokens:{pendingTickets.length}</div>
            </Col>
        </Row>
        <Row>
            <Col className='mt-2'>Recently Added Tokens</Col>
        </Row>
        <hr />
        
        <Row>
            <Col className='recent-ticket'>
                <TicketTable tickets={tickets} />
            </Col>
        </Row>
    </Container>
  )
}
