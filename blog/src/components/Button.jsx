function Button({children, type, className="bg-black text-white rounded-sm py-2 px-5 hover:bg-gray-950 cursor-pointer", ...props}){
    return (
        <button className={className} type={type} {...props}>{children}</button>
    );
}

export default Button;