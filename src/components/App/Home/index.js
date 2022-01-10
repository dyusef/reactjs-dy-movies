import React, { Component } from 'react';
import {connect} from 'react-redux'
import { FetchHome, FetchHomeSearch } from '../../../redux/actions/home/home.action';
import CardFilm from "./src/card";
import Preloader from "Preloader";
import Skeleton from 'react-loading-skeleton';
import Paginationq from "helper";
import { FormGroup, Icon, Input, InputGroup } from 'rsuite';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handlesearch = this.handlesearch.bind(this);
        this.state = {
        }
    }

    componentWillMount() {
        this.props.dispatch(FetchHome("page=1"));
    }

    handlesearch(event) {
        // event.preventDefault();
        // const form = event.target;
        console.log(event.target.value);
        const data = event.target.value;
        let any = data;
        localStorage.setItem("any_home", any);
        if (any === "" || any === null || any === undefined) {
          this.props.dispatch(FetchHomeSearch(`page=${1}`));
        } else {
          this.props.dispatch(FetchHomeSearch(`page=${1}&query=${any}`));
        }
      }
    handlePageChange(pageNumber) {
        window.scroll({top:0,behavior:'smooth'})
        let any = localStorage.getItem("any_home");
        localStorage.setItem("page_home", pageNumber);
        if (any === "" || any === null || any === undefined) {
            this.props.dispatch(FetchHome(`page=${pageNumber}`));
        } else {
            this.props.dispatch(FetchHome(`page=${pageNumber}&query=${any}`));
        }
    }
    
    render() {
        return (
            <div>
            <header>
  <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark p-3">
    <a className="navbar-brand" href="/">DY-MOVIES</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav mr-auto">
      </ul>
      
          <FormGroup>
            <InputGroup inside>
              <Input name="field_any" placeholder="search on enter" onPressEnter={(e) => this.handlesearch(e)} />
              <InputGroup.Addon>
                <Icon icon="search" />
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
    </div>
  </nav>
</header>

            {!this.props.isLoading ? 
            <div className="position-relative overflow-hidden p-3 p-md-5 " style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${this.props.Popular[0].poster_path})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat:'no-repeat',
            }}>
                <div className="col-md-7 p-lg-5 my-5 text-white">
                    <h1 className="display-4 font-weight-normal pt-5">{this.props.Popular[0].original_title}</h1>
                    <p className="lead font-weight-normal text-white">{this.props.Popular[0].overview}</p>
                </div>
                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div> : <div className="position-relative overflow-hidden p-3 p-md-5 " style={{
                backgroundColor: 'gray',
                backgroundSize: 'cover',
                backgroundPosition: 'top',
                backgroundRepeat:'no-repeat'
            }}>
                <div className="col-md-7 p-lg-5 my-5 text-white">
                    <h1 className="display-4 font-weight-normal pt-5"><Skeleton width={300}/></h1>
                    <p className="lead font-weight-normal text-white"><Skeleton width={500} count={5}/></p>
                </div>
                <div className="product-device shadow-sm d-none d-md-block" />
                <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div>}

            <div className="container-fluid mt-3 pt-5">
                <h1 className='ml-5 mb-4'>Popular Movies</h1>
                <div className="row mx-4">
                    {!this.props.isLoading ? <CardFilm data={this.props.Popular} /> : <Preloader />}
                </div>
            </div>
            {!this.props.isLoading ?
            <div className='row'>
                <div className='col-2 offset-5 text-center'>

                <div className='my-3'>
          <Paginationq current_page={this.props.page} per_page={20} total={20 * this.props.total_pages} callback={this.handlePageChange.bind(this)} />
        </div>
                </div>
            </div> :''}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state.homeReducer.data);
    return{
        Popular: state.homeReducer.data,
        total_pages: state.homeReducer.total_pages,
        page: state.homeReducer.page,
        isLoading: state.homeReducer.isLoading,
    }
}
export default connect(mapStateToProps)(Home);