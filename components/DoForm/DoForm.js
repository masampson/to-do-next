import React, { useState } from "react";
import styles from "./DoForm.module.css";

function DoForm(props) {
  const [enteredValue, setEnteredValue] = useState("");

  const inputMonitor = (e) => {
    setEnteredValue(e.target.value);
  };

  const submitItem = (e) => {
    e.preventDefault();
    if (enteredValue.trim().length === 0) {
      alert("Please enter valid item.");
      return;
    }
    props.addToDo({
      item: enteredValue,
      active: true,
    });
    setEnteredValue("");
  };

  return (
    <form action="#" className={styles.input} onSubmit={submitItem}>
      <input
        type="text"
        id={styles["do-input"]}
        value={enteredValue}
        placeholder="What do you need to do?"
        onChange={inputMonitor}
      />
      <button
        type="submit"
        htmlFor="do-input"
        id={styles["do-button"]}
        value="Do"
      >
        Do
      </button>
    </form>
  );
}

export default DoForm;
