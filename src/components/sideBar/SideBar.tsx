import { Link } from "@tanstack/react-router";

const navItems = [
  {
    to: "/",
    label: "Notion",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="8"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.9"
        />
        <rect
          x="13"
          y="3"
          width="8"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="3"
          y="13"
          width="8"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.5"
        />
        <rect
          x="13"
          y="13"
          width="8"
          height="8"
          rx="1.5"
          fill="currentColor"
          opacity="0.2"
        />
      </svg>
    ),
  },
  {
    to: "/kanban",
    label: "Kanban",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <circle
          cx="12"
          cy="12"
          r="7"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.25"
        />
        <line
          x1="12"
          y1="1"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="12"
          y1="19"
          x2="12"
          y2="23"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="1"
          y1="12"
          x2="5"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <line
          x1="19"
          y1="12"
          x2="23"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

export const Sidebar = () => {
  return (
    <aside className="group fixed left-0 top-0 h-screen w-14 hover:w-52 bg-[#0a0a0a] border-r border-white/[0.06] flex flex-col py-5 gap-1 transition-all duration-300 ease-in-out overflow-hidden z-50">
      <div className="px-4 mb-4 flex items-center gap-3 h-8">
        <div className="w-6 h-6 rounded-md bg-white/10 border border-white/10 shrink-0" />
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 text-white/30 text-xs font-medium tracking-widest uppercase whitespace-nowrap">
          Menu
        </span>
      </div>
      <div className="w-6 mx-auto border-t border-white/[0.06] mb-2 group-hover:w-44 transition-all duration-300" />
      {navItems.map(({ to, icon, label }) => (
        <Link
          key={to}
          to={to}
          className="relative flex items-center gap-3 mx-2 px-3 py-3 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.05] transition-all duration-200 [&.active]:text-white [&.active]:bg-white/[0.08]"
        >
          <span className="shrink-0">{icon}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-75 text-sm font-medium whitespace-nowrap tracking-wide">
            {label}
          </span>
        </Link>
      ))}
    </aside>
  );
};
