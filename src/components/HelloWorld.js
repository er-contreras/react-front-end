import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import '../App.css';
import PropTypes from 'prop-types';

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
      .then((json) => dispatch(getGreetingsSuccess(json)));
  };
}

function HelloWorld({ greetingFromApp, greeting, getGreetings }) {
  const greetingsList = greeting;

  return (
    <>
      <div className="getGreetings">
        Greetings:
        {' '}
        { greetingFromApp }

        <button type="button" className="getGreetingsBtn" onClick={() => getGreetings()}>getGreetings</button>
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

HelloWorld.propTypes = {
  getGreetings: PropTypes.string.isRequired,
  greetingFromApp: PropTypes.string.isRequired,
  greeting: PropTypes.string.isRequired,
};

export default connect(structuredSelector, mapDispatchToProps)(HelloWorld);
