"use client";

import React from "react";
import AuditLogChartsTremor from "./AuditLogCharts.tremor";

interface AuditLogChartsProps {
  successCount: number;
  failCount: number;
  byUser: { [key: string]: number };
  byDate: { [key: string]: number };
  theme: 'light' | 'dark';
}

export function AuditLogCharts(props: AuditLogChartsProps) {
  return <AuditLogChartsTremor {...props} />;
}