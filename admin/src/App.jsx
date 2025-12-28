import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeLayout from './Layout/HomeLayout';
import Home from './pages/Home';
import Feedback from './pages/admin/Feedback';
import JoiningProcess from './pages/admin/JoiningProcess';
import TrainingProcess from './pages/admin/TrainingProcess';
import OperatorObservance from './pages/admin/OperatorObservance';
import SkillUpgradation from './pages/admin/SkillUpgradation';
import MultiSkilling from './pages/admin/MultiSkilling';
import ManChangeManagement from './pages/admin/ManChangeManagement';
import NotFound from './pages/NotFound';

const About = () => <h2 className="text-2xl text-blue-400">About Page</h2>;

const App = () => {
  return (
    <Router>
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
    </Router>
  );
};

export default App;
