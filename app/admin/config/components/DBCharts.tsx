"use client";

import React from "react";
import DBChartsTremor from "./DBCharts.tremor";

interface CollectionStats {
  name: string;
  count: number;
  size: number;
  storageSize: number;
  avgObjSize: number;
  totalIndexSize: number;
}

interface DBChartsProps {
  theme: "light" | "dark";
  collections: CollectionStats[];
  chartColors: string[];
  totalSize: number;
  totalDocs: number;
}

export function DBCharts(props: DBChartsProps) {
  return <DBChartsTremor {...props} />;
}