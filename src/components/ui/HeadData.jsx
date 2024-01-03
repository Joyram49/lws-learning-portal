import React from "react";

export default function HeadData({ headText, last }) {
  return <th className={`table-th text-center ${last}`}>{headText}</th>;
}
