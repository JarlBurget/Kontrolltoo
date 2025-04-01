const Button = ({ textOnly, onClick, children }) => {
    const buttonClass = textOnly ? 'text-button' : 'button';

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
