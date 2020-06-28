import React from 'react';

const Message = () => {

    function getCookieValue(a) {
        var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }

    let cookieInfo = JSON.parse(getCookieValue('user'));
    console.log(cookieInfo);

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