import React  from 'react';
import {connect} from 'umi';

const todoList = [];

const pushTask = (e) => {
  e.preventDefault();
  console.log(todoList,"TODO");
  console.log(e.target.value);
}

const Search = () => {
  return (
    <div>
      <input/>
      <button type="submit" onClick={pushTask}>Submit</button>
      {todoList ? "todo present" : "no todd"}
    </div>
  );
};

export default connect(() => ({}))(Search);
