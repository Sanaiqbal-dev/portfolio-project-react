import { useState, useEffect, Suspense } from "react";
import TabularData from "../TabularData/TabularData";
import { LOADING_TXT, REQUEST_FAILED, URL_PHOTOS_DATA } from "./constants";
import styles from "./DataViewPage.module.css";

const DataViewPage = () => {
  const [tableDataset, setTableDataset] = useState(null);
  const [isApiRequestSuccessfull, setisApiRequestSuccessfull] = useState(true);

  const fetchExternalData = () => {
    fetch(URL_PHOTOS_DATA)
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setTableDataset(json);
        }, 1000);
      })
      .catch((error) => {
        setisApiRequestSuccessfull(false);
      });
  };
  useEffect(() => {
    fetchExternalData();
  }, []);

  return (
    <>
      {tableDataset == null ? (
        !isApiRequestSuccessfull ? (
          <h3 className={styles.loadingLabel}>{REQUEST_FAILED}</h3>
        ) : (
          <h3 className={styles.loadingLabel}>{LOADING_TXT}</h3>
        )
      ) : (
        <TabularData tableDataset={tableDataset} />
      )}
    </>
  );
};

export default DataViewPage;
