module.exports = {
    plugins: [
        {
            name: "preset-default",
            params: {
                overrides: {
                    // customize default plugin options
                    inlineStyles: {
                        onlyMatchedOnce: false,
                    },

                    // or disable plugins
                    removeDoctype: false,
                },
            },
        },
        {
            name: "removeAttrs",
            params: { attrs: "fill" },
        },
    ],
};
