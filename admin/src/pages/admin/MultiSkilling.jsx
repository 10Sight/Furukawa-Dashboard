import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Combine, 
  Users, 
  BookOpen, 
  MonitorPlay, 
  ClipboardCheck, 
  CheckCircle2,
  XCircle,
  PlusCircle,
  Award,
  ArrowRight
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

const MultiSkilling = () => {
  const [activeStage, setActiveStage] = useState('eligibility');

  const [employees, setEmployees] = useState([
     { id: 1, name: "Suresh Patel", primary: "Assembly", secondary: "Packaging", status: "In Training", progress: 60, score: null },
     { id: 2, name: "Anita Roy", primary: "Quality Check", secondary: "Inventory", status: "Eligible", progress: 0, score: null },
     { id: 3, name: "Dev Kumar", primary: "Machining", secondary: "Maintenance", status: "Completed", progress: 100, score: 92 },
  ]);

  const stages = [
     { id: 'eligibility', label: '1. Eligibility & Assign', icon: <Users className="w-4 h-4"/> },
     { id: 'training', label: '2. Training Phase', icon: <BookOpen className="w-4 h-4"/> },
     { id: 'evaluation', label: '3. Digital Evaluation', icon: <MonitorPlay className="w-4 h-4"/> },
     { id: 'matrix', label: '4. Matrix & Reports', icon: <Award className="w-4 h-4"/> },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Combine className="w-8 h-8 text-[#151542]" />
            Multi-Skilling Program
          </h1>
          <p className="text-gray-500 mt-1">Cross-train employees, enhance flexibility, and update skill matrix.</p>
        </div>
        <div className="flex gap-4">
           <Card className="px-4 py-2 bg-blue-50 text-blue-700 border-blue-100 flex flex-col items-center">
              <span className="text-2xl font-bold">5</span>
              <span className="text-xs uppercase font-bold">In Training</span>
           </Card>
           <Card className="px-4 py-2 bg-green-50 text-green-700 border-green-100 flex flex-col items-center">
              <span className="text-2xl font-bold">12</span>
              <span className="text-xs uppercase font-bold">Certified</span>
           </Card>
        </div>
      </div>

      {/* Stepper Navigation */}
      <Stepper activeStep={activeStage} steps={stages} onStepChange={setActiveStage} />

      {/* --- STAGE 1: ELIGIBILITY --- */}
      {activeStage === 'eligibility' && (
         <div className="space-y-6">
            <Card className="p-6">
               <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><PlusCircle className="w-4 h-4 text-blue-600"/> Assign Secondary Skills</h3>
               <p className="text-sm text-gray-500 mb-6">Employees eligible for multi-skilling based on 12+ months tenure and 95% attendance.</p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {employees.filter(e => e.status === 'Eligible').map(emp => (
                     <div key={emp.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                              <p className="text-xs text-gray-500">Primary: {emp.primary}</p>
                           </div>
                           <Badge variant="info">Eligible</Badge>
                        </div>
                        <div className="flex gap-2 items-center text-sm">
                           <span>Suggest:</span>
                           <select className="bg-white border border-gray-300 rounded px-2 py-1 text-xs">
                              <option>{emp.secondary}</option>
                              <option>Logistics</option>
                              <option>Safety Audit</option>
                           </select>
                        </div>
                        <Button size="sm" className="bg-[#151542] text-white hover:bg-[#151542]/90 h-8 mt-1">
                           Assign & Start Training
                        </Button>
                     </div>
                  ))}
               </div>
            </Card>
         </div>
      )}

      {/* --- STAGE 2: TRAINING --- */}
      {activeStage === 'training' && (
         <div className="space-y-6">
             <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber-500"/> Active Training Progress</h3>
               </div>

               <div className="space-y-4">
                  {employees.filter(e => e.status === 'In Training' || e.status === 'Completed').map(emp => (
                     <div key={emp.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-sm">
                              {emp.progress}%
                           </div>
                           <div>
                              <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                              <p className="text-xs text-gray-500">Training for: <b>{emp.secondary}</b></p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 w-1/3">
                           <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className={`h-full ${emp.progress === 100 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${emp.progress}%` }}></div>
                           </div>
                        </div>
                        <div className="text-right">
                           {emp.progress < 100 ? (
                              <Button size="sm" variant="outline" className="h-8 text-xs">Update Log</Button>
                           ) : (
                              <Badge variant="success">Ready for Eval</Badge>
                           )}
                        </div>
                     </div>
                  ))}
               </div>
             </Card>
         </div>
      )}

      {/* --- STAGE 3: EVALUATION --- */}
      {activeStage === 'evaluation' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 border-l-4 border-l-blue-500">
                  <h3 className="font-bold text-gray-900 mb-2">Pending Evaluations</h3>
                  <p className="text-sm text-gray-500 mb-4">Conduct digital exam for fully trained employees.</p>
                  
                  {employees.filter(e => e.status === 'In Training' && e.progress >= 60).map(emp => ( // Simulating ready state
                     <div key={emp.id} className="bg-gray-50 p-4 rounded-lg mb-3">
                        <div className="flex justify-between mb-2">
                           <span className="font-medium text-gray-900">{emp.name}</span>
                           <Badge variant="warning">Training: {emp.progress}%</Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">Target: {emp.secondary} Specialist</p>
                        <Button className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
                           <MonitorPlay className="w-3 h-3 mr-2"/> Launch E-Exam
                        </Button>
                     </div>
                  ))}
               </Card>
            </div>
         </div>
      )}

      {/* --- STAGE 4: MATRIX & REPORTS --- */}
      {activeStage === 'matrix' && (
         <div className="space-y-6">
            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><Award className="w-4 h-4 text-purple-600"/> Multi-Skill Matrix Status</h3>
                  <div className="flex items-center gap-2">
                     <span className="text-xs text-gray-500">Certified Count:</span>
                     <Badge variant="outline" className="bg-purple-50 text-purple-700">12</Badge>
                  </div>
               </div>
               
               <table className="w-full text-sm text-left">
                  <thead className="bg-[#151542] text-white">
                     <tr>
                        <th className="px-6 py-3">Employee</th>
                        <th className="px-6 py-3">Primary Skill</th>
                        <th className="px-6 py-3">Secondary Skill</th>
                        <th className="px-6 py-3">Score</th>
                        <th className="px-6 py-3">Matrix Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {employees.filter(e => e.status === 'Completed').map(emp => (
                        <tr key={emp.id} className="hover:bg-purple-50/10">
                           <td className="px-6 py-4 font-medium text-gray-900">{emp.name}</td>
                           <td className="px-6 py-4 text-gray-600">{emp.primary}</td>
                           <td className="px-6 py-4 font-bold text-gray-800">{emp.secondary}</td>
                           <td className="px-6 py-4"><span className="text-green-600 font-bold">{emp.score}%</span></td>
                           <td className="px-6 py-4"><Badge variant="success" className="gap-1"><CheckCircle2 className="w-3 h-3"/> Active</Badge></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>
         </div>
      )}
    </div>
  );
};

export default MultiSkilling;
