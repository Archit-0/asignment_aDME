import { BarcodeScanner } from "./BarcodeScanner";
import { useState } from "react";
import { Camera, Search, Barcode } from "lucide-react";


export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  barcodeSearch,
  setBarcodeSearch,
  onBarcodeDetected,
}) => {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (barcode) => {
    setBarcodeSearch(barcode);
    setSearchTerm("");
    setShowScanner(false);
    onBarcodeDetected(barcode);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setBarcodeSearch("");
            }}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
        </div>

        <div className="relative">
          <Barcode
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Enter or scan barcode..."
            value={barcodeSearch}
            onChange={(e) => {
              setBarcodeSearch(e.target.value);
              setSearchTerm("");
            }}
            className="w-full pl-10 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
          />
          <button
            onClick={() => setShowScanner(true)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 transition-colors"
          >
            <Camera size={20} />
          </button>
        </div>
      </div>

      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}
    </>
  );
};
