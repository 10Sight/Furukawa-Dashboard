import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  GraduationCap, 
  MonitorPlay, 
  Wrench, 
  ClipboardCheck, 
  FileCheck,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  ArrowRight,
  Award,
  BookOpen,
  UserCheck,
  Send
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

const TrainingProcess = () => {
  const [activeStage, setActiveStage] = useState('digital');

  const [trainees, setTrainees] = useState([
     { id: 1, name: "Rahul Sharma", role: "Operator", digitalScore: 85, practicalStatus: 'Pending', skillLevel: 'L0' },
     { id: 2, name: "Amit Verma", role: "Technician", digitalScore: 45, practicalStatus: 'Pending', skillLevel: 'L0' },
     { id: 3, name: "Sneha Gupta", role: "Supervisor", digitalScore: 92, practicalStatus: 'Pass', skillLevel: 'L1' },
  ]);

  const stages = [
     { id: 'digital', label: '1. Common Digital Training', icon: <MonitorPlay className="w-4 h-4"/> },
     { id: 'practical', label: '2. Practical Training', icon: <Wrench className="w-4 h-4"/> },
     { id: 'handover', label: '3. Process Handover', icon: <ArrowRight className="w-4 h-4"/> },
     { id: 'reports', label: '4. Final Reports', icon: <FileCheck className="w-4 h-4"/> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap className="w-8 h-8 text-[#151542]" />
          New Hire Training Process
        </h1>
        <p className="text-gray-500 mt-1">Manage induction, evaluation, and handover workflows.</p>
      </div>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStage} steps={stages} onStepChange={setActiveStage} />

      {/* --- STAGE 1: DIGITAL TRAINING --- */}
      {activeStage === 'digital' && (
         <div className="space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-4 h-4 text-blue-600"/> Digital Induction & Exam</h3>
                  <Badge variant="info">Batch #2024-12-A</Badge>
               </div>
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Trainee</th>
                        <th className="px-6 py-4">Biometric Status</th>
                        <th className="px-6 py-4">Training Progress</th>
                        <th className="px-6 py-4">Exam Score</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {trainees.map(t => (
                        <tr key={t.id} className="hover:bg-gray-50/50">
                           <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                           <td className="px-6 py-4"><Badge variant="success">Verified</Badge></td>
                           <td className="px-6 py-4">
                              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                 <div className="h-full bg-green-500 w-full"></div>
                              </div>
                              <span className="text-xs text-gray-500">100% Completed</span>
                           </td>
                           <td className="px-6 py-4">
                              {t.digitalScore >= 50 ? (
                                 <Badge variant="success">{t.digitalScore}% (Pass)</Badge>
                              ) : (
                                 <Badge variant="danger">{t.digitalScore}% (Fail)</Badge>
                              )}
                           </td>
                           <td className="px-6 py-4 text-right">
                              {t.digitalScore < 50 && (
                                 <Button size="sm" variant="outline" className="h-7 text-xs border-amber-200 text-amber-700 hover:bg-amber-50">Retake Exam</Button>
                              )}
                              {t.digitalScore >= 50 && (
                                 <span className="text-xs text-green-600 flex items-center justify-end gap-1"><CheckCircle2 className="w-3 h-3"/> E-Matrix Reg.</span>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>
         </div>
      )}

      {/* --- STAGE 2: PRACTICAL TRAINING --- */}
      {activeStage === 'practical' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {trainees.filter(t => t.digitalScore >= 50).map(t => (
                  <Card key={t.id} className="p-5">
                     <div className="flex justify-between items-start mb-4">
                        <div>
                           <h4 className="font-bold text-gray-900">{t.name}</h4>
                           <p className="text-sm text-gray-500">{t.role} - Assembly Line A</p>
                        </div>
                        <Badge variant={t.practicalStatus === 'Pass' ? 'success' : 'warning'}>{t.practicalStatus}</Badge>
                     </div>
                     <div className="space-y-3 mb-4 bg-gray-50 p-3 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                           {t.practicalStatus === 'Pass' ? <CheckCircle2 className="w-4 h-4 text-green-500"/> : <div className="w-4 h-4 rounded-full border border-gray-300"/>}
                           <span>SOP Knowledge</span>
                        </div>
                        <div className="flex items-center gap-2">
                           {t.practicalStatus === 'Pass' ? <CheckCircle2 className="w-4 h-4 text-green-500"/> : <div className="w-4 h-4 rounded-full border border-gray-300"/>}
                           <span>Safety Awareness</span>
                        </div>
                        <div className="flex items-center gap-2">
                           {t.practicalStatus === 'Pass' ? <CheckCircle2 className="w-4 h-4 text-green-500"/> : <div className="w-4 h-4 rounded-full border border-gray-300"/>}
                           <span>Machine Handling</span>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        <Button className="flex-1 bg-[#151542] text-white hover:bg-[#151542]/90 h-8 text-xs">Evaluate</Button>
                        <Button variant="outline" className="h-8 text-xs">View Log</Button>
                     </div>
                  </Card>
               ))}
            </div>
         </div>
      )}

      {/* --- STAGE 3: HANDOVER --- */}
      {activeStage === 'handover' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Send className="w-4 h-4 text-purple-600"/> Production Handover</h3>
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Trainee</th>
                        <th className="px-6 py-4">Final Skill Level</th>
                        <th className="px-6 py-4">Assigned Department</th>
                        <th className="px-6 py-4">Handover Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {trainees.filter(t => t.practicalStatus === 'Pass').map(t => (
                        <tr key={t.id} className="hover:bg-gray-50/50">
                           <td className="px-6 py-4 font-medium text-gray-900">{t.name}</td>
                           <td className="px-6 py-4"><Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100">{t.skillLevel}</Badge></td>
                           <td className="px-6 py-4 text-gray-600">Assembly (Line A)</td>
                           <td className="px-6 py-4"><span className="text-amber-600 text-xs font-semibold uppercase">Pending Release</span></td>
                           <td className="px-6 py-4 text-right">
                              <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 h-8 text-xs gap-1">
                                 <UserCheck className="w-3 h-3"/> Release to DOJO
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>
         </div>
      )}

      {/* --- STAGE 4: REPORTS --- */}
      {activeStage === 'reports' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
               <Card className="p-4 bg-blue-50 border-blue-100">
                  <span className="text-xs font-bold text-blue-600 uppercase">Joined</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">3</div>
               </Card>
               <Card className="p-4 bg-indigo-50 border-indigo-100">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Digital Pass</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">2</div>
               </Card>
               <Card className="p-4 bg-purple-50 border-purple-100">
                  <span className="text-xs font-bold text-purple-600 uppercase">Practical Pass</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">1</div>
               </Card>
               <Card className="p-4 bg-green-50 border-green-100">
                  <span className="text-xs font-bold text-green-600 uppercase">Handover</span>
                  <div className="text-2xl font-bold text-gray-900 mt-1">0</div>
               </Card>
            </div>

            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Final Manpower Handover Report</h3>
                  <Button variant="outline" size="sm" className="gap-2"><ClipboardCheck className="w-4 h-4"/> Download Report</Button>
               </div>
               <div className="p-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400">
                  <FileCheck className="w-12 h-12 mb-2 opacity-20"/>
                  <p>No final reports generated yet. Complete the handover process first.</p>
               </div>
            </Card>
         </div>
      )}
    </div>
  );
};

export default TrainingProcess;
