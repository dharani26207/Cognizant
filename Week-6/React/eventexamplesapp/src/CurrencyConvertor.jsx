import React, { useState } from 'react';

const CurrencyConvertor = () => {
  const [inr, setInr] = useState('');
  const [eur, setEur] = useState('');
  const [result, setResult] = useState(null);
  const [conversionType, setConversionType] = useState('INR_TO_EUR'); // or 'EUR_TO_INR'

  // Conversion rates
  const INR_TO_EUR_RATE = 0.011; // 1 INR = 0.011 EUR
  const EUR_TO_INR_RATE = 90.0;  // 1 EUR = 90 INR

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit reload

    if (conversionType === 'INR_TO_EUR') {
      const amount = parseFloat(inr);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount in Rupees');
        return;
      }
      const converted = amount * INR_TO_EUR_RATE;
      setResult({
        from: `₹${amount.toLocaleString('en-IN')}`,
        to: `€${converted.toFixed(2)}`,
        text: 'Indian Rupees to Euros'
      });
    } else {
      const amount = parseFloat(eur);
      if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount in Euros');
        return;
      }
      const converted = amount * EUR_TO_INR_RATE;
      setResult({
        from: `€${amount.toLocaleString()}`,
        to: `₹${converted.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
        text: 'Euros to Indian Rupees'
      });
    }
  };

  return (
    <div className="converter-card">
      <h4>💱 Currency Converter</h4>
      <p className="description">Handles the submit event of the conversion form</p>

      <form onSubmit={handleSubmit} className="converter-form">
        <div className="tab-buttons">
          <button 
            type="button"
            className={`tab-btn ${conversionType === 'INR_TO_EUR' ? 'active' : ''}`}
            onClick={() => { setConversionType('INR_TO_EUR'); setResult(null); }}
          >
            INR to EUR
          </button>
          <button 
            type="button"
            className={`tab-btn ${conversionType === 'EUR_TO_INR' ? 'active' : ''}`}
            onClick={() => { setConversionType('EUR_TO_INR'); setResult(null); }}
          >
            EUR to INR
          </button>
        </div>

        {conversionType === 'INR_TO_EUR' ? (
          <div className="input-group">
            <label htmlFor="inr-input">Enter Indian Rupees (INR):</label>
            <input 
              id="inr-input"
              type="number"
              placeholder="e.g. 1000"
              value={inr}
              onChange={(e) => setInr(e.target.value)}
              className="form-input"
            />
          </div>
        ) : (
          <div className="input-group">
            <label htmlFor="eur-input">Enter Euros (EUR):</label>
            <input 
              id="eur-input"
              type="number"
              placeholder="e.g. 50"
              value={eur}
              onChange={(e) => setEur(e.target.value)}
              className="form-input"
            />
          </div>
        )}

        <button type="submit" className="btn-convert">
          Convert
        </button>
      </form>

      {result && (
        <div className="result-box">
          <h5>Conversion Result ({result.text})</h5>
          <div className="result-flow">
            <span className="from-val">{result.from}</span>
            <span className="arrow-flow">➔</span>
            <span className="to-val">{result.to}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
