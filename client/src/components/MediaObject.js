import React from "react";
import "./style.css";

function MediaObject(props) {
    const { title, url, summary, img } = props.children;
    return (
        <div className="media">
            <img src={img} alt={`${title}`} />
            <div className="media-body">
                <h5 className="mt-0">
                    <a href={url}>
                        {title}
                    </a>
                </h5>
                <p>
                    {summary}
                </p>
            </div>
        </div>
    );
}

export default MediaObject;