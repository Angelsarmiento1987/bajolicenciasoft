import React, { useState, useRef, useEffect } from 'react';
import { MenuNav } from '../../Components/MenuNav/MenuNav';

const LecturaCancion = () => {
    const [lyrics, setLyrics] = useState('');
    const [showLyrics, setShowLyrics] = useState(false);
    const [fontSize, setFontSize] = useState(18);
    const [tempo, setTempo] = useState(24);
    const [scrolling, setScrolling] = useState(false);
    const [delay, setDelay] = useState(0);
    const [columnGap, setColumnGap] = useState(32);
    const [columnWidth, setColumnWidth] = useState(300);
    const [darkMode, setDarkMode] = useState(false);
    const [savedSongs, setSavedSongs] = useState(() => JSON.parse(localStorage.getItem('savedSongs')) || {});
    const [songName, setSongName] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        let animationFrameId;
        let timeoutId;
        let lastTime = performance.now();

        const scrollStep = (currentTime) => {
            if (scrolling && containerRef.current) {
                const deltaTime = (currentTime - lastTime) / 1000;
                const distance = tempo * deltaTime;
                containerRef.current.scrollLeft += distance;
                lastTime = currentTime;
                animationFrameId = requestAnimationFrame(scrollStep);
            }
        };

        if (scrolling) {
            timeoutId = setTimeout(() => {
                lastTime = performance.now();
                animationFrameId = requestAnimationFrame(scrollStep);
            }, delay * 1000);
        }

        return () => {
            clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrameId);
        };
    }, [scrolling, tempo, delay]);

    const handleSaveSong = () => {
        if (!songName) {
            alert('Por favor ingresa un nombre para la canción.');
            return;
        }
        const newSavedSongs = {
            ...savedSongs,
            [songName]: {
                lyrics,
                fontSize,
                tempo,
                delay,
                columnGap,
                columnWidth,
                darkMode,
            },
        };
        setSavedSongs(newSavedSongs);
        localStorage.setItem('savedSongs', JSON.stringify(newSavedSongs));
        alert('Canción guardada correctamente.');
    };

    const handleLoadSong = (name) => {
        const song = savedSongs[name];
        if (song) {
            setLyrics(song.lyrics);
            setFontSize(song.fontSize);
            setTempo(song.tempo);
            setDelay(song.delay);
            setColumnGap(song.columnGap);
            setColumnWidth(song.columnWidth);
            setDarkMode(song.darkMode);
            setSongName(name); // Cargar el nombre de la canción
            setShowLyrics(true);
        }
    };

    const handleDeleteSong = (name) => {
        const newSavedSongs = { ...savedSongs };
        delete newSavedSongs[name];
        setSavedSongs(newSavedSongs);
        localStorage.setItem('savedSongs', JSON.stringify(newSavedSongs));
    };

    const splitIntoParagraphs = (text) => {
        return text.split('\n').map((para, index) => (
            <p key={index} style={{ margin: '1rem 0' }}>{para}</p>
        ));
    };

    return (
        <>
            <MenuNav />
            <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto', color: darkMode ? 'white' : 'black', backgroundColor: darkMode ? '#1e1e1e' : '#f9f9f9' }}>
                {!showLyrics && (
                    <div>
                        <textarea
                            value={lyrics}
                            onChange={(e) => setLyrics(e.target.value)}
                            placeholder="Pega la letra aquí..."
                            style={{ width: '100%', height: '250px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '15px' }}
                        />
                        <input
                            type="text"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            placeholder="Nombre de la canción"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '15px' }}
                        />
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <button
                                onClick={() => setShowLyrics(true)}
                                style={{ backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                            >
                                Mostrar Letra
                            </button>
                            <button
                                onClick={handleSaveSong}
                                style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                            >
                                Guardar Canción
                            </button>
                        </div>
                        <div>
                            <h3>Canciones guardadas:</h3>
                            {Object.keys(savedSongs).length === 0 && <p>No hay canciones guardadas.</p>}
                            {Object.keys(savedSongs).map((name) => (
                                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                    <button
                                        onClick={() => handleLoadSong(name)}
                                        style={{ display: 'block', width: '50%', textAlign: 'left', marginBottom: '5px', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#f3f4f6', cursor: 'pointer' }}
                                    >
                                        {name}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteSong(name)}
                                        style={{ backgroundColor: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {showLyrics && (
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                <button onClick={() => setFontSize((size) => size + 2)} style={{ backgroundColor: '#22c55e', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>A+</button>
                                <button onClick={() => setFontSize((size) => Math.max(12, size - 2))} style={{ backgroundColor: '#eab308', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>A-</button>
                                <button onClick={() => setDarkMode(!darkMode)} style={{ backgroundColor: '#4b5563', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>{darkMode ? 'Modo Claro' : 'Modo Noche'}</button>
                                <button onClick={() => setScrolling(!scrolling)} style={{ padding: '10px 20px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: scrolling ? '#ef4444' : '#8b5cf6', color: 'white' }}>{scrolling ? 'Detener Scroll' : 'Iniciar Scroll'}</button>
                            </div>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>

                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label>Tempo (px/sec)</label>
                                    <input type="number" value={tempo} onChange={(e) => setTempo(Math.max(24, Number(e.target.value)))} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label>Delay (segundos)</label>
                                    <input type="number" value={delay} onChange={(e) => setDelay(Number(e.target.value))} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '100px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label>Ancho columna (px)</label>
                                    <input type="number" value={columnWidth} onChange={(e) => setColumnWidth(Number(e.target.value))} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '130px' }} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label>Espacio columnas (px)</label>
                                    <input type="number" value={columnGap} onChange={(e) => setColumnGap(Number(e.target.value))} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #ccc', width: '130px' }} />
                                </div>
                            </div>
                        </div>

                        <div
                            ref={containerRef}
                            style={{
                                height: '70vh',
                                overflowX: 'auto',
                                whiteSpace: 'normal',
                                border: '1px solid #ccc',
                                padding: '20px',
                                borderRadius: '6px',
                                backgroundColor: darkMode ? '#121212' : 'white',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                fontSize: `${fontSize}px`,
                                lineHeight: 1.6,
                                columnWidth: `${columnWidth}px`,
                                columnGap: `${columnGap}px`,
                                color: darkMode ? 'white' : 'black',
                            }}
                        >
                            {splitIntoParagraphs(lyrics || `Letra de prueba repetida. ` + 'Canta esta canción '.repeat(50) + `\n`.repeat(50))}
                        </div>

                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            <button onClick={() => setShowLyrics(false)} style={{ backgroundColor: '#6b7280', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Volver</button>
                            <button onClick={handleSaveSong} style={{ backgroundColor: '#10b981', color: 'white', padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>Guardar</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export { LecturaCancion };
