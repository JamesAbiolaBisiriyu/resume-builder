// File Purpose: Preview template component that renders resume data in the MinimalImageTemplate style.
import { Mail, Phone, MapPin } from "lucide-react";

const MinimalImageTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const profileSrc =
    data.personal_info?.image instanceof File
      ? URL.createObjectURL(data.personal_info.image)
      : typeof data.personal_info?.image === "string"
      ? data.personal_info.image
      : null;

  return (
    /*
      FIX: The original used `grid grid-cols-3` which collapses to 1 column during
      @media print because Tailwind generates screen-media classes only.
      Replaced with an inline-style table-based layout that is guaranteed to
      render as two columns at print time without any media query dependency.
      We use `display: table` / `display: table-cell` via inline styles because
      these layout primitives work identically in both screen and print contexts.
    */
    <div className="max-w-5xl mx-auto bg-white text-zinc-800">
      {/* ── Top header row (photo + name) ── */}
      <div style={{ display: "table", width: "100%", tableLayout: "fixed" }}>
        {/* Left col: photo */}
        <div
          style={{
            display: "table-cell",
            width: "33.333%",
            verticalAlign: "middle",
            padding: "2rem 1.5rem",
          }}
        >
          {profileSrc ? (
            <img
              src={profileSrc}
              alt="Profile"
              className="w-28 h-28 object-cover rounded-full mx-auto"
              style={{ background: accentColor + "70" }}
            />
          ) : (
            <div
              className="w-28 h-28 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold"
              style={{ backgroundColor: accentColor }}
            >
              {data.personal_info?.full_name?.[0] || "?"}
            </div>
          )}
        </div>

        {/* Right col: name + title */}
        <div
          style={{
            display: "table-cell",
            width: "66.666%",
            verticalAlign: "middle",
            padding: "2rem",
          }}
        >
          <h1 className="text-4xl font-bold text-zinc-700 tracking-widest">
            {data.personal_info?.full_name || "Your Name"}
          </h1>
          {data.personal_info?.profession && (
            <p className="uppercase text-zinc-600 font-medium text-sm tracking-widest mt-1">
              {data.personal_info.profession}
            </p>
          )}
        </div>
      </div>

      {/* ── Body: sidebar + main ── */}
      <div style={{ display: "table", width: "100%", tableLayout: "fixed" }}>

        {/* ── Left sidebar ── */}
        <aside
          className="border-r border-zinc-300"
          style={{
            display: "table-cell",
            width: "33.333%",
            verticalAlign: "top",
            padding: "0 1.5rem 2rem",
          }}
        >
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-sm font-semibold tracking-widest text-zinc-500 mb-3 print-keep-with-next">
              CONTACT
            </h2>
            <div className="space-y-2 text-sm">
              {data.personal_info?.phone && (
                <div className="flex items-center gap-2 print-no-break">
                  <Phone size={13} style={{ color: accentColor, flexShrink: 0 }} />
                  <span>{data.personal_info.phone}</span>
                </div>
              )}
              {data.personal_info?.email && (
                <div className="flex items-start gap-2 print-no-break">
                  <Mail size={13} style={{ color: accentColor, flexShrink: 0, marginTop: 2 }} />
                  <span className="break-all">{data.personal_info.email}</span>
                </div>
              )}
              {data.personal_info?.location && (
                <div className="flex items-center gap-2 print-no-break">
                  <MapPin size={13} style={{ color: accentColor, flexShrink: 0 }} />
                  <span>{data.personal_info.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-sm font-semibold tracking-widest text-zinc-500 mb-3 print-keep-with-next">
                EDUCATION
              </h2>
              <div className="space-y-4 text-sm">
                {data.education.map((edu, index) => (
                  <div key={index} className="print-no-break">
                    <p className="font-semibold uppercase">{edu.degree}</p>
                    {edu.field && <p className="text-zinc-500 text-xs">in {edu.field}</p>}
                    <p className="text-zinc-600">{edu.institution}</p>
                    <p className="text-xs text-zinc-400">
                      {formatDate(edu.graduation_date)}
                    </p>
                    {edu.gpa && <p className="text-xs text-zinc-400">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold tracking-widest text-zinc-500 mb-3 print-keep-with-next">
                SKILLS
              </h2>
              <ul className="space-y-1 text-sm">
                {data.skills.map((skill, index) => (
                  <li key={index} className="text-zinc-700">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>

        {/* ── Main content ── */}
        <main
          style={{
            display: "table-cell",
            width: "66.666%",
            verticalAlign: "top",
            padding: "0 2rem 2rem",
          }}
        >
          {/* Summary */}
          {data.professional_summary && (
            <section className="mb-8 print-no-break">
              <h2
                className="text-sm font-semibold tracking-widest mb-3 print-keep-with-next"
                style={{ color: accentColor }}
              >
                SUMMARY
              </h2>
              <p className="text-zinc-700 leading-relaxed text-sm">
                {data.professional_summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold tracking-widest mb-4 print-keep-with-next"
                style={{ color: accentColor }}
              >
                EXPERIENCE
              </h2>
              <div className="space-y-6">
                {data.experience.map((exp, index) => (
                  <div key={index} className="print-no-break">
                    <div className="flex justify-between items-center flex-wrap gap-1 mb-1">
                      <h3 className="font-semibold text-zinc-900 text-sm">{exp.position}</h3>
                      <span className="text-xs text-zinc-400 shrink-0">
                        {formatDate(exp.start_date)} –{" "}
                        {exp.is_current ? "Present" : formatDate(exp.end_date)}
                      </span>
                    </div>
                    <p className="text-sm mb-2 font-medium" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                    {exp.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 leading-relaxed space-y-1">
                        {exp.description
                          .split("\n")
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2
                className="text-sm font-semibold tracking-widest mb-4 print-keep-with-next"
                style={{ color: accentColor }}
              >
                PROJECTS
              </h2>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="print-no-break">
                    <h3 className="text-sm font-semibold text-zinc-800">{project.name}</h3>
                    {project.type && (
                      <p className="text-sm mb-1" style={{ color: accentColor }}>
                        {project.type}
                      </p>
                    )}
                    {project.description && (
                      <ul className="list-disc list-inside text-sm text-zinc-700 space-y-1">
                        {project.description
                          .split("\n")
                          .filter(Boolean)
                          .map((line, i) => (
                            <li key={i}>{line}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default MinimalImageTemplate;