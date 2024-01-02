import React, { useState, useEffect } from "react";
import TabularData from "../TabularData/TabularData.tsx";
import { LOADING_TXT, REQUEST_FAILED, URL_PHOTOS_DATA } from "./constants.tsx";
import styles from "./DataViewPage.module.css";

interface TableDataset{
  albumId:number;
  id:number;
  thumbnailUrl:string;
  title:string;
  url:string;
}
const DataViewPage = () => {
  const [tableDataset, setTableDataset] = useState<TableDataset[]>();
  const [isApiRequestSuccessfull, setisApiRequestSuccessfull] = useState<boolean>(true);

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
      {!tableDataset ? (
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
