import React, { Component } from "react";
import { connect } from "react-redux";

class CardCast extends Component {

  render() {
    const data = this.props.data.cast;
    return (
            typeof data === "object"
              ? data.map((v, i) => {
                  return (
                    <div className="col-sm-6 col-lg-6 col-xl-3" >
                <div className="single-gallery--item mb-50">
                  <div className="gallery-thumb">
                    <img src={`https://image.tmdb.org/t/p/w500/${v.profile_path}`} onError={(e)=>{e.target.onerror = null; e.target.src=`https://via.placeholder.com/500x750`}} alt="imgs" />
                  </div>
                  <div className="gallery-text-area">
                    <h6 className="text-white font-16 mb-0">{v.name}</h6>
                    <p className="text-white mb-10" style={{fontStyle:'italic'}}>{v.character}</p>
                  </div>
                </div>

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
export default connect(mapStateToProps)(CardCast);