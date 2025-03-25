import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Analysis() {
  return (
    <Container>
      <h2 className="mb-4">Account Analysis</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Analysis Results</Card.Title>
              <Card.Text>
                Select an account to view detailed analysis results.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Bot Probability</Card.Title>
              <div className="text-center">
                <h1>--%</h1>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Account Stats</Card.Title>
              <ul className="list-unstyled">
                <li>Followers: --</li>
                <li>Following: --</li>
                <li>Tweets: --</li>
                <li>Account Age: --</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Analysis; 