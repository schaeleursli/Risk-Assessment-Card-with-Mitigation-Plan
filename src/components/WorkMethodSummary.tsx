import React, { useState } from 'react';
import { ArrowLeftIcon, FileTextIcon, PrinterIcon } from 'lucide-react';
import { sampleOperations, sampleCargoes, sampleWorkMethods } from '../data/sampleData';
import RAMSChart from './RAMSChart';
import MitigationList from './MitigationList';
import EquipmentSummary from './EquipmentSummary';
import PDFGenerator from './PDFGenerator';
type WorkMethodSummaryProps = {
  workMethodId: string;
  onBack: () => void;
};
const WorkMethodSummary = ({
  workMethodId,
  onBack
}: WorkMethodSummaryProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'rams' | 'mitigations' | 'equipment' | 'cargo'>('overview');
  const [showMitigationView, setShowMitigationView] = useState<'pre' | 'post'>('pre');
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const workMethod = sampleWorkMethods.find(wm => wm.id === workMethodId);
  const operations = sampleOperations.filter(op => op.workMethodId === workMethodId);
  const equipment = sampleCargoes.filter(cargo => cargo.workMethodId === workMethodId);
  const cargoes = sampleCargoes.filter(cargo => cargo.workMethodId === workMethodId);
  if (!workMethod) {
    return <div>Work Method not found</div>;
  }
  return <div>
      <div className="flex items-center mb-6">
        <button className="mr-4 p-2 rounded-full hover:bg-gray-200" onClick={onBack}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-headspace-purple">
          {workMethod.title} - Summary
        </h2>
        <button className="ml-auto bg-headspace-purple text-white px-4 py-2 rounded-card flex items-center" onClick={() => setShowPdfPreview(true)}>
          <FileTextIcon className="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="bg-white rounded-card shadow-card mb-6 overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'overview' ? 'bg-headspace-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('overview')}>
            Overview
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'cargo' ? 'bg-headspace-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('cargo')}>
            Cargo
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'equipment' ? 'bg-headspace-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('equipment')}>
            Equipment
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'mitigations' ? 'bg-headspace-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('mitigations')}>
            Mitigation Plans
          </button>
          <button className={`px-6 py-3 text-sm font-medium ${activeTab === 'rams' ? 'bg-headspace-orange text-white' : 'text-gray-600 hover:bg-gray-50'}`} onClick={() => setActiveTab('rams')}>
            RAMS Chart
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'overview' && <div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <span className="text-sm text-gray-500">Document Number</span>
                  <p className="font-medium">{workMethod.documentNumber}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Revision</span>
                  <p className="font-medium">{workMethod.revision}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Date</span>
                  <p className="font-medium">{workMethod.date}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="text-sm text-gray-500">Operation Types</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {workMethod.operationTypes.map(type => <span key={type} className="bg-headspace-purple px-3 py-1 rounded-full text-sm text-white">
                      {type}
                    </span>)}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-3">
                  Operation Steps Summary
                </h3>
                <div className="space-y-3">
                  {operations.map((operation, index) => <div key={operation.id} className="bg-gray-50 p-4 rounded-card">
                      <div className="flex justify-between">
                        <span className="font-medium">
                          Step {index + 1}: {operation.selectedOperation}
                        </span>
                        <span className="bg-headspace-purple text-white px-2 py-0.5 rounded-full text-xs">
                          {operation.selectedEquipment}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {operation.description}
                      </p>
                    </div>)}
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-3">Equipment Summary</h3>
                <div className="space-y-3">
                  {equipment.map(item => <div key={item.id} className="bg-gray-50 p-4 rounded-card">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.description}</span>
                        <span className="text-headspace-orange font-medium">
                          {item.tagNumber}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.dimensions.length}mm × {item.dimensions.width}mm ×{' '}
                        {item.dimensions.height}mm |{' '}
                        {(item.weight / 1000).toFixed(1)} tonnes
                      </p>
                    </div>)}
                </div>
              </div>
            </div>}
          {activeTab === 'rams' && <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-lg">
                  Risk Assessment Matrix Summary
                </h3>
                <div className="flex bg-gray-100 rounded-full p-1">
                  <button className={`px-4 py-1.5 text-sm font-medium rounded-full ${showMitigationView === 'pre' ? 'bg-headspace-orange text-white' : 'text-gray-600'}`} onClick={() => setShowMitigationView('pre')} aria-label="Show pre-mitigation risk levels">
                    Pre-Mitigation
                  </button>
                  <button className={`px-4 py-1.5 text-sm font-medium rounded-full ${showMitigationView === 'post' ? 'bg-headspace-orange text-white' : 'text-gray-600'}`} onClick={() => setShowMitigationView('post')} aria-label="Show post-mitigation risk levels">
                    Post-Mitigation
                  </button>
                </div>
              </div>
              <RAMSChart operations={operations} showMitigationView={showMitigationView} />
            </div>}
          {activeTab === 'mitigations' && <MitigationList operations={operations} />}
          {activeTab === 'equipment' && <EquipmentSummary equipment={equipment} />}
          {activeTab === 'cargo' && <EquipmentSummary equipment={cargoes} />}
        </div>
      </div>
      {showPdfPreview && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-card w-full max-w-4xl max-h-[90vh] overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Work Method Statement Report
              </h3>
              <div className="flex space-x-2">
                <button className="bg-headspace-purple text-white px-4 py-2 rounded-card flex items-center" onClick={() => window.print()}>
                  <PrinterIcon className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded-card" onClick={() => setShowPdfPreview(false)}>
                  Close
                </button>
              </div>
            </div>
            <PDFGenerator workMethod={workMethod} operations={operations} equipment={equipment} />
          </div>
        </div>}
    </div>;
};
export default WorkMethodSummary;