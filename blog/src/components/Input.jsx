import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({type, label, className="border bg-white border-gray-200 rounded w-full py-2 px-2 my-2", ...props}, ref){
    const id = useId();
    return (
        <>
            {label && <label className="font-semibold" htmlFor={id}>{label}</label>}
            <input type={type} ref={ref} className={className} id={id} {...props} />
        </>
    );
});

export default Input;