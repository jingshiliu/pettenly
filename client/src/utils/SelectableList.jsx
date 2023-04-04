import React from 'react';

function SelectableList(props) {
    const { options, onChange } = props;

    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <select className={'SelectableList'} onChange={handleChange}>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SelectableList;