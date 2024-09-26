import React, { useId } from 'react';

function Select({
    options = [],
    label,
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label htmlFor={id} className=''></label>}
            <select
                {...props}
                id={id}
                ref={ref} //this is important to do the reference
                className={`${className} className={px-3 py-2 rounded-1g bg-white text-black outline-none •focus: bg-gray-50 duration-200 border border-gray-200 w-full`}
            >
                {
                    options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default React.forwardRef(Select);