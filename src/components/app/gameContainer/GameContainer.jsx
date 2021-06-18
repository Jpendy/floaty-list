/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
import React, { useEffect, useState, useRef } from 'react';

export default function GameContainer() {

    const startingPos = {
        hero: { radius: 10, x: 300, y: 200 },
        e1: { radius: 10, x: 10, y: 10 },
        e2: { radius: 10, x: 800, y: 10 },
        e3: { radius: 10, x: 800, y: 400 },
        e4: { radius: 10, x: 10, y: 400 }
    };

    const [pos, setPos] = useState(startingPos.hero);

    const [enemyPos, setEnemyPos] = useState(startingPos.e1);
    const [enemy2Pos, setEnemy2Pos] = useState(startingPos.e2);
    const [enemy3Pos, setEnemy3Pos] = useState(startingPos.e3);
    const [enemy4Pos, setEnemy4Pos] = useState(startingPos.e4);

    const step = 8;

    function reset() {
        setPos(startingPos.hero);
        setEnemyPos(startingPos.e1);
        setEnemy2Pos(startingPos.e2);
        setEnemy3Pos(startingPos.e3);
        setEnemy4Pos(startingPos.e4);
    }

    function persuit(prevPos, speed) {
        const dx = pos.x - prevPos.x;
        const dy = pos.y - prevPos.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (pos.radius + prevPos.radius)) {
            window.alert('You\'ve been caught!');
            reset();
        }

        return {
            x: prevPos.x + (dx / speed),
            y: prevPos.y + (dy / speed),
            radius: prevPos.radius
        };
    }

    useInterval(() => {
        setEnemyPos(pos => persuit(pos, 8));
        setEnemy2Pos(pos => persuit(pos, 17));
        setEnemy3Pos(pos => persuit(pos, 25));
        setEnemy4Pos(pos => persuit(pos, 12));
    }, 100);

    useEffect(() => {
        document.addEventListener('keydown', ({ key }) => {
            switch (key) {
                case 'ArrowRight': setPos(pos => ({ x: pos.x + step, y: pos.y, radius: pos.radius })); break;
                case 'ArrowLeft': setPos(pos => ({ x: pos.x - step, y: pos.y, radius: pos.radius })); break;
                case 'ArrowUp': setPos(pos => ({ x: pos.x, y: pos.y - step, radius: pos.radius })); break;
                case 'ArrowDown': setPos(pos => ({ x: pos.x, y: pos.y + step, radius: pos.radius })); break;
                default: return;
            }
        });
    }, []);

    const heroStyles = {
        position: 'absolute',
        top: pos.y,
        left: pos.x,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'red'
    };

    const enemy = {
        position: 'absolute',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
    };

    const enemyStyle = {
        ...enemy,
        top: enemyPos.y,
        left: enemyPos.x,
        backgroundColor: 'blue'
    };

    const enemy2Style = {
        ...enemy,
        top: enemy2Pos.y,
        left: enemy2Pos.x,
        backgroundColor: 'green'
    };

    const enemy3Style = {
        ...enemy,
        top: enemy3Pos.y,
        left: enemy3Pos.x,
        backgroundColor: 'purple'
    };

    const enemy4Style = {
        ...enemy,
        top: enemy4Pos.y,
        left: enemy4Pos.x,
        backgroundColor: 'yellow'
    };

    return (
        <div>
            <div style={heroStyles} />
            <div style={enemyStyle} />
            <div style={enemy2Style} />
            <div style={enemy3Style} />
            <div style={enemy4Style} />

        </div>
    );
}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}
