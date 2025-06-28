import React from 'react';
import { BuildingIcon, MapPinIcon, UsersIcon, ClockIcon } from 'lucide-react';
const CompanyInfo = () => {
  // This would typically come from an API or context in a real application
  const companyInfo = {
    name: 'Offshore Solutions Ltd',
    logo: 'https://via.placeholder.com/80x80/61398B/FFFFFF?text=OS',
    industry: 'Oil & Gas',
    location: 'Aberdeen, Scotland',
    established: '2005',
    employees: '250+',
    status: 'active',
    lastActive: 'Today at 10:45 AM'
  };
  return <div className="bg-white rounded-card shadow-sm border border-gray-100 p-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <img src={companyInfo.logo} alt={companyInfo.name} className="w-14 h-14 rounded-lg object-cover" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {companyInfo.name}
          </h2>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <BuildingIcon size={14} className="mr-1" />
            <span>{companyInfo.industry}</span>
            <span className="mx-2">•</span>
            <MapPinIcon size={14} className="mr-1" />
            <span>{companyInfo.location}</span>
          </div>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${companyInfo.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {companyInfo.status === 'active' ? 'Active' : 'Inactive'}
          </span>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <ClockIcon size={12} className="mr-1" />
            <span>{companyInfo.lastActive}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-500 block">Established</span>
          <span className="font-medium text-sm">{companyInfo.established}</span>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Employees</span>
          <div className="flex items-center">
            <UsersIcon size={14} className="text-headspace-purple mr-1" />
            <span className="font-medium text-sm">{companyInfo.employees}</span>
          </div>
        </div>
        <div>
          <span className="text-xs text-gray-500 block">Projects</span>
          <span className="font-medium text-sm">27 Active</span>
        </div>
      </div>
    </div>;
};
export default CompanyInfo;