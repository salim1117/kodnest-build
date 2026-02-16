import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Moon, Sun, Briefcase } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Saved", to: "/saved" },
  { label: "Digest", to: "/digest" },
  { label: "Settings", to: "/settings" },
  { label: "Test", to: "/jt/07-test" },
  { label: "Proof", to: "/jt/proof" },
  { label: "Ship", to: "/jt/08-ship" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-10 py-3.5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-foreground tracking-tight">
            KodNest
          </span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-accent/10 transition-all duration-200"
                activeClassName="text-primary font-semibold bg-primary/5"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg hover:bg-accent/10"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px] text-warning" />
            ) : (
              <Moon className="h-[18px] w-[18px] text-muted-foreground" />
            )}
          </Button>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t border-border bg-card">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="block px-10 py-3 text-sm text-muted-foreground border-l-2 border-transparent transition-default"
                activeClassName="text-primary border-l-2 border-primary font-medium bg-primary/5"
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
