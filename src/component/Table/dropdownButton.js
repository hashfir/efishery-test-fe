import React, { useState, useEffect } from 'react';
import './table.css'
import './dropdown.css'

export function DropdownButton({
    data,
    element,
    editFunc,
    deleteFunc
}) {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 660);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const [showDropdown, setShowDropdown] = useState(false);


    const styles = {
        container: {
            position: 'relative',
        },
        button: {
            backgroundColor: 'lightgray',
            padding: '8px',
            cursor: 'pointer',
        },
        dropdown: {
            zIndex: 200,
            position: 'absolute',
            top: '100%',
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            borderRadius: "10px",
            padding: '9px',
            width: '9em'
        },
        item: {
            padding: '8px',
            listStyleType: 'none',
            cursor: 'pointer',
        },
        flex: {
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between'
        }
    };

    return (
        <div style={styles.container}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                // style={styles.button}
                className="button-2"
            >
                <i className="fa fa-ellipsis-v iconinit"></i>
            </button>
            {showDropdown && (
                <div style={styles.dropdown}>
                    <div style={styles.flex}>
                        <button className='button-13' onClick={() => editFunc(data)}>
                            Edit
                        </button>
                        <button className='button-45' onClick={() => deleteFunc(data[element.field])}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
