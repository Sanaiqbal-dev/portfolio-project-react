import React, { FC } from "react";
import {
  ID,
  IMG,
  URL,
  TITLE,
  NO_DATA_FOUND,
} from "../TabularData/constants.tsx";
import styles from "./TabularData.module.css";

interface Dataset {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
  url: string;
}

interface TableDataset {
  tableDataset: Dataset[]
}
const TabularData: FC<TableDataset> = ({ tableDataset }) => {
  return (
    <>
      {tableDataset.length > 0 ? (
        <div className={styles.externalDataDiv}>
          <table className={styles.infoTable}>
            <tr>
              <th className={styles.imageCell}>{IMG}</th>
              <th className={styles.idCell}>{ID}</th>
              <th className={styles.titleCell}>{TITLE}</th>
              <th className={styles.urlLabelCell}>{URL}</th>
            </tr>
          </table>
          <div className={styles.tableContainer}>
            <table className={styles.infoTable}>
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
        <h3 className={styles.loadingLabel}>{NO_DATA_FOUND}</h3>
      )}
    </>
  );
};

export default TabularData;
