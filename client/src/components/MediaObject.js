import React from "react";

function MediaObject(props) {
    const { title, url, summary, category } = props.children;
    return (
        <div class="media">
            <div class="media-body">
                <h5 class="mt-0">
                    <a href={url}>
                        {title}
                    </a>
                </h5>
                <p className="font-weight-light">
                    {category}
                </p>
                <p>
                    {summary}
                </p>
            </div>
        </div>
    );
}

export default MediaObject;