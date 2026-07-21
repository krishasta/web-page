import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const sections = [
  {
    title: "1. Introduction",
    content:
      "Welcome to Solve. These Terms and Conditions govern your use of our website, services, and any related engagements. By accessing our website or contacting us for services, you agree to be bound by these terms.",
  },
  {
    title: "2. Services",
    content:
      "We provide technology, automation, consulting, and digital solutions tailored to client requirements. Scope, deliverables, timelines, and pricing will be clearly communicated before work begins.",
  },
  {
    title: "3. Client Responsibilities",
    content:
      "Clients are responsible for providing accurate information, timely approvals, and required access to materials or systems needed for project completion. Delays caused by incomplete information may affect timelines.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content, branding, design assets, documentation, and deliverables created by Solve remain the property of Solve unless otherwise agreed in writing. Clients may use approved deliverables for their intended business purpose.",
  },
  {
    title: "5. Payments and Cancellation",
    content:
      "Fees, milestones, and payment schedules will be agreed upon before commencement. Any cancellation after work has begun may require payment for completed work and associated costs incurred.",
  },
  {
    title: "6. Confidentiality",
    content:
      "Both parties agree to protect shared confidential information and use it only for the purpose of the agreed engagement. We will take reasonable steps to safeguard sensitive business data provided by the client.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "Solve shall not be liable for indirect, incidental, or consequential damages arising from the use of our services, except where such liability cannot be excluded by law.",
  },
  {
    title: "8. Governing Law",
    content:
      "These terms shall be governed by the laws of India, and any disputes shall be resolved in the appropriate courts of competent jurisdiction in India.",
  },
];

const TermsAndConditions = () => {
  const { dark } = useTheme();

  return (
    <section className="min-h-screen px-6 py-24 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2rem] border p-8 md:p-12 shadow-[var(--card-shadow)]"
          style={{
            background: dark ? "var(--surface)" : "rgba(255,255,255,0.8)",
            borderColor: "var(--border)",
            color: "var(--text-primary)",
          }}
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em]" style={{ color: "var(--primary)" }}>
                Legal Notice
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Terms & Conditions
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7" style={{ color: "var(--text-secondary)" }}>
                These terms define how Solve operates, how services are delivered, and how our clients and partners can engage with us responsibly and transparently.
              </p>
            </div>
            <div className="rounded-2xl border px-4 py-3 text-sm" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
              <p className="font-semibold">Last Updated</p>
              <p style={{ color: "var(--text-secondary)" }}>20 July 2026</p>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.35)" }}>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="mt-3 leading-7" style={{ color: "var(--text-secondary)" }}>
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--bg-secondary)" }}>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="mt-3 leading-7" style={{ color: "var(--text-secondary)" }}>
              For questions regarding these terms, please contact us through our website contact page or our official email address.
            </p>
            <Link to="/contact" className="mt-4 inline-flex items-center font-semibold" style={{ color: "var(--primary)" }}>
              Go to Contact Page →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
