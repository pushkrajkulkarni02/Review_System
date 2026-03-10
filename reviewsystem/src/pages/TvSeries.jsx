import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./TvSeries.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TvSeries() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [allSeries, setAllSeries] = useState([]);
    const [filteredSeries, setFilteredSeries] = useState([]);

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/tvseries");
                setAllSeries(res.data);
            } catch (err) {
                console.error("Error fetching TV series", err);
            }
        };
        fetchSeries();
    }, []);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredSeries([]);
        } else {
            const results = allSeries.filter(series =>
                series.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredSeries(results);
        }
    }, [search, allSeries]);

    return (
        <>
            <Navbar />
            <div className="page-container">

                {/* Search Bar */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Search for a TV series..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: "60%",
                            padding: "12px",
                            borderRadius: "25px",
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                            textAlign: "center"
                        }}
                    />
                </div>

                {/* Search Results */}
                {search.trim() !== "" && (
                    <div className="search-results">
                        {filteredSeries.length > 0 ? (
                            <div className="row-cards" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: '20px' }}>
                                {filteredSeries.map(series => (
                                    <div key={series.id} className="card">
                                        <img
                                            src={series.poster}
                                            alt={series.title}
                                            className="card"
                                            onClick={() => navigate(`/tvseries/${series.id}`)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <h2>TV Series not found</h2>
                            </div>
                        )}
                        <hr style={{ margin: "40px 0", borderColor: "#334155" }} />
                    </div>
                )}

                {localStorage.getItem("role") === "admin" && (
                    <div style={{ textAlign: "right", padding: "10px" }}>
                        <button
                            className="add-btn"
                            onClick={() => navigate("/add-content")}
                        >
                            + Add TV Series
                        </button>
                    </div>
                )}

                {/* Only show default categories if not searching */}
                {search.trim() === "" && (
                    <>
                        <div className="row">
                            <h2>Top Rated Series</h2>
                            <div className="row-cards">
                                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Breaking_Bad_season_4_DVD.png/250px-Breaking_Bad_season_4_DVD.png" alt="Breakign Bad" className="card" onClick={() => navigate("/tvseries/1")}></img></div>
                                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Game_of_Thrones_Season_8.png/250px-Game_of_Thrones_Season_8.png" alt="Game of Thrones" className="card" onClick={() => navigate("/tvseries/2")}></img></div>
                                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Stranger_Things_season_1.jpg/250px-Stranger_Things_season_1.jpg" alt="Stranger Things" className="card" onClick={() => navigate("/tvseries/3")}></img></div>
                                <div className="card"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/The_Boys_Season_1.jpg/250px-The_Boys_Season_1.jpg" alt="The Boys" className="card" onClick={() => navigate("/tvseries/4")}></img></div>
                                <div className="card"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTJ69pG6tn4dhkkgyBdWTAN6KuafB5rbu9_g&s" alt="Money Heist" className="card" onClick={() => navigate("/tvseries/5")}></img></div>
                                <div className="card"><img src="https://www.imdb.com/title/tt2442560/mediaviewer/rm775346176/?ref_=tt_ov_i" alt="Peaky Blinders" className="card" onClick={() => navigate("/tvseries/6")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/7")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/8")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/9")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/10")}></img></div>
                            </div>
                        </div>
                        <div className="row">
                            <h2>Latest Series</h2>
                            <div className="row-cards">
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/11")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/12")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/13")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/14")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/15")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/16")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/17")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/18")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/19")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/20")}></img></div>
                            </div>
                        </div>
                        <div className="row">
                            <h2>English Series</h2>
                            <div className="row-cards">
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/21")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/22")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/23")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/24")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/25")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/26")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/27")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/28")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/29")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/30")}></img></div>
                            </div>
                        </div>
                        <div className="row">
                            <h2>Hindi Series</h2>
                            <div className="row-cards">
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/31")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/32")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/33")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/34")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/35")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/36")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/37")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/38")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/39")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/40")}></img></div>
                            </div>
                        </div><div className="row">
                            <h2>Marathi Series</h2>
                            <div className="row-cards">
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/41")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/42")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/43")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/44")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/45")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/46")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/47")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/48")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/49")}></img></div>
                                <div className="card"><img src="" alt="" className="card" onClick={() => navigate("/tvseries/50")}></img></div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default TvSeries;
