function Heading({children, classes=""}){
    return (
        <h2 className={`${classes}`}>{children}</h2>
    );
}

export default Heading;