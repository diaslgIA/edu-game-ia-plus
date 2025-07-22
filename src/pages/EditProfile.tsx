
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '@/components/MobileContainer';
import BottomNavigation from '@/components/BottomNavigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const EditProfile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    schoolYear: ''
  });

  const handleSave = () => {
    // TODO: Implement profile update logic
    navigate('/profile');
  };

  return (
    <MobileContainer background="gradient">
      <div className="flex flex-col h-full pb-20">
        <div className="bg-white/15 backdrop-blur-md text-white p-4 flex items-center space-x-3 rounded-b-3xl shadow-xl">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/profile')} 
            className="text-white p-2 hover:bg-white/20 rounded-xl"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">{t('edit')} {t('profile')}</h1>
          </div>
        </div>

        <div className="p-6 space-y-6 flex-1">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="text-white font-medium">
                {t('full_name')}
              </Label>
              <Input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder={t('full_name')}
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white font-medium">
                {t('email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder={t('email')}
              />
            </div>

            <div>
              <Label htmlFor="schoolYear" className="text-white font-medium">
                {t('school_year')}
              </Label>
              <Input
                id="schoolYear"
                type="text"
                value={formData.schoolYear}
                onChange={(e) => setFormData({ ...formData, schoolYear: e.target.value })}
                className="mt-2 bg-white/20 border-white/30 text-white placeholder-white/60"
                placeholder={t('school_year')}
              />
            </div>
          </div>

          <Button 
            onClick={handleSave}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center space-x-2"
          >
            <Save size={20} />
            <span>{t('save')}</span>
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </MobileContainer>
  );
};

export default EditProfile;
