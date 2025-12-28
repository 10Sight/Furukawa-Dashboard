import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Sparkles, 
  UserCheck, 
  FileText, 
  ClipboardCheck, 
  MonitorCheck, 
  CheckCircle2,
  XCircle,
  RefreshCw,
  Award,
  BookOpen
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

const SkillUpgradation = () => {
  const [activeStage, setActiveStage] = useState('eligibility');

  const [employees, setEmployees] = useState([
     { id: 1, name: "Rahul Sharma", dept: "Assembly", currentLevel: "L1", targetLevel: "L2", eligibility: "Tenure > 6mo", status: "Eligible" },
     { id: 2, name: "Amit Verma", dept: "Quality", currentLevel: "L2", targetLevel: "L3", eligibility: "Attendance > 95%", status: "Pending Eval" },
     { id: 3, name: "Priya Singh", dept: "Logistics", currentLevel: "L1", targetLevel: "Multi-Skill", eligibility: "Supervisor Rec", status: "Failed" },
  ]);

  const stages = [
     { id: 'eligibility', label: '1. Eligibility Check', icon: <Sparkles className="w-4 h-4"/> },
     { id: 'evaluation', label: '2. Digital Evaluation', icon: <MonitorCheck className="w-4 h-4"/> },
     { id: 'results', label: '3. Results & Matrix', icon: <Award className="w-4 h-4"/> },
     { id: 'reeducation', label: '4. Re-Education', icon: <RefreshCw className="w-4 h-4"/> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-[#151542]" />
            Skill Upgradation Cycle
          </h1>
          <p className="text-gray-500 mt-1">Manage employee progression, assessment, and matrix updates.</p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 text-green-700 border-green-200">
          Cycle: Q4 2024 (Active)
        </Badge>
      </div>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStage} steps={stages} onStepChange={setActiveStage} />

      {/* --- STAGE 1: ELIGIBILITY --- */}
      {activeStage === 'eligibility' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-amber-500"/> Auto-Detected Eligible Candidates</h3>
               <p className="text-sm text-gray-500 mb-6">Based on Biometric Attendance and ESS Tenure data.</p>
               
               <div className="grid grid-cols-1 gap-4">
                  {employees.filter(e => e.status === 'Eligible' || e.status === 'Pending Eval').map(emp => (
                     <div key={emp.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                              {emp.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                              <p className="text-xs text-gray-500">{emp.dept} • Target: {emp.targetLevel}</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-6">
                           <div className="text-right">
                              <span className="block text-xs text-gray-400">Trigger</span>
                              <Badge variant="info">{emp.eligibility}</Badge>
                           </div>
                           <Button size="sm" className="bg-[#151542] text-white hover:bg-[#151542]/90 h-9">
                              Approve for Assessment
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      )}

      {/* --- STAGE 2: EVALUATION --- */}
      {activeStage === 'evaluation' && (
         <div className="space-y-6">
             <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><MonitorCheck className="w-4 h-4 text-blue-600"/> Digital Skill Evaluation</h3>
                  <div className="text-sm text-gray-500">Showing 1 Pending Evaluation</div>
               </div>

               <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex justify-between mb-6">
                     <div>
                        <h4 className="font-bold text-lg text-gray-900">Amit Verma</h4>
                        <p className="text-sm text-gray-500">Upgrading to L3 (Quality Inspector)</p>
                     </div>
                     <Badge variant="warning">In Progress</Badge>
                  </div>

                  <div className="space-y-4 mb-6">
                     <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <label className="text-sm font-medium block mb-2">1. Can identify micro-defects in PCB assembly?</label>
                        <div className="flex gap-4">
                           <label className="flex items-center gap-2 text-sm"><input type="radio" name="q1" className="accent-[#151542]"/> Yes, Consistently</label>
                           <label className="flex items-center gap-2 text-sm"><input type="radio" name="q1" className="accent-[#151542]"/> Needs Assistance</label>
                        </div>
                     </div>
                     <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <label className="text-sm font-medium block mb-2">2. Proficient in using digital calipers?</label>
                        <div className="flex gap-4">
                           <label className="flex items-center gap-2 text-sm"><input type="radio" name="q2" className="accent-[#151542]"/> Yes, Expert</label>
                           <label className="flex items-center gap-2 text-sm"><input type="radio" name="q2" className="accent-[#151542]"/> Basic Knowledge</label>
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-end gap-3">
                     <Button variant="outline">Save Draft</Button>
                     <Button className="bg-green-600 hover:bg-green-700 text-white">Submit Score</Button>
                  </div>
               </div>
             </Card>
         </div>
      )}

      {/* --- STAGE 3: RESULTS & MATRIX --- */}
      {activeStage === 'results' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 border-l-4 border-l-green-500">
                  <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-gray-900">Successful Upgrades</h3>
                        <p className="text-sm text-gray-500">Matrix updated automatically.</p>
                     </div>
                     <CheckCircle2 className="w-6 h-6 text-green-500"/>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg text-green-800">
                        <span className="font-medium">Amit Verma</span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs">L2 &rarr; L3</span>
                           <Badge variant="success" className="bg-green-200 text-green-800">Updated</Badge>
                        </div>
                     </div>
                  </div>
               </Card>

               <Card className="p-6 border-l-4 border-l-red-500">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                        <h3 className="font-bold text-gray-900">Failed Assessments</h3>
                        <p className="text-sm text-gray-500">Moved to re-education queue.</p>
                     </div>
                     <XCircle className="w-6 h-6 text-red-500"/>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg text-red-800">
                        <span className="font-medium">Priya Singh</span>
                        <div className="flex items-center gap-2">
                           <span className="text-xs">Score: 65%</span>
                           <Badge variant="danger" className="bg-red-200 text-red-800">Re-Train</Badge>
                        </div>
                     </div>
                  </div>
               </Card>
            </div>
         </div>
      )}

      {/* --- STAGE 4: RE-EDUCATION --- */}
      {activeStage === 'reeducation' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2"><BookOpen className="w-4 h-4 text-purple-600"/> Re-Education & Retraining Queue</h3>
               
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Employee</th>
                        <th className="px-6 py-4">Failed Assessment</th>
                        <th className="px-6 py-4">Gap Analysis</th>
                        <th className="px-6 py-4">Training Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     <tr className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 font-medium text-gray-900">Priya Singh</td>
                        <td className="px-6 py-4">Multi-Skill (Logistics)</td>
                        <td className="px-6 py-4 text-gray-500">Safety Compliance failed</td>
                        <td className="px-6 py-4"><Badge variant="warning">In Training (Day 2/5)</Badge></td>
                        <td className="px-6 py-4 text-right">
                           <Button size="sm" variant="outline" className="h-8 text-xs">View Training Log</Button>
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

export default SkillUpgradation;
