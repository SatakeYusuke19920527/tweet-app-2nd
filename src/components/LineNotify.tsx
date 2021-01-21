import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import querystring from 'querystring';

const token: string = 'bvumonmgJ4JSloYQ89tSJIcAJPWtg9qMjo3n1LeqTjZ';

const LineNotify = () => {
  const lineNotify = async () => {
    try {
      await axios({
        method: 'post',
        url: 'https://notify-api.line.me/api/notify',
        headers: {
          Authorization: `Bearer ${token}`,
          ContentType: 'application/x-www-form-urlencoded',
        },
        data: querystring.stringify({
          message: 'Hello Yusuke! This is line notify!',
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>LIne</h1>
      <Link to="/">home</Link>
      <button onClick={lineNotify}>button</button>
    </div>
  );
};

export default LineNotify;
