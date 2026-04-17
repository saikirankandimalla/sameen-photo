import CustomCursor from '../components/wedding/CustomCursor';
import Navbar from '../components/wedding/Navbar';
import HeroSection from '../components/wedding/HeroSection';
import ScrollStory from '../components/wedding/ScrollStory';
import HorizontalGallery from '../components/wedding/HorizontalGallery';
import SplitImageSection from '../components/wedding/SplitImageSection';
import Floating3DSpace from '../components/wedding/Floating3DSpace';
import InteractiveGrid from '../components/wedding/InteractiveGrid';
import CinematicVideo from '../components/wedding/CinematicVideo';
import FullBleedGallery from '../components/wedding/FullBleedGallery';
import Philosophy from '../components/wedding/Philosophy';
import Awards from '../components/wedding/Awards';
import Process from '../components/wedding/Process';
import Reviews from '../components/wedding/Reviews';
import Services from '../components/wedding/Services';
import Contact from '../components/wedding/Contact';
import Footer from '../components/wedding/Footer';

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <ScrollStory />
      <HorizontalGallery />
      <Awards />
      <SplitImageSection />
      <Floating3DSpace />
      <InteractiveGrid />
      <CinematicVideo />
      <FullBleedGallery />
      <Philosophy />
      <Process />
      <Reviews />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}