import React, {useEffect, useState} from 'react';
// import { PropTypes } from 'prop-types';
import { Card } from 'antd';
import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import "../Add-token-form/AddTokenFormStyle.css";
import { shortText } from '../../utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { openNewTicket } from './AddTicketAction';
import { resetSuccessMsg } from './AddTokenslice';

const initialFormData = {
  subject: "",
  issueDate: "",
  message: "",
};

const initialFormError = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTokenForm = () => {
  const dispatch = useDispatch();
  const { user: { name } } = useSelector(state => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.openTicket
  )

  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormError);

  useEffect(() => {
    return () => {
      successMsg && dispatch(resetSuccessMsg())
    }
  }, [dispatch, formData, formDataError])

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
        // console.log(name, value);
    }

    const handleOnSubmit = async (e) => {
      e.preventDefault()

      setFormDataError(initialFormError);
      
      const isSubjectValid = await shortText(formData.subject);

      setFormDataError({
        ...initialFormError,
        subject: !isSubjectValid,
      });

      dispatch(openNewTicket({...formData, sender:name}));
        
    }

  return (
  <Card className='mt-3 add-new-ticket bg-light'>
  <h1 className='text-info text-center'>Add New Token</h1>
  <hr />
  <div>
    {error && <Alert variant = "danger">{error}</Alert>}
    {successMsg && <Alert variant = "primary">{successMsg}</Alert>}
    {isLoading && <Spinner variant="primary" animation="border" />}
  </div>
    <Form autoComplete="off" onSubmit={handleOnSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Subject</Form.Label>
                    <Col sm={9}>
                    <Form.Control
                        name='subject'
                        value={formData.subject}
                        maxLength="100"
                        onChange={handleOnChange}
                        placeholder='Enter Subject'
                        required
                    />
                    <Form.Text className="text-danger">
                      {formDataError.subject && "Subject is required!"}
                    </Form.Text>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={3}>Issue Found</Form.Label>
                    <Col sm={9}>
                    <Form.Control
                        type='date'
                        name='issueDate'
                        value={formData.issueDate}
                        onChange={handleOnChange}
                        required
                    />
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                        as="textarea"
                        name='message'
                        rows="5"
                        value={formData.message}
                        onChange={handleOnChange}
                        required
                    />
                </Form.Group>    
                    <Button type="submit" variant="info" block="true">
                    Open Token
                    </Button>
                
              </Form>
  </Card>
  )
}

// AddTokenForm.propTypes = {
//   handleOnSubmit: PropTypes.func.isRequired,
//   handleOnChange: PropTypes.func.isRequired,
//   formData: PropTypes.object.isRequired,
  // formSwitcher: PropTypes.func.isRequired,
  // email: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
// }