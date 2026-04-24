"use client";

import { motion } from "framer-motion";
import Map from "@/src/components/common/Map";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Newsletter() {
  const t = useTranslations("home.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="py-12 bg-[#8b6914] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >
          {/* Newsletter Signup */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
            }}
            className="text-left text-white"
          >
            <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
            <p className="text-white/80 mb-6 text-lg">{t("description")}</p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md gap-3">
              <div className="flex-1 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("placeholder")}
                  disabled={status === "loading" || status === "success"}
                  className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#c9a87c] text-black outline-none disabled:opacity-70"
                  required
                />
              </div>
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="w-full sm:w-auto bg-[#5c4a3d] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#4a3d32] transition-colors whitespace-nowrap disabled:opacity-70"
              >
                {status === "loading" ? "..." : t("button")}
              </button>
            </form>
            {status === "success" && (
              <p className="mt-2 text-green-300">Successfully subscribed!</p>
            )}
            {status === "error" && (
              <p className="mt-2 text-red-300">Failed to subscribe. Please try again.</p>
            )}
          </motion.div>

          {/* Map Embed */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: { type: "spring", bounce: 0.3, duration: 0.8 },
              },
            }}
            className="h-[300px] w-full rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
          >
            <Map />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
