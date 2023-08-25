import { useState } from 'react';


function ChatGPT() {
    const [value, setValue] = useState('');
    const [message, setMessage] = useState(null);

    const localHost = "http://localhost:8080/chat"
    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            body: JSON.stringify({
                prompt: value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch(`${localHost}`, options)
            const data = await response.json()
            console.log(data)
            setMessage(data.choices[0]?.message.content)
        } catch (error) {
            console.error(error)
        }
    };
    console.log(message)
    return (
        <div className='chat-container'>
            <h1 className='title'>
                ModoughGPT
            </h1>
            <form className='form' onSubmit={handleSubmit}>
                <div className='formDiv'>
                    <label htmlFor="">Ask me Questions</label>
                    <input
                        type="text"
                        className="formInput"
                        placeholder="Type words"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
            </form>
            <div className='responseDiv'>
                <div className={message ? 'responseText bg' : 'responseText '}>
                    <p>{message || 'Ask me anything...'}</p>
                </div>

            </div>
        </div>
    )
}

export default ChatGPT