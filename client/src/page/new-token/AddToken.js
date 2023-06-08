import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { PageBreadcrumb } from '../../components/breadcrumb/Breadcrumb'
import { AddTokenForm } from '../../components/Add-token-form/AddTokenForm'

export const AddToken = () => {
    
   return (
    <Container>
        <Row>
            <Col>
                <PageBreadcrumb page="New Token" />
            </Col>
        </Row>
        
        <Row>
            <Col>
                <AddTokenForm />
            </Col>
        </Row>
    </Container>
  )
}
