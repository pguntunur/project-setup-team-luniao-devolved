import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import "./Preferences.css";

function Preferences() {
    const [budget, setBudget] = useState(0);
    const [time, setTime] = useState('Morning');
    const [length, setLength] = useState(0);
    const [type, setType] = useState('Hotel');
    const [rating, setRating] = useState(0);
    const [transport, setTransport] = useState('Flight');
    const [pref, setPref] = useState({});
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let prefData = new Object();
        prefData.budget = budget;
        prefData.time = time;
        prefData.length = length;
        prefData.type = type;
        prefData.rating = rating;
        prefData.transport = transport;
        let prefString = JSON.stringify(prefData);

        axios({
            method: "post",
            url: "http://localhost:4000/api/preferences",
            data: prefString,
            headers: {"Content-Type": "application/json", Authorization: `JWT ${localStorage.getItem('JWT')}`}
        })
        .then(function(res){
            console.log("data saved!");
        })
        .catch(function(res) {
            console.log(res);
        });

        setShow(true);
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:4000/api/preferences",
            headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${localStorage.getItem('JWT')}`
            }
        }).then(user => {
            setPref(user.data);
        });
    }, []);

    let showSaved = null;
    if (show === true) {
        showSaved = <Alert variant="success" onClose={() => setShow(false)} dismissible>Preferences submitted.</Alert>;
    }

    return (
        // Container with padding
        <Container className="p-3">
            <Jumbotron>
                <h1>Trip Preferences</h1>
                <br />
                <p className="preference">This is your current preferences:</p>
                <ul className="preference">
                    <li>Trip Budget: ${pref.budget}</li>
                    <li>Departure Time: {pref.time}</li>
                    <li>Duration (days): {pref.length}</li>
                    <li>Stay Type: {pref.type}</li>
                    <li>Stay rating: {pref.rating}</li>
                    <li>Transportation: {pref.transport}</li>
                </ul>
            </Jumbotron>

            {showSaved}

            <Form onSubmit={e => { handleSubmit(e) }}>
                <Form.Group controlId="TripBudget">
                    <Form.Label>Trip Budget</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="$" value={budget} onChange={e => { setBudget(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="DepartureTime">
                    <Form.Label>Departure Time</Form.Label>
                    <Form.Control size="sm" as="select" value={time} onChange={e => { setTime(e.target.value) }} >
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                        <option>Night</option>
                        <option>Red-Eye</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Number of Nights" value={length} onChange={e => { setLength(e.target.value) }} />
                </Form.Group>
                <Form.Group controlId="StayType">
                    <Form.Label>Stay Type</Form.Label>
                    <Form.Control size="sm" as="select" value={type} onChange={e => { setType(e.target.value) }}>
                        <option>Hotel</option>
                        <option>Apartment</option>
                        <option>Home Stay</option>
                        <option>Hostel</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Rating">
                    <Form.Label>Stay Rating</Form.Label>
                    <Form.Control size="sm" as="select" value={rating} onChange={e => { setRating(e.target.value) }}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="Transportation">
                    <Form.Label>Transportation</Form.Label>
                    <Form.Control size="sm" as="select" value={transport} onChange={e => { setTransport(e.target.value) }}>
                        <option>Flight</option>
                        <option>Train</option>
                        <option>Bus</option>
                        <option>Personal</option>
                    </Form.Control>
                </Form.Group>
                <div class="col-sm-12 text-center">
                    <Button type="submit" variant="outline-success" className="buttons">Confirm</Button>
                    <Button variant="outline-danger" href='/profile' className="buttons">Back to Profile</Button>
                </div>
            </Form >
        </Container >
    );
}

export default Preferences;