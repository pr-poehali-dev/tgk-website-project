import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeroSectionProps {
  onScrollToBooking: () => void;
  onScrollToPortfolio: () => void;
}

const HeroSection = ({ onScrollToBooking, onScrollToPortfolio }: HeroSectionProps) => {
  return (
    <section id="home" className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <Badge variant="secondary" className="mb-8 bg-gray-100 text-gray-700 border-0 text-sm">
          💅 Профессиональный маникюр
        </Badge>
        <h2 className="text-6xl md:text-8xl font-semibold leading-[1.1] mb-6 tracking-tight animate-fade-in">
          Ваши ногти —<br />наше искусство
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in font-light">
          Создаём уникальные дизайны и обеспечиваем идеальный уход
        </p>
        <div className="flex gap-4 justify-center animate-slide-up">
          <Button 
            size="lg" 
            onClick={onScrollToBooking}
            className="bg-black hover:bg-gray-800 text-white text-base px-8 h-12 rounded-full"
          >
            Записаться онлайн
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onScrollToPortfolio}
            className="text-base px-8 h-12 rounded-full border-gray-300 hover:bg-gray-50"
          >
            Смотреть работы
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;