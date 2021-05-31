import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './seasonDisplay';
import Spinner from './loader';

class App extends React.Component {
    // constructor(props){
    //     super(props);
    // This is the only time we do direct assignment to this.state  
    //     this.state = {lat:null, errorMessage : ''}

    // };

    state = {lat:null, errorMessage:''}

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition( 
            (position) => this.setState( { lat : position.coords.latitude}),
            (error) => this.setState({errorMessage : error.message})
        )
    }

    renderbody () {
         if(this.state.errorMessage && !this.state.lat){
            return <Spinner message="you did not give location permission, please do it!" />
        }else if(!this.state.errorMessage && this.state.lat) {
            return (
                 <SeasonDisplay lat={this.state.lat} />
            );
        }else {
            return (
                <Spinner message="Please accept loaction request!"/>
            );
        }
    }

    render() {
        return (
         <div className="borderred">
               {this.renderbody()}
         </div>
        );
    }
}

ReactDom.render( <App/>, document.querySelector('#root'))