import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';

const Home = lazy(() => import('./pages/Home'));
const Feedback = lazy(() => import('./pages/admin/Feedback'));
const JoiningProcess = lazy(() => import('./pages/admin/JoiningProcess'));
const TrainingProcess = lazy(() => import('./pages/admin/TrainingProcess'));
const OperatorObservance = lazy(() => import('./pages/admin/OperatorObservance'));
const SkillUpgradation = lazy(() => import('./pages/admin/SkillUpgradation'));
const MultiSkilling = lazy(() => import('./pages/admin/MultiSkilling'));
const ManChangeManagement = lazy(() => import('./pages/admin/ManChangeManagement'));
const NotFound = lazy(() => import('./pages/NotFound'));

const About = () => <h2 className="text-2xl text-blue-400">About Page</h2>;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div className="flex items-center justify-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#151542]"></div></div>}>
        <Routes>
          <Route path="/" element={<HomeLayout><Home /></HomeLayout>} />
          <Route path="/feedback" element={<HomeLayout><Feedback /></HomeLayout>} />
          <Route path="/joining" element={<HomeLayout><JoiningProcess /></HomeLayout>} />
          <Route path="/training-process" element={<HomeLayout><TrainingProcess /></HomeLayout>} />
          <Route path="/operator-observance" element={<HomeLayout><OperatorObservance /></HomeLayout>} />
          <Route path="/skill-upgradation" element={<HomeLayout><SkillUpgradation /></HomeLayout>} />
          <Route path="/multi-skilling" element={<HomeLayout><MultiSkilling /></HomeLayout>} />
          <Route path="/man-change-management" element={<HomeLayout><ManChangeManagement /></HomeLayout>} />
          <Route path="/about" element={<HomeLayout><About /></HomeLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
