import "./Home.css";
import "./App.js";
import "./components/Footer";
import React, { Component } from "react";
import axios from "axios";
import Footer from "./components/Footer";
class Home extends Component {
  state = {
    access_token: null,
    country: null,
    name: null,
    email: null,
    ID: null,
    profile_picture: null,
    tracks: [],
    show_tracks: false,
  };

  componentDidMount() {
    // Get OAuth token from URL
    // This is needed for API requests
    let URL = window.location.toString();
    let access_token = URL.substring(URL.indexOf("/Home/") + "/Home/".length);

    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    };
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: headers,
      })
      .then((res) => {
        this.setState({
          country: res.data.country,
          name: res.data.display_name,
          email: res.data.email,
          ID: res.data.id,
          profile_picture: res.data.images[0].url,
          access_token: access_token,
        });
      });
  }

  // https://medium.com/@perryjanssen/getting-random-tracks-using-the-spotify-api-61889b0c0c27
  getRandomSearch = () => {
    // A list of all characters that can be chosen.
    const characters = "abcdefghijklmnopqrstuvwxyz";

    // Gets a random character from the characters string.
    const randomCharacter = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    // let randomSearch = randomCharacter + "%20";
    let randomSearch = "";

    // Places the wildcard character at the beginning, or both beginning and end, randomly.
    switch (Math.round(Math.random())) {
      case 0:
        randomSearch = randomCharacter + "%20";
        break;
      case 1:
        randomSearch = "%20" + randomCharacter + "%20";
        break;
    }

    return randomSearch;
  };

  // https://medium.com/@perryjanssen/getting-random-tracks-using-the-spotify-api-61889b0c0c27
  getRandomOffset = () => {
    return Math.floor(Math.random() * 2000);
  };

  //To retrieve only albums with the lowest 10% popularity, use the field filter tag:hipster in album searches. Note: This field filter only works with album searches.
  generateTrack = async () => {
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.state.access_token,
    };
    let search = this.getRandomSearch();
    console.log("SEARCH");
    console.log(search);
    let offset = this.getRandomOffset();
    let type = "track";
    let url =
      "https://api.spotify.com/v1/search?q=" +
      search +
      "&type=" +
      type +
      "&offset=" +
      offset.toString();
    await axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({
          // tracks: tracks.concat(res.data.tracks.items[0]),
          tracks: [...this.state.tracks, res.data.tracks.items[0]],
        });
      });
    return "Success";
  };

  // Issue when defining as standard non-arrow function
  // Can't access this.state
  generatePlaylist = async () => {
    // If re-generating without having created the playlist
    // clear current tracks and regenerate
    if (this.state.tracks.length > 0) {
      this.setState({
        tracks: [],
      });
    }

    // Generate 20 tracks
    for (let i = 0; i < 20; i++) {
      await this.generateTrack();
    }
    this.state.show_tracks = true;
    this.forceUpdate();
  };

  populatePlaylist = async (playlist_id) => {
    let url =
      "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?uris=";
    let uris = "";
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.state.access_token,
    };
    for (let i = 0; i < this.state.tracks.length; i++) {
      url += "spotify%3Atrack%3A" + this.state.tracks[i].id;
      if (i != this.state.tracks.length - 1) {
        url += "%2C";
      }
      uris += "spotify:track:" + this.state.tracks[i].id;
      if (i != this.state.tracks.length - 1) {
        uris += ",";
      }
    }
    console.log(url);

    await axios.post(url, uris, { headers: headers }).then((res) => {
      console.log(res);
    });
  };

  createPlaylist = async () => {
    console.log("Create Playlist");
    const headers = {
      Accept: "application/json",
      Authorization: "Bearer " + this.state.access_token,
    };
    const body = {
      name: "Random Spotify Playlist",
      description: "Randomly Created by My App",
      public: true,
    };
    let url =
      "https://api.spotify.com/v1/users/" + this.state.ID + "/playlists";
    await axios.post(url, body, { headers: headers }).then((res) => {
      console.log(res);
      this.populatePlaylist(res.data.id);
    });
    this.state.show_tracks = false;
    this.setState({
      tracks: [],
    });
    this.forceUpdate();
  };

  render() {
    // whenever setState() is called, we have access in the render method
    let tracks = null;
    if (this.state.show_tracks) {
      tracks = this.state.tracks.map((track) => (
        <li>
          <div>
            <img src={track.album.images[2].url} alt={track.album.name}></img>
            <h1>{track.name}</h1>
            <h2>{track.artists[0].name}</h2>
          </div>
        </li>
      ));
    }
    return (
      <>
        <div className="container">
          <main>
            <h1>HOMEPAGE</h1>
            <p>Name: {this.state.name}</p>
            <p>ID: {this.state.ID}</p>
            <p>Email: {this.state.email}</p>
            <p>Country: {this.state.country}</p>
            <p>access_token: {this.state.access_token}</p>
            <img src={this.state.profile_picture} alt="Profile Pic"></img>
            <button onClick={this.generatePlaylist}> Generate Playlist </button>
            {this.state.show_tracks ? (
              <button onClick={this.createPlaylist}> Create Playlist</button>
            ) : null}
            <ul>{tracks}</ul>
          </main>
        </div>
        <Footer />
      </>
    );
  }
}

export default Home;
