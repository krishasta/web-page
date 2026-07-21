import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

const legalSections = [
  {
    title: "Website Information",
    content:
      "The content on this website is provided for general information about Solve, its products, capabilities and services. Product features, availability and timelines may change.",
  },
  {
    title: "No Binding Offer",
    content:
      "Website content does not create a binding commercial offer, warranty or commitment. Any project, subscription, pilot or service engagement will be governed by a separate written agreement.",
  },
  {
    title: "Acceptable Use",
    content:
      "You must not misuse this website, attempt unauthorised access, introduce malicious code, interfere with operation or use the website for unlawful purposes.",
  },
  {
    title: "Intellectual Property",
    content:
      "Unless otherwise stated, website content, branding, graphics and original materials belong to Solve. You may not reproduce or commercially use them without permission.",
  },
  {
    title: "Third-Party Services",
    content:
      "This website may rely on or link to third-party platforms. Solve is not responsible for third-party content, availability or policies.",
  },
  {
    title: "Disclaimer",
    content:
      'The website is provided on an "as available" basis. To the extent permitted by law, Solve disclaims implied warranties relating to accuracy, availability and fitness for a particular purpose.',
  },
  {
    title: "Limitation of Liability",
    content:
      "To the extent permitted by law, Solve will not be liable for indirect, incidental or consequential losses arising from use of this website.",
  },
  {
    title: "Changes",
    content:
      "We may update these terms periodically. Continued use after an update means you accept the revised terms.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Legal = () => {
  const { dark } = useTheme();

  return (
    <section className="min-h-screen px-6 py-24 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Hero card */}
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
          {/* Header row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-sm font-semibold uppercase tracking-[0.35em]"
                style={{ color: "var(--primary)" }}
              >
                Legal Notice
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Terms of Use
              </h1>
              <p
                className="mt-4 max-w-2xl text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                These Terms of Use govern access to the Solve website. By using
                this website, you agree to these terms.
              </p>
            </div>
            <div
              className="rounded-2xl border px-4 py-3 text-sm shrink-0"
              style={{
                borderColor: "var(--border)",
                background: "var(--bg-secondary)",
              }}
            >
              <p className="font-semibold">Last Updated</p>
              <p style={{ color: "var(--text-secondary)" }}>July 2026</p>
            </div>
          </div>

          {/* Section cards */}
          <motion.div
            className="mt-10 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {legalSections.map((section) => (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="rounded-2xl border p-6 transition-shadow hover:shadow-md"
                style={{
                  borderColor: "var(--border)",
                  background: dark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.35)",
                }}
              >
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p
                  className="mt-3 leading-7"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {section.content}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-10 rounded-2xl border p-6"
            style={{
              borderColor: "var(--border)",
              background: "var(--bg-secondary)",
            }}
          >
            <h2 className="text-xl font-semibold">Contact</h2>
            <p
              className="mt-3 leading-7"
              style={{ color: "var(--text-secondary)" }}
            >
              For questions regarding these terms, please reach out through our
              contact page or via our official email address.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center font-semibold transition-opacity hover:opacity-75"
              style={{ color: "var(--primary)" }}
            >
              Go to Contact Page →
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Legal;
