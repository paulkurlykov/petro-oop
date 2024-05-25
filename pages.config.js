import { resolve } from "path";

const pages = [
    { name: "main", path: resolve(__dirname, "index.html") },
    { name: "users", path: resolve(__dirname, "pages/modules.html") },
];

export default pages;
