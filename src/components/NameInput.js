import { useState, useEffect, useCallback, useRef } from "react";

import Papa from "papaparse";

function NameInput({userDetails, name, setUserDetails ,showWarning, setShowWarning }) {
  const [prohibitedWords, setProhibitedWords] = useState([]);
  //   const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nameError, setNameError] = useState("");

  const debounceTimerRef = useRef(null);

  // console.log(name, "name");

  // Load prohibited words from the CSV file
  useEffect(() => {
    const csvFilePath = "/slang.csv"; // Update to your actual file path

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
            const hasHeaders =
              typeof firstRow === "object" && "word" in firstRow;

            if (hasHeaders) {
              // Extract from object format (with headers)
              words = results.data
                .map((row) => row.word?.trim())
                .filter(Boolean);
            } else {
              // For CSV without headers - take first column values
              words = results.data
                .map((row) =>
                  Array.isArray(row) ? row[0]?.trim() : row?.trim()
                )
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
      },
    });
  }, []);

  // Check if input contains any prohibited words
  const checkProhibitedWords = useCallback(
    (text) => {
      if (!text || !prohibitedWords.length) return false;

      const normalizedInput = text.toLowerCase().trim();
      return prohibitedWords.some(
        (word) => word && normalizedInput === word.toLowerCase().trim()
      );
    },
    [prohibitedWords]
  );

  // Debounced check function
  const debouncedCheck = useCallback(
    (text) => {
      // Clear any existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set a new timer
      debounceTimerRef.current = setTimeout(() => {
        // Check if the input matches any prohibited word
        if (checkProhibitedWords(text)) {
          // Clear input and show warning
        //   setUserDetails({ ...userDetails, name: "" });

          setShowWarning(true);

          // Hide warning after 3 seconds
        //   setTimeout(() => {
        //     setShowWarning(false);
        //   }, 3000);
        }
      }, 500); // 300ms debounce delay - adjust as needed
    },
    [checkProhibitedWords]
  );

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setUserDetails({ ...userDetails, name: newValue });

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

  // if (isLoading)
  //   return (
  //     <div className="loading" style={{ textAlign: "center", padding: "20px" }}>
  //       Loading content filter...
  //     </div>
  //   );

  if (error)
    return (
      <div
        className="error"
        style={{
          color: "#D32F2F",
          padding: "20px",
          border: "1px solid #FFCDD2",
          borderRadius: "4px",
          backgroundColor: "#FFEBEE",
          margin: "20px 0",
        }}
      >
        Error: {error}
      </div>
    );

  return (
    <div className="">
      {/* <div style={{ marginBottom: "20px" }}>
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
        />

        {showWarning && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px 16px",
              backgroundColor: "#FFEBEE",
              border: "1px solid #FFCDD2",
              borderRadius: "6px",
              color: "#D32F2F",
              fontSize: "14px",
              animation: "fadeIn 0.3s",
            }}
          >
            <strong>Warning:</strong> Inappropriate content detected. Your input
            has been cleared.
          </div>
        )}
      </div> */}

      <div className="flex flex-col space-y-0.5  border-black ">
        <label className="font-Mulish font-medium   text-lg leading-[100%] tracking-normal">
          Name
        </label>

        <div className="relative space-y-0.5">
          <input
            type="text"
            name="name"
            autoComplete="name"
            inputMode="text"
            value={name}
            //   onChange={handleInputChange}
            //   value={userDetails.name}

            onChange={(e) => {
              setShowWarning(false)
              const value = e.target.value;
              const regex = /^[A-Za-z ]*$/; // Allows only letters and spaces

              if (regex.test(value)) {
                // setName(value);
                setUserDetails({ ...userDetails, name: value });
                // setNameError("");
                setNameError("");
              } else {
                // setNameError("Name can only contain letters");
                setNameError("Name can only contain letters");
              }

              //   setUserDetails({ ...userDetails, name: newValue });

              // Use the debounced check instead of checking immediately
              debouncedCheck(value);
            }}
            minLength={3}
            maxLength={10}
            placeholder={"Enter Your Full Name"}
            onBlur={() => setNameError("")}
            className={`h-11 w-full capitalize rounded-full border px-3.5 py-3 text-[15px] leading-[100%] tracking-normal placeholder-[#9C9C9C]  font-semibold
                ${
                  showWarning
                    ? "outline-[#AF292F]"
                    : "border-[#9C9C9C] focus:outline-2"
                }
                `}
          />

          <p
            className={` text-xs text-[#AF292F] leading-[100%] font-medium -bottom-3 left-2 
          ${showWarning ? "block" : "hidden"}
          `}
          >
            {/* {showWarning} */}
            *Text entered is not in line with the company's policy. Please enter another name"
          </p>

        </div>

        {/* {showWarni
        ng && (
          <div
            style={{
              marginTop: "12px",
              padding: "12px 16px",
              backgroundColor: "#FFEBEE",
              border: "1px solid #FFCDD2",
              borderRadius: "6px",
              color: "#D32F2F",
              fontSize: "14px",
              animation: "fadeIn 0.3s",
            }}
          >
            <strong>Warning:</strong> Inappropriate content detected. Your input
            has been cleared.
          </div>
        )} */}
      </div>
    </div>
  );
}

export default NameInput;
