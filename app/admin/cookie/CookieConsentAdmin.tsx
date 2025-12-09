"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import dynamic from "next/dynamic";

// Cargar 3D chart dinámicamente (sin SSR)
const Chart3D = dynamic(() => import("./CookieConsent3DChart"), { ssr: false });

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

export default function CookieConsentAdmin() {
  const [data, setData] = useState<CookieConsent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/cookies/list?limit=200")
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Consentimientos de Cookies" subheader="Últimos registros de usuarios" />
        <CardContent>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>IP</TableCell>
                    <TableCell>Consentimiento</TableCell>
                    <TableCell>User-Agent</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell>{new Date(row.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{row.ip}</TableCell>
                      <TableCell>
                        <span style={{ color: row.accepted ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                          {row.accepted ? 'Aceptado' : 'Rechazado'}
                        </span>
                      </TableCell>
                      <TableCell style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.user_agent}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Métricas y Visualización 3D" subheader="Consentimientos en tiempo real" />
        <CardContent>
          <Chart3D data={data} />
        </CardContent>
      </Card>
    </Box>
  );
}
