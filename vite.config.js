// vite.config.js
import { defineConfig } from "vite";
import pages from "./pages.config";

const pagesInput = {};

pages.forEach((page) => {
    pagesInput[page.name] = page.path;
});

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                ...pagesInput,
            },
        },
    },
});

// export default defineConfig({
//     build: {
//         rollupOptions: {
//             input: {
//                 main: resolve(__dirname, "index.html"),
//                 nested: resolve(__dirname, "pages/modules.html"),
//             },
//         },
//     },
// });
