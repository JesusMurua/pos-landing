interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-gray-500">{subtitle}</p>
      )}
    </div>
  );
}
