function Container({children, classes}){
    return (
        <div className={`px-5 md:px-10 ${classes}`}>{children}</div>
    );
}

export default Container;