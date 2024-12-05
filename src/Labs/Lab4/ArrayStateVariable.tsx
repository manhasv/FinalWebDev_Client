import React, { useState } from "react";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button onClick={addElement} className="btn btn-success">Add Element</button>
      <ul>
        {array.map((item, index) => (
          <li key={index} className="form-control border-light-subtle d-flex justify-content-between align-items-center w-50 mb-2">
            <strong>{item}</strong>
            <button onClick={() => deleteElement(index)}
                    className="btn btn-danger"
                    id="wd-delete-element-click">
              Delete</button>
          </li>
        ))}
      </ul>
      <hr/>
    </div>
  );
}
