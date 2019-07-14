import { connect } from 'react-redux';
import HomeUI from './HomeUI';


const mapStateToProps = () => {

    return {
        a: ''
    };
};


const mapDispatchToProps = () => {

    return {
        b: ''
    };
};

const Home = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeUI)

export default Home;