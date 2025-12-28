import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  FileText, 
  UserPlus, 
  ClipboardCheck, 
  Microscope, 
  CheckCircle2, 
  XCircle,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Clock
} from 'lucide-react';

// --- Local Components reusing ShadCN patterns ---

const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border border-gray-200 bg-white text-gray-950 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ className = '', variant = 'default', children, ...props }) => {
  const variants = {
    default: 'border-transparent bg-[#151542] text-white',
    outline: 'text-gray-950 border-gray-200',
    success: 'border-transparent bg-green-50 text-green-700',
    warning: 'border-transparent bg-amber-50 text-amber-700',
    danger: 'border-transparent bg-red-50 text-red-700',
    info: 'border-transparent bg-blue-50 text-blue-700',
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Stepper = ({ activeStep, steps, onStepChange }) => (
  <div className="flex items-center justify-between w-full mb-8 relative">
    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-gray-100 -z-10" />
    {steps.map((step, index) => {
       const isActive = activeStep === step.id;
       const isCompleted = steps.findIndex(s => s.id === activeStep) > index;
       
       return (
          <button 
             key={step.id} 
             onClick={() => onStepChange(step.id)}
             className={`flex flex-col items-center gap-2 bg-white px-4`}
          >
             <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors
                ${isActive ? 'border-[#151542] text-[#151542] bg-blue-50' : 
                  isCompleted ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200 text-gray-400'}
             `}>
                {isCompleted ? <CheckCircle2 className="w-5 h-5"/> : step.icon}
             </div>
             <span className={`text-sm font-medium ${isActive ? 'text-[#151542]' : 'text-gray-500'}`}>{step.label}</span>
          </button>
       );
    })}
  </div>
);

// --- Dummy Data & State Logic ---

const ManChangeManagement = () => {
  const [activeStage, setActiveStage] = useState('request');

  const [requests, setRequests] = useState([
     { id: 1, line: "Assembly Line 4", position: "Station 3 (Soldering)", originalOp: "Suresh K.", newOp: "Ravi M.", reason: "Absenteeism", duration: "2 Days", status: "Validating", skillGap: "None" },
     { id: 2, line: "Packing Line 1", position: "Final Inspection", originalOp: "Anita R.", newOp: "Deepak S.", reason: "Resignation", duration: "Permanent", status: "Trial Run", skillGap: "Minor" },
  ]);

  const stages = [
     { id: 'request', label: '1. Change Request', icon: <FileText className="w-4 h-4"/> },
     { id: 'validation', label: '2. Validation Check', icon: <ClipboardCheck className="w-4 h-4"/> },
     { id: 'trial', label: '3. Trial & Quality', icon: <Microscope className="w-4 h-4"/> },
     { id: 'approval', label: '4. Final Approval', icon: <ShieldCheck className="w-4 h-4"/> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-8 h-8 text-[#151542]" />
            5M Change Management (Man)
          </h1>
          <p className="text-gray-500 mt-1">Control manpower changes, ensure compliance, and validate quality.</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-4 py-2 bg-amber-50 text-amber-700 border-amber-100 flex flex-col items-center">
              <span className="text-2xl font-bold">2</span>
              <span className="text-xs uppercase font-bold">Active Changes</span>
           </Card>
           <Button className="bg-[#151542] hover:bg-[#151542]/90">
             <UserPlus className="w-4 h-4 mr-2"/> Initiate New Change
           </Button>
        </div>
      </div>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStage} steps={stages} onStepChange={setActiveStage} />

      {/* --- STAGE 1: REQUEST --- */}
      {activeStage === 'request' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-blue-600"/> Open Change Requests</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requests.map(req => (
                     <div key={req.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors flex flex-col gap-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2">
                           <Badge variant={req.status === 'Trial Run' ? 'warning' : 'info'}>{req.status}</Badge>
                        </div>
                        <div>
                           <h4 className="font-semibold text-gray-900">{req.line}</h4>
                           <p className="text-xs text-gray-500">{req.position}</p>
                        </div>
                        <div className="text-sm space-y-1 bg-gray-50 p-2 rounded">
                           <div className="flex justify-between"><span>Original:</span> <span className="font-medium">{req.originalOp}</span></div>
                           <div className="flex justify-between"><span>Replacement:</span> <span className="font-medium text-blue-600">{req.newOp}</span></div>
                        </div>
                        <div className="flex gap-2 text-xs text-gray-500 mt-1">
                           <span className="flex items-center gap-1"><AlertOctagon className="w-3 h-3"/> {req.reason}</span>
                           <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {req.duration}</span>
                        </div>
                        <Button size="sm" variant="outline" className="mt-2 text-xs">View Details</Button>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      )}

      {/* --- STAGE 2: VALIDATION --- */}
      {activeStage === 'validation' && (
         <div className="space-y-6">
             <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><ClipboardCheck className="w-4 h-4 text-blue-600"/> Skill & Capability Validation</h3>
                  <div className="text-sm text-gray-500">Validation Required for: <strong>Ravi M.</strong></div>
               </div>

               <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex gap-8 items-center mb-6">
                     <div>
                        <span className="block text-xs uppercase text-gray-500 font-bold">Replacement</span>
                        <span className="text-lg font-bold text-gray-900">Ravi M.</span>
                        <Badge variant="success" className="ml-2">Skill L2</Badge>
                     </div>
                     <ArrowRight className="text-gray-400"/>
                     <div>
                        <span className="block text-xs uppercase text-gray-500 font-bold">Target Process</span>
                        <span className="text-lg font-bold text-gray-900">Station 3 (Soldering)</span>
                        <Badge variant="outline" className="ml-2">Critical Process</Badge>
                     </div>
                  </div>

                  <div className="space-y-4 mb-6">
                     <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                        <span className="text-sm font-medium">1. Skill Matrix Level Match</span>
                        <Badge variant="success" className="bg-green-100 text-green-800">Matched</Badge>
                     </div>
                     <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                        <span className="text-sm font-medium">2. Process Knowledge Training</span>
                        <Badge variant="success" className="bg-green-100 text-green-800">Completed (100%)</Badge>
                     </div>
                     <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
                        <span className="text-sm font-medium">3. Safety Induction</span>
                        <Badge variant="success" className="bg-green-100 text-green-800">Verified</Badge>
                     </div>
                  </div>

                  <div className="flex justify-end gap-3">
                     <Button variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200">Reject Change</Button>
                     <Button className="bg-green-600 hover:bg-green-700 text-white">Approve for Trial Run</Button>
                  </div>
               </div>
             </Card>
         </div>
      )}

      {/* --- STAGE 3: TRIAL & QUALITY --- */}
      {activeStage === 'trial' && (
         <div className="space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Microscope className="w-4 h-4 text-purple-600"/> Trial Run & QC Check</h3>
                  <Badge variant="warning">Trial Active</Badge>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-blue-100 bg-blue-50/50 rounded-lg">
                     <div>
                        <h4 className="font-semibold text-gray-900">Deepak S. (Packing Line 1)</h4>
                        <p className="text-xs text-gray-500">Trial Quantity: 10 Pieces</p>
                     </div>
                     <div className="flex gap-4">
                        <div className="text-center">
                           <span className="block text-lg font-bold text-green-600">10</span>
                           <span className="text-[10px] uppercase text-gray-500">OK Parts</span>
                        </div>
                        <div className="text-center">
                           <span className="block text-lg font-bold text-gray-400">0</span>
                           <span className="text-[10px] uppercase text-gray-500">NG Parts</span>
                        </div>
                     </div>
                     <Button size="sm" className="bg-purple-600 text-white hover:bg-purple-700">QC Sign-off</Button>
                  </div>
               </div>
            </Card>
         </div>
      )}

      {/* --- STAGE 4: FINAL APPROVAL --- */}
      {activeStage === 'approval' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-600"/> Final Management Approval</h3>
               
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-3">Change ID</th>
                        <th className="px-6 py-3">Line/Process</th>
                        <th className="px-6 py-3">Change Details</th>
                        <th className="px-6 py-3">Validation</th>
                        <th className="px-6 py-3">Trial Result</th>
                        <th className="px-6 py-3 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     <tr className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">#MC-2024-002</td>
                        <td className="px-6 py-4 font-medium text-gray-900">Packing Line 1</td>
                        <td className="px-6 py-4">Deepak S. (Repl.)</td>
                        <td className="px-6 py-4"><Badge variant="success">Passed</Badge></td>
                        <td className="px-6 py-4 text-green-600 font-bold">10/10 OK</td>
                        <td className="px-6 py-4 text-right">
                           <Button size="sm" className="bg-[#151542] text-white h-8">Final Authorize</Button>
                        </td>
                     </tr>
                  </tbody>
               </table>
            </Card>
         </div>
      )}
    </div>
  );
};

export default ManChangeManagement;
