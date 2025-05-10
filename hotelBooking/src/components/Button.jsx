function Button({children, classes=""}){
    return (
        <button className={classes}>{children}</button>
    );
}

export default Button;