import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  CheckCircle2,
  Briefcase,
  Star,
  Search,
} from 'lucide-react';

export const CompaniesView: React.FC = () => {
  const { companies, jobs, setActiveView } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-semibold mb-2">
            <Building2 className="w-3.5 h-3.5 text-violet-400" />
            Verified Enterprise Employers
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Top Tech Companies & AI Research Labs
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Discover verified tech organizations, explore engineering cultures, and inspect active openings.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by company, industry, or city..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map(company => {
          const companyJobs = jobs.filter(j => j.company === company.name);

          return (
            <div
              key={company.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-violet-500/40 transition-all duration-300 shadow-xl space-y-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-lg text-white">{company.name}</h3>
                        {company.verified && (
                          <span className="flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-violet-300 font-medium mt-0.5">{company.industry}</p>
                      <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span>{company.headquarters}</span>
                        <span>•</span>
                        <span>{company.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 font-bold text-xs text-amber-300 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>{company.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mt-4">
                  {company.description}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">Engineering Culture:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {company.cultureHighlights.map((ch, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-bold text-slate-400 block mb-2">Key Perks:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {company.benefits.map((b, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-violet-950/40 text-violet-300 border border-violet-800/40"
                      >
                        ✦ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">
                  {companyJobs.length} active opportunities
                </span>

                <button
                  onClick={() => {
                    setActiveView('jobs');
                  }}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Openings</span>
                  <Briefcase className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
