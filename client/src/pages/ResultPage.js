import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultPage () {
  const { state } = useLocation();

  return (
    <>
      <div>{ state }</div>
    </>
  );
}
