import {Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

function Home(){
    
    addCssStyle("/css/home.css");

    var {name} = useParams(); // Use dynamic url path "/:pokemon_name"
    
    name = (name !== undefined) ? name : 'pikachu'; // default path params

    const [state, setState] = useState({pokemon:null, query:name});
    var [virtualState, setVirtualState] = useState(state.query); // virtual search state
    const [initState, setInitState] = useState(true);

    useEffect(()=>{
        
        if (virtualState === state.query){ // check if virtual state and current state is thesame
            if (initState) findPokemon(state.query) // render updated components
            setInitState(false) // disable rerendering after first component update
        }
        
    }, [virtualState, state.query, initState, findPokemon]);

    function addCssStyle(csslink){
        let elem = document.createElement('link');
        elem.rel = 'stylesheet';
        elem.href = csslink;
        document.head.append(elem);
    }
    
    function capitalize(string){
        return string[0].toUpperCase()+string.slice(1);
    }

    async function findPokemon(pokemon){
        window.$('#spinner').fadeIn(100);
        window.$('#search-input').blur();
        
        var result = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`).then(async response=>{
            
            if (response.status !== 404){
                let data = await response.json();

                setTimeout(()=>{
                    
                    setState({
                        pokemon: data,
                        query: virtualState
                    });
                    
                    window.$('#spinner').fadeOut(100);
                }, 1000);

                return data;
            }
            else {
                setState({pokemon: null, query: 404})
            }
        });

        return result;
    }

    console.log(state);

    if (state.pokemon){
        
        return (
            <>
                <Fragment>
                    <div className="container-fluid d-flex flex-column bg-dark">
                        <header>
                            <h1 className="py-4 px-3">React Vs PokeApi</h1>
                        </header>
                        <div id="container" className="p-3 mb-5 mx-auto" style={{width:'max-content'}}>

                            {/* Search Pokemon */}
                            <div>
                                <strong className="d-block text-light m-3">Enter a pokemon name, eg: Pekachu, Torterra, Jynx etc.</strong>
                                <form className="my-3 relative" onSubmit={(event)=>{
                                        event.preventDefault()
                                        
                                        setState({
                                            pokemon: state.pokemon,
                                            query: virtualState
                                        });

                                        setInitState(true) // allow screen update
                                        
                                    }} spellCheck="false">

                                    <input id="search-input" className="form-control pl-3 pt-3 pb-3" placeholder="Search Pokemon" style={{borderRadius:'40px', boxShadow:'none', border:'0', textTransform:'capitalize', paddingRight:'60px'}} defaultValue={state.pokemon.name} onChange={(event)=>{
                                        setVirtualState(event.target.value.toLowerCase());
                                    }}/>

                                    <button className="absolute bg-light py-1 px-2 border-0" style={{borderRadius:'50%', right:'10px', transform:'translateY(-50%)', top:'50%', fontSize:'20px'}}><i className="fas fa-search" onClick={(event)=>{
                                        
                                        setState({
                                            pokemon: state.pokemon,
                                            query: virtualState
                                        });

                                        setInitState(state) // allow screen update
                                        
                                    }}></i></button>
                                </form>
                                <div id="spinner" className="px-0 my-2 text-secondary" style={{display:'none'}}>
                                    <i className="fad fa-spinner fa-spin" style={{color:'#0c77b5', fontSize:'24px'}}></i> Searching...
                                </div>
                            </div>

                            {/* Show Pokemon element */}
                            <div id="element" className="d-flex mx-auto py-2 px-3" style={{border:'1px solid #505050', width:'max-content', minHeight:'max-content', borderRadius:'10px'}}>

                                <div id="pokemon" style={{width:'350px', minWidth:'300px', marginRight:'20px'}}>
                                    <img src={state.pokemon.sprites.other['official-artwork'].front_default} alt="pokemon" style={{width:'100%'}}/>
                                    <div className="mx-auto" style={{textAlign:'center', fontSize:'1.2rem'}}>
                                        <label htmlFor="pokemon" className="text-secondary">{capitalize(state.pokemon.name)}</label>
                                    </div>
                                </div>

                                <div id="description" style={{minWidth:'max-content', height:'max-content', borderLeft:'3px solid #181818', margin:'auto'}}>

                                    <table>
                                        <tbody>
                                            <tr><td><h2>Name</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{capitalize(state.pokemon.name)}</span></td></tr>

                                            <tr><td><h2>Abilities</h2></td><td><>&nbsp;:&ensp;</></td><td><span>{
                                                (()=>{
                                                    let abilities = [];
                                                    for (var ab of state.pokemon.abilities){
                                                        abilities.push(capitalize(ab.ability.name));
                                                    }
                                                    
                                                    return abilities.join(', ');
                                                })()}
                                            </span></td></tr>

                                            <tr><td><h2 style={{verticalAlign:'top'}}>Statistics</h2></td>
                                            <td style={{verticalAlign:'top'}}><>&nbsp;:&ensp;</></td>
                                            <td><span className="d-block" style={{whiteSpace:'pre', paddiingRight:'12px'}}>{(()=>{
                                        
                                                let s = "";
                                                for (var stats of state.pokemon.stats){
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
            </>
        );
    }
    if (state.query === 404) {
        return ( // 404 Error Not Found
            <>
                <Fragment>
                    <div className="container-fluid d-flex flex-column bg-dark">
                        <header>
                            <h1 className="py-4 px-3">React Vs PokeApi</h1>
                        </header>
                        <div id="container" className="p-3 mb-5 mx-auto" style={{width:'max-content', textAlign:'center'}}>

                            {/* 404 Not Found */}
                            <h2 className="error-text" style={{fontSize:'22px'}}>{"{{ Error 404 Not Found! }}"}</h2>
                            <a href="/" className="text-white" style={{textDecoration:'none'}}>Go Back</a>
                        </div>
                    </div>
                </Fragment>
            </>
        );
    }
}

export default Home;