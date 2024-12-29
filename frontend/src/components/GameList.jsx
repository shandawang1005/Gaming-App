import React, { useEffect, useState } from "react";

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/games");
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error("Error fetching games:", error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <h2>Available Games</h2>
            <ul>
                {games.map((game) => (
                    <li key={game._id}>{game.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;
