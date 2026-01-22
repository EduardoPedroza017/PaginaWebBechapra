"use client";

import React from "react";
import NewsChartTremor from "./NewsChart.tremor";

type Props = {
  data: any[];
  theme?: 'light' | 'dark';
};

export default function NewsChart(props: Props) {
  const { data, theme = 'dark' } = props;
  return <NewsChartTremor data={data} theme={theme} />;
}
