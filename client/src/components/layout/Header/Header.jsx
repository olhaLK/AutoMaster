import React from 'react';

function Header() {
    return (
        <div>
            <nav>
                <a href="/orders">Orders</a>
                <a href="/test-drives">Test Drives</a>
                <a href="/cars">Catalog</a>
                <a href="/">Main</a>
            </nav>
        </div>
    );
}

export default Header;