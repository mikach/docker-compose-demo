import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [keyword, setKeyword] = useState('');
    const [status, setStatus] = useState(null);
    const [url, setUrl] = useState(null);

    const handleClick = async () => {
        setStatus(null);
        setUrl(null);

        const res = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ keyword })
        });

        const json = await res.json();

        setStatus(json.status);

        if (json.name) {
            setUrl(json.name);
        }
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
                <br />
                {status && <p>{status}</p>}
                {url && (
                    <a href={`/pdfs/${url}.pdf`} target="_blank">
                        Download
                    </a>
                )}
            </header>
        </div>
    );
}

export default App;
