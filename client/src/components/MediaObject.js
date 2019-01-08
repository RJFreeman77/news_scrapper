import React from "react";

function MediaObject(props) {
    const { title, url, summary, image } = props.children;
    return (
        <div class="media">
        <img src={image} alt={`image for ${title}`}/>
            <div class="media-body">
                <h5 class="mt-0">
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