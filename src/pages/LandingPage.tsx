import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="px-10 py-6">
        <span className="font-serif text-lg font-semibold text-foreground">KodNest</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-foreground mb-4">
            Stop Missing The Right Jobs.
          </h1>
          <p className="text-muted-foreground text-lg text-block mx-auto">
            Precision-matched job discovery delivered daily at 9AM.
          </p>
          <Link to="/settings">
            <Button className="mt-10 text-lg px-12 py-6 h-16 rounded-xl" size="lg">
              Start Tracking
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
