import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  Filter,
  Download,
  Plus,
} from 'lucide-react';

export const PlacementDashboardView: React.FC = () => {
  const { placementDrives, students, createPlacementDrive, addToast } = useApp();

  const [cgpaThreshold, setCgpaThreshold] = useState<number>(7.5);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [onlyZeroBacklogs, setOnlyZeroBacklogs] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchStudent, setSearchStudent] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'drives' | 'students' | 'gap-analytics'>('students');

  const [createDriveModalOpen, setCreateDriveModalOpen] = useState(false);
  const [driveForm, setDriveForm] = useState({
    company: '',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    role: '',
    packageLPA: 16.5,
    driveDate: '2026-11-10',
    deadline: '2026-11-05',
    minCgpa: 8.0,
    eligibleBranches: ['Computer Science', 'AI & Data Science', 'Information Tech'],
    maxBacklogs: 0,
    status: 'upcoming' as const,
    description: 'Campus hiring drive for 2026 batch engineers.',
  });

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (student.cgpa < cgpaThreshold) return false;
      if (onlyZeroBacklogs && student.backlogs > 0) return false;
      if (selectedBranch !== 'all' && student.branch !== selectedBranch) return false;
      if (statusFilter !== 'all' && student.placementStatus !== statusFilter) return false;
      if (searchStudent.trim()) {
        const q = searchStudent.toLowerCase();
        if (!student.name.toLowerCase().includes(q) && !student.rollNumber.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [students, cgpaThreshold, onlyZeroBacklogs, selectedBranch, statusFilter, searchStudent]);

  const handleExportCSV = () => {
    const headers = 'RollNumber,Name,Branch,CGPA,Backlogs,PlacementStatus,OfferCompany,PackageLPA,ResumeScore\n';
    const rows = filteredStudents
      .map(
        s =>
          `${s.rollNumber},"${s.name}","${s.branch}",${s.cgpa},${s.backlogs},${s.placementStatus},"${s.offerCompany || 'N/A'}",${s.packageLPA || 0},${s.resumeScore}`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Apex_Placement_Eligibility_Export_${Date.now()}.csv`;
    link.click();
    addToast({
      title: 'Student Roster Exported as CSV! 📊',
      message: `${filteredStudents.length} eligible students exported successfully.`,
      type: 'success',
    });
  };

  const handleCreateDriveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driveForm.company || !driveForm.role) return;
    createPlacementDrive(driveForm);
    setCreateDriveModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-indigo-950/70 border border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
              alt="Dr. K. S. Ramanathan"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/50 shadow-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Dr. K. S. Ramanathan</h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-600/30 text-cyan-300 border border-cyan-500/40">
                  Dean of Career Services & TPO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Apex Institute of Technology • 2026 Campus Placement Operations
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
                <span>Batch Size: 650 Students</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">Placement Rate: 74.1%</span>
                <span>•</span>
                <span className="text-cyan-400 font-medium">Avg CTC: ₹12.4 LPA</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setCreateDriveModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Host New Campus Drive</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400">Total Registered Seniors</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">650</div>
          <div className="text-[11px] text-slate-500 mt-0.5">Batch of 2026</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400">Students Placed</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">482</div>
          <div className="text-[11px] text-emerald-500 mt-0.5">74.1% Conversion</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400">Dream Tier Offers (&gt;20 LPA)</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1">84</div>
          <div className="text-[11px] text-cyan-500 mt-0.5">Highest: ₹46 LPA</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
          <div className="text-xs text-slate-400">Active Campus Drives</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-mono mt-1">{placementDrives.length}</div>
          <div className="text-[11px] text-violet-400 mt-0.5">Enterprise Partners</div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'students'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          Student Eligibility Roster ({filteredStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('drives')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'drives'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          Campus Placement Drives ({placementDrives.length})
        </button>
        <button
          onClick={() => setActiveTab('gap-analytics')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'gap-analytics'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
          }`}
        >
          University Skills Gap Heatmap
        </button>
      </div>

      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-cyan-400" />
                Live Automated Eligibility Engine
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredStudents.length} of {students.length} Eligible
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Search Student</label>
                <input
                  type="text"
                  placeholder="Roll No or Name..."
                  value={searchStudent}
                  onChange={e => setSearchStudent(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-400 mb-1">
                  <span>Min CGPA:</span>
                  <span className="font-bold text-cyan-400">{cgpaThreshold}</span>
                </div>
                <input
                  type="range"
                  min="6.0"
                  max="9.5"
                  step="0.1"
                  value={cgpaThreshold}
                  onChange={e => setCgpaThreshold(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Department</label>
                <select
                  value={selectedBranch}
                  onChange={e => setSelectedBranch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All Engineering Branches</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Information Tech">Information Tech</option>
                  <option value="Electronics & Comm.">Electronics & Comm.</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="backlogCheck"
                  checked={onlyZeroBacklogs}
                  onChange={e => setOnlyZeroBacklogs(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                />
                <label htmlFor="backlogCheck" className="text-slate-300 font-medium cursor-pointer">
                  0 Active Backlogs Only
                </label>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Placement Status</label>
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white text-xs focus:outline-none cursor-pointer"
                >
                  <option value="all">All Statuses</option>
                  <option value="unplaced">Unplaced</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="dream_placed">Dream Placed</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
                  <tr>
                    <th className="p-3.5">Student</th>
                    <th className="p-3.5">Roll No</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">CGPA</th>
                    <th className="p-3.5">Resume Health</th>
                    <th className="p-3.5">Placement Status</th>
                    <th className="p-3.5">Offers / CTC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <div>
                          <div className="font-bold text-white">{student.name}</div>
                          <div className="text-[10px] text-slate-400">{student.email}</div>
                        </div>
                      </td>
                      <td className="p-3.5 font-mono text-cyan-400">{student.rollNumber}</td>
                      <td className="p-3.5">{student.branch}</td>
                      <td className="p-3.5 font-bold font-mono text-white">{student.cgpa}</td>
                      <td className="p-3.5">
                        <span className="font-mono text-emerald-400 font-semibold">{student.resumeScore}%</span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            student.placementStatus === 'dream_placed'
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : student.placementStatus === 'shortlisted'
                              ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {student.placementStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold text-emerald-400">
                        {student.packageLPA ? `₹${student.packageLPA} LPA (${student.offerCompany})` : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'drives' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {placementDrives.map(drive => (
            <div key={drive.id} className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <img src={drive.companyLogo} alt={drive.company} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-base text-white">{drive.company}</h3>
                    <p className="text-xs text-cyan-300 font-semibold">{drive.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-400 font-mono">₹{drive.packageLPA} LPA</span>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">{drive.status}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Drive Date</span>
                  <div className="font-bold text-white mt-0.5">{drive.driveDate}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-bold">Min Eligibility</span>
                  <div className="font-bold text-white mt-0.5">{drive.minCgpa}+ CGPA • 0 Backlogs</div>
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed">
                {drive.description}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">{drive.registeredCount} candidates registered</span>
                <span className="text-emerald-400 font-semibold">{drive.offersCount} offers released</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'gap-analytics' && (
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">2026 Batch Aggregate Technical Competency Heatmap</h3>
            <p className="text-xs text-slate-400 mt-1">
              Derived from automated resume parsers and code test evaluations across 650 university candidates.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold text-white">Data Structures & Core Algorithms (DSA)</span>
                <span className="text-emerald-400 font-bold font-mono">88% Proficiency (Strong)</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[88%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold text-white">Web Frameworks (React, Next.js, Node.js)</span>
                <span className="text-emerald-400 font-bold font-mono">82% Proficiency (Strong)</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[82%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold text-white">Cloud Systems & Docker Containers</span>
                <span className="text-amber-400 font-bold font-mono">54% Proficiency (Identified Gap)</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[54%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold text-white">High-Throughput Databases & Redis</span>
                <span className="text-rose-400 font-bold font-mono">41% Proficiency (Critical Training Area)</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full w-[41%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs text-slate-300 space-y-1">
            <span className="font-bold text-cyan-300 block">TPO Actionable Directive:</span>
            Conduct intensive 2-week hands-on bootcamp on Docker, AWS ECS, and Redis connection pooling prior to the upcoming Tier-1 CloudScale Systems and QuantumPulse recruitment drives.
          </div>
        </div>
      )}

      {createDriveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 shadow-2xl space-y-4 text-left">
            <h3 className="font-bold text-base text-white">Host New Campus Placement Drive</h3>

            <form onSubmit={handleCreateDriveSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Google Cloud or Microsoft"
                  value={driveForm.company}
                  onChange={e => setDriveForm({ ...driveForm, company: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Designation / Role</label>
                <input
                  type="text"
                  placeholder="e.g. Associate Cloud Engineer"
                  value={driveForm.role}
                  onChange={e => setDriveForm({ ...driveForm, role: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">Package (CTC in LPA)</label>
                  <input
                    type="number"
                    value={driveForm.packageLPA}
                    onChange={e => setDriveForm({ ...driveForm, packageLPA: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Min CGPA Cutoff</label>
                  <input
                    type="number"
                    step="0.1"
                    value={driveForm.minCgpa}
                    onChange={e => setDriveForm({ ...driveForm, minCgpa: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCreateDriveModalOpen(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Publish Campus Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
