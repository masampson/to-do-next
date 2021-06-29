import React from "react";
import styles from "./DoItem.module.css";

function DoItem(props) {
  return (
    <li className={styles["item-row"]}>
      <input
        className={styles["check-off"]}
        type="checkbox"
        checked={!props.active}
        name="mark-done"
        onChange={() => props.toggleActive(props.id)}
      />
      <label
        htmlFor="mark-done"
        className={props.active === true ? styles.item : [styles["item-done"]]}
      >
        {props.item}
      </label>
      <button
        className={styles.delete}
        onClick={() => props.deleteItem(props.id)}
      >
        X
      </button>
    </li>
  );
}

export default DoItem;
