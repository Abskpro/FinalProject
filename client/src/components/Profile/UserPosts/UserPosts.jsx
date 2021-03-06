import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Post from "../../searchResult/Posts/Post.js";
import Pagination from '../../searchResult/Pagination/Pagination.jsx';
import '../../searchResult/SearchResult.css';

const UserPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(2);

    useEffect(() => {
        console.log(props.auth.user.id);
        const fetchPost = async (props) => {
            const res = await axios.get(
                `/api/profile/post/${props.auth.user.id}`
            );
            setPosts(res.data);
        };
        fetchPost(props);
    }, [props]);

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    console.log(posts);
    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <Post posts={currentPosts} loading={loading} url="/editPost"/>
            <Pagination
                postPerPage={postPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
};

UserPosts.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(UserPosts));
