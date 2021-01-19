import React, { useEffect, useState } from 'react';
import './App.css';
import { db, storage } from './lib/firebase';
import Post from './components/Post';
export type UserType = {
  id: string;
  name: string;
  state: string;
};

const App: React.FC<{}> = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [item, setItem] = useState<File | null>(null);
  useEffect(() => {
    const unSub = db.collection('posts').onSnapshot(function (querySnapshot) {
      setData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          state: doc.data().state,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);

  const handleClick = () => {
    // Add a new document in collection "cities"
    db.collection('posts')
      .add({
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
  const handleInput = (file: any) => {
    console.log(file[0]);
    setItem(file[0]);
  };
  const uploadFile = async () => {
    await storage.ref(`image`).child(item?.name!).put(item!);
  };
  return (
    <div>
      <input type="file" onChange={(e) => handleInput(e.target.files)} />
      <button onClick={uploadFile}>file upload</button>
      <h1>button</h1>
      <button onClick={handleClick}>button</button>
      <h1>data</h1>
      {data &&
        data.map((element, index) => {
          return (
            <Post
              key={index}
              id={element.id}
              name={element.name}
              state={element.state}
            />
          );
        })}
    </div>
  );
};

export default App;
