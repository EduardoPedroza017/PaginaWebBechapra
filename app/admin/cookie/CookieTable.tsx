"use client";

import React, { useState, useMemo } from "react";
import { TranslateText } from "@/components/TranslateText";
import { 
  CheckCircle, 
  XCircle, 
  Globe, 
  Monitor, 
  Smartphone,
  Tablet,
  Compass,
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  EyeOff,
  ChevronsUpDown,
  MoreVertical
} from "lucide-react";

interface CookieConsent {
  accepted: boolean;
  timestamp: string;
  ip: string;
  user_agent: string;
}

interface CookieTableProps {
  data: CookieConsent[];
  theme?: 'light' | 'dark';
}

type SortField = 'timestamp' | 'ip' | 'accepted';
type SortDirection = 'asc' | 'desc';

export default function CookieTable({ data, theme = 'light' }: CookieTableProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'accepted' | 'rejected'>('all');
  const [sortField, setSortField] = useState<SortField>('timestamp');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showUserAgent, setShowUserAgent] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const pageSize = 10;

  // Ordenar datos
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'timestamp':
          aValue = new Date(a.timestamp).getTime();
          bValue = new Date(b.timestamp).getTime();
          break;
        case 'ip':
          aValue = a.ip;
          bValue = b.ip;
          break;
        case 'accepted':
          aValue = a.accepted ? 1 : 0;
          bValue = b.accepted ? 1 : 0;
          break;
        default:
          return 0;
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortField, sortDirection]);

  // Filtrar datos
  const filteredData = useMemo(() => {
    return sortedData.filter(item => {
      const matchesSearch = item.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.user_agent.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' ||
                           (filterStatus === 'accepted' && item.accepted) ||
                           (filterStatus === 'rejected' && !item.accepted);
      return matchesSearch && matchesFilter;
    });
  }, [sortedData, searchTerm, filterStatus]);

  // Paginación
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Detectar dispositivo y navegador
  const getDeviceInfo = (userAgent: string) => {
    const ua = userAgent.toLowerCase();
    
    // Dispositivo
    let device = 'Desktop';
    let deviceIcon: React.ReactElement = <Monitor className="w-5 h-5" />;
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      device = 'Mobile';
      deviceIcon = <Smartphone className="w-5 h-5" />;
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      device = 'Tablet';
      deviceIcon = <Tablet className="w-5 h-5" />;
    }
    
    // Navegador
    let browser = 'Unknown';
    let browserIcon: React.ReactElement = <Globe className="w-4 h-4" />;
    if (ua.includes('chrome') && !ua.includes('edge')) {
      browser = 'Chrome';
      browserIcon = <Globe className="w-4 h-4" />;
    } else if (ua.includes('firefox')) {
      browser = 'Firefox';
      browserIcon = <Globe className="w-4 h-4" />;
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      browser = 'Safari';
      browserIcon = <Compass className="w-4 h-4" />;
    } else if (ua.includes('edge')) {
      browser = 'Edge';
      browserIcon = <Globe className="w-4 h-4" />;
    } else if (ua.includes('opera')) {
      browser = 'Opera';
      browserIcon = <Globe className="w-4 h-4" />;
    }
    
    // Sistema operativo
    let os = 'Unknown';
    if (ua.includes('windows')) os = 'Windows';
    else if (ua.includes('mac')) os = 'macOS';
    else if (ua.includes('linux')) os = 'Linux';
    else if (ua.includes('android')) os = 'Android';
    else if (ua.includes('iphone') || ua.includes('ipad')) os = 'iOS';
    
    return { device, deviceIcon, browser, browserIcon, os };
  };

  // Formatear fecha relativa
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }
  };

  // Ordenar columna
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Exportar datos
  const handleExport = () => {
    const exportData = selectedRows.size > 0 
      ? filteredData.filter((_, i) => selectedRows.has(i))
      : filteredData;
    
    const csv = [
      ['Fecha', 'IP', 'Estado', 'User Agent'].join(','),
      ...exportData.map(row => [
        new Date(row.timestamp).toISOString(),
        `"${row.ip}"`,
        row.accepted ? 'Aceptado' : 'Rechazado',
        `"${row.user_agent.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookie-consent-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Seleccionar/deseleccionar todos
  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((_, i) => i)));
    }
  };

  const toggleSelectRow = (index: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedRows(newSelected);
  };

  return (
    <div className="space-y-4">
      {/* Barra de herramientas */}
      <div className={`p-4 rounded-xl ${
        theme === 'dark' 
          ? 'bg-gray-800/40 border border-gray-700' 
          : 'bg-gray-50 border border-gray-200'
      }`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Buscar por IP, dispositivo o navegador..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-all ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                } focus:outline-none`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Filtros y acciones */}
          <div className="flex flex-wrap gap-2">
            {/* Filtros de estado */}
            <div className={`flex rounded-lg p-1 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              {[
                { value: 'all', label: 'Todos', icon: Filter },
                { value: 'accepted', label: 'Aceptados', icon: CheckCircle },
                { value: 'rejected', label: 'Rechazados', icon: XCircle }
              ].map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => { setFilterStatus(value as any); setPage(1); }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    filterStatus === value
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-blue-600 shadow-sm'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-gray-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span><TranslateText text={label} /></span>
                </button>
              ))}
            </div>

            {/* Botones de acción */}
            <button
              onClick={() => setShowUserAgent(!showUserAgent)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                theme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title={showUserAgent ? "Ocultar User Agent" : "Mostrar User Agent"}
            >
              {showUserAgent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden sm:inline">User Agent</span>
            </button>

            <button
              onClick={handleExport}
              disabled={filteredData.length === 0}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filteredData.length === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : theme === 'dark'
                    ? 'bg-green-700 text-white hover:bg-green-600'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </div>
        </div>

        {/* Contadores */}
        <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-gray-700/30">
          <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <TranslateText text="Mostrando" /> {Math.min(filteredData.length, pageSize)} <TranslateText text="de" /> {filteredData.length} <TranslateText text="registros" />
          </span>
          <span className={`text-sm ${
            theme === 'dark' 
              ? filterStatus === 'accepted' ? 'text-emerald-400' : 
                filterStatus === 'rejected' ? 'text-rose-400' : 
                'text-gray-400'
              : filterStatus === 'accepted' ? 'text-emerald-600' : 
                filterStatus === 'rejected' ? 'text-rose-600' : 
                'text-gray-600'
          }`}>
            {filterStatus === 'all' && <TranslateText text="Todos los estados" />}
            {filterStatus === 'accepted' && <TranslateText text="Solo aceptados" />}
            {filterStatus === 'rejected' && <TranslateText text="Solo rechazados" />}
          </span>
          {selectedRows.size > 0 && (
            <span className={`text-sm px-2 py-1 rounded-full ${
              theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
            }`}>
              {selectedRows.size} <TranslateText text="seleccionados" />
            </span>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div className={`rounded-xl border overflow-hidden ${
        theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}>
                <th className="px-4 py-3 w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={toggleSelectAll}
                    className={`rounded ${
                      theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-blue-500' 
                        : 'bg-white border-gray-300 text-blue-600'
                    }`}
                  />
                </th>
                <th 
                  className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-700/20 transition-colors"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span><TranslateText text="Fecha" /></span>
                    <ChevronsUpDown className={`w-3 h-3 ${
                      sortField === 'timestamp' ? 'opacity-100' : 'opacity-30'
                    }`} />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left font-semibold cursor-pointer hover:bg-gray-700/20 transition-colors"
                  onClick={() => handleSort('ip')}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span><TranslateText text="Dirección IP" /></span>
                    <ChevronsUpDown className={`w-3 h-3 ${
                      sortField === 'ip' ? 'opacity-100' : 'opacity-30'
                    }`} />
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-center font-semibold cursor-pointer hover:bg-gray-700/20 transition-colors"
                  onClick={() => handleSort('accepted')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span><TranslateText text="Estado" /></span>
                    <ChevronsUpDown className={`w-3 h-3 ${
                      sortField === 'accepted' ? 'opacity-100' : 'opacity-30'
                    }`} />
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4" />
                    <span><TranslateText text="Dispositivo" /></span>
                  </div>
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  <span><TranslateText text="Acciones" /></span>
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${
              theme === 'dark' ? 'divide-gray-700/50' : 'divide-gray-100'
            }`}>
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className={`w-12 h-12 mb-4 ${
                        theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
                      }`} />
                      <p className={`text-base font-medium mb-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        <TranslateText text="No se encontraron registros" />
                      </p>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {searchTerm 
                          ? <TranslateText text="Intenta con otros términos de búsqueda" />
                          : filterStatus !== 'all'
                            ? <TranslateText text="Prueba con otro filtro de estado" />
                            : <TranslateText text="No hay datos disponibles" />
                        }
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => {
                  const deviceInfo = getDeviceInfo(row.user_agent);
                  const absoluteIndex = (page - 1) * pageSize + i;
                  const isSelected = selectedRows.has(i);
                  
                  return (
                    <tr
                      key={absoluteIndex}
                      className={`transition-colors ${
                        isSelected
                          ? theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50'
                          : theme === 'dark' ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(i)}
                          className={`rounded ${
                            theme === 'dark' 
                              ? 'bg-gray-700 border-gray-600 text-blue-500' 
                              : 'bg-white border-gray-300 text-blue-600'
                          }`}
                        />
                      </td>
                      <td className={`px-4 py-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div className="flex flex-col">
                          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {new Date(row.timestamp).toLocaleDateString('es-ES', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </span>
                          <div className="flex items-center gap-1 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>
                              {new Date(row.timestamp).toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">
                              {formatRelativeTime(row.timestamp)}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                            theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {row.ip}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            {row.ip.startsWith('192.168.') || row.ip.startsWith('10.') || row.ip.startsWith('172.')
                              ? 'Local/Privada' : 'Pública'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.accepted ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                            theme === 'dark' 
                              ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}>
                            <CheckCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Aceptado" />
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                            theme === 'dark' 
                              ? 'bg-rose-600/20 text-rose-400 border border-rose-500/30' 
                              : 'bg-rose-100 text-rose-700 border border-rose-200'
                          }`}>
                            <XCircle className="w-3.5 h-3.5" />
                            <TranslateText text="Rechazado" />
                          </span>
                        )}
                      </td>
                      <td className={`px-4 py-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{deviceInfo.deviceIcon}</span>
                              <span className="text-sm font-medium">
                                {deviceInfo.device}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm">{deviceInfo.browserIcon}</span>
                              <span className="text-xs">{deviceInfo.browser}</span>
                              <span className="text-xs text-gray-500">•</span>
                              <span className="text-xs text-gray-500">{deviceInfo.os}</span>
                            </div>
                          </div>
                        </div>
                        {showUserAgent && (
                          <div className={`mt-2 p-2 rounded text-xs font-mono truncate ${
                            theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {row.user_agent}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <button className={`p-1.5 rounded-lg hover:bg-gray-700/30 transition-colors ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación mejorada */}
        {totalPages > 1 && (
          <div className={`px-4 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <span><TranslateText text="Página" /> {page} <TranslateText text="de" /> {totalPages}</span>
              <span className="mx-2">•</span>
              <span>
                <TranslateText text="Mostrando" /> {((page - 1) * pageSize) + 1}-{Math.min(page * pageSize, filteredData.length)} <TranslateText text="de" /> {filteredData.length} <TranslateText text="registros" />
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Navegación rápida */}
              <div className={`flex rounded-lg p-1 ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <button 
                  onClick={() => setPage(1)} 
                  disabled={page === 1}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all disabled:opacity-40 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TranslateText text="Primera" />
                </button>
                
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  className={`p-2 rounded transition-all disabled:opacity-40 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                {/* Números de página */}
                <div className="flex items-center mx-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                          page === pageNum
                            ? theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-600 text-white'
                            : theme === 'dark'
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {totalPages > 5 && page < totalPages - 2 && (
                    <>
                      <span className="px-1 text-gray-500">...</span>
                      <button
                        onClick={() => setPage(totalPages)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                          theme === 'dark'
                            ? 'text-gray-300 hover:bg-gray-700'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages}
                  className={`p-2 rounded transition-all disabled:opacity-40 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={() => setPage(totalPages)} 
                  disabled={page === totalPages}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all disabled:opacity-40 ${
                    theme === 'dark' 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <TranslateText text="Última" />
                </button>
              </div>
              
              {/* Selector de tamaño de página */}
              <div className={`flex items-center gap-2 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span><TranslateText text="Por página" />:</span>
                <select
                  value={pageSize}
                  onChange={() => {}}
                  className={`px-2 py-1 rounded border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}