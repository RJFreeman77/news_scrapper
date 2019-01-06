import React, { Component } from 'react';
import API from "../../utils/API";
import Row from './components/Row';
import Col from './components/Col';
import MediaObject from './components/MediaObject';

class Body extends Component {

    state = {
        articles: [],
        user: "",
        comment: ""
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ articles: res.data })
            )
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div>
                {this.state.articles.length ? (
                    <div>
                        {this.state.articles.map(article => {
                            return (
                                <Row>
                                    <Col>
                                        <MediaObject key={article._id}>
                                            {article}
                                        </MediaObject>                                        />
                                    </Col>
                                </Row>
                            );
                        })
                        }
                    </div>
                ) : (
                        < h3 > No Results to Display</h3>
                    )}
            </div >
        );
    }

}
export default Body;