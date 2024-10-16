// const http = require("http");

// let data = [
//   { id: 1, name: "Item 1" },
//   { id: 2, name: "Item 2" },
// ];

// const server = http.createServer((req, res) => {
//   const { method, url } = req;

//   if (url === "/items" && method === "GET") {
//     // Read (GET)
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify(data));
//   } else if (url === "/items" && method === "POST") {
//     // Create (POST)
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const newItem = JSON.parse(body);
//       newItem.id = data.length + 1;
//       data.push(newItem);
//       res.writeHead(201, { "Content-Type": "application/json" });
//       res.end(JSON.stringify(newItem));
//     });
//   } else if (url.startsWith("/items/") && method === "PUT") {
//     // Update (PUT)
//     const id = parseInt(url.split("/")[2]);
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       const updatedItem = JSON.parse(body);
//       const index = data.findIndex((item) => item.id === id);
//       if (index !== -1) {
//         data[index] = { id, ...updatedItem };
//         res.writeHead(200, { "Content-Type": "application/json" });
//         res.end(JSON.stringify(data[index]));
//       } else {
//         res.writeHead(404, { "Content-Type": "application/json" });
//         res.end(JSON.stringify({ message: "Item not found" }));
//       }
//     });
//   } else if (url.startsWith("/items/") && method === "DELETE") {
//     // Delete (DELETE)
//     const id = parseInt(url.split("/")[2]);
//     const index = data.findIndex((item) => item.id === id);
//     if (index !== -1) {
//       data.splice(index, 1);
//       res.writeHead(204); // No content
//       res.end();
//     } else {
//       res.writeHead(404, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ message: "Item not found" }));
//     }
//   } else {
//     // Handle unmatched routes
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Route not found" }));
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running at http://localhost:3000/");
// });
