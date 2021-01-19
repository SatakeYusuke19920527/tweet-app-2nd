import React, { useEffect, useState } from 'react';
import './App.css';
import { db, storage } from './lib/firebase';
import firebase from 'firebase/app';
import Post from './components/Post';
import { Avatar } from '@material-ui/core';
export type UserType = {
  id: string;
  name: string;
  state: string;
};

const App: React.FC<{}> = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [data1, setData1] = useState<any>([]);
  const [item, setItem] = useState<File | null>(null);
  const [isUpload, setIsUpload] = useState<boolean>(false);
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

  useEffect(() => {
    const unSub = db.collection('images').onSnapshot(function (querySnapshot) {
      setData1(
        querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          age: doc.data().age,
          url: doc.data().url,
          createAt: doc.data().createAt,
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
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const N = 16;
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join('');
    const fileName = randomChar + '_' + item?.name;

    const uploadItem = storage.ref(`image`).child(fileName).put(item!);

    uploadItem.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setIsUpload(true);
        console.log('please wait');
      },
      (err: any) => {
        console.log(err.messsage);
      },
      async () => {
        setIsUpload(false);
        console.log('file upload success!!');
        await storage
          .ref('image')
          .child(fileName)
          .getDownloadURL()
          .then(async (url) => {
            await db.collection('images').add({
              name: 'satake',
              age: 28,
              url: url,
              createAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
      }
    );
  };
  console.log(data1, 'hello ');
  return (
    <div>
      <input type="file" onChange={(e) => handleInput(e.target.files)} />
      <button onClick={uploadFile}>file upload</button>
      <h1>button</h1>
      {isUpload && <h1>Uploading...</h1>}
      <button onClick={handleClick}>button</button>
      <h1>data</h1>
      {data1 &&
        data1.map((element: any, index: any) => {
          return (
            <div key={index}>
              {element.name} / {element.age}
              <Avatar src={element.url} alt="user name" />
            </div>
          );
        })}
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
