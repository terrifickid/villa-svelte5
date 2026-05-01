<script>
    export let title;
    export let shortInfo;
    export let postId;
    export let imagePreview;
    let demoData = {
        nodeType: "document",
        data: {},
        content: [
            {
                nodeType: "paragraph",
                data: {},
                content: [
                    {
                        nodeType: "text",
                        value: "Legende Villa\n\n",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "We",
                        marks: [
                            {
                                type: "bold",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "want",
                        marks: [
                            {
                                type: "italic",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "to",
                        marks: [
                            {
                                type: "underline",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "present",
                        marks: [
                            {
                                type: "superscript",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "to",
                        marks: [
                            {
                                type: "subscript",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "you",
                        marks: [
                            {
                                type: "strikethrough",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "a",
                        marks: [
                            {
                                type: "code",
                            },
                        ],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "hyperlink",
                        data: {
                            uri: "test.com",
                        },
                        content: [
                            {
                                nodeType: "text",
                                value: "new",
                                marks: [],
                                data: {},
                            },
                        ],
                    },
                    {
                        nodeType: "text",
                        value: " legendary villa ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "in",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " the ",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: "heart",
                        marks: [],
                        data: {},
                    },
                    {
                        nodeType: "text",
                        value: " of Miami",
                        marks: [],
                        data: {},
                    },
                ],
            },
            {
                nodeType: "heading-3",
                data: {},
                content: [
                    {
                        nodeType: "text",
                        value: "Second paragraph ",
                        marks: [],
                        data: {},
                    },
                ],
            },
            {
                nodeType: "paragraph",
                data: {},
                content: [
                    {
                        nodeType: "text",
                        value: "",
                        marks: [],
                        data: {},
                    },
                ],
            },
        ],
    };

    function renderRichText(richText) {
        return richText.content
            .map((node) => {
                if (node.nodeType === "paragraph") {
                    return `<p>${node.content
                        .map((child) => child.value)
                        .join("")}</p>`;
                } else if (node.nodeType === "heading-3") {
                    return `<h3>${node.content
                        .map((child) => child.value)
                        .join("")}</h3>`;
                }
                return "";
            })
            .join("");
    }
</script>

<section class="">
    <a href="/blog/{postId}"><h2 class="v_heading">{title}</h2></a>
    <p>{@html renderRichText(shortInfo)}</p>
    <a href="/blog/{postId}">Read more</a>
</section>
