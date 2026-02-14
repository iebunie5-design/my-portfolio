"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import profile from "../../mocks/profile.json";

type Lang = "ko" | "en";

const t = {
  ko: {
    nav: ["소개", "강의", "기술", "프로젝트", "연락처"],
    greeting: "안녕하세요,",
    viewProjects: "프로젝트 보기",
    contact: "연락하기",
    inquiry: "수강 문의하기",
    sections: ["소개", "강의 경력", "기술 스택", "프로젝트", "연락처"],
    form: {
      name: "이름",
      email: "이메일",
      message: "문의 내용",
      placeholder: {
        name: "홍길동",
        email: "example@email.com",
        message: "수강 문의 또는 협업 제안을 남겨주세요.",
      },
      submit: "메시지 보내기",
      sending: "전송 중...",
      success: "이메일 앱이 열렸어요! 전송 버튼을 눌러 완료해 주세요.",
      error: "전송에 실패했어요. 이메일로 직접 연락해 주세요.",
    },
  },
  en: {
    nav: ["About", "Teaching", "Skills", "Projects", "Contact"],
    greeting: "Hi, I'm",
    viewProjects: "View Projects",
    contact: "Contact Me",
    inquiry: "Inquire Now",
    sections: ["About Me", "Teaching", "Skills", "Projects", "Contact"],
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      placeholder: {
        name: "John Doe",
        email: "example@email.com",
        message: "Leave your inquiry or collaboration proposal.",
      },
      submit: "Send Message",
      sending: "Sending...",
      success: "Email app opened! Please press Send to complete.",
      error: "Failed to send. Please contact me directly via email.",
    },
  },
};

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function useTyping(texts: string[], speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    if (!deleting && charIdx < current.length) {
      const timer = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(timer);
    }
    if (!deleting && charIdx === current.length) {
      const timer = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(timer);
    }
    if (deleting && charIdx > 0) {
      const timer = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(timer);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, idx, texts, speed]);

  useEffect(() => {
    setDisplayed(texts[idx].slice(0, charIdx));
  }, [charIdx, idx, texts]);

  return displayed;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  const [dark, setDark] = useState(false);
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const tx = t[lang];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const subject = encodeURIComponent(`[포트폴리오 문의] ${name}`);
    const body = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n문의 내용:\n${message}`);
    window.location.href = `mailto:iebunie5@gmail.com?subject=${subject}&body=${body}`;
    setFormState("success");
    form.reset();
  }

  const typingTexts = lang === "ko"
    ? ["개발자 & 강사", "인텔 AI 앱 크리에이터 강사", "코딩학원 원장"]
    : ["Developer & Instructor", "Intel AI App Creator Trainer", "Coding Academy Director"];

  const typed = useTyping(typingTexts);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const navIds = ["about", "teaching", "skills", "projects", "contact"] as const;

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg">{profile.name}</span>
          <div className="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400">
            {navIds.map((id, i) => (
              <a key={id} href={`#${id}`} className="hover:text-orange-500 transition-colors">
                {tx.nav[i]}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === "ko" ? "en" : "ko")}
              className="text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 hover:border-orange-400 hover:text-orange-500 transition-colors"
            >
              {lang === "ko" ? "EN" : "한"}
            </button>
            <button
              onClick={() => setDark(!dark)}
              className="text-lg hover:scale-110 transition-transform"
              aria-label="Toggle dark mode"
            >
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* 텍스트 */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block bg-orange-50 dark:bg-orange-950 text-orange-500 text-sm font-medium px-3 py-1 rounded-full border border-orange-100 dark:border-orange-900">
                {profile.mbti} · {profile.title[lang]}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              {lang === "ko" ? (
                <>안녕하세요,<br /><span className="text-orange-500">{profile.name}</span>입니다</>
              ) : (
                <>Hi, I&apos;m <span className="text-orange-500">{profile.name}</span></>
              )}
            </h1>
            <p className="text-2xl text-gray-400 dark:text-gray-500 mb-3 h-9 font-medium">
              {typed}<span className="animate-pulse text-orange-400">|</span>
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl">
              {profile.tagline[lang]}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-md shadow-orange-200 dark:shadow-orange-900">
                {tx.inquiry}
              </a>
              <a href="#projects" className="border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-orange-300 hover:text-orange-500 transition-colors">
                {tx.viewProjects}
              </a>
            </div>
          </motion.div>

          {/* 프로필 이미지 */}
          <motion.div
            className="shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
              <Image
                src="/profile.png"
                alt={profile.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-2">{tx.sections[0]}</h2>
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
              {profile.about[lang]}
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Teaching */}
      <section id="teaching" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-2">{tx.sections[1]}</h2>
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.teaching.map((item, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <motion.div
                  className="rounded-xl p-6 border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-md transition-all h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg leading-snug">{item.title[lang]}</h3>
                    <span className="ml-3 shrink-0 text-xs font-semibold bg-orange-50 dark:bg-orange-950 text-orange-500 px-2 py-1 rounded-full border border-orange-100 dark:border-orange-900">
                      {item.role[lang]}
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {item.description[lang]}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-2">{tx.sections[2]}</h2>
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
          </FadeInSection>
          <div className="grid gap-5 max-w-lg">
            {profile.skills.map((skill, i) => (
              <FadeInSection key={skill.name} delay={i * 0.08}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="bg-orange-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-2">{tx.sections[3]}</h2>
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.projects.map((project, i) => (
              <FadeInSection key={project.title} delay={i * 0.1}>
                <motion.div
                  className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-md transition-all h-full"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold mb-2">{tx.sections[4]}</h2>
            <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 연락처 정보 */}
              <div className="flex flex-col gap-4">
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {lang === "ko"
                    ? "수강 문의, 강의 협업 제안 등 어떤 내용이든 편하게 연락주세요."
                    : "Feel free to reach out for course inquiries or collaboration proposals."}
                </p>
                <a href={`mailto:${profile.contact.email}`} className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <span className="text-orange-400">✉</span> {profile.contact.email}
                </a>
                <a href={`https://${profile.contact.github}`} className="text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors flex items-center gap-2">
                  <span className="text-orange-400">⌥</span> {profile.contact.github}
                </a>
              </div>

              {/* 문의 폼 */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {tx.form.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={tx.form.placeholder.name}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {tx.form.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={tx.form.placeholder.email}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    {tx.form.message}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={tx.form.placeholder.message}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-colors text-sm resize-none"
                  />
                </div>

                {formState === "success" && (
                  <p className="text-sm text-green-600 dark:text-green-400">{tx.form.success}</p>
                )}
                {formState === "error" && (
                  <p className="text-sm text-red-500">{tx.form.error}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 disabled:opacity-60 transition-colors shadow-md shadow-orange-200 dark:shadow-orange-900"
                >
                  {formState === "sending" ? tx.form.sending : tx.form.submit}
                </button>
              </form>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 dark:border-gray-800 text-center text-sm text-gray-400 transition-colors duration-300">
        © 2026 {profile.name} · Made with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
