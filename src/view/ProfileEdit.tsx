import React from 'react';
import { Link } from "react-router-dom";

function ProfileEdit() {
  return (
    <>
      <div>
        <h1>Hello React Router</h1>
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  );
}

export default ProfileEdit;