import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt, faTrophy } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
    const owners = [
        {
          name: "Alexander Pierce",
          position: "Chairman",
          yearJoined: 2005,
          achievements: "Under Alexander's leadership, the company saw a 200% increase in revenue within 5 years.",
          image: "../img/chaiman.jpg"
        },
        {
          name: "Victoria Stone",
          position: "CEO",
          yearJoined: 2010,
          achievements: "Victoria led the company through successful mergers and acquisitions, expanding its market reach by 30%.",
          image: "../img/coo.jpg"
        },
        {
          name: "Isabella Reed",
          position: "COO",
          yearJoined: 2012,
          achievements: "Isabella implemented efficiency measures that reduced operational costs by 15% while increasing productivity.",
          image: "../img/cuc.jpg"
        },
       
      ];
    

  return (
    
    <Container  style={{marginTop:'8em'}}>
      <h1 className="text-center my-4" style={{textDecoration:'underline'}}>About Us</h1>
      <Row>
        {owners.map(owner => (
          <Col md={4} key={owner.name}>
            <Card className="mb-4 bg-dark text-white  " style={{boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)'}}>
              <Card.Img variant="top" src={owner.image} alt={owner.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <Card.Body style={{height:'60%'}}> 
                <Card.Title><FontAwesomeIcon icon={faUser} /> {owner.name}</Card.Title>
                <Card.Text><FontAwesomeIcon icon={faUser} /> <strong>Position:</strong> {owner.position}</Card.Text>
                <Card.Text><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Year Joined:</strong> {owner.yearJoined}</Card.Text>
                <Card.Text><FontAwesomeIcon icon={faTrophy} /> <strong>Achievements:</strong> {owner.achievements}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default AboutUs;
