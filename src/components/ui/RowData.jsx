import React from "react";

export default function RowData({ dataText, last }) {
  return (
    <td className={`table-td text-ellipsis overflow-hidden ${last}`}>
      {dataText}
    </td>
  );
}
