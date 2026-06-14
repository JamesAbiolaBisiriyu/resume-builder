// File Purpose: Preview template component that renders resume data in the MinimalTemplate style.

const MinimalTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light">

      {/* ── Header ── */}
      <header className="mb-10 print-keep-with-next">
        <h1 className="text-4xl font-thin mb-4 tracking-wide">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-3">
            {data.personal_info.profession}
          </p>
        )}
        {/* flex-wrap: works at all widths including print */}
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
          {data.personal_info?.email && <span>{data.personal_info.email}</span>}
          {data.personal_info?.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info?.location && <span>{data.personal_info.location}</span>}
          {data.personal_info?.linkedin && (
            <span className="break-all">{data.personal_info.linkedin}</span>
          )}
          {data.personal_info?.website && (
            <span className="break-all">{data.personal_info.website}</span>
          )}
        </div>
      </header>

      {/* ── Summary ── */}
      {data.professional_summary && (
        <section className="mb-10 print-no-break">
          <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
        </section>
      )}

      {/* ── Experience ── */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium print-keep-with-next"
            style={{ color: accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="print-no-break">
                <div className="flex justify-between items-baseline mb-1 flex-wrap gap-2">
                  <h3 className="text-lg font-medium">{exp.position}</h3>
                  <span className="text-sm text-gray-500 shrink-0">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{exp.company}</p>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
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
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium print-keep-with-next"
            style={{ color: accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((proj, index) => (
              <div key={index} className="print-no-break">
                <h3 className="text-lg font-medium">{proj.name}</h3>
                {proj.type && <p className="text-sm text-gray-500">{proj.type}</p>}
                {proj.description && (
                  <p className="text-gray-600 text-sm mt-1">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Education ── */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium print-keep-with-next"
            style={{ color: accentColor }}
          >
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline flex-wrap gap-2 print-no-break"
              >
                <div>
                  <h3 className="font-medium">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                </div>
                <span className="text-sm text-gray-500 shrink-0">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Skills ── */}
      {data.skills && data.skills.length > 0 && (
        <section className="print-no-break">
          <h2
            className="text-sm uppercase tracking-widest mb-6 font-medium print-keep-with-next"
            style={{ color: accentColor }}
          >
            Skills
          </h2>
          <div className="text-gray-700">{data.skills.join(" • ")}</div>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;