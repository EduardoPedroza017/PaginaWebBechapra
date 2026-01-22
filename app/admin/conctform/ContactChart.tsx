"use client";

import React from "react";
import ContactChartTremor from "./ContactChart.tremor";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  timestamp: string;
};

type Props = {
  data: ContactMessage[];
  theme?: 'light' | 'dark';
};

export default function ContactChart(props: Props) {
  const { data, theme = 'dark' } = props;
  return <ContactChartTremor data={data} theme={theme} />;
}