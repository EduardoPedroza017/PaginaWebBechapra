"use client";

import React from "react";
import DbMetricsSectionTremor from "./DbMetricsSection.tremor";

interface DbMetrics {
  total_documents: number;
  collections: {
    [key: string]: {
      count: number;
      size_bytes: number;
    };
  };
  total_size_mb: number;
  avg_doc_size_kb: number;
  last_backup?: string;
  performance?: {
    query_time_ms: number;
    connection_count: number;
    uptime_days: number;
  };
}

interface DbMetricsSectionProps {
  theme: 'light' | 'dark';
  compact?: boolean;
}

export function DbMetricsSection(props: DbMetricsSectionProps) {
  return <DbMetricsSectionTremor {...props} />;
}