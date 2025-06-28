import React from 'react';
import { FileIcon, ImageIcon } from 'lucide-react';
type EquipmentSummaryProps = {
  equipment: any[];
};
const EquipmentSummary = ({
  equipment
}: EquipmentSummaryProps) => {
  return <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {equipment.map(item => <div key={item.id} className="bg-white border rounded-card overflow-hidden shadow-sm">
            {item.attachments.some((att: any) => att.type === 'image') ? <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={item.attachments.find((att: any) => att.type === 'image')?.url || ''} alt={item.description} className="w-full h-full object-cover" />
              </div> : <div className="h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-center p-4">
                  <div className="text-6xl mb-2">📦</div>
                  <div className="text-sm">No image available</div>
                </div>
              </div>}
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{item.description}</h3>
                <span className="bg-headspace-orange text-white px-2 py-0.5 rounded-full text-xs">
                  {item.tagNumber}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                <div>
                  <span className="text-xs text-gray-500">Length</span>
                  <p className="text-sm">{item.dimensions.length} mm</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Width</span>
                  <p className="text-sm">{item.dimensions.width} mm</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Height</span>
                  <p className="text-sm">{item.dimensions.height} mm</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Weight</span>
                  <p className="text-sm">
                    {(item.weight / 1000).toFixed(1)} tonnes
                  </p>
                </div>
              </div>
              {item.attachments.length > 0 && <div>
                  <h4 className="text-xs font-medium mb-2">Attachments</h4>
                  <div className="space-y-1">
                    {item.attachments.map((attachment: any, idx: number) => <div key={idx} className="flex items-center text-xs bg-gray-50 p-2 rounded">
                        {attachment.type === 'pdf' ? <FileIcon className="h-3 w-3 text-red-500 mr-2" /> : attachment.type === 'image' && idx > 0 ? <ImageIcon className="h-3 w-3 text-blue-500 mr-2" /> : null}
                        <span className="truncate">{attachment.name}</span>
                      </div>)}
                  </div>
                </div>}
            </div>
          </div>)}
      </div>
      {equipment.length === 0 && <div className="text-center py-8">
          <p className="text-gray-500">No equipment records available</p>
        </div>}
    </div>;
};
export default EquipmentSummary;