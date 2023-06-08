import React from 'react';
import { Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export const TicketTable = () => {
  const { searchTicketList, isLoading, error } = useSelector((state) => state.tickets);

  if (isLoading) return <h3>Loading...</h3>
  if (error) return <h3>{error}</h3>
  return (
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Subjects</th>
            <th>Status</th>
            <th>Opened Date</th>
          </tr>
        </thead>
        <tbody>
          {searchTicketList.length ? (searchTicketList.map ((row) => (
            <tr key={row._id}>
            <th>{row._id}</th>
            <th>
            <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
            </th>
            <th>{row.status}</th>
            <th>{row.openAt && new Date(row.openAt).toLocaleString()}</th>
          </tr>
          )) 
          ) : (
          <tr>
            <td colSpan="4" className="text-center">
                No Token to show
            </td>
          </tr>
          )}
        </tbody>
    </Table>
  )
}

