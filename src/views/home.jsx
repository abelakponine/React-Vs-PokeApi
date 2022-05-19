import React, {Component, Fragment} from "react";

class Home extends Component {
    
    componentDidMount(){
        this.addCssStyle("/css/home.css");
        fetch('https://pokeapi.co/api/v2/pokemon/pikachu').then(response=>{
            response.json().then(data=>{
                this.setState({
                    pokemon: data,
                    query: data.name
                });
            });
        });

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
    findPokemon(event, pokemon){
        event.preventDefault();
        window.$('#spinner').fadeIn(100);
        window.$('#search-input').blur();

        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(response=>{
            
            if (response.status !== 404){
                response.json().then(data=>{
                    setTimeout(()=>{
                        this.setState({
                            pokemon: data,
                            query: data.name
                        });
                        window.$('#spinner').fadeOut(100);
                    }, 1000);
                });
            }
            else {
                window.$('#spinner').fadeOut(100);
                alert(`Pokemon with name: ${this.capitalize(this.state.query)} not found!`);
            }
        });
    }
    render(){

        if (this.state)
            return (
                <Fragment>
                    <div className="container-fluid d-flex flex-column bg-dark">
                        <header>
                            <h1 className="py-4 px-3">React Vs PokeApi</h1>
                        </header>
                        <div id="container" className="p-3 mb-5 mx-auto" style={{width:'max-content'}}>
                            {/* Search Pokemon */}
                            <div>
                                <strong className="d-block text-light m-3">Enter a pokemon name, eg: Pekachu, Torterra, Jynx etc.</strong>
                                <form className="my-3 relative" onSubmit={(event)=>this.findPokemon(event, this.state.query)} spellCheck="false">
                                    <input id="search-input" className="form-control pl-3 pt-3 pb-3" placeholder="Search Pokemon" style={{borderRadius:'40px', boxShadow:'none', border:'0', textTransform:'capitalize', paddingRight:'60px'}} defaultValue={this.state.pokemon.name} onChange={(event)=>this.setState({
                                        query: event.target.value.toLowerCase()
                                    })}/>
                                    <button className="absolute bg-light py-1 px-2 border-0" style={{borderRadius:'50%', right:'10px', transform:'translateY(-50%)', top:'50%', fontSize:'20px'}}><i className="fas fa-search" onClick={(event)=>this.findPokemon(event, this.state.query)}></i></button>
                                </form>
                                <div id="spinner" className="px-0 my-2 text-secondary" style={{display:'none'}}>
                                    <i className="fad fa-spinner fa-spin" style={{color:'#0c77b5', fontSize:'24px'}}></i> Searching...
                                </div>
                            </div>

                            {/* Show Pokemon element */}
                            <div id="element" className="d-flex mx-auto py-2 px-3" style={{border:'1px solid #505050', width:'max-content', minHeight:'max-content', borderRadius:'10px'}}>

                                <div id="pokemon" style={{width:'350px', minWidth:'300px', marginRight:'20px'}}>
                                    <img src={this.state.pokemon.sprites.other['official-artwork'].front_default} alt="pokemon" style={{width:'100%'}}/>
                                </div>

                                <div id="description" style={{minWidth:'max-content', height:'max-content', borderLeft:'3px solid #181818', margin:'auto'}}>

                                    <table>
                                        <tbody>
                                            <tr><td><h2>Name</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{this.capitalize(this.state.pokemon.name)}</span></td></tr>

                                            <tr><td><h2>Abilities</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{
                                                    (()=>{
                                                        let abilities = [];
                                                        for (var ab of this.state.pokemon.abilities){
                                                            abilities.push(this.capitalize(ab.ability.name));
                                                        }
                                                        
                                                        return abilities.join(', ');
                                                    })()}</span></td></tr>

                                            <tr><td><h2 style={{verticalAlign:'top'}}>Statistics</h2></td><td style={{verticalAlign:'top'}}><>&nbsp;:&ensp;</></td><td><span className="d-block" style={{whiteSpace:'pre', paddiingRight:'12px'}}>{(()=>{
                                                    
                                                        let s = "";
                                                        for (var stats of this.state.pokemon.stats){
                                                            s += '\t'+stats.stat.name+':  '+stats.base_stat+'\n';
                                                        }
                                                        
                                                        let stat = `{\n${s}}`;
                                                        return stat;

                                                })()}</span></td></tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            );
        else return false
    }
}

export default Home;