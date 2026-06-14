// File Purpose: Home and resume-builder UI section component: ResumePreview.
import { useEffect } from "react";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";
import MinimalTemplate from "../templates/MinimalTemplate";
import MinimalImageTemplate from "../templates/MinimalImageTemplate";

// Inject print CSS once into <head> — avoids the broken `style jsx` approach
// that did nothing in Vite/React (no styled-jsx transformer installed).
const PRINT_STYLE_ID = "resume-print-styles";

function ensurePrintStyles(previewId) {
  let el = document.getElementById(PRINT_STYLE_ID);
  if (!el) {
    el = document.createElement("style");
    el.id = PRINT_STYLE_ID;
    document.head.appendChild(el);
  }
  el.textContent = `
    @page {
      size: letter;
      margin: 0;
    }
    @media print {
      /* Force browser to render background colours (accentColor, skill chips, etc.) */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      /* Hide everything except the target resume */
      body * { visibility: hidden; }

      #${previewId},
      #${previewId} * { visibility: visible; }

      /* Position resume at top-left, full width, auto height.
         Do NOT set height: 11in — that silently clips multi-page resumes. */
      #${previewId} {
        position: fixed;
        inset: 0;
        width: 8.5in;
        height: auto;
        margin: 0;
        padding: 0;
        overflow: visible;
        box-shadow: none !important;
        border: none !important;
        background: white !important;
      }

      /* Prevent experience / education / project entries from splitting across pages */
      .print-no-break {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      /* Ensure section headings stay with their first item */
      .print-keep-with-next {
        page-break-after: avoid;
        break-after: avoid;
      }
    }
  `;
}

const ResumePreview = ({
  data,
  template,
  accentColor,
  classes = "",
  previewId = "resume-preview",
}) => {
  // Re-inject styles whenever the previewId changes (main vs print modal)
  useEffect(() => {
    ensurePrintStyles(previewId);
    return () => {
      // Clean up only when the component fully unmounts (not on re-render)
    };
  }, [previewId]);

  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="w-full bg-gray-100">
      <div
        id={previewId}
        className={"border border-gray-200 print:shadow-none print:border-none " + classes}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;