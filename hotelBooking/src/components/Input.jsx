import { useId, forwardRef } from "react";

const Input = forwardRef(function Input({type="text", inputClasses="", label, labelClasses="", labelIconClasses="", ...props}, ref){
    const id = useId();

    return (
        <>
            {label && <label htmlFor={id} className={labelClasses}>{labelIconClasses && <i className={labelIconClasses}></i>}&nbsp; &nbsp;{label}</label>}

            <input type={type} className={inputClasses} ref={ref} id={id} {...props}  />
        </>
    );
})

export default Input;