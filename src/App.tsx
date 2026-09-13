import { Routes, Route, Link } from 'react-router-dom';
import { ToastProvider } from './layout/ToastProvider';
import { AppLayout } from './layout/AppLayout';
import { Empty } from './components/ui';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { AssemblyView } from './pages/AssemblyView';
import { PartDetail } from './pages/PartDetail';
import { Parts } from './pages/Parts';
import { Outsourcing } from './pages/Outsourcing';
import { OutsourcingDetail } from './pages/OutsourcingDetail';
import { Production } from './pages/Production';
import { Bom } from './pages/Bom';
import { Materials } from './pages/Materials';
import { Nesting } from './pages/Nesting';
import { NestingDetail } from './pages/NestingDetail';
import { Qc } from './pages/Qc';
import { Issues } from './pages/Issues';
import { CadCam } from './pages/CadCam';
import { Inventory } from './pages/Inventory';
import { Suppliers } from './pages/Suppliers';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Marketing } from './marketing/Marketing';

function NotFound() {
  return (
    <div className="page">
      <Empty
        icon="search"
        title="Page not found"
        hint="That route doesn't exist in the MVP."
        action={<Link to="/" className="btn">Command Center</Link>}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        {/* Standalone commercial site — no app chrome (sidebar/topbar). */}
        <Route path="marketing" element={<Marketing />} />
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:code/asm/:asm" element={<AssemblyView />} />
          <Route path="projects/:code" element={<ProjectDetail />} />
          <Route path="projects/:code/:tab" element={<ProjectDetail />} />
          <Route path="production" element={<Production />} />
          <Route path="outsourcing" element={<Outsourcing />} />
          <Route path="outsourcing/:id" element={<OutsourcingDetail />} />
          <Route path="bom" element={<Bom />} />
          <Route path="parts" element={<Parts />} />
          <Route path="parts/:id" element={<PartDetail />} />
          <Route path="cadcam" element={<CadCam />} />
          <Route path="nesting" element={<Nesting />} />
          <Route path="nesting/:id" element={<NestingDetail />} />
          <Route path="materials" element={<Materials />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="qc" element={<Qc />} />
          <Route path="issues" element={<Issues />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
}
