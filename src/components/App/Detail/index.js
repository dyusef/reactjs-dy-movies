import React, { Component } from 'react';
import {connect} from 'react-redux'
import CardCast from "./src/card";
import Preloader from "Preloader";
import Skeleton from 'react-loading-skeleton';
import {toRp} from "helper";
import { FetchDetail, FetchDetailCredits } from '../../../redux/actions/home/home.action';
import moment from 'moment';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
      var id = this.props.match.params.id
      this.props.dispatch(FetchDetail(id));
      this.props.dispatch(FetchDetailCredits(id));
  }

    render() {
        return (
            <div>
            <header>
  <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3">
    <a className="navbar-brand" href="/">DY-MOVIES</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav mr-auto">
      </ul>
      <form className="form-inline mt-2 mt-md-0">
      </form>
    </div>
  </nav>
</header>

            {!this.props.isLoading ? 
            <div className="position-relative overflow-hidden p-3 p-md-5" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.props.data.backdrop_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat:'no-repeat',
            }}>
              <div className='row p-lg-5 my-5' style={{borderRadius:'1em', backgroundColor:'#000000aa'}}>
                <div className="col-md-3 text-white">
                  <div className="single-product-item mb-30" >
                    <div className="product-card" style={{
                        height:400,
                        background: `url(https://image.tmdb.org/t/p/w500/${this.props.data.poster_path})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat:'no-repeat'
                        }}>
                    </div>
                    </div>
                </div>
                <div className="col-md-7 text-white">
                    <h1 className="display-4 font-weight-normal pt-5">{this.props.data.original_title}</h1>
                    <p className="lead font-weight-normal font-18 text-white" style={{lineHeight:'initial'}}>{this.props.data.overview}</p>
                    <div className='d-flex align-items-end mt-4'>
                      <div className='w-25'><h5><strong>IMDB RATING</strong></h5><h6 className='font-14'>{this.props.data.vote_average}</h6></div>
                      <div className='w-25'><h5><strong>REVENUE</strong></h5><h6 className='font-14'>{toRp(this.props.data.revenue)}</h6></div>
                    </div>
                </div>
                </div>

                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div>
             : <div className="position-relative overflow-hidden p-3 p-md-5" style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.props.data.backdrop_path})`,
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              backgroundRepeat:'no-repeat',
          }}>
            <div className='row p-lg-5 my-5' style={{borderRadius:'1em', backgroundColor:'#000000aa'}}>
              <div className="col-md-3 text-white">
                <div className="single-product-item mb-30" >
                  <div className="product-card" style={{
                      height:400,
                      backgroundColor: `gray`,
                      }}>
                  </div>
                  </div>
              </div>
              <div className="col-md-7 text-white">
                  <h1 className="display-4 font-weight-normal pt-5"><Skeleton width={300}/></h1>
                  <p className="lead font-weight-normal font-18 text-white" style={{lineHeight:'initial'}}><Skeleton width={600} count={5}/></p>
                  <div className='d-flex align-items-end mt-4'>
                    <div className='w-25'><h5><strong>IMDB RATING</strong></h5><h6 className='font-14'><Skeleton width={300}/></h6></div>
                    <div className='w-25'><h5><strong>REVENUE</strong></h5><h6 className='font-14'><Skeleton width={300}/></h6></div>
                  </div>
              </div>
              </div>

              <div className="product-device shadow-sm d-none d-md-block" />
              <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
          </div>}
          {!this.props.isLoading ? 
            <div className='row p-5' style={{backgroundColor:'#1c1c1c'}}>
                  <div className='col-4 font-20 text-white'>Budget $ {toRp(this.props.data.budget)}</div>
                  <div className='col-4 font-20 text-white'>Running Time {this.props.data.runtime}Minutes</div>
                  <div className='col-4 font-20 text-white'>Release Date {moment(this.props.data.release_date).format('LL')}</div>
                </div>
                : 
            <div className='row p-5' style={{backgroundColor:'#1c1c1c'}}>
                  <div className='col-4 font-20 text-white'>Budget $ <Skeleton width={150}/></div>
                  <div className='col-4 font-20 text-white'>Running Time <Skeleton width={150}/>Minutes</div>
                  <div className='col-4 font-20 text-white'>Release Date <Skeleton width={150}/></div>
                </div>}
            <div className="container-fluid mt-3 pt-5">
                <h1 className='ml-5 mb-4'>Cast</h1>
                <div className="row mx-4">
                    {!this.props.isLoadingCredits ? <CardCast data={this.props.dataCredits} /> : <Preloader />}
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.homeReducer.data_detail);
    return{
        data: state.homeReducer.data_detail,
        dataCredits: state.homeReducer.data_detail_credits,
        isLoading: state.homeReducer.isLoadingDetail,
        isLoadingCredits: state.homeReducer.isLoadingDetailCredits,
    }
}
export default connect(mapStateToProps)(Detail);