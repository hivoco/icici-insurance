import { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';

function ContentFilter() {
  const [prohibitedWords, setProhibitedWords] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);

  console.log(inputValue,"inputValue");
  
  // Load prohibited words from the CSV file
  useEffect(() => {
    const csvFilePath = '/slang.csv'; // Update to your actual file path
    
    Papa.parse(csvFilePath, {
      download: true,
      complete: (results) => {
        try {
          // Extract words from CSV rows
          // This handles CSVs both with headers and without
          let words = [];
          
          if (results.data && results.data.length > 0) {
            // Check if the first row seems to be headers
            const firstRow = results.data[0];
            const hasHeaders = typeof firstRow === 'object' && 'word' in firstRow;
            
            if (hasHeaders) {
              // Extract from object format (with headers)
              words = results.data
                .map(row => row.word?.trim())
                .filter(Boolean);
            } else {
              // For CSV without headers - take first column values
              words = results.data
                .map(row => Array.isArray(row) ? row[0]?.trim() : row?.trim())
                .filter(Boolean);
            }
          }
          
          setProhibitedWords(words);
          setIsLoading(false);
        } catch (err) {
          setError(`Error processing CSV data: ${err.message}`);
          setIsLoading(false);
        }
      },
      error: (error) => {
        setError(`Error loading or parsing CSV: ${error.message}`);
        setIsLoading(false);
      }
    });
  }, []);

  // Check if input contains any prohibited words
  const checkProhibitedWords = useCallback((text) => {
    if (!text || !prohibitedWords.length) return false;
    
    const normalizedInput = text.toLowerCase().trim();
    return prohibitedWords.some(word => 
      word && normalizedInput === word.toLowerCase().trim()
    );
  }, [prohibitedWords]);

  // Debounced check function
  const debouncedCheck = useCallback((text) => {
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      // Check if the input matches any prohibited word
      if (checkProhibitedWords(text)) {
        // Clear input and show warning
        setInputValue('');
        setShowWarning(true);
        
        // Hide warning after 3 seconds
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
      }
    }, 500); // 300ms debounce delay - adjust as needed
  }, [checkProhibitedWords]);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Use the debounced check instead of checking immediately
    debouncedCheck(newValue);
  };

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  if (isLoading) return (
    <div className="loading" style={{ textAlign: 'center', padding: '20px' }}>
      Loading content filter...
    </div>
  );
  
  if (error) return (
    <div className="error" style={{ 
      color: '#D32F2F', 
      padding: '20px', 
      border: '1px solid #FFCDD2',
      borderRadius: '4px',
      backgroundColor: '#FFEBEE',
      margin: '20px 0'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div
      className="content-filter"
      style={{
        fontFamily: "system-ui, -apple-system, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>Content Filter</h2>

      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="text-input"
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "500",
          }}
        >
          Enter text:
        </label>

        <input
          id="text-input"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type here..."
          style={{
            padding: "12px",
            width: "100%",
            borderRadius: "6px",
            border: showWarning ? "2px solid #FF0000" : "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
            transition: "border-color 0.3s ease",
          }}
        />

        {showWarning && (
          <div style={{ 
            marginTop: '12px', 
            padding: '12px 16px', 
            backgroundColor: '#FFEBEE',
            border: '1px solid #FFCDD2',
            borderRadius: '6px',
            color: '#D32F2F',
            fontSize: '14px',
            animation: 'fadeIn 0.3s'
          }}>
            <strong>Warning:</strong> Inappropriate content detected. Your input has been cleared.
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentFilter;