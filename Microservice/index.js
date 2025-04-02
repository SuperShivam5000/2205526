require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;
const BASE_URL = "http://20.244.56.144/evaluation-service";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

app.use(cors());

const axiosConfig = {
    headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
};

app.get("/users", async (req, res) => {
    try {
        const { data: users } = await axios.get(`${BASE_URL}/users`, axiosConfig);
        const userPostCounts = {};

        await Promise.all(
            Object.keys(users.users).map(async (userId) => {
                const { data: posts } = await axios.get(`${BASE_URL}/users/${userId}/posts`, axiosConfig);
                userPostCounts[userId] = posts.posts.length;
            })
        );

        const topUsers = Object.entries(userPostCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, count]) => ({ id, name: users.users[id], postCount: count }));

        res.json(topUsers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users." });
    }
});

app.get("/posts", async (req, res) => {
    const { type } = req.query;
    if (!type || (type !== "popular" && type !== "latest")) {
        return res.status(400).json({ error: "Invalid type parameter." });
    }

    try {
        const { data: users } = await axios.get(`${BASE_URL}/users`, axiosConfig);
        let allPosts = [];

        await Promise.all(
            Object.keys(users.users).map(async (userId) => {
                const { data: posts } = await axios.get(`${BASE_URL}/users/${userId}/posts`, axiosConfig);
                allPosts = allPosts.concat(posts.posts);
            })
        );

        if (type === "latest") {
            allPosts.sort((a, b) => b.id - a.id);
            return res.json(allPosts.slice(0, 5));
        }

        const commentCounts = {};
        await Promise.all(
            allPosts.map(async (post) => {
                const { data: comments } = await axios.get(`${BASE_URL}/posts/${post.id}/comments`, axiosConfig);
                commentCounts[post.id] = comments.comments.length;
            })
        );

        const maxComments = Math.max(...Object.values(commentCounts));
        const popularPosts = allPosts.filter(post => commentCounts[post.id] === maxComments);

        res.json(popularPosts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});