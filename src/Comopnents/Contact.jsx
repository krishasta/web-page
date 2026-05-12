import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useTheme } from "./ThemeContext";

const Contact = () => {
  const { dark } = useTheme();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({
    name: "",
    email: "",
    mes: "",
    last: "",
    phone: ""
  })

  const { name, email, mes, last, phone } = items

  const handle = (e) => {
    let { name, value } = e.target
    setItems({ ...items, [name]: value })
  }

  const onsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const templateParams = {
      from_name: `${items.name} ${items.last}`,
      from_email: items.email,
      phone: items.phone,
      message: items.mes,
    };
    try {
      await emailjs.send(
        "service_dqvjtle",       // 🔑 Replace with your EmailJS Service ID
        "template_5exmyzg",      // 🔑 Replace with your EmailJS Template ID
        templateParams,
        "0yRRlv7x2k601mtuz"        // 🔑 Replace with your EmailJS Public Key
      );
      setStatus("✅ Message sent successfully! We'll get back to you soon.");
      setItems({ name: "", email: "", mes: "", last: "", phone: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const colors = {
    sectionBg: "var(--bg-primary)",
    cardBg: "var(--surface)",
    cardBorder: "1px solid var(--border)",
    cardShadow: "var(--card-shadow)",
    headingText: "var(--text-primary)",
    bodyText: "var(--text-secondary)",
    subtitleText: "var(--primary)",
    accent: "var(--primary)",
  };

  return (
    <section
      className="min-h-screen py-24 px-4 transition-colors duration-400"
      style={{ background: colors.sectionBg }}
    >
      {/* ── Header ── */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        {/* <p className="text-xs font-bold tracking-[0.35em] uppercase mb-3 transition-colors" style={{ color: colors.subtitleText }}>
          Get In Touch
        </p> */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 transition-colors" style={{ color: colors.headingText }}>
          <span className="animate-float-blue ">CONTACT</span> US
        </h1>
        <p className="text-base sm:text-lg transition-colors" style={{ color: colors.bodyText }}>
          Let's get this conversation started. Tell us a bit about yourself,
          and we'll get in touch as soon as we can.
        </p>
        {/* <div className="flex justify-center mt-5">
          <div className="h-[3px] w-20 rounded-full" style={{ background: dark ? "linear-gradient(to right, #38bdf8, #0ea5e9)" : "linear-gradient(to right, #7dd3fc, #2563eb)" }} />
        </div> */}
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 px-2 sm:px-4">

        {/* ── Left: Map + Address card ── */}
        <div
          className="flex-1 flex flex-col rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300"
          style={{
            background: colors.cardBg,
            border: colors.cardBorder,
            boxShadow: colors.cardShadow,
          }}
        >
          {/* Top gradient line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-400 flex-shrink-0" />

          <div className="p-6 flex flex-col gap-6 flex-1">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: colors.cardBorder,
                boxShadow: "0 2px 12px rgba(56,189,248,0.15)",
              }}
            >
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.172663684281!2d77.01465433378!3d11.004225359722506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859ffc10eed07%3A0x256b211ac1da99ce!2sPOPE%20PROFESSIONAL%20ACOUSTICS%20LTD!5e1!3m2!1sen!2sin!4v1751695194410!5m2!1sen!2sin"
                width="100%"
                height="300"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              /> */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221.51242360770846!2d77.01409604989625!3d11.003535335472007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8578d02e1fd29%3A0x814c680c47ee28ea!2sSolve!5e1!3m2!1sen!2sin!4v1777529333998!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />

            </div>

            {/* Address section */}
            <div>
              <h2 className="text-lg font-extrabold text-center mb-3 transition-colors" style={{ color: colors.headingText }}>
                Our Location
              </h2>
              <div className="w-10 h-px mx-auto mb-4" style={{ background: colors.cardBorder }} />

              <ul className="space-y-3">
                {/* Address */}
                <li className="flex items-start gap-3 text-sm transition-colors" style={{ color: colors.bodyText }}>
                  <span
                    className="mt-[5px] w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: dark ? "#38bdf8" : "#2563eb" }}
                  />
                  <span>
                    No. 89, Rajiv Gandhi Nagar, Phase-1, 80 Feet Road,
                    B.R. Layout, Sowri Palayam, Coimbatore,
                    Tamil Nadu – 641028
                  </span>
                </li>
                {/* Phone */}
                <li className="flex items-start gap-3 text-sm transition-colors" style={{ color: colors.bodyText }}>
                  <span
                    className="mt-[5px] w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: dark ? "#38bdf8" : "#2563eb" }}
                  />
                  <span>Contact Number: 9342245655</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom shimmer */}
          <div className="h-[3px] w-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 flex-shrink-0" />
        </div>

        {/* ── Right: Contact Form card ── */}
        <div
          className="flex-1 flex flex-col rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300"
          style={{
            background: colors.cardBg,
            border: colors.cardBorder,
            boxShadow: colors.cardShadow,
          }}
        >
          {/* Top gradient line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-sky-300 via-blue-400 to-cyan-400 flex-shrink-0" />

          <div className="p-6 flex flex-col flex-1">
            <h2 className="text-lg font-extrabold text-center mb-2 transition-colors" style={{ color: colors.headingText }}>
              Send a Message
            </h2>
            <div className="w-10 h-px mx-auto mb-6" style={{ background: colors.cardBorder }} />

            <form className="space-y-4 flex-1" onSubmit={onsubmit}>
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 transition-colors" style={{ color: colors.subtitleText }}>
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handle}
                    className="w-full rounded-xl px-4 py-2 text-sm transition-colors
                               focus:outline-none focus:ring-2 focus:ring-sky-400"
                    style={{
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                      border: colors.cardBorder,
                      color: colors.bodyText
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 transition-colors" style={{ color: colors.subtitleText }}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last"
                    value={last}
                    onChange={handle}
                    className="w-full rounded-xl px-4 py-2 text-sm transition-colors
                               focus:outline-none focus:ring-2 focus:ring-sky-400"
                    style={{
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                      border: colors.cardBorder,
                      color: colors.bodyText
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-1 transition-colors" style={{ color: colors.subtitleText }}>
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handle}
                  className="w-full rounded-xl px-4 py-2 text-sm transition-colors
                             focus:outline-none focus:ring-2 focus:ring-sky-400"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                    border: colors.cardBorder,
                    color: colors.bodyText
                  }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1 transition-colors" style={{ color: colors.subtitleText }}>
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={handle}
                  className="w-full rounded-xl px-4 py-2 text-sm transition-colors
                             focus:outline-none focus:ring-2 focus:ring-sky-400"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                    border: colors.cardBorder,
                    color: colors.bodyText
                  }}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold mb-1 transition-colors" style={{ color: colors.subtitleText }}>
                  Message
                </label>
                <textarea
                  rows="4"
                  name="mes"
                  value={mes}
                  onChange={handle}
                  className="w-full rounded-xl px-4 py-2 text-sm transition-colors resize-none
                             focus:outline-none focus:ring-2 focus:ring-sky-400"
                  style={{
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.6)",
                    border: colors.cardBorder,
                    color: colors.bodyText
                  }}
                />
              </div>

              {/* Status message */}
              {status && (
                <p className="text-center text-sm font-medium transition-colors" style={{ color: colors.subtitleText }}>
                  {status}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white
                           bg-gradient-to-r from-sky-500 to-blue-600
                           hover:from-sky-600 hover:to-blue-700
                           shadow-md hover:shadow-lg
                           transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send Message →"}
              </button>
            </form>
          </div>

          {/* Bottom shimmer */}
          <div className="h-[3px] w-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default Contact;
