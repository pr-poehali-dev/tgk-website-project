import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface PortfolioItem {
  image: string;
  title: string;
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
    <section id="portfolio" className="py-24 px-6 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16 tracking-tight">
          Мои работы
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {portfolio.map((item, idx) => (
            <Card 
              key={idx} 
              className="overflow-hidden group cursor-pointer bg-card border-border hover:shadow-xl transition-all duration-500 animate-scale-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <Icon name="Maximize2" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>

    <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
      <DialogContent className="max-w-7xl w-[95vw] h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <Icon name="X" className="text-white" size={24} />
          </button>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Полный размер"
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default PortfolioSection;