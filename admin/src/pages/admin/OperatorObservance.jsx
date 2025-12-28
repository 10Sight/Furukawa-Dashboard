import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Eye, 
  Calendar, 
  ClipboardList, 
  Award, 
  FileOutput,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  Search,
  BookOpen,
  ArrowUpCircle
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

const OperatorObservance = () => {
  const [activeStage, setActiveStage] = useState('cycle');

  const [operators, setOperators] = useState([
     { id: 1, name: "Rahul Sharma", role: "Operator L1", cycleDay: 12, mentor: "Suresh P.", obsStatus: 'Pending', skillStatus: 'L1' },
     { id: 2, name: "Amit Verma", role: "Operator L0", cycleDay: 4, mentor: "Rajesh K.", obsStatus: 'Pending', skillStatus: 'L0' },
     { id: 3, name: "Sneha Gupta", role: "Operator L1", cycleDay: 16, mentor: "Priya M.", obsStatus: 'Conformity', skillStatus: 'Ready for L2' },
  ]);

  const stages = [
     { id: 'cycle', label: '1. 16-Day Cycle', icon: <Calendar className="w-4 h-4"/> },
     { id: 'observation', label: '2. Supervisor Obs.', icon: <ClipboardList className="w-4 h-4"/> },
     { id: 'evaluation', label: '3. Skill Evaluation', icon: <Award className="w-4 h-4"/> },
     { id: 'matrix', label: '4. Matrix & Reports', icon: <FileOutput className="w-4 h-4"/> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Eye className="w-8 h-8 text-[#151542]" />
            Operator Observance
          </h1>
          <p className="text-gray-500 mt-1">Monitor performance, ensure compliance, and manage skill upgrades.</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-100 flex flex-col items-center">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs uppercase font-bold">Active Cycles</span>
           </Card>
           <Card className="px-4 py-2 bg-amber-50 text-amber-700 border-amber-100 flex flex-col items-center">
              <span className="text-2xl font-bold">3</span>
              <span className="text-xs uppercase font-bold">Pending Obs</span>
           </Card>
        </div>
      </div>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStage} steps={stages} onStepChange={setActiveStage} />

      {/* --- STAGE 1: 16-DAY CYCLE --- */}
      {activeStage === 'cycle' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-600"/> 16-Day Observation Tracker</h3>
               <div className="space-y-4">
                  {operators.map(op => (
                     <div key={op.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                 {op.name.charAt(0)}
                              </div>
                              <div>
                                 <h4 className="font-semibold text-gray-900">{op.name}</h4>
                                 <p className="text-xs text-gray-500">Mentor: {op.mentor}</p>
                              </div>
                           </div>
                           <Badge variant={op.cycleDay >= 16 ? 'success' : 'info'}>Day {op.cycleDay}/16</Badge>
                        </div>
                        <div className="space-y-1">
                           <div className="flex justify-between text-xs text-gray-500">
                              <span>Progress</span>
                              <span>{Math.round((op.cycleDay / 16) * 100)}%</span>
                           </div>
                           <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#151542]" style={{ width: `${(op.cycleDay / 16) * 100}%` }}></div>
                           </div>
                        </div>
                        <div className="mt-3 flex justify-end gap-2">
                           <Button size="sm" variant="outline" className="h-7 text-xs">View Daily Log</Button>
                           <Button size="sm" variant="ghost" className="h-7 text-xs text-blue-600"><UserCheck className="w-3 h-3 mr-1"/> Biometric Check</Button>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      )}

      {/* --- STAGE 2: OBSERVATION --- */}
      {activeStage === 'observation' && (
         <div className="space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-amber-600"/> Monthly Supervisor Observance</h3>
                  <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                     <input type="text" placeholder="Search operator..." className="pl-9 h-9 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-[#151542]" />
                  </div>
               </div>
               
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Operator</th>
                        <th className="px-6 py-4">Observation Frequency</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {operators.map(op => (
                        <tr key={op.id} className="hover:bg-gray-50/50">
                           <td className="px-6 py-4 font-medium text-gray-900">{op.name}</td>
                           <td className="px-6 py-4 text-gray-500">Monthly (Due: Dec 2024)</td>
                           <td className="px-6 py-4">
                              <Badge variant={op.obsStatus === 'Conformity' ? 'success' : op.obsStatus === 'Pending' ? 'warning' : 'danger'}>
                                 {op.obsStatus}
                              </Badge>
                           </td>
                           <td className="px-6 py-4 text-right">
                              {op.obsStatus === 'Pending' && (
                                 <Button size="sm" className="bg-[#151542] text-white hover:bg-[#151542]/90 h-8 text-xs">Start Observation</Button>
                              )}
                              {op.obsStatus === 'Conformity' && (
                                 <Button variant="ghost" size="sm" className="text-green-600 h-8 text-xs cursor-default">Passed</Button>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg flex items-start gap-3">
               <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
               <div>
                  <h4 className="font-semibold text-amber-800 text-sm">Non-Conformity Trigger</h4>
                  <p className="text-xs text-amber-700 mt-1">If "Non-Conformity" is selected, the operator will be flagged for <b>Re-education</b> and <b>Containment</b> (retroactive inspection of last 2 hours work).</p>
               </div>
            </div>
         </div>
      )}

      {/* --- STAGE 3: SKILL EVALUATION --- */}
      {activeStage === 'evaluation' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 border-l-4 border-l-purple-500">
                  <h3 className="font-bold text-gray-900 mb-2">Ready for Upgrade (L1 → L2)</h3>
                  <p className="text-sm text-gray-500 mb-4">Operators who completed mandatory period.</p>
                  
                  {operators.filter(o => o.skillStatus === 'Ready for L2').map(op => (
                     <div key={op.id} className="flex flex-col gap-3 p-3 bg-gray-50 rounded-lg mb-3">
                        <div className="flex justify-between">
                           <span className="font-medium text-gray-900">{op.name}</span>
                           <Badge variant="info">Eligible</Badge>
                        </div>
                        <div className="flex gap-2">
                           <Button size="sm" className="flex-1 h-8 text-xs bg-purple-600 hover:bg-purple-700 text-white">
                              <BookOpen className="w-3 h-3 mr-1"/> Start L2 Exam
                           </Button>
                           <Button size="sm" variant="outline" className="h-8 text-xs">Notify Supervisor</Button>
                        </div>
                     </div>
                  ))}
                  {operators.filter(o => o.skillStatus === 'Ready for L2').length === 0 && (
                     <p className="text-sm text-gray-400 italic">No eligible operators found.</p>
                  )}
               </Card>
               
               <Card className="p-6 border-l-4 border-l-red-500">
                  <h3 className="font-bold text-gray-900 mb-2">Re-Education Required</h3>
                  <p className="text-sm text-gray-500 mb-4">Non-conformity cases requiring intervention.</p>
                  <p className="text-sm text-gray-400 italic">No operators currently in re-education.</p>
               </Card>
            </div>
         </div>
      )}

      {/* --- STAGE 4: MATRIX & REPORTS --- */}
      {activeStage === 'matrix' && (
         <div className="space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><FileOutput className="w-4 h-4 text-indigo-600"/> Skill Matrix Update</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500">Last Synced:</span>
                     <Badge variant="outline">Today, 09:00 AM</Badge>
                  </div>
               </div>
               
               <table className="w-full text-sm text-left">
                  <thead className="bg-[#151542] text-white">
                     <tr>
                        <th className="px-6 py-3">Operator Name</th>
                        <th className="px-6 py-3">Current Department</th>
                        <th className="px-6 py-3">Previous Skill</th>
                        <th className="px-6 py-3">New Skill</th>
                        <th className="px-6 py-3">Notification</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     <tr className="bg-green-50/50">
                        <td className="px-6 py-3 font-medium text-gray-900">Sneha Gupta</td>
                        <td className="px-6 py-3 text-gray-600">Assembly Line</td>
                        <td className="px-6 py-3 text-gray-500">L1</td>
                        <td className="px-6 py-3 font-bold text-green-600 flex items-center gap-1"><ArrowUpCircle className="w-4 h-4"/> L2</td>
                        <td className="px-6 py-3"><Badge variant="success">Sent</Badge></td>
                     </tr>
                  </tbody>
               </table>
            </Card>
         </div>
      )}
    </div>
  );
};

export default OperatorObservance;
