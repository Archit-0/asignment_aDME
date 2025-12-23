import { BarcodeScanner } from "./BarcodeScanner";
import { useState } from "react";
import { Camera, Search, Barcode, X } from "lucide-react";

export const SearchBar = ({
  searchTerm,
  setSearchTerm,
  barcodeSearch,
  setBarcodeSearch,
  onBarcodeDetected,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showBarcodeInput, setShowBarcodeInput] = useState(false);

  const handleScan = (barcode) => {
    setBarcodeSearch(barcode);
    setSearchTerm("");
    setShowScanner(false);
    onBarcodeDetected(barcode);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Search Icon Button */}
        {!showSearchInput && !showBarcodeInput ? (
          <>
            <button
              onClick={() => setShowSearchInput(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">Search</span>
            </button>

            <button
              onClick={() => setShowBarcodeInput(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Barcode size={20} className="text-gray-600" />
              <span className="text-gray-700 font-medium">Barcode</span>
            </button>
          </>
        ) : null}

        {/* Search Input - Expandable */}
        {showSearchInput && (
          <div className="flex-1 relative animate-in slide-in-from-right duration-200">
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
              autoFocus
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
            <button
              onClick={() => {
                setShowSearchInput(false);
                setSearchTerm("");
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} className="text-gray-500" />
            </button>
          </div>
        )}

        {/* Barcode Input - Expandable */}
        {showBarcodeInput && (
          <div className="flex-1 relative animate-in slide-in-from-right duration-200">
            <Barcode
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Enter barcode..."
              value={barcodeSearch}
              onChange={(e) => {
                setBarcodeSearch(e.target.value);
                setSearchTerm("");
              }}
              autoFocus
              className="w-full pl-10 pr-24 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {/* <button
                onClick={() => setShowScanner(true)}
                className="bg-blue-500 text-white p-1.5 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Camera size={18} />
              </button> */}
              <button
                onClick={() => {
                  setShowBarcodeInput(false);
                  setBarcodeSearch("");
                }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )} */}
    </>
  );
};
