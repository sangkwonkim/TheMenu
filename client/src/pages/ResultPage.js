import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultPage () {
  const { state } = useLocation();

  return (
    <>
      {state.map((data) => {
        return (
          <div>
            <div>{data.name}</div>
          </div>
      )})}
    </>
  );
}
