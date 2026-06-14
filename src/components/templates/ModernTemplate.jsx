// File Purpose: Preview template component that renders resume data in the ModernTemplate style.
import { Mail, Phone, MapPin, Link, Globe } from "lucide-react";

const ModernTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">

      {/* ── Header (coloured band) ── */}
      {/* 
        FIX: replaced `grid grid-cols-1 sm:grid-cols-2` with flex-wrap.
        Tailwind responsive prefixes (sm:, md:) do NOT fire during @media print
        because the print viewport width doesn't match screen breakpoints.
        flex-wrap renders correctly at any width including print.
      */}
      <header className="p-8 text-white print-keep-with-next" style={{ backgroundColor: accentColor }}>
        <h1 className="text-4xl font-light mb-3">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-white/80 mb-3 text-sm font-medium uppercase tracking-wide">
            {data.personal_info.profession}
          </p>
        )}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {data.personal_info?.email && (
            <div className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.personal_info.linkedin}
              className="flex items-center gap-2"
            >
              <Link className="size-4 shrink-0" />
              <span className="break-all text-xs">
                {data.personal_info.linkedin.replace("https://www.", "").replace("https://", "")}
              </span>
            </a>
          )}
          {data.personal_info?.website && (
            <a
              target="_blank"
              rel="noreferrer"
              href={data.personal_info.website}
              className="flex items-center gap-2"
            >
              <Globe className="size-4 shrink-0" />
              <span className="break-all text-xs">
                {data.personal_info.website.replace("https://", "")}
              </span>
            </a>
          )}
        </div>
      </header>

      <div className="p-8">

        {/* ── Summary ── */}
        {data.professional_summary && (
          <section className="mb-8 print-no-break">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 print-keep-with-next">
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* ── Experience ── */}
        {data.experience && data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200 print-keep-with-next">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l border-gray-200 print-no-break"
                >
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">{exp.position}</h3>
                      <p className="font-medium" style={{ color: accentColor }}>
                        {exp.company}
                      </p>
                    </div>
                    <div
                      className="text-sm text-gray-500 px-3 py-1 rounded shrink-0"
                      style={{ backgroundColor: accentColor + "15" }}
                    >
                      {formatDate(exp.start_date)} –{" "}
                      {exp.is_current ? "Present" : formatDate(exp.end_date)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 leading-relaxed mt-3 whitespace-pre-line text-sm">
                      {exp.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Projects ── */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 print-keep-with-next">
              Projects
            </h2>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-4 print-no-break"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{project.name}</h3>
                      {project.type && (
                        <p className="text-sm text-gray-500">{project.type}</p>
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <div className="text-gray-700 leading-relaxed text-sm mt-3">
                      {project.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Education + Skills ── 
          FIX: replaced `grid sm:grid-cols-2` with two stacked sections.
          sm: does not fire during print — education/skills collapsed to
          one column making skills invisible below the fold.
          Side-by-side layout is emulated with flexbox that wraps gracefully.
        */}
        <div className="flex flex-wrap gap-8">
          {data.education && data.education.length > 0 && (
            <section className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 print-keep-with-next">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="print-no-break">
                    <h3 className="font-semibold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p style={{ color: accentColor }}>{edu.institution}</p>
                    <div className="flex justify-between items-center text-sm text-gray-600 flex-wrap gap-1">
                      <span>{formatDate(edu.graduation_date)}</span>
                      {edu.gpa && <span>GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.skills && data.skills.length > 0 && (
            <section className="flex-1 min-w-[200px]">
              <h2 className="text-2xl font-light mb-4 pb-2 border-b border-gray-200 print-keep-with-next">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm text-white rounded-full"
                    style={{ backgroundColor: accentColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
