import React from 'react';
import { sampleProjects } from '../data/sampleData';
import { FileTextIcon, FileIcon, ImageIcon } from 'lucide-react';
type PDFGeneratorProps = {
  workMethod: any;
  operations: any[];
  equipment: any[];
};
const PDFGenerator = ({
  workMethod,
  operations,
  equipment
}: PDFGeneratorProps) => {
  const project = sampleProjects.find(p => p.id === workMethod.projectId);
  // Mock data for demonstration
  const authorInfo = {
    name: 'Jane Smith',
    position: 'Safety Engineer',
    date: new Date().toLocaleDateString(),
    signature: 'JS'
  };
  const approvalInfo = {
    name: 'Michael Johnson',
    position: 'Project Manager',
    date: new Date().toLocaleDateString(),
    signature: 'MJ'
  };
  // Mock supporting documents
  const supportingDocuments = [{
    id: 'doc1',
    title: 'Risk Assessment Methodology',
    type: 'pdf',
    date: '2023-04-15',
    author: 'Safety Department',
    pages: 12,
    thumbnail: 'https://via.placeholder.com/100x140/f0f0f0/666666?text=PDF'
  }, {
    id: 'doc2',
    title: 'Equipment Specifications',
    type: 'pdf',
    date: '2023-03-22',
    author: 'Engineering Team',
    pages: 8,
    thumbnail: 'https://via.placeholder.com/100x140/f0f0f0/666666?text=PDF'
  }, {
    id: 'doc3',
    title: 'Site Survey Photos',
    type: 'image',
    date: '2023-05-01',
    author: 'Site Team',
    pages: 5,
    thumbnail: 'https://via.placeholder.com/100x140/f0f0f0/666666?text=IMG'
  }, {
    id: 'doc4',
    title: 'Regulatory Compliance Checklist',
    type: 'pdf',
    date: '2023-04-30',
    author: 'Compliance Officer',
    pages: 3,
    thumbnail: 'https://via.placeholder.com/100x140/f0f0f0/666666?text=PDF'
  }];
  return <div className="bg-white p-6 print:p-0">
      <div className="mb-8 border-b pb-4 print:pb-6">
        <h1 className="text-2xl font-bold text-headspace-purple mb-2 text-center">
          Work Method Statement
        </h1>
        <div className="text-center text-sm text-gray-500 mb-4">
          Document No: {workMethod.documentNumber} | Revision:{' '}
          {workMethod.revision}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <h2 className="text-lg font-bold mb-2">{project?.name}</h2>
            <div className="text-sm">
              <div>
                <span className="font-medium">Location:</span>{' '}
                {project?.location}, {project?.country}
              </div>
              <div>
                <span className="font-medium">Project Type:</span>{' '}
                {project?.type}
              </div>
              <div>
                <span className="font-medium">Status:</span> {project?.status}
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-1">Work Method Details</h3>
            <div className="text-sm">
              <div>
                <span className="font-medium">Title:</span> {workMethod.title}
              </div>
              <div>
                <span className="font-medium">Date:</span> {workMethod.date}
              </div>
              <div>
                <span className="font-medium">Location:</span>{' '}
                {workMethod.location}
              </div>
              <div className="mt-1">
                <span className="font-medium">Operation Types:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {workMethod.operationTypes.map((type: string) => <span key={type} className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
                      {type}
                    </span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Table of Contents */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-headspace-purple">
          Table of Contents
        </h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <span className="font-medium mr-2">1.</span>
            <a href="#scope" className="text-headspace-blue hover:underline">
              Scope of Work
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">2.</span>
            <a href="#equipment" className="text-headspace-blue hover:underline">
              Equipment
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">3.</span>
            <a href="#operations" className="text-headspace-blue hover:underline">
              Operation Steps
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">4.</span>
            <a href="#risk" className="text-headspace-blue hover:underline">
              Risk Assessment Summary
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">5.</span>
            <a href="#authorization" className="text-headspace-blue hover:underline">
              Authorization
            </a>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-2">6.</span>
            <a href="#documents" className="text-headspace-blue hover:underline">
              Supporting Documents
            </a>
          </li>
        </ul>
      </div>
      {/* List of Supporting Documents */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          Supporting Documents
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Document Title</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Author</th>
                <th className="px-4 py-2 text-left">Pages</th>
              </tr>
            </thead>
            <tbody>
              {supportingDocuments.map(doc => <tr key={doc.id} className="border-b">
                  <td className="px-4 py-2 font-medium">{doc.title}</td>
                  <td className="px-4 py-2 uppercase text-xs">
                    <span className={`inline-flex items-center px-2 py-1 rounded ${doc.type === 'pdf' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                      {doc.type === 'pdf' ? <FileTextIcon className="w-3 h-3 mr-1" /> : <ImageIcon className="w-3 h-3 mr-1" />}
                      {doc.type}
                    </span>
                  </td>
                  <td className="px-4 py-2">{doc.date}</td>
                  <td className="px-4 py-2">{doc.author}</td>
                  <td className="px-4 py-2">{doc.pages}</td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div id="scope" className="mb-8">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          1. Scope of Work
        </h2>
        <p className="text-sm mb-4">
          This Work Method Statement covers the procedures, risks, and controls
          for {workMethod.title}
          at {workMethod.location}. It includes {operations.length} operation
          steps and {equipment.length} equipment items.
        </p>
        <p className="text-sm">{project?.description}</p>
      </div>
      <div id="equipment" className="mb-8">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">2. Equipment</h2>
        <div className="space-y-4">
          {equipment.map(item => <div key={item.id} className="border p-3 rounded">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.description}</h3>
                <span className="text-sm">{item.tagNumber}</span>
              </div>
              <div className="text-sm mt-1">
                Dimensions: {item.dimensions.length} × {item.dimensions.width} ×{' '}
                {item.dimensions.height} mm | Weight:{' '}
                {(item.weight / 1000).toFixed(1)} tonnes
              </div>
            </div>)}
        </div>
      </div>
      <div id="operations" className="mb-8">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          3. Operation Steps
        </h2>
        <div className="space-y-4">
          {operations.map((operation, index) => <div key={operation.id} className="border p-3 rounded">
              <h3 className="font-medium">
                Step {index + 1}: {operation.selectedOperation}
              </h3>
              <div className="text-sm mt-1">
                <div>
                  <span className="font-medium">Equipment:</span>{' '}
                  {operation.selectedEquipment}
                </div>
                <div className="mt-1">
                  <span className="font-medium">Description:</span>{' '}
                  {operation.description}
                </div>
              </div>
              {/* Mock risk and mitigation data */}
              <div className="mt-3 pt-2 border-t">
                <div className="text-sm">
                  <div className="font-medium">Risk Assessment:</div>
                  <div className="flex justify-between mt-1">
                    <div>
                      Pre-mitigation:{' '}
                      <span className="bg-risk-high text-white px-2 py-0.5 rounded text-xs">
                        High
                      </span>
                    </div>
                    <div>
                      Post-mitigation:{' '}
                      <span className="bg-risk-low text-white px-2 py-0.5 rounded text-xs">
                        Low
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm mt-2">
                  <div className="font-medium">Mitigation Measures:</div>
                  <ul className="list-disc list-inside mt-1">
                    <li>Ensure proper training for all personnel</li>
                    <li>Inspect equipment before use</li>
                    <li>Establish clear communication protocols</li>
                    <li>Use appropriate PPE at all times</li>
                  </ul>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      <div id="risk" className="mb-8">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          4. Risk Assessment Summary
        </h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="col-span-3 font-medium">Key Risks:</div>
          {operations.map((operation, index) => <div key={operation.id} className="border p-2 rounded">
              <div className="font-medium">{operation.selectedOperation}</div>
              <div className="text-xs mt-1">Initial Risk: High</div>
              <div className="text-xs">Residual Risk: Low</div>
            </div>)}
        </div>
      </div>
      <div id="authorization" className="mb-4">
        <h2 className="text-lg font-bold mb-4 border-b pb-2">
          5. Authorization
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium mb-2">Prepared By:</h3>
            <div className="text-sm">
              <div>Name: {authorInfo.name}</div>
              <div>Position: {authorInfo.position}</div>
              <div>Date: {authorInfo.date}</div>
              <div className="mt-4 border-b border-black w-32 pb-1 text-center font-bold">
                {authorInfo.signature}
              </div>
              <div className="text-xs text-center mt-1">Signature</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Approved By:</h3>
            <div className="text-sm">
              <div>Name: {approvalInfo.name}</div>
              <div>Position: {approvalInfo.position}</div>
              <div>Date: {approvalInfo.date}</div>
              <div className="mt-4 border-b border-black w-32 pb-1 text-center font-bold">
                {approvalInfo.signature}
              </div>
              <div className="text-xs text-center mt-1">Signature</div>
            </div>
          </div>
        </div>
      </div>
      {/* Document Attachments Section */}
      <div id="documents" className="mt-10 pt-8 border-t">
        <h2 className="text-lg font-bold mb-6 text-headspace-purple">
          6. Supporting Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportingDocuments.map(doc => <div key={doc.id} className="border rounded-lg overflow-hidden shadow-sm flex">
              <div className="w-24 h-32 flex-shrink-0">
                <img src={doc.thumbnail} alt={`${doc.title} thumbnail`} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex-1">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-sm">{doc.title}</h3>
                  {doc.type === 'pdf' ? <FileIcon className="w-4 h-4 text-red-500" /> : <ImageIcon className="w-4 h-4 text-blue-500" />}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <div>Author: {doc.author}</div>
                  <div>Date: {doc.date}</div>
                  <div>Pages: {doc.pages}</div>
                </div>
                <div className="mt-3">
                  <button className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-gray-700 transition-colors">
                    View Document
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>
      <div className="text-xs text-center text-gray-500 mt-8 pt-4 border-t">
        This document is confidential and intended for authorized personnel
        only.
        <br />
        Generated on {new Date().toLocaleDateString()} at{' '}
        {new Date().toLocaleTimeString()}
      </div>
    </div>;
};
export default PDFGenerator;