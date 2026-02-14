import profile from "../../mocks/profile.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg text-gray-900">{profile.name}</span>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#about" className="hover:text-orange-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-orange-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-orange-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-orange-500 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-block bg-orange-50 text-orange-500 text-sm font-medium px-3 py-1 rounded-full border border-orange-100">
            {profile.mbti} · {profile.title}
          </span>
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
          안녕하세요,<br />
          <span className="text-orange-500">{profile.name}</span>입니다
        </h1>
        <p className="text-xl text-gray-500 mb-8 max-w-xl">{profile.tagline}</p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className="border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-orange-300 hover:text-orange-500 transition-colors"
          >
            연락하기
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">{profile.about}</p>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Skills</h2>
          <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full"></div>
          <div className="grid gap-4 max-w-lg">
            {profile.skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Projects</h2>
          <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.projects.map((project) => (
              <div
                key={project.title}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all"
              >
                <h3 className="font-bold text-lg mb-2 text-gray-900">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-2">Contact</h2>
          <div className="w-12 h-1 bg-orange-500 mb-8 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.contact.email}`}
              className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-2"
            >
              <span className="text-orange-400">✉</span> {profile.contact.email}
            </a>
            <a
              href={`https://${profile.contact.github}`}
              className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-2"
            >
              <span className="text-orange-400">⌥</span> {profile.contact.github}
            </a>
            <a
              href={`https://${profile.contact.linkedin}`}
              className="text-gray-600 hover:text-orange-500 transition-colors flex items-center gap-2"
            >
              <span className="text-orange-400">◈</span> {profile.contact.linkedin}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-100 text-center text-sm text-gray-400">
        © 2026 {profile.name} · Made with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
