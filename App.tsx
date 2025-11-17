
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { FeatureSelector } from './components/FeatureSelector';
import { VariationGenerator } from './components/VariationGenerator';
import { MockupRemaker } from './components/MockupRemaker';
import { SelectKeyScreen } from './components/SelectKeyScreen';
import type { Feature } from './types';

// Giả định rằng window.aistudio tồn tại.
// Trong môi trường thực tế, bạn có thể cần kiểm tra sự tồn tại của nó.
// FIX: Removed conflicting global declaration for `window.aistudio`. The execution environment is expected to provide the necessary types.
// Redeclaring it was causing a type conflict with an existing global type.

const App: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<Feature>('variation');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingKey, setIsCheckingKey] = useState(true);

  const checkApiKey = useCallback(async () => {
    setIsCheckingKey(true);
    try {
      const keySelected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(keySelected);
    } catch (e) {
      console.error("Error checking for API key:", e);
      setHasApiKey(false);
    } finally {
      setIsCheckingKey(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectKey = async () => {
    try {
      await window.aistudio.openSelectKey();
      // Sau khi người dùng đóng dialog, chúng ta giả định họ đã chọn key thành công
      // và cập nhật UI ngay lập tức để có trải nghiệm tốt hơn.
      setHasApiKey(true);
    } catch (e) {
      console.error("Error opening select key dialog:", e);
      setHasApiKey(false); // Nếu có lỗi, đảm bảo trạng thái là false
    }
  };

  const handleApiError = useCallback(() => {
    // Nếu API trả về lỗi, có thể key đã chọn không hợp lệ hoặc hết hạn.
    // Reset lại trạng thái để người dùng có thể chọn key mới.
    setHasApiKey(false);
  }, []);

  if (isCheckingKey) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <p className="text-lg">Checking for API Key...</p>
      </div>
    );
  }

  if (!hasApiKey) {
    return <SelectKeyScreen onSelectKey={handleSelectKey} />;
  }

  return (
    <div className="min-h-screen bg-base-100 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <FeatureSelector
          selectedFeature={selectedFeature}
          onSelectFeature={setSelectedFeature}
        />
        <div className="mt-8">
          {selectedFeature === 'variation' && <VariationGenerator onApiError={handleApiError} />}
          {selectedFeature === 'mockup' && <MockupRemaker onApiError={handleApiError} />}
        </div>
      </main>
    </div>
  );
};

export default App;
