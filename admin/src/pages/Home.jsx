import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  School, 
  Eye, 
  TrendingUp, 
  Combine, 
  AlertTriangle, 
  MessageSquare,
  ArrowRight,
  ClipboardList,
  Target,
  Award,
  Bell
} from 'lucide-react';

// --- Internal UI Components ---

const Card = ({ className = '', children, ...props }) => (
  <div className={`rounded-xl border border-gray-100 bg-white text-gray-950 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ className = '', variant = 'default', children, ...props }) => {
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80',
    destructive: 'border-transparent bg-red-500 text-white hover:bg-red-500/80',
    outline: 'text-gray-950 border-gray-200',
    success: 'border-transparent bg-green-100 text-green-700',
    warning: 'border-transparent bg-amber-100 text-amber-700',
    danger: 'border-transparent bg-red-50 text-red-700',
    info: 'border-transparent bg-blue-100 text-blue-700',
    purple: 'border-transparent bg-purple-100 text-purple-700',
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Progress = ({ value = 0, className = '', indicatorColor = 'bg-[#151542]' }) => (
  <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
    <div
      className={`h-full flex-1 transition-all duration-500 ease-in-out ${indicatorColor}`}
      style={{ width: `${value}%` }}
    />
  </div>
);

// --- Dummy Data Aggregator ---

const dashboardData = {
  joining: {
    total: 12,
    stages: [ { name: "Planning", count: 2 }, { name: "Recruitment", count: 5 }, { name: "Joined", count: 5 } ]
  },
  training: {
    active: 8,
    digital: 3,
    practical: 5
  },
  observance: {
    activeCycles: 4,
    alerts: 1
  },
  skills: {
    upgrades: 3,
    multiskilling: 5
  },
  changes: {
    manChange: 2
  },
  feedback: {
    unread: 3
  }
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans pb-10">
      
      {/* Welcome & High Level Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Operations Dashboard</h2>
            <p className="text-gray-500 mt-1">Real-time overview of HR & Shop Floor activities.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Bell className="w-6 h-6 text-gray-500 hover:text-gray-700 cursor-pointer"/>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
             </div>
             <div className="h-8 w-[1px] bg-gray-200 mx-2"></div>
             <span className="text-sm font-medium text-gray-700">Q4 2024 Cycle</span>
          </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <Card className="p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
             <div>
                <p className="text-sm text-gray-500 font-medium">New Joinees</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">12</h3>
                <span className="text-xs text-green-600 font-medium flex items-center mt-1"><TrendingUp className="w-3 h-3 mr-1"/> +4 this week</span>
             </div>
             <div className="p-3 rounded-full bg-blue-50 text-blue-600"><UserPlus className="w-6 h-6"/></div>
          </Card>
          <Card className="p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
             <div>
                <p className="text-sm text-gray-500 font-medium">Training Active</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">8</h3>
                <span className="text-xs text-amber-600 font-medium flex items-center mt-1">3 Digital / 5 Practical</span>
             </div>
             <div className="p-3 rounded-full bg-amber-50 text-amber-600"><School className="w-6 h-6"/></div>
          </Card>
          <Card className="p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
             <div>
                <p className="text-sm text-gray-500 font-medium">Skill Upgrades</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">3</h3>
                <span className="text-xs text-purple-600 font-medium flex items-center mt-1">L1 &rarr; L2 Approved</span>
             </div>
             <div className="p-3 rounded-full bg-purple-50 text-purple-600"><TrendingUp className="w-6 h-6"/></div>
          </Card>
          <Card className="p-5 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
             <div>
                <p className="text-sm text-gray-500 font-medium">5M Changes</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">2</h3>
                <span className="text-xs text-red-600 font-medium flex items-center mt-1">1 Validation / 1 Trial</span>
             </div>
             <div className="p-3 rounded-full bg-red-50 text-red-600"><AlertTriangle className="w-6 h-6"/></div>
          </Card>
      </div>

      {/* Row 2: Detailed Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Joining & Training Flow (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
             {/* Joining Widget */}
             <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-gray-900 flex items-center gap-2"><UserPlus className="w-5 h-5 text-[#151542]"/> Joining Process Pipeline</h3>
                   <Link to="/joining" className="text-sm text-blue-600 hover:underline">Manage</Link>
                </div>
                <div className="flex gap-4 items-center">
                   {dashboardData.joining.stages.map((stage, idx) => (
                      <div key={idx} className="flex-1 bg-gray-50 rounded-lg p-3 border border-gray-100 text-center relative group">
                         <p className="text-xs text-gray-500 uppercase font-semibold mb-1">{stage.name}</p>
                         <p className="text-xl font-bold text-gray-900">{stage.count}</p>
                         {idx < 2 && <ArrowRight className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 z-10 bg-white rounded-full"/>}
                      </div>
                   ))}
                </div>
             </Card>

             {/* Observance & Change Widget */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2"><Eye className="w-5 h-5 text-indigo-600"/> Operator Observance</h3>
                      <Badge variant="info">4 Active</Badge>
                   </div>
                   <div className="space-y-3">
                      <div className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                         <span>16-Day Cycles</span>
                         <span className="font-bold">3 Active</span>
                      </div>
                      <div className="flex justify-between text-sm p-2 bg-red-50 text-red-700 rounded border border-red-100">
                         <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Re-Education</span>
                         <span className="font-bold">1 Alert</span>
                      </div>
                      <Link to="/operator-observance">
                         <Button size="sm" variant="outline" className="w-full mt-2">View Cycles</Button>
                      </Link>
                   </div>
                </Card>

                <Card className="p-6">
                   <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-600"/> 5M Man Change</h3>
                   </div>
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 border border-dashed border-gray-300 rounded hover:bg-gray-50">
                         <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                         <div className="flex-1">
                            <p className="text-xs font-bold text-gray-900">Line 4 (Soldering)</p>
                            <p className="text-[10px] text-gray-500">Validation Check Pending</p>
                         </div>
                         <Badge variant="outline">Req #001</Badge>
                      </div>
                      <Link to="/man-change-management">
                         <Button size="sm" variant="outline" className="w-full mt-2">Manage Requests</Button>
                      </Link>
                   </div>
                </Card>
             </div>
          </div>

          {/* Sidebar Column (1 col) */}
          <div className="space-y-6">
             
             {/* Feedback Widget */}
             <Card className="p-0 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-[#151542] to-[#2e2e5c] text-white flex justify-between items-center">
                   <h3 className="font-bold flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Recent Feedback</h3>
                   <Badge variant="warning" className="bg-amber-400 text-amber-900 border-none">3 New</Badge>
                </div>
                <div className="divide-y divide-gray-100">
                   {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                         <p className="text-sm font-semibold text-gray-900">Safety Protocol Review</p>
                         <p className="text-xs text-gray-500 mt-1 line-clamp-1">Supervisor requested clarification on new...</p>
                         <p className="text-[10px] text-gray-400 mt-2 text-right">2 hours ago</p>
                      </div>
                   ))}
                </div>
                <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                   <Link to="/feedback" className="text-xs font-bold text-[#151542] hover:underline">View All Feedback</Link>
                </div>
             </Card>

             {/* Quick Actions Links */}
             <Card className="p-5">
                <h3 className="font-bold text-gray-900 mb-4">Quick Navigation</h3>
                <div className="grid grid-cols-2 gap-2">
                   <Link to="/skill-upgradation">
                      <Button variant="outline" className="w-full h-auto py-3 flex flex-col gap-1 items-center hover:bg-gray-50">
                         <TrendingUp className="w-5 h-5 text-purple-600"/>
                         <span className="text-[10px]">Upgradation</span>
                      </Button>
                   </Link>
                   <Link to="/multi-skilling">
                      <Button variant="outline" className="w-full h-auto py-3 flex flex-col gap-1 items-center hover:bg-gray-50">
                         <Combine className="w-5 h-5 text-blue-600"/>
                         <span className="text-[10px]">Multi-Skill</span>
                      </Button>
                   </Link>
                   <Link to="/goals">
                      <Button variant="outline" className="w-full h-auto py-3 flex flex-col gap-1 items-center hover:bg-gray-50">
                         <Target className="w-5 h-5 text-red-600"/>
                         <span className="text-[10px]">Goals</span>
                      </Button>
                   </Link>
                   <Link to="/appraisal">
                      <Button variant="outline" className="w-full h-auto py-3 flex flex-col gap-1 items-center hover:bg-gray-50">
                         <ClipboardList className="w-5 h-5 text-orange-600"/>
                         <span className="text-[10px]">Appraisal</span>
                      </Button>
                   </Link>
                </div>
             </Card>

          </div>
      </div>
    </div>
  );
};

export default Home;
