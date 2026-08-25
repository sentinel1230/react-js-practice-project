import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

export default function Select({ title, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (option) => {
    onChange(value === option ? "" : option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectContainer} ref={selectRef}>
      <button 
        className={`${styles.selectButton} ${isOpen ? styles.active : ""} ${value ? styles.hasValue : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || title}</span>
        <span className={styles.arrow}></span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <div 
              key={option} 
              className={`${styles.optionItem} ${value === option ? styles.selected : ""}`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
