'use client';
import './styles.css';
import React, { useState } from 'react';

interface DropDownMenuProps {
    lable?: string;
    link: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

const DropDownMenu:React.FC<DropDownMenuProps> = ({ lable, link, children, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleMouseEnter = () => {
        setIsOpen(true);
    };
    const handleMouseLeave = () => {
        setIsOpen(false);
    };
    return (
        <li  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <a href={link} onClick={onClick} >{lable}</a>
            {children && ( 
                <ul className={'ka-submenu'} style={{ display: isOpen ? 'block' : 'none' }}>
                    {children}
                </ul>
            )}
        </li>
    );
    }
    export default DropDownMenu;