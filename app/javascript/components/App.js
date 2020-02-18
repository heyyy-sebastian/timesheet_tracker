import React, { useState, useEffect } from 'react';
import TimesheetTable from './TimesheetTable';
import NewEntry from './NewEntry';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Col, Row } from 'react-bootstrap';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalBillableAmount, setTotalBillableAmount] = useState(0);
  const [error, setErrorState] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = '/api/v1/timesheet_entries?sort_by_project=true';
      try{
        const response = await axios(apiUrl);
        setEntries(response.data.entries);
        setTotalHours(response.data['grand_totals']['total_hours']);
        setTotalBillableAmount(response.data['grand_totals']['total_billable_amount'])
      } catch (error) {
        console.log(error);
        setErrorState(true);
      }

    };
    fetchData();
  }, []);

  return(
    <Container>
        <h1>Timesheet Tracker</h1>
        { error ? (
            <div>We're sorry, an error occurred while loading the timesheet.</div>
        ) : (
          <>
          <Row>
            <Col>Hours Tracked<br/>{totalHours}</Col>
            <Col>Billable Amount<br/>{totalBillableAmount}</Col>
          </Row>
          <TimesheetTable entries={entries}/>
          <Row>
            <NewEntry/>
          </Row>
          </>
        )}
    </Container>
  )
    
}
