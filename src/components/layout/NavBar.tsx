import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Proof", to: "/proof" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background">
      <div className="flex items-center justify-between px-10 py-4">
        <span className="font-serif text-lg font-semibold text-foreground">
          KodNest
        </span>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="text-sm text-muted-foreground pb-1 border-b-2 border-transparent transition-default"
                activeClassName="text-foreground border-b-2 border-primary font-medium"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t border-border">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="block px-10 py-3 text-sm text-muted-foreground border-l-2 border-transparent transition-default"
                activeClassName="text-foreground border-l-2 border-primary font-medium bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
