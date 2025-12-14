import React, { useEffect, useRef, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Report = () => {
  const reportRef = useRef(null);
  const successTimerRef = useRef(null);

  const [feedbacks, setFeedbacks] = useState([]);
  const [metrics, setMetrics] = useState({
    averageRating: 0,
    recommendRate: 0,
    positiveSentiment: 0,
    totalFeedbacks: 0,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  /** Fetch & recalc dynamically */
  const fetchFeedbacks = async () => {
    const res = await fetch("http://127.0.0.1:5555/feedbacks");
    const data = await res.json();

    const total = data.length;

    const avg =
      total > 0
        ? (
            data.reduce((a, b) => a + b.rating_overall, 0) / total
          ).toFixed(1)
        : 0;

    const recommend =
      total > 0
        ? (
            (data.filter((f) => f.recommend === "yes").length / total) *
            100
          ).toFixed(1)
        : 0;

    const positive =
      total > 0
        ? (
            (data.filter((f) => f.rating_overall >= 4).length / total) *
            100
          ).toFixed(1)
        : 0;

    setFeedbacks(data);
    setMetrics({
      averageRating: avg,
      recommendRate: recommend,
      positiveSentiment: positive,
      totalFeedbacks: total,
    });
  };

  useEffect(() => {
    fetchFeedbacks();
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  /** Generate PDF */
  const generatePDF = async () => {
    try {
      setIsGenerating(true);
      setShowSuccess(false);

      await fetchFeedbacks();
      await new Promise((r) => setTimeout(r, 300));

      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      const blob = pdf.output("blob");
      setPdfUrl(URL.createObjectURL(blob));

      setShowSuccess(true);
      successTimerRef.current = setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full relative">
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-[200px] mt-4 ml-5 rounded-lg shadow-md">
        <AdminNavBar />
      </div>

      {/* Content */}
      <div className="ml-[245px] w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-700">
            Comprehensive Analytics Report
          </h1>

          <button
            onClick={generatePDF}
            disabled={isGenerating}
            style={{ cursor: "pointer" }}
            className="px-4 py-2 text-sm text-white rounded-md bg-gradient-to-r from-teal-600 to-cyan-500 shadow-md disabled:opacity-50"
          >
            {isGenerating ? "Generating..." : "Generate PDF"}
          </button>
        </div>

        {/* REPORT BODY */}
        <div
          ref={reportRef}
          style={{
            backgroundColor: "#ffffff",
            padding: "32px",
            borderRadius: "10px",
            maxWidth: "900px",
            color: "#1f2937",
          }}
        >
          <h2 style={{ fontSize: "26px", fontWeight: 700 }}>
            FeedbackHub Customer Feedback Report
          </h2>

          <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "20px" }}>
            Generated on {new Date().toLocaleString()}
          </p>

          {/* Background */}
          <Section title="1. Background & Purpose">
            This report was generated to provide stakeholders with a detailed,
            data-driven overview of customer feedback collected through the
            FeedbackHub platform. The objective is to assess overall customer
            satisfaction, identify trends in sentiment, and highlight actionable
            insights that can inform service improvement strategies.
          </Section>

          {/* Data Scope */}
          <Section title="2. Data Scope & Methodology">
            The analysis is based on <strong>{metrics.totalFeedbacks}</strong>{" "}
            individual feedback submissions collected from users across multiple
            events. Ratings were evaluated on a numerical scale, while sentiment
            indicators were derived from rating thresholds and recommendation
            responses.
          </Section>

          {/* Metrics */}
          <Section title="3. Key Performance Metrics">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px",
              }}
            >
              <Metric title="Average Rating" value={metrics.averageRating} />
              <Metric title="Recommend Rate" value={`${metrics.recommendRate}%`} />
              <Metric
                title="Positive Sentiment"
                value={`${metrics.positiveSentiment}%`}
              />
              <Metric title="Total Feedbacks" value={metrics.totalFeedbacks} />
            </div>
          </Section>

          {/* Findings */}
          <Section title="4. Detailed Findings">
            Analysis shows that the average rating reflects a generally positive
            customer experience. A high recommendation rate suggests strong user
            trust, while positive sentiment highlights satisfaction consistency
            across events. However, lower-rated feedback indicates areas that may
            require targeted improvements.
          </Section>

          {/* Sentiment */}
          <Section title="5. Sentiment Analysis">
            Sentiment distribution demonstrates that a significant proportion of
            users expressed positive experiences (ratings ≥ 4). Negative or
            neutral responses, though fewer, offer valuable insights into pain
            points and service gaps.
          </Section>

          {/* Risks */}
          <Section title="6. Risks & Improvement Areas">
            Recurrent negative themes should be monitored closely, as unresolved
            issues could impact long-term customer loyalty. Addressing response
            time, clarity of communication, and event logistics can mitigate
            dissatisfaction risks.
          </Section>

          {/* Action Plan */}
          <Section title="7. Recommended Action Plan">
            - Maintain strengths identified in positive feedback  
            - Prioritize improvements in frequently mentioned weak areas  
            - Conduct follow-up surveys after corrective actions  
            - Track progress using recurring analytics reports
          </Section>

          {/* Conclusion */}
          <Section title="8. Conclusion">
            This report provides a comprehensive overview of customer perception.
            With continued monitoring and proactive improvements, FeedbackHub
            can sustain high satisfaction levels and enhance user engagement.
          </Section>

          <p
            style={{
              marginTop: "50px",
              fontSize: "11px",
              textAlign: "center",
              color: "#6b7280",
            }}
          >
            © {new Date().getFullYear()} FeedbackHub — Internal Use Only
          </p>
        </div>

        {/* PDF Preview */}
        {pdfUrl && (
          <div className="mt-10">
            <iframe
              src={pdfUrl}
              title="Report PDF"
              className="w-full h-[700px] border rounded-md"
            />
          </div>
        )}
      </div>

      {/* SUCCESS ALERT */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[320px] text-center">
            <div className="checkmark-wrapper">
              <div className="checkmark">✓</div>
            </div>
            <h3 className="font-bold mt-4 text-gray-700">
              PDF Generated Successfully
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Your report is ready
            </p>
          </div>
        </div>
      )}

      <style>
        {`
          .checkmark-wrapper {
            width: 60px;
            height: 60px;
            margin: auto;
            border-radius: 50%;
            background: #22c55e;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: pop 0.4s ease-out;
          }

          .checkmark {
            color: white;
            font-size: 32px;
          }

          @keyframes pop {
            0% { transform: scale(0); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section style={{ marginBottom: "26px" }}>
    <h3 style={{ fontWeight: 600, marginBottom: "6px" }}>{title}</h3>
    <p style={{ fontSize: "14px", lineHeight: "1.7" }}>{children}</p>
  </section>
);

const Metric = ({ title, value }) => (
  <div
    style={{
      border: "1px solid #e5e7eb",
      borderRadius: "6px",
      padding: "12px",
      textAlign: "center",
    }}
  >
    <p style={{ fontSize: "12px", color: "#6b7280" }}>{title}</p>
    <p style={{ fontSize: "18px", fontWeight: 700 }}>{value}</p>
  </div>
);

export default Report;
