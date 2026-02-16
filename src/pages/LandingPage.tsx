import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Moon, Sun } from "lucide-react";

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Briefcase className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-foreground tracking-tight">KodNest</span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-lg"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? <Sun className="h-[18px] w-[18px] text-warning" /> : <Moon className="h-[18px] w-[18px] text-muted-foreground" />}
          </Button>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="rounded-lg">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Job Matching
          </div>

          <h1 className="font-serif text-foreground mb-6 text-5xl md:text-6xl leading-[1.1]">
            Stop Missing<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Right Jobs.
            </span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl text-block mx-auto leading-relaxed max-w-xl">
            Precision-matched job discovery delivered daily at 9AM.
            Never miss a perfect opportunity again.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link to="/settings">
              <Button className="text-lg px-10 py-6 h-14 rounded-xl gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" size="lg">
                Start Tracking
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-16">
            {[
              { icon: Target, label: "Smart Match Scoring" },
              { icon: Zap, label: "Daily 9AM Digest" },
              { icon: Briefcase, label: "60+ Active Jobs" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 bg-card border border-border rounded-xl px-5 py-3 text-sm text-muted-foreground shadow-sm">
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
