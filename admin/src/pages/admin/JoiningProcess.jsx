import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Briefcase, 
  Users, 
  UserPlus, 
  Fingerprint, 
  ClipboardCheck,
  FileBarChart,
  CalendarDays,
  CheckCircle2,
  XCircle,
  MoreHorizontal,
  Upload,
  UserCheck,
  Building,
  ArrowRightLeft,
  PieChart
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

const Tabs = ({ activeTab, onTabChange, tabs }) => (
  <div className="flex space-x-1 rounded-xl bg-gray-100 p-1">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onTabChange(tab.id)}
        className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2 
          ${activeTab === tab.id ? 'bg-white shadow text-[#151542]' : 'text-gray-500 hover:bg-white/[0.12] hover:text-[#151542]'}`}
      >
        <div className="flex items-center justify-center gap-2">
           {tab.icon}
           <span className="hidden sm:inline">{tab.label}</span>
        </div>
      </button>
    ))}
  </div>
);

// --- Dummy Data & State Logic ---

const JoiningProcess = () => {
  const [activeTab, setActiveTab] = useState('planning');

  // Tab 1: Planning Data
  const [planning, setPlanning] = useState({
     customerDI: 15000,
     forecast: 15500,
     currentStrength: 450,
     requiredStrength: 480,
     status: 'Draft' // Draft, Validated, Released
  });

  // Tab 2: Recruitment Data
  const [candidates, setCandidates] = useState([
     { id: 1, name: "Rahul Sharma", role: "Operator", status: "Interview Passed", score: 85 },
     { id: 2, name: "Amit Verma", role: "Technician", status: "Training Needed", score: 72 },
     { id: 3, name: "Sneha Gupta", role: "Supervisor", status: "Document Verification", score: 90 },
     { id: 4, name: "Vikram Singh", role: "Helper", status: "Failed", score: 40 },
  ]);

  // Tab 3: Joining Data (Filtered from Candidates)
  const joiningList = candidates.filter(c => ['Interview Passed', 'Document Verification'].includes(c.status));

  // Tab 4: Attendance Data
  const gateData = [
     { time: "08:00 AM", entry: 120, exit: 5 },
     { time: "09:00 AM", entry: 430, exit: 10 },
     { time: "10:00 AM", entry: 450, exit: 12 },
  ];

  const handleIndentAction = (action) => {
     setPlanning(prev => ({ ...prev, status: action }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-8 h-8 text-[#151542]" />
            Joining & Attendance Process
          </h1>
          <p className="text-gray-500 mt-1">End-to-end manpower management workflow.</p>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Current Status:</span>
           <Badge variant={planning.status === 'Released' ? 'success' : 'warning'}>{planning.status}</Badge>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tabs={[
           { id: 'planning', label: '1. Manpower Planning', icon: <Users className="w-4 h-4" /> },
           { id: 'recruitment', label: '2. Recruitment', icon: <UserPlus className="w-4 h-4" /> },
           { id: 'joining', label: '3. Joining', icon: <ClipboardCheck className="w-4 h-4" /> },
           { id: 'attendance', label: '4. Attendance', icon: <Fingerprint className="w-4 h-4" /> },
           { id: 'reports', label: '5. Reports', icon: <FileBarChart className="w-4 h-4" /> },
        ]}
      />

      {/* --- TAB CONTENT: MANPOWER PLANNING --- */}
      {activeTab === 'planning' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><Building className="w-4 h-4 text-blue-600"/> Inputs</h3>
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div><Label>Customer DI</Label><Input type="number" value={planning.customerDI} readOnly className="bg-gray-50"/></div>
                        <div><Label>Monthly Forecast</Label><Input type="number" value={planning.forecast} readOnly className="bg-gray-50"/></div>
                     </div>
                     <div className="p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                        Based on the forecast, we need to increase capacity by <b>{((planning.forecast - planning.customerDI)/planning.customerDI * 100).toFixed(1)}%</b>.
                     </div>
                  </div>
               </Card>
               <Card className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-green-600"/> Requirements Calculation</h3>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Current Manpower</span>
                        <span className="font-mono font-medium">{planning.currentStrength}</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-500">Required Manpower</span>
                        <span className="font-mono font-bold text-[#151542]">{planning.requiredStrength}</span>
                     </div>
                     <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-amber-600 font-medium">Net Hiring Need</span>
                        <Badge variant="warning">+{planning.requiredStrength - planning.currentStrength} Pax</Badge>
                     </div>
                  </div>
               </Card>
            </div>

            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">E-Matrix: Department Requirements</h3>
                  <div className="flex gap-2">
                     {planning.status === 'Draft' && (
                        <Button size="sm" onClick={() => handleIndentAction('Validated')} className="bg-[#151542] text-white hover:bg-[#151542]/90">
                           Validate & Trigger Notification
                        </Button>
                     )}
                     {planning.status === 'Validated' && (
                        <Button size="sm" onClick={() => handleIndentAction('Released')} className="bg-green-600 text-white hover:bg-green-700">
                           Release to MPSU Portal
                        </Button>
                     )}
                  </div>
               </div>
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500">
                     <tr>
                        <th className="px-4 py-3">Department</th>
                        <th className="px-4 py-3 text-center">Process</th>
                        <th className="px-4 py-3 text-center">Current</th>
                        <th className="px-4 py-3 text-center">Required</th>
                        <th className="px-4 py-3 text-center">Gap</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     <tr><td className="px-4 py-3 text-gray-900">Production</td><td className="px-4 py-3 text-center">Assembly</td><td className="px-4 py-3 text-center">200</td><td className="px-4 py-3 text-center">220</td><td className="px-4 py-3 text-center text-red-500 font-bold">+20</td></tr>
                     <tr><td className="px-4 py-3 text-gray-900">Quality</td><td className="px-4 py-3 text-center">Inspection</td><td className="px-4 py-3 text-center">45</td><td className="px-4 py-3 text-center">50</td><td className="px-4 py-3 text-center text-red-500 font-bold">+5</td></tr>
                     <tr><td className="px-4 py-3 text-gray-900">Logistics</td><td className="px-4 py-3 text-center">Warehouse</td><td className="px-4 py-3 text-center">30</td><td className="px-4 py-3 text-center">35</td><td className="px-4 py-3 text-center text-red-500 font-bold">+5</td></tr>
                  </tbody>
               </table>
            </Card>
         </div>
      )}

      {/* --- TAB CONTENT: RECRUITMENT --- */}
      {activeTab === 'recruitment' && (
         <div className="space-y-6">
            <Card className="overflow-hidden">
               <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="font-bold text-gray-900">Candidate Pipeline</h3>
                  <Button size="sm" variant="outline"><Upload className="w-4 h-4 mr-2"/>Bulk Upload</Button>
               </div>
               <table className="w-full text-sm text-left">
                  <thead className="bg-white text-gray-500 border-b border-gray-100">
                     <tr>
                        <th className="px-6 py-4">Candidate Name</th>
                        <th className="px-6 py-4">Role Applied</th>
                        <th className="px-6 py-4">Interview Score</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {candidates.map(candidate => (
                        <tr key={candidate.id} className="hover:bg-gray-50/50">
                           <td className="px-6 py-4 font-medium text-gray-900">{candidate.name}</td>
                           <td className="px-6 py-4 text-gray-500">{candidate.role}</td>
                           <td className="px-6 py-4">
                              <Badge variant={candidate.score >= 80 ? 'success' : candidate.score >= 50 ? 'warning' : 'danger'}>
                                 {candidate.score}/100
                              </Badge>
                           </td>
                           <td className="px-6 py-4 text-gray-600">{candidate.status}</td>
                           <td className="px-6 py-4 text-right">
                              <Button variant="ghost" size="icon"><MoreHorizontal className="w-4 h-4 text-gray-400"/></Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="p-6 border-l-4 border-l-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Training Matrix</h4>
                  <p className="text-sm text-gray-500 mb-4">Candidates who passed interview but need skill upgrade.</p>
                  <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                     <span>Amit Verma (Technician)</span>
                     <Button size="sm" variant="outline" className="h-7 text-xs">Assign Training</Button>
                  </div>
               </Card>
               <Card className="p-6 border-l-4 border-l-green-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Ready for Joining</h4>
                  <p className="text-sm text-gray-500 mb-4">Candidates cleared for onboarding.</p>
                  <div className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                     <span>Rahul Sharma (Operator)</span>
                     <Badge variant="success" className="h-5">Cleared</Badge>
                  </div>
               </Card>
            </div>
         </div>
      )}

      {/* --- TAB CONTENT: JOINING --- */}
      {activeTab === 'joining' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {joiningList.map(candidate => (
                  <Card key={candidate.id} className="p-5 flex flex-col gap-4">
                     <div className="flex justify-between items-start">
                        <div>
                           <h4 className="font-bold text-gray-900">{candidate.name}</h4>
                           <p className="text-sm text-gray-500">{candidate.role}</p>
                        </div>
                        <UserCheck className="w-5 h-5 text-green-600"/>
                     </div>
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-gray-500">Temp ID Card</span>
                           <Badge variant="outline">Pending</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-gray-500">Biometric Reg</span>
                           <Badge variant="outline">Pending</Badge>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                           <span className="text-gray-500">ESS Sync</span>
                           <Badge variant="outline">Pending</Badge>
                        </div>
                     </div>
                     <Button className="w-full mt-2 bg-[#151542] text-white hover:bg-[#151542]/90 h-8 text-xs">
                        Start Onboarding
                     </Button>
                  </Card>
               ))}
            </div>
         </div>
      )}

      {/* --- TAB CONTENT: ATTENDANCE --- */}
      {activeTab === 'attendance' && (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <Card className="p-6 bg-[#151542] text-white">
                  <h3 className="text-lg font-medium opacity-90 mb-1">Live Gate Entry</h3>
                  <div className="text-4xl font-bold">452</div>
                  <p className="text-xs opacity-70 mt-2">Active personnel inside premises</p>
               </Card>
               <Card className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">ESS Portal Sync</h3>
                  <div className="text-4xl font-bold text-green-600">09:45 AM</div>
                  <p className="text-xs text-gray-500 mt-2">Last synchronized</p>
               </Card>
               <Card className="p-6 flex items-center justify-center">
                  <Button size="lg" className="w-full h-full text-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200">
                     <ArrowRightLeft className="w-6 h-6 mr-3"/> Pull Attendance Data
                  </Button>
               </Card>
            </div>

            <Card>
               <div className="p-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Gate Authentication Logs</h3>
               </div>
               <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500">
                     <tr>
                        <th className="px-6 py-3">Time Slot</th>
                        <th className="px-6 py-3">Entries</th>
                        <th className="px-6 py-3">Exits</th>
                        <th className="px-6 py-3">Net Inside</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {gateData.map((log, i) => (
                        <tr key={i}>
                           <td className="px-6 py-3 font-mono">{log.time}</td>
                           <td className="px-6 py-3 text-green-600 font-medium">+{log.entry}</td>
                           <td className="px-6 py-3 text-red-500 font-medium">-{log.exit}</td>
                           <td className="px-6 py-3 font-bold">{log.entry - log.exit}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card>
         </div>
      )}

      {/* --- TAB CONTENT: REPORTS --- */}
      {activeTab === 'reports' && (
         <div className="space-y-6">
            <div className="flex gap-4">
               <Button variant="outline" className="flex-1 py-8 flex flex-col items-center gap-2 border-dashed border-2">
                  <FileBarChart className="w-6 h-6 text-[#151542]"/>
                  <span className="font-semibold">Daily Manpower Report</span>
               </Button>
               <Button variant="outline" className="flex-1 py-8 flex flex-col items-center gap-2 border-dashed border-2">
                  <PieChart className="w-6 h-6 text-green-600"/>
                  <span className="font-semibold">Plan vs Actual Report</span>
               </Button>
            </div>

            <Card className="p-6">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900">Plan vs Actual: Department Breakdown</h3>
               </div>
               <div className="space-y-5">
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium">
                        <span>Production</span>
                        <span className="text-gray-500">200 / 220 (90%)</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#151542]" style={{width: '90%'}}></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium">
                        <span>Quality</span>
                        <span className="text-gray-500">45 / 50 (90%)</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{width: '90%'}}></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-sm font-medium">
                        <span>Logistics</span>
                        <span className="text-gray-500">30 / 35 (85%)</span>
                     </div>
                     <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500" style={{width: '85%'}}></div>
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      )}
    </div>
  );
};

export default JoiningProcess;
