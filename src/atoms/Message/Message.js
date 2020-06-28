import React from 'react';

const Message = () => {

    function getCookieValue(cookieName) {
        var cookieData = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
        return cookieData ? cookieData.pop() : '';
    }

    let cookieInfo = JSON.parse(getCookieValue('user'));

    return (
        <div>
            <p>Successfully added candidate!</p>
            <div>
                <p><b>Name:</b> {cookieInfo.name}</p>
                <p><b>ID Number:</b> {cookieInfo.id}</p>
                <p><b>Date of Birth:</b> {cookieInfo.birthDate}</p>
                <p><b>E-mail:</b> {cookieInfo.email}</p>
            </div>
        </div>
    );
};

export default Message;