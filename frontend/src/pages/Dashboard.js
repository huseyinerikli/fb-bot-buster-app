import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Dashboard() {
  return (
    <Container>
      <h2 className="mb-4">Bot Detection Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Analyses</Card.Title>
              <Card.Text className="h2">0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Bots Detected</Card.Title>
              <Card.Text className="h2">0</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Average Bot Probability</Card.Title>
              <Card.Text className="h2">0%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Recent Analyses</Card.Title>
              <p>No recent analyses available.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard; 