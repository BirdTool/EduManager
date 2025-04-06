import { Hono } from "hono";

const search = new Hono();

search.get('/search/student');

export default search;