interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="px-10 py-10 border-b border-border">
      <h1 className="font-serif text-foreground">{headline}</h1>
      <p className="mt-2 text-muted-foreground text-block">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
