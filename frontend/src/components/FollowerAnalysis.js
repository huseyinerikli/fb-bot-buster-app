import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const FollowerAnalysis = () => {
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8080/api/v1/analysis/facebook', {
                username: username
            });
            setAnalysis(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while analyzing followers');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <Card.Header>
                <h4 className="mb-0">Facebook Follower Analysis</h4>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Facebook Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Facebook username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button 
                        variant="primary" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? 'Analyzing...' : 'Analyze Followers'}
                    </Button>
                </Form>

                {error && (
                    <Alert variant="danger" className="mt-3">
                        {error}
                    </Alert>
                )}

                {analysis && (
                    <div className="mt-4">
                        <h5>Analysis Results</h5>
                        <p>Total Followers Analyzed: {analysis.totalFollowers}</p>
                        <p>Potential Bots Detected: {analysis.potentialBots}</p>
                        <p>Bot Probability: {analysis.botProbability}%</p>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default FollowerAnalysis; 