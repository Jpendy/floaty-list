/* eslint-disable max-len */
/* eslint-disable indent */
import React, { useState } from 'react';
import styles from './MainContainer.css';

export default function MainContainer() {

    const [list, setList] = useState(['this is default message']);
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setList(list => {
            const newList = [...list];

            if (newList.length > 4) newList.shift();

            return [...newList, message];
        });
        setMessage('');
    };

    return (
        <div className={styles.MainContainer} >
            <form onSubmit={handleSubmit} >
                <input value={message} type="text" onChange={e => setMessage(e.target.value)} />
                <button>submit</button>
            </form>

            <ul>
                {list.map((message, i) => (
                    <li className={i < (list.length - 3) && styles.float} key={message}>
                        {message}
                    </li>
                ))}
            </ul>
        </div>
    );
}
