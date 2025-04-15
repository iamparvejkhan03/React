import { useId } from "react";

function Input({type, label, className="border border-gray-200 rounded w-full py-2 px-2 my-2", ...props}){
    const id = useId();
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} className={className} id={id} {...props} />
        </>
    );
}

export default Input;