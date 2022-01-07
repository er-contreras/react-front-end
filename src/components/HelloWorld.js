import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import '../App.css';

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

export function getGreetingsSuccess(json) {
  return {
    type: GET_GREETINGS_SUCCESS,
    json,
  };
}

function getGreetings() {
  return (dispatch) => {
    dispatch({ type: GET_GREETINGS_REQUEST });
    return fetch('http://127.0.0.1:3000/api/v1/greetings/index')
      .then((response) => response.json())
      .then((json) => dispatch(getGreetingsSuccess(json)))
      .catch((error) => console.log(error)); // eslint-disable-line
  };
}

/* eslint-disable */
function HelloWorld(props) {
  const { greeting } = props;
  const greetingsList = greeting;

  return (
    <>
      <div className="getGreetings">
        Greetings:
        {' '}
        { props.greeting_from_app}

        <button className="getGreetingsBtn" onClick={() => props.getGreetings()}>getGreetings</button>
        <br />

        <p>{ greetingsList }</p>
      </div>
    </>
  );
}

const structuredSelector = createStructuredSelector({
  greeting: (state) => state.greeting,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
