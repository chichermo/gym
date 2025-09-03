import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Table, Calendar, BarChart3, Users } from 'lucide-react';

interface ReportData {
  title: string;
  data: any[];
  type: 'progress' | 'workouts' | 'analytics' | 'social';
}

interface ReportExporterProps {
  onExport: (format: 'pdf' | 'excel', data: ReportData) => void;
  availableReports: ReportData[];
}

const ReportExporter: React.FC<ReportExporterProps> = ({ onExport, availableReports }) => {
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf');
  const [isExporting, setIsExporting] = useState(false);

  const getReportIcon = (type: ReportData['type']) => {
    switch (type) {
      case 'progress':
        return <BarChart3 className="w-5 h-5" />;
      case 'workouts':
        return <Calendar className="w-5 h-5" />;
      case 'analytics':
        return <Table className="w-5 h-5" />;
      case 'social':
        return <Users className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getReportColor = (type: ReportData['type']) => {
    switch (type) {
      case 'progress':
        return 'from-blue-500 to-indigo-600';
      case 'workouts':
        return 'from-green-500 to-emerald-600';
      case 'analytics':
        return 'from-purple-500 to-pink-600';
      case 'social':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleExport = async () => {
    if (!selectedReport) return;

    setIsExporting(true);
    try {
      // Simular proceso de exportación
      await new Promise(resolve => setTimeout(resolve, 2000));
      onExport(exportFormat, selectedReport);
    } catch (error) {
      console.error('Error exporting report:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
            <Download className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Exportar Reportes</h3>
            <p className="text-gray-600">Descarga tus datos en PDF o Excel</p>
          </div>
        </div>
      </div>

      {/* Report Selection */}
      <div className="bg-gradient-to-br from-white to-green-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Seleccionar Reporte</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableReports.map((report) => (
            <motion.div
              key={report.title}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedReport(report)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedReport?.title === report.title
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-br ${getReportColor(report.type)} rounded-lg`}>
                  {getReportIcon(report.type)}
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">{report.title}</h5>
                  <p className="text-sm text-gray-600">{report.data.length} registros</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Format Selection */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-purple-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
        >
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Formato de Exportación</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExportFormat('pdf')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                exportFormat === 'pdf'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">PDF</h5>
                  <p className="text-sm text-gray-600">Formato para imprimir y compartir</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setExportFormat('excel')}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                exportFormat === 'excel'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                  <Table className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h5 className="font-semibold text-gray-800">Excel</h5>
                  <p className="text-sm text-gray-600">Formato para análisis y edición</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Export Button */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-yellow-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Exportar Reporte</h4>
              <p className="text-gray-600">
                {selectedReport.title} - {exportFormat.toUpperCase()}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Exportando...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Exportar
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Export History */}
      <div className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Historial de Exportaciones</h4>
        <div className="space-y-3">
          {[
            { name: 'Reporte de Progreso', format: 'PDF', date: '2024-01-15' },
            { name: 'Análisis de Entrenamientos', format: 'Excel', date: '2024-01-10' },
            { name: 'Métricas Sociales', format: 'PDF', date: '2024-01-05' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.format} - {item.date}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Descargar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportExporter; 