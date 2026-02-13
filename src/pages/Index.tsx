import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ErrorState from "@/components/states/ErrorState";
import EmptyState from "@/components/states/EmptyState";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <PageShell
      headline="Design System Showcase"
      subtext="A comprehensive overview of every element in the KodNest Premium Build System."
      currentStep={1}
      totalSteps={7}
      status="in-progress"
    >
      <div className="flex flex-col gap-16">
        {/* Typography */}
        <section>
          <h2>Typography</h2>
          <Separator className="my-6" />
          <div className="flex flex-col gap-4 text-block">
            <h1>Heading One — Confident & Clear</h1>
            <h2>Heading Two — Structured Purpose</h2>
            <h3>Heading Three — Section Level</h3>
            <h4>Heading Four — Detail Level</h4>
            <p className="text-foreground">
              Body text renders in Inter at 16px with generous line-height. Every paragraph
              is capped at 720px to maintain comfortable reading measure. The design system
              enforces calm, intentional typography with no decorative noise.
            </p>
            <p className="text-muted-foreground text-sm">
              This is secondary text using the muted foreground color for supporting information.
            </p>
          </div>
        </section>

        {/* Colors */}
        <section>
          <h2>Color Palette</h2>
          <Separator className="my-6" />
          <div className="flex gap-4 flex-wrap">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-background border border-border" />
              <span className="text-xs text-muted-foreground">Background</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-foreground" />
              <span className="text-xs text-muted-foreground">Foreground</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-primary" />
              <span className="text-xs text-muted-foreground">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-success" />
              <span className="text-xs text-muted-foreground">Success</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-warning" />
              <span className="text-xs text-muted-foreground">Warning</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-md bg-muted" />
              <span className="text-xs text-muted-foreground">Muted</span>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2>Buttons</h2>
          <Separator className="my-6" />
          <div className="flex gap-4 flex-wrap items-center">
            <Button>Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link Style</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2>Badges</h2>
          <Separator className="my-6" />
          <div className="flex gap-4 flex-wrap items-center">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2>Cards</h2>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Step</CardTitle>
                <CardDescription>Complete this step to move forward in the process.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards use subtle 1px borders with no drop shadows for a calm, focused aesthetic.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verification</CardTitle>
                <CardDescription>Confirm that your implementation works correctly.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Balanced padding follows the 8/16/24/40/64px spacing scale consistently.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Inputs */}
        <section>
          <h2>Form Inputs</h2>
          <Separator className="my-6" />
          <div className="flex flex-col gap-6 max-w-md">
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-input">Project Name</Label>
              <Input id="demo-input" placeholder="Enter project name..." />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="demo-textarea">Description</Label>
              <Textarea id="demo-textarea" placeholder="Describe your project..." />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="demo-check" />
              <Label htmlFor="demo-check">I confirm this step is complete</Label>
            </div>
          </div>
        </section>

        {/* States */}
        <section>
          <h2>States</h2>
          <Separator className="my-6" />
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <ErrorState onAction={() => {}} />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <EmptyState onAction={() => {}} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageShell>
  );
};

export default Index;
