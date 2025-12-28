import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MessageSquare, 
  User, 
  Users, 
  ShieldCheck, 
  ThumbsUp, 
  AlertCircle,
  CornerDownRight,
  CheckCheck,
  Flag,
  Send,
  PlusCircle,
  HelpCircle,
  MoreVertical
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
    secondary: 'border-transparent bg-gray-100 text-gray-900',
    outline: 'text-gray-950 border-gray-200',
    praise: 'border-transparent bg-green-50 text-green-700',
    improvement: 'border-transparent bg-amber-50 text-amber-700',
    general: 'border-transparent bg-blue-50 text-blue-700',
    flagged: 'border-transparent bg-red-50 text-red-700',
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Avatar = ({ name, className = "" }) => (
  <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm ${className}`}>
    {name.split(' ').map(n => n[0]).join('').substring(0,2)}
  </div>
);

// --- Dummy Data ---

const initialFeedbacks = [
  {
    id: 1,
    type: "Praise", // Praise, Improvement, General
    from: "Sarah Jenkins",
    to: "Me",
    message: "Great job leading the client presentation yesterday! Your slides were very clear.",
    date: "2 hours ago",
    status: "Active", // Active, Completed, Flagged
    replies: [
      { id: 101, from: "Manager", message: "Agreed, excellent work on the visual data representation." }
    ]
  },
  {
    id: 2,
    type: "Improvement",
    from: "Manager",
    to: "Me",
    message: "I noticed some delays in the latest sprint reviews. Let's work on time management.",
    date: "1 day ago",
    status: "Active",
    replies: []
  },
  {
    id: 3,
    type: "General",
    from: "Me",
    to: "David Lee",
    message: "Can we schedule a sync to discuss the API integration timeline?",
    date: "3 days ago",
    status: "Completed",
    replies: [
      { id: 102, from: "David Lee", message: "Sure, sent you an invite for Friday." }
    ]
  }
];

const Feedback = () => {
  const [activeView, setActiveView] = useState('employee'); // 'employee' | 'manager' | 'hr'
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  
  // Dialog States
  const [isGiveOpen, setIsGiveOpen] = useState(false);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);

  const handleReply = (id) => {
    if (!replyText.trim()) return;
    setFeedbacks(feedbacks.map(f => f.id === id ? {
      ...f,
      replies: [...f.replies, { id: Date.now(), from: activeView === 'manager' ? "Manager" : "Me", message: replyText }]
    } : f));
    setReplyText("");
    setActiveReplyId(null);
  };

  const handleStatusChange = (id, newStatus) => {
    setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, status: newStatus } : f));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-sans pb-10">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-[#151542]" />
            Feedback & Discussions
          </h1>
          <p className="text-gray-500 mt-1">Continuous performance conversations and recognition.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
           <div className="bg-gray-100 p-1 rounded-lg flex items-center">
             <button onClick={() => setActiveView('employee')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeView === 'employee' ? 'bg-white shadow-sm text-[#151542]' : 'text-gray-500 hover:text-gray-900'}`}>Employee</button>
             <button onClick={() => setActiveView('manager')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeView === 'manager' ? 'bg-white shadow-sm text-[#151542]' : 'text-gray-500 hover:text-gray-900'}`}>Manager</button>
             <button onClick={() => setActiveView('hr')} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeView === 'hr' ? 'bg-white shadow-sm text-[#151542]' : 'text-gray-500 hover:text-gray-900'}`}>HR</button>
          </div>

          {activeView === 'employee' && (
            <>
               <Dialog open={isRequestOpen} onOpenChange={setIsRequestOpen}>
                  <DialogTrigger asChild>
                     <Button variant="outline" className="border-[#151542] text-[#151542] hover:bg-[#151542]/5">
                        <HelpCircle className="w-4 h-4 mr-2" /> Request
                     </Button>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader><DialogTitle>Request Feedback</DialogTitle></DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="grid gap-2"><Label>From Whom?</Label><Input placeholder="Name or Email" /></div>
                        <div className="grid gap-2"><Label>Context (Project/Skill)</Label><Input placeholder="e.g. Q3 Sales Presentation" /></div>
                     </div>
                     <DialogFooter><Button onClick={() => setIsRequestOpen(false)}>Send Request</Button></DialogFooter>
                  </DialogContent>
               </Dialog>

               <Dialog open={isGiveOpen} onOpenChange={setIsGiveOpen}>
                  <DialogTrigger asChild>
                     <Button className="bg-[#151542] text-white hover:bg-[#151542]/90">
                        <PlusCircle className="w-4 h-4 mr-2" /> Give Feedback
                     </Button>
                  </DialogTrigger>
                  <DialogContent>
                     <DialogHeader><DialogTitle>Give Feedback</DialogTitle></DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="grid gap-2"><Label>To Whom?</Label><Input placeholder="Name or Email" /></div>
                        <div className="grid gap-2"><Label>Type</Label>
                           <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="text-green-600 border-green-200 bg-green-50">Praise</Button>
                              <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 bg-amber-50">Improvement</Button>
                              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 bg-blue-50">General</Button>
                           </div>
                        </div>
                        <div className="grid gap-2"><Label>Message</Label><textarea className="border rounded-md p-2 text-sm" rows={4} placeholder="Your feedback..." /></div>
                     </div>
                     <DialogFooter><Button onClick={() => setIsGiveOpen(false)}>Send Feedback</Button></DialogFooter>
                  </DialogContent>
               </Dialog>
            </>
          )}
        </div>
      </div>

      {/* View Context Banner */}
      <div className={`text-sm px-4 py-2 rounded-lg border flex items-center gap-2 
        ${activeView === 'employee' ? 'bg-blue-50 border-blue-100 text-blue-700' : 
          activeView === 'manager' ? 'bg-purple-50 border-purple-100 text-purple-700' :
          'bg-orange-50 border-orange-100 text-orange-700'}`}>
         {activeView === 'employee' ? <User className="w-4 h-4" /> : activeView === 'manager' ? <Users className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
         <span className="font-semibold">{activeView === 'employee' ? 'My Discussions' : activeView === 'manager' ? 'Team Feedback' : 'All Feedback Overview'}</span>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-6 relative before:absolute before:left-8 before:top-0 before:h-full before:w-0.5 before:bg-gray-100">
         {feedbacks.map((item) => (
            <div key={item.id} className="relative pl-20">
               {/* Timeline Node */}
               <div className="absolute left-3 top-0 w-10 h-10 bg-white border-4 border-gray-50 rounded-full flex items-center justify-center z-10 shadow-sm">
                  {item.type === 'Praise' ? <ThumbsUp className="w-4 h-4 text-green-600" /> : 
                   item.type === 'Improvement' ? <AlertCircle className="w-4 h-4 text-amber-600" /> : 
                   <MessageSquare className="w-4 h-4 text-blue-600" />}
               </div>

               <Card className={`overflow-hidden transition-all ${item.status === 'Completed' ? 'opacity-70 bg-gray-50' : ''}`}>
                  <div className="p-5">
                     <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                           <Avatar name={item.from} />
                           <div>
                              <p className="font-semibold text-gray-900 text-sm">{item.from} <span className="text-gray-400 font-normal">to</span> {item.to}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                 <span className="text-xs text-gray-400">{item.date}</span>
                                 <Badge variant={item.type.toLowerCase()}>{item.type}</Badge>
                                 {item.status === 'Flagged' && <Badge variant="flagged">Flagged by HR</Badge>}
                              </div>
                           </div>
                        </div>
                        {activeView === 'hr' && (
                           <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => handleStatusChange(item.id, 'Flagged')}>
                              <Flag className="w-4 h-4" />
                           </Button>
                        )}
                        {activeView === 'manager' && item.status !== 'Completed' && (
                           <Button variant="outline" size="sm" className="h-8 gap-2" onClick={() => handleStatusChange(item.id, 'Completed')}>
                              <CheckCheck className="w-3 h-3" /> Mark Resolved
                           </Button>
                        )}
                     </div>

                     <p className="text-gray-700 text-sm leading-relaxed mb-4">{item.message}</p>

                     {/* Replies */}
                     {item.replies.length > 0 && (
                        <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-100">
                           {item.replies.map(reply => (
                              <div key={reply.id} className="bg-gray-50 p-3 rounded-lg text-sm">
                                 <p className="font-semibold text-xs text-gray-900 mb-1">{reply.from}</p>
                                 <p className="text-gray-600">{reply.message}</p>
                              </div>
                           ))}
                        </div>
                     )}

                     {/* Action Buttons */}
                     <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                        {activeReplyId === item.id ? (
                           <div className="flex w-full gap-2 items-center">
                              <Input 
                                 placeholder="Write a reply..." 
                                 className="h-9 text-sm" 
                                 value={replyText} 
                                 onChange={(e) => setReplyText(e.target.value)}
                                 autoFocus
                              />
                              <Button size="icon" className="h-9 w-9 bg-[#151542]" onClick={() => handleReply(item.id)}>
                                 <Send className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => setActiveReplyId(null)}>Cancel</Button>
                           </div>
                        ) : (
                           <div className="flex gap-2">
                              {!(item.status === 'Completed') && (
                                 <Button variant="ghost" size="sm" className="text-gray-500 hover:text-[#151542] gap-2 h-8" onClick={() => setActiveReplyId(item.id)}>
                                    <CornerDownRight className="w-4 h-4" /> Reply
                                 </Button>
                              )}
                              
                              {activeView === 'employee' && item.to === 'Me' && item.status !== 'Completed' && (
                                 <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-600 gap-2 h-8" onClick={() => handleStatusChange(item.id, 'Completed')}>
                                    <CheckCheck className="w-4 h-4" /> Acknowledge
                                 </Button>
                              )}
                           </div>
                        )}
                     </div>
                  </div>
               </Card>
            </div>
         ))}
      </div>
    </div>
  );
};

export default Feedback;
