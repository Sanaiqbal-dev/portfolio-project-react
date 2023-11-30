import { useState, useEffect } from "react";
import { ID, IMG, URL, LOADING_TXT, TITLE } from "./constants";
import styles from "./DataViewPage.module.css";

const DataViewPage = () => {
  const [tableDataset, setTableDataset] = useState([]);

  const fetchExternalData = () => {
    fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
      .then((response) => response.json())
      .then((json) => {
        setTimeout(() => {
          setTableDataset(json);
        }, 1000);
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
      ) : (
        <h2 className={styles.loadingLabel}>{LOADING_TXT}</h2>
      )}
    </>
  );
};

export default DataViewPage;
