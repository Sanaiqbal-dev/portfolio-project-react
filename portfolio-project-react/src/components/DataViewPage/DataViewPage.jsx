import { useState, useEffect } from "react";
import { ID, IMG, URL, LOADING_TXT, TITLE, REQUEST_FAILED } from "./constants";
import styles from "./DataViewPage.module.css";

const DataViewPage = () => {
  const [tableDataset, setTableDataset] = useState([]);
  const [isApiRequestSuccessfull, setIsApiRequestSuccessfull] = useState(true);

  const fetchExternalData = () => {
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setTableDataset(json);
        }, 1000);
      })
      .catch((error) => {
        setIsApiRequestSuccessfull(false);
      });
  };
  useEffect(() => {
    fetchExternalData();
  }, []);

  return (
    <>
      {tableDataset.length > 0 ? (
        <div class={styles.externalDataDiv}>
          <table class={styles.infoTable}>
            <tr>
              <th class={styles.imageCell}>{IMG}</th>
              <th class={styles.idCell}>{ID}</th>
              <th class={styles.titleCell}>{TITLE}</th>
              <th class={styles.urlLabelCell}>{URL}</th>
            </tr>
          </table>
          <div class={styles.tableContainer}>
            <table class={styles.infoTable}>
              {tableDataset.map((val, key) => {
                return (
                  <tr key={key}>
                    <td className={styles.imageCellData}>
                      <img src={val.thumbnailUrl} />
                    </td>
                    <td className={styles.idCellData}>{val.id}</td>
                    <td className={styles.titleCellData}>{val.title}</td>
                    <td className={styles.urlCellData}>{val.url}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      ) : isApiRequestSuccessfull ? (
        <h3 className={styles.loadingLabel}>{LOADING_TXT}</h3>
      ) : (
        <h3 className={styles.loadingLabel}>{REQUEST_FAILED}</h3>
      )}
    </>
  );
};

export default DataViewPage;
