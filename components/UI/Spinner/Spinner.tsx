import { FC } from "react";

import styles from "./Spinner.module.css";

const LoadingSpinner: FC = function () {
  return <div className={styles.spinner}></div>;
};

export default LoadingSpinner;
