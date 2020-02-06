import React from 'react';

const head = [
  {
    t1: 1,
    key: 'ew1'
  },
  {
    t1: 2,
    key: 'ew2'
  },
]

function Task() {


  return (
    <div className="App">

      { head.map(item => {
        return (
          <div className="row">{item.key}</div>
        )
      })}
    </div>
  );
}

export default Task;
