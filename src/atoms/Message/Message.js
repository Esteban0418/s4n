import React from 'react';
import './Message.scss';

/**
* Displays a Message box to show user details
*/
const Message = () => {

    /**
     * Returns specific cookie value
     * @param  {String} arg Cookie name
     * @return {String}  Cookie Value
     */
    function getCookieValue(cookieName) {
        var cookieData = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
        return cookieData ? cookieData.pop() : '';
    }

    let cookieInfo = JSON.parse(getCookieValue('user'));

    return (
        <div className='message'>
            <h1 className='message__header'>Successfully added candidate!</h1>
            <div>
                <p className='message__paragraph'><b>Name:</b> {cookieInfo.name}</p>
                <p className='message__paragraph'><b>ID Number:</b> {cookieInfo.id}</p>
                <p className='message__paragraph'><b>Date of Birth:</b> {cookieInfo.birthDate}</p>
                <p className='message__paragraph'><b>E-mail:</b> {cookieInfo.email}</p>
                <p className='message__paragraph'><b>Github Username:</b> {cookieInfo.userName}</p>
            </div>
        </div>
    );
};

export default Message;