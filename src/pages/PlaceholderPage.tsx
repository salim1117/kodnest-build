interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <section className="py-16">
      <h1 className="font-serif text-foreground">{title}</h1>
      <p className="mt-4 text-muted-foreground text-block">
        This section will be built in the next step.
      </p>
    </section>
  );
};

export default PlaceholderPage;
