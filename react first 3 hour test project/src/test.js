import React, { useState } from 'react';

function Test() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const inputData = () => {
    // Store input data in the submittedData state variable
    setSubmittedData({
      username: username,
      age: age
    });
  };

  return (
    <>
      <label htmlFor="username">Username:</label><br />
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />

      <label htmlFor="age">Age:</label><br />
      <input
        type="text"
        id="age"
        name="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button onClick={inputData}>Submit</button>

      {/* Display submitted data below the button */}
      {submittedData && (
        <div>
          <h2>Submitted Data:</h2>
          <p>Username: {submittedData.username}</p>
          <p>Age: {submittedData.age}</p>
        </div>
      )}
    </>
  );
}

export default Test;
