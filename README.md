# Express Back-End, React Front-End
Using links in our `index.html`, we imported React, Babel, and React-Router. 

Required `express`, `fs`, and `path` modules for a simple server that accepted `GET`, `POST`, and `DELETE` requests with `text/JSON` encoded data from a form. Data was read from and saved to a JSON file in the file system.

> **[!Note]**
> - Don't use multiple `<HashRouter>` tags in different components; doing so creates a tree of router tags that make redirecting to the correct path more difficult, if not unexpected.
>
> - Rather than trying to make a `GET` request to update the **state** of a React component after every `POST` or `DELETE` request, it is easier to work in *parallel* by having both the client-side and server-side `.push()` or `.filter()`.
>
> - Requests' data (`request.url`, `request.body`, `request.params`, etc.)  and responses' data (`response.data`, etc.) are often **strings** that need to be **coerced**.