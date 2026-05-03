'use client';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const themes = [
  { id: 'dubai',     name: 'Dubai',     bg: '#3d7bac', text: '#ffffff' },
  { id: 'japan',     name: 'Japan',     bg: '#476ea5', text: '#ffffff' },
  { id: 'amsterdam', name: 'Amsterdam', bg: '#579594', text: '#ffffff' },
  { id: 'turkey',    name: 'Turkey',    bg: '#bca55f', text: '#ffffff' },
  { id: 'egypt',     name: 'Egypt',     bg: '#e6dbbb', text: '#5c2a00' },
  { id: 'germany',   name: 'Germany',   bg: '#df7869', text: '#ffffff' },
  { id: 'greece',    name: 'Greece',    bg: '#b6e1e7', text: '#2d5be3' },
  { id: 'london',    name: 'London',    bg: '#a5173f', text: '#ffffff' },
  { id: 'maldives',  name: 'Maldives',  bg: '#beebf1', text: '#7b3a2a' },
  { id: 'milos',     name: 'Milos',     bg: '#28296c', text: '#ffffff' },
];

export default function Destinacije() {
  const router = useRouter();
  const { t } = useTranslation();

  const handleSelect = (id) => {
    router.push(`/create-your-design?theme=${id}`);
  };

  return (
    <main className="min-h-screen bg-[#f5f3ef] px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 mb-2">
            {t('destinacije.heading', 'Choose your destination')}
          </h1>
          <p className="text-gray-400 text-sm">
            {t('destinacije.sub', 'Select a theme to start designing your album')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] transition-transform duration-200 hover:scale-[1.03] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              style={{ backgroundColor: theme.bg }}
            >
              {/* Name */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span
                  className="text-2xl font-bold tracking-wide text-center leading-tight"
                  style={{ color: theme.text }}
                >
                  {theme.name}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200 rounded-2xl" />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}