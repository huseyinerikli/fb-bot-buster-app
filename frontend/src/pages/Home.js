import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FacebookLogin from '../components/FacebookLogin';
import FollowerAnalysis from '../components/FollowerAnalysis';

function Home() {
  return (
    <Container>
      <Row className="justify-content-center mb-4">
        <Col md={8} className="text-center">
          <h1>Welcome to Facebook Bot Buster</h1>
          <p className="lead">
            Detect and analyze Facebook bots among your followers using advanced machine learning algorithms
          </p>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col md={6} className="text-center">
          <FacebookLogin />
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <FollowerAnalysis />
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col md={4} className="text-center mb-4">
          <h3>Follower Analysis</h3>
          <p>Analyze your Facebook followers to identify potential bot accounts</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <h3>Advanced Detection</h3>
          <p>Using machine learning to detect sophisticated bot behavior</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <h3>Detailed Reports</h3>
          <p>Get comprehensive analysis of suspected bot accounts</p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home; 