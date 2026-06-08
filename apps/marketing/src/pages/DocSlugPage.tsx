import { useParams } from 'react-router-dom';

export default function DocSlugPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Documentation
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Viewing doc: <span className="font-mono">{slug}</span>
      </p>
    </div>
  );
}
