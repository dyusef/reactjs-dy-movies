import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CardFilm extends Component {

  render() {
    const data = this.props.data;
    return (
            typeof data === "object"
              ? data.map((v, i) => {
                  return (
                      <div className="col-sm-6 col-lg-6 col-xl-3" >
                        <Link to={`/${v.id}`}>
                    <div className="single-product-item mb-30" >
                    <div className="product-card" style={{
                        height:400,
                        background: `url(https://image.tmdb.org/t/p/w500/${v.poster_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat:'no-repeat'
                        }}>
                    </div>
                </div>
                </Link>
                </div>
                  );
                })
              : "No data."
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Popular: state.homeReducer.data,
  };
};
export default connect(mapStateToProps)(CardFilm);