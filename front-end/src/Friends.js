import React from 'react';
// import logo from './logo.svg';
import './Friends.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const Friends = (props) => {

  // not sure about the axios stuff but this was similar to what another person did 
  axios({
    method: "GET",
    url: "http://localhost:4000/api/friends",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(post => {
        setData(post.data);
  });

  return (
    <div className="Friends">
      <h1>Friends</h1>
      <section className="main-content">
        <div class='flex-container'>
          <div>
          <img src="logo192.png" alt=""></img>
          </div>

          <div>
            <h3> Joe Smith</h3>
            <h5> September 25, 1998</h5>
          </div>

          <div>
            <ListGroup>
              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Pranav Guntunur
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Karik Jain
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Kaylee Park
              </ListGroup.Item>

              <ListGroup.Item>
                <img src="logo192.png" alt=""></img>
                Brian Steinberg
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div>
            <Button href="/profile">Back</Button>
          </div>

          <div>
            <Button href="/createpost">New Post</Button>
            <Button href="/editprofile">Edit Profile</Button>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Friends;
