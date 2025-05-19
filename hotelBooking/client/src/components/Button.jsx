function Button({children, classes="", ...props}){
    return (
        <button className={`border-2 border-gray-200 rounded py-2 px-4 cursor-pointer hover:bg-gray-100 text-gray-600 ${classes}`} {...props}>{children}</button>
    );
}

export default Button;