import axios from "axios";

export default {
    getArticles: () => {
        return axios.get("/api/scraper");
    }
}