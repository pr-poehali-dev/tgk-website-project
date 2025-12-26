import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PortfolioItem {
  image: string;
  title: string;
}

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

const PortfolioSection = ({ portfolio }: PortfolioSectionProps) => {
  return (
    <>
      <section id="portfolio" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16 tracking-tight">
            Галерея работ
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {portfolio.map((item, idx) => (
              <Card 
                key={idx} 
                className="overflow-hidden group cursor-pointer bg-white border-gray-100 hover:shadow-xl transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-medium text-center text-gray-700">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-semibold text-center mb-16 tracking-tight">
            Почему я?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Icon name="Sparkles" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Честные цены</h3>
              <p className="text-gray-600 font-light">Никаких скрытых доплат</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Icon name="Palette" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Стильный дизайн</h3>
              <p className="text-gray-600 font-light">Индивидуальный подход</p>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center mx-auto mb-6">
                <Icon name="ShieldCheck" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-medium mb-3">Предоплата 300₽</h3>
              <p className="text-gray-600 font-light">Гарантия записи</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioSection;