import { forwardRef, useId } from "react";

function Select({label, options=[], className="border bg-white border-gray-200 rounded w-full py-2 px-2 my-2", ...props}, ref){
    const id = useId();
    return (
        <>
            {label && <label htmlFor={id}>{label}</label>}
            <select id={id} ref={ref} className={className} {...props}>{
                options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))    
            }</select>
        </>
    );
}

export default forwardRef(Select);