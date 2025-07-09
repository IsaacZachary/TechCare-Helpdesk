
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Wifi, 
  Building2, 
  GraduationCap, 
  Heart, 
  ShoppingBag,
  Check, 
  ChevronRight 
} from 'lucide-react';

interface IndustrySelectorProps {
  onSelect: (industry: string) => void;
}

const industries = [
  {
    id: 'isp',
    name: 'Internet Service Provider',
    icon: Wifi,
    description: 'For ISPs and telecom companies providing connectivity services',
    examples: 'Network issues, connectivity problems, billing inquiries',
    color: 'bg-blue-500'
  },
  {
    id: 'hospital',
    name: 'Hospital & Healthcare',
    icon: Heart,
    description: 'For medical facilities, clinics, and healthcare providers',
    examples: 'Patient support, appointment scheduling, medical records',
    color: 'bg-red-500'
  },
  {
    id: 'university',
    name: 'University & Education',
    icon: GraduationCap,
    description: 'For educational institutions and academic support services',
    examples: 'Student inquiries, course registration, technical assistance',
    color: 'bg-green-500'
  },
  {
    id: 'ngo',
    name: 'NGO & Non-profit',
    icon: Building2,
    description: 'For non-governmental and charitable organizations',
    examples: 'Donation inquiries, volunteer coordination, program information',
    color: 'bg-yellow-500'
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    icon: ShoppingBag,
    description: 'For retail businesses and online stores',
    examples: 'Order issues, returns, product inquiries, delivery status',
    color: 'bg-purple-500'
  }
];

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ onSelect }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelect = (industryId: string) => {
    setSelectedIndustry(industryId);
  };

  const handleContinue = () => {
    if (!selectedIndustry) {
      toast({
        title: "Please select an industry",
        description: "You must select an industry to continue.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Industry selected",
      description: `Your dashboard has been configured for ${industries.find(i => i.id === selectedIndustry)?.name}.`,
    });
    
    onSelect(selectedIndustry);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4">
      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Industry</CardTitle>
          <CardDescription>
            Select the industry that best matches your organization to customize your dashboard experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isSelected = selectedIndustry === industry.id;
              
              return (
                <div
                  key={industry.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500 ring-opacity-50' 
                      : 'hover:border-blue-200 dark:hover:border-blue-800'
                  }`}
                  onClick={() => handleSelect(industry.id)}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 ${industry.color} text-white mr-3`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-900 dark:text-slate-100 flex items-center">
                        {industry.name}
                        {isSelected && (
                          <Check className="h-4 w-4 ml-2 text-blue-500" />
                        )}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {industry.description}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">
                        Examples: {industry.examples}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            You can change this setting later in your profile
          </p>
          <Button onClick={handleContinue}>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IndustrySelector;
