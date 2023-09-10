import React from "react";

const SeparateAuthors = (props) => {
    return (
        <div>
            {Array.isArray(props.authors)
                ? props.authors.join(', ')
                : props.authors}
        </div>
    );
};

export default SeparateAuthors;