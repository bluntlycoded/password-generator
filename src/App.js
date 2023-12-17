// App.js
import React, { useState } from 'react';
import copy from 'clipboard-copy';
import zxcvbn from 'zxcvbn';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const generatePassword = (options) => {
  const {
    minLength,
    maxLength,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSpecialChars,
  } = options;

  let charset = '';

  if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) charset += '0123456789';
  if (includeSpecialChars) charset += '!@#$%^&*()-=_+[]{}|;:,.<>?';

  if (!charset) {
    alert('Please select at least one character set.');
    return '';
  }

  const randomChar = (string) => string.charAt(Math.floor(Math.random() * string.length));

  const passwordLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  let password = '';

  // Include at least one character from each selected character set
  if (includeUppercase) password += randomChar('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
  if (includeLowercase) password += randomChar('abcdefghijklmnopqrstuvwxyz');
  if (includeNumbers) password += randomChar('0123456789');
  if (includeSpecialChars) password += randomChar('!@#$%^&*()-=_+[]{}|;:,.<>?');

  // Generate remaining characters
  for (let i = password.length; i < passwordLength; i++) {
    password += randomChar(charset);
  }

  // Shuffle the password characters
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
};

function App() {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState({
    minLength: 8,
    maxLength: 12,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
  });

  const handleGeneratePassword = () => {
    const newPassword = generatePassword(options);
    setPassword(newPassword);
  };

  const handleCopyToClipboard = () => {
    copy(password);
    alert('Password copied to clipboard!');
  };

  const handleOptionChange = (option, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value,
    }));
  };

  // Calculate the password strength using zxcvbn library
  const calculatePasswordStrength = () => {
    const result = zxcvbn(password);
    return result.score;
  };

  const passwordStrength = calculatePasswordStrength();

  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">About</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </nav>
        <h1>Password Generator</h1>
      </header>
      <main>
        <div>
          <label>Min Length: </label>
          <input
            type="number"
            value={options.minLength}
            onChange={(e) => handleOptionChange('minLength', parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Max Length: </label>
          <input
            type="number"
            value={options.maxLength}
            onChange={(e) => handleOptionChange('maxLength', parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>
            Include Uppercase:
            <input
              type="checkbox"
              checked={options.includeUppercase}
              onChange={(e) => handleOptionChange('includeUppercase', e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Include Lowercase:
            <input
              type="checkbox"
              checked={options.includeLowercase}
              onChange={(e) => handleOptionChange('includeLowercase', e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Include Numbers:
            <input
              type="checkbox"
              checked={options.includeNumbers}
              onChange={(e) => handleOptionChange('includeNumbers', e.target.checked)}
            />
          </label>
        </div>
        <div>
          <label>
            Include Special Characters:
            <input
              type="checkbox"
              checked={options.includeSpecialChars}
              onChange={(e) => handleOptionChange('includeSpecialChars', e.target.checked)}
            />
          </label>
        </div>
        <button onClick={handleGeneratePassword}>Generate Password</button>
        <button onClick={handleCopyToClipboard}>Copy to Clipboard</button>
        <p>Password: {password}</p>
        <p>Strength: {passwordStrength}/4</p>
      </main>
      <footer>
        <div className="social-icons">
          <a href="https://www.instagram.com/_nrahul_" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://github.com/bluntlycoded" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/bluntlycoded" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
        <div className="additional-info">
    <p>Legal</p>
    <br/>
    <a href="/">Privacy Policy</a>
    <a href="/">Disclaimer</a>
  </div>
        <p>&copy; ImagineMe Software Solutions</p>
      </footer>
    </div>
  );
}

export default App;
