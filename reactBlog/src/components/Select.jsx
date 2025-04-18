import { forwardRef, useId } from "react";

function Select({label, options, className="", ...props}, ref){
    const id = useId();
    return (
        <div className="w-full">
            {label && (<label htmlFor={id}>{label}</label>)}
            <select className={`px-3 py-2 rounded-lg bg-white text-white outline-none focus:bg-gray-50 duration-200 border w-full border-gray-200 ${className}`} {...props} id={id} ref={ref}>{
                options?.map(option => {
                    return <option className="text-black" key={option} value={option}>{option}</option>
                })
            }</select>
        </div>
    );
}

export default forwardRef(Select);