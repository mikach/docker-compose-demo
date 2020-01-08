import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [keyword, setKeyword] = useState('');

    const handleClick = async () => {
        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword })
        });

        const json = await res.json();

        console.log(json.status);
    };

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <input
                    type="text"
                    value={keyword}
                    placeholder="keyword"
                    onChange={ev => setKeyword(ev.target.value)}
                />
                <button onClick={handleClick}>Generate</button>
            </header>
        </div>
    );
}

export default App;
