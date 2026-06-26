import Navbar       from '@/components/Navbar/Navbar';
import Footer       from '@/components/Footer/Footer';
import HeroSection  from './sections/HeroSection';
import GallerySection from './sections/GallerySection';
import FeaturesStrip  from './sections/FeaturesStrip';
import HowItWorks     from './sections/HowItWorks';
import FAQSection     from './sections/FAQSection';
import CTASection     from './sections/CTASection';
import { gradients }  from '@/constants/colors';

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero + Gallery share the same gradient background */}
      <div style={{ background: gradients.hero }}>
        <HeroSection />
        <GallerySection />
      </div>

      <FeaturesStrip />
      <HowItWorks />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
