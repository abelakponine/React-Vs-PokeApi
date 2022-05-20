import React, {Component, Fragment} from "react";
import { useParams } from "react-router-dom";
import IndexPage from "../views/index";
import Page404 from "../views/404";

class Home extends Component {

    constructor(props){
        super();

        this.state = {
            pokemon: null,
            query: props.params.name !== undefined ? props.params.name : 'pikachu'
        }

        if (this.state.query){
            fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.query}`).then(async response=>{
                
                if (response.status !== 404){
                    let data = await response.json();

                    this.state = {
                        pokemon: data,
                        query: this.state.query
                    };
                }
                else {
                    this.setState({pokemon: null, query: 404})
                }
            });
            
        }
    }
    componentDidMount(){

        this.addCssStyle("/css/home.css");
        this.findPokemon(this.state.query);
        console.log(this.state);
    }

    addCssStyle(csslink){
        let elem = document.createElement('link');
        elem.rel = 'stylesheet';
        elem.href = csslink;
        document.head.append(elem);
    }

    capitalize(string){
        return string[0].toUpperCase()+string.slice(1);
    }

    findPokemon(pokemon){
        
        var result = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(async response=>{
            
            if (response.status !== 404){
                let data = await response.json();

                setTimeout(()=>{
                    
                    this.setState({
                        pokemon: data,
                        query: data.name
                    });
                    
                    window.$('#spinner').fadeOut(100);
                }, 1000);

                return data;
            }
            else {
                this.setState({pokemon: null, query: 404})
            }
        });

        return result;
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(nextProps)
        return true;
    }

    render (){
        
        if (this.state.query && this.state.pokemon){
            return (
                <IndexPage {...this} extended={this}/>
            );
        }
        if (this.state.query === 404) {
            return (
                    <Page404/>
                );
        }
    }
}

function Func(props){
    return <Home {...props} params={useParams()}/>
}

// export default Home;
export default Func;