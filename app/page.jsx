
import Link from 'next/link'
import Header from './components/Header';
import AboveHeader from './components/AboveHeader';
import Hero from './components/Hero';
import PopularniAlbumi from './components/PopularniAlbumi';
import ONama from './components/ONama';
import KorakPoKorak from './components/KorakPoKorak';
import Cena from './components/Cena';
import Utisci from './components/Utisci';
import Kolekcije from './components/Kolekcije';
import Footer from './components/Footer';

export default function Home() {
  return (
    <section>
      <AboveHeader />
      <Header />
      <Hero />
      <PopularniAlbumi />
      <ONama />
      <KorakPoKorak />
      <Cena />
      <Utisci />
      <Kolekcije />
      <Footer />
    </section>
  );
}
