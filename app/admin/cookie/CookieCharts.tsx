"use client";

import React from "react";
import CookieChartsTremor from "./CookieCharts.tremor";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieChartsProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
  className?: string;
  activeChart?: 'distribution' | 'dailyActivity' | 'trend' | 'all';
}

export default function CookieCharts(props: CookieChartsProps) {
  return <CookieChartsTremor {...props} />;
}