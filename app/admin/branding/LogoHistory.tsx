"use client";

import React, { useState, useEffect } from "react";
import { TranslateText } from '@/components/TranslateText';
import { 
  ExternalLink, Eye, Check, Clock, Calendar, 
  Image, Edit2, Save, X, History, Download, 
  Trash2, Tag, Filter, Search, ChevronLeft, 
  ChevronRight, Loader2, AlertTriangle, Grid,
  RefreshCw, Info, Box, Zap
} from 'lucide-react';

interface Logo {
  filename: string;
  path?: string;
  thumbnail?: string | null;
  webp?: string | null;
  avif?: string | null;
  alt?: string | null;
  upload_date?: string;
  size?: number;
  width?: number;
  height?: number;
  is_active?: boolean;
  tags?: string[];
}

interface LogoHistoryProps {
  logoHistory: Logo[];
  onSelectLogo: (filename: string) => void;
  onUpdateMeta?: (filename: string, alt: string) => void;
  onDeleteLogo?: (filename: string) => void;
  onRefresh?: () => void;
  theme?: 'light' | 'dark';
  loading?: boolean;
}

export const LogoHistory: React.FC<LogoHistoryProps> = ({ 
  logoHistory, 
  onSelectLogo, 
  onUpdateMeta,
  onDeleteLogo,
  onRefresh,
  theme = 'light',
  loading = false
}) => {
  // Remove any references to environment variables and ensure the hardcoded API URL is used
  const apiUrl = 'http://localhost:5000';

  const [viewing, setViewing] = useState<Logo | null>(null);
  const [editingAlt, setEditingAlt] = useState(false);
  const [altValue, setAltValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  // Extraer todos los tags únicos
  const allTags = Array.from(new Set(
    logoHistory.flatMap(logo => logo.tags || [])
  )).sort();

  // Filtrar y ordenar logos
  const filteredLogos = logoHistory
    .filter(logo => {
      // Filtrar por búsqueda
      const matchesSearch = !searchTerm || 
        logo.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (logo.alt && logo.alt.toLowerCase().includes(searchTerm.toLowerCase()));
      
      // Filtrar por tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => logo.tags?.includes(tag));
      
      return matchesSearch && matchesTags;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          const dateA = a.upload_date ? new Date(a.upload_date).getTime() : 0;
          const dateB = b.upload_date ? new Date(b.upload_date).getTime() : 0;
          comparison = dateB - dateA;
          break;
        case 'name':
          comparison = a.filename.localeCompare(b.filename);
          break;
        case 'size':
          comparison = (a.size || 0) - (b.size || 0);
          break;
      }
      
      return sortOrder === 'desc' ? comparison : -comparison;
    });

  // Paginación
  const totalPages = Math.ceil(filteredLogos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLogos = filteredLogos.slice(startIndex, startIndex + itemsPerPage);

  // Resetear página cuando cambian filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedTags, sortBy, sortOrder]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSortBy('date');
    setSortOrder('desc');
  };

  const handleDownload = async (filename: string) => {
    try {
      setDownloading(filename);
      const url = `${apiUrl}/uploads/branding/${filename}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(null);
    }
  };

  const formatFileSize = (bytes: number | undefined) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (logoHistory.length === 0) return null;

  return (
    <div className="mt-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
            <History size={20} />
          </div>
          <div>
            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              <TranslateText text="Historial de Logos" />
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <TranslateText text="Gestiona todos tus logos subidos" />
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
            {filteredLogos.length} de {logoHistory.length} logos
          </div>
          
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={loading}
              className={`p-2 rounded-lg transition-all ${loading ? 'cursor-wait' : ''} ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Refrescar"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className={`mb-6 p-4 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/30 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Barra de búsqueda */}
          <div className="flex-1">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar logos por nombre o texto alternativo..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-sm border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                }`}
              />
            </div>
          </div>

          {/* Selector de orden */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className={`px-3 py-2.5 rounded-lg text-sm border ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option value="date">Ordenar por fecha</option>
              <option value="name">Ordenar por nombre</option>
              <option value="size">Ordenar por tamaño</option>
            </select>
            
            <button
              onClick={() => setSortOrder(order => order === 'asc' ? 'desc' : 'asc')}
              className={`px-3 py-2.5 rounded-lg text-sm border font-medium ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {sortOrder === 'asc' ? '↑ Asc' : '↓ Desc'}
            </button>
            
            {(searchTerm || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className={`px-3 py-2.5 rounded-lg text-sm border font-medium ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Filter size={16} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
              <span className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Filtrar por etiquetas:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1 ${
                    selectedTags.includes(tag)
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 text-blue-700 border border-blue-300'
                      : theme === 'dark'
                        ? 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Tag size={12} />
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Grid de logos */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 dark:border-emerald-900 border-t-emerald-600 dark:border-t-emerald-500 animate-spin mb-4"></div>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Cargando historial de logos...
          </p>
        </div>
      ) : filteredLogos.length === 0 ? (
        <div className={`text-center py-16 rounded-xl ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-gray-50'}`}>
          <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <Image className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'} size={32} />
          </div>
          <p className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            No se encontraron logos
          </p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
            {searchTerm || selectedTags.length > 0 
              ? 'Prueba con otros términos de búsqueda o elimina los filtros'
              : 'Sube tu primer logo para comenzar'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedLogos.map((logo) => (
              <div 
                key={logo.filename} 
                className={`group relative rounded-xl p-4 transition-all duration-300 ${
                  logo.is_active
                    ? theme === 'dark'
                      ? 'bg-linear-to-br from-emerald-900/20 to-emerald-800/10 border-emerald-800/30'
                      : 'bg-linear-to-br from-emerald-50 to-emerald-100/50 border-emerald-200'
                    : theme === 'dark'
                      ? 'bg-gray-800/30 hover:bg-gray-800/50 border-gray-700'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                } border hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Badge para logo activo */}
                {logo.is_active && (
                  <div className="absolute -top-2 -right-2 bg-linear-to-r from-emerald-500 to-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium shadow-lg z-10">
                    Activo
                  </div>
                )}
                
                {/* Thumbnail */}
                <div className="relative mb-4">
                  <div className={`aspect-square rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} p-4`}>
                    <img 
                      src={logo.thumbnail ? `${apiUrl}${logo.thumbnail}` : `${apiUrl}/uploads/branding/${logo.filename}`} 
                      alt={logo.alt || logo.filename}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay de acciones */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                      <button 
                        onClick={() => setViewing(logo)}
                        className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all"
                        title="Vista previa"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => onSelectLogo(logo.filename)}
                        className="p-2 rounded-full bg-emerald-500/80 hover:bg-emerald-500 text-white backdrop-blur-sm transition-all"
                        title="Usar este logo"
                      >
                        <Check size={16} />
                      </button>
                      <button 
                        onClick={() => setViewing(logo)}
                        className="p-2 rounded-full bg-blue-500/80 hover:bg-blue-500 text-white backdrop-blur-sm transition-all"
                        title="Más información"
                      >
                        <Info size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Información */}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`font-semibold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} title={logo.filename}>
                        {logo.filename}
                      </h3>
                      {onDeleteLogo && !logo.is_active && (
                        <button
                          onClick={() => setShowDeleteConfirm(logo.filename)}
                          className={`p-1 rounded transition-colors ${
                            theme === 'dark'
                              ? 'text-gray-500 hover:text-red-400'
                              : 'text-gray-400 hover:text-red-600'
                          }`}
                          title="Eliminar"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    
                    {logo.upload_date && (
                      <div className="flex items-center gap-2 text-xs mt-1">
                        <Calendar size={12} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
                          {formatDate(logo.upload_date)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap gap-2">
                    {logo.size && (
                      <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        <Box className="inline-block w-3 h-3 mr-1" /> {formatFileSize(logo.size)}
                      </span>
                    )}
                    {logo.width && logo.height && (
                      <span className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        <Zap className="inline-block w-3 h-3 mr-1" /> {logo.width}×{logo.height}px
                      </span>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {logo.tags && logo.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {logo.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-0.5 rounded text-xs ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {logo.tags.length > 3 && (
                        <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          +{logo.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {/* Acciones rápidas */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                    <button
                      onClick={() => handleDownload(logo.filename)}
                      disabled={downloading === logo.filename}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        downloading === logo.filename
                          ? theme === 'dark'
                            ? 'bg-gray-700 text-gray-500 cursor-wait'
                            : 'bg-gray-200 text-gray-400 cursor-wait'
                          : theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {downloading === logo.filename ? (
                        <Loader2 size={12} className="animate-spin mx-auto" />
                      ) : (
                        <span className="flex items-center gap-1 justify-center">
                          <Download size={12} />
                          Descargar
                        </span>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setViewing(logo)}
                      className={`flex-1 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                        theme === 'dark'
                          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Mostrando {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredLogos.length)} de {filteredLogos.length} logos
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-lg text-sm font-medium ${
                          currentPage === pageNum
                            ? theme === 'dark'
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-600 text-white'
                            : theme === 'dark'
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-400'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
                
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value={6}>6 por página</option>
                  <option value={9}>9 por página</option>
                  <option value={12}>12 por página</option>
                  <option value={24}>24 por página</option>
                </select>
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowDeleteConfirm(null)}
          />
          <div className={`relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600'}`}>
                <AlertTriangle size={24} />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  <TranslateText text="¿Eliminar logo?" />
                </h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  <TranslateText text="Esta acción no se puede deshacer" />
                </p>
              </div>
            </div>
            
            <div className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                <TranslateText text="Estás a punto de eliminar el logo:" />
              </p>
              <p className={`font-medium mt-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {showDeleteConfirm}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <TranslateText text="Cancelar" />
              </button>
              <button 
                onClick={() => {
                  if (onDeleteLogo) onDeleteLogo(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="flex-1 px-4 py-3 rounded-lg font-medium bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all shadow-lg hover:shadow-xl"
              >
                <TranslateText text="Eliminar" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de vista detallada */}
      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => { setViewing(null); setEditingAlt(false); }}
          />
          <div className={`relative ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn`}>
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-linear-to-r from-transparent via-black/5 to-transparent backdrop-blur-sm border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                  <Image className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
                </div>
                <div className="max-w-lg">
                  <h3 className={`text-xl font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {viewing.filename}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm">
                    {viewing.upload_date && (
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Clock size={12} />
                        {formatDate(viewing.upload_date)}
                      </span>
                    )}
                    {viewing.size && (
                      <span className={theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}>
                        • {formatFileSize(viewing.size)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <button 
                onClick={() => { setViewing(null); setEditingAlt(false); }}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                aria-label="Cerrar"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Contenido */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Imagen */}
                <div className="flex items-center justify-center">
                  <div className={`w-full max-w-md rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-8`}>
                    <img 
                      src={viewing.webp ? `${apiUrl}${viewing.webp}` : (viewing.avif ? `${apiUrl}${viewing.avif}` : `${apiUrl}/uploads/branding/${viewing.filename}`)} 
                      alt={viewing.alt || viewing.filename}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
                
                {/* Información */}
                <div className="space-y-6">
                  {/* Metadata */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <TranslateText text="Información del archivo" />
                    </h4>
                    <div className={`grid grid-cols-2 gap-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {viewing.width && viewing.height && (
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                          <div className="text-xs mb-1">Dimensiones</div>
                          <div className="font-medium">{viewing.width} × {viewing.height}px</div>
                        </div>
                      )}
                      {viewing.size && (
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                          <div className="text-xs mb-1">Tamaño</div>
                          <div className="font-medium">{formatFileSize(viewing.size)}</div>
                        </div>
                      )}
                      {viewing.upload_date && (
                        <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                          <div className="text-xs mb-1">Subido</div>
                          <div className="font-medium">{formatDate(viewing.upload_date)}</div>
                        </div>
                      )}
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
                        <div className="text-xs mb-1">Estado</div>
                        <div className="font-medium">
                          {viewing.is_active ? (
                            <span className="text-emerald-600 dark:text-emerald-400">✓ Activo</span>
                          ) : (
                            <span>Inactivo</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Texto alternativo */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className={`text-sm font-semibold ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          <TranslateText text="Texto Alternativo" />
                        </h4>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                          <TranslateText text="Importante para SEO y accesibilidad" />
                        </p>
                      </div>
                      
                      {!editingAlt && onUpdateMeta && (
                        <button 
                          onClick={() => { setAltValue(viewing.alt || ''); setEditingAlt(true); }}
                          className={`text-sm flex items-center gap-1 transition-colors duration-150 ${
                            theme === 'dark'
                              ? 'text-blue-400 hover:text-blue-300'
                              : 'text-blue-600 hover:text-blue-800'
                          }`}
                        >
                          <Edit2 size={14} />
                          <TranslateText text="Editar" />
                        </button>
                      )}
                    </div>
                    
                    {!editingAlt ? (
                      <div className={`px-4 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-50 text-gray-700'} ${!viewing.alt ? 'italic text-gray-400' : ''}`}>
                        {viewing.alt || <TranslateText text="Sin texto alternativo definido" />}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <textarea 
                          value={altValue}
                          onChange={(e) => setAltValue(e.target.value)}
                          className={`w-full px-4 py-3 rounded-lg text-sm border transition-all duration-200 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent ${
                            theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
                          }`}
                          rows={4}
                          placeholder="Describe este logo para motores de búsqueda y accesibilidad..."
                          autoFocus
                        />
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => setEditingAlt(false)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors duration-150 flex items-center gap-2 text-sm ${
                              theme === 'dark'
                                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                            }`}
                          >
                            <X size={16} />
                            <TranslateText text="Cancelar" />
                          </button>
                          <button 
                            className="px-4 py-2 rounded-lg font-medium bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-150 flex items-center gap-2 text-sm shadow-lg hover:shadow-xl"
                            onClick={async () => { 
                              if (onUpdateMeta) await onUpdateMeta(viewing.filename, altValue); 
                              setEditingAlt(false); 
                            }}
                          >
                            <Save size={16} />
                            <TranslateText text="Guardar cambios" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Tags */}
                  {viewing.tags && viewing.tags.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        <TranslateText text="Etiquetas" />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {viewing.tags.map(tag => (
                          <span
                            key={tag}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                              theme === 'dark'
                                ? 'bg-blue-900/30 text-blue-300'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            <Tag size={12} className="inline mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Acciones */}
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleDownload(viewing.filename)}
                        disabled={downloading === viewing.filename}
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          downloading === viewing.filename
                            ? theme === 'dark'
                              ? 'bg-gray-700 text-gray-500 cursor-wait'
                              : 'bg-gray-200 text-gray-400 cursor-wait'
                            : theme === 'dark'
                              ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                              : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                      >
                        {downloading === viewing.filename ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Download size={18} />
                        )}
                        <span>
                          {downloading === viewing.filename ? 'Descargando...' : 'Descargar'}
                        </span>
                      </button>
                      
                      <a 
                        href={`http://localhost:5000/uploads/branding/${viewing.filename}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          theme === 'dark'
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'
                            : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
                        }`}
                      >
                        <ExternalLink size={18} />
                        <TranslateText text="Abrir original" />
                      </a>
                      
                      <button 
                        className="flex-1 px-4 py-3 rounded-lg font-medium bg-linear-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        onClick={() => { 
                          onSelectLogo(viewing.filename); 
                          setViewing(null); 
                          setEditingAlt(false);
                        }}
                      >
                        <Check size={18} />
                        <TranslateText text="Usar este logo" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};