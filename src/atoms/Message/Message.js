import React from 'react';
import "./Message.scss";

const Message = () => {

    function getCookieValue(cookieName) {
        var cookieData = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
        return cookieData ? cookieData.pop() : '';
    }

    let cookieInfo = JSON.parse(getCookieValue('user'));

    return (
        <div className="message">
            <h1 className="message__header">Successfully added candidate!</h1>
            <div>
                <p className="message__paragraph"><b>Name:</b> {cookieInfo.name}</p>
                <p className="message__paragraph"><b>ID Number:</b> {cookieInfo.id}</p>
                <p className="message__paragraph"><b>Date of Birth:</b> {cookieInfo.birthDate}</p>
                <p className="message__paragraph"><b>E-mail:</b> {cookieInfo.email}</p>
            </div>
        </div>
    );
};

export default Message;