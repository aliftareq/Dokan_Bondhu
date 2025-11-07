import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  // Lock scroll when drawer is open + close on ESC
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a1122cc] backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Brand */}
          <div className="flex items-center gap-2 font-extrabold tracking-tight">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-sky-300">
              <path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="11" r="3.5" fill="none" stroke="#a78bfa" />
            </svg>
            <span className="text-slate-100">DOKAN | BONDHU</span>
          </div>

          {/* Desktop nav (visible only on large screens) */}
          <nav className="hidden md:!flex items-center gap-2">
            <Link
              to="/dashboard"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
            >
              Dashboard
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
            >
              Services
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-white/5"
            >
              FAQ
            </Link>
            <Link
              to="/"
              className="rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-300 px-4 py-2 text-sm font-extrabold text-slate-900 shadow-[0_8px_24px_rgba(109,40,217,.35)] transition hover:-translate-y-0.5"
            >
              Log in
            </Link>
          </nav>

          {/* Hamburger (mobile / tablet only) */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-drawer"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-slate-200 hover:bg-white/10 focus:outline-none lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M8 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay (mobile only) */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] lg:hidden"
        />
      )}

      {/* Slide-in sidebar (mobile only) */}
      <aside
        id="mobile-drawer"
        className={`fixed right-0 top-0 z-50 h-full w-72 transform border-l border-white/10 bg-[#0b1220] p-5 text-slate-100 shadow-2xl transition-transform duration-300 lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold tracking-tight">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-sky-300">
              <path d="M12 2l7 4v6c0 5-7 10-7 10S5 17 5 12V6l7-4Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="11" r="3.5" fill="none" stroke="#a78bfa" />
            </svg>
            <span>DOKAN | BONDHU</span>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-white/10" aria-label="Close menu">
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/5">
            Dashboard
          </Link>
          <Link to="/" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/5">
            Services
          </Link>
          <Link to="/" onClick={() => setOpen(false)} className="rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/5">
            FAQ
          </Link>
          <Link to="/" onClick={() => setOpen(false)} className="mt-2 rounded-xl bg-gradient-to-tr from-violet-500 to-cyan-300 px-4 py-3 text-center text-sm font-extrabold text-slate-900 shadow-[0_8px_24px_rgba(109,40,217,.35)]">
            Log in
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default NavBar;
