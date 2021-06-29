import React from "react";
import styles from "./DoTabs.module.css";

function DoTabs(props) {
  const filterState = () => props.setFilterState(props.name);
  const killState = () => props.deleteAllDone();

  return (
    <h6
      className={styles.tabs}
      onClick={props.name === "Kill" ? killState : filterState}
    >
      {props.name}
    </h6>
  );
}

export default DoTabs;
