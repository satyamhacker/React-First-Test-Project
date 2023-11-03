import React, { useState } from 'react';

function Test() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [dataList, setDataList] = useState([]);

  const handleInputChange = () => {
    // Create a new data object with current input values

    var newData = {username:username, age:age}

    if(age<0)
    {
      alert("Please enter valid age>0");
    }

    setDataList([...dataList, newData])


   
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

      <button onClick={handleInputChange}>Submit</button>

      {/* Display submitted data below the button */}


      {dataList.length > 0 && (
        <div>
          <h2>Submitted Data:</h2>
          <ul>
            {dataList.map((data, index) => (
              <li key={index}>
                Username: {data.username}, Age: {data.age}
              </li>
            ))}
          </ul>
        </div>
      )}


    </>
  );
}

export default Test;
