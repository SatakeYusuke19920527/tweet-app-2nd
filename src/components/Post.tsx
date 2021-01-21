import React, { useEffect, useState } from 'react';
import { UserType } from '../types/UserType';
import { db } from '../lib/firebase';

type CommentType = {
  name: string;
  age: number;
  text: string;
};

const Post: React.FC<UserType> = ({ id, name, state }) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  useEffect(() => {
    const unSub = db
      .collection('posts')
      .doc(id)
      .collection('comment')
      .onSnapshot(function (querySnapshot) {
        setComments(
          querySnapshot.docs.map((doc) => ({
            name: doc.data().name,
            age: doc.data().age,
            text: doc.data().text,
          }))
        );
      });
    return () => unSub();
  }, [id]);
  const childMake = () => {
    // Add a new document in collection "cities"
    db.collection('posts')
      .doc(id)
      .collection('comment')
      .add({
        name: 'Los',
        age: 28,
        text: 'Hoo',
      })
      .then(function () {
        console.log('Document successfully written!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  };
  return (
    <div>
      <hr />
      <ul>
        <li>id : {id}</li>
        <li>name : {name}</li>
        <li>state : {state}</li>
      </ul>
      <h3>comments</h3>
      {comments &&
        comments.map((comment, index) => {
          return (
            <div key={index}>
              <ul>
                <li>{comment.name}</li>
                <li>{comment.age}</li>
                <li>{comment.text}</li>
              </ul>
            </div>
          );
        })}
      <button onClick={childMake}>comment</button>
      <hr />
    </div>
  );
};

export default Post;
