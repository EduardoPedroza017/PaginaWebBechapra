"use client";

import React from "react";
import PressChartTremor from "./PressChart.tremor";
import type { PressItem } from "./page";

type Props = {
  data: PressItem[];
  theme: 'light' | 'dark';
};

// Wrapper: intenta cargar la versión Tremor (POC). Si falla, usa el legacy Chart.js.
export default function PressChart(props: Props) {
  const { data, theme } = props;
  return <PressChartTremor data={data} theme={theme} />;
}
