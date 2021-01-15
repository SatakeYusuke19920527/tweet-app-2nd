import React from 'react';
import './App.css';
import { db } from './lib/firebase';

const App: React.FC<{}> = () => {
  const handleClick = () => {
    // Add a new document in collection "cities"
    db.collection('cities')
      .doc('LA')
      .set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };
  return (
    <div className="App">
      <h1>button</h1>
      <button onClick={handleClick}>button</button>
    </div>
  );
};

export default App;
